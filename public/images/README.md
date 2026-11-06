# Your images

Everything in `public/` is served as-is. A file at `public/images/projects/foo.jpg` is available on the
site at `/images/projects/foo.jpg`, and in the content files you refer to it as `images/projects/foo.jpg`.

| Folder          | What goes here                                  | How it's connected                                                        |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| `profile/`      | Your photo                                      | Save as `profile/profile.jpg`. Falls back to `profile.svg` if missing.     |
| `projects/`     | One cover image per project (16:9, ~1280x720)   | `src/content/projects.ts`, the `image` field. Hidden if the file is missing. |
| `testimonials/` | Client headshots (square, ~200x200)             | `src/content/testimonials.ts`, the `avatar` field.                         |
| `logos/`        | Client or tool logos (SVG or PNG)               | `src/content/testimonials.ts`, the `clients` list.                         |
| `social/`       | Share image for link previews (1200x630)        | Save as `og.png`, then uncomment the `og:image` tag in `index.html`.       |

Tips
- Prefer `.webp` or `.jpg` for photos and screenshots, `.svg` for logos. Keep each under ~300 KB.
- If you replace an image, give it a new file name so visitors don't see a cached copy.
- Favicon: replace `public/favicon.svg`.
