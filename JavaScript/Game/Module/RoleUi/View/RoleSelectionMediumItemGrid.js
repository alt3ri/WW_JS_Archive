"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSelectionMediumItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  RoleDataBase_1 = require("../RoleData/RoleDataBase");
class RoleSelectionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, t, o) {
    var i = e.GetDataId(),
      i =
        void 0 !==
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
          ParamType: 0,
        }),
      i = {
        Type: 2,
        Data: e,
        ItemConfigId: e.GetRoleId(),
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [e.GetLevelData().GetLevel()],
        IsInTeam: i,
        ElementId: e.GetRoleConfig().ElementId,
        IsTrialRoleVisible: e.IsTrialRole(),
        IsNewVisible: e.GetIsNew(),
      };
    this.Apply(i), this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(!0),
      this.SetNewVisible(!1),
      this.Data instanceof RoleDataBase_1.RoleDataBase &&
        this.Data.TryRemoveNewFlag();
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0);
  }
}
exports.RoleSelectionMediumItemGrid = RoleSelectionMediumItemGrid;
//# sourceMappingURL=RoleSelectionMediumItemGrid.js.map
