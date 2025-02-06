//   - This file is part of IGPlus Extension
//  <https://github.com/gerwld/IGPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present IGPlus Extension
//   -
//   - IGPlus Extension is a software: you can redistribute and modify (for contribution purposes) under the terms of the Creative Commons 
//   - Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//
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
    let interval0, interval1, interval2, interval3, interval4, interval5, interval6, interval7;
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
      // Set font if it exists => then deletes others from DOM by ID
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
        if (window.innerWidth < 768) return;
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

    // TODO: Make it work as fast as possible without window.location.href usage and Tabs permission.

    function disableRecommendations(state) {
      clearInterval(interval5);
      function redirect() {

        // Replaces all the "/" links to variant home.
        document.querySelectorAll('a[href="/"]')?.forEach(e => {
          let newLink = e.cloneNode(true);
          newLink.setAttribute("href", "/?variant=following")
          newLink.addEventListener("click", e => {
            e.preventDefault();
            if (window.location.href !== "https://www.instagram.com/?variant=following")
              window.location.href = "https://www.instagram.com/?variant=following";
          })
          e.parentNode.replaceChild(newLink, e);
        })

        if (state && (window.location.href === "https://www.instagram.com/" || window.location.href.indexOf("?variant=home") > -1)) {
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
      clearInterval(interval7);

      function redirect() {
        function checkURL() {
          //when one from that substrings is found
          return ((window.location.href === "https://www.instagram.com/")
            || (window.location.href.indexOf(".com/?variant=") > -1)
            || (window.location.href.indexOf(".com/reels") > -1)
            || (window.location.href.indexOf(".com/explore") > -1))
            //but not that substring
            && window.location.href.indexOf("/direct/") === -1;
        }


        if (state && checkURL()) {
          clearInterval(interval7);
          if (window.location?.assign) window.location.assign("/direct/inbox/");
          else window.location.href = "/direct/inbox/";
        }
      }

      if (state) {
        interval7 = setInterval(redirect, 300);
      } else {
        clearInterval(interval7);
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


    /**
     * Updates DOM based on the user state, and applies all the corresponding changes without any unnecessary mutations.
     * All of the methods and functions it contains, have good, easy to understand & self explanatory namings.
     * 
     * Good to know: This part is called each time when "formState" actually changes in state listener - on the line 44 (content.js).
     * 
     * @returns {void}
     */
    function getCurrentState() {
      browser_cr.storage.local.get("formState", (result) => {
        const state = result.formState.disabled ? { a: true } : result.formState;
        const GRAPHS_SETTERS = [
          "mp_disable_feed",
          "disable_comments",
          "disable_notes",
          "block_images",
          "counters_gray",
          "counters_disable",
          "grayscale",
          "disable_threads",
        ]

        // This part injects current (active) .css setters, based on the user settings state.
        GRAPHS_SETTERS.forEach(GRAPH => {
          let url = `/assets/graphs/${GRAPH}.css`;
          setOrRemoveStylesOfItem(url, state[GRAPH], GRAPH)
        })

        toggleClassicMode("/assets/graphs/classic_mode.css", state.classic_mode);
        toggleVanity(state.disable_vanity);
        toggleExplore(state.disable_explore);
        toggleReels(state.disable_reels);
        disableVideos(state.block_videos);
        disableStories(state.ev_disable_stories, state.mp_disable_stories);
        !state.nav_to_messages_first && disableRecommendations(state.mp_disable_recs);
        navToMessages(state.nav_to_messages_first)

        // May be buggy if not injected last, that's why its not in GRAPHS_SETTERS[]
        // TODO: Better implementation.
        setOrRemoveStylesOfItem("/assets/graphs/square_shaped.css", state.square_shaped, "square_shaped");

        setFont(state.font);
      });
      // To prevent layout bouncing
      setTimeout(() => {
        if (document?.body?.style?.opacity)
          document.body.style.opacity = "all 0s!important";
        if (document?.documentElement?.style?.opacity)
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

/**
 * @desc This part shows rate-me popup. 
 */
// (() => {
//   "use strict";
//   (() => {
//     const APPEAR_TIMEOUT = 10 * 1000 * 60;
//     // const APPEAR_TIMEOUT = 2000;
//     const MAX_CLOSE_COUNT = 4;
//     const browser_cr = chrome ? chrome : browser;
//     const STORE_LINKS = {
//       "chrome": "https://chromewebstore.google.com/detail/dbbopjndlaginbghfoibbndhlbpdpapd/reviews",
//       "firefox": "https://addons.mozilla.org/en-US/firefox/addon/igplus-extension/reviews/",
//       "edge": "https://chromewebstore.google.com/detail/dbbopjndlaginbghfoibbndhlbpdpapd/reviews",
//       "opera": "https://chromewebstore.google.com/detail/dbbopjndlaginbghfoibbndhlbpdpapd/reviews"
//     }

//     function detectBrowser() {
//       const agent = navigator.userAgent;
//       if (agent.includes("Edg")) return "edge";
//       if (agent.includes("OPR")) return "opera";
//       if (agent.includes("Chrome")) return "chrome";
//       if (agent.includes("Firefox")) return "firefox";

//       // Default to Chrome
//       return "chrome";
//     }

//     const initRateMePopup = () => {
//       const browser = detectBrowser();

//       if (browser && STORE_LINKS[browser]) {
//         browser_cr.storage.local.get('closeCount', function (data) {

//           if (!data.closeCount) {
//             browser_cr.storage.local.set({ 'closeCount': 0 });
//           }


//           if (!data.closeCount || data.closeCount < MAX_CLOSE_COUNT) {
//             const notification = document.createElement('div');
//             notification.setAttribute('id', "ext_show");
//             const logo = browser_cr.runtime.getURL('assets/img/logo.svg');
//             notification.innerHTML = `
//             <div><div class="groupl">${logo ? `<img src = "${logo}" alt = "logo" /> ` : ''}
//             <h1>It would really help.</h1></div><p>If you enjoy using this extension,
//             would you mind rate it on the webstore,
//             then?</p><a href="${STORE_LINKS[browser]}" target="_blank" id="rateLink" data-action="RATE">Rate it</a><div class="cls"><span id="closeNotification" data-action="CLOSE" style="cursor: pointer;">No,
//             Thanks</span></div></div><style id="43ggfdbt5rf">#ext_show img,
//             #ext_show p {
//               user-select: none;
//               pointer-events: none;
//             }

//             #ext_show h1 {
//               display: block;
//               text-align: left;
//               color: #ffffff !important;
//               font-weight: 600;
//               font-size: 21px;
//               line-height: 21px;
//               margin: 0;
//             }

//             #ext_show .groupl {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               margin: 10px 0 10px -5px;
//             }

//             #ext_show h1.first {
//               margin-bottom: 5px;
//             }

//             @keyframes appear {
//               0% {
//                 opacity: 0;
//                 filter: blur(10px);
//               }
//               20% {
//                 filter: blur(10px);
//               }
//               100% {
//                 opacity: 1;
//                 filter: blur(0px);
//               }
//             }

//             #ext_show>div {
//               animation: appear 1000ms ease;
//             }

//             #ext_show p {
//               max-width: 290px;
//               font-size: 14px;
//               font-size: 12.8px;
//               font-weight: 400;
//               margin: 8px 0 16px;
//               color: #868b90 !important;
//               line-height: 140%;
//               text-align: center;
//             }

//             #ext_show a {
//               text-decoration: none !important;
//               display: block;
//               border: 1px solid rgb(68, 86, 91, 0.5);
//               border-radius: 22px;
//               padding: 7px 10px;
//               margin: 10px auto;
//               max-width: 270px;
//               background-color: rgba(255, 255, 255, 0.16) !important;
//               color: white !important;
//               text-align: center;
//               font-size: 14px;
//               font-size: 14.5px;
//             }

//             #ext_show a:hover {
//               text-decoration: none;
//               background-color: rgba(255, 255, 255, 0.1) !important;
//             }

//             #ext_show a:focus {
//               text-decoration: none;
//             }

//             #ext_show>div {
//               transform: scale(1);
//               box-shadow: rgba(0, 0, 0, 0.8) 0px 8px 24px;
//               z-index: 100000 !important;
//               font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//               width: 296px;
//               position: fixed;
//               top: 10px;
//               right: 10px;
//               background-color: #161515 !important;
//               background-color: rgb(22, 21, 21, 0.96) !important;
//               padding: 5px 12px 8px;
//               box-sizing: border-box;
//               border: 1px solid rgb(68, 86, 91, 0.5);
//               z-index: 100;
//               border-radius: 12px
//             }

//             #ext_show * {
//             text-shadow: none!important;
//             font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif!important;
//             }

//             #ext_show img {
//               margin-right: 10px;
//               height: 33px;
//               width: auto;
//               max-width: 40px;
//             }

//             #ext_show .cls {
//               display: flex;
//               justify-content: center;
//             }

//             #closeNotification {
//               display: inline-block;
//               margin: 0 auto;
//               padding-left: 4px;
//               text-align: center;
//               font-size: 11px;
//               font-size: 10.5px;
//               color: #72767a !important;
//             }

//             #closeNotification:hover {
//               text-decoration: underline;
//             }

//             </style>
//               `;

//             const appendPopup = () => {
//               // Append the notification to the body
//               document.body.appendChild(notification);

//               // Event listener to the close button
//               const closeBtn = document.getElementById('closeNotification');
//               if (closeBtn) {
//                 closeBtn.addEventListener('click', function () {
//                   // browser_cr.storage.local.set({ 'closeCount': data.closeCount + 1 });
//                   notification.style.display = 'none';
//                 });
//               }

//               // set closeCount -= 1 even if not closed
//               if (data.closeCount) {
//                 browser_cr.storage.local.set({ 'closeCount': closeCount - 1 });
//               }

//               // Event listener to the rate link
//               const rateLink = document.getElementById('rateLink');
//               if (rateLink) {
//                 rateLink.addEventListener('click', function () {
//                   browser_cr.storage.local.set({ 'closeCount': MAX_CLOSE_COUNT + 1 });
//                   notification.style.display = 'none';
//                 });
//               }

//               // }
//             }
//             setTimeout(appendPopup, APPEAR_TIMEOUT);
//           }
//         });
//       }
//     };
//     //Init get state and do delay
//     document.addEventListener("DOMContentLoaded", initRateMePopup, false);
//   })();
// })(this);




/**
 * @desc This part shows ko-fi button. 
 */
;(() => {
  let observer;

  function injectButton() {
    console.log('injectButton');
    const parent = document.querySelector('.xl5mz7h.xhuyl8g');
    if (!parent) return;

    // If the button already exists, do nothing
    if (parent.querySelector('#b705b0e5b14434a529cff55fd61131489')) return;


    //disconnect the observer to prevent injection during DOM changes
    if (observer) observer.disconnect();

    const wrapper = document.createElement('section');
    wrapper.classList.add('x1azxncr');
    wrapper.innerHTML = `
    <a id="b705b0e5b14434a529cff55fd61131489" href="https://ko-fi.com/patrykjaworski" class="pf_lb2 x9f619 x3nfvp2 xr9ek0c xjpr12u xo237n4 x6pnmvc x7nr27j x12dmmrz xz9dl7a xn6708d xsag5q8 x1ye3gou x80pfx3 x159b3zp x1dn74xm xif99yt x172qv1o x10djquj x1lhsz42 xzauu7c xdoji71 x1dejxi8 x9k3k5o xs3sg5q x11hdxyr x12ldp4w x1wj20lx x1lq5wgf xgqcy7u x30kzoy x9jhf4c" target="_blank">
      <img class="pf_lb3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAACCCAMAAAAZt1gcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADzUExURQAAAP/////////////////////////////////////////////////////////////////////////////////////////////18f/18PHx8f/r4v/q4v/g0+Pj4//Wxf/WxP/Vxf/VxP/Ltv/LtdXV1f/BqP/Bp//Ap/+3mv+3mf+2mcfHx/+ti/+si/+siv+ifP+ie7m5uf+Ybf+Xbaurq/+NX/+NXv+DUJ2dnf95Qv95Qf94Qf9vM/9uM5CQkI+Pj/9kJf9kJP9aFoKCgoGBgXR0dHNzc2ZmZmVlZVhYWFdXV0pKSklJSTw8PC4uLiAgIHPsl2UAAAAXdFJOUwAQIDBAUGBwf4CPkJ+gr7C/wM/Q3+DvWtdpwgAAB+NJREFUeNrE111vmzAUBmAg343boQhxKldyr6i0zZWiVFRjUzfUkNCS1Pb//zXLllZ2bROSNjjPXYCLV+fwOsLbmx90uv3+YDRGCIVhOIm2oF4cbU3CDYTGo1G/1+0E3rEFvcEYhVEMRxNPQjTqdX3vCLrDMIbWTC4Gnc/FQzG0LkL9D87SH8bgykXPO1hwDk5FZ8Fh8zsD99ABGQcxNDhtxiCEU4n6exU4hhOKmsc4hF0IobM0zfK8KDeqrTWzq948lRt5nqcppQmB3QbebtaK4CTNirJiXBwFX1dlnlEMdsj3dkBmOlqsRTt4ldGGTTcHpAUXreJP6SERh3q+SjjAl2TfiEPH+aSK7hWxAypcCJcq0hwxiEBBmHCswKCKzEafg4Jy4RxLQIU8TR8UqTiJPzuP7sgM6F4Bijio7XEimjDGVhvlq0VusyjfrP5hjItGTxikUKtJY0nYc5mnM0oIfBxJ6CzNF88vtZ0292yOcC0Mq8WMwHEls9IacwlS7FvfwtyIl2FoB0lfdtdlZCsy0fNRaFNSCh21DXEiLy6FilFoG9EzMmwOsVM3wjUBB6hWzcIc4rhmhCsMTmBtjIlR58g+QuYmoFnPSj8TA3khExIn4E5eVxZfazITUgYuLYSi0Nb8xbpkBk5hJiSO3685si45BbeoUGTv2uzLp1ZCItAaQsCitHel63ld+Yurz7QEL/n2G4/oubU1yxdxAG+SvXpyfXv/e77x8/7mCt67/H73/9bjj+k11Fhq/8DSytpmpJ7XM/0R0+Xtr7niTs14NX2cSw9fr8ACC4kRUFFrmyO1ypmQaub3MNdML+HVt20+6eEGTETURsRc3nmWlz0vtJ1Ja7CZzg1/yzm75kSKKAz3TGCoKYplQUKTWRxjFLXWKVmpTIBoIgYCWYg9/P9fo2XUQ/H2x/R0k1z4XCYXeTinT3+cbrK8ewnVYLZEbj5oDHG076RzXcjO+b886QtlcHtsQIof7tS/Q0MiU83ah8V8LvsMG46QIGgMQBAUwRAjkUsnu4hxrSGmGJnx6VLF7UBiCCY4l2RHhrAqL0Dwu6Uaii7ySW+YK35HhnEZQxhoNnylNVwpZqLcaIg5rspMZYjDydYQQ+geRP+GOArtmb2K4czB8PeBcRy6G14sXfhGYzhXVMpEa4jz4aWT4SeNYWacDxulZuwfnQxv1IYCNjdwIo1Yv4Th2MnwDgzh78DeKrFcl699GuL2C3cuBf307I0MqR4IId1RBGBIO0ji59MYzkvssfvswHADn8HPOPwVtqnSxtpaGtwO7bF1ht87Gc4kNzXFLoOdo7RQYjCUdhy+dJ8PiSzPJyMOrJXn5basvSM8rylmUsWuMWCsJTMsYF12YMhLsJXvvDvs0DBXn0bHboViZgHzOPW+Yqlh6m9h/sjNjFSLdUiGsC5Cmk+Y5LSAAyAlmUXSDzLhvvYONyUiKFR97Ij9RR3KiaqJuHioavg1NzEpVLuJXnB0V7HXHKXGPqZrBF8DiPT4kjnUbWGJi3vPoxBvUzB7IfsbuHSUt5Yu3dcTBJ97bOCeXrF1KDgwXdpzrwvh6De8hxWJ5A68K502E+4jz1cw6vJ/WD0Ve0SkcDWqXFQy7iHPP2HdopXqlqnHXrBpZH+0FJxy4FErOOIH1CS3ywmOWJe99v2AA7s9gimmHGumG8FlTF2rBLTgrphyTPSpmOWlQlz84iaYqQVXmmdVXcW1mYMiCuIf0L4GqLNDmlQqMBBRcWotaB6GxSLRvjWN4N4M5mzbcrmVCyYaP6wSIjTcXNlvIq6himnC1byWQUEslTkMXRmX95V21Zjk4jPooSDcgWOakeFMNwSvSp3nHufyh1D9iCENmBEpzdaZnlKGzUdipHfGJIRw5jLfMQ/lmX6gDCMCJjOgEzAp58rehGUYZ1TDhjqRZ7jBFMQwmOGO2hBGDCAiTLNtJ2QqaoonNwnXM36AEVgyhJnEr8YITZqTAoKoYXiNJYzgy0uBflTCpjQvIIharmYvCR5DALGQiRzjZyBQrExrbmZ49cO3Q4veFoSwEwfMzHt4+ALjxQ2hCGE3Aj1VrZz2Ad1CFcKQ6TE/hV1xV/AAlcORGNDXSlL4znMqVIf2M1aaoK/YCRept4dxuJx0mAWxapckUlfBZ3jPDKPQNoijPSh6ExTQmClNA0oPFd0Fi9Q6hEQX8+yumAr1lXfMLKkdd5aJYs6rkRXqU3EvYLa0NGfvtV0Ysb+KbcmIWRP0YSgSInd4rU6jBcrEjoa2TfWccRvS7R4Eoe9hzTvZfonY5uXjtzb0tuqsEkFPqkiIVcrNJPOtRfPNtp5BEZK9yhJtdudbYwOYd1llGrBpklo+zbMReCYjak8buoMhq04LFNWI5+1/CLHXsE7gm26VCbpw5+YITvg15kTYg68JefzCJU7V7oo8dwzjIoHelkdF9zDuRhwE/SvydFfVL+McUuxTkch2Xvz6deaJ4D3OxBsHP+wOuhNzIMl1gcT2NNANmU8afY6k+Wd5ZWN7GmkywuNgREaTx12hkvtjMx9xAIeg/0zjGpzli8WGWCzyCS3VyLuAEd7D6E6vzk5F5MOxHwfsdIRN3//8xz9hy82vxk5P2OhVzm/IXol6m9vTaQTsFQmjjp0ehu/0BPXWF+WS26L29BtYxm2d5nm7GYXs7TmrRXGz1Tmg3WrFUf0sYP8//gQ2fZNz60hZCwAAAABJRU5ErkJggg==" alt="">
      <div class="x6s0dn4 x9f619 xxk0z11 x6ikm8r xeq5yr9 x1swvt13 x1s85apg xzzcqpx" style="opacity: 1;"><div style="width: 100%;"><div class="" style="width: 100%;"><span class="x1lliihq x1plvlek xryxfnj x1n2onr6 x1ji0vk5 x18bv5gf x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xl565be xo1l8bm x5n08af x1tu3fi x3x7a5m x10wh9bi x1wdrske x8viiok x18hxmgj" dir="auto" style="----base-line-clamp-line-height: 20px; --lineHeight: 20px;"><span class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft">Coffee</span></span></div></div></div>
    </a>

    
    <style>
    @media (max-height: 720px) {
        .x1azxncr.x1azxncr {
          display: block!important;
        }
      }
      .pf_lb2 {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 0 0 auto;
        height: 100%;
        opacity: 1;
        padding: 10px 8px!important;
      }

      .pf_lb2 > div {
        padding-left: 10px!important;
      }

      .pf_lb2 svg {
        transition: transform 300ms ease;
      }

      .pf_lb2:hover {
        text-decoration: none!important;
      }

      .pf_lb2:hover svg {
        transform: scale(1.04);
      }

      .pf_lb3 {
        width: auto;
        max-width: 40px;
        max-width: 40px;
        height: 26px;
      }
      .VUXMMFKWudUWE1kIXZoS.rwdnt1SmeRC_lhLVfIzg {
        z-index: 1000;
      }
    </style>
    `

    //insert the button at a stable position
    if (parent.children.length > 0) {
      parent.insertBefore(wrapper, parent.children[1]);
    } else {
      parent.appendChild(wrapper);
    }
    console.log("injectButton success");
    

    // Reattach the observer after injection
    setTimeout(startObserving, 2000);
  }

  function startObserving() {
    // Disconnect any existing observer instance
    if (observer) observer.disconnect();

    observer = new MutationObserver(() => {
      // Only schedule injection if the button is missing
      const parent = document.querySelector('.xl5mz7h.xhuyl8g');
      if (!parent) return;
      if (!parent.querySelector('#b705b0e5b14434a529cff55fd61131489')) {
        setTimeout(injectButton, 500);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function waitForBody() {
    if (!document.body) {
      setTimeout(waitForBody, 100);
    } else {
      startObserving();
      injectButton();
    }
  }

  waitForBody();
})();





/**
 * @desc This part shows support us popup. It's under IIFE to avoid any related issues.
 */
(() => {
  "use strict";
  (() => {
    const APPEAR_TIMEOUT = 2 * 1000 * 40;
    // const APPEAR_TIMEOUT = 2000;
    const MAX_CLOSE_COUNT = 7;
    const supported_languages = ["en", "de", "es", "pl", "uk", "sv", "ar", "be", "ru", "fr", "hi", "ja", "nl", "zh", "pt"];
    let current_lang = "en";
    const translations = {
      de: {
        "title": "Ihre Unterstützung inspiriert uns zur Verbesserung.",
        "subtitle_1": "Vielen Dank, dass Sie IGPlus verwenden! Wir (mein enger Freund und ich) haben unzählige Stunden darauf verwendet, ein gesünderes, ablenkungsfreies und vollständig anpassbares Instagram-Erlebnis zu schaffen. Wenn Sie IGPlus schätzen und wertvoll finden, ziehen Sie bitte in Betracht, das Projekt mit einer kleinen Spende zu unterstützen. Ihr Beitrag hilft uns, neue Funktionen hinzuzufügen und sicherzustellen, dass die Erweiterung für alle kostenlos bleibt.",
        "title_2": "Warum ist das wichtig?",
        "subtitle_2": "Ihre Spende ermöglicht es uns, mehr Anpassungsoptionen und ablenkungsfreie Modi einzuführen und IGPlus auf jedem Gerät reibungslos laufen zu lassen.",
        "title_3": "Vorteile für Sie:",
        "pref_1": "Einzigartiges Spenderabzeichen (in der Erweiterung).",
        "pref_2": "Prioritärer Zugang zu neuen Funktionen.",
        "pref_3": "Die Möglichkeit, über zukünftige Updates abzustimmen.",
        "don_1": "Spenden mit PayPal",
        "don_2": "Spenden mit Ko-Fi.com",
        "don_3": "Spenden mit Krypto",
        "sup": "Jeder Schritt, den wir unternehmen, um Instagram zu verbessern, wird von großartigen Nutzern wie Ihnen ermöglicht!",
        "rem_btn": "Erinnere mich später",
        "more_btn": "Mehr über das Projekt"
      },
      es: {
        "title": "Tu apoyo nos inspira a mejorar.",
        "subtitle_1": "Gracias por usar IGPlus. Nosotros (mi amigo cercano y yo) hemos dedicado innumerables horas a crear una experiencia de Instagram más saludable, sin distracciones y completamente personalizable. Si valoras IGPlus y lo encuentras útil, considera apoyar el proyecto con una pequeña donación. Tu contribución nos ayuda a agregar nuevas funciones y a mantener la extensión gratuita para todos.",
        "title_2": "¿Por qué es importante?",
        "subtitle_2": "Tu donación nos permite introducir más opciones de personalización y modos libres de distracciones, además de mantener IGPlus funcionando sin problemas en cada dispositivo.",
        "title_3": "Bonos para ti:",
        "pref_1": "Insignia única de donante (en la extensión).",
        "pref_2": "Acceso prioritario a nuevas funciones.",
        "pref_3": "La posibilidad de votar por futuras actualizaciones.",
        "don_1": "Donar con PayPal",
        "don_2": "Donar con Ko-Fi.com",
        "don_3": "Donar con Cripto",
        "sup": "¡Cada paso que damos para mejorar Instagram es gracias a usuarios increíbles como tú!",
        "rem_btn": "Recuérdame más tarde",
        "more_btn": "Más sobre el proyecto"
      },
      pl: {
        "title": "Twoje wsparcie inspiruje nas do doskonalenia.",
        "subtitle_1": "Dziękujemy za korzystanie z IGPlus! My (ja i mój bliski przyjaciel) poświęciliśmy niezliczone godziny na stworzenie zdrowszego, pozbawionego rozpraszaczy i w pełni dostosowanego doświadczenia Instagrama. Jeśli cenisz IGPlus i uważasz, że jest wartościowym, rozważ wsparcie projektu drobną darowizną. Twój wkład pomaga nam dodawać nowe funkcje i zapewnia, że rozszerzenie pozostaje darmowe dla wszystkich.",
        "title_2": "Dlaczego to ważne?",
        "subtitle_2": "Twoje wsparcie pozwala nam wprowadzać więcej opcji personalizacji i trybów bez rozpraszania oraz utrzymywać IGPlus w płynnej pracy na każdym urządzeniu.",
        "title_3": "Bonusy dla Ciebie:",
        "pref_1": "Unikalna odznaka darczyńcy (w rozszerzeniu).",
        "pref_2": "Priorytetowy dostęp do nowych funkcji.",
        "pref_3": "Możliwość głosowania nad przyszłymi aktualizacjami.",
        "don_1": "Wesprzyj przez PayPal",
        "don_2": "Wesprzyj przez Ko-Fi.com",
        "don_3": "Wesprzyj za pomocą kryptowaluty",
        "sup": "Każdy krok, który podejmujemy, aby ulepszyć Instagram, jest możliwy dzięki osobom takim jak Ty!",
        "rem_btn": "Przypomnij mi później",
        "more_btn": "Więcej o projekcie"
      },
      uk: {
        "title": "Ваша підтримка надихає нас на вдосконалення.",
        "subtitle_1": "Дякуємо, що користуєтесь IGPlus! Ми (я та мій близький друг) присвятили безліч годин створенню здоровішого, без відволікань і повністю персоналізованого досвіду Instagram. Якщо вам подобається IGPlus і ви вважаєте його корисним, розгляньте можливість підтримати проєкт невеликою пожертвою. Ваш внесок допомагає нам додавати нові функції та забезпечувати безкоштовність додатку для всіх.",
        "title_2": "Чому це важливо?",
        "subtitle_2": "Ваш внесок дозволяє нам додавати більше налаштувань і режимів без відволікань, а також забезпечувати стабільну роботу IGPlus на кожному пристрої.",
        "title_3": "Бонуси для вас:",
        "pref_1": "Унікальний значок донора (у розширенні).",
        "pref_2": "Пріоритетний доступ до нових функцій.",
        "pref_3": "Можливість голосувати за майбутні оновлення.",
        "don_1": "Пожертвувати через PayPal",
        "don_2": "Пожертвувати через Ko-Fi.com",
        "don_3": "Пожертвувати криптовалютою",
        "sup": "Кожен крок до покращення Instagram здійснюється завдяки таким чудовим користувачам, як ви!",
        "rem_btn": "Нагадати пізніше",
        "more_btn": "Дізнатися більше про проєкт"
      },
      sv: {
        "title": "Ditt stöd inspirerar oss att förbättra.",
        "subtitle_1": "Tack för att du använder IGPlus! Vi (jag och min nära vän) har ägnat otaliga timmar åt att skapa en Instagram-upplevelse som är hälsosammare, fri från distraktioner och helt anpassningsbar. Om du uppskattar IGPlus och tycker det är värdefullt, överväg att stödja projektet med en liten donation. Ditt bidrag hjälper oss att lägga till nya funktioner och hålla tillägget gratis för alla.",
        "title_2": "Varför är det viktigt?",
        "subtitle_2": "Din donation gör det möjligt för oss att introducera fler anpassningsalternativ och distraktionsfria lägen och att hålla IGPlus igång smidigt på varje enhet.",
        "title_3": "Bonusar för dig:",
        "pref_1": "Unik donationsmärkning (i tillägget).",
        "pref_2": "Prioriterad tillgång till nya funktioner.",
        "pref_3": "Möjlighet att rösta om framtida uppdateringar.",
        "don_1": "Donera med PayPal",
        "don_2": "Donera med Ko-Fi.com",
        "don_3": "Donera med Kryptovaluta",
        "sup": "Varje steg vi tar för att förbättra Instagram är tack vare fantastiska användare som du!",
        "rem_btn": "Påminn mig senare",
        "more_btn": "Mer om projektet"
      },
      ar: {
        "title": "دعمك يلهمنا للتحسين.",
        "subtitle_1": "شكرًا لاستخدامك IGPlus! نحن (أنا وصديقي المقرب) قضينا ساعات لا تحصى في إنشاء تجربة إنستغرام أكثر صحة وخالية من التشتت وقابلة للتخصيص بالكامل. إذا كنت تستمتع بـ IGPlus وتجدها ذات قيمة، فكر في دعم المشروع بتبرع صغير. يساعدنا تبرعك في إضافة ميزات جديدة والحفاظ على الإضافة مجانية للجميع.",
        "title_2": "لماذا هذا مهم؟",
        "subtitle_2": "يسمح لنا تبرعك بإضافة المزيد من خيارات التخصيص وأنماط خالية من التشتت، والحفاظ على تشغيل IGPlus بسلاسة على كل جهاز.",
        "title_3": "مكافآت لك:",
        "pref_1": "شارة متبرع فريدة (في الإضافة).",
        "pref_2": "الوصول المسبق للميزات الجديدة.",
        "pref_3": "إمكانية التصويت على التحديثات المستقبلية.",
        "don_1": "تبرع باستخدام PayPal",
        "don_2": "تبرع باستخدام Ko-Fi.com",
        "don_3": "تبرع بالعملات المشفرة",
        "sup": "كل خطوة نتخذها لتحسين إنستغرام مدعومة بمستخدمين رائعين مثلك!",
        "rem_btn": "ذكرني لاحقًا",
        "more_btn": "المزيد عن المشروع"
      },
      be: {
        "title": "Ваша падтрымка натхняе нас на паляпшэнні.",
        "subtitle_1": "Дзякуй, што выкарыстоўваеце IGPlus! Мы (я і мой блізкі сябар) прысвяцілі незлічоныя гадзіны стварэнню здаровага, безадцягальнага і цалкам наладжвальнага вопыту Instagram. Калі вы цэніце IGPlus і лічыце яго карысным, разгледзьце магчымасць падтрымкі праекта невялікім ахвяраваннем. Ваш унёсак дапамагае нам дадаваць новыя функцыі і забяспечваць бясплатнасць пашырэння для ўсіх.",
        "title_2": "Чаму гэта важна?",
        "subtitle_2": "Ваш ахвяраванне дазваляе нам уводзіць больш варыянтаў налад і рэжымаў без адцягненняў, а таксама падтрымліваць стабільную працу IGPlus на кожнай прыладзе.",
        "title_3": "Бонусы для вас:",
        "pref_1": "Унікальны значок донара (у пашырэнні).",
        "pref_2": "Прыярытэтны доступ да новых функцый.",
        "pref_3": "Магчымасць галасаваць за будучыя абнаўленні.",
        "don_1": "Ахвяраваць праз PayPal",
        "don_2": "Ахвяраваць праз Ko-Fi.com",
        "don_3": "Ахвяраваць крыптавалютай",
        "sup": "Кожны крок, які мы робім для паляпшэння Instagram, магчыма дзякуючы цудоўным карыстальнікам, як вы!",
        "rem_btn": "Нагадаць пазней",
        "more_btn": "Больш пра праект"
      },
      ru: {
        "title": "Ваша поддержка вдохновляет нас на улучшения.",
        "subtitle_1": "Спасибо, что используете IGPlus! Мы (я и мой близкий друг) посвятили множество часов созданию более здорового, свободного от отвлечений и полностью настраиваемого опыта в Instagram. Если вам нравится IGPlus и вы находите его полезным, рассмотрите возможность поддержать проект небольшой пожертвованием. Ваш вклад помогает нам добавлять новые функции и обеспечивает бесплатность расширения для всех.",
        "title_2": "Почему это важно?",
        "subtitle_2": "Ваше пожертвование позволяет нам внедрять больше опций настройки, режимов без отвлечений и поддерживать IGPlus в стабильной работе на каждом устройстве.",
        "title_3": "Бонусы для вас:",
        "pref_1": "Уникальный значок донора (в расширении).",
        "pref_2": "Приоритетный доступ к новым функциям.",
        "pref_3": "Возможность голосовать за будущие обновления.",
        "don_1": "Пожертвовать через PayPal",
        "don_2": "Пожертвовать через Ko-Fi.com",
        "don_3": "Пожертвовать криптовалютой",
        "sup": "Каждый наш шаг к улучшению Instagram становится возможным благодаря таким удивительным пользователям, как вы!",
        "rem_btn": "Напомнить позже",
        "more_btn": "Подробнее о проекте"
      },
      en: {
        "title": "Your support inspires us to improve.",
        "subtitle_1": "Thank you for using IGPlus! We (me and my close friend) have dedicated countless hours to creating an Instagram experience that’s healthier, distraction-free, and entirely customizable. If you enjoy IGPlus and find it valuable, consider supporting the project with a small donation. Your contribution helps us add new features and ensures the extension remains free for everyone.",
        "title_2": "Why does it matter?",
        "subtitle_2": "Your donation allows us to introduce more customization options and distraction-free modes and keep IGPlus running smoothly on each device.",
        "title_3": "Bonuses for you:",
        "pref_1": "Unique donor badge (in the extension).",
        "pref_2": "Priority access to new features.",
        "pref_3": "The ability to vote for future updates.",
        "don_1": "Donate with PayPal",
        "don_2": "Support with Ko-Fi.com",
        "don_3": "Donate with Crypto",
        "sup": "Every step we take to make Instagram better is powered by users like you!",
        "rem_btn": "Remind me later",
        "more_btn": "More about the project"
      },
      fr: {
        "title": "Votre soutien nous inspire à nous améliorer.",
        "subtitle_1": "Merci d'utiliser IGPlus ! Nous (mon ami proche et moi) avons consacré d'innombrables heures à créer une expérience Instagram plus saine, sans distraction et entièrement personnalisable. Si vous appréciez IGPlus et le trouvez utile, envisagez de soutenir le projet avec un petit don. Votre contribution nous aide à ajouter de nouvelles fonctionnalités et garantit que l'extension reste gratuite pour tous.",
        "title_2": "Pourquoi est-ce important ?",
        "subtitle_2": "Votre don nous permet d'introduire davantage d'options de personnalisation et de modes sans distraction, et de maintenir IGPlus fonctionnel sur chaque appareil.",
        "title_3": "Avantages pour vous :",
        "pref_1": "Badge de donateur unique (dans l'extension).",
        "pref_2": "Accès prioritaire aux nouvelles fonctionnalités.",
        "pref_3": "La possibilité de voter pour les futures mises à jour.",
        "don_1": "Faire un don avec PayPal",
        "don_2": "Faire un don avec Ko-Fi.com",
        "don_3": "Faire un don avec des cryptomonnaies",
        "sup": "Chaque étape que nous franchissons pour améliorer Instagram est rendue possible grâce à des utilisateurs incroyables comme vous !",
        "rem_btn": "Rappelez-moi plus tard",
        "more_btn": "En savoir plus sur le projet"
      },
      hi: {
        "title": "आपका समर्थन हमें बेहतर बनने के लिए प्रेरित करता है।",
        "subtitle_1": "IGPlus का उपयोग करने के लिए धन्यवाद! हमने (मैं और मेरा करीबी दोस्त) इंस्टाग्राम को एक स्वस्थ, ध्यान-मुक्त और पूरी तरह से अनुकूलन योग्य अनुभव बनाने के लिए अनगिनत घंटे समर्पित किए हैं। यदि आपको IGPlus उपयोगी और मूल्यवान लगता है, तो कृपया परियोजना का समर्थन करने के लिए एक छोटा सा दान करने पर विचार करें। आपका योगदान हमें नई सुविधाएँ जोड़ने में मदद करता है और यह सुनिश्चित करता है कि एक्सटेंशन सभी के लिए निःशुल्क रहे।",
        "title_2": "यह क्यों महत्वपूर्ण है?",
        "subtitle_2": "आपका दान हमें अधिक अनुकूलन विकल्प और ध्यान-मुक्त मोड पेश करने और IGPlus को हर डिवाइस पर सुचारू रूप से चलाने की अनुमति देता है।",
        "title_3": "आपके लिए बोनस:",
        "pref_1": "विशिष्ट दानकर्ता बैज (एक्सटेंशन में)।",
        "pref_2": "नई सुविधाओं का प्राथमिकता वाला एक्सेस।",
        "pref_3": "भविष्य के अपडेट के लिए वोट करने की क्षमता।",
        "don_1": "PayPal के माध्यम से दान करें",
        "don_2": "Ko-Fi.com के ज़रिये दान करें",
        "don_3": "क्रिप्टो के माध्यम से दान करें",
        "sup": "इंस्टाग्राम को बेहतर बनाने के लिए हमारा हर कदम आप जैसे अद्भुत उपयोगकर्ताओं की बदौलत है!",
        "rem_btn": "मुझे बाद में याद दिलाएं",
        "more_btn": "परियोजना के बारे में अधिक जानकारी"
      },
      ja: {
        "title": "あなたのサポートが私たちを向上させる原動力です。",
        "subtitle_1": "IGPlusをご利用いただきありがとうございます！私たち（私と親友）は、Instagramをより健康的で気を散らすことのない、完全にカスタマイズ可能な体験にするために無数の時間を費やしてきました。IGPlusを価値あるものだと感じていただけたなら、小額の寄付でプロジェクトを支援することを検討してください。皆さまのご協力は、新機能を追加し、この拡張機能をすべての人に無料で提供し続ける助けとなります。",
        "title_2": "なぜこれが重要なのですか？",
        "subtitle_2": "皆さまの寄付により、さらなるカスタマイズオプションや気を散らさないモードを導入し、すべてのデバイスでIGPlusがスムーズに動作するよう維持できます。",
        "title_3": "あなたへの特典：",
        "pref_1": "ユニークな寄付者バッジ（拡張機能内）。",
        "pref_2": "新機能への優先アクセス。",
        "pref_3": "将来のアップデートに投票する権利。",
        "don_1": "PayPalで寄付",
        "don_2": "Ko-Fi.comで寄付",
        "don_3": "暗号通貨で寄付",
        "sup": "Instagramをより良くするための私たちの一歩一歩は、皆さまのような素晴らしいユーザーのおかげです！",
        "rem_btn": "後で通知",
        "more_btn": "プロジェクトの詳細"
      },
      nl: {
        "title": "Uw steun inspireert ons om te verbeteren.",
        "subtitle_1": "Bedankt voor het gebruik van IGPlus! Wij (mijn goede vriend en ik) hebben talloze uren besteed aan het creëren van een gezondere, afleidingsvrije en volledig aanpasbare Instagram-ervaring. Als u IGPlus waardeert en nuttig vindt, overweeg dan om het project te steunen met een kleine donatie. Uw bijdrage helpt ons nieuwe functies toe te voegen en ervoor te zorgen dat de extensie gratis blijft voor iedereen.",
        "title_2": "Waarom is dit belangrijk?",
        "subtitle_2": "Uw donatie stelt ons in staat om meer aanpassingsopties en afleidingsvrije modi te introduceren en IGPlus soepel te laten werken op elk apparaat.",
        "title_3": "Bonussen voor u:",
        "pref_1": "Unieke donateursbadge (in de extensie).",
        "pref_2": "Prioritaire toegang tot nieuwe functies.",
        "pref_3": "De mogelijkheid om te stemmen op toekomstige updates.",
        "don_1": "Doneren met PayPal",
        "don_2": "Doneren met Ko-Fi.com",
        "don_3": "Doneren met Crypto",
        "sup": "Elke stap die we zetten om Instagram te verbeteren, is mogelijk dankzij geweldige gebruikers zoals u!",
        "rem_btn": "Herinner me later",
        "more_btn": "Meer over het project"
      },
      zh: {
        "title": "您的支持激励我们不断改进。",
        "subtitle_1": "感谢您使用 IGPlus！我和我的密友花费了无数时间来打造一个更健康、无干扰且完全可定制的 Instagram 使用体验。如果您喜欢 IGPlus 并觉得它有价值，请考虑通过小额捐赠支持这个项目。您的贡献将帮助我们添加新功能，并确保扩展程序对所有人免费。",
        "title_2": "为什么重要？",
        "subtitle_2": "您的捐赠使我们能够引入更多自定义选项和无干扰模式，并确保 IGPlus 在每台设备上顺畅运行。",
        "title_3": "为您准备的奖励：",
        "pref_1": "独特的捐赠者徽章（在扩展中显示）。",
        "pref_2": "优先使用新功能。",
        "pref_3": "投票决定未来更新的能力。",
        "don_1": "通过PayPal捐赠",
        "don_2": "通过Ko-Fi.com捐赠",
        "don_3": "用加密货币捐赠",
        "sup": "我们每一步提升 Instagram 的努力都离不开像您这样了不起的用户！",
        "rem_btn": "稍后提醒我",
        "more_btn": "了解更多关于项目的信息"
      },
      pt: {
        "title": "Seu apoio nos inspira a melhorar.",
        "subtitle_1": "Obrigado por usar o IGPlus! Eu e meu amigo próximo dedicamos inúmeras horas para criar uma experiência no Instagram mais saudável, sem distrações e totalmente personalizável. Se você gosta do IGPlus e acha valioso, considere apoiar o projeto com uma pequena doação. Sua contribuição nos ajuda a adicionar novos recursos e garante que a extensão permaneça gratuita para todos.",
        "title_2": "Por que isso é importante?",
        "subtitle_2": "Sua doação nos permite introduzir mais opções de personalização, modos sem distração e manter o IGPlus funcionando perfeitamente em cada dispositivo.",
        "title_3": "Bônus para você:",
        "pref_1": "Distintivo exclusivo de doador (na extensão).",
        "pref_2": "Acesso prioritário a novos recursos.",
        "pref_3": "Capacidade de votar nas próximas atualizações.",
        "don_1": "Doar com PayPal",
        "don_2": "Doar com Ko-Fi.com",
        "don_3": "Doar com Criptomoedas",
        "sup": "Cada passo que damos para melhorar o Instagram é impulsionado por usuários incríveis como você!",
        "rem_btn": "Lembrar-me mais tarde",
        "more_btn": "Mais sobre o projeto"
      }
    };

    const browser_cr = chrome ? chrome : browser;

    function getTranslation() {
      const browser_lang = navigator?.language?.split("-")[0]?.toLowerCase() || "en"

      if (supported_languages.indexOf(browser_lang) !== -1) {
        return browser_lang;
      }
      return "en";
    }
    // set's lang prefix translations[prefix].value
    current_lang = getTranslation();

    const initDonatePopup = () => {
      if (browser_cr?.storage?.local) {
        browser_cr.storage.local.get('closeDonateCount', function (data) {

          // set closeDonateCount if not defined
          if (!data.closeDonateCount) {
            browser_cr.storage.local.set({ 'closeDonateCount': 0 });
          }



          if (!data.closeDonateCount || data.closeDonateCount < MAX_CLOSE_COUNT) {

            // Gets formState.disabled prop
            browser_cr.storage.local.get("formState", (result) => {

              // if(typeof result?.formState?.theme === "string") {
              //   console.log("theme type is a string.", result.formState);
              // } else {
              //   throw new Error('Current state is not defined.');
              // }

              const FOUR_DAYS_IN_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
              const isExtensionDisabled = result?.formState?.disabled;


              const isFourDaysLeftFromInstall = () => {
                const timestamp = result?.formState?.timestamp;
                // console.log("ts from state:", timestamp);
                if (timestamp == null || isNaN(timestamp)) {
                  return false; // (do not) treat missing or invalid timestamps as "4 days left" 
                }
                return (timestamp + FOUR_DAYS_IN_MS) < Date.now();
              };

              // Check if extension is enabled && isFourDaysLeftFromInstall, and only then append modal window.
              if (!isExtensionDisabled && isFourDaysLeftFromInstall()) {
                // console.log("show");

                // Creating the DOM element using innterHTML in ID wrapper
                const notification = document.createElement('div');
                notification.setAttribute('id', "ext_show_dn");
                const preview = browser_cr.runtime.getURL('assets/img/frog.gif');
                notification.innerHTML = `
            
  <div id="donation-popup">
  <div class="spp__popup-container">
    <div class="img">
      <img src="${preview}" alt="Donate">
    </div>
    <div class="prev"></div>
    <h2>${translations[current_lang].title}</h2>
    <p>${translations[current_lang].subtitle_1}</p>

    <h3>${translations[current_lang].title_2}</h3>
    <p>${translations[current_lang].subtitle_2}</p>

    <h3>${translations[current_lang].title_3}</h3>
    <ul>
      <li>🚀 ${translations[current_lang].pref_1}</li>
      <li>🔓 ${translations[current_lang].pref_2}</li>
      <li>🗳️ ${translations[current_lang].pref_3}</li>
    </ul>

    <div class="donate-as">
      <a href="https://www.paypal.com/donate/?cmd=_donations&business=pjaworski.dev@gmail.com&currency_code=USD" target="_blank" class="donate-btn"">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve">
        <circle style="fill:#0070BA;" cx="400" cy="400" r="387.1"/>
        <path style="fill:#FFFFFF;fill-opacity:0.6;" d="M561.2,285.8c-0.4,2.8-0.9,5.6-1.5,8.5c-19,97.8-84.2,131.5-167.4,131.5H350
          c-10.2,0-18.7,7.4-20.3,17.4L308,580.7l-6.1,39c-1,6.6,4,12.5,10.7,12.5h75.1c8.9,0,16.5-6.5,17.9-15.2l0.7-3.8l14.1-89.8l0.9-4.9
          c1.4-8.8,9-15.3,17.9-15.3h11.2c72.8,0,129.8-29.6,146.4-115.1c7-35.7,3.4-65.6-15.1-86.5C576.2,295.3,569.3,290.1,561.2,285.8z"/>
        <path style="fill:#FFFFFF;fill-opacity:0.8;" d="M541.3,277.8c-2.9-0.8-5.9-1.6-9-2.3c-3.1-0.7-6.3-1.3-9.5-1.8
          c-11.4-1.8-23.9-2.7-37.3-2.7H372.3c-2.8,0-5.4,0.6-7.8,1.8c-5.2,2.5-9.1,7.5-10,13.5l-24.1,152.5l-0.7,4.4
          c1.6-10,10.2-17.4,20.3-17.4h42.4c83.2,0,148.3-33.8,167.4-131.5c0.6-2.9,1-5.7,1.5-8.5c-4.8-2.6-10-4.7-15.7-6.6
          C544.2,278.7,542.7,278.3,541.3,277.8z"/>
        <path style="fill:#FFFFFF;" d="M354.4,286.3c0.9-6,4.8-11,10-13.5c2.4-1.1,5-1.8,7.8-1.8h113.2c13.4,0,25.9,0.9,37.3,2.7
          c3.3,0.5,6.4,1.1,9.5,1.8c3.1,0.7,6.1,1.5,9,2.3c1.4,0.4,2.9,0.9,4.3,1.3c5.6,1.9,10.8,4.1,15.7,6.6c5.7-36.1,0-60.7-19.6-83
          c-21.5-24.5-60.4-35-110.1-35H287.2c-10.2,0-18.8,7.4-20.4,17.4l-60.1,381.2c-1.2,7.5,4.6,14.3,12.2,14.3H308l22.4-142L354.4,286.3z
          "/>
        </svg>
      <span>${translations[current_lang].don_1}</span>
      </a>
        <a href="https://ko-fi.com/patrykjaworski" target="_blank" class="donate-btn"">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve">
      <circle style="fill:#1196CC;" cx="400" cy="400" r="333.3"/>
      <rect x="197.4" y="276.9" style="fill:#DB3535;stroke:#000000;stroke-miterlimit:10;" width="295.2" height="259"/>
      <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;" d="M570.8,229.9h-35.6h-357c-15.8,0-28.7,12.8-28.7,28.7v264.7
        c0,31.7,25.7,57.4,57.4,57.4h270.9c31.7,0,57.4-25.7,57.4-57.4v-37.4h35.6c68.7,0,124.3-55.7,124.3-124.3v-7.3
        C695.1,285.5,639.5,229.9,570.8,229.9z M535.2,419.5V296.2h32.5c34,0,61.6,27.6,61.6,61.6c0,34-27.6,61.6-61.6,61.6H535.2z
        M397.7,307.8c-33.1,0-54.2,13-63,38.9c-8.9-25.9-29.9-38.9-63-38.9c-49.7,0-68.2,61.9-42.1,102.3c17.4,27,52.4,61.1,105.1,102.3
        c52.7-41.2,87.7-75.3,105.1-102.3C465.8,369.7,447.4,307.8,397.7,307.8z"/>
      </svg>
      <span>${translations[current_lang].don_2}</span>
      </a>
      <a href="https://weblxapplications.com/donate#crypto" target="_blank" class="donate-btn"">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve">
          <g>
              <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="102.3725" y1="820.8485" x2="102.3725" y2="819.8786" gradientTransform="matrix(800 0 0 -800 -81498 656690.875)">
              <stop  offset="0" style="stop-color:#F9AA4B"/>
              <stop  offset="1" style="stop-color:#F7931A"/>
            </linearGradient>
            <path style="fill:url(#SVGID_1_);" d="M776.4,493.8c-51.8,208-262.5,334.4-470.2,282.5C98.2,724.5-28.2,513.8,23.7,306.2
              C75.5,98.2,285.9-28.2,493.8,23.7C701.5,75.2,828.2,285.9,776.4,493.8L776.4,493.8L776.4,493.8z"/>
            <path style="fill:#FFFFFF;" d="M584.7,351.7c7.6-51.5-31.5-79.4-85.5-97.9l17.6-70l-42.4-10.6l-17,68.2
              c-11.2-2.7-22.7-5.5-34.3-7.9l17-68.5l-42.4-10.6l-17.3,69.7c-9.4-2.1-18.5-4.2-27.3-6.4v-0.3l-58.8-14.5l-11.2,45.5
              c0,0,31.5,7.3,30.9,7.6c17.3,4.2,20.3,15.8,19.7,24.9l-20,79.7c1.2,0.3,2.7,0.6,4.5,1.5c-1.5-0.3-3-0.6-4.5-1.2l-27.9,111.5
              c-2.1,5.2-7.6,13-19.4,10c0.3,0.6-30.9-7.6-30.9-7.6l-21.2,48.8l55.5,13.9c10.3,2.7,20.3,5.2,30.3,7.9L282.5,616l42.4,10.6l17.6-70
              c11.5,3,23,6.1,33.9,8.8l-17.3,69.7l42.4,10.6l17.6-70.6c72.7,13.6,127.3,8.2,150-57.6c18.5-52.7-0.9-83.4-39.1-103.4
              C558.4,407.7,579.3,389.2,584.7,351.7L584.7,351.7L584.7,351.7z M487.4,488.1c-13,52.7-102.1,24.2-130.9,17l23.3-93.7
              C408.6,418.6,501.4,432.9,487.4,488.1L487.4,488.1z M500.8,350.7c-12.1,48.2-86.1,23.6-110,17.6l21.2-84.9
              C435.9,289.5,513.2,300.7,500.8,350.7L500.8,350.7z"/>
          </g>
        </svg>
      <span>${translations[current_lang].don_3}</span>
      </a>
    </div>

    <p class="spp__sup"><strong>${translations[current_lang].sup} ❤️</strong></p>

    <div class="close-popup">
      <a class="closeNotification">${translations[current_lang].rem_btn}</a>
      <a href="https://github.com/gerwld/IGPlus-extension/blob/main/README.md" target="_blank">${translations[current_lang].more_btn}</a>
    </div>
  </div>
  
  <button class="close_btn closeNotification">X</button>
</div>



<style id="43ggfdbt5rf">

  @keyframes appear {
    0% {
      opacity: 0;
      filter: blur(10px);
    }
    20% {
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
    }
  }

  #donation-popup {
    position: fixed;
    top: 10px;
    right: 10px;
    max-width: 480px;
    max-height: 100vh;
    max-height: calc(100vh - 22px);
    min-height: 350px;
    overflow: scroll;
    background-color: #1f1f20 !important;
    border: 1px solid rgb(68, 86, 91, 0.5);
    box-shadow: rgba(0, 0, 0, 0.8) 0px 8px 24px;
    border-radius: 15px;
    animation: appear 1000ms ease;
  }


  .spp__popup-container {
    position: relative;
    overflow: hidden;
  }

  .spp__popup-container .img {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 155px;
    height: 155px;
    opacity: 0.7;
    margin: -5px -12px -8px -14px;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }

  .spp__popup-container .prev {
    content: "";
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: 145px;
    height: 10px;
    background:linear-gradient(180deg, rgba(22, 21, 21, 0), rgba(22, 21, 21, 0.2));
    z-index: 1;
  }

  .spp__popup-container .donate-as {
    display: flex;
    flex-flow: wrap;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .spp__popup-container .donate-as > a {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 5px 5px 0;
  }

  .spp__popup-container .donate-as > a svg {
  margin-right: 0.3rem;
  width: 1.4rem;
  height: 1.4rem;
  }

  .spp__popup-container img {
    width: 100%;
    padding-top: 10px;
  }

  .spp__sup,
  .spp__popup-container h2,
  .spp__popup-container h3,
  .spp__popup-container li,
  .spp__popup-container a,
  .spp__popup-container button {
    color: #ffffff
  }

  .spp__popup-container h3 {
    font-size: 20px;
    margin-top: 0.8em;
    margin-bottom: 0.4em;
  }

  .spp__popup-container h2 {
    font-size: 1.5em;
    margin-top: 0.76em;
    margin-bottom: 0.56em;
  }

  .spp__popup-container ul {
    padding: 0 0 0 14px;
    margin: -5px 0 5px;
    font-size: 15px;
  }

  .spp__popup-container li {
    padding: 0;
    margin-bottom: 2px;
    font-size: 15px;
  }

  .spp__popup-container p {
    max-width: 96%;
    font-size: 14px;
    font-size: 13.4px;
    font-weight: 400;
    margin: 8px 0 16px;
    color: #868b90 !important;
    line-height: 140%;
    text-align: left;
  }

  .spp__popup-container .spp__sup {
    margin: 0.4em 0;
  }


  .close_btn,
  .spp__popup-container a,
  .spp__popup-container button {
    text-decoration: none !important;
    display: inline-block;
    overflow-wrap: no-wrap;
    border: 1px solid rgb(68, 86, 91, 0.5);
    border-radius: 10px;
    padding: 7px 10px;
    margin: 3px auto;
    max-width: 400px;
    background-color: #ffffff29 !important;
    color: white !important;
    text-align: center;
    font-size: 14px;
    font-size: 14.5px;
    cursor: pointer;
  }

  .spp__popup-container .close-popup {
    min-height: 33px;
  }

  .spp__popup-container a:hover,
  .spp__popup-container button:hover {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .spp__popup-container a:focus,
  .spp__popup-container button:focus {
    text-decoration: none;
  }

  .spp__popup-container {
    background-color: #000;
    padding: 5px 12px 8px 14px;
    box-sizing: border-box;
    transform: scale(1);
    border-radius: 15px;
    z-index: 100000 !important;
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  button.close_btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100000;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    color: rgba(255, 255, 255, 0.9)!important;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 100px;
  }
</style>

            `;
                const appendPopup = () => {
                  // Append the notification to the body
                  document.body.appendChild(notification);

                  // Event listener to the close button
                  const closeBtn = document.querySelectorAll('.closeNotification');
                  if (closeBtn) {
                    closeBtn?.forEach(e =>
                      e.addEventListener('click', function () {
                        // browser_cr.storage.local.set({ 'closeCount': data.closeDonateCount + 1 });
                        notification.style.display = 'none';
                      }));
                  }

                  // set closeCount -= 1 even if not closed & set new timestamp for 4 days delay
                  browser_cr.storage.local.set({ 'closeDonateCount': (isNaN(data.closeDonateCount) ? 0 : (data.closeDonateCount * 1)) + 1 });
                  if (typeof result?.formState?.theme === "string") {
                    browser_cr.storage.local.set({ formState: { ...result.formState, timestamp: Date.now() } });
                  }
                  // console.log((isNaN(data.closeDonateCount) ? 0 : (data.closeDonateCount * 1)) + 1);

                  // Event listener to the rate link (show one more time after click on donate, after 4 days)
                  const rateLink = document.querySelectorAll('.donate-btn');
                  if (rateLink.length) {
                    rateLink.forEach(l => l.addEventListener('click', function () {
                      browser_cr.storage.local.set({ 'closeDonateCount': MAX_CLOSE_COUNT - 1 });
                      // notification.style.display = 'none';
                    }));
                  }

                  // }
                }
                // Appending with timeout
                setTimeout(appendPopup, APPEAR_TIMEOUT);
              };

            })

          }

        });
      }
    };
    //Init get state and do delay
    document.addEventListener("DOMContentLoaded", initDonatePopup, false);
  })();
})(this);