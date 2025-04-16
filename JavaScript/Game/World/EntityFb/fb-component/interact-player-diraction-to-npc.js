"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractPlayerDiractionToNpc = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractPlayerDiractionToNpc {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsInteractPlayerDiractionToNpc(t, r) {
    return (r || new InteractPlayerDiractionToNpc()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractPlayerDiractionToNpc(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new InteractPlayerDiractionToNpc()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startInteractPlayerDiractionToNpc(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endInteractPlayerDiractionToNpc(t) {
    return t.endObject();
  }
  static createInteractPlayerDiractionToNpc(t, r) {
    return (
      InteractPlayerDiractionToNpc.startInteractPlayerDiractionToNpc(t),
      InteractPlayerDiractionToNpc.addType(t, r),
      InteractPlayerDiractionToNpc.endInteractPlayerDiractionToNpc(t)
    );
  }
}
exports.InteractPlayerDiractionToNpc = InteractPlayerDiractionToNpc;
//# sourceMappingURL=interact-player-diraction-to-npc.js.map
