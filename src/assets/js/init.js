chrome.storage.local.get("formState", (result) => {
  let state = result.formState;
  if (state["dark_mode"]) document.documentElement.classList.add("dark_mode");
  else document.documentElement.classList.remove("dark_mode");
});

