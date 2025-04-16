"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcModel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_npc_model_type_js_1 = require("../fb-component/union-npc-model-type.js");
class NpcModel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNpcModel(t, e) {
    return (e || new NpcModel()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcModel(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NpcModel()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  blueprintPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  npcModelType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_npc_model_type_js_1.UnionNpcModelType.NONE;
  }
  npcModel(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  abp(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  battleSockets(t, e) {
    var s = this.bb.__offset(this.bb_pos, 14);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  battleSocketsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  normalSockets(t, e) {
    var s = this.bb.__offset(this.bb_pos, 16);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  normalSocketsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  lookingUpAngle() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  bodyType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  nameZaxisOffset() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startNpcModel(t) {
    t.startObject(10);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBlueprintPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addNpcModelType(t, e) {
    t.addFieldInt8(2, e, union_npc_model_type_js_1.UnionNpcModelType.NONE);
  }
  static addNpcModel(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addAbp(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addBattleSockets(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createBattleSocketsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startBattleSocketsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addNormalSockets(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createNormalSocketsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startNormalSocketsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addLookingUpAngle(t, e) {
    t.addFieldFloat32(7, e, 0);
  }
  static addBodyType(t, e) {
    t.addFieldInt8(8, e, 0);
  }
  static addNameZaxisOffset(t, e) {
    t.addFieldFloat32(9, e, 0);
  }
  static endNpcModel(t) {
    return t.endObject();
  }
  static createNpcModel(t, e, s, i, r, o, c, a, d, h, l) {
    return (
      NpcModel.startNpcModel(t),
      NpcModel.addType(t, e),
      NpcModel.addBlueprintPath(t, s),
      NpcModel.addNpcModelType(t, i),
      NpcModel.addNpcModel(t, r),
      NpcModel.addAbp(t, o),
      NpcModel.addBattleSockets(t, c),
      NpcModel.addNormalSockets(t, a),
      NpcModel.addLookingUpAngle(t, d),
      NpcModel.addBodyType(t, h),
      NpcModel.addNameZaxisOffset(t, l),
      NpcModel.endNpcModel(t)
    );
  }
}
exports.NpcModel = NpcModel;
//# sourceMappingURL=npc-model.js.map
