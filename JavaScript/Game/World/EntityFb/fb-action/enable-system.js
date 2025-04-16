"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableSystem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSystem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEnableSystem(t, e) {
    return (e || new EnableSystem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableSystem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EnableSystem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  systemType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEnableSystem(t) {
    t.startObject(2);
  }
  static addSystemType(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsEnable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endEnableSystem(t) {
    return t.endObject();
  }
  static createEnableSystem(t, e, s) {
    return (
      EnableSystem.startEnableSystem(t),
      EnableSystem.addSystemType(t, e),
      EnableSystem.addIsEnable(t, s),
      EnableSystem.endEnableSystem(t)
    );
  }
}
exports.EnableSystem = EnableSystem;
//# sourceMappingURL=enable-system.js.map
