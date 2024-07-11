"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const CreateCharacterController_1 = require("../CreateCharacter/CreateCharacterController");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil");
const PlotController_1 = require("../Plot/PlotController");
const SequenceController_1 = require("../Plot/Sequence/SequenceController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const FRAME_PER_SECOND = 30;
class PlotBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static IsInSequence() {
    return (
      ModelManager_1.ModelManager.PlotModel.IsInPlot &&
      (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ===
        "LevelA" ||
        ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB")
    );
  }
  static SkipCurrentSequence() {}
  static PauseSequence() {}
  static ResumeSequence() {}
  static UseEnterMoveMode(e) {}
  static StartPlotTs(e) {
    ModelManager_1.ModelManager.PlotModel.IsInPlot &&
    ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD"
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 18, "当前正在播放其他剧情，不允许打断")
      : ControllerHolder_1.ControllerHolder.FlowController.StartFlowByRes(e);
  }
  static IsInPerformingPlot() {
    return (
      !!ModelManager_1.ModelManager.PlotModel &&
      (ModelManager_1.ModelManager.PlotModel.IsInInteraction ||
        (ModelManager_1.ModelManager.PlotModel.IsInPlot &&
          ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !==
            "LevelD"))
    );
  }
  static TriggerBlackSequence() {
    PlotController_1.PlotController.TriggerBlackSequence();
  }
  static ChangePlotWeather(e, r, t) {
    PlotController_1.PlotController.ChangeWeather(e, r, t);
  }
  static ChangePlotTimeOfDay(e, r, t, o) {
    PlotController_1.PlotController.ChangePlotTimeOfDay(
      e,
      r,
      t,
      o / FRAME_PER_SECOND,
    );
  }
  static ExecuteSequenceEvents(e) {
    SequenceController_1.SequenceController.RunSequenceFrameEvents(e);
  }
  static TriggerCutChange() {
    SequenceController_1.SequenceController.TriggerCutChange();
  }
  static OpenChapterUi(e, r) {
    GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenChapterViewV2(e, r, !0);
  }
  static ShowLogo(e) {
    SequenceController_1.SequenceController.ShowLogo(e);
  }
  static ShowNameInput() {
    CreateCharacterController_1.CreateCharacterController.TriggerInputName();
  }
  static AddBurstEyeRenderingMaterial(e) {
    CreateCharacterController_1.CreateCharacterController.AddBurstEyeRenderingMaterial(
      e,
    );
  }
  static RemoveBurstEyeRenderingMaterial(e) {
    CreateCharacterController_1.CreateCharacterController.RemoveBurstEyeRenderingMaterial(
      e,
    );
  }
}
exports.default = PlotBlueprintFunctionLibrary;
// # sourceMappingURL=PlotBlueprintFunctionLibrary.js.map
