"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreeStepWithStatus = void 0);
const ue_1 = require("ue"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController"),
  TreeStepBase_1 = require("./TreeStepBase");
class TreeStepWithStatus extends TreeStepBase_1.TreeStepBase {
  constructor() {
    super(...arguments),
      (this.StepStatusNode = void 0),
      (this.StepSuccess = void 0),
      (this.StepLose = void 0),
      (this.UpdateDescribeSuccess = !1),
      (this.UpdateStatusSuccess = !1);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push(
        [2, ue_1.UISprite],
        [3, ue_1.UISprite],
        [4, ue_1.UISprite],
      );
  }
  OnStart() {
    super.OnStart(),
      (this.StepStatusNode = this.GetSprite(4)),
      (this.StepSuccess = this.GetSprite(2)),
      (this.StepLose = this.GetSprite(3));
  }
  UpdateStepInfo() {
    return (
      (this.UpdateDescribeSuccess = super.UpdateStepInfo()),
      (this.UpdateStatusSuccess = this.UpdateStepStatusNode()),
      this.UpdateDescribeSuccess && this.UpdateStatusSuccess
    );
  }
  UpdateStepStatusNode() {
    var e = this.IsShowNodeStatus();
    return this.Config && e
      ? (this.StepStatusNode.SetUIActive(!0),
        !!this.k$t() || (this.F$t(!1), this.V$t(!1), !1))
      : (this.StepStatusNode.SetUIActive(!1), !1);
  }
  k$t() {
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
      this.TreeIncId,
    );
    if (!e) return !1;
    var t = this.Config.QuestScheduleType;
    switch (t.Type) {
      case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
        var r = e.GetNode(t.ChildQuestId);
        if (!r || r.IsProcessing) return !1;
        this.F$t(r.IsSuccess), this.V$t(r.IsFailure);
        break;
      case IQuest_1.EQuestScheduleType.TimeLeft:
        (r = t.TimerType), (r = e.GetChallengeRemainTime(r));
        if (!r) return !0;
        var s = t.TimeLeft;
        this.F$t(s <= r), this.V$t(r < s);
        break;
      case IQuest_1.EQuestScheduleType.Condition:
        r = t.Condition;
        if (!r) return !1;
        (s = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
          e.BtType,
          e.TreeIncId,
          e.TreeConfigId,
          void 0,
          void 0,
        )),
          (r =
            ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
              r,
              void 0,
              s,
            ));
        this.F$t(r), this.V$t(!r);
    }
    return !0;
  }
  F$t(e) {
    (this.StepSuccess.IsUIActiveSelf() && 1 === this.StepSuccess.Alpha) !== e &&
      (this.StepSuccess.SetUIActive(e), this.OnSuccessNodeActive(e));
  }
  V$t(e) {
    this.StepLose.IsUIActiveSelf() !== e &&
      (this.StepLose.SetUIActive(e), this.OnLoseNodeActive(e));
  }
  IsShowNodeStatus() {
    return GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeStatus(
      this.Config,
    );
  }
  OnSuccessNodeActive(e) {}
  OnLoseNodeActive(e) {}
}
exports.TreeStepWithStatus = TreeStepWithStatus;
//# sourceMappingURL=TreeStepWithStatus.js.map
