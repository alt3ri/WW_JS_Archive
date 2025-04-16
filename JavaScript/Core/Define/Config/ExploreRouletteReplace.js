"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreRouletteReplace = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploreRouletteReplace {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TagsInForce() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.tagsinforceLength(),
      this.tagsinforce,
      this,
    );
  }
  get Priority() {
    return this.priority();
  }
  get RouletteSkillIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rouletteskillidlistLength(),
      this.rouletteskillidlist,
      this,
    );
  }
  get RouletteItemId() {
    return this.rouletteitemid();
  }
  get ReplaceSkillId() {
    return this.replaceskillid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsExploreRouletteReplace(t, i) {
    return (i || new ExploreRouletteReplace()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTagsinforceAt(t) {
    return this.tagsinforce(t);
  }
  tagsinforce(t, i) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  tagsinforceLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  priority() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRouletteskillidlistAt(t) {
    return this.rouletteskillidlist(t);
  }
  rouletteskillidlist(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rouletteskillidlistLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rouletteskillidlistArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  rouletteitemid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  replaceskillid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ExploreRouletteReplace = ExploreRouletteReplace;
//# sourceMappingURL=ExploreRouletteReplace.js.map
