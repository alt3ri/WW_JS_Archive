"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlashBuffToItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SlashBuffToItem {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Season() {
    return this.season();
  }
  get ItemId() {
    return this.itemid();
  }
  get Tips() {
    return this.tips();
  }
  get Unlimited() {
    return this.unlimited();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsLength(),
      this.buffids,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSlashBuffToItem(t, s) {
    return (s || new SlashBuffToItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  season() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tips() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlimited() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var s = this.J7.__offset(this.z7, 14);
    return s
      ? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
      : BigInt(0);
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.SlashBuffToItem = SlashBuffToItem;
//# sourceMappingURL=SlashBuffToItem.js.map
