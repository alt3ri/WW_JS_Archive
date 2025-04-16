"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Platform = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ue_1 = require("ue"),
  LauncherLog_1 = require("../Util/LauncherLog");
class Platform {
  static get Type() {
    return (
      Platform.kPt ||
        (LauncherLog_1.LauncherLog.Debug(
          "[PlatformSdkNew]平台类型未初始化,初始化平台信息",
        ),
        this.aGe()),
      Platform.f8o
    );
  }
  static IsAndroidPlatform() {
    return 1 === Platform.Type;
  }
  static IsIOSPlatform() {
    return 2 === Platform.Type;
  }
  static IsMacPlatform() {
    return 5 === Platform.Type;
  }
  static IsPs5Platform() {
    return 7 === Platform.Type;
  }
  static IsWindowsPlatform() {
    return 8 === Platform.Type;
  }
  static IsPcOrGamepadPlatform() {
    return this.IsPcPlatform() || this.IsGamepadPlatform();
  }
  static IsPcPlatform() {
    return 8 === Platform.Type || 5 === Platform.Type || 3 === Platform.Type;
  }
  static IsMobilePlatform() {
    return 2 === Platform.Type || 1 === Platform.Type;
  }
  static IsCloudGame() {
    return this.lXi;
  }
  static IsCloudGameRunningHotPatch() {
    return this.t5l;
  }
  static get CloudGamePlatform() {
    return this.Vu_;
  }
  static set CloudGamePlatform(t) {
    this.Vu_ = t;
  }
  static IsHuaWeiDevice() {
    return ue_1.KuroStaticLibrary.GetVendorInfo()
      .toUpperCase()
      .includes("HUAWEI");
  }
  static IsHonorDevice() {
    return ue_1.KuroStaticLibrary.GetVendorInfo()
      .toUpperCase()
      .includes("HONOR");
  }
  static IsFoldingScreen() {
    var t =
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().X /
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().Y;
    return (
      (t < 1.8 || 2.6 < t) &&
      (LauncherLog_1.LauncherLog.Info("折叠屏适配", ["ScreenRatio", t]), !0)
    );
  }
  static IsGamepadPlatform() {
    return 9 === Platform.Type || 6 === Platform.Type || 7 === Platform.Type;
  }
  static aGe() {
    switch (cpp_1.KuroApplication.IniPlatformName()) {
      case "IOS":
        Platform.f8o = 2;
        break;
      case "Android":
        Platform.f8o = 1;
        break;
      case "Windows":
        Platform.f8o = 8;
        break;
      case "Mac":
        Platform.f8o = 5;
        break;
      case "Linux":
        Platform.f8o = 3;
        break;
      case "XboxOne":
        Platform.f8o = 9;
        break;
      case "PS4":
        Platform.f8o = 6;
        break;
      case "PS5":
        Platform.f8o = 7;
        break;
      default:
        Platform.f8o = 0;
    }
    var t = ue_1.KismetSystemLibrary.GetCommandLine();
    (Platform.lXi = t.includes("-CloudGame") ?? !1),
      (Platform.t5l = t.includes("-CloudGameHotPatch") ?? !1),
      (Platform.kPt = !0),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]初始化平台类型",
        ["PlatformType", Platform.f8o],
        ["CloudGame", Platform.lXi],
        ["CloudGameHotPatch", Platform.t5l],
      );
  }
  static CheckAssetPlatformInclude(t) {
    return UE.KuroActorSubsystem.CheckAssetPlatformInclude(t);
  }
}
((exports.Platform = Platform).kPt = !1),
  (Platform.f8o = 0),
  (Platform.lXi = !1),
  (Platform.t5l = !1),
  (Platform.Vu_ = "");
//# sourceMappingURL=Platform.js.map
