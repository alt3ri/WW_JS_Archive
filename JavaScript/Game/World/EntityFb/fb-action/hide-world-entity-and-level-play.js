"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideWorldEntityAndLevelPlay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideWorldEntityAndLevelPlay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHideWorldEntityAndLevelPlay(t, e) {
    return (e || new HideWorldEntityAndLevelPlay()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHideWorldEntityAndLevelPlay(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HideWorldEntityAndLevelPlay()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  excludeEntities(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  excludeEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  excludeEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startHideWorldEntityAndLevelPlay(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addExcludeEntities(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createExcludeEntitiesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startExcludeEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endHideWorldEntityAndLevelPlay(t) {
    return t.endObject();
  }
  static createHideWorldEntityAndLevelPlay(t, e, i) {
    return (
      HideWorldEntityAndLevelPlay.startHideWorldEntityAndLevelPlay(t),
      HideWorldEntityAndLevelPlay.addType(t, e),
      HideWorldEntityAndLevelPlay.addExcludeEntities(t, i),
      HideWorldEntityAndLevelPlay.endHideWorldEntityAndLevelPlay(t)
    );
  }
}
exports.HideWorldEntityAndLevelPlay = HideWorldEntityAndLevelPlay;
//# sourceMappingURL=hide-world-entity-and-level-play.js.map
