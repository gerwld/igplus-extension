import { initialState } from "./store.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("l3_settings");

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
