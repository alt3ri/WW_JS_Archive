"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenFadeView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../Ui/UiManager"),
  ColorUtils_1 = require("../../Utils/ColorUtils"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  BlackScreenFadeController_1 = require("./BlackScreenFadeController"),
  BlackScreenViewData_1 = require("./BlackScreenViewData"),
  GUARANTEED_TIME = 1e4,
  MAX_FADE_VALUE = 0.9;
class BlackScreenFadeView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this._0t = 0),
      (this.u0t = 0),
      (this.c0t = 0),
      (this.a1e = !0),
      (this.m0t = TickSystem_1.TickSystem.InvalidId),
      (this.d0t = TickSystem_1.TickSystem.InvalidId),
      (this.C0t = new BlackScreenViewData_1.BlackScreenViewData()),
      (this.g0t = void 0),
      (this.f0t = () => {
        this.a1e
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 46, "黑幕FadeIn结束"),
            ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise())
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 46, "黑幕FadeOut结束"),
            ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise(),
            this.SetActive(!1),
            (BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis =
              !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnBlackFadeScreenFinish,
            ),
            ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 46, "黑幕输入恢复", [
                "BlackScreenFadeController.NeedInputDis",
                BlackScreenFadeController_1.BlackScreenFadeController
                  .NeedInputDis,
              ]),
            UiManager_1.UiManager.RemoveOpenViewCheckFunction(
              "All",
              BlackScreenFadeController_1.BlackScreenFadeController
                .CheckCanOpen,
            ));
      }),
      (this.p0t = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("BlackScreen", 46, "开始显示黑屏"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBlackFadeScreenStart,
          ),
          this.v0t(this.m0t),
          this.SetActive(!0);
      }),
      (this.M0t = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("BlackScreen", 46, "开始隐藏黑屏"),
          this.SetActive(!0),
          this.v0t(this.m0t);
      }),
      (this.E0t = (e) => {
        0 < this.u0t && (this.u0t -= e),
          this.u0t <= 0 &&
            ((this.u0t = 0),
            this.a1e && (Global_1.Global.CharacterCameraManager.FadeAmount = 0),
            this.f0t(),
            this.S0t(this.m0t)),
          this.y0t();
      }),
      (this.I0t = (e) => {
        (this._0t += e),
          this._0t > GUARANTEED_TIME &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("BlackScreen", 46, "触发保底机制,内部隐藏黑屏"),
            this.HideItem());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    this.C0t.RegisterStateDelegate(2, this.p0t),
      this.C0t.RegisterStateDelegate(4, this.M0t),
      (this.g0t = this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, !0, !0),
      this.C0t.TriggerCurrentStateDelegate();
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise =
      void 0),
      (ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise =
        void 0),
      (this.a1e = !0),
      (this.c0t = 0),
      (this.u0t = 0),
      (this.g0t = void 0),
      this.S0t(this.m0t),
      this.S0t(this.d0t);
  }
  v0t(e) {
    e === TickSystem_1.TickSystem.InvalidId &&
      (e === this.m0t
        ? (InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          (this.m0t = TickSystem_1.TickSystem.Add(
            this.E0t,
            "BlackScreenTransitionView",
            0,
            !0,
          ).Id))
        : e === this.d0t &&
          (this.d0t = TickSystem_1.TickSystem.Add(
            this.I0t,
            "BlackScreenTransitionView",
            0,
            !0,
          ).Id));
  }
  S0t(e) {
    e !== TickSystem_1.TickSystem.InvalidId &&
      (e === this.m0t
        ? (TickSystem_1.TickSystem.Remove(this.m0t),
          (this.m0t = TickSystem_1.TickSystem.InvalidId),
          this.a1e ||
            InputDistributeController_1.InputDistributeController.RefreshInputTag())
        : e === this.d0t &&
          (TickSystem_1.TickSystem.Remove(this.d0t),
          (this.d0t = TickSystem_1.TickSystem.InvalidId)));
  }
  ShowItem() {
    this.C0t.SwitchState(2);
  }
  HideItem() {
    var e = this.C0t.SwitchState(4);
    (ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise =
      new CustomPromise_1.CustomPromise()),
      e ||
        (ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise(),
        ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise());
  }
  UpdateScreenColor(e) {
    switch (e) {
      case IAction_1.EFadeInScreenShowType.Black:
        this.g0t?.SetColor(ColorUtils_1.ColorUtils.ColorBlack),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("BlackScreen", 46, "改变黑幕颜色为黑色");
        break;
      case IAction_1.EFadeInScreenShowType.White:
        this.g0t?.SetColor(ColorUtils_1.ColorUtils.ColorWhile),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("BlackScreen", 46, "改变黑幕颜色为白色");
    }
  }
  y0t() {
    var e = this.T0t();
    this.g0t?.SetAlpha(e);
  }
  T0t() {
    return this.a1e
      ? Global_1.Global.CharacterCameraManager.FadeAmount >= MAX_FADE_VALUE ||
        0 === this.c0t
        ? 1
        : 1 - MathUtils_1.MathUtils.GetRangePct(0, this.c0t, this.u0t)
      : 0 === this.c0t
        ? 0
        : MathUtils_1.MathUtils.GetRangePct(0, this.c0t, this.u0t);
  }
  SetFadeTime(e) {
    (this.u0t = e),
      (this.c0t = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BlackScreen",
          46,
          "现在的Fade时间为：",
          ["this.FadeTime", this.u0t],
          ["this.FullFadeTime", this.c0t],
        );
  }
  SetIsFadeIn(e) {
    this.a1e = e;
  }
}
exports.BlackScreenFadeView = BlackScreenFadeView;
//# sourceMappingURL=BlackScreenFadeView.js.map
