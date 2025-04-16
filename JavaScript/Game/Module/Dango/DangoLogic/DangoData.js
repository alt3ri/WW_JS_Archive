"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class DangoData {
  constructor(t) {
    (this.Id = 0),
      (this.NameKey = ""),
      (this.DiceId = 0),
      (this.SkillId = 0),
      (this.ModelId = 0),
      (this.Icon = ""),
      (this.IconDamage = ""),
      (this.IconDamageLarge = ""),
      (this.IconAttack = ""),
      (this.IconAttackLarge = ""),
      (this.DangoSay = ""),
      (this.DangoVoice = ""),
      (this.ModelHeight = 0),
      (this.DangoConfig = void 0),
      (this.Id = t);
  }
  static Create(t) {
    t = new DangoData(t);
    return t.AU(), t;
  }
  AU() {
    var t = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(this.Id);
    t &&
      ((this.DangoConfig = t),
      (this.NameKey = t.Name),
      (this.DiceId = t.DiceId),
      (this.SkillId = t.SkillId),
      (this.ModelId = t.ModelId),
      (this.Icon = t.Icon),
      (this.IconDamage = t.IconDamage),
      (this.IconDamageLarge = t.IconDamageLarge),
      (this.IconAttack = t.IconAttack),
      (this.IconAttackLarge = t.IconAttackLarge),
      (this.DangoSay = t.Dialog),
      (this.DangoVoice = t.Audio),
      (this.ModelHeight = t.ModelHeight));
  }
  GetDiceConfig() {
    return ConfigManager_1.ConfigManager.DangoConfig?.GetDiceById(this.DiceId);
  }
  GetSkillConfig() {
    return ConfigManager_1.ConfigManager.DangoConfig?.GetDangoSkillById(
      this.SkillId,
    );
  }
  GetSkillEffectConfig() {
    var t = this.GetSkillConfig();
    if (t)
      return ConfigManager_1.ConfigManager.DangoConfig?.GetDangoSkillEffectById(
        t.SkillEffect,
      );
  }
  GetDangoActiveSkillDesc() {
    var t = this.GetSkillConfig(),
      i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.Name),
      t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
        t.ActivateDesc,
      );
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
      "Dango_InGame_SkillActivated",
      i,
      t,
    );
  }
}
exports.DangoData = DangoData;
//# sourceMappingURL=DangoData.js.map
