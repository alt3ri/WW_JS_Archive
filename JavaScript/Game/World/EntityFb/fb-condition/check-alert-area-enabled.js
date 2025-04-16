"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckAlertAreaEnabled = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckAlertAreaEnabled {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckAlertAreaEnabled(e, t) {
    return (t || new CheckAlertAreaEnabled()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckAlertAreaEnabled(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckAlertAreaEnabled()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  areaId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCheckAlertAreaEnabled(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addAreaId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCheckAlertAreaEnabled(e) {
    return e.endObject();
  }
  static createCheckAlertAreaEnabled(e, t, r) {
    return (
      CheckAlertAreaEnabled.startCheckAlertAreaEnabled(e),
      CheckAlertAreaEnabled.addType(e, t),
      CheckAlertAreaEnabled.addAreaId(e, r),
      CheckAlertAreaEnabled.endCheckAlertAreaEnabled(e)
    );
  }
}
exports.CheckAlertAreaEnabled = CheckAlertAreaEnabled;
//# sourceMappingURL=check-alert-area-enabled.js.map
