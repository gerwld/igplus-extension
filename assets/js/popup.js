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

import { initialState } from "./store.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("l3_settings");

  // Disable stories logic
  function disableStories(state) {
    const mp_item = container.querySelector('input[name="mp_disable_stories"]');
    if (state?.ev_disable_stories) {
      mp_item.setAttribute("disabled", true);
      chrome.storage.local.set({ formState: { ...state, ev_disable_stories: true, mp_disable_stories: true } });
    } else mp_item.disabled = false;
  }

  // Listen for changes in chrome.storage.local
  let prevstate;
  chrome.storage.local.onChanged.addListener((changes, namespace) => {
    if (
      changes.formState &&
      changes.formState.newValue &&
      JSON.stringify({ ...changes.formState.newValue }) !== prevstate
    ) {
      prevstate = JSON.stringify({ ...changes.formState.newValue });
      initializeUpdate();
    }
  });

  // Defining a custom event object
  const formStateChangeEvent = new CustomEvent("formStateChange");

  // Function to dispatch the custom event
  function dispatchFormStateChangeEvent() {
    window.dispatchEvent(formStateChangeEvent);
  }

  function initializeUpdate() {
    console.log("rerender popup");
    // Retrieve state from extension storage or use the initial state
    chrome.storage.local.get("formState", (result) => {
      let state = result.formState || { ...initialState };
      disableStories(state);

      if (!result.formState) {
        chrome.storage.local.set({ formState: state }, () => {
          dispatchFormStateChangeEvent();
        });
      }

      // Function to update the state object and form inputs
      function updateState(event) {
        const input = event.target;
        const value = input.type === "checkbox" ? input.checked : input.value;
        state[input.name] = value;

        // Save the updated state to extension storage
        chrome.storage.local.set({ formState: state }, () => {
          dispatchFormStateChangeEvent();
        });
      }

      // Function to update form inputs based on the state object
      function updateFormInputs() {
        const inputs = document.querySelectorAll("input, select");
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];
          if (input.type === "checkbox") {
            input.checked = state[input.name] || false;
          } else {
            input.value = state[input.name] || "";
          }
        }
      }

      // Add event listener to each input and update the state
      const inputs = container.querySelectorAll("input, select");
      inputs.forEach((input) => {
        if (input.type === "checkbox") {
          input.addEventListener("change", updateState);
        } else input.addEventListener("input", updateState);
      });

      // Initialize the form inputs based on the state
      updateFormInputs();
    });
  }

  initializeUpdate();
});
