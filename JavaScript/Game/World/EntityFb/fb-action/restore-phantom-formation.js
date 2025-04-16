"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RestorePhantomFormation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RestorePhantomFormation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsRestorePhantomFormation(t, o) {
    return (o || new RestorePhantomFormation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRestorePhantomFormation(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new RestorePhantomFormation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  teleportEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  retainPhantom() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startRestorePhantomFormation(t) {
    t.startObject(2);
  }
  static addTeleportEntityId(t, o) {
    t.addFieldInt32(0, o, 0);
  }
  static addRetainPhantom(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static endRestorePhantomFormation(t) {
    return t.endObject();
  }
  static createRestorePhantomFormation(t, o, e) {
    return (
      RestorePhantomFormation.startRestorePhantomFormation(t),
      RestorePhantomFormation.addTeleportEntityId(t, o),
      RestorePhantomFormation.addRetainPhantom(t, e),
      RestorePhantomFormation.endRestorePhantomFormation(t)
    );
  }
}
exports.RestorePhantomFormation = RestorePhantomFormation;
//# sourceMappingURL=restore-phantom-formation.js.map
