'use client';

import { forwardRef, useState } from 'react';
import type { VideoControlsProps } from './types';

const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps & { showControls?: boolean }>(({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isFullscreen,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onSkipBackward,
  onSkipForward,
  onTogglePiP,
  formatTime,
  showControls = true,
}, ref) => {
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    onSeek(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    onVolumeChange(vol);
  };

  const [showSettings, setShowSettings] = useState(false);

  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300"
    >
      {/* Progress Bar */}
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-white">
        {/* Left Side Controls */}
        <div className="flex items-center gap-4">
          {/* Skip Backward Button */}
          <button
            onClick={handleButtonClick(onSkipBackward)}
            className="hover:scale-110 transition-transform cursor-pointer"
            aria-label="Skip backward 10 seconds"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 11.5h-.75q-.325 0-.537-.213T7.5 10.75t.213-.537T8.25 10h1.5q.325 0 .538.213t.212.537v4.5q0 .325-.213.538T9.75 16t-.537-.213T9 15.25zm3.5 4.5q-.425 0-.712-.288T11.5 15v-4q0-.425.288-.712T12.5 10h2q.425 0 .713.288T15.5 11v4q0 .425-.288.713T14.5 16zm.5-1.5h1v-3h-1zM12 22q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13q0-.425.288-.712T4 12t.713.288T5 13q0 2.925 2.038 4.963T12 20t4.963-2.037T19 13t-2.037-4.962T12 6h-.15l.85.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L8.7 5.7q-.3-.3-.3-.7t.3-.7l2.575-2.575q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-.85.85H12q1.875 0 3.513.713t2.85 1.925t1.925 2.85T21 13t-.712 3.513t-1.925 2.85t-2.85 1.925T12 22"/>
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handleButtonClick(onPlayPause)}
            className="hover:scale-110 transition-transform cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/>
              </svg>
            )}
          </button>

          {/* Skip Forward Button */}
          <button
            onClick={handleButtonClick(onSkipForward)}
            className="hover:scale-110 transition-transform cursor-pointer"
            aria-label="Skip forward 10 seconds"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 22q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13t.713-3.512t1.924-2.85t2.85-1.925T12 4h.15l-.85-.85q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L15.3 4.3q.3.3.3.7t-.3.7l-2.575 2.575q-.3.3-.712.288T11.3 8.25q-.275-.3-.288-.7t.288-.7l.85-.85H12Q9.075 6 7.038 8.038T5 13t2.038 4.963T12 20t4.963-2.037T19 13q0-.425.288-.712T20 12t.713.288T21 13q0 1.875-.712 3.513t-1.925 2.85t-2.85 1.925T12 22M9 11.5h-.75q-.325 0-.537-.213T7.5 10.75t.213-.537T8.25 10h1.5q.325 0 .538.213t.212.537v4.5q0 .325-.213.538T9.75 16t-.537-.213T9 15.25zm3.5 4.5q-.425 0-.712-.288T11.5 15v-4q0-.425.288-.712T12.5 10h2q.425 0 .713.288T15.5 11v4q0 .425-.288.713T14.5 16zm.5-1.5h1v-3h-1z"/>
            </svg>
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleButtonClick(onToggleMute)}
              className="hover:scale-110 transition-transform cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 11.975q0-2.075-1.1-3.787t-2.95-2.563q-.375-.175-.55-.537t-.05-.738q.15-.4.538-.575t.787 0Q18.1 4.85 19.55 7.063T21 11.974t-1.45 4.913t-3.875 3.287q-.4.175-.788 0t-.537-.575q-.125-.375.05-.737t.55-.538q1.85-.85 2.95-2.562t1.1-3.788M7 15H4q-.425 0-.712-.288T3 14v-4q0-.425.288-.712T4 9h3l3.3-3.3q.475-.475 1.088-.213t.612.938v11.15q0 .675-.612.938T10.3 18.3zm9.5-3q0 1.05-.475 1.988t-1.25 1.537q-.25.15-.513.013T14 15.1V8.85q0-.3.263-.437t.512.012q.775.625 1.25 1.575t.475 2"/>
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
              }}
            />
          </div>

          {/* Duration Display */}
          <div className="text-sm font-medium">
            {formatTime(duration)}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Caption Button */}
          <button
            className="hover:scale-110 transition-transform cursor-pointer"
            aria-label="Captions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 20q-.825 0-1.412-.587T3 18V6q0-.825.588-1.412T5 4h14q.825 0 1.413.588T21 6v12q0 .825-.587 1.413T19 20zm2-5h3q.425 0 .713-.288T11 14v-.5q0-.225-.15-.375t-.375-.15h-.45q-.225 0-.375.15t-.15.375h-2v-3h2q0 .225.15.375t.375.15h.45q.225 0 .375-.15T11 10.5V10q0-.425-.288-.712T10 9H7q-.425 0-.712.288T6 10v4q0 .425.288.713T7 15m10-6h-3q-.425 0-.712.288T13 10v4q0 .425.288.713T14 15h3q.425 0 .713-.288T18 14v-.5q0-.225-.15-.375t-.375-.15h-.45q-.225 0-.375.15t-.15.375h-2v-3h2q0 .225.15.375t.375.15h.45q.225 0 .375-.15T18 10.5V10q0-.425-.288-.712T17 9"/>
            </svg>
          </button>

          {/* Picture-in-Picture Button */}
          <button
            onClick={handleButtonClick(onTogglePiP)}
            className="hover:scale-110 transition-transform cursor-pointer"
            aria-label="Picture in Picture"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 11q-.425 0-.712-.288T2 10t.288-.712T3 9h2.6L2 5.425q-.3-.3-.3-.712T2 4t.713-.3t.712.3L7 7.6V5q0-.425.288-.712T8 4t.713.288T9 5v5q0 .425-.288.713T8 11zm1 9q-.825 0-1.412-.587T2 18v-4q0-.425.288-.712T3 13t.713.288T4 14v4h7q.425 0 .713.288T12 19t-.288.713T11 20zm17-7q-.425 0-.712-.288T20 12V6h-8q-.425 0-.712-.288T11 5t.288-.712T12 4h8q.825 0 1.413.588T22 6v6q0 .425-.288.713T21 13m-6 7q-.425 0-.712-.288T14 19v-3q0-.425.288-.712T15 15h6q.425 0 .713.288T22 16v3q0 .425-.288.713T21 20z"/>
            </svg>
          </button>

          {/* Settings Button */}
          <div className="relative">
            <button
              onClick={handleButtonClick(() => setShowSettings(!showSettings))}
              className="hover:scale-110 transition-transform cursor-pointer"
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/>
              </svg>
            </button>

            {/* Settings Menu */}
            {showSettings && (
              <div className="absolute bottom-14 right-0 bg-black/95 backdrop-blur-md rounded-lg p-4 min-w-64 border border-gray-700 animate-in slide-in-from-bottom-2 duration-200">
                <div className="space-y-3">
                  <h3 className="text-white font-medium text-sm border-b border-gray-700 pb-2">Settings</h3>

                  {/* Quality */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Quality</span>
                    <select className="bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500">
                      <option>Auto</option>
                      <option>1080p</option>
                      <option>720p</option>
                      <option>480p</option>
                      <option>360p</option>
                    </select>
                  </div>

                  {/* Video Sources */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Video Sources</span>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors">
                      Switch
                    </button>
                  </div>

                  {/* Watch Party */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Watch Party</span>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors">
                      Start
                    </button>
                  </div>

                  {/* Chromecast */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Chromecast</span>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors">
                      Cast
                    </button>
                  </div>

                  {/* Captions */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">Captions</span>
                      <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors">
                        On
                      </button>
                    </div>
                    <div className="flex items-center justify-between pl-4">
                      <span className="text-gray-400 text-xs">Caption Settings</span>
                      <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>

                  {/* Playback */}
                  <div className="space-y-2">
                    <span className="text-white text-sm block">Playback</span>
                    <div className="pl-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Speed</span>
                        <select className="bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500">
                          <option>1.0x</option>
                          <option>1.25x</option>
                          <option>1.5x</option>
                          <option>2.0x</option>
                          <option>0.5x</option>
                          <option>0.75x</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Loop</span>
                        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors">
                          Off
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleButtonClick(onToggleFullscreen)}
            className="hover:scale-110 transition-transform cursor-pointer"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 18H4q-.425 0-.712-.288T3 17t.288-.712T4 16h3q.425 0 .713.288T8 17v3q0 .425-.288.713T7 21t-.712-.288T6 20zm12 0v2q0 .425-.288.713T17 21t-.712-.288T16 20v-3q0-.425.288-.712T17 16h3q.425 0 .713.288T21 17t-.288.713T20 18zM6 6V4q0-.425.288-.712T7 3t.713.288T8 4v3q0 .425-.288.713T7 8H4q-.425 0-.712-.288T3 7t.288-.712T4 6zm12 0h2q.425 0 .713.288T21 7t-.288.713T20 8h-3q-.425 0-.712-.288T16 7V4q0-.425.288-.712T17 3t.713.288T18 4z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5 19h2q.425 0 .713.288T8 20t-.288.713T7 21H4q-.425 0-.712-.288T3 20v-3q0-.425.288-.712T4 16t.713.288T5 17zm14 0v-2q0-.425.288-.712T20 16t.713.288T21 17v3q0 .425-.288.713T20 21h-3q-.425 0-.712-.288T16 20t.288-.712T17 19zM5 5v2q0 .425-.288.713T4 8t-.712-.288T3 7V4q0-.425.288-.712T4 3h3q.425 0 .713.288T8 4t-.288.713T7 5zm14 0h-2q-.425 0-.712-.288T16 4t.288-.712T17 3h3q.425 0 .713.288T21 4v3q0 .425-.288.713T20 8t-.712-.288T19 7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

VideoControls.displayName = 'VideoControls';

export default VideoControls;
