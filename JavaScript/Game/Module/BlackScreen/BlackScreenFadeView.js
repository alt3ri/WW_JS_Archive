"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenFadeView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const LguiUtil_1 = require("../Util/LguiUtil");
const BlackScreenFadeController_1 = require("./BlackScreenFadeController");
const BlackScreenViewData_1 = require("./BlackScreenViewData");
const GUARANTEED_TIME = 1e4;
const MAX_FADE_VALUE = 0.9;
class BlackScreenFadeView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.zCt = 0),
      (this.ZCt = 0),
      (this.egt = 0),
      (this.a1e = !0),
      (this.tgt = TickSystem_1.TickSystem.InvalidId),
      (this.igt = TickSystem_1.TickSystem.InvalidId),
      (this.ogt = new BlackScreenViewData_1.BlackScreenViewData()),
      (this.rgt = void 0),
      (this.ngt = () => {
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
      (this.sgt = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("BlackScreen", 46, "开始显示黑屏"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBlackFadeScreenStart,
          ),
          this.agt(this.tgt),
          this.SetActive(!0);
      }),
      (this.hgt = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("BlackScreen", 46, "开始隐藏黑屏"),
          this.SetActive(!0),
          this.agt(this.tgt);
      }),
      (this.lgt = (e) => {
        this.ZCt > 0 && (this.ZCt -= e),
          this.ZCt <= 0 &&
            ((this.ZCt = 0),
            this.a1e && (Global_1.Global.CharacterCameraManager.FadeAmount = 0),
            this.ngt(),
            this._gt(this.tgt)),
          this.ugt();
      }),
      (this.cgt = (e) => {
        (this.zCt += e),
          this.zCt > GUARANTEED_TIME &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("BlackScreen", 46, "触发保底机制,内部隐藏黑屏"),
            this.HideItem());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    this.ogt.RegisterStateDelegate(2, this.sgt),
      this.ogt.RegisterStateDelegate(4, this.hgt),
      (this.rgt = this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, !0, !0),
      this.ogt.TriggerCurrentStateDelegate();
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise =
      void 0),
      (ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise =
        void 0),
      (this.a1e = !0),
      (this.egt = 0),
      (this.ZCt = 0),
      (this.rgt = void 0),
      this._gt(this.tgt),
      this._gt(this.igt);
  }
  agt(e) {
    e === TickSystem_1.TickSystem.InvalidId &&
      (e === this.tgt
        ? (InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          (this.tgt = TickSystem_1.TickSystem.Add(
            this.lgt,
            "BlackScreenTransitionView",
            0,
            !0,
          ).Id))
        : e === this.igt &&
          (this.igt = TickSystem_1.TickSystem.Add(
            this.cgt,
            "BlackScreenTransitionView",
            0,
            !0,
          ).Id));
  }
  _gt(e) {
    e !== TickSystem_1.TickSystem.InvalidId &&
      (e === this.tgt
        ? (TickSystem_1.TickSystem.Remove(this.tgt),
          (this.tgt = TickSystem_1.TickSystem.InvalidId),
          this.a1e ||
            InputDistributeController_1.InputDistributeController.RefreshInputTag())
        : e === this.igt &&
          (TickSystem_1.TickSystem.Remove(this.igt),
          (this.igt = TickSystem_1.TickSystem.InvalidId)));
  }
  ShowItem() {
    this.ogt.SwitchState(2);
  }
  HideItem() {
    const e = this.ogt.SwitchState(4);
    (ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise =
      new CustomPromise_1.CustomPromise()),
      e ||
        (ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise(),
        ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise());
  }
  UpdateScreenColor(e) {
    switch (e) {
      case IAction_1.EFadeInScreenShowType.Black:
        this.rgt?.SetColor(ColorUtils_1.ColorUtils.ColorBlack),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("BlackScreen", 46, "改变黑幕颜色为黑色");
        break;
      case IAction_1.EFadeInScreenShowType.White:
        this.rgt?.SetColor(ColorUtils_1.ColorUtils.ColorWhile),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("BlackScreen", 46, "改变黑幕颜色为白色");
    }
  }
  ugt() {
    const e = this.mgt();
    this.rgt?.SetAlpha(e);
  }
  mgt() {
    return this.a1e
      ? Global_1.Global.CharacterCameraManager.FadeAmount >= MAX_FADE_VALUE ||
        this.egt === 0
        ? 1
        : 1 - MathUtils_1.MathUtils.GetRangePct(0, this.egt, this.ZCt)
      : this.egt === 0
        ? 0
        : MathUtils_1.MathUtils.GetRangePct(0, this.egt, this.ZCt);
  }
  SetFadeTime(e) {
    (this.ZCt = e),
      (this.egt = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BlackScreen",
          46,
          "现在的Fade时间为：",
          ["this.FadeTime", this.ZCt],
          ["this.FullFadeTime", this.egt],
        );
  }
  SetIsFadeIn(e) {
    this.a1e = e;
  }
}
exports.BlackScreenFadeView = BlackScreenFadeView;
// # sourceMappingURL=BlackScreenFadeView.js.map
