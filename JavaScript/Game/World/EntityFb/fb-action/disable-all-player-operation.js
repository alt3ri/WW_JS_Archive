"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableAllPlayerOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableAllPlayerOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsDisableAllPlayerOperation(e, t) {
    return (t || new DisableAllPlayerOperation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDisableAllPlayerOperation(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableAllPlayerOperation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  displayMode(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startDisableAllPlayerOperation(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addDisplayMode(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endDisableAllPlayerOperation(e) {
    return e.endObject();
  }
  static createDisableAllPlayerOperation(e, t, l) {
    return (
      DisableAllPlayerOperation.startDisableAllPlayerOperation(e),
      DisableAllPlayerOperation.addType(e, t),
      DisableAllPlayerOperation.addDisplayMode(e, l),
      DisableAllPlayerOperation.endDisableAllPlayerOperation(e)
    );
  }
}
exports.DisableAllPlayerOperation = DisableAllPlayerOperation;
//# sourceMappingURL=disable-all-player-operation.js.map
