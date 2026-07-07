/* ===============================================================
   PIXORA PRO — BUILD 001 (Foundation)
   Namespace: PixoraApp
   =============================================================== */

const PixoraApp = {

  /* -----------------------------------------------------------
     Central config
  ----------------------------------------------------------- */
  config: {
    SCREENS: ['splash', 'home', 'editor']
  },

  state: {
    currentScreen: 'splash'
  },

  elements: {},

  init() {
    this.cacheElements();
    this.setRealViewportHeight();
    this.ScreenManager.showScreen('splash');
  },

  cacheElements() {
    this.elements.root = document.getElementById('pixora-root');
    this.elements.screens = {
      splash: document.getElementById('pixora-screen-splash'),
      home: document.getElementById('pixora-screen-home'),
      editor: document.getElementById('pixora-screen-editor')
    };
  },

  /* -----------------------------------------------------------
     Android viewport-height fix (100vh bug),
     carried forward — still required on every screen.
  ----------------------------------------------------------- */
  setRealViewportHeight() {
    const applyVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    applyVh();
    window.addEventListener('resize', applyVh);
    window.addEventListener('orientationchange', () => setTimeout(applyVh, 200));
  },

  /* ===============================================================
     SCREEN MANAGER MODULE
     Future builds (Splash animation, Home cards, Editor tools)
     will call PixoraApp.ScreenManager.showScreen('home') etc.
     No other module should touch screen visibility directly.
     =============================================================== */
  ScreenManager: {

    showScreen(screenName) {
      const validScreens = PixoraApp.config.SCREENS;
      if (!validScreens.includes(screenName)) {
        console.error(`PixoraApp.ScreenManager: unknown screen "${screenName}"`);
        return;
      }

      Object.keys(PixoraApp.elements.screens).forEach((key) => {
        const el = PixoraApp.elements.screens[key];
        if (key === screenName) {
          el.classList.remove('pixora-hidden');
        } else {
          el.classList.add('pixora-hidden');
        }
      });

      PixoraApp.state.currentScreen = screenName;
    },

    getCurrentScreen() {
      return PixoraApp.state.currentScreen;
    }
  }

};

document.addEventListener('DOMContentLoaded', () => PixoraApp.init());
