"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponDataBase = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class WeaponDataBase {
  GetWeaponConfig() {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
      this.GetItemId(),
    );
  }
  GetBreachConfig() {
    var e,
      t = this.GetWeaponConfig();
    if (t)
      return (
        (e = this.GetBreachLevel()),
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
          t.BreachId,
          e,
        )
      );
  }
  GetBreachConfigList() {
    var e = this.GetWeaponConfig();
    if (e)
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(
        e.BreachId,
      );
  }
  GetResonanceConfig() {
    var e,
      t = this.GetWeaponConfig();
    if (t)
      return (
        (e = this.GetResonanceLevel()),
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
          t.ResonId,
          e,
        )
      );
  }
  CanGoBreach() {
    var e,
      t = this.GetLevel();
    return (
      !(
        this.GetLastBreachConfig().LevelLimit <= t ||
        !(e = this.GetBreachConfig())
      ) && t >= e.LevelLimit
    );
  }
  GetLastBreachConfig() {
    var e = this.GetWeaponConfig().BreachId,
      e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e);
    return e[e.length - 1];
  }
  GetBreachConsume() {
    var e = this.GetWeaponConfig(),
      t = this.GetBreachLevel();
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
      e.BreachId,
      t,
    ).Consume;
  }
  GetMaxLevel() {
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelLimit(
        this.GetItemConfig().QualityId,
      ),
      t = this.GetLastBreachConfig();
    return Math.min(e, t.LevelLimit);
  }
  IsLevelMax() {
    return this.GetMaxLevel() <= this.GetLevel();
  }
  GetMaterialCost() {
    var e = this.GetItemConfig().QualityId;
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(e)
      .Cost;
  }
  GetMaxExp(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelList(
      this.GetWeaponConfig().LevelId,
    )) {
      if (!(r.Level <= e)) return t;
      t += r.Exp;
    }
    return t;
  }
  GetLevelLimitMaxExp() {
    var e = this.GetBreachLevel(),
      e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
        this.GetWeaponConfig().BreachId,
        e,
      );
    return this.GetMaxExp(e.LevelLimit - 1);
  }
  GetLevelExp(e) {
    let t = 0;
    return e <= 0
      ? 0
      : ((e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelConfig(
          this.GetWeaponConfig().LevelId,
          e,
        )),
        (t = e ? e.Exp : t));
  }
  GetCurrentMaxLevel() {
    var e,
      t = this.GetWeaponConfig();
    return t
      ? ((e = this.GetBreachLevel()),
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
          t.BreachId,
          e,
        ).LevelLimit)
      : 0;
  }
  GetLastLevelMaxExp() {
    return this.GetMaxExp(this.GetLevel() - 1);
  }
  GetItemConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
      this.GetItemId(),
    );
  }
}
exports.WeaponDataBase = WeaponDataBase;
//# sourceMappingURL=WeaponDataBase.js.map
