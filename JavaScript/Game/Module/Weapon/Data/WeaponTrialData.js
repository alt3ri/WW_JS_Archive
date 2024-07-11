"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponTrialData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  WeaponDataBase_1 = require("./WeaponDataBase");
class WeaponTrialData extends WeaponDataBase_1.WeaponDataBase {
  constructor() {
    super(...arguments),
      (this.TrialId = 0),
      (this.TrialConfig = void 0),
      (this.FullLevelWeaponData = void 0),
      (this.RoleId = 0),
      (this.BreachLevel = 0);
  }
  SetTrialId(e, t = !0) {
    (this.TrialId = e),
      (this.TrialConfig =
        ConfigManager_1.ConfigManager.WeaponConfig.GetTrialWeaponConfig(
          this.TrialId,
        )),
      this.InitWeaponBreachLevel(),
      t ? this.InitFullLevelWeaponData() : (this.FullLevelWeaponData = void 0);
  }
  InitWeaponBreachLevel() {
    var e = this.GetBreachConfigList(),
      t = this.GetLevel();
    for (const a of e)
      if (t <= a.LevelLimit) {
        this.BreachLevel = a.Level;
        break;
      }
  }
  InitFullLevelWeaponData() {
    var e = this.TrialConfig.FullLevelTrialId;
    e <= 0 ||
      ((e = ConfigManager_1.ConfigManager.WeaponConfig.GetTrialWeaponConfig(e))
        ? ((this.FullLevelWeaponData = new WeaponTrialData()),
          this.FullLevelWeaponData.SetTrialId(e.Id, !1))
        : (this.FullLevelWeaponData = void 0));
  }
  GetItemId() {
    return this.TrialConfig.WeaponId;
  }
  GetLevel() {
    return this.TrialConfig.WeaponLevel;
  }
  GetResonanceLevel() {
    return this.TrialConfig.WeaponResonanceLevel;
  }
  GetBreachLevel() {
    return this.BreachLevel;
  }
  HasRole() {
    return 0 !== this.RoleId;
  }
  SetRoleId(e) {
    this.RoleId = e;
  }
  GetRoleId() {
    return this.RoleId;
  }
  IsTrial() {
    return !0;
  }
  CanGoBreach() {
    return !1;
  }
  GetTrialConfig() {
    return this.TrialConfig;
  }
  GetFullLevelWeaponData() {
    return this.FullLevelWeaponData;
  }
}
exports.WeaponTrialData = WeaponTrialData;
//# sourceMappingURL=WeaponTrialData.js.map
