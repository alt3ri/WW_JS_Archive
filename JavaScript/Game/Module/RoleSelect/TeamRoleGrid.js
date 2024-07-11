"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamRoleGrid = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.IsHighlightIndex = void 0);
  }
  OnRefresh(e, o, r) {
    var a = e.GetLevelData(),
      t = e.GetDataId(),
      i = ModelManager_1.ModelManager.EditFormationModel,
      d = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(t);
    let l = !1;
    var n = e.IsTrialRole(),
      i =
        (n ||
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
          (l = i.IsRoleDead(t)),
        this.IsHighlightIndex?.(d));
    let s = !1;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId &&
      ((M = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .SelectInstanceId,
      ).RecommendRole),
      (s = M.includes(e.GetRoleId())));
    var M = {
      Type: 2,
      ItemConfigId: t,
      IsTrialRoleVisible: n,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [a.GetLevel()],
      Index: 0 < d ? d : void 0,
      HighlightIndex: i,
      ElementId: e.GetRoleConfig().ElementId,
      IsShowCost: ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      Data: e,
      IsDisable: l,
      IsRecommendVisible: s,
    };
    this.Apply(M),
      e.IsTrialRole()
        ? this.SetLevelAndLock()
        : ((n =
            !e ||
            !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(
              t,
            )),
          this.SetLevelAndLock(void 0, n));
  }
  OnForceSelected() {
    this.SetSelected(!0, !0);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.TeamRoleGrid = TeamRoleGrid;
//# sourceMappingURL=TeamRoleGrid.js.map
