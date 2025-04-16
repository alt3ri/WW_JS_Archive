"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StepWithStatusItem = void 0);
const ue_1 = require("ue"),
  IQuest_1 = require("../../../../../../UniverseEditor/Interface/IQuest"),
  LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GeneralLogicTreeController_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeController"),
  MissionViewStepTextUtil_1 = require("../MissionViewStepTextUtil"),
  StepBaseItem_1 = require("./StepBaseItem");
class StepWithStatusItem extends StepBaseItem_1.StepBaseItem {
  constructor() {
    super(...arguments),
      (this.StepStatusNode = void 0),
      (this.StepSuccess = void 0),
      (this.StepLose = void 0),
      (this.StatusNodeVisible = !1),
      (this.wdc = !1),
      (this.CurrentStatusType = 0);
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
  async OnReset() {
    (this.CurrentStatusType = 0),
      this.Nj_(this.CurrentStatusType, 0),
      await super.OnReset();
  }
  UpdateStepInfo() {
    super.UpdateStepInfo(),
      (this.StatusNodeVisible = this.UpdateStepStatusNode()),
      this.StepStatusNode.SetUIActive(this.StatusNodeVisible);
  }
  async OnConfigRefresh(e, t) {
    await super.OnConfigRefresh(e, t),
      (this.wdc = !0),
      (this.CurrentStatusType = 0),
      this.Nj_(this.CurrentStatusType, 2);
  }
  UpdateStepStatusNode() {
    var e,
      t = this.CheckCanShowStatusRoot();
    return (
      !!t &&
      (this.CheckCanUpdateStatusNode() &&
        ((e = this.Vj_()), this.CurrentStatusType !== e) &&
        ((this.CurrentStatusType = e),
        this.Nj_(this.CurrentStatusType, this.wdc ? 1 : 3),
        (this.wdc = !1)),
      t)
    );
  }
  Nj_(e, t) {
    switch (e) {
      case 0:
        this.FYt(!1), this.VYt(!1);
        break;
      case 1:
        this.FYt(!0), this.VYt(!1);
        break;
      case 2:
        this.FYt(!1), this.VYt(!0);
    }
    this.OnStatusChanged(this.CurrentStatusType, t);
  }
  Vj_() {
    if (this.Config && this.ShowData && 2 !== this.Config.ShowSource) {
      var e, t;
      if (1 === this.Config.ShowSource)
        return (
          (e = this.Config),
          (t = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(
            e.ProgressTargetId,
          )),
          MissionViewStepTextUtil_1.MissionViewStepTextUtil.GetEntrustProgressTotalCount(
            e.ProgressTargetId,
          ) <= t
            ? 1
            : 0
        );
      var s = this.Config.QuestScheduleType;
      switch (s.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          var i =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              this.ShowData.Id,
            );
          return i
            ? !(i = i.GetNode(s.ChildQuestId)) || i.IsProcessing
              ? 0
              : i.IsSuccess
                ? 1
                : 2
            : 0;
        case IQuest_1.EQuestScheduleType.TimeLeft:
          var i =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              this.ShowData.Id,
            );
          return i
            ? ((r = s.TimerType),
              (i = i.GetChallengeRemainTime(r)) ? (s.TimeLeft <= i ? 1 : 2) : 0)
            : 0;
        case IQuest_1.EQuestScheduleType.Condition:
          var r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              this.ShowData.Id,
            );
          return r
            ? (i = s.Condition)
              ? ((r =
                  LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
                    r.BtType,
                    r.TreeIncId,
                    r.TreeConfigId,
                  )),
                ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                  i,
                  void 0,
                  r,
                )
                  ? 1
                  : 2)
              : 0
            : 0;
      }
    }
    return 0;
  }
  FYt(e) {
    (this.StepSuccess.IsUIActiveSelf() && 1 === this.StepSuccess.Alpha) !== e &&
      this.StepSuccess.SetUIActive(e);
  }
  VYt(e) {
    this.StepLose.IsUIActiveSelf() !== e && this.StepLose.SetUIActive(e);
  }
  CheckCanShowStatusRoot() {
    if (this.Config && this.Config.QuestScheduleType)
      switch (this.Config.ShowSource) {
        case 0:
          return GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeStatus(
            this.Config.QuestScheduleType,
          );
        case 1:
          return !0;
      }
    return !1;
  }
  CheckCanUpdateStatusNode() {
    return !0;
  }
  OnStatusChanged(e, t) {}
}
exports.StepWithStatusItem = StepWithStatusItem;
//# sourceMappingURL=StepWithStatusItem.js.map
