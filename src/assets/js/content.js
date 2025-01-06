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

(() => {
  "use strict";
  (() => {
    let interval0, interval1, interval2, interval3, interval4, interval5, interval6, interval7;
    const fonts = [
      "noto_sans",
      "pixelify",
      "montserrat",
      "poppins",
      "merriweather",
      "nunito",
      "gabarito",
      "playfair",
      "roboto",
      "roboto_condensed",
      "caprasimo",
      "inter"
    ];
    const themes = ["light_green", "purple_dark", "kittens"];
    const browser_cr = chrome ? chrome : browser;

    document.documentElement.style.opacity = 0;

    function splashScreenDelay(delay = 1000) {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.style.opacity = 0;
        setTimeout(() => (document.body.style.opacity = 1), delay);
      })
    }

    // Listen for changes in browser_cr.storage.local
    let prevstate;
    browser_cr.storage.local.onChanged.addListener((changes, namespace) => {
      if (
        changes.formState &&
        changes.formState.newValue &&
        JSON.stringify({ ...changes.formState.newValue }) !== prevstate
      ) {
        prevstate = JSON.stringify({ ...changes.formState.newValue });
        getCurrentState();
      }
    });

    function setTheme(selectedTheme) {
      // Set theme if exists, then delete others
      if (themes.indexOf(selectedTheme) !== -1) {
        setOrRemoveStylesOfItem(`/assets/graphs/themes/${selectedTheme}.css`, true, selectedTheme);
      }
      themes.filter((e) => e !== selectedTheme).forEach((theme) => document.getElementById(theme)?.remove());
    }


    //Calls the same function x count per timeout
    function bombardier(func, timeout, count) {
      let i = 0;
      function executeFunction() {
        if (i < count) {
          func();
          i++;
          setTimeout(executeFunction, timeout);
        }
      }
      executeFunction();
    }


    function setFont(selectedFont) {
      // Set font if exists, then delete others
      if (fonts.indexOf(selectedFont) !== -1) {
        setOrRemoveStylesOfItem(`/assets/graphs/fonts/${selectedFont}.css`, true, selectedFont);
      }
      fonts.filter((e) => e !== selectedFont).forEach((font) => document.getElementById(font)?.remove());
    }

    function setOrRemoveStylesOfItem(assetPath, item, item_id) {
      // Fetch the CSS file and append it
      fetch(browser_cr.runtime.getURL(assetPath))
        .then((response) => response.text())
        .then((css) => {
          let current = document.getElementById(item_id);
          let style = document.createElement("style");
          style.textContent = css;
          style.setAttribute("id", item_id);
          if (item && !current) document.head.appendChild(style);
          else if (!item && current instanceof Node) document.head.removeChild(current);
        }).catch(_ => { });
    }

    function toggleClassicMode(assetPath, state) {
      clearInterval(interval0);
      setOrRemoveStylesOfItem(assetPath, state, "classic_mode");
      function setClassic() { }
      if (state) interval0 = setInterval(setClassic, 200);
      else clearInterval(interval0);
    }

    // Removes all vanity metrics in realtime + hides static
    function toggleVanity(state) {
      clearInterval(interval1);
      setOrRemoveStylesOfItem("/assets/graphs/disable_vanity.css", state, "disable_vanity");
      function toggle() {
        if (state) {
          let allVanityLikes = document.querySelectorAll("button._a9ze");
          allVanityLikes?.forEach((btn) => {
            let val = btn.innerText;
            if (!isNaN(val[0]) || !isNaN(val[val.length - 1])) {
              btn.classList.add("hide_ls2");
            }
          });
        }
      }
      if (state) interval1 = setInterval(toggle, 300);
      else clearInterval(interval1);
    }

    function toggleExplore(state) {
      clearInterval(interval2);
      setOrRemoveStylesOfItem("/assets/graphs/disable_explore.css", state, "disable_explore");
      function redirect() {
        if (state && window.location.href.includes("/explore")) {
          if (window.location?.assign) window.location.assign("/");
          else window.location.href = "/";
          console.log("IGPlus: Redirect");
          clearInterval(interval2);
        }
      }
      if (state) interval2 = setInterval(redirect, 300);
      else clearInterval(interval2);
    }

    function toggleReels(state) {
      clearInterval(interval3);
      setOrRemoveStylesOfItem("/assets/graphs/disable_reels.css", state, "disable_reels");
      function redirect() {
        if (state && window.location.href.includes("/reels")) {
          if (window.location?.assign) window.location.assign("/");
          else window.location.href = "/";
          console.log("IGPlus: Redirect");
          clearInterval(interval3);
        }
      }
      if (state) {
        interval3 = setInterval(redirect, 300);
      } else clearInterval(interval3);
    }

    function disableStories(ev_disable_stories, mp_disable_stories) {
      console.log(ev_disable_stories, mp_disable_stories)
      clearInterval(interval4);
      setOrRemoveStylesOfItem("/assets/graphs/ev_disable_stories.css", ev_disable_stories, "ev_disable_stories");
      setOrRemoveStylesOfItem("/assets/graphs/mp_disable_stories.css", mp_disable_stories, "mp_disable_stories");
      function redirect() {
        if (ev_disable_stories && window.location.href.includes("/stories/")) {
          if (window.location?.assign) window.location.assign("/");
          else window.location.href = "/";
          console.log("IGPlus: Redirect");
          clearInterval(interval4);
        }
      }
      if (ev_disable_stories) {
        interval4 = setInterval(redirect, 300);
      } else clearInterval(interval4);
    }

    // TODO: Make it work as fast as possible without window.location.href usage and Tabs permission.

    // function disableRecomendations(state) {
    //   clearInterval(interval5);


    //   function redirect() {
    //     const followbtn_parent = document.querySelector('.x7a106z.x78zum5.xp1r0qw.xtqikln.x1nhvcw1')
    //       || document.querySelector('.x11fxgd9').querySelector('div')
    //     const followbtn = followbtn_parent?.querySelectorAll('div')[1];

    //     if (state && window.location.href === "https://www.instagram.com/" || window.location.href.includes("://www.instagram.com/?")) {
    //       if (followbtn_parent && !window.location.href.includes("?variant=following")) {
    //         followbtn?.click();
    //         console.log("IGPlus: Setting Feed to Subscriptions Mode.");
    //       }
    //     }
    //   }

    //   if (state) {
    //     interval5 = setInterval(redirect, 1500);
    //   } else clearInterval(interval5);

    //   const bbRedirect = () => bombardier(redirect, 20, 2000)


    //   document.addEventListener("DOMContentLoaded", bbRedirect, false);
    // }

    function disableRecomendations(state) {
      clearInterval(interval5);
      function redirect() {

        // replace the / links to variant home.
        document.querySelectorAll('a[href="/"]')?.forEach(e => {
          let newLink = e.cloneNode(true);
          newLink.setAttribute("href", "/?variant=following")
          newLink.addEventListener("click", e => {
            e.preventDefault();
            if (window.location.href !== "https://www.instagram.com/?variant=following")
            window.location.href = "https://www.instagram.com/?variant=following";
          })
          e.parentNode.replaceChild(newLink, e);
        })

        if (state && (window.location.href === "https://www.instagram.com/" || window.location.href.indexOf("?variant=home") > -1)) {
          if (window.location?.assign) window.location.assign("/?variant=following");
          else window.location.href = "/?variant=following";
          clearInterval(interval5);
        }
      }

      if (state) {
        interval5 = setInterval(redirect, 300);
      } else {
        clearInterval(interval5);
        document?.querySelectorAll('a[href="/?variant=following"]')?.forEach(e => e.setAttribute("href", "/"))
      }
    }

    function navToMessages(state) {
      clearInterval(interval7);

      function redirect() {
        function checkURL() {
          //when one from that substrings is found
          return ((window.location.href === "https://www.instagram.com/")
              || (window.location.href.indexOf(".com/?variant=") > -1)
              || (window.location.href.indexOf(".com/reels") > -1)
              || (window.location.href.indexOf(".com/explore") > -1))
            //but not that substring
            && window.location.href.indexOf("/direct/") === -1;
        }

        
        if (state && checkURL()) {
          clearInterval(interval7);
          if (window.location?.assign) window.location.assign("/direct/inbox/");
          else window.location.href = "/direct/inbox/";
        }
      }

      if (state) {
        interval7 = setInterval(redirect, 300);
      } else {
        clearInterval(interval7);
      }
    }

    function disableVideos(state) {
      clearInterval(interval6);
      setOrRemoveStylesOfItem("/assets/graphs/block_videos.css", state, "block_videos");
      function redirect() {
        if (state) {
          const posts = document.querySelectorAll("article");
          posts.forEach((article) => {
            const videoTag = article.querySelector("video");
            if (videoTag) {
              article.classList.add("video");
              videoTag.remove();
            }
          });
        }
      }
      if (state) {
        interval6 = setInterval(redirect, 300);
      } else {
        // window.location.href = "/";
        clearInterval(interval6);
      }
    }

    function getCurrentState() {
      browser_cr.storage.local.get("formState", (result) => {
        const state = result.formState.disabled ? { a: true } : result.formState;

        // Styles setters
        setOrRemoveStylesOfItem("/assets/graphs/mp_disable_feed.css", state.mp_disable_feed, "mp_disable_feed");
        setOrRemoveStylesOfItem("/assets/graphs/disable_comments.css", state.disable_comments, "disable_comments");
        setOrRemoveStylesOfItem("/assets/graphs/block_images.css", state.block_images, "block_images");
        setOrRemoveStylesOfItem("/assets/graphs/counters_gray.css", state.counters_gray, "counters_gray");
        setOrRemoveStylesOfItem("/assets/graphs/counters_disable.css", state.counters_disable, "counters_disable");
        setOrRemoveStylesOfItem("/assets/graphs/grayscale.css", state.grayscale, "grayscale");

        toggleClassicMode("/assets/graphs/classic_mode.css", state.classic_mode);
        toggleVanity(state.disable_vanity);
        toggleExplore(state.disable_explore);
        toggleReels(state.disable_reels);
        disableVideos(state.block_videos);
        disableStories(state.ev_disable_stories, state.mp_disable_stories);
        !state.nav_to_messages_first && disableRecomendations(state.mp_disable_recs);
        navToMessages(state.nav_to_messages_first)

        setOrRemoveStylesOfItem("/assets/graphs/square_shaped.css", state.square_shaped, "square_shaped");
        // setTheme(state.theme);
        setFont(state.font);
      });
      // To prevent layout bouncing
      setTimeout(() => {
        if (document?.body?.style?.opacity)
          document.body.style.opacity = "all 0s!important";
        if (document?.documentElement?.style?.opacity)
          document.documentElement.style.opacity = 1;
      }, 300)
    }


    // Listen for changes in browser_cr.storage.local
    browser_cr.storage.local.onChanged.addListener((changes, namespace) => {
      if (
        changes.formState &&
        changes.formState.newValue &&
        changes.formState.oldValue &&
        JSON.stringify({ ...changes.formState.newValue }) !== JSON.stringify({ ...changes.formState.oldValue })
      ) {
        getCurrentState({ ...changes.formState.oldValue });
      }

    });

    getCurrentState();

    //Init get state and do delay
    splashScreenDelay(0);
    document.addEventListener("DOMContentLoaded", getCurrentState, false);

  })();
})(this);


// ---- Donate popup ---- //

(() => {
  "use strict";
  (() => {
    const APPEAR_TIMEOUT = 10 * 1000 * 60;
    // const APPEAR_TIMEOUT = 2000;
    const MAX_CLOSE_COUNT = 3;
    const supported_languages = ["en", "de", "es", "pl", "uk", "sv", "ar", "be", "ru", "fr", "hi", "ja", "nl", "zh", "pt"];
    let current_lang = "en";
    const translations = {
      en: {
        "title": "Your support inspires us to improve.",
        "subtitle_1": "Thank you for using IGPlus! We (me and my close friend) have dedicated countless hours to creating an Instagram experience that’s healthier, distraction-free, and entirely customizable. If you enjoy IGPlus and find it valuable, consider supporting the project with a small donation. Your contribution helps us add new features and ensures the extension remains free for everyone.",
        "title_2": "Why does it matter?",
        "subtitle_2": "Your donation allows us to introduce more customization options and distraction-free modes and keep IGPlus running smoothly on each device.",
        "title_3": "Bonuses for you:",
        "pref_1": "Unique donor badge (in the extension).",
        "pref_2": "Priority access to new features.",
        "pref_3": "The ability to vote for future updates.",
        "don_1": "Donate $10 (Big Support)",
        "don_2": "Donate $5 (Cup of Coffee)",
        "don_3": "Donate your amount (From $0.1)",
        "sup": "Every step we take to make Instagram better is powered by users like you!",
        "rem_btn": "Remind me later",
        "more_btn": "More about the project"
      },
      de: {
        "title": "Ihre Unterstützung inspiriert uns zur Verbesserung.",
        "subtitle_1": "Vielen Dank, dass Sie IGPlus verwenden! Wir (mein enger Freund und ich) haben unzählige Stunden darauf verwendet, ein gesünderes, ablenkungsfreies und vollständig anpassbares Instagram-Erlebnis zu schaffen. Wenn Sie IGPlus schätzen und wertvoll finden, ziehen Sie bitte in Betracht, das Projekt mit einer kleinen Spende zu unterstützen. Ihr Beitrag hilft uns, neue Funktionen hinzuzufügen und sicherzustellen, dass die Erweiterung für alle kostenlos bleibt.",
        "title_2": "Warum ist das wichtig?",
        "subtitle_2": "Ihre Spende ermöglicht es uns, mehr Anpassungsoptionen und ablenkungsfreie Modi einzuführen und IGPlus auf jedem Gerät reibungslos laufen zu lassen.",
        "title_3": "Vorteile für Sie:",
        "pref_1": "Einzigartiges Spenderabzeichen (in der Erweiterung).",
        "pref_2": "Prioritärer Zugang zu neuen Funktionen.",
        "pref_3": "Die Möglichkeit, über zukünftige Updates abzustimmen.",
        "don_1": "Spenden Sie 10€ (Große Unterstützung)",
        "don_2": "Spenden Sie 5€ (Eine Tasse Kaffee)",
        "don_3": "Spenden Sie Ihren Betrag (Ab 0,1€)",
        "sup": "Jeder Schritt, den wir unternehmen, um Instagram zu verbessern, wird von großartigen Nutzern wie Ihnen ermöglicht!",
        "rem_btn": "Erinnere mich später",
        "more_btn": "Mehr über das Projekt"
      },
      es: {
        "title": "Tu apoyo nos inspira a mejorar.",
        "subtitle_1": "Gracias por usar IGPlus. Nosotros (mi amigo cercano y yo) hemos dedicado innumerables horas a crear una experiencia de Instagram más saludable, sin distracciones y completamente personalizable. Si valoras IGPlus y lo encuentras útil, considera apoyar el proyecto con una pequeña donación. Tu contribución nos ayuda a agregar nuevas funciones y a mantener la extensión gratuita para todos.",
        "title_2": "¿Por qué es importante?",
        "subtitle_2": "Tu donación nos permite introducir más opciones de personalización y modos libres de distracciones, además de mantener IGPlus funcionando sin problemas en cada dispositivo.",
        "title_3": "Bonos para ti:",
        "pref_1": "Insignia única de donante (en la extensión).",
        "pref_2": "Acceso prioritario a nuevas funciones.",
        "pref_3": "La posibilidad de votar por futuras actualizaciones.",
        "don_1": "Donar $10 (Gran apoyo)",
        "don_2": "Donar $5 (Taza de café)",
        "don_3": "Donar tu monto (Desde $0.1)",
        "sup": "¡Cada paso que damos para mejorar Instagram es gracias a usuarios increíbles como tú!",
        "rem_btn": "Recuérdame más tarde",
        "more_btn": "Más sobre el proyecto"
      },
      pl: {
        "title": "Twoje wsparcie inspiruje nas do doskonalenia.",
        "subtitle_1": "Dziękujemy za korzystanie z IGPlus! My (ja i mój bliski przyjaciel) poświęciliśmy niezliczone godziny na stworzenie zdrowszego, pozbawionego rozpraszaczy i w pełni dostosowanego doświadczenia Instagrama. Jeśli cenisz IGPlus i uważasz, że jest wartościowym, rozważ wsparcie projektu drobną darowizną. Twój wkład pomaga nam dodawać nowe funkcje i zapewnia, że rozszerzenie pozostaje darmowe dla wszystkich.",
        "title_2": "Dlaczego to ważne?",
        "subtitle_2": "Twoje wsparcie pozwala nam wprowadzać więcej opcji personalizacji i trybów bez rozpraszania oraz utrzymywać IGPlus w płynnej pracy na każdym urządzeniu.",
        "title_3": "Bonusy dla Ciebie:",
        "pref_1": "Unikalna odznaka darczyńcy (w rozszerzeniu).",
        "pref_2": "Priorytetowy dostęp do nowych funkcji.",
        "pref_3": "Możliwość głosowania nad przyszłymi aktualizacjami.",
        "don_1": "Przekaż 30zł (Duże wsparcie)",
        "don_2": "Przekaż 5zł (Filiżanka kawy)",
        "don_3": "Przekaż swoją kwotę (od 0,1 zł)",
        "sup": "Każdy krok, który podejmujemy, aby ulepszyć Instagram, jest możliwy dzięki osobom takim jak Ty!",
        "rem_btn": "Przypomnij mi później",
        "more_btn": "Więcej o projekcie"
      },
      uk: {
        "title": "Ваша підтримка надихає нас на вдосконалення.",
        "subtitle_1": "Дякуємо, що користуєтесь IGPlus! Ми (я та мій близький друг) присвятили безліч годин створенню здоровішого, без відволікань і повністю персоналізованого досвіду Instagram. Якщо вам подобається IGPlus і ви вважаєте його корисним, розгляньте можливість підтримати проєкт невеликою пожертвою. Ваш внесок допомагає нам додавати нові функції та забезпечувати безкоштовність розширення для всіх.",
        "title_2": "Чому це важливо?",
        "subtitle_2": "Ваш внесок дозволяє нам додавати більше налаштувань і режимів без відволікань, а також забезпечувати стабільну роботу IGPlus на кожному пристрої.",
        "title_3": "Бонуси для вас:",
        "pref_1": "Унікальний значок донора (у розширенні).",
        "pref_2": "Пріоритетний доступ до нових функцій.",
        "pref_3": "Можливість голосувати за майбутні оновлення.",
        "don_1": "Пожертвуйте 100грн (Велика підтримка)",
        "don_2": "Пожертвуйте 25грн (Чашка кави)",
        "don_3": "Пожертвуйте вашу суму (від 1грн)",
        "sup": "Кожен крок до покращення Instagram здійснюється завдяки таким чудовим користувачам, як ви!",
        "rem_btn": "Нагадати пізніше",
        "more_btn": "Дізнатися більше про проєкт"
      },
      sv: {
        "title": "Ditt stöd inspirerar oss att förbättra.",
        "subtitle_1": "Tack för att du använder IGPlus! Vi (jag och min nära vän) har ägnat otaliga timmar åt att skapa en Instagram-upplevelse som är hälsosammare, fri från distraktioner och helt anpassningsbar. Om du uppskattar IGPlus och tycker det är värdefullt, överväg att stödja projektet med en liten donation. Ditt bidrag hjälper oss att lägga till nya funktioner och hålla tillägget gratis för alla.",
        "title_2": "Varför är det viktigt?",
        "subtitle_2": "Din donation gör det möjligt för oss att introducera fler anpassningsalternativ och distraktionsfria lägen och att hålla IGPlus igång smidigt på varje enhet.",
        "title_3": "Bonusar för dig:",
        "pref_1": "Unik donationsmärkning (i tillägget).",
        "pref_2": "Prioriterad tillgång till nya funktioner.",
        "pref_3": "Möjlighet att rösta om framtida uppdateringar.",
        "don_1": "Donera €10 (Stort stöd)",
        "don_2": "Donera €5 (En kopp kaffe)",
        "don_3": "Donera valfritt belopp (Från 0.1€)",
        "sup": "Varje steg vi tar för att förbättra Instagram är tack vare fantastiska användare som du!",
        "rem_btn": "Påminn mig senare",
        "more_btn": "Mer om projektet"
      },
      ar: {
        "title": "دعمك يلهمنا للتحسين.",
        "subtitle_1": "شكرًا لاستخدامك IGPlus! نحن (أنا وصديقي المقرب) قضينا ساعات لا تحصى في إنشاء تجربة إنستغرام أكثر صحة وخالية من التشتت وقابلة للتخصيص بالكامل. إذا كنت تستمتع بـ IGPlus وتجدها ذات قيمة، فكر في دعم المشروع بتبرع صغير. يساعدنا تبرعك في إضافة ميزات جديدة والحفاظ على الإضافة مجانية للجميع.",
        "title_2": "لماذا هذا مهم؟",
        "subtitle_2": "يسمح لنا تبرعك بإضافة المزيد من خيارات التخصيص وأنماط خالية من التشتت، والحفاظ على تشغيل IGPlus بسلاسة على كل جهاز.",
        "title_3": "مكافآت لك:",
        "pref_1": "شارة متبرع فريدة (في الإضافة).",
        "pref_2": "الوصول المسبق للميزات الجديدة.",
        "pref_3": "إمكانية التصويت على التحديثات المستقبلية.",
        "don_1": "تبرع بـ $10 (دعم كبير)",
        "don_2": "تبرع بـ $5 (فنجان قهوة)",
        "don_3": "تبرع بمبلغك (من $0.1)",
        "sup": "كل خطوة نتخذها لتحسين إنستغرام مدعومة بمستخدمين رائعين مثلك!",
        "rem_btn": "ذكرني لاحقًا",
        "more_btn": "المزيد عن المشروع"
      },
      be: {
        "title": "Ваша падтрымка натхняе нас на паляпшэнні.",
        "subtitle_1": "Дзякуй, што выкарыстоўваеце IGPlus! Мы (я і мой блізкі сябар) прысвяцілі незлічоныя гадзіны стварэнню здаровага, безадцягальнага і цалкам наладжвальнага вопыту Instagram. Калі вы цэніце IGPlus і лічыце яго карысным, разгледзьце магчымасць падтрымкі праекта невялікім ахвяраваннем. Ваш унёсак дапамагае нам дадаваць новыя функцыі і забяспечваць бясплатнасць пашырэння для ўсіх.",
        "title_2": "Чаму гэта важна?",
        "subtitle_2": "Ваш ахвяраванне дазваляе нам уводзіць больш варыянтаў налад і рэжымаў без адцягненняў, а таксама падтрымліваць стабільную працу IGPlus на кожнай прыладзе.",
        "title_3": "Бонусы для вас:",
        "pref_1": "Унікальны значок донара (у пашырэнні).",
        "pref_2": "Прыярытэтны доступ да новых функцый.",
        "pref_3": "Магчымасць галасаваць за будучыя абнаўленні.",
        "don_1": "Ахвяруйце $10 (Вялікая падтрымка)",
        "don_2": "Ахвяруйце $5 (Кубак кавы)",
        "don_3": "Ахвяруйце сваю суму (ад $0,1)",
        "sup": "Кожны крок, які мы робім для паляпшэння Instagram, магчыма дзякуючы цудоўным карыстальнікам, як вы!",
        "rem_btn": "Нагадаць пазней",
        "more_btn": "Больш пра праект"
      },
      ru: {
        "title": "Ваша поддержка вдохновляет нас на улучшения.",
        "subtitle_1": "Спасибо, что используете IGPlus! Мы (я и мой близкий друг) посвятили множество часов созданию более здорового, свободного от отвлечений и полностью настраиваемого опыта в Instagram. Если вам нравится IGPlus и вы находите его полезным, рассмотрите возможность поддержать проект небольшой пожертвованием. Ваш вклад помогает нам добавлять новые функции и обеспечивает бесплатность расширения для всех.",
        "title_2": "Почему это важно?",
        "subtitle_2": "Ваше пожертвование позволяет нам внедрять больше опций настройки, режимов без отвлечений и поддерживать IGPlus в стабильной работе на каждом устройстве.",
        "title_3": "Бонусы для вас:",
        "pref_1": "Уникальный значок донора (в расширении).",
        "pref_2": "Приоритетный доступ к новым функциям.",
        "pref_3": "Возможность голосовать за будущие обновления.",
        "don_1": "Пожертвовать $10 (Большая поддержка)",
        "don_2": "Пожертвовать $5 (Чашка кофе)",
        "don_3": "Пожертвовать свою сумму (от $0.1)",
        "sup": "Каждый наш шаг к улучшению Instagram становится возможным благодаря таким удивительным пользователям, как вы!",
        "rem_btn": "Напомнить позже",
        "more_btn": "Подробнее о проекте"
      },
      fr: {
        "title": "Votre soutien nous inspire à nous améliorer.",
        "subtitle_1": "Merci d'utiliser IGPlus ! Nous (mon ami proche et moi) avons consacré d'innombrables heures à créer une expérience Instagram plus saine, sans distraction et entièrement personnalisable. Si vous appréciez IGPlus et le trouvez utile, envisagez de soutenir le projet avec un petit don. Votre contribution nous aide à ajouter de nouvelles fonctionnalités et garantit que l'extension reste gratuite pour tous.",
        "title_2": "Pourquoi est-ce important ?",
        "subtitle_2": "Votre don nous permet d'introduire davantage d'options de personnalisation et de modes sans distraction, et de maintenir IGPlus fonctionnel sur chaque appareil.",
        "title_3": "Avantages pour vous :",
        "pref_1": "Badge de donateur unique (dans l'extension).",
        "pref_2": "Accès prioritaire aux nouvelles fonctionnalités.",
        "pref_3": "La possibilité de voter pour les futures mises à jour.",
        "don_1": "Faire un don de 10 $ (Grand soutien)",
        "don_2": "Faire un don de 5 $ (Une tasse de café)",
        "don_3": "Faire un don de votre montant (à partir de 0,1 $)",
        "sup": "Chaque étape que nous franchissons pour améliorer Instagram est rendue possible grâce à des utilisateurs incroyables comme vous !",
        "rem_btn": "Rappelez-moi plus tard",
        "more_btn": "En savoir plus sur le projet"
      },
      hi: {
        "title": "आपका समर्थन हमें बेहतर बनने के लिए प्रेरित करता है।",
        "subtitle_1": "IGPlus का उपयोग करने के लिए धन्यवाद! हमने (मैं और मेरा करीबी दोस्त) इंस्टाग्राम को एक स्वस्थ, ध्यान-मुक्त और पूरी तरह से अनुकूलन योग्य अनुभव बनाने के लिए अनगिनत घंटे समर्पित किए हैं। यदि आपको IGPlus उपयोगी और मूल्यवान लगता है, तो कृपया परियोजना का समर्थन करने के लिए एक छोटा सा दान करने पर विचार करें। आपका योगदान हमें नई सुविधाएँ जोड़ने में मदद करता है और यह सुनिश्चित करता है कि एक्सटेंशन सभी के लिए निःशुल्क रहे।",
        "title_2": "यह क्यों महत्वपूर्ण है?",
        "subtitle_2": "आपका दान हमें अधिक अनुकूलन विकल्प और ध्यान-मुक्त मोड पेश करने और IGPlus को हर डिवाइस पर सुचारू रूप से चलाने की अनुमति देता है।",
        "title_3": "आपके लिए बोनस:",
        "pref_1": "विशिष्ट दानकर्ता बैज (एक्सटेंशन में)।",
        "pref_2": "नई सुविधाओं का प्राथमिकता वाला एक्सेस।",
        "pref_3": "भविष्य के अपडेट के लिए वोट करने की क्षमता।",
        "don_1": "₹10 का दान करें (बड़ा समर्थन)",
        "don_2": "₹5 का दान करें (एक कप कॉफी)",
        "don_3": "अपनी राशि का दान करें (₹0.1 से शुरू)",
        "sup": "इंस्टाग्राम को बेहतर बनाने के लिए हमारा हर कदम आप जैसे अद्भुत उपयोगकर्ताओं की बदौलत है!",
        "rem_btn": "मुझे बाद में याद दिलाएं",
        "more_btn": "परियोजना के बारे में अधिक जानकारी"
      },
      ja: {
        "title": "あなたのサポートが私たちを向上させる原動力です。",
        "subtitle_1": "IGPlusをご利用いただきありがとうございます！私たち（私と親友）は、Instagramをより健康的で気を散らすことのない、完全にカスタマイズ可能な体験にするために無数の時間を費やしてきました。IGPlusを価値あるものだと感じていただけたなら、小額の寄付でプロジェクトを支援することを検討してください。皆さまのご協力は、新機能を追加し、この拡張機能をすべての人に無料で提供し続ける助けとなります。",
        "title_2": "なぜこれが重要なのですか？",
        "subtitle_2": "皆さまの寄付により、さらなるカスタマイズオプションや気を散らさないモードを導入し、すべてのデバイスでIGPlusがスムーズに動作するよう維持できます。",
        "title_3": "あなたへの特典：",
        "pref_1": "ユニークな寄付者バッジ（拡張機能内）。",
        "pref_2": "新機能への優先アクセス。",
        "pref_3": "将来のアップデートに投票する権利。",
        "don_1": "¥400を寄付する（大きな支援）",
        "don_2": "¥200を寄付する（コーヒー1杯分）",
        "don_3": "お好きな金額を寄付する（¥0.1から）",
        "sup": "Instagramをより良くするための私たちの一歩一歩は、皆さまのような素晴らしいユーザーのおかげです！",
        "rem_btn": "後で通知",
        "more_btn": "プロジェクトの詳細"
      },
      nl: {
        "title": "Uw steun inspireert ons om te verbeteren.",
        "subtitle_1": "Bedankt voor het gebruik van IGPlus! Wij (mijn goede vriend en ik) hebben talloze uren besteed aan het creëren van een gezondere, afleidingsvrije en volledig aanpasbare Instagram-ervaring. Als u IGPlus waardeert en nuttig vindt, overweeg dan om het project te steunen met een kleine donatie. Uw bijdrage helpt ons nieuwe functies toe te voegen en ervoor te zorgen dat de extensie gratis blijft voor iedereen.",
        "title_2": "Waarom is dit belangrijk?",
        "subtitle_2": "Uw donatie stelt ons in staat om meer aanpassingsopties en afleidingsvrije modi te introduceren en IGPlus soepel te laten werken op elk apparaat.",
        "title_3": "Bonussen voor u:",
        "pref_1": "Unieke donateursbadge (in de extensie).",
        "pref_2": "Prioritaire toegang tot nieuwe functies.",
        "pref_3": "De mogelijkheid om te stemmen op toekomstige updates.",
        "don_1": "Doneer €10 (Grote steun)",
        "don_2": "Doneer €5 (Een kop koffie)",
        "don_3": "Doneer uw bedrag (vanaf €0,1)",
        "sup": "Elke stap die we zetten om Instagram te verbeteren, is mogelijk dankzij geweldige gebruikers zoals u!",
        "rem_btn": "Herinner me later",
        "more_btn": "Meer over het project"
      },
      zh: {
        "title": "您的支持激励我们不断改进。",
        "subtitle_1": "感谢您使用 IGPlus！我和我的密友花费了无数时间来打造一个更健康、无干扰且完全可定制的 Instagram 使用体验。如果您喜欢 IGPlus 并觉得它有价值，请考虑通过小额捐赠支持这个项目。您的贡献将帮助我们添加新功能，并确保扩展程序对所有人免费。",
        "title_2": "为什么重要？",
        "subtitle_2": "您的捐赠使我们能够引入更多自定义选项和无干扰模式，并确保 IGPlus 在每台设备上顺畅运行。",
        "title_3": "为您准备的奖励：",
        "pref_1": "独特的捐赠者徽章（在扩展中显示）。",
        "pref_2": "优先使用新功能。",
        "pref_3": "投票决定未来更新的能力。",
        "don_1": "捐赠 $10（大力支持）",
        "don_2": "捐赠 $5（咖啡一杯）",
        "don_3": "捐赠任意金额（最低 $0.1）",
        "sup": "我们每一步提升 Instagram 的努力都离不开像您这样了不起的用户！",
        "rem_btn": "稍后提醒我",
        "more_btn": "了解更多关于项目的信息"
      },
      pt: {
        "title": "Seu apoio nos inspira a melhorar.",
        "subtitle_1": "Obrigado por usar o IGPlus! Eu e meu amigo próximo dedicamos inúmeras horas para criar uma experiência no Instagram mais saudável, sem distrações e totalmente personalizável. Se você gosta do IGPlus e acha valioso, considere apoiar o projeto com uma pequena doação. Sua contribuição nos ajuda a adicionar novos recursos e garante que a extensão permaneça gratuita para todos.",
        "title_2": "Por que isso é importante?",
        "subtitle_2": "Sua doação nos permite introduzir mais opções de personalização, modos sem distração e manter o IGPlus funcionando perfeitamente em cada dispositivo.",
        "title_3": "Bônus para você:",
        "pref_1": "Distintivo exclusivo de doador (na extensão).",
        "pref_2": "Acesso prioritário a novos recursos.",
        "pref_3": "Capacidade de votar nas próximas atualizações.",
        "don_1": "Doe €10 (Grande Apoio)",
        "don_2": "Doe €5 (Uma Xícara de Café)",
        "don_3": "Doe qualquer valor (A partir de €0.1)",
        "sup": "Cada passo que damos para melhorar o Instagram é impulsionado por usuários incríveis como você!",
        "rem_btn": "Lembrar-me mais tarde",
        "more_btn": "Mais sobre o projeto"
      }
    };

    const browser_cr = chrome ? chrome : browser;

    function getTranslation() {
      const browser_lang = navigator?.language?.split("-")[0]?.toLowerCase() || "en"

      if (supported_languages.indexOf(browser_lang) !== -1) {
        return browser_lang;
      }
      return "en";
    }
    // set's lang prefix translations[prefix].value
    current_lang = getTranslation();

    const initDonatePopup = () => {
      if (browser_cr?.storage?.local) {
        browser_cr.storage.local.get('closeDonateCount', function (data) {

          // set closeDonateCount if not defined
          if (!data.closeDonateCount) {
            browser_cr.storage.local.set({ 'closeDonateCount': 0 });
          }

          

          if (!data.closeDonateCount || data.closeDonateCount < MAX_CLOSE_COUNT) {

            // Gets formState.disabled prop
            browser_cr.storage.local.get("formState", (result) => {

              // if(typeof result?.formState?.theme === "string") {
              //   console.log("theme type is a string.", result.formState);
              // } else {
              //   throw new Error('Current state is not defined.');
              // }

              const FOUR_DAYS_IN_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
              const isExtensionDisabled = result?.formState?.disabled;


              const isFourDaysLeftFromInstall = () => {
                const timestamp = result?.formState?.timestamp;
                // console.log("ts from state:", timestamp);
                if (timestamp == null || isNaN(timestamp)) {
                  return true; // treat missing or invalid timestamps as "4 days left"
                }
                return (timestamp + FOUR_DAYS_IN_MS) < Date.now();
              };

              // Check if extension is enabled && isFourDaysLeftFromInstall, and only then append modal window.
              if (!isExtensionDisabled && isFourDaysLeftFromInstall()) {
                // console.log("show");
                
                // Creating the DOM element using innterHTML in ID wrapper
                const notification = document.createElement('div');
                notification.setAttribute('id', "ext_show_dn");
                const preview = browser_cr.runtime.getURL('assets/img/frog.gif');
                notification.innerHTML = `
            
  <div id="donation-popup">
  <div class="spp__popup-container">
    <div class="img">
      <img src="${preview}" alt="Donate">
    </div>
    <div class="prev"></div>
    <h2>${translations[current_lang].title}</h2>
    <p>${translations[current_lang].subtitle_1}</p>

    <h3>${translations[current_lang].title_2}</h3>
    <p>${translations[current_lang].subtitle_2}</p>

    <h3>${translations[current_lang].title_3}</h3>
    <ul>
      <li>🚀 ${translations[current_lang].pref_1}</li>
      <li>🔓 ${translations[current_lang].pref_2}</li>
      <li>🗳️ ${translations[current_lang].pref_3}</li>
    </ul>

    <div class="donate-as">
      <a href="https://www.paypal.com/donate/?cmd=_donations&business=pjaworski.dev@gmail.com" target="_blank" class="donate-btn" onclick="donate(10)">${translations[current_lang].don_1}</a>
      <a href="https://ko-fi.com/patrykjaworski" target="_blank" class="donate-btn" onclick="donate(5)">${translations[current_lang].don_2}</a>
      <a href="https://www.paypal.com/donate/?cmd=_donations&business=pjaworski.dev@gmail.com" target="_blank" class="donate-btn" onclick="donate('custom')">${translations[current_lang].don_3}</a>
    </div>

    <p class="spp__sup"><strong>${translations[current_lang].sup} ❤️</strong></p>

    <div class="close-popup">
      <a class="closeNotification">${translations[current_lang].rem_btn}</a>
      <a href="https://github.com/gerwld/IGPlus-extension/blob/main/README.md" target="_blank">${translations[current_lang].more_btn}</a>
    </div>
  </div>
  
  <button class="close_btn closeNotification">X</button>
</div>



<style id="43ggfdbt5rf">

  #donation-popup {
    position: fixed;
    top: 10px;
    right: 10px;
    max-width: 480px;
    max-height: 100vh;
    max-height: calc(100vh - 22px);
    min-height: 350px;
    overflow: scroll;
    background-color: #1f1f20 !important;
    border: 1px solid rgb(68, 86, 91, 0.5);
    box-shadow: rgba(0, 0, 0, 0.8) 0px 8px 24px;
    border-radius: 15px;
  }
  .spp__popup-container {
    position: relative;
    overflow: hidden;
  }

  .spp__popup-container .img {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 155px;
    height: 155px;
    opacity: 0.7;
    margin: -5px -12px -8px -14px;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }

  .spp__popup-container .prev {
    content: "";
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: 145px;
    height: 10px;
    background:linear-gradient(180deg, rgba(22, 21, 21, 0), rgba(22, 21, 21, 0.2));
    z-index: 1;
  }

  .spp__popup-container img {
    width: 100%;
    padding-top: 10px;
  }

  .spp__sup,
  .spp__popup-container h2,
  .spp__popup-container h3,
  .spp__popup-container li,
  .spp__popup-container a,
  .spp__popup-container button {
    color: #ffffff
  }

  .spp__popup-container h3 {
    font-size: 20px;
    margin-top: 0.8em;
    margin-bottom: 0.4em;
  }

  .spp__popup-container h2 {
    font-size: 1.5em;
    margin-top: 0.76em;
    margin-bottom: 0.56em;
  }

  .spp__popup-container ul {
    padding: 0 0 0 14px;
    margin: -5px 0 5px;
    font-size: 15px;
  }

  .spp__popup-container li {
    padding: 0;
    margin-bottom: 2px;
    font-size: 15px;
  }

  .spp__popup-container p {
    max-width: 96%;
    font-size: 14px;
    font-size: 13.4px;
    font-weight: 400;
    margin: 8px 0 16px;
    color: #868b90 !important;
    line-height: 140%;
    text-align: left;
  }

  .spp__popup-container .spp__sup {
    margin: 0.4em 0;
  }


  .close_btn,
  .spp__popup-container a,
  .spp__popup-container button {
    text-decoration: none !important;
    display: inline-block;
    overflow-wrap: no-wrap;
    border: 1px solid rgb(68, 86, 91, 0.5);
    border-radius: 10px;
    padding: 7px 10px;
    margin: 3px auto;
    max-width: 400px;
    background-color: #ffffff29 !important;
    color: white !important;
    text-align: center;
    font-size: 14px;
    font-size: 14.5px;
    cursor: pointer;
  }

  .spp__popup-container .close-popup {
    min-height: 33px;
  }

  .spp__popup-container a:hover,
  .spp__popup-container button:hover {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .spp__popup-container a:focus,
  .spp__popup-container button:focus {
    text-decoration: none;
  }

  .spp__popup-container {
    background-color: #000;
    padding: 5px 12px 8px 14px;
    box-sizing: border-box;
    transform: scale(1);
    border-radius: 15px;
    z-index: 100000 !important;
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  button.close_btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100000;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    color: rgba(255, 255, 255, 0.9)!important;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 100px;
  }
</style>

            `;
                const appendPopup = () => {
                  // Append the notification to the body
                  document.body.appendChild(notification);

                  // Event listener to the close button
                  const closeBtn = document.querySelectorAll('.closeNotification');
                  if (closeBtn) {
                    closeBtn?.forEach(e =>
                      e.addEventListener('click', function () {
                        // browser_cr.storage.local.set({ 'closeCount': data.closeDonateCount + 1 });
                        notification.style.display = 'none';
                      }));
                  }

                  // set closeCount -= 1 even if not closed & set new timestamp for 4 days delay
                  browser_cr.storage.local.set({ 'closeDonateCount': (isNaN(data.closeDonateCount) ? 0 : (data.closeDonateCount * 1)) + 1 });
                  if(typeof result?.formState?.theme === "string") {
                    browser_cr.storage.local.set({ formState: {...result.formState, timestamp: Date.now()}  });
                  }
                  // console.log((isNaN(data.closeDonateCount) ? 0 : (data.closeDonateCount * 1)) + 1);

                  // Event listener to the rate link (show one more time after click on donate, after 4 days)
                  const rateLink = document.querySelectorAll('.donate-btn');
                  if (rateLink.length) {
                    rateLink.forEach(l => l.addEventListener('click', function () {
                      browser_cr.storage.local.set({ 'closeDonateCount': MAX_CLOSE_COUNT - 1 });
                      // notification.style.display = 'none';
                    }));
                  }

                  // }
                }
                // Appending with timeout
                setTimeout(appendPopup, APPEAR_TIMEOUT);
              };

            })

          }

        });
      }
    };
    //Init get state and do delay
    document.addEventListener("DOMContentLoaded", initDonatePopup, false);
  })();
})(this);