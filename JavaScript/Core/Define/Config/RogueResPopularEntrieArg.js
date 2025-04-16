"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResPopularEntrieArg = void 0);
class RogueResPopularEntrieArg {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get InstId() {
    return this.instid();
  }
  get Slot() {
    return this.slot();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResPopularEntrieArg(t, s) {
    return (s || new RogueResPopularEntrieArg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  slot() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResPopularEntrieArg = RogueResPopularEntrieArg;
//# sourceMappingURL=RogueResPopularEntrieArg.js.map
