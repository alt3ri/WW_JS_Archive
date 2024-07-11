"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GiftPackage = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const GiftType_1 = require("./SubType/GiftType");
class GiftPackage {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Content() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.contentLength(),
      (t) => this.content(t)?.key(),
      (t) => this.content(t)?.value(),
    );
  }
  get Weight() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.weightLength(),
      (t) => this.weight(t)?.key(),
      (t) => this.weight(t)?.value(),
    );
  }
  get AvailableNum() {
    return this.availablenum();
  }
  get ShowType() {
    return this.showtype();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGiftPackage(t, i) {
    return (i || new GiftPackage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt8(this.z7 + t) : GiftType_1.GiftType.Fixed;
  }
  GetContentAt(t, i) {
    return this.content(t);
  }
  content(t, i) {
    const e = this.J7.__offset(this.z7, 8);
    return e
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  contentLength() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetWeightAt(t, i) {
    return this.weight(t);
  }
  weight(t, i) {
    const e = this.J7.__offset(this.z7, 10);
    return e
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  weightLength() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  availablenum() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showtype() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.GiftPackage = GiftPackage;
// # sourceMappingURL=GiftPackage.js.map
