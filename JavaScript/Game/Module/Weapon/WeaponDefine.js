"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkeletalObserverHandles =
    exports.ResonanceConditionData =
    exports.LevelUpConditionData =
    exports.BreachConditionData =
    exports.ConsumeData =
    exports.MaterialData =
    exports.WEAPON_EQUIPTYPE =
    exports.WEAPON_CURVE_RATION =
      void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
(exports.WEAPON_CURVE_RATION = 1e4), (exports.WEAPON_EQUIPTYPE = 0);
class MaterialData {
  constructor(t, e = 1) {
    (this.ItemData = t), (this.UseCount = e);
  }
  AddCount() {
    this.UseCount += 1;
  }
  ReduceCount() {
    --this.UseCount;
  }
  CheckEmpty() {
    return 0 === this.UseCount;
  }
}
exports.MaterialData = MaterialData;
class ConsumeData {
  constructor() {
    (this.Exp = 0), (this.Coin = 0);
  }
}
exports.ConsumeData = ConsumeData;
class BreachConditionData {
  constructor() {
    (this.CanBreach = !0), (this.Tips = "");
  }
}
exports.BreachConditionData = BreachConditionData;
class LevelUpConditionData {
  constructor() {
    (this.HasHighQuality = !1),
      (this.HasBeStrength = !1),
      (this.HasResonance = !1);
  }
  CheckAllCondition() {
    return this.HasHighQuality && this.HasBeStrength && this.HasResonance;
  }
  GetConditionTextList() {
    var t,
      e = [];
    return (
      this.HasHighQuality &&
        ((t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "WeaponHighQuality",
          )),
        e.push(t)),
      this.HasBeStrength &&
        ((t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "WeaponHasLevelUp",
          )),
        e.push(t)),
      this.HasResonance &&
        ((t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "WeaponHasResonance",
          )),
        e.push(t)),
      e
    );
  }
}
exports.LevelUpConditionData = LevelUpConditionData;
class ResonanceConditionData {
  constructor() {
    (this.HasBeStrength = !1), (this.HasResonance = !1);
  }
}
exports.ResonanceConditionData = ResonanceConditionData;
class WeaponSkeletalObserverHandles {
  constructor(t, e) {
    (this.WeaponObserver = t), (this.WeaponScabbardObserver = e);
  }
}
exports.WeaponSkeletalObserverHandles = WeaponSkeletalObserverHandles;
//# sourceMappingURL=WeaponDefine.js.map
