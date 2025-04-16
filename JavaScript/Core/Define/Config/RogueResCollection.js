"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResCollection = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResCollection {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get IdKey() {
    return this.idkey();
  }
  get Id() {
    return this.id();
  }
  get Index() {
    return this.index();
  }
  get Type() {
    return this.type();
  }
  get SortId() {
    return this.sortid();
  }
  get Desc() {
    return this.desc();
  }
  get RuleId() {
    return this.ruleid();
  }
  get Cond() {
    return this.cond();
  }
  get Award() {
    return this.award();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResCollection(t, s) {
    return (s || new RogueResCollection()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  idkey() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  id() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  ruleid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cond() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  award() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResCollection = RogueResCollection;
//# sourceMappingURL=RogueResCollection.js.map
