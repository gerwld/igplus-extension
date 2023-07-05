let interval0, interval1, interval2;
const fonts = ["roboto", "poppins", "caprasimo", "playfair", "merriweather", "noto_sans"];
const themes = ["light_green", "purple_dark", "kittens"];

setTimeout(() => (document.body.style.opacity = 1), 1000);

//Init LS if not exists
(async () => {
  const store = await import(chrome.runtime.getURL("/store.js"));
  store.initStateIfNotExist();
})();

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

function toggleNowPlayBlock(assetPath, state, localStorageIDs) {
  setOrRemoveStylesOfItem(assetPath, state, "now_play_disable");
  function toggle() {
    localStorageIDs.forEach((localStorageKey) => {
      const current = localStorage.getItem(localStorageKey);
      if (state && current != 0) {
        localStorage.setItem(localStorageKey, 0);
      }
    });
  }

  if (state) interval0 = setInterval(toggle, 700);
  else clearInterval(interval0);
}

function toggleStaticAside(assetPath, state) {
  setOrRemoveStylesOfItem(assetPath, state, "static_aside");
  function setStatic() {
    const currentWidth = localStorage.getItem("182yfcl2wcrumva06hlhooydu:ylx-default-state-nav-bar-width");
    const isClosed = localStorage.getItem("182yfcl2wcrumva06hlhooydu:ylx-sidebar-state");
    if ((currentWidth < 400 || isClosed == 1) && state) {
      localStorage.setItem("182yfcl2wcrumva06hlhooydu:library-row-mode", 1);
      localStorage.setItem("182yfcl2wcrumva06hlhooydu:ylx-sidebar-state", 0);
      localStorage.setItem("182yfcl2wcrumva06hlhooydu:ylx-default-state-nav-bar-width", 400);
      window.location.reload();
    }
  }
  if (state) interval1 = setInterval(setStatic, 700);
  else clearInterval(interval1);
}

function toggleClassicMode(assetPath, state) {
  setOrRemoveStylesOfItem(assetPath, state, "classic_mode");
  function setClassic() {
    const mode = localStorage.getItem("182yfcl2wcrumva06hlhooydu:library-row-mode");
    if (mode == 0 && state) {
      localStorage.setItem("182yfcl2wcrumva06hlhooydu:library-row-mode", 1);
      window.location.reload();
    }
  }
  if (state) interval2 = setInterval(setClassic, 200);
  else clearInterval(interval2);
}

function getCurrentState() {
  chrome.storage.local.get("formState", (result) => {
    const state = result.formState;

    //Styles setters
    setOrRemoveStylesOfItem("/assets/css/premium_btns.css", state.premium_btns, "premium_btns");
    setOrRemoveStylesOfItem("/assets/css/rect_avatars.css", state.rect_avatars, "rect_avatars");
    setOrRemoveStylesOfItem("/assets/css/block_images.css", state.block_images, "block_images");
    setOrRemoveStylesOfItem("/assets/css/block_videos.css", state.block_videos, "block_videos");
    setOrRemoveStylesOfItem("/assets/css/bigger_navbar.css", state.bigger_navbar, "bigger_navbar");
    toggleNowPlayBlock("/assets/css/now_play_disable.css", state.now_play_disable, [
      "182yfcl2wcrumva06hlhooydu:ui-panel-state",
      "182yfcl2wcrumva06hlhooydu:ylx-sidebar-state",
    ]);
    toggleStaticAside("/assets/css/static_aside.css", state.static_aside);
    toggleClassicMode("/assets/css/classic_mode.css", state.classic_mode);
    setOrRemoveStylesOfItem("/assets/css/square_shaped.css", state.square_shaped, "square_shaped");
    setTheme(state.theme);
    setFont(state.font);
  });
}

function handleFormStateChangeEvent() {
  getCurrentState();
}

//Init get state
getCurrentState();

// Add event listener to the state change
chrome.storage.onChanged.addListener(handleFormStateChangeEvent);
