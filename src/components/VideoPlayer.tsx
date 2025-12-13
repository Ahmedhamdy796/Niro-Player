'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import VideoControls from './VideoControls';
import { detectVideoType, formatTime, initializeHlsPlayer, cleanupVideoSource } from './utils';
import type { VideoPlayerProps, VideoState } from './types';

export default function VideoPlayer({
  src,
  type = 'auto',
  poster,
  className = '',
  onVideoChange
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    error: null,
    showControls: true,
  });

  const videoType = detectVideoType(src, type);

  // Initialize HLS or regular video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clean up previous video source
    cleanupVideoSource(hlsRef, video);

    // Reset state
    setState(prev => ({
      ...prev,
      error: null,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
    }));

    if (videoType === 'hls') {
      const hls = initializeHlsPlayer(src, video, (error) => {
        setState(prev => ({ ...prev, error }));
      });
      hlsRef.current = hls;
    } else {
      // MP4 or other formats
      video.src = src;
    }

    return () => {
      cleanupVideoSource(hlsRef, video);
    };
  }, [src, videoType]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setState(prev => ({ ...prev, currentTime: video.currentTime }));
    const handleDurationChange = () => setState(prev => ({ ...prev, duration: video.duration }));
    const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));
    const handleVolumeChange = () => setState(prev => ({
      ...prev,
      volume: video.volume,
      isMuted: video.muted
    }));

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setState(prev => ({ ...prev, isFullscreen: !!document.fullscreenElement }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  const resetHideControlsTimer = () => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    setState(prev => ({ ...prev, showControls: true }));

    if (state.isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setState(prev => ({ ...prev, showControls: false }));
      }, 3000);
    }
  };

  // Control functions
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const handleVolumeChange = (volume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    setState(prev => ({
      ...prev,
      volume,
      isMuted: volume === 0 ? true : prev.isMuted
    }));

    if (volume > 0 && state.isMuted) {
      video.muted = false;
      setState(prev => ({ ...prev, isMuted: false }));
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !state.isMuted;
    video.muted = newMuted;
    setState(prev => ({ ...prev, isMuted: newMuted }));
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!state.isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, video.currentTime - 10);
    video.currentTime = newTime;
    setState(prev => ({ ...prev, currentTime: newTime }));
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.min(video.duration, video.currentTime + 10);
    video.currentTime = newTime;
    setState(prev => ({ ...prev, currentTime: newTime }));
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (video !== document.pictureInPictureElement) {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error('PiP failed:', error);
    }
  };

  const sampleVideos = [
    {
      name: 'HLS Stream',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'hls' as const
    },
    {
      name: 'MP4 Video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'mp4' as const
    }
  ];

  const [showVideoMenu, setShowVideoMenu] = useState(false);

  const loadVideo = (url: string) => {
    setState(prev => ({
      ...prev,
      error: null,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
    }));
    // This will trigger the useEffect to load the new video
    // We'll need to pass a callback prop or use a different approach
    // For now, let's emit a custom event or modify the src prop
  };

  return (
    <div
      className={`relative bg-black overflow-hidden ${className}`}
      onMouseMove={resetHideControlsTimer}
      onMouseLeave={() => state.isPlaying && setState(prev => ({ ...prev, showControls: false }))}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        onClick={togglePlay}
        playsInline
      />

      {state.error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white p-4">
          <div className="text-center">
            <div className="text-xl mb-2">⚠️</div>
            <div>{state.error}</div>
          </div>
        </div>
      )}

      {/* Server/Video Switcher Icon - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowVideoMenu(!showVideoMenu)}
          className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-all hover:scale-105"
          aria-label="Video options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.5 20q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20zm0-2h12q1.05 0 1.775-.725T21 15.5t-.725-1.775T18.5 13H17v-2q0-2.075-1.463-3.538T12 6T8.463 7.463T7 11h-.5q-1.45 0-2.475 1.025T3 14.5t1.025 2.475T6.5 18m5.5-6"/>
          </svg>
        </button>

        {/* Video Options Menu */}
        {showVideoMenu && (
          <div className="absolute top-12 left-0 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-48 border border-gray-700">
            {sampleVideos.map((video, index) => (
              <button
                key={index}
                onClick={() => {
                  if (onVideoChange) {
                    onVideoChange(video.url);
                    setShowVideoMenu(false);
                  }
                }}
                className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded transition-colors flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${
                  video.type === 'hls' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <div>
                  <div className="text-sm font-medium">{video.name}</div>
                  <div className="text-xs text-gray-400">{video.type.toUpperCase()}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
          state.showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setState(prev => ({ ...prev, showControls: true }))}
        onMouseLeave={() => {
          if (state.isPlaying) {
            // Only auto-hide if video is playing
            hideControlsTimeout.current = setTimeout(() => {
              setState(prev => ({ ...prev, showControls: false }));
            }, 3000);
          }
        }}
      >
        <VideoControls
          ref={controlsRef}
          isPlaying={state.isPlaying}
          currentTime={state.currentTime}
          duration={state.duration}
          volume={state.volume}
          isMuted={state.isMuted}
          isFullscreen={state.isFullscreen}
          onPlayPause={togglePlay}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullscreen}
          onSkipBackward={skipBackward}
          onSkipForward={skipForward}
          onTogglePiP={togglePiP}
          formatTime={formatTime}
        />
      </div>

      {/* Play button overlay when paused */}
      {!state.isPlaying && !state.error && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-black/50 rounded-full p-6 hover:bg-black/70 transition-colors">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
