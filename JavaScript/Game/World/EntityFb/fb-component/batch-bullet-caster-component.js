"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BatchBulletCasterComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_rot_js_1 = require("../fb-action/pos-rot.js"),
  batch_bullet_item_js_1 = require("../fb-component/batch-bullet-item.js");
class BatchBulletCasterComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBatchBulletCasterComponent(t, e) {
    return (e || new BatchBulletCasterComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBatchBulletCasterComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BatchBulletCasterComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  warningEffect(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  movementType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  bulletList(t, e) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (e || new pos_rot_js_1.PosRot()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  bulletListLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  batchList(t, e) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (e || new batch_bullet_item_js_1.BatchBulletItem()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  batchListLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startBatchBulletCasterComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addWarningEffect(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addMovementType(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static addBulletList(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createBulletListVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startBulletListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addBatchList(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createBatchListVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startBatchListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endBatchBulletCasterComponent(t) {
    return t.endObject();
  }
  static createBatchBulletCasterComponent(t, e, s, r, i, a) {
    return (
      BatchBulletCasterComponent.startBatchBulletCasterComponent(t),
      BatchBulletCasterComponent.addDisabled(t, e),
      BatchBulletCasterComponent.addWarningEffect(t, s),
      BatchBulletCasterComponent.addMovementType(t, r),
      BatchBulletCasterComponent.addBulletList(t, i),
      BatchBulletCasterComponent.addBatchList(t, a),
      BatchBulletCasterComponent.endBatchBulletCasterComponent(t)
    );
  }
}
exports.BatchBulletCasterComponent = BatchBulletCasterComponent;
//# sourceMappingURL=batch-bullet-caster-component.js.map
