"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterInfoConfig = void 0);
const MonsterBodyTypeConfigById_1 = require("../../../Core/Define/ConfigQuery/MonsterBodyTypeConfigById");
const MonsterInfoById_1 = require("../../../Core/Define/ConfigQuery/MonsterInfoById");
const MonsterPerchById_1 = require("../../../Core/Define/ConfigQuery/MonsterPerchById");
const MonsterRarityById_1 = require("../../../Core/Define/ConfigQuery/MonsterRarityById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MonsterInfoConfig extends ConfigBase_1.ConfigBase {
  GetMonsterInfoConfig(e) {
    e = MonsterInfoById_1.configMonsterInfoById.GetConfig(e);
    if (e) return e;
  }
  GetMonsterRarityConfig(e) {
    e = MonsterRarityById_1.configMonsterRarityById.GetConfig(e);
    if (e) return e;
  }
  GetMonsterIcon(e) {
    return this.GetMonsterInfoConfig(e).Icon;
  }
  GetMonsterBigIcon(e) {
    return this.GetMonsterInfoConfig(e).BigIcon;
  }
  GetMonsterName(e) {
    e = this.GetMonsterInfoConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
  }
  GetMonsterTachine(e) {
    return this.GetMonsterInfoConfig(e).Tachine;
  }
  GetMonsterRarity(e) {
    return this.GetMonsterInfoConfig(e).RarityId;
  }
  GetMonsterPerch(e) {
    const r = [];
    const t = this.GetMonsterInfoConfig(e).PerchId;
    const n = t.length;
    for (let e = 0; e < n; e++) {
      var o = t[e];
      var o = MonsterPerchById_1.configMonsterPerchById.GetConfig(o);
      var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.PerchDes);
      r.push(o);
    }
    return r;
  }
  GetMonsterBodyTypeConfig(e) {
    e =
      MonsterBodyTypeConfigById_1.configMonsterBodyTypeConfigById.GetConfig(e);
    if (e) return e;
  }
}
exports.MonsterInfoConfig = MonsterInfoConfig;
// # sourceMappingURL=MonsterInfoConfig.js.map
