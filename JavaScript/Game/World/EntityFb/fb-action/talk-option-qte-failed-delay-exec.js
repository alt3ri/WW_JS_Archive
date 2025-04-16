"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkOptionQteFailedDelayExec = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteFailedDelayExec {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTalkOptionQteFailedDelayExec(e, t) {
    return (t || new TalkOptionQteFailedDelayExec()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTalkOptionQteFailedDelayExec(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TalkOptionQteFailedDelayExec()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startTalkOptionQteFailedDelayExec(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endTalkOptionQteFailedDelayExec(e) {
    return e.endObject();
  }
  static createTalkOptionQteFailedDelayExec(e, t) {
    return (
      TalkOptionQteFailedDelayExec.startTalkOptionQteFailedDelayExec(e),
      TalkOptionQteFailedDelayExec.addType(e, t),
      TalkOptionQteFailedDelayExec.endTalkOptionQteFailedDelayExec(e)
    );
  }
}
exports.TalkOptionQteFailedDelayExec = TalkOptionQteFailedDelayExec;
//# sourceMappingURL=talk-option-qte-failed-delay-exec.js.map
