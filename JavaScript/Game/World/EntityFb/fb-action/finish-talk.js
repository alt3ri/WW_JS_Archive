"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FinishTalk = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishTalk {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsFinishTalk(i, t) {
    return (t || new FinishTalk()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsFinishTalk(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FinishTalk()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  static startFinishTalk(i) {
    i.startObject(0);
  }
  static endFinishTalk(i) {
    return i.endObject();
  }
  static createFinishTalk(i) {
    return FinishTalk.startFinishTalk(i), FinishTalk.endFinishTalk(i);
  }
}
exports.FinishTalk = FinishTalk;
//# sourceMappingURL=finish-talk.js.map
