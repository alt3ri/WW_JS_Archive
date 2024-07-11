"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Area = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class Area {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get AreaId() {
    return this.areaid();
  }
  get Level() {
    return this.level();
  }
  get CountryId() {
    return this.countryid();
  }
  get DeliveryMarkId() {
    return this.deliverymarkid();
  }
  get AreaName() {
    return this.areaname();
  }
  get Title() {
    return this.title();
  }
  get Father() {
    return this.father();
  }
  get Tag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tagLength(), (t) =>
      this.tag(t),
    );
  }
  get Record() {
    return this.record();
  }
  get Tips() {
    return this.tips();
  }
  get IsInitActived() {
    return this.isinitactived();
  }
  get WorldMonsterLevelMax() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.worldmonsterlevelmaxLength(),
      (t) => this.worldmonsterlevelmax(t)?.key(),
      (t) => this.worldmonsterlevelmax(t)?.value(),
    );
  }
  get WuYinQuID() {
    return this.wuyinquid();
  }
  get AtmosphereId() {
    return this.atmosphereid();
  }
  get EdgeWallName() {
    return this.edgewallname();
  }
  get DeliveryMarkType() {
    return this.deliverymarktype();
  }
  get SortIndex() {
    return this.sortindex();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsArea(t, r) {
    return (r || new Area()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  areaid() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  level() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  countryid() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  deliverymarkid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  areaname(t) {
    const r = this.J7.__offset(this.z7, 12);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  title(t) {
    const r = this.J7.__offset(this.z7, 14);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  father() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTagAt(t) {
    return this.tag(t);
  }
  tag(t) {
    const r = this.J7.__offset(this.z7, 18);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  tagLength() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  tagArray() {
    const t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  record() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tips() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isinitactived() {
    const t = this.J7.__offset(this.z7, 24);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetWorldmonsterlevelmaxAt(t, r) {
    return this.worldmonsterlevelmax(t);
  }
  worldmonsterlevelmax(t, r) {
    const i = this.J7.__offset(this.z7, 26);
    return i
      ? (r || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  worldmonsterlevelmaxLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  wuyinquid() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  atmosphereid() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  edgewallname(t) {
    const r = this.J7.__offset(this.z7, 32);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  deliverymarktype() {
    const t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortindex() {
    const t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.Area = Area;
// # sourceMappingURL=Area.js.map
