"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskTrackNewSoundArea = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GuideView_1 = require("../../AdventureGuide/Views/GuideView"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskTrackNewSoundArea extends SkipTask_1.SkipTask {
  OnRun(e) {
    var r,
      a = "NewSoundAreaView";
    UiManager_1.UiManager.IsViewShow("AdventureGuideView") &&
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName === a
      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "IsInView",
        ),
        this.Finish())
      : ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(
            22,
          )
        ? (((r = new GuideView_1.AdventureGuideViewOpenData()).OpenTabViewName =
            a),
          (a = Number(e)),
          (e =
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(
              a,
            )),
          (r.OpenParam = e.Secondary),
          (r.NewSoundDetectTracingIdList = [a]),
          ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideViewWithOpenData(
            r,
            (e, r) => {
              this.Finish();
            },
          ),
          UiManager_1.UiManager.IsViewShow("AdventureGuideView") &&
            this.Finish())
        : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "NotOpen",
          );
  }
}
exports.SkipTaskTrackNewSoundArea = SkipTaskTrackNewSoundArea;
//# sourceMappingURL=SkipTaskTrackNewSoundArea.js.map
