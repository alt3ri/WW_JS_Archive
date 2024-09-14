"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplashUiView = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  Platform_1 = require("../../Platform/Platform"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherResourceLib_1 = require("../../Util/LauncherResourceLib"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  LaunchUtil_1 = require("../LaunchUtil"),
  ENCOMPANYNAME = "Company_en";
class SplashUiView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.YXe = void 0),
      (this.Wyr = void 0),
      (this.RSr = void 0),
      (this.Jxt = void 0),
      (this.Kyr = void 0),
      (this.Qyr = void 0),
      (this.Xyr = "Company_"),
      (this.xyr = "WutheringWave_"),
      (this.$yr = void 0),
      (this.Yyr = void 0),
      (this.p$e = void 0),
      (this.NQ = new Map()),
      (this.wyr = (i) => {
        this.YXe = i;
      }),
      (this.Byr = (i) => {
        this.SetRootActorLaunchComponentsAction(i),
          (this.Wyr = this.RootItem.GetOwner());
      });
  }
  async InitAsync(i) {
    var t;
    Platform_1.Platform.IsWindowsPlatform() ||
      ((t = UE.GameUserSettings.GetGameUserSettings()).SetFrameRateLimit(30),
      t.ApplySettings(!0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        i,
        "r.DepthOfFieldQuality 0",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(i, "r.ScreenPercentage 80")),
      (this.RSr = i),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        LaunchUtil_1.LaunchUtil.UiRootPath,
        this.RSr,
        void 0,
        this.wyr,
      ),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        "/Game/Aki/UI/Module/HotFix/Prefab/UiView_LoginLogo.UiView_LoginLogo",
        this.RSr,
        this.YXe.RootComponent,
        this.Byr,
      ),
      await this.LoadResourceAsync(),
      this.Jyr();
  }
  async LoadResourceAsync() {
    await this.zyr("/Game/Aki/HotPatch/Splash/SplashTable.SplashTable"),
      await this.Zyr();
  }
  OnStart() {
    (this.Kyr = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage()),
      (this.Qyr = LauncherLanguageLib_1.LauncherLanguageLib.GetDefaultCulture(
        this.Kyr,
      ));
  }
  OnBeforeDestroy() {
    this.p$e && (this.p$e = void 0),
      (this.Wyr = void 0),
      (this.NQ = void 0),
      (this.$yr = void 0),
      (this.Yyr = void 0),
      (this.Kyr = void 0),
      (this.Qyr = void 0);
  }
  Jyr() {
    this.eIr(), this.tIr();
  }
  eIr() {
    this.GetTexture(1).SetTexture(this.Yyr),
      this.GetTexture(1).SetSizeFromTexture(),
      this.GetTexture(5).SetTexture(this.$yr),
      this.GetTexture(5).SetSizeFromTexture();
  }
  szs() {
    return (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
    );
  }
  tIr() {
    var i = this.szs();
    LauncherLog_1.LauncherLog.Info("TsSplash", ["ifglobal", i]);
    let t = this.iIr(this.Kyr, "SplashCautionTitle"),
      s =
        (("" !== t && void 0 !== t) ||
          (t = this.iIr(this.Qyr, "SplashCautionTitle")),
        this.GetText(7).SetText(t),
        this.iIr(this.Kyr, "SplashCautionContent")),
      h =
        (("" !== s && void 0 !== s) ||
          (s = this.iIr(this.Qyr, "SplashCautionContent")),
        this.GetText(8).SetText(s),
        this.iIr(this.Kyr, "SplashLoading")),
      e =
        (("" !== h && void 0 !== h) ||
          (h = this.iIr(this.Qyr, "SplashLoading")),
        this.GetText(9).SetText(h),
        ""),
      a =
        (i ||
          ("" !== (e = this.iIr(this.Kyr, "SplashHealthyGamingAdvisory")) &&
            void 0 !== e) ||
          (e = this.iIr(this.Qyr, "SplashHealthyGamingAdvisory")),
        this.GetText(2).SetText(e),
        "");
    i ||
      ("" !== (a = this.iIr(this.Kyr, "SplashCopyrightInformation")) &&
        void 0 !== a) ||
      (a = this.iIr(this.Qyr, "SplashCopyrightInformation")),
      this.GetText(3).SetText(a);
  }
  PlayAnimationLogo(i) {
    this.oIr("LogoAnimation", i);
  }
  PlayWuthering(i) {
    this.oIr("WutheringWaveAnimation", i);
  }
  PlayCautionAnimation(i) {
    this.oIr("CautionAnimation", i);
  }
  PlayPreventAddictionAnimation(i) {
    this.oIr("PreventAddiction", i);
  }
  StopCurrentAnimation() {
    this.rIr();
  }
  iIr(i, t) {
    return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(t) ?? "";
  }
  async Zyr() {
    (this.Yyr = await this.nIr(this.xyr + this.Kyr)),
      void 0 === this.Yyr && (this.Yyr = await this.nIr(this.xyr + this.Qyr));
    let i = this.Xyr + this.Kyr;
    this.szs() && (i = ENCOMPANYNAME),
      (this.$yr = await this.nIr(i)),
      void 0 === this.$yr && (this.$yr = await this.nIr(this.Xyr + this.Qyr));
  }
  oIr(i, t) {
    this.rIr();
    var s = this.Wyr.GetSequencePlayContextOfKey(i);
    void 0 !== s &&
      (s.OnFinish.Bind(() => {
        (this.Jxt = void 0), t?.();
      }),
      (this.Jxt = i),
      s.ExecutePlay());
  }
  rIr() {
    var i;
    void 0 !== this.Jxt &&
      ((i = this.Wyr.GetSequencePlayerByKey(this.Jxt)) &&
        (this.Wyr.SequenceJumpToSecondByKey(
          this.Jxt,
          i.SequencePlayer.GetDuration().Time,
        ),
        this.Wyr.StopSequenceByKey(this.Jxt)),
      (this.Jxt = void 0));
  }
  async zyr(i) {
    return new Promise((t) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        i,
        UE.DataTable,
        (i) => {
          (this.p$e = i),
            (this.NQ = LaunchUtil_1.LaunchUtil.GetDataTableMap(
              this.p$e,
              "path",
            )),
            t(void 0);
        },
      );
    });
  }
  async nIr(i) {
    const s = this.NQ.get(i);
    if (s)
      return new Promise((t) => {
        LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
          s,
          UE.Texture,
          (i) => {
            if (void 0 !== i) return t(i), i;
          },
        );
      });
  }
  Destroy() {
    super.Destroy(),
      this.YXe &&
        (UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.YXe, !0),
        (this.YXe = void 0)),
      this.RSr && (this.RSr = void 0);
  }
}
exports.SplashUiView = SplashUiView;
//# sourceMappingURL=SplashUiView.js.map
