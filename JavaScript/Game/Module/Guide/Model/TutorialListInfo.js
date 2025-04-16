"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TutorialListInfo = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TutorialDefine_1 = require("../../Tutorial/TutorialDefine");
class TutorialListInfo {
  constructor(i) {
    (this.OwnerStep = void 0),
      (this.GuideId = 0),
      (this.TipState = 0),
      (this.Duration = 0),
      (this.TutorialTip = !1),
      (this.OwnerStep = i);
  }
  get IsOverrideGuideTutorialView() {
    var i = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
      this.GuideId,
    );
    return (
      void 0 !== i &&
      i.TutorialType === TutorialDefine_1.ETutorialType.BuffOnEnemy
    );
  }
  Init() {
    (this.GuideId = this.OwnerStep.Id),
      ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
        this.OwnerStep.Id,
      )?.TutorialTip
        ? ((this.TipState = 0),
          (this.TutorialTip = !0),
          (this.Duration = this.OwnerStep.Config.Duration))
        : ((this.TipState = 2), (this.TutorialTip = !1));
  }
  StopGuide() {
    this.OwnerStep &&
      (this.OwnerStep.SwitchState(4), (this.OwnerStep = void 0));
  }
  Tick(i) {
    return (
      1 === this.TipState &&
      ((this.Duration -= i), this.Duration <= 0) &&
      (this.StopGuide(), !0)
    );
  }
  ClickToPopState() {
    2 !== this.TipState &&
      0 < this.Duration &&
      ((this.TipState = 2),
      this.StopGuide(),
      ModelManager_1.ModelManager.GuideModel.TryPauseTimer());
  }
}
exports.TutorialListInfo = TutorialListInfo;
//# sourceMappingURL=TutorialListInfo.js.map
