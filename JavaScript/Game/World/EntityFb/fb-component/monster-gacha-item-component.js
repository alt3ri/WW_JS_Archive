"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterGachaItemComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MonsterGachaItemComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMonsterGachaItemComponent(t, e) {
    return (e || new MonsterGachaItemComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonsterGachaItemComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MonsterGachaItemComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  materialDataPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  monsterType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  monsterEntityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  monsterEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  monsterEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startMonsterGachaItemComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addMaterialDataPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addMonsterType(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static addMonsterEntityIds(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createMonsterEntityIdsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addInt32(s[t]);
    return e.endVector();
  }
  static startMonsterEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endMonsterGachaItemComponent(t) {
    return t.endObject();
  }
  static createMonsterGachaItemComponent(t, e, s, n, r) {
    return (
      MonsterGachaItemComponent.startMonsterGachaItemComponent(t),
      MonsterGachaItemComponent.addDisabled(t, e),
      MonsterGachaItemComponent.addMaterialDataPath(t, s),
      MonsterGachaItemComponent.addMonsterType(t, n),
      MonsterGachaItemComponent.addMonsterEntityIds(t, r),
      MonsterGachaItemComponent.endMonsterGachaItemComponent(t)
    );
  }
}
exports.MonsterGachaItemComponent = MonsterGachaItemComponent;
//# sourceMappingURL=monster-gacha-item-component.js.map
