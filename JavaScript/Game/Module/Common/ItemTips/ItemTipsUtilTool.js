"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsComponentUtilTool = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ItemTipsDefine_1 = require("./ItemTipsDefine");
class ItemTipsComponentUtilTool {
  static GetItemItemType(e) {
    var t = ItemTipsComponentUtilTool.OXs.get(e);
    if (t) return t;
    t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e,
      );
    if (void 0 !== t) {
      let e = ItemTipsComponentUtilTool.fxt.get(t);
      return (e = e || 0);
    }
  }
  static GetTipsDataById(e, t) {
    var i = this.GetItemItemType(e),
      i = ItemTipsComponentUtilTool.pxt[i];
    if (i) return new i(e, t);
  }
}
((exports.ItemTipsComponentUtilTool = ItemTipsComponentUtilTool).pxt = {
  [0]: ItemTipsDefine_1.TipsMaterialData,
  1: ItemTipsDefine_1.TipsWeaponData,
  2: ItemTipsDefine_1.TipsVisionData,
  3: ItemTipsDefine_1.TipsCharacterData,
  4: ItemTipsDefine_1.TipsOverPowerData,
}),
  (ItemTipsComponentUtilTool.fxt = new Map([
    [3, 2],
    [2, 1],
    [1, 3],
  ])),
  (ItemTipsComponentUtilTool.OXs = new Map([
    [ItemDefines_1.EItemId.OverPower, 4],
  ]));
//# sourceMappingURL=ItemTipsUtilTool.js.map
