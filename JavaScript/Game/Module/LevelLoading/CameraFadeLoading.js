"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraFadeLoading = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController");
const INTERLUDE_FADE_IN_TIME = 1;
const INTERLUDE_FADE_OUT_TIME = 1;
const INTERLUDE_LIMIT_TIME = 30;
class CameraFadeLoading {
  constructor() {
    (this.ifi = !1),
      (this.ofi = new UE.LinearColor(0, 0, 0, 1)),
      (this.kei = new UE.LinearColor(1, 1, 1, 1));
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
    this.rfi(e * TimeUtil_1.TimeUtil.InverseMillisecond, a, r, t, i, o);
  }
  ExitInterlude(e = INTERLUDE_FADE_OUT_TIME, a) {
    e = MathUtils_1.MathUtils.Clamp(e, 0, INTERLUDE_LIMIT_TIME);
    this.nfi(e * TimeUtil_1.TimeUtil.InverseMillisecond, a);
  }
  IsInFade() {
    return this.ifi;
  }
  IsInFadeOut() {
    return (
      void 0 !==
      ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise
    );
  }
  rfi(
    e = 1,
    a = !1,
    r = !0,
    t = void 0,
    i = IAction_1.EFadeInScreenShowType.Black,
    o,
  ) {
    if (!this.ifi) {
      this.ifi = !0;
      const _ = Global_1.Global.CharacterCameraManager;
      if (i)
        switch (i) {
          case IAction_1.EFadeInScreenShowType.White:
            _.FadeColor = this.kei;
            break;
          case IAction_1.EFadeInScreenShowType.Black:
            _.FadeColor = this.ofi;
        }
      BlackScreenFadeController_1.BlackScreenFadeController.ChangeColor(i),
        this.sfi(e, a, r, t).finally(o);
    }
  }
  nfi(e = 1, a) {
    this.afi(e).finally(() => {
      (this.ifi = !1), a?.();
    });
  }
  async sfi(e, a = !1, r = !0, t = void 0) {
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
  async afi(e) {
    BlackScreenFadeController_1.BlackScreenFadeController.RemoveFadeBlackScreen(
      e,
      "CameraFadeLoading:FadeOut",
    ),
      await ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise
        ?.Promise;
  }
  ColorSearch() {
    return Global_1.Global.CharacterCameraManager.FadeColor.R >= 0.5 &&
      Global_1.Global.CharacterCameraManager.FadeColor.G >= 0.5 &&
      Global_1.Global.CharacterCameraManager.FadeColor.B >= 0.5
      ? IAction_1.EFadeInScreenShowType.White
      : IAction_1.EFadeInScreenShowType.Black;
  }
  SetColor(e) {
    if (!this.IsInFade()) return !1;
    const a = Global_1.Global.CharacterCameraManager;
    if (e)
      switch (e) {
        case IAction_1.EFadeInScreenShowType.White:
          a.FadeColor = this.kei;
          break;
        case IAction_1.EFadeInScreenShowType.Black:
          a.FadeColor = this.ofi;
      }
    return (
      BlackScreenFadeController_1.BlackScreenFadeController.ChangeColor(e), !0
    );
  }
}
exports.CameraFadeLoading = CameraFadeLoading;
// # sourceMappingURL=CameraFadeLoading.js.map
