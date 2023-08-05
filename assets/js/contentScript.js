//   - This file is part of IGPlus Extension
//  <https://github.com/gerwld/IGPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2019-present IGPlus Extension, Inc.
//   -
//   -IGPlus Extension is free software: you can redistribute it and/or modify
//   - it under the terms of the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License.
//   -
//   -IGPlus Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License
//   - along withIGPlus Extension.  If not, see <https://creativecommons.org/licenses/by-nc/4.0/>.

let interval0, interval1, interval2, interval3, interval4, interval5, interval6;
const fonts = ["roboto", "poppins", "caprasimo", "playfair", "merriweather", "noto_sans"];
const themes = ["light_green", "purple_dark", "kittens"];

function splashScreenDelay(delay = 1000) {
  document.body.style.opacity = 0;
  setTimeout(() => (document.body.style.opacity = 1), delay);
}

// Init LS if not exists
(async () => {
  const store = await import(chrome.runtime.getURL("/store.js"));
  store.initStateIfNotExist();
})();

// Listen for changes in chrome.storage.local
let prevstate;
chrome.storage.local.onChanged.addListener((changes, namespace) => {
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
    setOrRemoveStylesOfItem(`/assets/css/themes/${selectedTheme}.css`, true, selectedTheme);
  }
  themes.filter((e) => e !== selectedTheme).forEach((theme) => document.getElementById(theme)?.remove());
}

function setFont(selectedFont) {
  // Set font if exists, then delete others
  if (fonts.indexOf(selectedFont) !== -1) {
    setOrRemoveStylesOfItem(`/assets/css/fonts/${selectedFont}.css`, true, selectedFont);
  }
  fonts.filter((e) => e !== selectedFont).forEach((font) => document.getElementById(font)?.remove());
}

function setOrRemoveStylesOfItem(assetPath, item, item_id) {
  // Fetch the CSS file and append it
  fetch(chrome.runtime.getURL(assetPath))
    .then((response) => response.text())
    .then((css) => {
      let current = document.getElementById(item_id);
      let style = document.createElement("style");
      style.textContent = css;
      style.setAttribute("id", item_id);
      if (item && !current) document.head.appendChild(style);
      else if (!item && current instanceof Node) document.head.removeChild(current);
    });
}

function toggleClassicMode(assetPath, state) {
  clearInterval(interval0);
  setOrRemoveStylesOfItem(assetPath, state, "classic_mode");
  function setClassic() {}
  if (state) interval0 = setInterval(setClassic, 200);
  else clearInterval(interval0);
}

// Removes all vanity metrics in realtime + hides static
function toggleVanity(state) {
  clearInterval(interval1);
  setOrRemoveStylesOfItem("/assets/css/disable_vanity.css", state, "disable_vanity");
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
  setOrRemoveStylesOfItem("/assets/css/disable_explore.css", state, "disable_explore");
  console.log(state, "explore");
  function redirect() {
    if (state && window.location.href.includes("/explore")) {
      if (window.location?.assign) window.location.assign("/");
      else window.location.href = "/";
      console.log("redirect");
      clearInterval(interval2);
    }
  }
  if (state) interval2 = setInterval(redirect, 300);
  else clearInterval(interval2);
}

function toggleReels(state) {
  clearInterval(interval3);
  setOrRemoveStylesOfItem("/assets/css/disable_reels.css", state, "disable_reels");
  console.log(state, "reels");
  function redirect() {
    if (state && window.location.href.includes("/reels")) {
      if (window.location?.assign) window.location.assign("/");
      else window.location.href = "/";
      console.log("redirect");
      clearInterval(interval3);
    }
  }
  if (state) {
    interval3 = setInterval(redirect, 300);
  } else clearInterval(interval3);
}

function disableStories(ev_disable_stories, mp_disable_stories) {
  clearInterval(interval4);
  setOrRemoveStylesOfItem("/assets/css/ev_disable_stories.css", ev_disable_stories, "ev_disable_stories");
  setOrRemoveStylesOfItem("/assets/css/mp_disable_stories.css", mp_disable_stories, "mp_disable_stories");
  console.log(ev_disable_stories, "stories");
  function redirect() {
    if (ev_disable_stories && window.location.href.includes("/stories/")) {
      if (window.location?.assign) window.location.assign("/");
      else window.location.href = "/";
      console.log("redirect");
      clearInterval(interval4);
    }
  }
  if (ev_disable_stories) {
    interval4 = setInterval(redirect, 300);
  } else clearInterval(interval4);
}

function disableRecomendations(state) {
  clearInterval(interval5);
  function redirect() {
    if (state && window.location.href === "https://www.instagram.com/") {
      if (window.location?.assign) window.location.assign("/?variant=following");
      else window.location.href = "/?variant=following";
      clearInterval(interval5);
    }
  }
  if (state) {
    interval5 = setInterval(redirect, 300);
  } else clearInterval(interval5);
}

function disableVideos(state) {
  clearInterval(interval6);
  setOrRemoveStylesOfItem("/assets/css/block_videos.css", state, "block_videos");
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
  chrome.storage.local.get("formState", (result) => {
    const state = result.formState;

    // Styles setters
    setOrRemoveStylesOfItem("/assets/css/block_images.css", state.block_images, "block_images");
    setOrRemoveStylesOfItem("/assets/css/counters_gray.css", state.counters_gray, "counters_gray");
    setOrRemoveStylesOfItem("/assets/css/counters_disable.css", state.counters_disable, "counters_disable");
    setOrRemoveStylesOfItem("/assets/css/grayscale.css", state.grayscale, "grayscale");

    toggleClassicMode("/assets/css/classic_mode.css", state.classic_mode);
    toggleVanity(state.disable_vanity);
    toggleExplore(state.disable_explore);
    toggleReels(state.disable_reels);
    disableVideos(state.block_videos);
    disableStories(state.ev_disable_stories, state.mp_disable_stories);
    disableRecomendations(state.mp_disable_recs);

    setOrRemoveStylesOfItem("/assets/css/square_shaped.css", state.square_shaped, "square_shaped");
    setTheme(state.theme);
    setFont(state.font);
  });
}

function handleFormStateChangeEvent() {
  getCurrentState();
}

//Init get state and do delay
getCurrentState();
splashScreenDelay();

// Add event listener to the state change
chrome.storage.onChanged.addListener(handleFormStateChangeEvent);
