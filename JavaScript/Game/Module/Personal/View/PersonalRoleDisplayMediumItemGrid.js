"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleDisplayMediumItemGrid = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class PersonalRoleDisplayMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.RoleId = 0);
  }
  OnRefresh(e, i, o) {
    if (((this.GridIndex = o), e < 0)) {
      const t = { Type: 1 };
      void this.Apply(t);
    } else {
      this.RoleId = e;
      o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      const t = {
        Type: 2,
        Data: e,
        ItemConfigId: e,
        BottomText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Name),
      };
      this.Apply(t);
    }
  }
}
exports.PersonalRoleDisplayMediumItemGrid = PersonalRoleDisplayMediumItemGrid;
//# sourceMappingURL=PersonalRoleDisplayMediumItemGrid.js.map
