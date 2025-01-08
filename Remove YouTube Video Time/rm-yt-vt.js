// ==UserScript==
// @name         Remove YouTube Video Time
// @namespace    https://zeckkoay.com/
// @version      1.0
// @description  Remove YouTube video time from URL
// @author       Zeck Koay
// @match        https://www.youtube.com/*
// @icon         data:image/jpeg;base64,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
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    // Global variable to control debug logs
    const DEBUG_MODE = false; // Set to 'false' to disable logs globally

    // Log function that only prints if DEBUG_MODE is true, unless forced
    const log = (message, force = false) => {
        if (DEBUG_MODE || force) {
            console.log(`[ZK Debug] [Remove YouTube Video Time] ${message}`);
        }
    };

    // Function to remove a specific query parameter from a URL
    const removeQueryParam = (url, param) => {
        const urlObj = new URL(url);
        if (urlObj.searchParams.has(param)) {
            log(`Found parameter "${param}" in URL: ${url}`);
            urlObj.searchParams.delete(param);
            log(`Updated URL without "${param}": ${urlObj.toString()}`);
        }
        return urlObj.toString();
    };

    // Function to clean the URL by removing 't' parameter
    const cleanUrl = () => {
        const currentUrl = window.location.href;
        log(`Checking URL: ${currentUrl}`);
        if (currentUrl.includes("?t=") || currentUrl.includes("&t=")) {
            log(`Detected URL with 't' parameter.`);
            const newUrl = removeQueryParam(currentUrl, "t");
            if (newUrl !== currentUrl) {
                log(`Updating the URL...`);
                // Update the URL without reloading the page
                window.history.replaceState(null, "", newUrl);
                log(`URL updated successfully: ${window.location.href}`);
            }
        } else {
            log(`No 't' parameter found in the URL.`);
        }
    };

    // Function to observe URL changes via polling
    const observeUrlChanges = () => {
        let lastUrl = window.location.href;
        setInterval(() => {
            const currentUrl = window.location.href;
            if (currentUrl !== lastUrl) {
                log(`URL change detected by polling.`);
                lastUrl = currentUrl;
                cleanUrl(); // Clean URL if needed
            }
        }, 500); // Check every 500ms
    };

    // Function to initialize the script
    const initialize = () => {
        log(`Initializing script...`, true); // Force log for initialization
        cleanUrl();          // Initial cleanup of the URL
        observeUrlChanges(); // Polling URL check for SPA navigation
        log(`Script initialized and running.`, true);
    };

    // Initialize the script
    initialize();
})();