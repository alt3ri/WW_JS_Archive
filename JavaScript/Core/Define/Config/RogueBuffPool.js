"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBuffPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueBuffPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return this.buffid();
  }
  get PerIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.peridsLength(), (t) =>
      this.perids(t),
    );
  }
  get EffectId() {
    return this.effectid();
  }
  get PerkType() {
    return this.perktype();
  }
  get Quality() {
    return this.quality();
  }
  get BuffElement() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.buffelementLength(),
      (t) => this.buffelement(t)?.key(),
      (t) => this.buffelement(t)?.value(),
    );
  }
  get BuffIcon() {
    return this.bufficon();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffdescparamLength(),
      (t) => this.buffdescparam(t),
    );
  }
  get BuffDescSimple() {
    return this.buffdescsimple();
  }
  get BuffName() {
    return this.buffname();
  }
  get RoleId() {
    return this.roleid();
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueBuffPool(t, i) {
    return (i || new RogueBuffPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
  }
  GetPeridsAt(t) {
    return this.perids(t);
  }
  perids(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  peridsLength() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  peridsArray() {
    const t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  effectid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  perktype() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  quality() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 3;
  }
  GetBuffelementAt(t, i) {
    return this.buffelement(t);
  }
  buffelement(t, i) {
    const s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  buffelementLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bufficon(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  buffdesc(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetBuffdescparamAt(t) {
    return this.buffdescparam(t);
  }
  buffdescparam(t, i) {
    const s = this.J7.__offset(this.z7, 22);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  buffdescparamLength() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffdescsimple(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  buffname(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roleid() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  trialroleid() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueBuffPool = RogueBuffPool;
// # sourceMappingURL=RogueBuffPool.js.map
