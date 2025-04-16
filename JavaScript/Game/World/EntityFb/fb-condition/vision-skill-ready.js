"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkillReady = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionSkillReady {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsVisionSkillReady(i, t) {
    return (t || new VisionSkillReady()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsVisionSkillReady(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VisionSkillReady()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startVisionSkillReady(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endVisionSkillReady(i) {
    return i.endObject();
  }
  static createVisionSkillReady(i, t) {
    return (
      VisionSkillReady.startVisionSkillReady(i),
      VisionSkillReady.addType(i, t),
      VisionSkillReady.endVisionSkillReady(i)
    );
  }
}
exports.VisionSkillReady = VisionSkillReady;
//# sourceMappingURL=vision-skill-ready.js.map
