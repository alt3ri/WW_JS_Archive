"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemConfig = void 0);
const BuffById_1 = require("../../../Core/Define/ConfigQuery/BuffById"),
  BuffItemById_1 = require("../../../Core/Define/ConfigQuery/BuffItemById"),
  BuffItemByPublicCdGroup_1 = require("../../../Core/Define/ConfigQuery/BuffItemByPublicCdGroup"),
  BuffItemCdGroupById_1 = require("../../../Core/Define/ConfigQuery/BuffItemCdGroupById"),
  DamageById_1 = require("../../../Core/Define/ConfigQuery/DamageById"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class BuffItemConfig extends ConfigBase_1.ConfigBase {
  GetDamageConfig(e, f) {
    return DamageById_1.configDamageById.GetConfig(f);
  }
  GetBuffItemBuffConfig(e) {
    e = this.GetBuffItemConfig(e);
    if (e && e.Buffs?.length) {
      var f = new Array();
      for (const u of e.Buffs) {
        var r = BuffById_1.configBuffById.GetConfig(u);
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
      var r = new Array();
      for (const t of f) {
        var u = BuffById_1.configBuffById.GetConfig(t);
        u && r.push(u);
      }
      return r;
    }
  }
  IsResurrectionItem(e) {
    e = this.GetBuffItemBuffConfig(e);
    if (e) for (const f of e) if (101 === f.ExtraEffectID) return !0;
    return !1;
  }
  IsTeamBuffItem(e) {
    var f = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return (
      !!f && !!f.IsBuffItem && !!(f = this.GetBuffItemConfig(e)) && f.Share
    );
  }
  GetBuffItemTotalCdTime(e) {
    e = this.GetBuffItemConfig(e);
    if (!e) return 0;
    var f = e.PublicCdGroup;
    if (0 < f) {
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
    var f = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return !!f && !!f.IsBuffItem && void 0 !== this.GetBuffItemConfig(e);
  }
}
exports.BuffItemConfig = BuffItemConfig;
//# sourceMappingURL=BuffItemConfig.js.map
