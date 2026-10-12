"use client";

export default function Home() {
  return (
    <button
      onClick={async () => {
        const { message } = await import(
          /* turbopackChunkName: "turbopack-named-widget" */
          "./widget.ts"
        );
        alert(message);
      }}
    >
      Load Turbopack-named widget
    </button>
  );
}
