// Initial state object
export const initialState = {
  bigger_navbar: true,
  classic_mode: true,
  premium_btns: false,
  static_aside: true,

  block_images: false,
  block_videos: false,
  rect_avatars: false,
  square_shaped: false,
  now_play_disable: false,
  theme: "default",
  font: "poppins",
};

export function initStateIfNotExist() {
  chrome.storage.local.get("formState", (result) => {
    if (!result.formState) chrome.storage.local.set({ formState: { ...initialState } });
  });
}
