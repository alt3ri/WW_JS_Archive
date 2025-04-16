"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResSkillLvRule = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class RogueResSkillLvRule {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Level() {
    return this.level();
  }
  get SkillLevel() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.skilllevelLength(),
      this.skilllevelKey,
      this.skilllevelValue,
      this,
    );
  }
  skilllevelKey(t) {
    return this.skilllevel(t)?.key();
  }
  skilllevelValue(t) {
    return this.skilllevel(t)?.value();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueResSkillLvRule(t, e) {
    return (e || new RogueResSkillLvRule()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkilllevelAt(t, e) {
    return this.skilllevel(t);
  }
  skilllevel(t, e) {
    var i = this.J7.__offset(this.z7, 6);
    return i
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  skilllevelLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueResSkillLvRule = RogueResSkillLvRule;
//# sourceMappingURL=RogueResSkillLvRule.js.map
