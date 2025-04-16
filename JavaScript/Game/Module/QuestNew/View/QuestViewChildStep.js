"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestViewChildStep = void 0);
const ue_1 = require("ue"),
  StepWithStatusItem_1 = require("../../BattleUi/Views/MissionView/TreeStep/StepWithStatusItem");
class QuestViewChildStep extends StepWithStatusItem_1.StepWithStatusItem {
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([5, ue_1.UISprite]);
  }
  OnStart() {
    super.OnStart();
  }
  UpdateStepInfo() {
    super.UpdateStepInfo(),
      this.GetSprite(5)?.SetUIActive(
        !this.IsDescribeTextVisible || !this.StatusNodeVisible,
      );
  }
  CheckCanShowStatusRoot() {
    return !0;
  }
}
exports.QuestViewChildStep = QuestViewChildStep;
//# sourceMappingURL=QuestViewChildStep.js.map
