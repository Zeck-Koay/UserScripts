// ==UserScript==
// @name         YouTube Player Viewport Fillscreen
// @name:zh_CN   YouTube 播放器视口填充屏幕
// @name:zh_TW   YouTube 播放器視口填充屏幕
// @name:ms      Skrin Isi Port Pandangan Pemain YouTube
// @namespace    ZkYouTubeUserscript
// @version      0.1.0
// @description  Use the available space based on the viewport dimensions to expand the video player.
// @author       Zeck Koay
// @match        https://*.youtube.com/watch?*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    const initialLoading = setInterval(()=>{setupViewportFullscreen(initialLoading)}, 100);
    const focusIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%"><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2.5px" d="M36.744 10.521l1.152-3.838c9.609 2.237 17.17 9.82 19.409 19.427l-3.839 1.152C51.626 18.934 45.072 12.359 36.744 10.521zM10.535 27.261c1.839-8.327 8.393-14.902 16.721-16.74l-1.152-3.838c-9.609 2.237-17.17 9.82-19.409 19.427L10.535 27.261zM53.479 36.744c-1.838 8.328-8.413 14.882-16.74 16.721l1.152 3.839c9.607-2.238 17.189-9.8 19.427-19.409L53.479 36.744zM27.256 53.479c-8.329-1.838-14.897-8.407-16.735-16.735l-3.838 1.152c2.237 9.609 9.813 17.185 19.422 19.422L27.256 53.479zM32 27A5 5 0 1032 37 5 5 0 1032 27zM34 13L30 13 29 3 35 3zM13 30L13 34 3 35 3 29zM30 51L34 51 35 61 29 61zM51 34L51 30 61 29 61 35z"/></svg>';

    function setupViewportFullscreen(interval = null) {
        let theaterContainer = document.querySelector('ytd-watch-flexy[theater] #player-wide-container.ytd-watch-flexy'
                                                      +', ytd-watch-flexy[fullscreen] #player-wide-container.ytd-watch-flexy')

        if(!isUndefinedOrNull(theaterContainer)) {
            let head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            const css = ''
            +'ytd-watch-flexy[theater] div#player-wide-container.ytd-watch-flexy {'
            +'max-height: 100vh;'
            +'height: 100vh;'
            +'}'
            +'div#masthead-container.ytd-app {'
            +'position: unset;'
            +'}'
            +'#page-manager.ytd-app {'
            +'margin-top: unset;'
            +'}';
            head.appendChild(style);
            style.type = 'text/css';
            if (style.styleSheet){
                // This is required for IE8 and below.
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            setTimeout(()=>{
                scrollToPlayer();
                addScrollToPlayerButton();
            },100);
            if(!isUndefinedOrNull(interval)) clearInterval(interval);
        }
    }

    function scrollToPlayer() {
        document.querySelector('#page-manager.ytd-app')?.scrollIntoView();
    }

    function isUndefinedOrNull(variable) {
        return variable == undefined || variable == null;
    }

    function addScrollToPlayerButton() {
        let playerRightControlBar = document.querySelector('#movie_player .ytp-right-controls'),
            btn_scrollToPlayer = document.createElement('button'),
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        const text_scrollToPlayer = 'Click to reposition player',
              css = ''
            +'.ytp-chrome-controls .ytp-scrolltoplayer-button {'
            +'padding: 11px;'
            +'margin-right: 8px;'
            +'transform: translateY(-2px);'
            +'}';
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet){
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        btn_scrollToPlayer.classList.toggle('ytp-button', true);
        btn_scrollToPlayer.classList.toggle('ytp-scrolltoplayer-button', true);
        btn_scrollToPlayer.setAttribute('aria-label',text_scrollToPlayer);
        btn_scrollToPlayer.setAttribute('title',text_scrollToPlayer);
        btn_scrollToPlayer.innerHTML = focusIcon;
        playerRightControlBar.prepend(btn_scrollToPlayer);
        playerRightControlBar.addEventListener('click', ()=>{scrollToPlayer();});
    }
    
})();