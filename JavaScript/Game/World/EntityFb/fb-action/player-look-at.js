"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerLookAt = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PlayerLookAt {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayerLookAt(t, e) {
    return (e || new PlayerLookAt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayerLookAt(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayerLookAt()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraMove() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPlayerLookAt(t) {
    t.startObject(2);
  }
  static addPos(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCameraMove(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endPlayerLookAt(t) {
    return t.endObject();
  }
  static createPlayerLookAt(t, e, r) {
    return (
      PlayerLookAt.startPlayerLookAt(t),
      PlayerLookAt.addPos(t, e),
      PlayerLookAt.addCameraMove(t, r),
      PlayerLookAt.endPlayerLookAt(t)
    );
  }
}
exports.PlayerLookAt = PlayerLookAt;
//# sourceMappingURL=player-look-at.js.map
