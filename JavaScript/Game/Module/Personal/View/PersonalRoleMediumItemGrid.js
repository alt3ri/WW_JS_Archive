"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleMediumItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class PersonalRoleMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.dFe = 0), (this.GirdIndex = 0);
  }
  OnRefresh(e, t, o) {
    (this.dFe = e), (this.GirdIndex = o);
    (o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe)),
      (e = {
        Type: 2,
        Data: e,
        ItemConfigId: e,
        SkinId: o.GetRoleSkinId(),
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [o.GetLevelData().GetLevel()],
      });
    this.Apply(e);
  }
}
exports.PersonalRoleMediumItemGrid = PersonalRoleMediumItemGrid;
//# sourceMappingURL=PersonalRoleMediumItemGrid.js.map
