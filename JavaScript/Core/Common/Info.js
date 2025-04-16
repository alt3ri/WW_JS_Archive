"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Info = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  Macro_1 = require("../Preprocessor/Macro"),
  InfoDefine_1 = require("./InfoDefine"),
  Log_1 = require("./Log");
class Info {
  static get GameInstance() {
    return this.f8;
  }
  static get World() {
    return this.f8 ? this.f8.GetWorld() : void 0;
  }
  static Initialize(t) {
    (this.f8 = t),
      (this.Environment = 1),
      (this.p8 = UE.KuroStaticLibrary.IsEditor(t)),
      (this.v8 = cpp_1.KuroApplication.IsBuildShipping()),
      (this.M8 = cpp_1.KuroApplication.IsBuildTest()),
      (this.E8 = !this.v8 && !this.M8),
      (this.S8 =
        this.p8 &&
        0 <
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
            "r.Kuro.Movie.EnableCGMovieRendering",
          )),
      Macro_1.NOT_SHIPPING_ENVIRONMENT && this.p8
        ? (this.m6a =
            UE.KuroRenderingEditorBPPluginBPLibrary.IsSimulateInEditorInProgress())
        : (this.m6a = !1),
      this.y8(),
      this.uXi(Platform_1.Platform.CloudGamePlatform);
  }
  static get IsPlayInEditor() {
    return this.p8;
  }
  static get IsBuildShipping() {
    return this.v8;
  }
  static get IsBuildTest() {
    return this.M8;
  }
  static get IsBuildDevelopmentOrDebug() {
    return this.E8;
  }
  static IsGameRunning() {
    return 1 === this.Environment;
  }
  static IsInCg() {
    return this.S8;
  }
  static SetInCg(t) {
    this.S8 !== t &&
      ((this.S8 = t),
      cpp_1.FEffectSystem.OnIsInEditorTickChange(this.IsInEditorTick()));
  }
  static IsInEditorTick() {
    return this.m6a || this.S8;
  }
  static get PlatformType() {
    return this.sXi;
  }
  static get InputControllerType() {
    return this.rEa;
  }
  static get InputControllerMainType() {
    return this.oEa;
  }
  static get OperationType() {
    return this.aXi;
  }
  static y8() {
    switch (cpp_1.KuroApplication.IniPlatformName()) {
      case "IOS":
        this.sXi = 1;
        break;
      case "Android":
        this.sXi = 2;
        break;
      case "Windows":
        this.sXi = 3;
        break;
      case "Mac":
        this.sXi = 4;
        break;
      case "Linux":
        this.sXi = 5;
        break;
      case "XboxOne":
        this.sXi = 6;
        break;
      case "PS4":
        this.sXi = 7;
        break;
      case "PS5":
        this.sXi = 8;
        break;
      default:
        this.sXi = 0;
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Platform", 24, "初始化平台类型", [
        "PlatformType",
        this.sXi,
      ]);
    var t = InfoDefine_1.defaultPlatformAndInputControllerMap.get(this.sXi);
    void 0 !== t
      ? this.SwitchInputControllerType(t, "InitializePlatformType")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Platform", 10, "找不到平台默认对应的输入类型", [
          "PlatformType",
          this.sXi,
        ]);
  }
  static uXi(t) {
    Platform_1.Platform.IsCloudGame() &&
      ("Android" === t || "IOS" === t
        ? Info.SwitchInputControllerType(5, "InitCloudGame Mobile")
        : ("Mac" !== t && "Windows" != t) ||
          Info.SwitchInputControllerType(1, "InitCloudGame Desktop"));
  }
  static cXi(t, i) {
    var s;
    this.rEa !== t &&
      (1 === t &&
        5 === this.rEa &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Platform",
          10,
          "[PlatformDebug]从Touch输入方式切换成了键鼠的输入方式",
          ["lastInputController", this.rEa],
          ["inputController", t],
        ),
      (s = this.rEa),
      (this.rEa = t),
      this.aEa(),
      Info.Iya?.(s, this.rEa),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Platform",
        16,
        "设置输入方式",
        ["lastInputController", s],
        ["InputController", this.rEa],
        ["Reason", i],
      );
  }
  static hEa(t) {
    var i,
      t = InfoDefine_1.showTypeAndInputControllerMap[t];
    t !== this.aXi && ((i = this.aXi), (this.aXi = t), Info.Tya?.(i, t));
  }
  static aEa() {
    var t,
      i = InfoDefine_1.inputControllerMainTypeMap[this.rEa];
    i !== this.oEa && ((t = this.oEa), (this.oEa = i), Info.Lya?.(t, i));
  }
  static IsPcOrGamepadPlatform() {
    return this.IsPcPlatform() || this.IsGamepadPlatform();
  }
  static IsPcPlatform() {
    return 3 === this.sXi || 4 === this.sXi || 5 === this.sXi;
  }
  static IsMobilePlatform() {
    return 1 === this.sXi || 2 === this.sXi;
  }
  static IsIosPlatform() {
    return 1 === this.sXi;
  }
  static IsGamepadPlatform() {
    return 6 === this.sXi || 7 === this.sXi || 8 === this.sXi;
  }
  static IsPs5Platform() {
    return 8 === this.sXi;
  }
  static IsMacPlatform() {
    return 4 === this.sXi;
  }
  static IsWindowsPlatform() {
    return 3 === this.sXi;
  }
  static IsAndroidPlatform() {
    return 2 === this.sXi;
  }
  static IsInKeyBoard() {
    return 1 === this.InputControllerMainType;
  }
  static IsInTouch() {
    return 3 === this.InputControllerMainType;
  }
  static IsInGamepad() {
    return 2 === this.InputControllerMainType;
  }
  static IsXboxGamepad() {
    return this.IsInGamepad() && 2 === this.InputControllerType;
  }
  static IsPsGamepad() {
    return (
      this.IsInGamepad() &&
      (3 === this.InputControllerType || 4 === this.InputControllerType)
    );
  }
  static IsBackBoneGamepad() {
    return this.IsInGamepad() && 6 === this.InputControllerType;
  }
  static CheckIsBackBoneGamepad(t) {
    return 6 === t;
  }
  static CheckIsPsGamepad(t) {
    return 3 === t || 4 === t;
  }
  static IsMobileInputModel() {
    return (
      !!Info.IsMobilePlatform() ||
      !(
        3 !== this.sXi ||
        !Platform_1.Platform.IsCloudGame() ||
        ("Android" !== Platform_1.Platform.CloudGamePlatform &&
          "IOS" !== Platform_1.Platform.CloudGamePlatform)
      )
    );
  }
  static IsPcInputModel() {
    return (
      4 === this.sXi ||
      5 === this.sXi ||
      (3 === this.sXi &&
        (!Platform_1.Platform.IsCloudGame() ||
          "Mac" === Platform_1.Platform.CloudGamePlatform ||
          "Windows" === Platform_1.Platform.CloudGamePlatform))
    );
  }
  static SwitchInputControllerType(t, i) {
    0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Platform", 10, "传入了EInputControllerType.None类型", [
          "Reason",
          i,
        ])
      : this.IsGmLockGamepad ||
        (this.IsMobileInputModel() && 1 === t) ||
        (this.IsPcInputModel() && 5 === t) ||
        (this.cXi(t, i), this.hEa(t));
  }
  static SetInputTypeChangeFunc(t) {
    Info.Iya = t;
  }
  static ClearInputTypeChangeFunc() {
    Info.Iya = void 0;
  }
  static SetShowTypeChangeFunc(t) {
    Info.Tya = t;
  }
  static ClearShowTypeChangeFunc() {
    Info.Tya = void 0;
  }
  static SetInputMainTypeChangeFunc(t) {
    Info.Lya = t;
  }
  static ClearInputMainTypeChangeFunc() {
    Info.Lya = void 0;
  }
}
((exports.Info = Info).Version = "1.0.0"),
  (Info.Environment = 0),
  (Info.EnableForceTick = !1),
  (Info.p8 = !0),
  (Info.v8 = !0),
  (Info.M8 = !1),
  (Info.E8 = !1),
  (Info.S8 = !1),
  (Info.UseFastInputCallback = !0),
  (Info.AxisInputOptimize = !0),
  (Info.m6a = !1),
  (Info.sXi = 0),
  (Info.rEa = 0),
  (Info.oEa = 0),
  (Info.aXi = 0),
  (Info.IsGmLockGamepad = !1),
  (Info.Iya = void 0),
  (Info.Tya = void 0),
  (Info.Lya = void 0);
//# sourceMappingURL=Info.js.map
