/** Turns "images/foo.jpg" (relative to /public) into a URL that also works under a sub-path deploy. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\/+/, '')
