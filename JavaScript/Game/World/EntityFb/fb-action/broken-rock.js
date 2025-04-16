"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrokenRock = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BrokenRock {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBrokenRock(t, e) {
    return (e || new BrokenRock()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBrokenRock(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BrokenRock()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBrokenRock(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endBrokenRock(t) {
    return t.endObject();
  }
  static createBrokenRock(t, e, r) {
    return (
      BrokenRock.startBrokenRock(t),
      BrokenRock.addType(t, e),
      BrokenRock.addId(t, r),
      BrokenRock.endBrokenRock(t)
    );
  }
}
exports.BrokenRock = BrokenRock;
//# sourceMappingURL=broken-rock.js.map
