"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenLevelQte = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class OpenLevelQte {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsOpenLevelQte(e, t) {
    return (t || new OpenLevelQte()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsOpenLevelQte(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new OpenLevelQte()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  levelQteEntityType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  levelQteEntity(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startOpenLevelQte(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addLevelQteEntityType(e, t) {
    e.addFieldInt8(1, t, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addLevelQteEntity(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endOpenLevelQte(e) {
    return e.endObject();
  }
  static createOpenLevelQte(e, t, i, s) {
    return (
      OpenLevelQte.startOpenLevelQte(e),
      OpenLevelQte.addType(e, t),
      OpenLevelQte.addLevelQteEntityType(e, i),
      OpenLevelQte.addLevelQteEntity(e, s),
      OpenLevelQte.endOpenLevelQte(e)
    );
  }
}
exports.OpenLevelQte = OpenLevelQte;
//# sourceMappingURL=open-level-qte.js.map
