/**
 * @name BeRightBack
 * @version 0.1.0
 * @authorLink https://github.com/akucchi
 * @website https://github.com/akucchi/berightback
 * @source https://raw.githubusercontent.com/akucchi/berightback/master/BeRightBack.plugin.js
 * @updateUrl https://raw.githubusercontent.com/akucchi/berightback/master/BeRightBack.plugin.js
 */
/*@cc_on
@if (@_jscript)
	
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/

const { count } = require('console');

const BE_RIGHT_BACK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="20px" viewBox="0 0 24 24" width="20px" fill="none"><g><g><path d="M11,8v5l4.25,2.52l0.77-1.28l-3.52-2.09V8H11z M21,10V3l-2.64,2.64C16.74,4.01,14.49,3,12,3c-4.97,0-9,4.03-9,9 s4.03,9,9,9s9-4.03,9-9h-2c0,3.86-3.14,7-7,7s-7-3.14-7-7s3.14-7,7-7c1.93,0,3.68,0.79,4.95,2.05L14,10H21z" fill="currentColor"></path></g></g></svg>`;
const STOP_STREAMING_ICON = `<svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4ZM14.5483 6L16 7.45174L13.4466 9.99485L16 12.5483L14.5483 14L12.0051 11.4466L9.45174 14L8 12.5483L10.5534 9.99485L8 7.45174L9.45174 6L12.0051 8.55341L14.5483 6Z" fill="currentColor"></path></svg>`;

module.exports = (() => {
    const config = {
        info: {
            name: "BeRightBack",
            authors: [
                {
                    name: "aku",
                    discord_id: "323242540364988416",
                    github_username: "akucchi",
                    twitter_username: "akuvfx",
                },
            ],
            version: "0.1.0",
            description:
                "Adds \"Be right back\" button",
            github:
                "https://github.com/akucchi/berightback",
            github_raw:
                "https://raw.githubusercontent.com/akucchi/berightback/master/BeRightBack.plugin.js",
        },
        changelog: [
            {
                title: "It works",
                type: "fixed",
                items: ["Sometimes..."],
            },
        ],
        main: "index.js",
    };

    return class {
        constructor() {
            this._config = config;
        }
        getName() {
            return config.info.name;
        }
        getAuthor() {
            return config.info.authors.map(a => a.name).join(", ");
        }
        getDescription() {
            return config.info.description;
        }
        getVersion() {
            return config.info.version;
        }
        load() { }
        findButtonByAriaLabel(ariaLabel) {
            return document.querySelector(`button[aria-label="${ariaLabel}"]`);
        }
        clickButtonWithAriaLabel(ariaLabel) {
            const button = this.findButtonByAriaLabel(ariaLabel);

            if (button) {
                button.click();
            }
        }
        start() {
            this.interval = setInterval(() => {
                const krisp = this.findButtonByAriaLabel('Noise Suppression powered by Krisp');
                if (!this.button && krisp) {
                    this.afk = false;
                    this.button = document.createElement('button');
                    this.button.setAttribute('type', 'button')
                    this.button.setAttribute('aria-label', 'Be Right Back')
                    this.button.classList.add('button-14-BFJ');
                    this.button.classList.add('da-button');
                    this.button.classList.add('enabled-2cQ-u7');
                    this.button.classList.add('da-enabled');
                    this.button.classList.add('button-38aScr');
                    this.button.classList.add('da-button');
                    this.button.classList.add('lookBlank-3eh9lL');
                    this.button.classList.add('colorBrand-3pXr91');
                    this.button.classList.add('grow-q77ONN');
                    this.button.classList.add('da-grow');
                    this.button.innerHTML = BE_RIGHT_BACK_ICON;
                    this.button.addEventListener('click', () => this.beRightBack());
                    krisp.parentNode.prepend(this.button);
                }
                if (this.button && !krisp) {
                    this.button = null;
                }
            }, 100)
        }
        async beRightBack() {
            this.afk = !this.afk;
            if (this.afk) {
                const remote = require('electron').remote;
                const BrowserWindow = remote.BrowserWindow;

                this.window = new BrowserWindow({
                    x: 100000,
                    y: 100000,
                    width: 2560,
                    height: 1440,
                    frame: false,
                });

                // TODO: fix
                // this.window.on('close', () => {
                //     this.beRightBack();
                // })

                this.window.setMenu(null);
                await this.window.loadURL('https://cdn.discordapp.com/attachments/694797757247913984/821455389127999508/Untitled-1.png');
                this.window.setTitle('Be Right Back');

                if (this.findButtonByAriaLabel('Deafen').getAttribute("aria-checked") === "false") {
                    this.clickButtonWithAriaLabel('Deafen');
                }

                this.clickButtonWithAriaLabel('Stop Streaming');
                this.clickButtonWithAriaLabel('Share Your Screen');

                let counter = 0;
                const interval = setInterval(() => {
                    const tiles = document.querySelectorAll('.da-sourceContainer .da-tile');
                    tiles.forEach(tile => {
                        if (tile.querySelector('.da-sourceName').innerText === 'Be Right Back') {
                            tile.click();
                            document.querySelector('button[type="submit"]').click();
                            // TODO: make sure that user aint idiot
                            // setTimeout(() => document.querySelector('.da-activityPanel').style.display = 'none', 250);
                        }
                    });
                    counter += 1;
                    if (counter === 50 || tiles.length !== 0) {
                        clearInterval(interval);
                    }
                }, 100)

                this.button.innerHTML = STOP_STREAMING_ICON;
            } else {
                if (this.findButtonByAriaLabel('Deafen').getAttribute("aria-checked") === "true") {
                    this.clickButtonWithAriaLabel('Deafen');
                }
                if (this.window) {
                    this.window.close();
                }
                this.button.innerHTML = BE_RIGHT_BACK_ICON;
            }
        }
        stop() {
            this.button.remove();
            if (this.window) {
                this.window.close();
            }
            clearInterval(this.interval);
        }
    };
})();
/*@end@*/
