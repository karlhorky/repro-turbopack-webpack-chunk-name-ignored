"use client";

import { useState, type ReactNode } from "react";

export default function Home() {
  const [videoPlayer, setVideoPlayer] = useState<ReactNode>(null);

  return (
    <>
      <button
        onClick={async () => {
          const { default: VideoPlayer } = await import(
            /* turbopackChunkName: "project-video-player" */
            "./VideoPlayer.tsx"
          );
          setVideoPlayer(<VideoPlayer />);
        }}
      >
        Load video player
      </button>
      {videoPlayer}
    </>
  );
}
