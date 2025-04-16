"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueGotoNextFloor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueGotoNextFloor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsRogueGotoNextFloor(o, t) {
    return (t || new RogueGotoNextFloor()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsRogueGotoNextFloor(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RogueGotoNextFloor()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  static startRogueGotoNextFloor(o) {
    o.startObject(0);
  }
  static endRogueGotoNextFloor(o) {
    return o.endObject();
  }
  static createRogueGotoNextFloor(o) {
    return (
      RogueGotoNextFloor.startRogueGotoNextFloor(o),
      RogueGotoNextFloor.endRogueGotoNextFloor(o)
    );
  }
}
exports.RogueGotoNextFloor = RogueGotoNextFloor;
//# sourceMappingURL=rogue-goto-next-floor.js.map
