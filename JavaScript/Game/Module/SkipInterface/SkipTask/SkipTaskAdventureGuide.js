"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskAdventureGuide = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskAdventureGuide extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var a = r;
    UiManager_1.UiManager.IsViewShow("AdventureGuideView") &&
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName === a
      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "IsInView",
        ),
        this.Finish())
      : ((e = Number(e)),
        "NewSoundAreaView" !== r ||
        ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(
          e,
        )
          ? (ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
              a,
              e,
              (e, r) => {
                this.Finish();
              },
            ),
            UiManager_1.UiManager.IsViewShow("AdventureGuideView") &&
              this.Finish())
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "NotOpen",
            ));
  }
}
exports.SkipTaskAdventureGuide = SkipTaskAdventureGuide;
//# sourceMappingURL=SkipTaskAdventureGuide.js.map
