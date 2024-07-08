const NickelConfigOptions = {
    label: "config",
    title: "Configure menu label, icon, and add or remove menu items",
    options: {
        menu_main_15505_label: [
            {
                label: "label",
                title: "Set the label used for the NickelMenu button",
                placeholder: "Shortcuts"
            }
        ],
        "experimental:menu_main_15505_icon": [
            {
                label: "icon",
                title: "Set the icon used for the NickelMenu button",
                options: {
                    star: "assets/star.png",
                    bookmark: "assets/bookmark.png",
                    custom: [
                        {
                            label: "upload",
                            title: "Upload an icon",
                            file: "assets/.nickel.png"
                        }
                    ]
                }
            }
        ],
        'experimental:menu_main_15505_icon_active': [
            {
                label: "active_icon",
                title: "Set the icon used for the active NickelMenu button",
                options: {
                    star: "assets/star.png",
                    bookmark: "assets/bookmark.png",
                    custom: [
                        {
                            label: "upload",
                            title: "Upload an active icon",
                            file: "assets/.nickel_active.png"
                        }
                    ]
                }
            }
        ],
        menu_item: [
            {
                label: "location",
                title: "Menu to add the item to",
                options: {
                    main: "Menu added to the tabs on the bottom-right",
                    reader: "Overflow menu in the reader",
                    browser: "Menu in the bottom-right of the web browser",
                    library: "Menu in the filter bar for the My Books and My Articles library views",
                    selection: "Selection menu",
                    selection_search: "Search sub-menu of the selection menu",
                }
            },
            {
                label: "label",
                title: "Label to show on the menu item (must not contain :)",
                placeholder: "Menu item name"
            },
            {
                label: "actions",
                title: "Type of action to run",
                options: {
                    cmd_spawn: [
                        {
                            label: "cmd",
                            title: "Start a command in the background",
                            placeholder: "logread > /mnt/onboard/.adds/syslog.log"
                        }
                    ],
                    cmd_output: [
                        {
                            label: "cmd",
                            title: "Run a command, wait for it to exit, and optionally display the output",
                            placeholder: ":500:quiet :/usr/bin/pkill -f \"^/usr/bin/tcpsvd -E 0.0.0.0 2023\""
                        }
                    ],
                    dbg_syslog: [
                        {
                            label: "message",
                            title: "Write a message to syslog (for testing)",
                            placeholder: "Text to write"
                        }
                    ],
                    dbg_error: [
                        {
                            label: "message",
                            title: "Always return an error (for testing)",
                            placeholder: "Error message"
                        }
                    ],
                    dbg_msg: [
                        {
                            label: "message",
                            title: "Show a message (for testing)",
                            placeholder: "Message"
                        }
                    ],
                    dbg_toast: [
                        {
                            label: "message",
                            title: "Show a toast (for testing)",
                            placeholder: "Message"
                        }
                    ],
                    kfmon: [
                        {
                            label: "filename",
                            title: "Trigger a KFMon action",
                            placeholder: "Filename of the KFMon watched item to launch"
                        }
                    ],
                    nickel_setting: [
                        {
                            label: "action",
                            title: "How to change the setting",
                            options: {
                                toggle: "Toggle between true/false",
                                enable: "Set to true",
                                disable: "Set to false",
                            }
                        },
                        {
                            label: "setting",
                            title: "Setting to change",
                            options: {
                                invert: "FeatureSettings.InvertScreen (requires reboot to apply on 4.28.18220+, may not work on newer devices)",
                                dark_mode: "ReadingSettings.DarkMode",
                                lockscreen: "PowerSettings.UnlockEnabled",
                                screenshots: "FeatureSettings.Screenshots",
                                force_wifi: "DeveloperSettings.ForceWifiOn (setting doesn't apply until you toggle WiFi)",
                                auto_usb_gadget: "Automatically enable USB mass storage on connection",
                            }
                        }
                    ],
                    nickel_extras: [
                        {
                            label: "app",
                            title: "Open a Nickel application",
                            options: {
                                unblock_it: "unblock_it",
                                sketch_pad: "sketch_pad",
                                solitaire: "solitaire",
                                sudoku: "sudoku",
                                word_scramble: "word_scramble",
                            }
                        }
                    ],
                    nickel_browser: [
                        {
                            label: "url",
                            title: "Open the web browser",
                            placeholder: "URL to open as homepage"
                        }
                    ],
                    "nickel_browser:modal": [
                        {
                            label: "url",
                            title: "Open the web browser as a pop-up",
                            placeholder: "URL to open as homepage"
                        }
                    ],
                    nickel_misc: [
                        {
                            label: "misc",
                            title: "Various useful actions",
                            options: {
                                home: "Go to the home screen",
                                force_usb_connection: "Force a USB connection dialog to be shown",
                                rescan_books: "Force Nickel to rescan books",
                                rescan_books_full: "Force a full USB connect/disconnect cycle",
                            }
                        }
                    ],
                    nickel_open: [
                        {
                            label: "open",
                            title: "Open a Kobo menu",
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
                        }
                    ],
                    nickel_wifi: [
                        {
                            label: "wifi setting",
                            title: "Modify WiFi behavior",
                            options: {
                                autoconnect: "Attempt to enable and connect to WiFi (similar to when opening a link)",
                                autoconnect_silent: "Attempt to connect to WiFi in the background (does nothing if WiFi is disabled, battery is low, already connected, or no known networks in range) (no errors shown) (similar to when turning on the Kobo)",
                                enable: "Enable WiFi (but not necessarily connect to it)",
                                disable: "Disable WiFi",
                                toggle: "Toggle WiFi (but not necessarily connect to it)",
                            }
                        }
                    ],
                    nickel_orientation: [
                        {
                            label: "orientation",
                            title: "Change screen orientation",
                            options: {
                                portrait: "Portrait mode",
                                landscape: "Landscape mode",
                                inverted_portrait: "Inverted portrait mode",
                                inverted_landscape: "Inverted landscape mode",
                                invert: "Invert mode",
                                swap: "Swap mode",
                            }
                        }
                    ],
                    power: [
                        {
                            label: "power action",
                            title: "Perform a power action",
                            options: {
                                shutdown: "Shutdown",
                                reboot: "Reboot",
                                sleep: "Sleep",
                            }
                        }
                    ],
                }
            }
        ]
    }
};
