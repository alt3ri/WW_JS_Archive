"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelfEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SelfEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSelfEntity(t, e) {
    return (e || new SelfEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSelfEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SelfEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSelfEntity(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSelfEntity(t) {
    return t.endObject();
  }
  static createSelfEntity(t, e) {
    return (
      SelfEntity.startSelfEntity(t),
      SelfEntity.addType(t, e),
      SelfEntity.endSelfEntity(t)
    );
  }
}
exports.SelfEntity = SelfEntity;
//# sourceMappingURL=self-entity.js.map
