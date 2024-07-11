"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionPlaySequenceData = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TeleportController_1 = require("../../Teleport/TeleportController");
const PlotController_1 = require("../PlotController");
const SequenceController_1 = require("../Sequence/SequenceController");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionPlaySequenceData extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.ZPt = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "PlaySequenceData Seq开始播放允许跳过"),
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0);
      }),
      (this.Mxe = () => {
        ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.PlotSequencePlay,
            this.ZPt,
          ) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.PlotSequencePlay,
              this.ZPt,
            ),
          this.FinishExecute(!0);
      });
  }
  OnExecute() {
    const e = this.ActionInfo.Params;
    StringUtils_1.StringUtils.IsEmpty(e.Path)
      ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "SequenceData路径为空",
        ),
        this.FinishExecute(!0))
      : (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA"
          ? (ModelManager_1.ModelManager.SequenceModel.Type = 0)
          : ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ===
              "LevelB" && (ModelManager_1.ModelManager.SequenceModel.Type = 1),
        EventSystem_1.EventSystem.Once(
          EventDefine_1.EEventName.PlotSequencePlay,
          this.ZPt,
        ),
        SequenceController_1.SequenceController.Play(
          e,
          [],
          this.Mxe,
          !0,
          !0,
          this.Context.IsWaitRenderData,
          1,
        ));
  }
  OnInterruptExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.PlotSequencePlay,
        this.ZPt,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotSequencePlay,
          this.ZPt,
        ),
      this.$Xi().finally(() => {
        this.FinishExecute(!0);
      });
  }
  async $Xi() {
    var e = ModelManager_1.ModelManager.SequenceModel.IsFadeEnd.length - 1;
    var e =
      ((ModelManager_1.ModelManager.PlotModel.IsFadeIn =
        e >= 0 && ModelManager_1.ModelManager.SequenceModel.IsFadeEnd[e]),
      ModelManager_1.ModelManager.SequenceModel.CurFinalPos.length - 1);
    var e =
      e >= 0
        ? ModelManager_1.ModelManager.SequenceModel.CurFinalPos[e]
        : void 0;
    SequenceController_1.SequenceController.ManualFinish(),
      await PlotController_1.PlotController.CheckFormation(),
      e &&
        (await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
          e.GetLocation().ToUeVector(),
          e.GetRotation().Rotator().ToUeRotator(),
          "FlowActionPlaySequenceData.OnInterruptExecute",
        ));
  }
}
exports.FlowActionPlaySequenceData = FlowActionPlaySequenceData;
// # sourceMappingURL=FlowActionPlaySequenceData.js.map
