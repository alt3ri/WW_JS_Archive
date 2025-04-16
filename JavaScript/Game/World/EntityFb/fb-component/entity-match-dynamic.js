"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityMatchDynamic = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  dynamic_entity_match_js_1 = require("../fb-component/dynamic-entity-match.js");
class EntityMatchDynamic {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityMatchDynamic(t, i) {
    return (i || new EntityMatchDynamic()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityMatchDynamic(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityMatchDynamic()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  matchEntity(t, i) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a
      ? (i || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  matchEntityLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEntityMatchDynamic(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMatchEntity(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createMatchEntityVector(i, a) {
    i.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) i.addOffset(a[t]);
    return i.endVector();
  }
  static startMatchEntityVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEntityMatchDynamic(t) {
    return t.endObject();
  }
  static createEntityMatchDynamic(t, i, a) {
    return (
      EntityMatchDynamic.startEntityMatchDynamic(t),
      EntityMatchDynamic.addType(t, i),
      EntityMatchDynamic.addMatchEntity(t, a),
      EntityMatchDynamic.endEntityMatchDynamic(t)
    );
  }
}
exports.EntityMatchDynamic = EntityMatchDynamic;
//# sourceMappingURL=entity-match-dynamic.js.map
