"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TelePortAfterTimeOut = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TelePortAfterTimeOut {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTelePortAfterTimeOut(t, e) {
    return (e || new TelePortAfterTimeOut()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTelePortAfterTimeOut(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TelePortAfterTimeOut()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  timeOut() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTelePortAfterTimeOut(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addTimeOut(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endTelePortAfterTimeOut(t) {
    return t.endObject();
  }
  static createTelePortAfterTimeOut(t, e, r) {
    return (
      TelePortAfterTimeOut.startTelePortAfterTimeOut(t),
      TelePortAfterTimeOut.addType(t, e),
      TelePortAfterTimeOut.addTimeOut(t, r),
      TelePortAfterTimeOut.endTelePortAfterTimeOut(t)
    );
  }
}
exports.TelePortAfterTimeOut = TelePortAfterTimeOut;
//# sourceMappingURL=tele-port-after-time-out.js.map
