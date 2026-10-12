# Turbopack ignores `webpackChunkName` when migrating from webpack

Reproduction for https://github.com/vercel/next.js/issues/100051

Switching from webpack to Turbopack in Next.js 16.4.0 loses the name assigned to a dynamic-import chunk:

```tsx
const { default: VideoPlayer } = await import(
  /* webpackChunkName: "video-player" */
  "./VideoPlayer.tsx"
);
```

## Steps to reproduce

1. Install dependencies: `pnpm install`
2. Build with webpack: `pnpm build --webpack`
3. Observe `.next/static/chunks/video-player.<hash>.js`
4. Build with Turbopack: `pnpm build`
5. Observe that the video player chunk has a generated filename without `video-player`

To locate the video player chunk after either build:

```bash
rg -l 'Video player' .next/static/chunks
```

Observed filenames on Next.js 16.4.0:

```text
webpack:   .next/static/chunks/video-player.cdffd02ab8426bbe.js
Turbopack: .next/static/chunks/1a9ut2wf58r-n.js
```

Expected: Turbopack preserves the `webpackChunkName` name, retaining a content hash.

## `turbopackChunkName`

The separate page at `/turbopack-chunk-name` uses only `turbopackChunkName`:

```tsx
const { default: VideoPlayer } = await import(
  /* turbopackChunkName: "video-player" */
  "./VideoPlayer.tsx"
);
```

Build and locate this chunk:

```bash
$ pnpm build
# Next.js 16.4.0 (Turbopack), build succeeds

$ rg -l 'Video player' .next/static/chunks
.next/static/chunks/3er0_8ubnzf99.js
.next/static/chunks/1a9ut2wf58r-n.js
```

The `/turbopack-chunk-name` page imports `3er0_8ubnzf99.js`, while `/` imports `1a9ut2wf58r-n.js`. Neither filename contains `video-player`. Expected: Turbopack supports `turbopackChunkName`, retaining a content hash.

Run `pnpm start` and click **Load video player** to load the chunk in the browser.
