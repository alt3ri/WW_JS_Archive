"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BatchBulletItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  batch_bullet_caster_js_1 = require("../fb-component/batch-bullet-caster.js");
class BatchBulletItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBatchBulletItem(t, e) {
    return (e || new BatchBulletItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBatchBulletItem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BatchBulletItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  casterList(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (e || new batch_bullet_caster_js_1.BatchBulletCaster()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  casterListLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startBatchBulletItem(t) {
    t.startObject(2);
  }
  static addTime(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addCasterList(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createCasterListVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startCasterListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endBatchBulletItem(t) {
    return t.endObject();
  }
  static createBatchBulletItem(t, e, s) {
    return (
      BatchBulletItem.startBatchBulletItem(t),
      BatchBulletItem.addTime(t, e),
      BatchBulletItem.addCasterList(t, s),
      BatchBulletItem.endBatchBulletItem(t)
    );
  }
}
exports.BatchBulletItem = BatchBulletItem;
//# sourceMappingURL=batch-bullet-item.js.map
