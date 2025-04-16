"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkOptionQteFailed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteFailed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTalkOptionQteFailed(t, e) {
    return (e || new TalkOptionQteFailed()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTalkOptionQteFailed(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TalkOptionQteFailed()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startTalkOptionQteFailed(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTalkOptionQteFailed(t) {
    return t.endObject();
  }
  static createTalkOptionQteFailed(t, e) {
    return (
      TalkOptionQteFailed.startTalkOptionQteFailed(t),
      TalkOptionQteFailed.addType(t, e),
      TalkOptionQteFailed.endTalkOptionQteFailed(t)
    );
  }
}
exports.TalkOptionQteFailed = TalkOptionQteFailed;
//# sourceMappingURL=talk-option-qte-failed.js.map
