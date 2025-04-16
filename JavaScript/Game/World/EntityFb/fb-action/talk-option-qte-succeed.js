"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkOptionQteSucceed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionQteSucceed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTalkOptionQteSucceed(t, e) {
    return (e || new TalkOptionQteSucceed()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTalkOptionQteSucceed(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TalkOptionQteSucceed()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startTalkOptionQteSucceed(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTalkOptionQteSucceed(t) {
    return t.endObject();
  }
  static createTalkOptionQteSucceed(t, e) {
    return (
      TalkOptionQteSucceed.startTalkOptionQteSucceed(t),
      TalkOptionQteSucceed.addType(t, e),
      TalkOptionQteSucceed.endTalkOptionQteSucceed(t)
    );
  }
}
exports.TalkOptionQteSucceed = TalkOptionQteSucceed;
//# sourceMappingURL=talk-option-qte-succeed.js.map
