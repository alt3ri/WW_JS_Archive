"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapMarkPhantomGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MapMarkPhantomGroup {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MarkId() {
    return this.markid();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showrangeLength(),
      this.showrange,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsMapMarkPhantomGroup(t, s) {
    return (s || new MapMarkPhantomGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showrangeArray() {
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
exports.MapMarkPhantomGroup = MapMarkPhantomGroup;
//# sourceMappingURL=MapMarkPhantomGroup.js.map
