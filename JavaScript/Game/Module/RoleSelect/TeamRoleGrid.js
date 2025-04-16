"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamRoleGrid = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  RoguelikeSelectRoleView_1 = require("../Roguelike/View/RoguelikeSelectRoleView");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.IsHighlightIndex = void 0);
  }
  OnRefresh(e, o, a) {
    var r = e.GetLevelData(),
      l = e.GetDataId(),
      i = ModelManager_1.ModelManager.EditFormationModel,
      t = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(l);
    let d = !1;
    var M = e.IsTrialRole(),
      i =
        (M ||
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
          ModelManager_1.ModelManager.MowingTowerModel.IsOpenMowingTowerFormation() ||
          (d = i.IsRoleDead(l)),
        this.IsHighlightIndex?.(t));
    let n = !1;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId &&
      ((s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .SelectInstanceId,
      ).RecommendRole),
      (n = s.includes(e.GetRoleId())));
    var s =
        ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(
          l ?? -1,
        )
          ? {
              BelongTo:
                1 -
                ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea,
            }
          : void 0,
      M = {
        Type: 2,
        ItemConfigId: l,
        SkinId: e.GetRoleSkinId(),
        IsTrialRoleVisible: M,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [r.GetLevel()],
        Index: 0 < t ? t : void 0,
        HighlightIndex: i,
        ElementId: e.GetRoleConfig().ElementId,
        IsShowCost:
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
        Data: e,
        IsDisable: d,
        IsRecommendVisible: n,
        HalfAreaInfo: s,
        IsShowWeeklyRogueTag:
          ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() &&
          ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(l),
      },
      t =
        (this.Apply(M),
        e.IsTrialRole()
          ? this.SetLevelAndLock()
          : ((r =
              !e ||
              !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(
                l,
              )),
            this.SetLevelAndLock(void 0, r)),
        e.GetLevelData().GetLevel() <
          ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0]),
      i =
        (-1 !== ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0] &&
          t &&
          this.SetAddLevelComponent(
            ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0],
            t,
          ),
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(l));
    this.SetSelected(i, !0);
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
  SetAddLevelComponent(e, o) {
    var a = this.Data.GetLevelData().GetLevel(),
      a = Math.max(a, e),
      e = this.RefreshComponent(
        RoguelikeSelectRoleView_1.RogueAddLevelComponent,
        !0,
        a,
      );
    this.SetComponentVisible(e, o), a && this.SetBottomTextVisible(!1);
  }
}
exports.TeamRoleGrid = TeamRoleGrid;
//# sourceMappingURL=TeamRoleGrid.js.map
