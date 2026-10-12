# Turbopack ignores `webpackChunkName` when migrating from webpack

Reproduction for https://github.com/vercel/next.js/issues/100051

Switching from webpack to Turbopack in Next.js 16.4.0 loses the name assigned to a dynamic-import chunk:

```tsx
const { message } = await import(
  /* webpackChunkName: "named-widget" */
  "./widget.ts"
);
```

## Steps to reproduce

1. Install dependencies: `pnpm install`
2. Build with webpack: `pnpm build --webpack`
3. Observe `.next/static/chunks/named-widget.<hash>.js`
4. Build with Turbopack: `pnpm build`
5. Observe that the widget chunk has a generated filename without `named-widget`

To locate the widget chunk after either build:

```bash
rg -l 'Named widget loaded' .next/static/chunks
```

Observed filenames on Next.js 16.4.0:

```text
webpack:   .next/static/chunks/named-widget.d496cea34d28e486.js
Turbopack: .next/static/chunks/1mgzucr0b65--.js
```

Expected: Turbopack preserves the `webpackChunkName` name (or supports `turbopackChunkName`), retaining a content hash.

Run `pnpm start` and click **Load named widget** to load the chunk in the browser.
