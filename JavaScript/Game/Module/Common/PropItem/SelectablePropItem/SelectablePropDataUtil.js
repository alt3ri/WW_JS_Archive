"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropDataUtil = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SelectablePropItemDefine_1 = require("./SelectablePropItemDefine");
class SelectablePropDataUtil {
  static get TickMaxTime() {
    return (
      this.Dwt ||
        (this.Dwt =
          ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickMaxTime()),
      this.Dwt
    );
  }
  static get TickMinTime() {
    return (
      this.Rwt ||
        (this.Rwt =
          ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickMinTime()),
      this.Rwt
    );
  }
  static get TickInternalTime() {
    return (
      this.Uwt ||
        (this.Uwt =
          ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickIntervalTime()),
      this.Uwt
    );
  }
  static GetSelectablePropData(e) {
    const t = e.GetItemDataType();
    return t === 2
      ? this.WeaponPropData(e.GetUniqueId())
      : t === 3
        ? this.PhantomPropData(e.GetUniqueId(), e.GetCount())
        : this.MaterialPropData(e.GetConfigId(), e.GetCount());
  }
  static WeaponPropData(e) {
    const t = new SelectablePropItemDefine_1.SelectablePropData();
    const a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
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
    let a;
    const r =
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
    const a = new SelectablePropItemDefine_1.SelectablePropData();
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
// # sourceMappingURL=SelectablePropDataUtil.js.map
