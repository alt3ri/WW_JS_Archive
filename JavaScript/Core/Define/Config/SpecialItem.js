"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SpecialItem {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get UseButtonAdditionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.usebuttonadditionparamLength(),
      this.usebuttonadditionparam,
      this,
    );
  }
  get SpecialItemType() {
    return this.specialitemtype();
  }
  get Parameters() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.parametersLength(),
      this.parameters,
      this,
    );
  }
  get UseInMultiMode() {
    return this.useinmultimode();
  }
  get UseInstance() {
    return this.useinstance();
  }
  get BanTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bantagsLength(),
      this.bantags,
      this,
    );
  }
  get AllowTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.allowtagsLength(),
      this.allowtags,
      this,
    );
  }
  get SummonConfigId() {
    return this.summonconfigid();
  }
  get NeedShowNum() {
    return this.needshownum();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSpecialItem(t, s) {
    return (s || new SpecialItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetUsebuttonadditionparamAt(t) {
    return this.usebuttonadditionparam(t);
  }
  usebuttonadditionparam(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  usebuttonadditionparamLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  usebuttonadditionparamArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  specialitemtype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetParametersAt(t) {
    return this.parameters(t);
  }
  parameters(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  parametersLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  useinmultimode() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  useinstance() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetBantagsAt(t) {
    return this.bantags(t);
  }
  bantags(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  bantagsLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAllowtagsAt(t) {
    return this.allowtags(t);
  }
  allowtags(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  allowtagsLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  summonconfigid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  needshownum() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SpecialItem = SpecialItem;
//# sourceMappingURL=SpecialItem.js.map
