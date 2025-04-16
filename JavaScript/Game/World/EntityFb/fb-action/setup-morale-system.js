"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetupMoraleSystem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetupMoraleSystem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetupMoraleSystem(t, e) {
    return (e || new SetupMoraleSystem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetupMoraleSystem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetupMoraleSystem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  moralePlayId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isOn() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetupMoraleSystem(t) {
    t.startObject(2);
  }
  static addMoralePlayId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsOn(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endSetupMoraleSystem(t) {
    return t.endObject();
  }
  static createSetupMoraleSystem(t, e, s) {
    return (
      SetupMoraleSystem.startSetupMoraleSystem(t),
      SetupMoraleSystem.addMoralePlayId(t, e),
      SetupMoraleSystem.addIsOn(t, s),
      SetupMoraleSystem.endSetupMoraleSystem(t)
    );
  }
}
exports.SetupMoraleSystem = SetupMoraleSystem;
//# sourceMappingURL=setup-morale-system.js.map
