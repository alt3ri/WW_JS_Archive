"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActionInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_action_params0_js_1 = require("../fb-action/union-action-params0.js"),
  union_action_params1_js_1 = require("../fb-action/union-action-params1.js");
class ActionInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsActionInfo(t, i) {
    return (i || new ActionInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActionInfo(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ActionInfo()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  name(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  async() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  paramsExtActionPage() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  paramsExtType0() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  params0Type() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_action_params0_js_1.UnionActionParams0.NONE;
  }
  params0(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  paramsExtType1() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  params1Type() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_action_params1_js_1.UnionActionParams1.NONE;
  }
  params1(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  actionId() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actionGuid(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  timeout() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startActionInfo(t) {
    t.startObject(13);
  }
  static addName(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAsync(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addParamsExtActionPage(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addParamsExtType0(t, i) {
    t.addFieldInt8(3, i, 0);
  }
  static addParams0Type(t, i) {
    t.addFieldInt8(4, i, union_action_params0_js_1.UnionActionParams0.NONE);
  }
  static addParams0(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addParamsExtType1(t, i) {
    t.addFieldInt8(6, i, 0);
  }
  static addParams1Type(t, i) {
    t.addFieldInt8(7, i, union_action_params1_js_1.UnionActionParams1.NONE);
  }
  static addParams1(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addActionId(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addActionGuid(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addTimeout(t, i) {
    t.addFieldInt32(12, i, 0);
  }
  static endActionInfo(t) {
    return t.endObject();
  }
  static createActionInfo(t, i, s, a, n, o, r, c, e, h, d, u, f, A) {
    return (
      ActionInfo.startActionInfo(t),
      ActionInfo.addName(t, i),
      ActionInfo.addAsync(t, s),
      ActionInfo.addParamsExtActionPage(t, a),
      ActionInfo.addParamsExtType0(t, n),
      ActionInfo.addParams0Type(t, o),
      ActionInfo.addParams0(t, r),
      ActionInfo.addParamsExtType1(t, c),
      ActionInfo.addParams1Type(t, e),
      ActionInfo.addParams1(t, h),
      ActionInfo.addActionId(t, d),
      ActionInfo.addDisabled(t, u),
      ActionInfo.addActionGuid(t, f),
      ActionInfo.addTimeout(t, A),
      ActionInfo.endActionInfo(t)
    );
  }
}
exports.ActionInfo = ActionInfo;
//# sourceMappingURL=action-info.js.map
