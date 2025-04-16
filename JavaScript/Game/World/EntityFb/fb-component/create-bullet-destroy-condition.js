"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreateBulletDestroyCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CreateBulletDestroyCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCreateBulletDestroyCondition(t, e) {
    return (e || new CreateBulletDestroyCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCreateBulletDestroyCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CreateBulletDestroyCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCreateBulletDestroyCondition(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endCreateBulletDestroyCondition(t) {
    return t.endObject();
  }
  static createCreateBulletDestroyCondition(t, e) {
    return (
      CreateBulletDestroyCondition.startCreateBulletDestroyCondition(t),
      CreateBulletDestroyCondition.addType(t, e),
      CreateBulletDestroyCondition.endCreateBulletDestroyCondition(t)
    );
  }
}
exports.CreateBulletDestroyCondition = CreateBulletDestroyCondition;
//# sourceMappingURL=create-bullet-destroy-condition.js.map
