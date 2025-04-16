"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevitateMagnetComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevitateMagnetComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLevitateMagnetComponent(t, e) {
    return (e || new LevitateMagnetComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLevitateMagnetComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LevitateMagnetComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  moveSpeed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  test() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startLevitateMagnetComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addMoveSpeed(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addTest(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endLevitateMagnetComponent(t) {
    return t.endObject();
  }
  static createLevitateMagnetComponent(t, e, n, a) {
    return (
      LevitateMagnetComponent.startLevitateMagnetComponent(t),
      LevitateMagnetComponent.addDisabled(t, e),
      LevitateMagnetComponent.addMoveSpeed(t, n),
      LevitateMagnetComponent.addTest(t, a),
      LevitateMagnetComponent.endLevitateMagnetComponent(t)
    );
  }
}
exports.LevitateMagnetComponent = LevitateMagnetComponent;
//# sourceMappingURL=levitate-magnet-component.js.map
