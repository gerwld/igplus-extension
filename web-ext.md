## Currently, Mozilla ADB detect doesn't work properly with Android Studio emulators (December 2024).
### If you want to test it on an Android emulator:

1. Download org.mozilla.firefox APK directly from 
    https://github.com/mozilla-mobile/fenix/releases
2. Turn on USB debugging on your emulator and install APK using adb install / drag-n-drop
3. Open Mozilla Settings > Turn on USB Debugging
4. In your terminal (in project root directory), run `pnpm mozilla`
5. Then, run:
  $ cd public/firefox && web-ext run -t firefox-android --adb-device YOUR_DEVICE --firefox-apk org.mozilla.firefox


> * Where YOUR_DEVICE = your device-id specified in `adb devices` command. For example, emulator-5554
