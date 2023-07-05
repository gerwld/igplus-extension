let interval0, interval1, interval2;
const fonts = ["roboto", "poppins", "caprasimo", "playfair", "merriweather", "noto_sans"];
const themes = ["light_green", "purple_dark", "kittens"];

function splashScreenDelay(delay = 1000) {
  document.body.style.opacity = 0;
  setTimeout(() => (document.body.style.opacity = 1), delay);
}

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

//Removes all vanity metrics in realtime + hides static
function toggleVanity(assetPath, state) {
  setOrRemoveStylesOfItem(assetPath, state, "disable_vanity");
  function toggle() {
    if (state) {
      let allVanityLikes = document.querySelectorAll("._a9ze");
      allVanityLikes?.forEach((btn) => {
        if (!isNaN(btn.innerText[0]) || !isNaN(btn.innerText.slice(-1))) {
          btn.classList.add("hide_ls2");
        }
      });
    }
  }
  setInterval(toggle, 300);
}

function getCurrentState() {
  chrome.storage.local.get("formState", (result) => {
    const state = result.formState;

    //Styles setters
    setOrRemoveStylesOfItem("/assets/css/block_images.css", state.block_images, "block_images");
    setOrRemoveStylesOfItem("/assets/css/block_videos.css", state.block_videos, "block_videos");
    toggleClassicMode("/assets/css/classic_mode.css", state.classic_mode);
    toggleVanity("/assets/css/disable_vanity.css", state.disable_vanity);
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
