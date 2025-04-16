"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResAffixLibrary = void 0);
class RogueResAffixLibrary {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get AffixId() {
    return this.affixid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueResAffixLibrary(t, i) {
    return (i || new RogueResAffixLibrary()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  affixid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResAffixLibrary = RogueResAffixLibrary;
//# sourceMappingURL=RogueResAffixLibrary.js.map
