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
