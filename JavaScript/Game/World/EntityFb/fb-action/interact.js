"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Interact = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Interact {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsInteract(t, r) {
    return (r || new Interact()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteract(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new Interact()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  who() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  param(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startInteract(t) {
    t.startObject(2);
  }
  static addWho(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addParam(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endInteract(t) {
    return t.endObject();
  }
  static createInteract(t, r, e) {
    return (
      Interact.startInteract(t),
      Interact.addWho(t, r),
      Interact.addParam(t, e),
      Interact.endInteract(t)
    );
  }
}
exports.Interact = Interact;
//# sourceMappingURL=interact.js.map
