"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetPlotMode = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  FlowNetworks_1 = require("../Flow/FlowNetworks"),
  PlotController_1 = require("../PlotController"),
  FlowActionBase_1 = require("./FlowActionBase"),
  GUARANTEED_WAIT_TIME = 3e3,
  DEFAULT_FADE_DURATION = 0.5,
  SAFE_DISTANCE_SQAURED = 3e3;
class FlowActionSetPlotMode extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.Y$i = !1),
      (this.J$i = void 0),
      (this.z$i = -1),
      (this.Z$i = 0),
      (this.eYi = void 0),
      (this.d9s = void 0),
      (this.tYi = (e) => {
        ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning &&
        this.Z$i < GUARANTEED_WAIT_TIME
          ? (this.Z$i += e)
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 27, "C级剧情等待交互转身-结束", [
                "waitTime",
                this.Z$i,
              ]),
            ControllerHolder_1.ControllerHolder.PlotController.RemoveTick(
              this.z$i,
            ),
            (this.Z$i = 0),
            (this.z$i = -1),
            this.J$i.SetResult(),
            (this.J$i = void 0));
      }),
      (this.Ilt = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "剧情前保底传送 -结束");
        var e = this.d9s;
        (this.d9s = void 0), e.SetResult();
      });
  }
  OnExecute() {
    this.Y$i = this.Context.HasAdjustCamera;
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(e),
      ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig(this.Y$i),
      (this.eYi = e.FastFadeIn),
      (this.Context.IsWaitRenderData = !e.NoUiEnterAnimation),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Plot",
          27,
          "SetPlotMode",
          ["Level", e.Mode],
          ["ChangeRole", e.IsSwitchMainRole],
          ["DisableAutoFadeOut", e.DisableAutoFadeOut],
        ),
      this.Context?.UiParam?.ViewName &&
      !UiManager_1.UiManager.IsViewShow(this.Context.UiParam.ViewName)
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "剧情界面所依赖的界面未打开，本段剧情跳过",
              ["ViewName", this.Context.UiParam.ViewName],
            ),
          (this.Context.IsBackground = !0),
          this.FinishExecute(!0))
        : Promise.all([
            this.iYi(),
            this.oYi(),
            this.rYi(),
            this.nYi(),
            this.C9s(),
          ]).finally(() => {
            this.FinishExecute(!0);
          });
  }
  async iYi() {
    ModelManager_1.ModelManager.PlotModel.PlotConfig.ShouldSwitchMainRole &&
      (await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
        ?.Promise);
  }
  async oYi() {
    const t = new CustomPromise_1.CustomPromise();
    PlotController_1.PlotController.OpenCurrentPlotView((e) => {
      e ||
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "剧情打开界面失败",
        ),
        t.SetResult();
    }, this.Context.UiParam),
      await t.Promise;
  }
  async nYi() {
    this.eYi &&
      ((ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
        0,
        3,
        void 0 !== this.eYi?.Ease?.Duration
          ? this.eYi.Ease.Duration
          : DEFAULT_FADE_DURATION,
        this.eYi.ScreenType,
      ));
  }
  async rYi() {
    "LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
      ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "C级剧情等待交互转身-开始"),
      (this.J$i = new CustomPromise_1.CustomPromise()),
      (this.Z$i = 0),
      (this.z$i = ControllerHolder_1.ControllerHolder.PlotController.AddTick(
        this.tYi,
      )),
      await this.J$i.Promise);
  }
  async C9s() {
    var e,
      t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy;
    this.Context?.Pos
      ? ((e = Vector_1.Vector.Dist(t, this.Context.Pos)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "剧情坐标检查",
            ["dist", e],
            ["cur", t],
            ["target", this.Context.Pos],
          ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "剧情前保底传送 -开始"),
        e > SAFE_DISTANCE_SQAURED &&
          ((this.d9s = new CustomPromise_1.CustomPromise()),
          FlowNetworks_1.FlowNetworks.RequestSafeTeleport(
            this.Context.FlowIncId,
            (e) => {
              e
                ? EventSystem_1.EventSystem.Once(
                    EventDefine_1.EEventName.TeleportComplete,
                    this.Ilt,
                  )
                : this.d9s.SetResult();
            },
          ),
          await this.d9s.Promise))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "无剧情保底坐标点", ["curPos", t]);
  }
  OnInterruptExecute() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.TeleportComplete,
      this.Ilt,
    ) &&
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      this.Ilt());
  }
  OnBackgroundExecute() {
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(e),
      ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig(this.Y$i),
      (ModelManager_1.ModelManager.PlotModel.IsFadeIn =
        void 0 !== e.FastFadeIn),
      this.FinishExecute(!0);
  }
}
exports.FlowActionSetPlotMode = FlowActionSetPlotMode;
//# sourceMappingURL=FlowActionSetPlotMode.js.map
