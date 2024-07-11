"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemConfig = void 0);
const BuffById_1 = require("../../../Core/Define/ConfigQuery/BuffById");
const BuffItemById_1 = require("../../../Core/Define/ConfigQuery/BuffItemById");
const BuffItemByPublicCdGroup_1 = require("../../../Core/Define/ConfigQuery/BuffItemByPublicCdGroup");
const BuffItemCdGroupById_1 = require("../../../Core/Define/ConfigQuery/BuffItemCdGroupById");
const DamageById_1 = require("../../../Core/Define/ConfigQuery/DamageById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class BuffItemConfig extends ConfigBase_1.ConfigBase {
  GetDamageConfig(e, f) {
    return DamageById_1.configDamageById.GetConfig(f);
  }
  GetBuffItemBuffConfig(e) {
    e = this.GetBuffItemConfig(e);
    if (e && e.Buffs?.length) {
      const f = new Array();
      for (const u of e.Buffs) {
        const r = BuffById_1.configBuffById.GetConfig(u);
        r && f.push(r);
      }
      return f;
    }
  }
  GetBuffConfig(e, f) {
    return BuffById_1.configBuffById.GetConfig(f);
  }
  GetBuffConfigs(e, f) {
    if (f && f?.length) {
      const r = new Array();
      for (const t of f) {
        const u = BuffById_1.configBuffById.GetConfig(t);
        u && r.push(u);
      }
      return r;
    }
  }
  IsResurrectionItem(e) {
    e = this.GetBuffItemBuffConfig(e);
    if (e) for (const f of e) if (f.ExtraEffectID === 101) return !0;
    return !1;
  }
  IsTeamBuffItem(e) {
    let f = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return (
      !!f && !!f.IsBuffItem && !!(f = this.GetBuffItemConfig(e)) && f.Share
    );
  }
  GetBuffItemTotalCdTime(e) {
    e = this.GetBuffItemConfig(e);
    if (!e) return 0;
    let f = e.PublicCdGroup;
    if (f > 0) {
      f = this.GetBuffItemCdGroup(f);
      if (f) return f.CoolDownTime;
    }
    return e.Cd;
  }
  GetBuffItemConfig(e) {
    return BuffItemById_1.configBuffItemById.GetConfig(e);
  }
  GetBuffItemConfigByPublicCdGroup(e) {
    return BuffItemByPublicCdGroup_1.configBuffItemByPublicCdGroup.GetConfigList(
      e,
    );
  }
  GetBuffItemCdGroup(e) {
    return BuffItemCdGroupById_1.configBuffItemCdGroupById.GetConfig(e);
  }
  IsBuffItem(e) {
    const f = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return !!f && !!f.IsBuffItem && void 0 !== this.GetBuffItemConfig(e);
  }
}
exports.BuffItemConfig = BuffItemConfig;
// # sourceMappingURL=BuffItemConfig.js.map
