"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelQteComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_qte_type_js_1 = require("../fb-component/union-qte-type.js");
class LevelQteComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsLevelQteComponent(e, t) {
    return (t || new LevelQteComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelQteComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new LevelQteComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  qteConfigType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_qte_type_js_1.UnionQteType.NONE;
  }
  qteConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startLevelQteComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addQteConfigType(e, t) {
    e.addFieldInt8(1, t, union_qte_type_js_1.UnionQteType.NONE);
  }
  static addQteConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endLevelQteComponent(e) {
    return e.endObject();
  }
  static createLevelQteComponent(e, t, n, o) {
    return (
      LevelQteComponent.startLevelQteComponent(e),
      LevelQteComponent.addDisabled(e, t),
      LevelQteComponent.addQteConfigType(e, n),
      LevelQteComponent.addQteConfig(e, o),
      LevelQteComponent.endLevelQteComponent(e)
    );
  }
}
exports.LevelQteComponent = LevelQteComponent;
//# sourceMappingURL=level-qte-component.js.map
