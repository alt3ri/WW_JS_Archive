"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LimitPlayerMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLimitPlayerMove(t, e) {
    return (e || new LimitPlayerMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLimitPlayerMove(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LimitPlayerMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  isOnlyForward() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startLimitPlayerMove(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addIsOnlyForward(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endLimitPlayerMove(t) {
    return t.endObject();
  }
  static createLimitPlayerMove(t, e, i) {
    return (
      LimitPlayerMove.startLimitPlayerMove(t),
      LimitPlayerMove.addType(t, e),
      LimitPlayerMove.addIsOnlyForward(t, i),
      LimitPlayerMove.endLimitPlayerMove(t)
    );
  }
}
exports.LimitPlayerMove = LimitPlayerMove;
//# sourceMappingURL=limit-player-move.js.map
