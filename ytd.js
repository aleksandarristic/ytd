#!/usr/bin/env node

import { join } from 'path';
import chalk from 'chalk';
import YTDlpWrap from 'yt-dlp-wrap';

import { existsSync, readFileSync } from 'fs';
import get_command from './command.js';
import os from 'os';
import { Command } from 'commander';

// logging and chalk shorthands
const log = console.log;
const bold = chalk.bold;
const gray = chalk.gray;
const red = chalk.red;

// HEADER OF THE CLI
log(bold("ytd"), '- a dead-simple youtube downloader');
log();

// ARGUMENT PARSING
const program = new Command();
program
    .argument('[urls...]')
    .option('-l, --list <file>', 'File with a list of urls', null);
program.parse();

// Extract URLs from either command line of from the list file
const options = program.opts();
if (options.list) {
    try {
        var downloadUrls = readFileSync(options.list).toString().split('\n');
    } catch (error) {
        log(red(`Could not read file "${options.list}"!`));
        process.exit(-1);
    }
} else if (program.args) {
    var downloadUrls = program.args;
}
if (downloadUrls.length < 1) {
    log(red('No urls provided!'));
    log(bold('You must specify urls as arguments, or a list file that exists!'));
    process.exit(-1);
}

// Download the yt-dlp binary if it doesn't exist
if (!existsSync('./yt-dlp')){
    console.log('yt-dlp binary not found, downloading from Github')
    YTDlpWrap.downloadFromGithub();
    console.log('yt-dlp downloaded.');
}

// Get Downloads dir
const base_path = join(os.homedir(), 'Downloads');

// Get the command from user interactively
let command = get_command(base_path);

// Process command agains downloadUrls 
if (command != null) {
    const ytdlp = new YTDlpWrap.default(); // wow. just.... wow.

    downloadUrls.forEach(function (val, index, array) {
        if (val) {
            let ytDlpEventEmitter = ytdlp.exec([val, ...command])
            .on('ytDlpEvent', (eventType, eventData) =>
                log(gray(eventType, eventData))
            )
            .on('error', (error) => console.error(error))
            .on('close', () => log(bold('Downloading', val, 'complete!')));
        }
    });

} else {
    log(bold('Quit selected.'));
}