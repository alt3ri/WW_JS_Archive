"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RotatorComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  event_rotator_js_1 = require("../fb-component/event-rotator.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class RotatorComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsRotatorComponent(t, i) {
    return (i || new RotatorComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRotatorComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RotatorComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  content(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  icon(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  rotatorSpeed(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  locationOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  rotationOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  rotationMapping(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  isLocalSpace() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isRotatorSelf() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  interactAction(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (t || new event_rotator_js_1.EventRotator()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  isLockZ() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isRecovery() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startRotatorComponent(t) {
    t.startObject(13);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addContent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIcon(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addRotatorSpeed(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addLocationOffset(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addRotationOffset(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addRotationMapping(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addIsLocalSpace(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(8, i, 0);
  }
  static addIsRotatorSelf(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addInteractAction(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addIsLockZ(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static addIsRecovery(t, i) {
    t.addFieldInt8(12, +i, 0);
  }
  static endRotatorComponent(t) {
    return t.endObject();
  }
}
exports.RotatorComponent = RotatorComponent;
//# sourceMappingURL=rotator-component.js.map
