"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemMainType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ItemMainType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get bShowInInventoryView() {
    return this.bshowininventoryview();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get IconFirstAchieve() {
    return this.iconfirstachieve();
  }
  get PackageId() {
    return this.packageid();
  }
  get bShowDescompose() {
    return this.bshowdescompose();
  }
  get SequenceId() {
    return this.sequenceid();
  }
  get UseWayId() {
    return this.usewayid();
  }
  get DestroyUseWayId() {
    return this.destroyusewayid();
  }
  get bFilterSortVisible() {
    return this.bfiltersortvisible();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsItemMainType(t, i) {
    return (i || new ItemMainType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bshowininventoryview() {
    var t = this.J7.__offset(this.z7, 6);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  iconfirstachieve(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  packageid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bshowdescompose() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  sequenceid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  usewayid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  destroyusewayid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bfiltersortvisible() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ItemMainType = ItemMainType;
//# sourceMappingURL=ItemMainType.js.map
