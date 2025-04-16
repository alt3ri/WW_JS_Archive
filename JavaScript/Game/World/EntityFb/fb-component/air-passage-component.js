"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AirPassageComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AirPassageComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAirPassageComponent(t, s) {
    return (s || new AirPassageComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAirPassageComponent(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AirPassageComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAirPassageComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static endAirPassageComponent(t) {
    return t.endObject();
  }
  static createAirPassageComponent(t, s) {
    return (
      AirPassageComponent.startAirPassageComponent(t),
      AirPassageComponent.addDisabled(t, s),
      AirPassageComponent.endAirPassageComponent(t)
    );
  }
}
exports.AirPassageComponent = AirPassageComponent;
//# sourceMappingURL=air-passage-component.js.map
