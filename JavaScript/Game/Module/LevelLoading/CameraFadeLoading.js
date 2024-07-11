"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraFadeLoading = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController"),
  INTERLUDE_FADE_IN_TIME = 1,
  INTERLUDE_FADE_OUT_TIME = 1,
  INTERLUDE_LIMIT_TIME = 30;
class CameraFadeLoading {
  constructor() {
    (this.ipi = !1),
      (this.opi = new UE.LinearColor(0, 0, 0, 1)),
      (this.kti = new UE.LinearColor(1, 1, 1, 1));
  }
  EnterInterlude(
    e = INTERLUDE_FADE_IN_TIME,
    a = !1,
    r = !0,
    t = void 0,
    i = IAction_1.EFadeInScreenShowType.Black,
    o,
  ) {
    e = MathUtils_1.MathUtils.Clamp(e, 0, INTERLUDE_LIMIT_TIME);
    this.rpi(e * TimeUtil_1.TimeUtil.InverseMillisecond, a, r, t, i, o);
  }
  ExitInterlude(e = INTERLUDE_FADE_OUT_TIME, a) {
    e = MathUtils_1.MathUtils.Clamp(e, 0, INTERLUDE_LIMIT_TIME);
    this.npi(e * TimeUtil_1.TimeUtil.InverseMillisecond, a);
  }
  IsInFade() {
    return this.ipi;
  }
  IsInFadeOut() {
    return (
      void 0 !==
      ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise
    );
  }
  rpi(
    e = 1,
    a = !1,
    r = !0,
    t = void 0,
    i = IAction_1.EFadeInScreenShowType.Black,
    o,
  ) {
    if (!this.ipi) {
      this.ipi = !0;
      var _ = Global_1.Global.CharacterCameraManager;
      if (i)
        switch (i) {
          case IAction_1.EFadeInScreenShowType.White:
            _.FadeColor = this.kti;
            break;
          case IAction_1.EFadeInScreenShowType.Black:
            _.FadeColor = this.opi;
        }
      BlackScreenFadeController_1.BlackScreenFadeController.ChangeColor(i),
        this.spi(e, a, r, t).finally(o);
    }
  }
  npi(e = 1, a) {
    this.api(e).finally(() => {
      (this.ipi = !1), a?.();
    });
  }
  async spi(e, a = !1, r = !0, t = void 0) {
    BlackScreenFadeController_1.BlackScreenFadeController.AddFadeBlackScreen(
      e,
      a,
      r,
      t,
      "CameraFadeLoading:FadeIn",
    ),
      await ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise
        ?.Promise;
  }
  async api(e) {
    BlackScreenFadeController_1.BlackScreenFadeController.RemoveFadeBlackScreen(
      e,
      "CameraFadeLoading:FadeOut",
    ),
      await ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise
        ?.Promise;
  }
  ColorSearch() {
    return 0.5 <= Global_1.Global.CharacterCameraManager.FadeColor.R &&
      0.5 <= Global_1.Global.CharacterCameraManager.FadeColor.G &&
      0.5 <= Global_1.Global.CharacterCameraManager.FadeColor.B
      ? IAction_1.EFadeInScreenShowType.White
      : IAction_1.EFadeInScreenShowType.Black;
  }
  SetColor(e) {
    if (!this.IsInFade()) return !1;
    var a = Global_1.Global.CharacterCameraManager;
    if (e)
      switch (e) {
        case IAction_1.EFadeInScreenShowType.White:
          a.FadeColor = this.kti;
          break;
        case IAction_1.EFadeInScreenShowType.Black:
          a.FadeColor = this.opi;
      }
    return (
      BlackScreenFadeController_1.BlackScreenFadeController.ChangeColor(e), !0
    );
  }
}
exports.CameraFadeLoading = CameraFadeLoading;
//# sourceMappingURL=CameraFadeLoading.js.map
