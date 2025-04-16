"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class WeaponComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsWeaponComponent(t, e) {
    return (e || new WeaponComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWeaponComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new WeaponComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  weaponId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startWeaponComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addWeaponId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endWeaponComponent(t) {
    return t.endObject();
  }
  static createWeaponComponent(t, e, n) {
    return (
      WeaponComponent.startWeaponComponent(t),
      WeaponComponent.addDisabled(t, e),
      WeaponComponent.addWeaponId(t, n),
      WeaponComponent.endWeaponComponent(t)
    );
  }
}
exports.WeaponComponent = WeaponComponent;
//# sourceMappingURL=weapon-component.js.map
