"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BubbleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_bubble_data_js_1 = require("../fb-component/condition-bubble-data.js");
class BubbleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBubbleComponent(t, e) {
    return (e || new BubbleComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBubbleComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BubbleComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  npcIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  npcIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  npcIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  enterRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  leaveRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  flows(t, e) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (e || new condition_bubble_data_js_1.ConditionBubbleData()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  flowsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  timberId() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBubbleComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addNpcIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createNpcIdsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addInt32(s[t]);
    return e.endVector();
  }
  static startNpcIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addEnterRange(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addLeaveRange(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static addFlows(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createFlowsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startFlowsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTimberId(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static endBubbleComponent(t) {
    return t.endObject();
  }
  static createBubbleComponent(t, e, s, i, n, r, o) {
    return (
      BubbleComponent.startBubbleComponent(t),
      BubbleComponent.addDisabled(t, e),
      BubbleComponent.addNpcIds(t, s),
      BubbleComponent.addEnterRange(t, i),
      BubbleComponent.addLeaveRange(t, n),
      BubbleComponent.addFlows(t, r),
      BubbleComponent.addTimberId(t, o),
      BubbleComponent.endBubbleComponent(t)
    );
  }
}
exports.BubbleComponent = BubbleComponent;
//# sourceMappingURL=bubble-component.js.map
