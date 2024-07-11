"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrailPhantomProp = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const IntArray_1 = require("./SubType/IntArray");
class TrailPhantomProp {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get MainProp() {
    return this.mainprop();
  }
  get BreachProp() {
    return this.breachprop();
  }
  get SubProp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subpropLength(), (t) =>
      this.subprop(t),
    );
  }
  get MainProps() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainpropsLength(), (t) =>
      this.mainprops(t),
    );
  }
  get MainPropGrowth() {
    return this.mainpropgrowth();
  }
  get SubProps() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subpropsLength(), (t) =>
      this.subprops(t),
    );
  }
  get SubPropList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subproplistLength(), (t) =>
      this.subproplist(t),
    );
  }
  get FetterGroupId() {
    return this.fettergroupid();
  }
  get SkinItemId() {
    return this.skinitemid();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsTrailPhantomProp(t, r) {
    return (r || new TrailPhantomProp()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  level() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mainprop(t) {
    const r = this.J7.__offset(this.z7, 8);
    return r
      ? (t || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.z7 + r),
          this.J7,
        )
      : null;
  }
  breachprop(t) {
    const r = this.J7.__offset(this.z7, 10);
    return r
      ? (t || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.z7 + r),
          this.J7,
        )
      : null;
  }
  GetSubpropAt(t, r) {
    return this.subprop(t);
  }
  subprop(t, r) {
    const i = this.J7.__offset(this.z7, 12);
    return i
      ? (r || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  subpropLength() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMainpropsAt(t) {
    return this.mainprops(t);
  }
  mainprops(t) {
    const r = this.J7.__offset(this.z7, 14);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  mainpropsLength() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mainpropsArray() {
    const t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  mainpropgrowth() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetSubpropsAt(t, r) {
    return this.subprops(t);
  }
  subprops(t, r) {
    const i = this.J7.__offset(this.z7, 18);
    return i
      ? (r || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  subpropsLength() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetSubproplistAt(t) {
    return this.subproplist(t);
  }
  subproplist(t) {
    const r = this.J7.__offset(this.z7, 20);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  subproplistLength() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  subproplistArray() {
    const t = this.J7.__offset(this.z7, 20);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  fettergroupid() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  skinitemid() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.TrailPhantomProp = TrailPhantomProp;
// # sourceMappingURL=TrailPhantomProp.js.map
