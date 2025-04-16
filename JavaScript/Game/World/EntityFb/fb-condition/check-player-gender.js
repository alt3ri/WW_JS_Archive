"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerGender = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckPlayerGender {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsCheckPlayerGender(e, r) {
    return (r || new CheckPlayerGender()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckPlayerGender(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new CheckPlayerGender()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  gender(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  static startCheckPlayerGender(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addGender(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static endCheckPlayerGender(e) {
    return e.endObject();
  }
  static createCheckPlayerGender(e, r, t) {
    return (
      CheckPlayerGender.startCheckPlayerGender(e),
      CheckPlayerGender.addType(e, r),
      CheckPlayerGender.addGender(e, t),
      CheckPlayerGender.endCheckPlayerGender(e)
    );
  }
}
exports.CheckPlayerGender = CheckPlayerGender;
//# sourceMappingURL=check-player-gender.js.map
