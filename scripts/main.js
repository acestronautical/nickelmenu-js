const NickelConfigOptions = {
    label: "config",
    title: "Configure menu label, icon, add or remove menu items",
    options: {
        menu_main_15505_label: [{ label: "label", title: "sets the label used for the NickelMenu button", placeholder: "Shortcuts" }],
        menu_main_15505_icon: [{ label: "icon", title: "sets icon used for the NickelMenu button", file: "assets/.nickel.png" }],
        menu_main_15505_icon_active: [{ label: "icon", title: "sets the active icon used for the NickelMenu button", file: "assets/.nickel_active.png" }],
        menu_item: [
            {
                label: "location",
                title: "the menu to add the item to",
                options: {
                    main: "the menu added to the tabs on the bottom-right",
                    reader: "the overflow menu in the reader",
                    browser: "the menu in the bottom-right of the web browser",
                    library: "the menu in the filter bar for the My Books and My Articles library views",
                    selection: "the selection menu",
                    selection_search: "the search sub-menu of the selection menu",
                }
            },
            {
                label: "label",
                title: "the label to show on the menu item (must not contain :)",
                placeholder: "menu item name"
            },
            {
                label: "actions",
                title: "the type of action to run",
                options: {
                    cmd_spawn: [{ label: "cmd", title: "starts a command in the background", placeholder: "logread > /mnt/onboard/.adds/syslog.log" }],
                    cmd_output: [{ label: "cmd", title: "runs a command, waits for it to exit, and optionally displays the output", placeholder: ":500:quiet :/usr/bin/pkill -f \"^/usr/bin/tcpsvd -E 0.0.0.0 2023\"" }],
                    dbg_syslog: [{ label: "message", title: "writes a message to syslog (for testing)", placeholder: "text to write" }],
                    dbg_error: [{ label: "message", title: "always returns an error (for testing)", placeholder: "the error message" }],
                    dbg_msg: [{ label: "message", title: "shows a message (for testing)", placeholder: "the message" }],
                    dbg_toast: [{ label: "message", title: "shows a toast (for testing)", placeholder: "the message" }],
                    kfmon: [{ label: "filename", title: "triggers a kfmon action", placeholder: "the filename of the KFMon watched item to launch" }],
                    nickel_setting: [
                        {
                            label: "action",
                            title: "changes a setting",
                            options: {
                                toggle: "toggles between true/false",
                                enable: "sets to true",
                                disable: "sets to false",
                            }
                        },
                        {
                            label: "setting",
                            options: {
                                invert: "FeatureSettings.InvertScreen (this requires a reboot to apply on 4.28.18220+, and may not work on newer devices)",
                                dark_mode: "ReadingSettings.DarkMode",
                                lockscreen: "PowerSettings.UnlockEnabled",
                                screenshots: "FeatureSettings.Screenshots",
                                force_wifi: "DeveloperSettings.ForceWifiOn (note: the setting doesn't apply until you toggle WiFi)",
                                auto_usb_gadget: "Automatically enable USB mass storage on connection",
                            }
                        }
                    ],
                    nickel_extras: [
                        {
                            label: "plugin",
                            options: {
                                unblock_it: "unblock_it",
                                sketch_pad: "sketch_pad",
                                solitaire: "solitaire",
                                sudoku: "sudoku",
                                word_scramble: "word_scramble",
                            }
                        }
                    ],
                    nickel_browser: [{ label: "url", title: "Open the web browser", placeholder: "url to open as homepage" }],
                    "nickel_browser:modal": [{ label: "url", title: "Open the web browser as a pop-up", placeholder: "url to open as homepage" }],
                    nickel_misc: [{
                        label: "open",
                        options: {
                            home: "goes to the home screen",
                            force_usb_connection: "forces a usb connection dialog to be shown",
                            rescan_books: "forces nickel to rescan books",
                            rescan_books_full: "forces a full usb connect/disconnect cycle",
                        }
                    }],
                    nickel_open: [{
                        label: "open",
                        options: {
                            "discover:storefront": "Kobo Store",
                            "discover:wishlist": "Wishlist",
                            "library:library": "My Books (with last tab and filter)",
                            "library:all": "Books",
                            "library:authors": "Authors",
                            "library:series": "Series (4.20.14601+)",
                            "library:shelves": "Collections",
                            "library:pocket": "Articles",
                            "library:dropbox": "Dropbox",
                            "reading_life:reading_life": "Activity (with last tab)",
                            "reading_life:stats": "Activity",
                            "reading_life:awards": "Awards",
                            "reading_life:words": "My Words",
                            "store:overdrive": "OverDrive",
                            "store:search": "Search",
                        }
                    }],
                    nickel_wifi: {
                        autoconnect: "attempts to enable and connect to wifi (similar to what happens when you open a link)",
                        autoconnect_silent: "attempts to connect to wifi in the background (does nothing if wifi is disabled, the battery is low, is already connected, or there aren't any known networks in range) (no errors are shown) (similar to what happens when you turn on the Kobo)",
                        enable: "enables WiFi (but doesn't necessarily connect to it)",
                        disable: "disables WiFi",
                        toggle: "toggles WiFi (but doesn't necessarily connect to it)",
                    },
                    nickel_orientation: {
                        portrait: "portrait mode",
                        landscape: "landscape mode",
                        inverted_portrait: "inverted_portrait mode",
                        inverted_landscape: "inverted_landscape mode",
                        invert: "invert mode",
                        swap: "swap mode",
                    },
                    power: {
                        shutdown: "shutdown",
                        reboot: "reboot",
                        sleep: "sleep",
                    },
                }
            }
        ]
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const addRowButton = document.getElementById('add-row');
    const downloadButton = document.getElementById('download-config');

    function createRow(config, parentElement) {
        const row = document.createElement('div');
        row.classList.add('row');
        createColumns(config, row);
        parentElement.appendChild(row);
    }

    function createColumns(config, parentElement) {
        const column = document.createElement('div');
        column.classList.add('column');
        const select = document.createElement('select');
        select.innerHTML = '<option value="">Select an option</option>';
        for (const optionKey in config.options) {
            const option = document.createElement('option');
            option.value = optionKey;
            option.textContent = optionKey;
            select.appendChild(option);
        }
        column.appendChild(select);
        parentElement.appendChild(column);

        select.addEventListener('change', (event) => {
            const selectedOption = event.target.value;
            const selectedConfig = config.options[selectedOption];

            if (selectedConfig) {
                while (parentElement.children.length > 1) {
                    parentElement.removeChild(parentElement.lastChild);
                }
                selectedConfig.forEach(item => {
                    createInput(item, parentElement);
                });
            }
        });
    }

    function createInput(config, parentElement) {
        const column = document.createElement('div');
        column.classList.add('column');
        let input;

        if (config.placeholder) {
            input = document.createElement('input');
            input.type = 'text';
            input.placeholder = config.placeholder;
        } else if (config.file) {
            input = document.createElement('input');
            input.type = 'file';
        } else if (config.options) {
            input = document.createElement('select');
            input.innerHTML = '<option value="">Select an option</option>';
            for (const optionKey in config.options) {
                const option = document.createElement('option');
                option.value = optionKey;
                option.textContent = optionKey;
                input.appendChild(option);
            }
            input.addEventListener('change', (event) => {
                const selectedOption = event.target.value;
                const selectedConfig = config.options[selectedOption];

                if (selectedConfig instanceof Array) {
                    selectedConfig.forEach(item => {
                        createInput(item, parentElement);
                    });
                }
            });
        }
        if (input) {
            column.appendChild(input);
            parentElement.appendChild(column);
        }
    }

    addRowButton.addEventListener('click', () => {
        createRow(NickelConfigOptions, formContainer);
    });

    downloadButton.addEventListener('click', async function() {
        const rows = formContainer.querySelectorAll('.row');
        const config = [];
        rows.forEach(row => {
            const select = row.querySelector('select');
            const selectedOption = select.value;
            if (selectedOption) {
                const inputs = Array.from(row.querySelectorAll('input, select')).slice(1);
                const inputValues = inputs.map(input => input.value).filter(value => value);
                config.push({ [selectedOption]: inputValues });
            }
        });
        const configText = JSON.stringify(config, null, 2);
    
        const zip = new JSZip();
    
        const response = await fetch('assets/KoboRoot.tgz');
        if (!response.ok) {
            alert('Failed to download KoboRoot.tgz');
            return;
        }
    
        const blob = await response.blob();
        zip.file('KoboRoot.tgz', blob);
    
        // // Add .nickel.png file from user input
        // const fileInput = document.getElementById('nickelPng');
        // const file = fileInput.files[0];
        // if (file) {
        //     zip.file('.adds/.nickel.png', file);
        // } else {
        //     alert('Please upload a .nickel.png file.');
        //     return;
        // }
    
        // Add config file
        zip.file('.adds/nm/config', configText);
    
        // Generate zip and trigger download
        zip.generateAsync({ type: 'blob' }).then(function(content) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'nickelmenuconfig.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
    

    createRow(NickelConfigOptions, formContainer);
});
