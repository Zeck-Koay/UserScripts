// ==UserScript==
// @name         YouTube Player Viewport Fillscreen
// @name:zh_CN   YouTube 播放器视口填充屏幕
// @name:zh_TW   YouTube 播放器視口填充屏幕
// @name:ms      Skrin Isi Port Pandangan Pemain YouTube
// @namespace    ZkYouTubeUserscript
// @version      0.1.3
// @description  Use the available space based on the viewport dimensions to expand the video player.
// @author       Zeck Koay
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @noframes
// ==/UserScript==

(function () {
  "use strict";
  const ConstStrings = {
    zks: {
      theaterMode: 'zk-theater-mode'
    },
    querySelector: {
      ytdWatchFlexy: 'ytd-watch-flexy.ytd-page-manager'
    }
  };
  const initialLoading = setInterval(() => {
    if(initialSetup()) {
      clearInterval(initialLoading);
      if(initialLoadingForceStop) clearTimeout(initialLoadingForceStop);
    }
  }, 100);
  const initialLoadingForceStop = setTimeout(()=>{
    if(initialLoading) clearInterval(initialLoading);
  },5*60*1000);
  const observerOptions = {
    attributes: true
  };
  var ytdWatchFlexy = undefined;
  const theaterObserver = function(mutationRecords) {
    mutationRecords.forEach((mutationRecord)=>{
      if(mutationRecord.attributeName === 'hidden') {
        processYtdWatchFlexy();
      }
    })
  };
  const observer = new MutationObserver(theaterObserver);
  const focusIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%"><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2.5px" d="M36.744 10.521l1.152-3.838c9.609 2.237 17.17 9.82 19.409 19.427l-3.839 1.152C51.626 18.934 45.072 12.359 36.744 10.521zM10.535 27.261c1.839-8.327 8.393-14.902 16.721-16.74l-1.152-3.838c-9.609 2.237-17.17 9.82-19.409 19.427L10.535 27.261zM53.479 36.744c-1.838 8.328-8.413 14.882-16.74 16.721l1.152 3.839c9.607-2.238 17.189-9.8 19.427-19.409L53.479 36.744zM27.256 53.479c-8.329-1.838-14.897-8.407-16.735-16.735l-3.838 1.152c2.237 9.609 9.813 17.185 19.422 19.422L27.256 53.479zM32 27A5 5 0 1032 37 5 5 0 1032 27zM34 13L30 13 29 3 35 3zM13 30L13 34 3 35 3 29zM30 51L34 51 35 61 29 61zM51 34L51 30 61 29 61 35z"/></svg>';

  function initialSetup() {
    ytdWatchFlexy = document.querySelector(ConstStrings.querySelector.ytdWatchFlexy);
    if (!isUndefinedOrNull(ytdWatchFlexy)) {
      observer.observe(ytdWatchFlexy, observerOptions);
      processYtdWatchFlexy();
      setupYtPvfStyling();
      return true;
    }
    return false;
  }

  function processYtdWatchFlexy() {
    if(!ytdWatchFlexy.hasAttribute('hidden')) {
      toggleTheaterMode(true);
      addScrollToPlayerButton();
      setTimeout(scrollToPlayer, 100);
    } else {
      toggleTheaterMode(false);
    }
  }

  function toggleTheaterMode(forceBoolean = null) {
    let ytdApp = document.querySelector('ytd-app > div#content.ytd-app');
    if(!ytdApp) return;
    if(isUndefinedOrNull(forceBoolean)) {
      forceBoolean = ytdApp.hasAttribute(ConstStrings.zks.theaterMode);
    }
    if(forceBoolean) ytdApp.setAttribute(ConstStrings.zks.theaterMode,'');
    else ytdApp.removeAttribute(ConstStrings.zks.theaterMode);
  }

  function setupYtPvfStyling () {
    let head = document.head || document.getElementsByTagName("head")[0],
        style = document.createElement("style");
    const css = 'ytd-watch-flexy[theater] div#full-bleed-container.ytd-watch-flexy {'
              + 'max-height: 100vh;'
              + 'height: 100vh;'
              + '}'
              + `ytd-app > div#content.ytd-app[${ConstStrings.zks.theaterMode}] > div#masthead-container.ytd-app {`
              + 'position: absolute;'
              + '}'
    ;
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }

  function scrollToPlayer() {
    document.querySelector("#page-manager.ytd-app")?.scrollIntoView();
  }

  function isUndefinedOrNull(variable) {
    return variable == undefined || variable == null;
  }

  function addScrollToPlayerButton() {
    if(document.querySelector('button.ytp-scrolltoplayer-button')) return;
    let playerRightControlBar = document.querySelector(
        "#movie_player .ytp-right-controls"
      ),
      btn_scrollToPlayer = document.createElement("button"),
      head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
    const text_scrollToPlayer = "Click to reposition player",
      css =
        "" +
        ".ytp-chrome-controls .ytp-scrolltoplayer-button {" +
        "padding: 11px;" +
        "margin-right: 8px;" +
        "transform: translateY(-2px);" +
        "}";
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));

    if(!playerRightControlBar) return;

    btn_scrollToPlayer.classList.toggle("ytp-button", true);
    btn_scrollToPlayer.classList.toggle("ytp-scrolltoplayer-button", true);
    btn_scrollToPlayer.setAttribute("aria-label", text_scrollToPlayer);
    btn_scrollToPlayer.setAttribute("title", text_scrollToPlayer);
    btn_scrollToPlayer.innerHTML = focusIcon;
    playerRightControlBar.prepend(btn_scrollToPlayer);
    playerRightControlBar.addEventListener("click", () => {
      scrollToPlayer();
    });
  }
})();
