"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashDevelopReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CalabashDevelopReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MonsterId() {
    return this.monsterid();
  }
  get DevelopCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.developconditionLength(),
      (t) => this.developcondition(t),
    );
  }
  get MonsterInfoId() {
    return this.monsterinfoid();
  }
  get AllExp() {
    return this.allexp();
  }
  get SortId() {
    return this.sortid();
  }
  get MonsterProbeId() {
    return this.monsterprobeid();
  }
  get HandBookBp() {
    return this.handbookbp();
  }
  get MonsterBodyType() {
    return this.monsterbodytype();
  }
  get HandBookCamera() {
    return this.handbookcamera();
  }
  get MonsterNumber() {
    return this.monsternumber();
  }
  get InteractionRadius() {
    return this.interactionradius();
  }
  get IsShow() {
    return this.isshow();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsCalabashDevelopReward(t, s) {
    return (s || new CalabashDevelopReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  monsterid() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDevelopconditionAt(t) {
    return this.developcondition(t);
  }
  developcondition(t) {
    const s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  developconditionLength() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  developconditionArray() {
    const t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  monsterinfoid() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  allexp() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortid() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  monsterprobeid() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  handbookbp(t) {
    const s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  monsterbodytype() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  handbookcamera(t) {
    const s = this.J7.__offset(this.z7, 20);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  monsternumber(t) {
    const s = this.J7.__offset(this.z7, 22);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  interactionradius() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isshow() {
    const t = this.J7.__offset(this.z7, 26);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.CalabashDevelopReward = CalabashDevelopReward;
// # sourceMappingURL=CalabashDevelopReward.js.map
