"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Info = void 0);
const UE = require("ue"),
  Log_1 = require("./Log");
class Info {
  static get GameInstance() {
    return this.f8;
  }
  static get World() {
    return this.f8 ? this.f8.GetWorld() : void 0;
  }
  static get PlatformType() {
    return this.I8;
  }
  static Initialize(t) {
    (this.f8 = t),
      (this.Environment = 1),
      this.InitializeIsInEditor(t),
      (this.p8 = UE.KuroStaticLibrary.IsBuildShipping()),
      (this.v8 = UE.KuroStaticLibrary.IsBuildTest()),
      (this.M8 = !this.p8 && !this.v8),
      (this.S8 =
        this.E8 &&
        0 <
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
            "r.Kuro.Movie.EnableCGMovieRendering",
          )),
      this.y8();
  }
  static InitializeIsInEditor(t) {
    this.E8 = UE.KuroStaticLibrary.IsEditor(t);
  }
  static y8() {
    switch (UE.GameplayStatics.GetPlatformName()) {
      case "IOS":
        this.I8 = 1;
        break;
      case "Android":
        this.I8 = 2;
        break;
      case "Windows":
        this.I8 = 3;
        break;
      case "Mac":
        this.I8 = 4;
        break;
      case "Linux":
        this.I8 = 5;
        break;
      case "XboxOne":
        this.I8 = 6;
        break;
      case "PS4":
        this.I8 = 7;
        break;
      default:
        this.I8 = 0;
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Platform", 25, "初始化平台类型", [
        "PlatformType",
        this.I8,
      ]);
  }
  static IsPc() {
    return 3 === this.I8 || 4 === this.I8 || 5 === this.I8;
  }
  static IsMobile() {
    return 1 === this.I8 || 2 === this.I8;
  }
  static IsGamepad() {
    return 6 === this.I8 || 7 === this.I8;
  }
  static get IsPlayInEditor() {
    return this.E8;
  }
  static get IsBuildShipping() {
    return this.p8;
  }
  static get IsBuildTest() {
    return this.v8;
  }
  static get IsBuildDevelopmentOrDebug() {
    return this.M8;
  }
  static IsGameRunning() {
    return 1 === this.Environment;
  }
  static IsInCg() {
    return this.S8;
  }
}
((exports.Info = Info).Version = "1.0.0"),
  (Info.Environment = 0),
  (Info.EnableForceTick = !1),
  (Info.E8 = !0),
  (Info.p8 = !0),
  (Info.v8 = !1),
  (Info.M8 = !1),
  (Info.S8 = !1),
  (Info.I8 = 0);
//# sourceMappingURL=Info.js.map
