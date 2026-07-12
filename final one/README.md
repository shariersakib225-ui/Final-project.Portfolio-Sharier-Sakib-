# Sharier Sakib — Portfolio Website

A static portfolio built with HTML, CSS and JavaScript. No build step is needed: open `index.html` locally, or deploy the complete project folder to any static host.

## Media showcase

The live media showcase is available at `media.html`, with a link in the main navigation and from the Video Editing Showcase project card.

- 3 MP4 video samples are embedded with browser player controls.
- 22 design images appear in a responsive gallery.
- Selecting a gallery image opens a larger preview.
- All media uses relative paths, so it will work after deployment as long as the `assets` folder is uploaded together with `index.html` and `media.html`.

## Important folders

```
final one/
├── index.html
├── media.html
└── assets/
    ├── css/
    │   └── media.css       # media showcase styling
    ├── js/
    │   └── media.js        # video and gallery interactions
    ├── images/             # existing portfolio images
    └── media/
        ├── photos/         # 22 gallery images
        └── videos/         # 3 MP4 videos
```

## Deploying

Upload the whole project directory, preserving this structure. Do not upload only the HTML files: the `assets/media/photos` and `assets/media/videos` folders are required for the gallery and videos to load.

## Browser support

Use a current version of Chrome, Edge, Firefox or Safari. The gallery preview uses the native HTML dialog element, which is supported by current evergreen browsers.
