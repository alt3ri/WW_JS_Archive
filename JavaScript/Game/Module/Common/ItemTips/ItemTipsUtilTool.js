"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsComponentUtilTool = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ItemTipsDefine_1 = require("./ItemTipsDefine");
class ItemTipsComponentUtilTool {
  static GetTipsDataById(i, t) {
    var o =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        i,
      );
    if (void 0 !== o) {
      let e = ItemTipsComponentUtilTool.dPt.get(o);
      e = e || 0;
      o = ItemTipsComponentUtilTool.CPt[e];
      if (o) return new o(i, t);
    }
  }
}
((exports.ItemTipsComponentUtilTool = ItemTipsComponentUtilTool).CPt = {
  [0]: ItemTipsDefine_1.TipsMaterialData,
  1: ItemTipsDefine_1.TipsWeaponData,
  2: ItemTipsDefine_1.TipsVisionData,
  3: ItemTipsDefine_1.TipsCharacterData,
}),
  (ItemTipsComponentUtilTool.dPt = new Map([
    [3, 2],
    [2, 1],
    [1, 3],
  ]));
//# sourceMappingURL=ItemTipsUtilTool.js.map
