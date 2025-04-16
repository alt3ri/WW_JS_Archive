"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpawnChild = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  transform_js_1 = require("../fb-action/transform.js");
class SpawnChild {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsSpawnChild(t, s) {
    return (s || new SpawnChild()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSpawnChild(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new SpawnChild()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  templateGuid(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  transform(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new transform_js_1.Transform()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startSpawnChild(t) {
    t.startObject(2);
  }
  static addTemplateGuid(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addTransform(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endSpawnChild(t) {
    return t.endObject();
  }
}
exports.SpawnChild = SpawnChild;
//# sourceMappingURL=spawn-child.js.map
