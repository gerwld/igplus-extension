//   - This file is part of InstaPlus Extension
//  <https://github.com/gerwld/InstaPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2019-present InstaPlus Extension, Inc.
//   -
//   -InstaPlus Extension is free software: you can redistribute it and/or modify
//   - it under the terms of the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License.
//   -
//   -InstaPlus Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License
//   - along withInstaPlus Extension.  If not, see <https://creativecommons.org/licenses/by-nc/4.0/>.

// Initial state object
export const initialState = {
  disable_reels: true,
  disable_explore: true,
  counters_gray: true,
  disable_vanity: true,
  mp_disable_recs: true,
  block_images: false,
  block_videos: false,
  square_shaped: true,
  theme: "default",
  font: "default",
};

export function initStateIfNotExist() {
  chrome.storage.local.get("formState", (result) => {
    if (!result.formState) chrome.storage.local.set({ formState: { ...initialState } });
  });
}
