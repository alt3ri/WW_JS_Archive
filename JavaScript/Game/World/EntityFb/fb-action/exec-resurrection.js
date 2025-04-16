"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecResurrection = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExecResurrection {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsExecResurrection(e, t) {
    return (t || new ExecResurrection()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsExecResurrection(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ExecResurrection()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  reviveId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startExecResurrection(e) {
    e.startObject(1);
  }
  static addReviveId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static endExecResurrection(e) {
    return e.endObject();
  }
  static createExecResurrection(e, t) {
    return (
      ExecResurrection.startExecResurrection(e),
      ExecResurrection.addReviveId(e, t),
      ExecResurrection.endExecResurrection(e)
    );
  }
}
exports.ExecResurrection = ExecResurrection;
//# sourceMappingURL=exec-resurrection.js.map
