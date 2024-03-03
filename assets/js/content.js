//   - This file is part of IGPlus Extension
//  <https://github.com/gerwld/IGPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present IGPlus Extension
//   -
//   - IGPlus Extension is a software: you can redistribute it, but you are not allowed to modify it under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//   -
//   - IGPlus Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License
//   - along with IGPlus Extension.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.

(() => {
  "use strict";
  (() => {
    let interval0, interval1, interval2, interval3, interval4, interval5, interval6;
    const fonts = [
      "noto_sans",
      "pixelify",
      "montserrat",
      "poppins",
      "merriweather",
      "nunito",
      "gabarito",
      "playfair",
      "roboto",
      "roboto_condensed",
      "caprasimo",
      "inter"
    ];
    const themes = ["light_green", "purple_dark", "kittens"];
    const browser_cr = chrome ? chrome : browser;

    document.documentElement.style.opacity = 0;

    function splashScreenDelay(delay = 1000) {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.style.opacity = 0;
        setTimeout(() => (document.body.style.opacity = 1), delay);
      })
    }

    // Listen for changes in browser_cr.storage.local
    let prevstate;
    browser_cr.storage.local.onChanged.addListener((changes, namespace) => {
      if (
        changes.formState &&
        changes.formState.newValue &&
        JSON.stringify({ ...changes.formState.newValue }) !== prevstate
      ) {
        prevstate = JSON.stringify({ ...changes.formState.newValue });
        getCurrentState();
      }
    });

    function setTheme(selectedTheme) {
      // Set theme if exists, then delete others
      if (themes.indexOf(selectedTheme) !== -1) {
        setOrRemoveStylesOfItem(`/assets/graphs/themes/${selectedTheme}.css`, true, selectedTheme);
      }
      themes.filter((e) => e !== selectedTheme).forEach((theme) => document.getElementById(theme)?.remove());
    }


    //Calls the same function x count per timeout
    function bombardier(func, timeout, count) {
      let i = 0;
      function executeFunction() {
        if (i < count) {
          func();
          i++;
          setTimeout(executeFunction, timeout);
        }
      }
      executeFunction();
    }


    function setFont(selectedFont) {
      // Set font if exists, then delete others
      if (fonts.indexOf(selectedFont) !== -1) {
        setOrRemoveStylesOfItem(`/assets/graphs/fonts/${selectedFont}.css`, true, selectedFont);
      }
      fonts.filter((e) => e !== selectedFont).forEach((font) => document.getElementById(font)?.remove());
    }

    function setOrRemoveStylesOfItem(assetPath, item, item_id) {
      // Fetch the CSS file and append it
      fetch(browser_cr.runtime.getURL(assetPath))
        .then((response) => response.text())
        .then((css) => {
          let current = document.getElementById(item_id);
          let style = document.createElement("style");
          style.textContent = css;
          style.setAttribute("id", item_id);
          if (item && !current) document.head.appendChild(style);
          else if (!item && current instanceof Node) document.head.removeChild(current);
        }).catch(_ => { });
    }

    function toggleClassicMode(assetPath, state) {
      clearInterval(interval0);
      setOrRemoveStylesOfItem(assetPath, state, "classic_mode");
      function setClassic() { }
      if (state) interval0 = setInterval(setClassic, 200);
      else clearInterval(interval0);
    }

    // Removes all vanity metrics in realtime + hides static
    function toggleVanity(state) {
      clearInterval(interval1);
      setOrRemoveStylesOfItem("/assets/graphs/disable_vanity.css", state, "disable_vanity");
      function toggle() {
        if (state) {
          let allVanityLikes = document.querySelectorAll("button._a9ze");
          allVanityLikes?.forEach((btn) => {
            let val = btn.innerText;
            if (!isNaN(val[0]) || !isNaN(val[val.length - 1])) {
              btn.classList.add("hide_ls2");
            }
          });
        }
      }
      if (state) interval1 = setInterval(toggle, 300);
      else clearInterval(interval1);
    }

    function toggleExplore(state) {
      clearInterval(interval2);
      setOrRemoveStylesOfItem("/assets/graphs/disable_explore.css", state, "disable_explore");
      function redirect() {
        if (state && window.location.href.includes("/explore")) {
          if (window.location?.assign) window.location.assign("/");
          else window.location.href = "/";
          console.log("IGPlus: Redirect");
          clearInterval(interval2);
        }
      }
      if (state) interval2 = setInterval(redirect, 300);
      else clearInterval(interval2);
    }

    function toggleReels(state) {
      clearInterval(interval3);
      setOrRemoveStylesOfItem("/assets/graphs/disable_reels.css", state, "disable_reels");
      function redirect() {
        if (state && window.location.href.includes("/reels")) {
          if (window.location?.assign) window.location.assign("/");
          else window.location.href = "/";
          console.log("IGPlus: Redirect");
          clearInterval(interval3);
        }
      }
      if (state) {
        interval3 = setInterval(redirect, 300);
      } else clearInterval(interval3);
    }

    function disableStories(ev_disable_stories, mp_disable_stories) {
      console.log(ev_disable_stories, mp_disable_stories)
      clearInterval(interval4);
      setOrRemoveStylesOfItem("/assets/graphs/ev_disable_stories.css", ev_disable_stories, "ev_disable_stories");
      setOrRemoveStylesOfItem("/assets/graphs/mp_disable_stories.css", mp_disable_stories, "mp_disable_stories");
      function redirect() {
        if (ev_disable_stories && window.location.href.includes("/stories/")) {
          if (window.location?.assign) window.location.assign("/");
          else window.location.href = "/";
          console.log("IGPlus: Redirect");
          clearInterval(interval4);
        }
      }
      if (ev_disable_stories) {
        interval4 = setInterval(redirect, 300);
      } else clearInterval(interval4);
    }

    // function disableRecomendations(state) {
    //   clearInterval(interval5);


    //   function redirect() {
    //     const followbtn_parent = document.querySelector('.x7a106z.x78zum5.xp1r0qw.xtqikln.x1nhvcw1')
    //       || document.querySelector('.x11fxgd9').querySelector('div')
    //     const followbtn = followbtn_parent?.querySelectorAll('div')[1];

    //     if (state && window.location.href === "https://www.instagram.com/" || window.location.href.includes("://www.instagram.com/?")) {
    //       if (followbtn_parent && !window.location.href.includes("?variant=following")) {
    //         followbtn?.click();
    //         console.log("IGPlus: Setting Feed to Subscriptions Mode.");
    //       }
    //     }
    //   }

    //   if (state) {
    //     interval5 = setInterval(redirect, 1500);
    //   } else clearInterval(interval5);

    //   const bbRedirect = () => bombardier(redirect, 20, 2000)


    //   document.addEventListener("DOMContentLoaded", bbRedirect, false);
    // }

    function disableRecomendations(state) {
      clearInterval(interval5);
      function redirect() {
        document.querySelectorAll('a[href="/"]')?.forEach(e => e.setAttribute("href", "/?variant=following"))
        if (state && window.location.href === "https://www.instagram.com/") {
          if (window.location?.assign) window.location.assign("/?variant=following");
          else window.location.href = "/?variant=following";
          clearInterval(interval5);
        }
      }

      if (state) {
        interval5 = setInterval(redirect, 300);
      } else {
        clearInterval(interval5);
        document?.querySelectorAll('a[href="/?variant=following"]')?.forEach(e => e.setAttribute("href", "/"))
      }
    }

    function navToMessages(state) {
      if (state && (window.location.href === "https://www.instagram.com/")) {
        if (window.location?.assign) window.location.assign("/direct/inbox/");
        else window.location.href = "/direct/inbox/";
        clearInterval(interval5);
      }
    }

    function disableVideos(state) {
      clearInterval(interval6);
      setOrRemoveStylesOfItem("/assets/graphs/block_videos.css", state, "block_videos");
      function redirect() {
        if (state) {
          const posts = document.querySelectorAll("article");
          posts.forEach((article) => {
            const videoTag = article.querySelector("video");
            if (videoTag) {
              article.classList.add("video");
              videoTag.remove();
            }
          });
        }
      }
      if (state) {
        interval6 = setInterval(redirect, 300);
      } else {
        // window.location.href = "/";
        clearInterval(interval6);
      }
    }

    function getCurrentState() {
      browser_cr.storage.local.get("formState", (result) => {
        const state = result.formState.disabled ? { a: true } : result.formState;

        // Styles setters
        setOrRemoveStylesOfItem("/assets/graphs/mp_disable_feed.css", state.mp_disable_feed, "mp_disable_feed");
        setOrRemoveStylesOfItem("/assets/graphs/block_images.css", state.block_images, "block_images");
        setOrRemoveStylesOfItem("/assets/graphs/counters_gray.css", state.counters_gray, "counters_gray");
        setOrRemoveStylesOfItem("/assets/graphs/counters_disable.css", state.counters_disable, "counters_disable");
        setOrRemoveStylesOfItem("/assets/graphs/grayscale.css", state.grayscale, "grayscale");

        toggleClassicMode("/assets/graphs/classic_mode.css", state.classic_mode);
        toggleVanity(state.disable_vanity);
        toggleExplore(state.disable_explore);
        toggleReels(state.disable_reels);
        disableVideos(state.block_videos);
        disableStories(state.ev_disable_stories, state.mp_disable_stories);
        disableRecomendations(state.mp_disable_recs);
        navToMessages(state.nav_to_messages_first)

        setOrRemoveStylesOfItem("/assets/graphs/square_shaped.css", state.square_shaped, "square_shaped");
        // setTheme(state.theme);
        setFont(state.font);
      });
      // To prevent layout bouncing
      setTimeout(() => {
        document.body.style.opacity = "all 0s!important";
        document.documentElement.style.opacity = 1;
      }, 300)
    }


    // Listen for changes in browser_cr.storage.local
    browser_cr.storage.local.onChanged.addListener((changes, namespace) => {
      if (
        changes.formState &&
        changes.formState.newValue &&
        changes.formState.oldValue &&
        JSON.stringify({ ...changes.formState.newValue }) !== JSON.stringify({ ...changes.formState.oldValue })
      ) {
        getCurrentState({ ...changes.formState.oldValue });
      }

    });

    getCurrentState();

    //Init get state and do delay
    splashScreenDelay(0);
    document.addEventListener("DOMContentLoaded", getCurrentState, false);

  })();
})(this);


// ---- Rate extension popup ---- //

(() => {
  "use strict";
  (() => {
    const APPEAR_TIMEOUT = 10 * 1000 * 60;
    // const APPEAR_TIMEOUT = 1000;
    const MAX_CLOSE_COUNT = 5;
    const browser_cr = chrome ? chrome : browser;
    const STORE_LINKS = {
      "chrome": "https://chromewebstore.google.com/detail/dbbopjndlaginbghfoibbndhlbpdpapd/reviews/write",
      "firefox": "https://addons.mozilla.org/en-US/firefox/addon/igplus-extension/reviews/",
      "edge": "https://microsoftedge.microsoft.com/addons/detail/igplus-remove-instagram/gcjgjfjabmgpainpahloaldflhfnppai",
      "opera": "https://chromewebstore.google.com/detail/dbbopjndlaginbghfoibbndhlbpdpapd/reviews/write"
    }

    function detectBrowser() {
      const agent = navigator.userAgent;
      if (agent.includes("Edg")) return "edge";
      if (agent.includes("OPR")) return "opera";
      if (agent.includes("Chrome")) return "chrome";
      if (agent.includes("Firefox")) return "firefox";

      // Default to Chrome
      return "chrome";
    }

    const initRateMePopup = () => {
      const browser = detectBrowser();

      if (browser && STORE_LINKS[browser]) {
        browser_cr.storage.local.get('closeCount', function (data) {

          if (!data.closeCount) {
            browser_cr.storage.local.set({ 'closeCount': 0 });
          }

          if (!data.closeCount || data.closeCount < MAX_CLOSE_COUNT) {
            const notification = document.createElement('div');
            const logo = browser_cr.runtime.getURL('assets/img/logo.svg');
            notification.innerHTML = `
            <div id="ext_show"><div><div class="groupl">${logo ? `<img src = "${logo}" alt = "logo" /> ` : ''}
            <h1>It would really help.</h1></div><p>If you enjoy using this extension,
            would you mind rate it on the webstore,
            then?</p><a href="${STORE_LINKS[browser]}" target="_blank" id="rateLink" data-action="RATE">Rate it</a><div class="cls"><span id="closeNotification" data-action="CLOSE" style="cursor: pointer;">No,
            Thanks</span></div></div></div><style id="43ggfdbt5rf">#ext_show img,
            #ext_show p {
              user-select: none;
              pointer-events: none;
            }
      
            #ext_show h1 {
              display: block;
              text-align: left;
              color: #ffffff !important;
              font-weight: 600;
              font-weight: 500;
              font-size: 21px;
              line-height: 21px;
              margin: 0;
            }
      
            #ext_show .groupl {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 10px 0 10px -5px;
            }
      
            #ext_show h1.first {
              margin-bottom: 5px;
            }
      
            #ext_show p {
              max-width: 290px;
              font-size: 14px;
              font-size: 12.8px;
              font-weight: 400;
              margin: 8px 0 16px;
              color: #868b90 !important;
              line-height: 140%;
              text-align: center;
            }
      
            #ext_show a {
              text-decoration: none !important;
              display: block;
              border: 1px solid rgb(68, 86, 91, 0.5);
              border-radius: 22px;
              padding: 7px 10px;
              margin: 10px auto;
              max-width: 270px;
              background-color: rgba(255, 255, 255, 0.16) !important;
              color: white !important;
              text-align: center;
              font-size: 14px;
              font-size: 14.5px;
            }
      
            #ext_show a:hover {
              text-decoration: none;
              background-color: rgba(255, 255, 255, 0.1) !important;
            }
      
            #ext_show a:focus {
              text-decoration: none;
            }
      
            #ext_show>div {
              transform: scale(1);
              box-shadow: rgba(0, 0, 0, 0.8) 0px 8px 24px;
              z-index: 100000 !important;
              font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
              width: 296px;
              position: fixed;
              top: 10px;
              right: 10px;
              background-color: #161515 !important;
              background-color: rgb(22, 21, 21, 0.96) !important;
              padding: 5px 12px 8px;
              box-sizing: border-box;
              border: 1px solid rgb(68, 86, 91, 0.5);
              z-index: 100;
              border-radius: 12px
            }
      
            #ext_show img {
              margin-right: 10px;
              height: 33px;
              width: auto;
              max-width: 40px;
              box-shadow: 0 2px 2px 2px rgb(33, 33, 30, 0.15);
            }
      
            #ext_show .cls {
              display: flex;
              justify-content: center;
            }
      
            #closeNotification {
              display: inline-block;
              margin: 0 auto;
              padding-left: 4px;
              text-align: center;
              font-size: 11px;
              font-size: 10.5px;
              color: #72767a !important;
            }
      
            #closeNotification:hover {
              text-decoration: underline;
            }
      
            </style>
              `;

            const appendPopup = () => {
              // Append the notification to the body
              document.body.appendChild(notification);

              // Event listener to the close button
              const closeBtn = document.getElementById('closeNotification');
              if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                  browser_cr.storage.local.set({ 'closeCount': data.closeCount + 1 });
                  notification.style.display = 'none';
                });
              }

              // Event listener to the rate link
              const rateLink = document.getElementById('rateLink');
              if (rateLink) {
                rateLink.addEventListener('click', function () {
                  browser_cr.storage.local.set({ 'closeCount': MAX_CLOSE_COUNT + 1 });
                  notification.style.display = 'none';
                });
              }

              // }
            }
            setTimeout(appendPopup, APPEAR_TIMEOUT);
          }
        });
      }
    };
    //Init get state and do delay
    document.addEventListener("DOMContentLoaded", initRateMePopup, false);
  })();
})(this);