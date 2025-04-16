"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResEffect = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResEffect {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Tag() {
    return this.tag();
  }
  get DescIntParam() {
    return this.descintparam();
  }
  get DescParam() {
    return this.descparam();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResEffect(t, s) {
    return (s || new RogueResEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tag() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  descintparam() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  descparam(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.RogueResEffect = RogueResEffect;
//# sourceMappingURL=RogueResEffect.js.map
