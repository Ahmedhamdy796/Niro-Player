# Niro Player 🎬

A modern, feature-rich video player built with Next.js, TypeScript, and HLS.js. This player provides a professional streaming experience with comprehensive controls and customizable options.

## ✨ Features

### 🎮 **Core Functionality**
- **HLS Streaming Support**: Native HLS (.m3u8) stream playback
- **MP4 Support**: Standard video format compatibility
- **Auto-detection**: Automatically detects video format (HLS/MP4)
- **Responsive Design**: Works seamlessly across all device sizes

### 🎛️ **Advanced Controls**
- **Playback Controls**: Play/Pause, Skip Forward (10s), Skip Backward (10s)
- **Volume Control**: Mute/Unmute with adjustable volume slider
- **Progress Bar**: Seek through video with visual progress indicator
- **Fullscreen**: Toggle fullscreen mode with proper browser API support

### 📱 **Smart Controls**
- **Auto-hide**: Controls automatically hide during playback for immersive viewing
- **Hover Activation**: Controls appear instantly on mouse hover
- **Touch-friendly**: Optimized for both desktop and mobile interactions
- **Keyboard Accessible**: Full keyboard navigation support

### ⚙️ **Settings & Customization**
- **Quality Selection**: Choose from multiple quality options (Auto, 1080p, 720p, 480p, 360p)
- **Playback Speed**: Adjust playback speed (0.5x to 2.0x)
- **Loop Mode**: Enable/disable video looping
- **Caption Support**: Toggle captions on/off with advanced settings
- **Video Sources**: Switch between different video sources

### 🎪 **Premium Features**
- **Picture-in-Picture**: Pop-out video player for multitasking
- **Watch Party**: Ready for social viewing experiences
- **Chromecast Support**: Cast to compatible devices
- **Video Switching**: Easy switching between sample videos

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/friday2su/Niro-Player.git
   cd Niro-Player
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the player in action.

## 🎯 Usage

### Basic Implementation

```tsx
import VideoPlayer from '@/components/VideoPlayer';

export default function HomePage() {
  return (
    <div className="w-full h-screen">
      <VideoPlayer
        src="https://example.com/video.m3u8"
        type="hls"
        poster="/poster.jpg"
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | Video source URL (HLS or MP4) |
| `type` | `'hls' \| 'mp4' \| 'auto'` | `'auto'` | Video format (auto-detects if not specified) |
| `poster` | `string` | `undefined` | Poster image URL for video thumbnail |
| `className` | `string` | `''` | Additional CSS classes |
| `onVideoChange` | `(url: string) => void` | `undefined` | Callback when video source changes |

## 🎮 Controls Guide

### Left Side Controls
- **⏮️ Backward**: Skip 10 seconds backward
- **▶️/⏸️ Play/Pause**: Toggle video playback
- **⏭️ Forward**: Skip 10 seconds forward
- **🔊 Volume**: Mute/unmute with volume slider
- **🕒 Duration**: Shows total video duration

### Right Side Controls
- **💬 Captions**: Toggle captions and access caption settings
- **📺 PiP**: Enable picture-in-picture mode
- **⚙️ Settings**: Access comprehensive settings menu
- **⛶ Fullscreen**: Toggle fullscreen mode

### Settings Menu Options
- **Quality**: Auto, 1080p, 720p, 480p, 360p
- **Video Sources**: Switch between available video streams
- **Watch Party**: Start collaborative viewing session
- **Chromecast**: Cast to Chromecast-enabled devices
- **Captions**: Enable/disable with advanced configuration
- **Playback**: Speed control and loop settings

## 🏗️ Technical Architecture

### Technologies Used
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **HLS.js**: HLS streaming support
- **Lucide Icons**: Modern icon library

### Component Structure
```
src/
├── components/
│   ├── VideoPlayer.tsx      # Main player component
│   ├── VideoControls.tsx    # Control interface
│   ├── types.ts            # TypeScript definitions
│   └── utils.ts            # Helper functions
├── app/
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # App layout
│   └── globals.css        # Global styles
```

### Key Features Implementation
- **HLS Support**: Uses HLS.js for seamless streaming
- **State Management**: React hooks for player state
- **Event Handling**: Proper video event listeners
- **Accessibility**: ARIA labels and keyboard support
- **Performance**: Optimized rendering and memory management

## 🎨 Customization

### Styling
The player uses Tailwind CSS for styling. Customize colors, sizes, and animations by modifying the component classes.

### Video Sources
Add more sample videos in `VideoPlayer.tsx`:

```tsx
const sampleVideos = [
  {
    name: 'Your Video',
    url: 'https://your-video-url.com/stream.m3u8',
    type: 'hls' as const
  }
];
```

### Settings Options
Extend the settings menu by adding new options to the settings panel in `VideoControls.tsx`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [HLS.js](https://github.com/video-dev/hls.js) for HLS streaming support
- [Next.js](https://nextjs.org) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Lucide Icons](https://lucide.dev) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/friday2su/Niro-Player/issues) page
2. Create a new issue with detailed information
3. Provide browser console logs if applicable

---

**Made with ❤️ for the streaming community**
