'use client';

import { forwardRef, useState, useRef } from 'react';
import type { VideoControlsProps } from './types';

const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps & { showControls?: boolean }>(({
  isPlaying,
  currentTime,
  duration,
  bufferedEnd,
  volume,
  isMuted,
  isFullscreen,
  videoElement,
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
  const [activeSubSetting, setActiveSubSetting] = useState<string | null>(null);

  const progressBarRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
  };





  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 transition-opacity duration-300"
    >
      {/* Progress Bar */}
      <div className="mb-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.6) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.6) ${(bufferedEnd / duration) * 100}%, rgba(255,255,255,0.3) ${(bufferedEnd / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-white">
        {/* Left Side Controls */}
        <div className="flex items-center gap-4 group/volume-area">
          {/* Play/Pause Button - Leftmost */}
          <button
            onClick={handleButtonClick(onPlayPause)}
            className="cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"/>
              </svg>
            ) : (
              <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/>
              </svg>
            )}
          </button>

          {/* Skip Backward Button - Right of Play/Pause */}
          <button
            onClick={handleButtonClick(onSkipBackward)}
            className="cursor-pointer"
            aria-label="Skip backward 10 seconds"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 11.5h-.75q-.325 0-.537-.213T7.5 10.75t.213-.537T8.25 10h1.5q.325 0 .538.213t.212.537v4.5q0 .325-.213.538T9.75 16t-.537-.213T9 15.25zm3.5 4.5q-.425 0-.712-.288T11.5 15v-4q0-.425.288-.712T12.5 10h2q.425 0 .713.288T15.5 11v4q0 .425-.288.713T14.5 16zm.5-1.5h1v-3h-1zM12 22q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13q0-.425.288-.712T4 12t.713.288T5 13q0 2.925 2.038 4.963T12 20t4.963-2.037T19 13t-2.037-4.962T12 6h-.15l.85.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L8.7 5.7q-.3-.3-.3-.7t.3-.7l2.575-2.575q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-.85.85H12q1.875 0 3.513.713t2.85 1.925t1.925 2.85T21 13t-.712 3.513t-1.925 2.85t-2.85 1.925T12 22"/>
            </svg>
          </button>

          {/* Skip Forward Button */}
          <button
            onClick={handleButtonClick(onSkipForward)}
            className="cursor-pointer"
            aria-label="Skip forward 10 seconds"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 22q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13t.713-3.512t1.924-2.85t2.85-1.925T12 4h.15l-.85-.85q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L15.3 4.3q.3.3.3.7t-.3.7l-2.575 2.575q-.3.3-.712.288T11.3 8.25q-.275-.3-.288-.7t.288-.7l.85-.85H12Q9.075 6 7.038 8.038T5 13t2.038 4.963T12 20t4.963-2.037T19 13q0-.425.288-.712T20 12t.713.288T21 13q0 1.875-.712 3.513t-1.925 2.85t-2.85 1.925T12 22M9 11.5h-.75q-.325 0-.537-.213T7.5 10.75t.213-.537T8.25 10h1.5q.325 0 .538.213t.212.537v4.5q0 .325-.213.538T9.75 16t-.537-.213T9 15.25zm3.5 4.5q-.425 0-.712-.288T11.5 15v-4q0-.425.288-.712T12.5 10h2q.425 0 .713.288T15.5 11v4q0 .425-.288.713T14.5 16zm.5-1.5h1v-3h-1z"/>
            </svg>
          </button>

          {/* Volume Control & Duration */}
          <div className="flex items-center group">
            <button
              onClick={handleButtonClick(onToggleMute)}
              className="cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
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
              className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider ml-4"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
              }}
            />
            {/* Duration Display */}
            <div className="text-lg font-medium font-mono ml-4">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Caption Button */}
          <button
            className="cursor-pointer"
            aria-label="Captions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 20q-.825 0-1.412-.587T3 18V6q0-.825.588-1.412T5 4h14q.825 0 1.413.588T21 6v12q0 .825-.587 1.413T19 20zm2-5h3q.425 0 .713-.288T11 14v-.5q0-.225-.15-.375t-.375-.15h-.45q-.225 0-.375.15t-.15.375h-2v-3h2q0 .225.15.375t.375.15h.45q.225 0 .375-.15T11 10.5V10q0-.425-.288-.712T10 9H7q-.425 0-.712.288T6 10v4q0 .425.288.713T7 15m10-6h-3q-.425 0-.712.288T13 10v4q0 .425.288.713T14 15h3q.425 0 .713-.288T18 14v-.5q0-.225-.15-.375t-.375-.15h-.45q-.225 0-.375.15t-.15.375h-2v-3h2q0 .225.15.375t.375.15h.45q.225 0 .375-.15T18 10.5V10q0-.425-.288-.712T17 9"/>
            </svg>
          </button>

          {/* Picture-in-Picture Button */}
          <button
            onClick={handleButtonClick(onTogglePiP)}
            className="cursor-pointer"
            aria-label="Picture in Picture"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 11q-.425 0-.712-.288T2 10t.288-.712T3 9h2.6L2 5.425q-.3-.3-.3-.712T2 4t.713-.3t.712.3L7 7.6V5q0-.425.288-.712T8 4t.713.288T9 5v5q0 .425-.288.713T8 11zm1 9q-.825 0-1.412-.587T2 18v-4q0-.425.288-.712T3 13t.713.288T4 14v4h7q.425 0 .713.288T12 19t-.288.713T11 20zm17-7q-.425 0-.712-.288T20 12V6h-8q-.425 0-.712-.288T11 5t.288-.712T12 4h8q.825 0 1.413.588T22 6v6q0 .425-.288.713T21 13m-6 7q-.425 0-.712-.288T14 19v-3q0-.425.288-.712T15 15h6q.425 0 .713.288T22 16v3q0 .425-.288.713T21 20z"/>
            </svg>
          </button>

          {/* Settings Button */}
          <div className="relative">
            <button
              onClick={handleButtonClick(() => setShowSettings(!showSettings))}
              className="cursor-pointer"
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/>
              </svg>
            </button>

            {/* Settings Menu */}
            {showSettings && (
              <div className="absolute bottom-14 right-0 bg-[#0c1216] backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl animate-in slide-in-from-bottom-2 duration-300 min-w-[350px] max-w-md overflow-hidden z-50">
                {/* Header with Back Button */}
                {activeSubSetting && (
                  <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-700/30">
                    <button
                      onClick={() => setActiveSubSetting(null)}
                      className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-white font-semibold text-base">
                      {activeSubSetting}
                    </h3>
                  </div>
                )}

                <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                  {!activeSubSetting ? (
                    /* Main Settings View */
                    <div className="p-4 pt-6">
                      {/* Video Settings Section */}
                      <div className="mb-6">
                        <div className="mb-2 px-2">
                          <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider">Video Settings</h4>
                          <div className="h-px bg-gray-700/30 mt-2"></div>
                        </div>
                        <div className="space-y-1">
                          <button
                            onClick={() => setActiveSubSetting('Quality')}
                            className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                          >
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Quality</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium text-sm">1080p</span>
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>

                          <button
                            onClick={() => setActiveSubSetting('Video Sources')}
                            className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                          >
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Video sources</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium text-sm">HLS Sample</span>
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>

                          <button
                            onClick={() => setActiveSubSetting('Watch Party')}
                            className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                          >
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Watch Party</span>
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </button>

                          <button
                            onClick={() => setActiveSubSetting('Chromecast')}
                            className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                          >
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Chromecast</span>
                          </button>
                        </div>
                      </div>

                      {/* Viewing Experience Section */}
                      <div>
                        <div className="mb-2 px-2">
                          <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider">Viewing Experience</h4>
                          <div className="h-px bg-gray-700/30 mt-2"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group">
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Enable Subtitles</span>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black">
                              <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                            </button>
                          </div>

                          <button
                            onClick={() => setActiveSubSetting('Subtitle Settings')}
                            className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                          >
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Subtitle settings</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium text-sm">Japanese</span>
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>

                          <button
                            onClick={() => setActiveSubSetting('Playback Settings')}
                            className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                          >
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Playback settings</span>
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Sub-settings View */
                    <div className="p-4">
                      {activeSubSetting === 'Quality' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            {['Auto', '1080p', '720p', '480p', '360p'].map((quality) => (
                              <button
                                key={quality}
                                className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                              >
                                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{quality}</span>
                                {quality === '1080p' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Video Sources' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            <button className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer">
                              <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">HLS Sample</span>
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </button>
                            <button className="w-full bg-blue-600/90 hover:bg-blue-500 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium cursor-pointer mt-4">
                              Switch Source
                            </button>
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Playback Speed' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            {['0.5x', '0.75x', '1.0x', '1.25x', '1.5x', '2.0x'].map((speed) => (
                              <button
                                key={speed}
                                className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                              >
                                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{speed}</span>
                                {speed === '1.0x' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Captions' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            <button className="w-full bg-green-600/90 hover:bg-green-500 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium cursor-pointer">
                              Turn On Captions
                            </button>
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Caption Language' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            {['English', 'Spanish', 'French', 'German', 'Japanese'].map((lang) => (
                              <button
                                key={lang}
                                className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                              >
                                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{lang}</span>
                                {lang === 'English' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Caption Size' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                              <button
                                key={size}
                                className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                              >
                                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{size}</span>
                                {size === 'Medium' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Watch Party' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            <button className="w-full bg-purple-600/90 hover:bg-purple-500 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium cursor-pointer">
                              Start Watch Party
                            </button>
                          </div>
                        </div>
                      )}

                      {activeSubSetting === 'Chromecast' && (
                        <div className="p-4 pt-6">
                          <div className="space-y-1">
                            <button className="w-full bg-red-600/90 hover:bg-red-500 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium cursor-pointer">
                              Cast to Device
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleButtonClick(onToggleFullscreen)}
            className="cursor-pointer"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512">
                <path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512">
                <path fill="currentColor" d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/>
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
