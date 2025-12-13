import Hls from 'hls.js';
import type { VideoType } from './types';

export const detectVideoType = (url: string, type: VideoType = 'auto'): 'hls' | 'mp4' => {
  if (type !== 'auto') return type;
  if (url.includes('.m3u8')) return 'hls';
  return 'mp4';
};

export const formatTime = (time: number): string => {
  if (isNaN(time) || time < 0) return '0:00';

  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // For videos longer than 60 minutes, use HH:MM:SS format
  if (totalSeconds >= 3600) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // For shorter videos, use MM:SS format
  // Don't pad minutes with leading zero if it's 0
  const minutesStr = hours > 0 ? minutes.toString().padStart(2, '0') : minutes.toString();
  const secondsStr = seconds.toString().padStart(2, '0');

  return `${minutesStr}:${secondsStr}`;
};

export const initializeHlsPlayer = (
  src: string,
  video: HTMLVideoElement,
  onError: (error: string) => void
): Hls | null => {
  if (!Hls.isSupported()) {
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      return null;
    } else {
      onError('HLS is not supported in this browser');
      return null;
    }
  }

  const hls = new Hls({
    enableWorker: true,
    lowLatencyMode: true,
  });

  hls.loadSource(src);
  hls.attachMedia(video);

  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    console.log('HLS manifest loaded');
  });

  hls.on(Hls.Events.ERROR, (event, data) => {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          onError('Network error occurred');
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          onError('Media error occurred');
          hls.recoverMediaError();
          break;
        default:
          onError('Fatal error occurred');
          hls.destroy();
          break;
      }
    }
  });

  return hls;
};

export const cleanupVideoSource = (
  hlsInstance: React.MutableRefObject<Hls | null>,
  video: HTMLVideoElement
): void => {
  if (hlsInstance.current) {
    hlsInstance.current.destroy();
    hlsInstance.current = null;
  }
  video.src = '';
  video.load();
};
