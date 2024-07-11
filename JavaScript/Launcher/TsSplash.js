"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  LauncherConfigLib_1 = require("./Define/LauncherConfigLib"),
  SplashUiView_1 = require("./Ui/Splash/SplashUiView"),
  AppUtil_1 = require("./Update/AppUtil"),
  LauncherGameSettingLib_1 = require("./Util/LauncherGameSettingLib"),
  LauncherLanguageLib_1 = require("./Util/LauncherLanguageLib"),
  LauncherResourceLib_1 = require("./Util/LauncherResourceLib"),
  LauncherStorageLib_1 = require("./Util/LauncherStorageLib");
class TsSplash extends UE.Object {
  Init(e) {
    UE.KismetSystemLibrary.GetCommandLine().includes("-SkipSplash")
      ? UE.GameplayStatics.OpenLevel(
          e,
          new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
        )
      : ((TsSplash.WorldContext = e),
        TsSplash.DoInit(e),
        (TsSplash.WorldContext.GetWorld().AuthorityGameMode.bUseSeamlessTravel =
          !0),
        this.ShowSplashView());
  }
  GetDelay() {
    return 0;
  }
  ChangeToPhaseOne() {
    (TsSplash.CurrentPhase = 0),
      TsSplash.KuroSplashVideo.PlayAnimationLogo(() => {
        this.ChangeToPhaseTwo();
      });
  }
  ChangeToPhaseTwo() {
    (TsSplash.CurrentPhase = 1),
      TsSplash.KuroSplashVideo.PlayWuthering(() => {
        LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage() ===
        LauncherLanguageLib_1.KOREAN_ISO639_1
          ? this.ChangeToPhaseSpecial()
          : this.ChangeToPhaseThree();
      });
  }
  ChangeToPhaseSpecial() {
    (TsSplash.CurrentPhase = 2),
      TsSplash.KuroSplashVideo.PlayPreventAddictionAnimation(() => {
        this.ChangeToPhaseThree();
      });
  }
  ChangeToPhaseThree() {
    (TsSplash.CurrentPhase = 3),
      TsSplash.KuroSplashVideo.PlayCautionAnimation(() => {
        this.ChangeScene();
      });
  }
  ShowSplashView() {
    (TsSplash.KuroSplashVideo = new SplashUiView_1.SplashUiView()),
      TsSplash.KuroSplashVideo.InitAsync(TsSplash.WorldContext).then(() => {
        this.ChangeToPhaseOne();
      });
  }
  ChangeScene() {
    TsSplash.KuroSplashVideo.StopCurrentAnimation(),
      TsSplash.KuroSplashVideo.Destroy(),
      UE.GameplayStatics.OpenLevel(
        TsSplash.WorldContext,
        new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
      );
  }
  static DoInit(e) {
    AppUtil_1.AppUtil.SetWorldContext(e),
      LauncherStorageLib_1.LauncherStorageLib.Initialize(),
      LauncherResourceLib_1.LauncherResourceLib.Initialize(),
      LauncherConfigLib_1.LauncherConfigLib.Initialize(),
      LauncherLanguageLib_1.LauncherLanguageLib.Initialize(
        UE.KuroStaticLibrary.IsEditor(e),
      ),
      LauncherGameSettingLib_1.LauncherGameSettingLib.Initialize();
  }
}
(TsSplash.CurrentPhase = 0),
  (TsSplash.WorldContext = void 0),
  (TsSplash.KuroSplashVideo = void 0),
  (exports.default = TsSplash);
//# sourceMappingURL=TsSplash.js.map
