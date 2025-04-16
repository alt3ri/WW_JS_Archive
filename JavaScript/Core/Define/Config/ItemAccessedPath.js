"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemAccessedPath = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ItemAccessedPath {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GiftItemGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.giftitemgroupLength(),
      this.giftitemgroup,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsItemAccessedPath(t, s) {
    return (s || new ItemAccessedPath()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetGiftitemgroupAt(t) {
    return this.giftitemgroup(t);
  }
  giftitemgroup(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  giftitemgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  giftitemgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.ItemAccessedPath = ItemAccessedPath;
//# sourceMappingURL=ItemAccessedPath.js.map
