"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerRoleGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ShipTowerRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.IsHighlightIndex = void 0);
  }
  OnRefresh(e, o, t) {
    var r = e.GetLevelData(),
      i = e.GetDataId(),
      r = {
        Type: 2,
        ItemConfigId: i,
        SkinId: e.GetRoleSkinId(),
        IsTrialRoleVisible: e.IsTrialRole(),
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [r.GetLevel()],
        ElementId: e.GetRoleConfig().ElementId,
        IsShowCost: !1,
        Data: e,
        IsRecommendVisible: !1,
        HalfAreaInfo:
          ModelManager_1.ModelManager.ShipTowerModel.GetAllTeamRoleData(i),
      },
      e =
        (this.Apply(r),
        e.IsTrialRole()
          ? this.SetLevelAndLock()
          : ((r =
              !e ||
              !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(
                i,
              )),
            this.SetLevelAndLock(void 0, r)),
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(i));
    this.SetSelected(e, !0);
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
exports.ShipTowerRoleGrid = ShipTowerRoleGrid;
//# sourceMappingURL=ShipTowerRoleGrid.js.map
