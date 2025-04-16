"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkOptionQteSucceedDelayExec = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteSucceedDelayExec {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTalkOptionQteSucceedDelayExec(e, t) {
    return (t || new TalkOptionQteSucceedDelayExec()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTalkOptionQteSucceedDelayExec(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TalkOptionQteSucceedDelayExec()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startTalkOptionQteSucceedDelayExec(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endTalkOptionQteSucceedDelayExec(e) {
    return e.endObject();
  }
  static createTalkOptionQteSucceedDelayExec(e, t) {
    return (
      TalkOptionQteSucceedDelayExec.startTalkOptionQteSucceedDelayExec(e),
      TalkOptionQteSucceedDelayExec.addType(e, t),
      TalkOptionQteSucceedDelayExec.endTalkOptionQteSucceedDelayExec(e)
    );
  }
}
exports.TalkOptionQteSucceedDelayExec = TalkOptionQteSucceedDelayExec;
//# sourceMappingURL=talk-option-qte-succeed-delay-exec.js.map
