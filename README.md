# CasparCG Playlist Automation

A TypeScript-based automated playlist controller for CasparCG broadcast server, enabling scheduled playback of video-on-demand (VOD) content and live streams with precise timing and smooth transitions.

## Features

- **Scheduled Playback**: Schedule video blocks with exact start times
- **VOD & Live Streams**: Support for both local video files and live stream sources (RTMP, RTSP, HTTP/HTTPS)
- **Smooth Transitions**: Configurable transition effects (MIX, CUT, WIPE) between clips
- **Default Stream Handling**: Automatic fallback to default content during inactivity periods
- **Subtitle Support**: Built-in support for subtitle configuration (requires template implementation)
- **SCTE-35 Markers**: Support for ad insertion markers (requires additional implementation)
- **Automatic Duration Detection**: Uses FFprobe to automatically detect video clip durations
- **Block-Based Scheduling**: Organize content into blocks with total duration control
- **Iteration Control**: Repeat clips multiple times within a single block
- **Flexible Configuration**: JSON-based playlist configuration with environment variable support

## Prerequisites

- Node.js >= 14.0.0
- CasparCG Server (v2.0+)
- FFmpeg/FFprobe (automatically included via ffprobe-static)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/stukenov/casparcg-playlist-automation.git
cd casparcg-playlist-automation
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp example.env .env
# Edit .env with your CasparCG server settings
```

4. Create your playlist configuration:
```bash
cp playlist.json.example playlist.json
# Edit playlist.json with your content schedule
```

## Configuration

### Environment Variables (.env)

```env
# CasparCG Server Configuration
CASPARCG_HOST=localhost
CASPARCG_PORT=5250

# Media path for CasparCG server
MEDIA_PATH=/path/to/casparcg/media
```

### Playlist Configuration (playlist.json)

The playlist is structured with tasks and blocks:

```json
{
  "SyncInterval": 1000,
  "Tasks": [
    {
      "Stream": "live/playlist",
      "InactivityTimeout": 10,
      "Blocks": [
        {
          "Id": "1",
          "Name": "Morning Block",
          "Start": "2024-09-24 09:00:00",
          "DefaultStream": {
            "Type": "vod",
            "Source": "default_loop.mp4"
          },
          "Streams": [
            {
              "Type": "vod",
              "Source": "intro.mp4",
              "Duration": 5000,
              "MaxIterations": 1
            },
            {
              "Type": "live",
              "Source": "rtmp://live.example.com/stream",
              "Duration": 30000
            }
          ]
        }
      ]
    }
  ]
}
```

#### Configuration Fields

- **SyncInterval**: Synchronization interval in milliseconds
- **Tasks**: Array of task objects containing blocks
- **Blocks**: Individual scheduled content blocks
  - `Id`: Unique identifier for the block
  - `Name`: Descriptive name
  - `Start`: Start time in format "YYYY-MM-DD HH:MM:SS"
  - `DefaultStream`: Fallback content during inactivity
  - `Streams`: Array of content items to play
    - `Type`: "vod" or "live"
    - `Source`: File path or stream URL
    - `Duration`: Duration in milliseconds (optional, auto-detected for VOD)
    - `Start`: Start position in milliseconds (optional)
    - `MaxIterations`: Number of times to repeat the clip (default: 1)

## Usage

### Build the project:
```bash
npm run build
```

### Start the automation:
```bash
npm start
```

### Development mode (build + run):
```bash
npm run dev
```

### Run tests:
```bash
npm test
```

### Watch mode for tests:
```bash
npm run test:watch
```

## Project Structure

```
casparcg-playlist-automation/
├── src/
│   ├── config/
│   │   └── dotenv.ts           # Environment configuration
│   ├── controllers/
│   │   └── playlistController.ts   # Main playlist logic
│   ├── models/
│   │   ├── block.ts            # Block data models
│   │   ├── clip.ts             # Clip data models
│   │   ├── playlistData.ts     # Playlist data models
│   │   ├── stream.ts           # Stream data models
│   │   └── task.ts             # Task data models
│   ├── services/
│   │   ├── casparcgService.ts  # CasparCG connection service
│   │   ├── ffmpegService.ts    # FFmpeg/FFprobe service
│   │   └── playlistService.ts  # Playlist processing service
│   ├── utils/
│   │   └── timeUtils.ts        # Time utility functions
│   └── main.ts                 # Application entry point
├── playlist.json.example       # Example playlist configuration
├── example.env                 # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. **Playlist Loading**: The application reads the playlist configuration from `playlist.json`
2. **Block Scheduling**: Blocks are sorted by start time and scheduled accordingly
3. **Wait for Start Time**: The system waits until each block's scheduled start time
4. **Content Playback**: Streams within a block are played sequentially with transitions
5. **Duration Management**: For VOD content, duration is auto-detected; for live streams, configured duration is used
6. **Default Stream**: After block completion, if `InactivityTimeout` is reached and no next block is scheduled, the default stream plays in a loop
7. **Smooth Transitions**: Content transitions use configurable effects (MIX by default) with specified duration

## Advanced Features

### Transitions

Customize transitions by modifying the following constants in the controller:
- `transitionDuration`: Duration in seconds (default: 1)
- `transitionType`: Type of transition - 'MIX', 'CUT', 'WIPE', etc. (default: 'MIX')
- `fps`: Frame rate for transition calculations (default: 25)

### Live Stream Handling

Live streams are automatically detected by URL protocol (rtmp://, rtsp://, http://, https://). The system:
- Uses the configured duration for playback
- Stops the stream after the duration expires
- Moves to the next content item

### Subtitle Support

While the infrastructure for subtitles is in place, full implementation requires CasparCG templates. Subtitle configuration:

```json
{
  "Subtitles": [
    {
      "Code": "en",
      "Name": "English",
      "Path": "subtitles/video_en.srt"
    }
  ]
}
```

### SCTE-35 Ad Markers

SCTE-35 marker support is available for ad insertion planning:

```json
{
  "Scte35Markers": [
    {
      "Start": "00:05:00",
      "Type": "In",
      "Duration": 30000
    }
  ]
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**stukenov**

## Acknowledgments

- Built with [casparcg-connection](https://github.com/SuperFlyTV/casparcg-connection) - Official Node.js library for CasparCG
- Uses [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) for media file analysis
- Powered by TypeScript for type-safe development

## Support

For issues and questions, please use the [GitHub issue tracker](https://github.com/stukenov/casparcg-playlist-automation/issues).
