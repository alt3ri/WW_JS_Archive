"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamRoleGrid = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.IsHighlightIndex = void 0), (this.GZa = !1);
  }
  OnRefresh(e, o, r) {
    var t = e.GetLevelData(),
      a = e.GetDataId(),
      i = ModelManager_1.ModelManager.EditFormationModel,
      d = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(a);
    let l = !1;
    var s = e.IsTrialRole(),
      i =
        (s ||
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
          (l = i.IsRoleDead(a)),
        this.IsHighlightIndex?.(d));
    let n = !1;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId &&
      ((M = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .SelectInstanceId,
      ).RecommendRole),
      (n = M.includes(e.GetRoleId())));
    var M = {
        Type: 2,
        ItemConfigId: a,
        IsTrialRoleVisible: s,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [t.GetLevel()],
        Index: 0 < d ? d : void 0,
        HighlightIndex: i,
        ElementId: e.GetRoleConfig().ElementId,
        IsShowCost:
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
        Data: e,
        IsDisable: l && !this.GZa,
        IsRecommendVisible: n,
      },
      t =
        (this.Apply(M),
        e.IsTrialRole()
          ? this.SetLevelAndLock()
          : ((s =
              !e ||
              !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(
                a,
              )),
            this.SetLevelAndLock(void 0, s)),
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(a));
    this.SetSelected(t, !0);
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
  SetHideGrayIcon(e) {
    this.GZa = e;
  }
}
exports.TeamRoleGrid = TeamRoleGrid;
//# sourceMappingURL=TeamRoleGrid.js.map
