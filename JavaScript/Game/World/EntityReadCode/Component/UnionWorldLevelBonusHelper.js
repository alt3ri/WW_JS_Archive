"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionWorldLevelBonusHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAreaBouns_1 = require("./FbAreaBouns"),
  FbWorldLevelTable_1 = require("./FbWorldLevelTable");
class UnionWorldLevelBonusHelper {
  static GetUnionWorldLevelBonusObject(e) {
    switch (e) {
      case fb_component_1.UnionWorldLevelBonus.AreaBouns:
        return new fb_component_1.AreaBouns();
      case fb_component_1.UnionWorldLevelBonus.WorldLevelTable:
        return new fb_component_1.WorldLevelTable();
      default:
        return;
    }
  }
  static ReadUnionWorldLevelBonus(e, o) {
    if (void 0 !== o)
      switch (e) {
        case fb_component_1.UnionWorldLevelBonus.AreaBouns:
          return FbAreaBouns_1.FbAreaBouns.Create(o);
        case fb_component_1.UnionWorldLevelBonus.WorldLevelTable:
          return FbWorldLevelTable_1.FbWorldLevelTable.Create(o);
        default:
          return;
      }
  }
}
exports.UnionWorldLevelBonusHelper = UnionWorldLevelBonusHelper;
//# sourceMappingURL=UnionWorldLevelBonusHelper.js.map
