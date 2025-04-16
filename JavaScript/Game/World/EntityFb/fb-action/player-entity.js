"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayerEntity(t, e) {
    return (e || new PlayerEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayerEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayerEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPlayerEntity(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPlayerEntity(t) {
    return t.endObject();
  }
  static createPlayerEntity(t, e) {
    return (
      PlayerEntity.startPlayerEntity(t),
      PlayerEntity.addType(t, e),
      PlayerEntity.endPlayerEntity(t)
    );
  }
}
exports.PlayerEntity = PlayerEntity;
//# sourceMappingURL=player-entity.js.map
