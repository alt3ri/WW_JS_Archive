"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropDataUtil = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SelectablePropItemDefine_1 = require("./SelectablePropItemDefine");
class SelectablePropDataUtil {
  static get TickMaxTime() {
    return (
      this.ABt ||
        (this.ABt =
          ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickMaxTime()),
      this.ABt
    );
  }
  static get TickMinTime() {
    return (
      this.PBt ||
        (this.PBt =
          ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickMinTime()),
      this.PBt
    );
  }
  static get TickInternalTime() {
    return (
      this.xBt ||
        (this.xBt =
          ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickIntervalTime()),
      this.xBt
    );
  }
  static GetSelectablePropData(e) {
    var t = e.GetItemDataType();
    return 2 === t
      ? this.WeaponPropData(e.GetUniqueId())
      : 3 === t
        ? this.PhantomPropData(e.GetUniqueId(), e.GetCount())
        : this.MaterialPropData(e.GetConfigId(), e.GetCount());
  }
  static WeaponPropData(e) {
    var t = new SelectablePropItemDefine_1.SelectablePropData(),
      a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    return (
      (t.IncId = e),
      (t.ItemId = a.GetItemId()),
      (t.ItemDataType = 2),
      (t.ResonanceLevel = a.GetResonanceLevel()),
      (t.LevelText = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "LevelShow",
      ).replace("{0}", a.GetLevel().toString())),
      (t.RoleId = a.GetRoleId()),
      t
    );
  }
  static PhantomPropData(e, t) {
    var a,
      r =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
    if (r)
      return (
        ((a = new SelectablePropItemDefine_1.SelectablePropData()).IncId = e),
        (a.ItemId = r.GetConfigId()),
        (a.ItemDataType = 3),
        (a.LevelText = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "LevelShow",
        ).replace("{0}", r.GetPhantomLevel().toString())),
        (a.Count = t),
        a
      );
  }
  static MaterialPropData(e, t) {
    var a = new SelectablePropItemDefine_1.SelectablePropData();
    return (
      (a.IncId = 0),
      (a.LevelText = t.toString()),
      (a.ItemDataType = 0),
      (a.ItemId = e),
      (a.Count = t),
      a
    );
  }
}
exports.SelectablePropDataUtil = SelectablePropDataUtil;
//# sourceMappingURL=SelectablePropDataUtil.js.map
