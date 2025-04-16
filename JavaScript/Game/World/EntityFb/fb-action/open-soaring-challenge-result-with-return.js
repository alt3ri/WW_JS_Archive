"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSoaringChallengeResultWithReturn = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class OpenSoaringChallengeResultWithReturn {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOpenSoaringChallengeResultWithReturn(t, e) {
    return (e || new OpenSoaringChallengeResultWithReturn()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenSoaringChallengeResultWithReturn(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OpenSoaringChallengeResultWithReturn()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  scoreType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  score(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  rankS() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  rankA() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  rankB() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  returnVarType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  returnVar(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startOpenSoaringChallengeResultWithReturn(t) {
    t.startObject(8);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addScoreType(t, e) {
    t.addFieldInt8(1, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addScore(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRankS(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addRankA(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addRankB(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addReturnVarType(t, e) {
    t.addFieldInt8(6, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReturnVar(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static endOpenSoaringChallengeResultWithReturn(t) {
    return t.endObject();
  }
  static createOpenSoaringChallengeResultWithReturn(t, e, r, n, i, s, a, h, u) {
    return (
      OpenSoaringChallengeResultWithReturn.startOpenSoaringChallengeResultWithReturn(
        t,
      ),
      OpenSoaringChallengeResultWithReturn.addType(t, e),
      OpenSoaringChallengeResultWithReturn.addScoreType(t, r),
      OpenSoaringChallengeResultWithReturn.addScore(t, n),
      OpenSoaringChallengeResultWithReturn.addRankS(t, i),
      OpenSoaringChallengeResultWithReturn.addRankA(t, s),
      OpenSoaringChallengeResultWithReturn.addRankB(t, a),
      OpenSoaringChallengeResultWithReturn.addReturnVarType(t, h),
      OpenSoaringChallengeResultWithReturn.addReturnVar(t, u),
      OpenSoaringChallengeResultWithReturn.endOpenSoaringChallengeResultWithReturn(
        t,
      )
    );
  }
}
exports.OpenSoaringChallengeResultWithReturn =
  OpenSoaringChallengeResultWithReturn;
//# sourceMappingURL=open-soaring-challenge-result-with-return.js.map
