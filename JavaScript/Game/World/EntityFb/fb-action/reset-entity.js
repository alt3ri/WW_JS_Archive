"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_reset_entity_config_js_1 = require("../fb-action/union-reset-entity-config.js");
class ResetEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsResetEntity(t, e) {
    return (e || new ResetEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsResetEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ResetEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  resetEntityConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_reset_entity_config_js_1.UnionResetEntityConfig.NONE;
  }
  resetEntityConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startResetEntity(t) {
    t.startObject(2);
  }
  static addResetEntityConfigType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_reset_entity_config_js_1.UnionResetEntityConfig.NONE,
    );
  }
  static addResetEntityConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endResetEntity(t) {
    return t.endObject();
  }
  static createResetEntity(t, e, i) {
    return (
      ResetEntity.startResetEntity(t),
      ResetEntity.addResetEntityConfigType(t, e),
      ResetEntity.addResetEntityConfig(t, i),
      ResetEntity.endResetEntity(t)
    );
  }
}
exports.ResetEntity = ResetEntity;
//# sourceMappingURL=reset-entity.js.map
