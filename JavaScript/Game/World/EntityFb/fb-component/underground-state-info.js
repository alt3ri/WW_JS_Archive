"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UndergroundStateInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class UndergroundStateInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsUndergroundStateInfo(t, e) {
    return (e || new UndergroundStateInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUndergroundStateInfo(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new UndergroundStateInfo()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  restartPos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startUndergroundStateInfo(t) {
    t.startObject(2);
  }
  static addStateId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addRestartPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endUndergroundStateInfo(t) {
    return t.endObject();
  }
}
exports.UndergroundStateInfo = UndergroundStateInfo;
//# sourceMappingURL=underground-state-info.js.map
