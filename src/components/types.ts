export interface VideoPlayerProps {
  src: string;
  type?: 'hls' | 'mp4' | 'auto';
  poster?: string;
  className?: string;
  onVideoChange?: (url: string) => void;
}

export interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onTogglePiP: () => void;
  formatTime: (time: number) => string;
}

export interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  error: string | null;
  showControls: boolean;
}

export type VideoType = 'hls' | 'mp4' | 'auto';
