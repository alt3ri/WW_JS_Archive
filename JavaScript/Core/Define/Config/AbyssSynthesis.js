"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssSynthesis = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class AbyssSynthesis {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Quality() {
    return this.quality();
  }
  get DecomposeInfo() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.decomposeinfoLength(),
      this.decomposeinfoKey,
      this.decomposeinfoValue,
      this,
    );
  }
  decomposeinfoKey(t) {
    return this.decomposeinfo(t)?.key();
  }
  decomposeinfoValue(t) {
    return this.decomposeinfo(t)?.value();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssSynthesis(t, s) {
    return (s || new AbyssSynthesis()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  quality() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDecomposeinfoAt(t, s) {
    return this.decomposeinfo(t);
  }
  decomposeinfo(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  decomposeinfoLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.AbyssSynthesis = AbyssSynthesis;
//# sourceMappingURL=AbyssSynthesis.js.map
