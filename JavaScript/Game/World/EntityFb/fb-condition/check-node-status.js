"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckNodeStatus = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckNodeStatus {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckNodeStatus(t, e) {
    return (e || new CheckNodeStatus()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckNodeStatus(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckNodeStatus()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  nodeId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  status() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startCheckNodeStatus(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addNodeId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addStatus(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static endCheckNodeStatus(t) {
    return t.endObject();
  }
  static createCheckNodeStatus(t, e, s, a) {
    return (
      CheckNodeStatus.startCheckNodeStatus(t),
      CheckNodeStatus.addType(t, e),
      CheckNodeStatus.addNodeId(t, s),
      CheckNodeStatus.addStatus(t, a),
      CheckNodeStatus.endCheckNodeStatus(t)
    );
  }
}
exports.CheckNodeStatus = CheckNodeStatus;
//# sourceMappingURL=check-node-status.js.map
