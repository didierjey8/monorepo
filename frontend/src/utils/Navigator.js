export default {
  os() {
    let userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "mac_os";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "ios";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "windows";
    } else if (/Android/.test(userAgent)) {
      os = "android";
    } else if (!os && /Linux/.test(platform)) {
      os = "linux";
    }

    return os;
  },
  browser() {
    let userAgent = window.navigator.userAgent;
    let browserName;

    if (userAgent.toLowerCase().match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.toLowerCase().match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.toLowerCase().match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.toLowerCase().match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.toLowerCase().match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }

    return browserName;
  },
};
