"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  state_info_js_1 = require("../fb-action/state-info.js"),
  union_var_context_js_1 = require("../fb-action/union-var-context.js");
class FlowInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFlowInfo(t, e) {
    return (e || new FlowInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFlowInfo(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FlowInfo()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  objType(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  children(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  childrenLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  reference(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  referenceLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  weakReference(t, e) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  weakReferenceLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  dungeonId() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  varContextType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_context_js_1.UnionVarContext.NONE;
  }
  varContext(t) {
    var e = this.bb.__offset(this.bb_pos, 22);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  states(t, e) {
    var s = this.bb.__offset(this.bb_pos, 24);
    return s
      ? (e || new state_info_js_1.StateInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  statesLength() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFlowInfo(t) {
    t.startObject(11);
  }
  static addObjType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addChildren(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createChildrenVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startChildrenVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addReference(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createReferenceVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startReferenceVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addWeakReference(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createWeakReferenceVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startWeakReferenceVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addId(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addName(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addDungeonId(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static addFolded(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static addVarContextType(t, e) {
    t.addFieldInt8(8, e, union_var_context_js_1.UnionVarContext.NONE);
  }
  static addVarContext(t, e) {
    t.addFieldOffset(9, e, 0);
  }
  static addStates(t, e) {
    t.addFieldOffset(10, e, 0);
  }
  static createStatesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFlowInfo(t) {
    return t.endObject();
  }
  static createFlowInfo(t, e, s, i, r, n, o, a, h, c, f, d) {
    return (
      FlowInfo.startFlowInfo(t),
      FlowInfo.addObjType(t, e),
      FlowInfo.addChildren(t, s),
      FlowInfo.addReference(t, i),
      FlowInfo.addWeakReference(t, r),
      FlowInfo.addId(t, n),
      FlowInfo.addName(t, o),
      FlowInfo.addDungeonId(t, a),
      FlowInfo.addFolded(t, h),
      FlowInfo.addVarContextType(t, c),
      FlowInfo.addVarContext(t, f),
      FlowInfo.addStates(t, d),
      FlowInfo.endFlowInfo(t)
    );
  }
}
exports.FlowInfo = FlowInfo;
//# sourceMappingURL=flow-info.js.map
