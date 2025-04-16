"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySetting = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class KeySetting {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TypeId() {
    return this.typeid();
  }
  get InputControllerType() {
    return this.inputcontrollertype();
  }
  get SortId() {
    return this.sortid();
  }
  get Name() {
    return this.name();
  }
  get OpenViewType() {
    return this.openviewtype();
  }
  get ButtonTextId() {
    return this.buttontextid();
  }
  get ActionOrAxis() {
    return this.actionoraxis();
  }
  get ActionOrAxisName() {
    return this.actionoraxisname();
  }
  get CanCombination() {
    return this.cancombination();
  }
  get PcKeyIndex() {
    return this.pckeyindex();
  }
  get XBoxKeyIndex() {
    return this.xboxkeyindex();
  }
  get ConnectedKeySettingId() {
    return this.connectedkeysettingid();
  }
  get ConnectedKeySettingIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.connectedkeysettingidlistLength(),
      this.connectedkeysettingidlist,
      this,
    );
  }
  get PcAxisValue() {
    return this.pcaxisvalue();
  }
  get XBoxAxisValue() {
    return this.xboxaxisvalue();
  }
  get IsLock() {
    return this.islock();
  }
  get BothActionName() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bothactionnameLength(),
      this.bothactionname,
      this,
    );
  }
  get IsCheckSameKey() {
    return this.ischecksamekey();
  }
  get CanDisable() {
    return this.candisable();
  }
  get AllowKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.allowkeysLength(),
      this.allowkeys,
      this,
    );
  }
  get AllowMainKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.allowmainkeysLength(),
      this.allowmainkeys,
      this,
    );
  }
  get AllowSecondKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.allowsecondkeysLength(),
      this.allowsecondkeys,
      this,
    );
  }
  get AllowKeysPool() {
    return this.allowkeyspool();
  }
  get AllowMainKeysPool() {
    return this.allowmainkeyspool();
  }
  get AllowSecondKeysPool() {
    return this.allowsecondkeyspool();
  }
  get DetailTextId() {
    return this.detailtextid();
  }
  get OnlyWorkNotShow() {
    return this.onlyworknotshow();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsKeySetting(t, i) {
    return (i || new KeySetting()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  inputcontrollertype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  openviewtype() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buttontextid(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  actionoraxis() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  actionoraxisname(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  cancombination() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  pckeyindex() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  xboxkeyindex() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  connectedkeysettingid() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConnectedkeysettingidlistAt(t) {
    return this.connectedkeysettingidlist(t);
  }
  connectedkeysettingidlist(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  connectedkeysettingidlistLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  connectedkeysettingidlistArray() {
    var t = this.J7.__offset(this.z7, 30);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  pcaxisvalue() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  xboxaxisvalue() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  islock() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetBothactionnameAt(t) {
    return this.bothactionname(t);
  }
  bothactionname(t, i) {
    var s = this.J7.__offset(this.z7, 38),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  bothactionnameLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  ischecksamekey() {
    var t = this.J7.__offset(this.z7, 40);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  candisable() {
    var t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetAllowkeysAt(t) {
    return this.allowkeys(t);
  }
  allowkeys(t, i) {
    var s = this.J7.__offset(this.z7, 44),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  allowkeysLength() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAllowmainkeysAt(t) {
    return this.allowmainkeys(t);
  }
  allowmainkeys(t, i) {
    var s = this.J7.__offset(this.z7, 46),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  allowmainkeysLength() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAllowsecondkeysAt(t) {
    return this.allowsecondkeys(t);
  }
  allowsecondkeys(t, i) {
    var s = this.J7.__offset(this.z7, 48),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  allowsecondkeysLength() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  allowkeyspool(t) {
    var i = this.J7.__offset(this.z7, 50),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  allowmainkeyspool(t) {
    var i = this.J7.__offset(this.z7, 52),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  allowsecondkeyspool(t) {
    var i = this.J7.__offset(this.z7, 54),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  detailtextid(t) {
    var i = this.J7.__offset(this.z7, 56),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  onlyworknotshow() {
    var t = this.J7.__offset(this.z7, 58);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.KeySetting = KeySetting;
//# sourceMappingURL=KeySetting.js.map
