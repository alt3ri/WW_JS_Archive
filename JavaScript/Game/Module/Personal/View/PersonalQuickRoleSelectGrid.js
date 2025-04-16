"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalQuickRoleSelectGrid = void 0);
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TeamRoleGrid_1 = require("../../RoleSelect/TeamRoleGrid");
class PersonalQuickRoleSelectGrid extends TeamRoleGrid_1.TeamRoleGrid {
  OnRefresh(e, o, a) {
    var r = e.GetLevelData(),
      t = e.GetDataId(),
      l = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(t),
      i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleOriginalSkinData(t),
      d = this.IsHighlightIndex?.(l),
      i = {
        Type: 2,
        ItemConfigId: t,
        SkinId: i.GetItemId(),
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [r.GetLevel()],
        Index: 0 < l ? l : void 0,
        HighlightIndex: d,
        ElementId: e.GetRoleConfig().ElementId,
        Data: e,
        IsNewVisible: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem,
          t,
        ),
      },
      r =
        (this.Apply(i),
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(t));
    this.SetSelected(r, !0);
  }
}
exports.PersonalQuickRoleSelectGrid = PersonalQuickRoleSelectGrid;
//# sourceMappingURL=PersonalQuickRoleSelectGrid.js.map
