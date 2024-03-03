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


const initialState = {
  disabled: false,
  dark_mode: true,
  disable_reels: true,
  disable_explore: true,
  counters_gray: true,
  disable_vanity: true,
  mp_disable_recs: true,
  block_images: false,
  block_videos: false,
  square_shaped: false,
  nav_to_messages_first: false,
  theme: "default",
  font: "default",
};


const browser_cr = chrome ? chrome : browser;

function initStateIfNotExist() {
  browser_cr.storage.local.get("formState", (result) => {
    if (!result.formState || Object.keys(result.formState).length === 0) browser_cr.storage.local.set({ formState: { ...initialState } });
  });
}

initStateIfNotExist();

if (!chrome)
  chrome = browser;

browser_cr.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.local.get('welcomePageDisplayed', function (data) {
      if (!data.welcomePageDisplayed && details.reason === 'install') {
        chrome.tabs.create({ url: "https://chesscolibri.pro/igp/welcome" });
        chrome.storage.local.set({ 'welcomePageDisplayed': true });
      } else if (details.reason === 'update') {
        chrome.tabs.create({ url: "https://chesscolibri.pro/igp/update" });
      }
    });
  }
});



browser_cr.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSckNi18UjnA6Zz_eVYMV5YnQXAa93-WsplVmmHIolpcbp0lXA/viewform?usp=sf_link");