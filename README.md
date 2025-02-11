<div align="center">
  <img src="https://raw.githubusercontent.com/gerwld/igplus-extension/8765ded5cef43659500cef369b9bfdc6b81d0b70/assets/img/logo.svg" width="76" height="76"/>
</div>

<h1 align="center">IGPlus Extension</h1> 
<p align="center">
  IGPlus is a powerful extension that allows you to customize and personalize your Instagram experience. With this tool, you can transform the Instagram interface into a personalized platform that reflects your preferences and style.
</p>

---

<p align="center">
  <a rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/igplus-remove-instagram-r/dbbopjndlaginbghfoibbndhlbpdpapd"><img height="30px" alt="Chrome Web Store" src="https://img.shields.io/badge/Chrome-141e24.svg?&style=for-the-badge&logo=google-chrome&logoColor=white"></a>  
  <a rel="noreferrer noopener" href="https://addons.mozilla.org/en-US/firefox/addon/igplus-extension/"><img height="30px" alt="Firefox Add-ons" src="https://img.shields.io/badge/Firefox-141e24.svg?&style=for-the-badge&logo=firefox-browser&logoColor=white"></a>  
  <a rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/igplus-remove-instagram-r/dbbopjndlaginbghfoibbndhlbpdpapd"><img height="30px" alt="Opera / Opera GX Browser" src="https://img.shields.io/badge/Opera-141e24.svg?&style=for-the-badge&logo=opera&logoColor=white"></a>
  <a rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/igplus-remove-instagram-r/dbbopjndlaginbghfoibbndhlbpdpapd"><img height="30px" alt="Brave Browser" src="https://img.shields.io/badge/Brave-141e24.svg?&style=for-the-badge&logo=brave&logoColor=white"></a>  
  <a rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/igplus-remove-instagram-r/dbbopjndlaginbghfoibbndhlbpdpapd"><img height="30px" alt="Edge Addons" src="https://img.shields.io/badge/Edge-141e24.svg?&style=for-the-badge&logo=e&logoColor=white"></a>  
</p>

## Features  

- **Hide Reels and Explore:** Hide Reels section and videos, as well as the Explore page to have more control over your Instagram feed.
- **Hide Stories:** Hide the Stories section from the main page, or disable Stories everywhere for a cleaner and distraction-free interface.
- **Aside Count Labels:** Make the count labels in the aside section appear in gray or hide them completely.
- **Font Selection:** Choose from a variety of fonts to customize the appearance of Instagram to your liking.
- **One-Click Toggle** – Enable/disable all changes instantly.  
- **PWA Support** – Works with Mozilla for Android in PWA Mode.
- **Dark Mode** – Eye-friendly interface.  
- **Additional Features:** Hide recommendations on the main page, hide likes and followers count, enable grayscale mode, make everything square-shaped, block videos or images to reduce traffic usage, and many more.
<br>

## Installation

IGPlus is available on the [Google Chrome Store](https://chrome.google.com/webstore/detail/igplus-remove-instagram-s/dbbopjndlaginbghfoibbndhlbpdpapd), [Firefox Web Store](https://addons.mozilla.org/en-US/firefox/addon/igplus-extension/) and [Microsoft Edge Store](https://chromewebstore.google.com/detail/igplus-remove-instagram-r/dbbopjndlaginbghfoibbndhlbpdpapd). Visit the store page and click on the "Add" button to install the extension directly to your browser.

You can also download the latest version of IGPlus Extension from the [Releases](https://github.com/gerwld/igplus-extension/releases) page. Choose the appropriate version for your operating system and follow the installation instructions provided.

<br>

## Usage

Once the extension is installed, follow these steps:

1. **Activation:** Open Instagram in your browser.
2. **Extension Access:** Click on the IGPlus icon (<img src="https://raw.githubusercontent.com/gerwld/igplus-extension/8765ded5cef43659500cef369b9bfdc6b81d0b70/assets/img/logo.svg" width="18" height="18"/>) in the browser toolbar (<img src="https://github.com/user-attachments/assets/8e11b0ed-4513-4809-b6d1-ab88d0f98d80" width="20" height="20"/>) to activate it.
3. **Customization:** The extension settings panel will open, allowing you to customize your Instagram experience to your preferences.



<br>

## Contribute

Contributions are welcome! Here's a list of things you can do to help us out:

-   Provide feedback (positive and negative!) on how you use IGPlus
-   Suggest [new features or improvements](https://github.com/gerwld/igplus-extension/issues) of the existing ones
-   [Translate](/src/_locales) to a new language, or complete an existing one

<h1> </h1>

### Run locally

Prerequisites:

-   [Node 18.17.20 or later](https://nodejs.org/en/download) is needed on your system to run the build script
-   I recommend using [pnpm](https://pnpm.io/installation) for your convenience

You can replace `pnpm` by `npm run`

Clone this repository

```bash
git clone https://github.com/gerwld/igplus-extension
cd igplus-extension
```

```bash
# In root directory
pnpm install

# Production build for all platforms in /public/
pnpm build

# These commands watch changes for each platforms
pnpm chrome
pnpm edge
pnpm firefox
pnpm online
```

#### Chromium

-   Go to `chrome://extensions` _(`edge://extensions` for MS Edge, `opera://extensions` for Opera)_
-   Enable Developer mode
-   Load unpacked and select `/public/chromium` folder

#### Firefox

-   Go to `about:debugging#/runtime/this-firefox`
-   Select "Load temporary Add-on"
-   Select `manifest.json` in `/public/firefox` folder

<br>

## ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ApatheticToSocialMedia"><img src="https://avatars.githubusercontent.com/u/194858144?v=4?s=100" width="100px;" alt="ApatheticTo SocialMedia"/><br /><sub><b>ApatheticTo SocialMedia</b></sub></a><br /><a href="https://github.com/gerwld/igplus-extension/issues?q=author%3AApatheticToSocialMedia" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.hkumar.me"><img src="https://avatars.githubusercontent.com/u/11796657?v=4?s=100" width="100px;" alt="Harsh Kumar"/><br /><sub><b>Harsh Kumar</b></sub></a><br /><a href="https://github.com/gerwld/igplus-extension/issues?q=author%3Ahkumar1993" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<h3>Translations contributions</h3>

- **🌎 English translation (improvements)** · [Adam Jablonski](https://github.com/gerwld/igplus-extension/tree/main/src/_locales/en)
- **🇩🇪 German translation** · [dubstebowl](https://github.com/gerwld/igplus-extension/tree/main/src/_locales/de)
- **🇺🇦 Ukrainian translation** · [@kolobochok33](https://github.com/gerwld/igplus-extension/tree/main/src/_locales/uk) 

<br>

## License

IGPlus Extension is released under the Creative Commons Attribution-NonCommercial License (CC BY-NC). This means that others are free to use, modify, and distribute the extension for non-commercial purposes, as long as they provide attribution to the original creator. Commercial use of the extension is not allowed without explicit permission.

See the [LICENSE](LICENSE) file for more details.

For any inquiries regarding commercial use or permission, please contact the creator at [pjaworski.dev@gmail.com].

<br>

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact us at [pjaworski.dev@gmail.com].

---

Enhance your Instagram experience with IGPlus Extension and enjoy a customized interface that reflects your style and preferences. Download now and take your Instagram usage to the next level.


