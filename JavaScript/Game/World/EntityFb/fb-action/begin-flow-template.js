"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BeginFlowTemplate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  flow_actor_unit_js_1 = require("../fb-action/flow-actor-unit.js");
class BeginFlowTemplate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBeginFlowTemplate(t, e) {
    return (e || new BeginFlowTemplate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBeginFlowTemplate(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BeginFlowTemplate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actors(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (e || new flow_actor_unit_js_1.FlowActorUnit()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actorsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  montageIds(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  montageIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  montageIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  useFreeCamera() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isSwitchMainRole() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startBeginFlowTemplate(t) {
    t.startObject(5);
  }
  static addFolded(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addActors(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createActorsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startActorsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addMontageIds(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createMontageIdsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startMontageIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addUseFreeCamera(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static addIsSwitchMainRole(t, e) {
    t.addFieldInt8(4, +e, 0);
  }
  static endBeginFlowTemplate(t) {
    return t.endObject();
  }
  static createBeginFlowTemplate(t, e, i, s, r, a) {
    return (
      BeginFlowTemplate.startBeginFlowTemplate(t),
      BeginFlowTemplate.addFolded(t, e),
      BeginFlowTemplate.addActors(t, i),
      BeginFlowTemplate.addMontageIds(t, s),
      BeginFlowTemplate.addUseFreeCamera(t, r),
      BeginFlowTemplate.addIsSwitchMainRole(t, a),
      BeginFlowTemplate.endBeginFlowTemplate(t)
    );
  }
}
exports.BeginFlowTemplate = BeginFlowTemplate;
//# sourceMappingURL=begin-flow-template.js.map
