USMAB APP — make it installable / downloadable
==============================================

WHAT YOU HAVE
-------------
index.html      -> your app (single file, works offline)
manifest.json   -> tells phones "this is an installable app"
sw.js           -> service worker = offline caching + install prompt
icon-192/512    -> app icons

OPTION A — PWA (free, fastest, no app store needed)
---------------------------------------------------
1. Host the 5 files on any HTTPS static host (free):
   - GitHub Pages   : github.com -> new repo -> upload files -> Settings -> Pages
   - Netlify        : app.netlify.com -> drag & drop the folder
   - Vercel / Cloudflare Pages also work
2. Open the URL on your phone (Chrome on Android, Safari on iPhone).
3. Android : Chrome menu -> "Add to Home screen" / "Install app".
   iPhone   : Share -> "Add to Home Screen".
4. The app now opens fullscreen like a native app, works offline.

OPTION B — Real app stores (Google Play + App Store)
----------------------------------------------------
Use Capacitor to wrap the same files:

   npm install -g @capacitor/cli
   npx cap init "USMAB" com.usmab.app --web-dir .
   npx cap add android
   npx cap add ios        (needs a Mac)
   npx cap sync
   npx cap open android   (opens Android Studio -> Run / Build APK or AAB)

Or the zero-code route: put the hosted PWA URL into https://www.pwabuilder.com
and it generates the Android (AAB) and Windows packages for you.

NOTES
-----
- The Google Fonts link needs internet; everything else works offline.
- Update fixtures/news by editing index.html and re-uploading.
