"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeFlowTemplate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class ChangeFlowTemplate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeFlowTemplate(t, e) {
    return (e || new ChangeFlowTemplate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeFlowTemplate(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeFlowTemplate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  templateMode(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  targetPos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  actorIdArray(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  actorIdArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  actorIdArrayArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  talkerIds(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  talkerIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  talkerIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startChangeFlowTemplate(t) {
    t.startObject(4);
  }
  static addTemplateMode(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addActorIdArray(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createActorIdArrayVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt32(r[t]);
    return e.endVector();
  }
  static startActorIdArrayVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTalkerIds(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createTalkerIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt32(r[t]);
    return e.endVector();
  }
  static startTalkerIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endChangeFlowTemplate(t) {
    return t.endObject();
  }
}
exports.ChangeFlowTemplate = ChangeFlowTemplate;
//# sourceMappingURL=change-flow-template.js.map
