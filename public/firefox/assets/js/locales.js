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
(()=>{"use strict";const a=chrome||browser;let s;const l={};async function n(t){s=t,document.documentElement.setAttribute("lang",t);-1!=["ar","he","ku","fa","ur","sd"].indexOf(t)?document.documentElement.setAttribute("dir","rtl"):document.documentElement.setAttribute("dir","ltr");var e=t;try{var a=await(await fetch(`/_locales/${e}/messages.json`)).json();l[e]=a}catch(t){console.error(`Error fetching translations for ${e}:`,t)}await 0;var n=t,r=document.querySelectorAll("[data-i18n]");for(let t=0;t<r?.length;t++){var o=r[t].getAttribute("data-i18n"),o=l[n]?.[o]?.message;o?.length&&("i18n"===r[t].value?r[t].value=o:r[t].innerText=o)}}a.storage.onChanged.addListener(async(t,e)=>{"local"===e&&t.formState&&t.formState.newValue&&t.formState.newValue.lang_set&&(e=t.formState.newValue.lang_set)!==s&&await n(e)});const r=["en","de","es","pl","uk","sv","ar"],o=navigator?.language?.split("-")[0]?.toLowerCase()||"en";a.storage.local.get("formState",async t=>{var e=t.formState.lang_set||(o&&-1!==r.indexOf(o)?o:"en");t.formState.lang_set||a.storage.local.set({formState:{...t.formState,lang_set:e}}),await n(e)})})();