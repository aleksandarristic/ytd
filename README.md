# YTD
A dead-simple yt-dlp cli

## Installation
```shell
git pull git@github.com:aleksandarristic/ytd.git
cd ytd
npm install -g .
```

## Usage
```shell
ytd url1 url2 url3
```
*OR*
```shell
ytd -l list-file.txt
```

## Notes
* Assumes you have a "Downloads" directory in your user directory
* Downloads audio to ```$HOME/Downloads/music```
* Downloads video to ```$HOME/Downloads/video```
* Auto-downloads `yt-dlp`
* Requires `ffmpeg` for some actions
* Supports chapter cutting and playlists
