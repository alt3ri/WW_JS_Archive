"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConsumeItemUtil = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConsumeItem_1 = require("./ConsumeItem");
class ConsumeItemUtil {
  static GetConsumeItemData(e, a) {
    e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(e)[0];
    if (e)
      return 2 === e.GetType()
        ? this.WeaponConsumeData(e)
        : this.MaterialConsumeData(e, a);
  }
  static WeaponConsumeData(e) {
    var a = new ConsumeItem_1.ConsumeItemData(),
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        e.GetUniqueId(),
      );
    return (
      (a.IncId = e.GetUniqueId()),
      (a.ItemId = e.GetConfigId()),
      (a.ResonanceLevel = t.GetResonanceLevel()),
      (a.BottomText = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "LevelShow",
      ).replace("{0}", t.GetLevel().toString())),
      a
    );
  }
  static MaterialConsumeData(e, a) {
    var t = new ConsumeItem_1.ConsumeItemData();
    return (
      (t.IncId = e.GetUniqueId()),
      (t.ItemId = e.GetConfigId()),
      (t.BottomText = a + "/" + e.GetCount()),
      t
    );
  }
}
exports.ConsumeItemUtil = ConsumeItemUtil;
//# sourceMappingURL=ConsumeItemUtil.js.map
