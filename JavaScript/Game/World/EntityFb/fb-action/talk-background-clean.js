"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkBackgroundClean = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundClean {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsTalkBackgroundClean(a, t) {
    return (t || new TalkBackgroundClean()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsTalkBackgroundClean(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TalkBackgroundClean()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  static startTalkBackgroundClean(a) {
    a.startObject(1);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static endTalkBackgroundClean(a) {
    return a.endObject();
  }
  static createTalkBackgroundClean(a, t) {
    return (
      TalkBackgroundClean.startTalkBackgroundClean(a),
      TalkBackgroundClean.addType(a, t),
      TalkBackgroundClean.endTalkBackgroundClean(a)
    );
  }
}
exports.TalkBackgroundClean = TalkBackgroundClean;
//# sourceMappingURL=talk-background-clean.js.map
