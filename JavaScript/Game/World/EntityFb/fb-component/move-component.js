"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MoveComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMoveComponent(t, e) {
    return (e || new MoveComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMoveComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MoveComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initSpeed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startMoveComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addInitSpeed(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endMoveComponent(t) {
    return t.endObject();
  }
  static createMoveComponent(t, e, o) {
    return (
      MoveComponent.startMoveComponent(t),
      MoveComponent.addDisabled(t, e),
      MoveComponent.addInitSpeed(t, o),
      MoveComponent.endMoveComponent(t)
    );
  }
}
exports.MoveComponent = MoveComponent;
//# sourceMappingURL=move-component.js.map
