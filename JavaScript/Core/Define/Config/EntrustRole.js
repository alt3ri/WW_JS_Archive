"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntrustRole = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EntrustRole {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Icon() {
    return this.icon();
  }
  get HeadIcon() {
    return this.headicon();
  }
  get SmallHeadIcon() {
    return this.smallheadicon();
  }
  get Name() {
    return this.name();
  }
  get UnLockCondition() {
    return this.unlockcondition();
  }
  get JumpType() {
    return this.jumptype();
  }
  get JumpParam() {
    return this.jumpparam();
  }
  get ExPropertyCurve() {
    return this.expropertycurve();
  }
  get Type() {
    return this.type();
  }
  get MapSortId() {
    return this.mapsortid();
  }
  get FailDialog() {
    return this.faildialog();
  }
  get SuccessDialog() {
    return this.successdialog();
  }
  get InvestDialog() {
    return this.investdialog();
  }
  get InvestSuccessDialog() {
    return this.investsuccessdialog();
  }
  get InvestFailDialog() {
    return this.investfaildialog();
  }
  get JoinDialog() {
    return this.joindialog();
  }
  get BuildSuccessDialog() {
    return this.buildsuccessdialog();
  }
  get SpineAtlas() {
    return this.spineatlas();
  }
  get SpineSkeletonData() {
    return this.spineskeletondata();
  }
  get SmallSpineAtlas() {
    return this.smallspineatlas();
  }
  get SmallSpineSkeletonData() {
    return this.smallspineskeletondata();
  }
  get Portrait() {
    return this.portrait();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsEntrustRole(t, s) {
    return (s || new EntrustRole()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  headicon(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  smallheadicon(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  jumptype() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  jumpparam() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  expropertycurve() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapsortid() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  faildialog(t) {
    var s = this.J7.__offset(this.z7, 26),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  successdialog(t) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  investdialog(t) {
    var s = this.J7.__offset(this.z7, 30),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  investsuccessdialog(t) {
    var s = this.J7.__offset(this.z7, 32),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  investfaildialog(t) {
    var s = this.J7.__offset(this.z7, 34),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  joindialog(t) {
    var s = this.J7.__offset(this.z7, 36),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  buildsuccessdialog(t) {
    var s = this.J7.__offset(this.z7, 38),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  spineatlas(t) {
    var s = this.J7.__offset(this.z7, 40),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  spineskeletondata(t) {
    var s = this.J7.__offset(this.z7, 42),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  smallspineatlas(t) {
    var s = this.J7.__offset(this.z7, 44),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  smallspineskeletondata(t) {
    var s = this.J7.__offset(this.z7, 46),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  portrait(t) {
    var s = this.J7.__offset(this.z7, 48),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.EntrustRole = EntrustRole;
//# sourceMappingURL=EntrustRole.js.map
