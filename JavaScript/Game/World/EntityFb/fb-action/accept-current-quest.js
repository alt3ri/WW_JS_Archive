"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AcceptCurrentQuest = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcceptCurrentQuest {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAcceptCurrentQuest(t, e) {
    return (e || new AcceptCurrentQuest()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAcceptCurrentQuest(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AcceptCurrentQuest()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startAcceptCurrentQuest(t) {
    t.startObject(0);
  }
  static endAcceptCurrentQuest(t) {
    return t.endObject();
  }
  static createAcceptCurrentQuest(t) {
    return (
      AcceptCurrentQuest.startAcceptCurrentQuest(t),
      AcceptCurrentQuest.endAcceptCurrentQuest(t)
    );
  }
}
exports.AcceptCurrentQuest = AcceptCurrentQuest;
//# sourceMappingURL=accept-current-quest.js.map
