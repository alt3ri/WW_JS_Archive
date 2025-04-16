"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CombatComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsCombatComponent(t, o) {
    return (o || new CombatComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCombatComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new CombatComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCombatComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static endCombatComponent(t) {
    return t.endObject();
  }
  static createCombatComponent(t, o) {
    return (
      CombatComponent.startCombatComponent(t),
      CombatComponent.addDisabled(t, o),
      CombatComponent.endCombatComponent(t)
    );
  }
}
exports.CombatComponent = CombatComponent;
//# sourceMappingURL=combat-component.js.map
