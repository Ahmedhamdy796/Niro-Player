'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');

  useEffect(() => {
    // Check URL parameters for video
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('video');
    if (videoParam) {
      setCurrentVideo(decodeURIComponent(videoParam));
    }
  }, []);

  const handleVideoChange = (newVideoUrl: string) => {
    setCurrentVideo(newVideoUrl);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('video', encodeURIComponent(newVideoUrl));
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <VideoPlayer
        src={currentVideo}
        type="auto"
        className="w-full h-full"
        onVideoChange={handleVideoChange}
      />
    </div>
  );
}
