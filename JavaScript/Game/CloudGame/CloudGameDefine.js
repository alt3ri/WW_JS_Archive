"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CLOUD_GAME_DEFAULT_SCREEN_HEIGHT =
    exports.CLOUD_GAME_DEFAULT_SCREEN_WIDTH =
    exports.defaultDeviceMargin =
    exports.deviceMarginMap =
    exports.CLOUD_GAME_DEFAULT_DPI =
    exports.cloudGameIsWeb =
    exports.cloudGameScreenResolution =
    exports.cloudGameDeviceScreenResolution =
    exports.cloudGameDpiRegex =
    exports.cloudGameDeviceRegex =
    exports.cloudGamePlatformRegex =
      void 0),
  (exports.cloudGamePlatformRegex = /-CloudGamePlatform=([^\s]+)/),
  (exports.cloudGameDeviceRegex = /-Device=([^\s]+)/),
  (exports.cloudGameDpiRegex = /-Dpi=([^\s]+)/),
  (exports.cloudGameDeviceScreenResolution =
    /-DeviceScreenResolution=(\d+)x(\d+)/),
  (exports.cloudGameScreenResolution = /Res=(\d+)x(\d+)/),
  (exports.cloudGameIsWeb = /-IsWeb=([^\s]+)/),
  (exports.CLOUD_GAME_DEFAULT_DPI = 180),
  (exports.deviceMarginMap = new Map([
    ["iPhone15,2", [5.4, 0, 4, 0.8]],
    ["iPhone15,3", [5.4, 0, 4, 0.8]],
    ["ELS-AN00", [5.4, 0, 4, 0.8]],
    ["PGU110", [5.4, 0, 4, 0.8]],
    ["iPhone16,1", [5.4, 0, 4, 0.8]],
    ["iPhone16,2", [5.4, 0, 4, 0.8]],
    ["ANA-AN00", [5.4, 0, 4, 0.8]],
    ["ELS-AN10", [5.4, 0, 4, 0.8]],
    ["JER-TN20", [5.4, 0, 4, 0.8]],
    ["WLZ-AN00", [5.4, 0, 4, 0.8]],
    ["OXF-AN00", [5.4, 0, 4, 0.8]],
    ["OXF-AN10", [5.4, 0, 4, 0.8]],
    ["iPhone17,1", [5.4, 0, 4, 0.8]],
    ["iPhone17,2", [5.4, 0, 4, 0.8]],
    ["iPhone17,3", [5.4, 0, 4, 0.8]],
    ["iPhone17,4", [5.4, 0, 4, 0.8]],
    ["iPhone17,5", [5.4, 0, 4, 0.8]],
  ])),
  (exports.defaultDeviceMargin = [3, 0, 2.7, 0.8]),
  (exports.CLOUD_GAME_DEFAULT_SCREEN_WIDTH = 1920),
  (exports.CLOUD_GAME_DEFAULT_SCREEN_HEIGHT = 1080);
//# sourceMappingURL=CloudGameDefine.js.map
