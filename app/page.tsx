"use client";

export default function Home() {
  return (
    <button
      onClick={async () => {
        const { message } = await import(
          /* webpackChunkName: "named-widget" */
          "./widget.ts"
        );
        alert(message);
      }}
    >
      Load named widget
    </button>
  );
}
