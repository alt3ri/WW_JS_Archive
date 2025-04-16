"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoConfig = void 0);
const DangoById_1 = require("../../../../Core/Define/ConfigQuery/DangoById"),
  DangoSkillById_1 = require("../../../../Core/Define/ConfigQuery/DangoSkillById"),
  DangoSkillEffectById_1 = require("../../../../Core/Define/ConfigQuery/DangoSkillEffectById"),
  DiceById_1 = require("../../../../Core/Define/ConfigQuery/DiceById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class DangoConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetDangoById(e) {
    return DangoById_1.configDangoById.GetConfig(e);
  }
  GetDiceById(e) {
    return DiceById_1.configDiceById.GetConfig(e);
  }
  GetDangoSkillById(e) {
    return DangoSkillById_1.configDangoSkillById.GetConfig(e);
  }
  GetDangoSkillEffectById(e) {
    return DangoSkillEffectById_1.configDangoSkillEffectById.GetConfig(e);
  }
}
exports.DangoConfig = DangoConfig;
//# sourceMappingURL=DangoConfig.js.map
