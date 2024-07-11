"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplashUiView = void 0);
const UE = require("ue");
const BaseConfigController_1 = require("../../BaseConfig/BaseConfigController");
const LauncherConfigLib_1 = require("../../Define/LauncherConfigLib");
const LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib");
const LauncherLog_1 = require("../../Util/LauncherLog");
const LauncherResourceLib_1 = require("../../Util/LauncherResourceLib");
const LaunchComponentsAction_1 = require("../LaunchComponentsAction");
const LaunchUtil_1 = require("../LaunchUtil");
const ENCOMPANYNAME = "Company_en";
class SplashUiView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.NQe = void 0),
      (this.XEr = void 0),
      (this.PSr = void 0),
      (this.QPt = void 0),
      (this.$Er = void 0),
      (this.YEr = void 0),
      (this.JEr = "Company_"),
      (this.bEr = "WutheringWave_"),
      (this.zEr = void 0),
      (this.ZEr = void 0),
      (this.sXe = void 0),
      (this.NQ = new Map()),
      (this.qEr = (i) => {
        this.NQe = i;
      }),
      (this.GEr = (i) => {
        this.SetRootActorLaunchComponentsAction(i),
          (this.XEr = this.RootItem.GetOwner());
      });
  }
  async InitAsync(i) {
    let t;
    UE.GameplayStatics.GetPlatformName() !== "Windows" &&
      ((t = UE.GameUserSettings.GetGameUserSettings()).SetFrameRateLimit(30),
      t.ApplySettings(!0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        i,
        "r.DepthOfFieldQuality 0",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(i, "r.ScreenPercentage 80")),
      (this.PSr = i),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        LaunchUtil_1.LaunchUtil.UiRootPath,
        this.PSr,
        void 0,
        this.qEr,
      ),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        "/Game/Aki/UI/Module/HotFix/Prefab/UiView_LoginLogo.UiView_LoginLogo",
        this.PSr,
        this.NQe.RootComponent,
        this.GEr,
      ),
      await this.LoadResourceAsync(),
      this.eyr();
  }
  async LoadResourceAsync() {
    await this.tyr("/Game/Aki/HotPatch/Splash/SplashTable.SplashTable"),
      await this.iyr();
  }
  OnStart() {
    (this.$Er = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage()),
      (this.YEr = LauncherLanguageLib_1.LauncherLanguageLib.GetDefaultCulture(
        this.$Er,
      ));
  }
  OnBeforeDestroy() {
    this.sXe && (this.sXe = void 0),
      (this.XEr = void 0),
      (this.NQ = void 0),
      (this.zEr = void 0),
      (this.ZEr = void 0),
      (this.$Er = void 0),
      (this.YEr = void 0);
  }
  eyr() {
    this.oyr(), this.ryr();
  }
  oyr() {
    this.GetTexture(1).SetTexture(this.ZEr),
      this.GetTexture(1).SetSizeFromTexture(),
      this.GetTexture(5).SetTexture(this.zEr),
      this.GetTexture(5).SetSizeFromTexture();
  }
  H8s() {
    return (
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea") !==
      "CN"
    );
  }
  ryr() {
    const i = this.H8s();
    LauncherLog_1.LauncherLog.Info("TsSplash", ["ifglobal", i]);
    let t = this.nyr(this.$Er, "SplashCautionTitle");
    let s =
      ((t !== "" && void 0 !== t) ||
        (t = this.nyr(this.YEr, "SplashCautionTitle")),
      this.GetText(7).SetText(t),
      this.nyr(this.$Er, "SplashCautionContent"));
    let h =
      ((s !== "" && void 0 !== s) ||
        (s = this.nyr(this.YEr, "SplashCautionContent")),
      this.GetText(8).SetText(s),
      this.nyr(this.$Er, "SplashLoading"));
    let e =
      ((h !== "" && void 0 !== h) || (h = this.nyr(this.YEr, "SplashLoading")),
      this.GetText(9).SetText(h),
      "");
    let a =
      (i ||
        ((e = this.nyr(this.$Er, "SplashHealthyGamingAdvisory")) !== "" &&
          void 0 !== e) ||
        (e = this.nyr(this.YEr, "SplashHealthyGamingAdvisory")),
      this.GetText(2).SetText(e),
      "");
    i ||
      ((a = this.nyr(this.$Er, "SplashCopyrightInformation")) !== "" &&
        void 0 !== a) ||
      (a = this.nyr(this.YEr, "SplashCopyrightInformation")),
      this.GetText(3).SetText(a);
  }
  PlayAnimationLogo(i) {
    this.syr("LogoAnimation", i);
  }
  PlayWuthering(i) {
    this.syr("WutheringWaveAnimation", i);
  }
  PlayCautionAnimation(i) {
    this.syr("CautionAnimation", i);
  }
  PlayPreventAddictionAnimation(i) {
    this.syr("PreventAddiction", i);
  }
  StopCurrentAnimation() {
    this.ayr();
  }
  nyr(i, t) {
    return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(t) ?? "";
  }
  async iyr() {
    (this.ZEr = await this.hyr(this.bEr + this.$Er)),
      void 0 === this.ZEr && (this.ZEr = await this.hyr(this.bEr + this.YEr));
    let i = this.JEr + this.$Er;
    this.H8s() && (i = ENCOMPANYNAME),
      (this.zEr = await this.hyr(i)),
      void 0 === this.zEr && (this.zEr = await this.hyr(this.JEr + this.YEr));
  }
  syr(i, t) {
    this.ayr();
    const s = this.XEr.GetSequencePlayContextOfKey(i);
    void 0 !== s &&
      (s.OnFinish.Bind(() => {
        (this.QPt = void 0), t?.();
      }),
      (this.QPt = i),
      s.ExecutePlay());
  }
  ayr() {
    let i;
    void 0 !== this.QPt &&
      ((i = this.XEr.GetSequencePlayerByKey(this.QPt)) &&
        (this.XEr.SequenceJumpToSecondByKey(
          this.QPt,
          i.SequencePlayer.GetDuration().Time,
        ),
        this.XEr.StopSequenceByKey(this.QPt)),
      (this.QPt = void 0));
  }
  async tyr(i) {
    return new Promise((t) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        i,
        UE.DataTable,
        (i) => {
          (this.sXe = i),
            (this.NQ = LaunchUtil_1.LaunchUtil.GetDataTableMap(
              this.sXe,
              "path",
            )),
            t(void 0);
        },
      );
    });
  }
  async hyr(i) {
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
      this.NQe &&
        (UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.NQe, !0),
        (this.NQe = void 0)),
      this.PSr && (this.PSr = void 0);
  }
}
exports.SplashUiView = SplashUiView;
// # sourceMappingURL=SplashUiView.js.map
