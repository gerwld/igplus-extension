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
(()=>{"use strict";var a=chrome||browser;let l;const s={};async function e(a){l=a,document.documentElement.setAttribute("lang",a);var t=a;try{var e=await(await fetch(`/_locales/${t}/messages.json`)).json();s[t]=e}catch(a){console.error(`Error fetching translations for ${t}:`,a)}await 0;var n=a,r=document.querySelectorAll("[data-i18n]");for(let a=0;a<r?.length;a++){var o=r[a].getAttribute("data-i18n"),o=s[n]?.[o]?.message;o?.length&&("i18n"===r[a].value?r[a].value=o:r[a].innerText=o)}}a.storage.onChanged.addListener(async(a,t)=>{"local"===t&&a.formState&&a.formState.newValue&&a.formState.newValue.lang_set&&(t=a.formState.newValue.lang_set)!==l&&await e(t)}),a.storage.local.get("formState",async a=>{await e(a.formState.lang_set||(navigator?.language?navigator.language.split("-")[0]:"en"))})})();