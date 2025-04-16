"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RandomEntityRefreshContent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RandomEntityRefreshContent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRandomEntityRefreshContent(t, e) {
    return (e || new RandomEntityRefreshContent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRandomEntityRefreshContent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RandomEntityRefreshContent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startRandomEntityRefreshContent(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityIdsVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) e.addInt32(n[t]);
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endRandomEntityRefreshContent(t) {
    return t.endObject();
  }
  static createRandomEntityRefreshContent(t, e, n) {
    return (
      RandomEntityRefreshContent.startRandomEntityRefreshContent(t),
      RandomEntityRefreshContent.addType(t, e),
      RandomEntityRefreshContent.addEntityIds(t, n),
      RandomEntityRefreshContent.endRandomEntityRefreshContent(t)
    );
  }
}
exports.RandomEntityRefreshContent = RandomEntityRefreshContent;
//# sourceMappingURL=random-entity-refresh-content.js.map
