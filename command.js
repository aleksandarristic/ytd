import promptSync from 'prompt-sync';
import { join } from 'path';
import chalk from 'chalk';

const bold = chalk.bold;
const q = promptSync();

const get_command = (base_path) => {
    let choices = {
        a: {
            message: 'Download Audio (mp3)',
            command: ['-o', join(base_path, 'music', '%(title)s.%(ext)s'),
                        '-x',
                        '--format', 'bestaudio',
                        '--audio-format', 'mp3',
                        '--audio-quality', '0',
                        '-i']
        },
        b: {
            message: 'Download Audio (mp3) split by chapters',
            command: ['-o', join(base_path, 'music', '%(title)s.%(ext)s'),
                        '-x',
                        '--format', 'bestaudio',
                        '--audio-format', 'mp3',
                        '--audio-quality', '0',
                        '--split-chapters',
                        '-i']
        },
        p: {
            message: 'Download Audio (mp3) from Playlist',
            command: ['-o', join(base_path, 'music', '%(playlist)s', '%(playlist_index)s - %(title)s.%(ext)s'),
                        '-x',
                        '--format', 'bestaudio',
                        '--audio-format', 'mp3',
                        '--audio-quality', '0',
                        '-i',
                        '--yes-playlist']
        },
        r: {
            message: 'Download Audio (mp3) split by chapters from Playlist',
            command: ['-o', join(base_path, 'music', '%(playlist)s', '%(playlist_index)s - %(title)s.%(ext)s'),
                        '-x',
                        '--format', 'bestaudio',
                        '--audio-format', 'mp3',
                        '--audio-quality', '0',
                        '-i',
                        '--yes-playlist',
                        '--split-chapters']
        },
        v: {
            message: 'Download Video',
            command: ['-o', join(base_path, 'video', '%(title)s.%(ext)s'),
                        '-i']
        },
        q: {
            message: 'Quit - do nothing',
            command: null
        }
    }
    
    do {

        for (const [k, v] of Object.entries(choices)) {
            console.log(bold(`\t${k}:`), `${v["message"]}`);
          }
          
        var choice = q('> ');
        if (choice in choices) {
            return choices[choice].command;
        }
    } while (choice != null);

}

export default get_command;