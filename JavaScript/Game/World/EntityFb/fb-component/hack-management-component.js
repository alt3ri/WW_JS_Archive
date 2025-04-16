"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HackManagementComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HackManagementComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHackManagementComponent(t, e) {
    return (e || new HackManagementComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHackManagementComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HackManagementComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  maxHackingCount() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  validDistance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startHackManagementComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addMaxHackingCount(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addValidDistance(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endHackManagementComponent(t) {
    return t.endObject();
  }
  static createHackManagementComponent(t, e, n, a) {
    return (
      HackManagementComponent.startHackManagementComponent(t),
      HackManagementComponent.addDisabled(t, e),
      HackManagementComponent.addMaxHackingCount(t, n),
      HackManagementComponent.addValidDistance(t, a),
      HackManagementComponent.endHackManagementComponent(t)
    );
  }
}
exports.HackManagementComponent = HackManagementComponent;
//# sourceMappingURL=hack-management-component.js.map
