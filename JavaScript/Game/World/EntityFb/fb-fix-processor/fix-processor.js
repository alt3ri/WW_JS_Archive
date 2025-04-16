"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixProcessor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  fix_action_js_1 = require("../fb-fix-processor/fix-action.js");
class FixProcessor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(s, t) {
    return (this.bb_pos = s), (this.bb = t), this;
  }
  static getRootAsFixProcessor(s, t) {
    return (t || new FixProcessor()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  static getSizePrefixedRootAsFixProcessor(s, t) {
    return (
      s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FixProcessor()).__init(
        s.readInt32(s.position()) + s.position(),
        s,
      )
    );
  }
  fixActions(s, t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r
      ? (t || new fix_action_js_1.FixAction()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * s),
          this.bb,
        )
      : void 0;
  }
  fixActionsLength() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__vector_len(this.bb_pos + s) : 0;
  }
  static startFixProcessor(s) {
    s.startObject(1);
  }
  static addFixActions(s, t) {
    s.addFieldOffset(0, t, 0);
  }
  static createFixActionsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let s = r.length - 1; 0 <= s; s--) t.addOffset(r[s]);
    return t.endVector();
  }
  static startFixActionsVector(s, t) {
    s.startVector(4, t, 4);
  }
  static endFixProcessor(s) {
    return s.endObject();
  }
  static createFixProcessor(s, t) {
    return (
      FixProcessor.startFixProcessor(s),
      FixProcessor.addFixActions(s, t),
      FixProcessor.endFixProcessor(s)
    );
  }
}
exports.FixProcessor = FixProcessor;
//# sourceMappingURL=fix-processor.js.map
