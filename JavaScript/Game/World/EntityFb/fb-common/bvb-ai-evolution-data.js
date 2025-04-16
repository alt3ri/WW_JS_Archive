"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiEvolutionData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiEvolutionData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsBvbAiEvolutionData(t, i) {
    return (i || new BvbAiEvolutionData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiEvolutionData(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new BvbAiEvolutionData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  fetchHandCardType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  fetchHandCard(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  fetchDeployedCardType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  fetchDeployedCard(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startBvbAiEvolutionData(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addFetchHandCardType(t, i) {
    t.addFieldInt8(1, i, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addFetchHandCard(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addFetchDeployedCardType(t, i) {
    t.addFieldInt8(3, i, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addFetchDeployedCard(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endBvbAiEvolutionData(t) {
    return t.endObject();
  }
  static createBvbAiEvolutionData(t, i, a, e, r, s) {
    return (
      BvbAiEvolutionData.startBvbAiEvolutionData(t),
      BvbAiEvolutionData.addType(t, i),
      BvbAiEvolutionData.addFetchHandCardType(t, a),
      BvbAiEvolutionData.addFetchHandCard(t, e),
      BvbAiEvolutionData.addFetchDeployedCardType(t, r),
      BvbAiEvolutionData.addFetchDeployedCard(t, s),
      BvbAiEvolutionData.endBvbAiEvolutionData(t)
    );
  }
}
exports.BvbAiEvolutionData = BvbAiEvolutionData;
//# sourceMappingURL=bvb-ai-evolution-data.js.map
