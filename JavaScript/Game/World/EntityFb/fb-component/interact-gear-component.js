"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractGearComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractGearComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInteractGearComponent(t, e) {
    return (e || new InteractGearComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractGearComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InteractGearComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  normalPrepareTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  activePrepareTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startInteractGearComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addNormalPrepareTime(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addActivePrepareTime(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endInteractGearComponent(t) {
    return t.endObject();
  }
  static createInteractGearComponent(t, e, r, a) {
    return (
      InteractGearComponent.startInteractGearComponent(t),
      InteractGearComponent.addDisabled(t, e),
      InteractGearComponent.addNormalPrepareTime(t, r),
      InteractGearComponent.addActivePrepareTime(t, a),
      InteractGearComponent.endInteractGearComponent(t)
    );
  }
}
exports.InteractGearComponent = InteractGearComponent;
//# sourceMappingURL=interact-gear-component.js.map
