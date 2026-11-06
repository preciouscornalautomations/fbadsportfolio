/**
 * Lead receiver for the portfolio contact form.
 * Paste this whole file into a Google Apps Script project (script.google.com),
 * then Deploy > New deployment > Web app. See README.md, "Receive leads in Gmail".
 *
 * What it does for every form submission:
 *   1. Emails the lead to you (reply-to is set to the lead, so you can just hit Reply).
 *   2. Optionally appends a row to a Google Sheet.
 */
var CONFIG = {
  // Where leads are emailed. Leave '' to use the Gmail account that owns this script.
  NOTIFY_EMAIL: '',

  // Optional: paste a Google Sheet ID to also log every lead in a spreadsheet. Leave '' to skip.
  SHEET_ID: '',
  SHEET_NAME: 'Leads',

  // Optional: if set, the form must send the same value (VITE_LEAD_TOKEN in .env). Light spam filter.
  SECRET: '',

  SUBJECT_PREFIX: 'New website lead',
};

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    if (CONFIG.SECRET && data.token !== CONFIG.SECRET) return reply_({ ok: false, error: 'unauthorized' });

    var name = clean_(data.name, 120);
    var email = clean_(data.email, 200);
    var message = clean_(data.message, 5000);
    var page = clean_(data.page, 500);
    var sentAt = clean_(data.sentAt, 40) || new Date().toISOString();

    if (!name || !email || !message) return reply_({ ok: false, error: 'missing fields' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply_({ ok: false, error: 'invalid email' });

    var to = CONFIG.NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();

    var text =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Page: ' + page + '\n' +
      'Sent: ' + sentAt + '\n\n' +
      message;

    var html =
      '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">' +
      '<p><b>Name:</b> ' + esc_(name) + '<br>' +
      '<b>Email:</b> <a href="mailto:' + esc_(email) + '">' + esc_(email) + '</a><br>' +
      '<b>Page:</b> ' + esc_(page) + '<br>' +
      '<b>Sent:</b> ' + esc_(sentAt) + '</p>' +
      '<p style="white-space:pre-wrap;border-left:3px solid #ff7a1a;padding-left:12px">' + esc_(message) + '</p>' +
      '</div>';

    MailApp.sendEmail({
      to: to,
      subject: CONFIG.SUBJECT_PREFIX + ': ' + name,
      body: text,
      htmlBody: html,
      replyTo: email,
      name: 'Portfolio website',
    });

    if (CONFIG.SHEET_ID) {
      var sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
      if (!sheet) {
        sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).insertSheet(CONFIG.SHEET_NAME);
        sheet.appendRow(['Received', 'Name', 'Email', 'Message', 'Page']);
      }
      // A leading apostrophe stops spreadsheet formulas from running if someone types "=..." in the form.
      sheet.appendRow([new Date(), safeCell_(name), safeCell_(email), safeCell_(message), safeCell_(page)]);
    }

    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}

// GET requests:
//   ?action=hit   adds one visit and returns the total   (the site calls this once per session)
//   ?action=views returns the total without counting
//   no action     shows a "live" message, so you can confirm the deployment works
function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : '';
  if (action === 'hit' || action === 'views') {
    var props = PropertiesService.getScriptProperties();
    var lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      var n = parseInt(props.getProperty('VIEWS') || '0', 10) || 0;
      if (action === 'hit') {
        n += 1;
        props.setProperty('VIEWS', String(n));
      }
      return reply_({ ok: true, views: n });
    } finally {
      lock.releaseLock();
    }
  }
  return reply_({ ok: true, message: 'Lead endpoint is live. Send leads with POST.' });
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/\r/g, '').trim().slice(0, max);
}

function esc_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeCell_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

/** Run this once from the editor to grant permissions and send yourself a test email. */
function testLead() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Lead',
        email: 'test@example.com',
        message: 'This is a test from the Apps Script editor.',
        page: 'editor',
        token: CONFIG.SECRET,
      }),
    },
  });
  Logger.log(res.getContent());
}
