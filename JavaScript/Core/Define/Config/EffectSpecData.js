"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSpecData = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EffectSpecData {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SpecType() {
    return this.spectype();
  }
  get EffectRegularType() {
    return this.effectregulartype();
  }
  get LifeTime() {
    return this.lifetime();
  }
  get Children() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.childrenLength(),
      this.children,
      this,
    );
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsEffectSpecData(t, e) {
    return (e || new EffectSpecData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  spectype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  effectregulartype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lifetime() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetChildrenAt(t) {
    return this.children(t);
  }
  children(t) {
    var e = this.J7.__offset(this.z7, 12);
    return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
  }
  childrenLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  childrenArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.EffectSpecData = EffectSpecData;
//# sourceMappingURL=EffectSpecData.js.map
