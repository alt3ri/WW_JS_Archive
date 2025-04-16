"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraAiAlert = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExtraAiAlert {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsExtraAiAlert(t, r) {
    return (r || new ExtraAiAlert()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExtraAiAlert(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ExtraAiAlert()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  moveAlert() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  stopAlert() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startExtraAiAlert(t) {
    t.startObject(2);
  }
  static addMoveAlert(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addStopAlert(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endExtraAiAlert(t) {
    return t.endObject();
  }
  static createExtraAiAlert(t, r, e) {
    return (
      ExtraAiAlert.startExtraAiAlert(t),
      ExtraAiAlert.addMoveAlert(t, r),
      ExtraAiAlert.addStopAlert(t, e),
      ExtraAiAlert.endExtraAiAlert(t)
    );
  }
}
exports.ExtraAiAlert = ExtraAiAlert;
//# sourceMappingURL=extra-ai-alert.js.map
