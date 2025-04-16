"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelSequenceFrameEventComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  level_sequence_section_info_js_1 = require("../fb-component/level-sequence-section-info.js");
class LevelSequenceFrameEventComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsLevelSequenceFrameEventComponent(e, t) {
    return (t || new LevelSequenceFrameEventComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelSequenceFrameEventComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new LevelSequenceFrameEventComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  forwardSections(e, t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? (
          t || new level_sequence_section_info_js_1.LevelSequenceSectionInfo()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  forwardSectionsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  backWardSections(e, t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n
      ? (
          t || new level_sequence_section_info_js_1.LevelSequenceSectionInfo()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  backWardSectionsLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startLevelSequenceFrameEventComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addForwardSections(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createForwardSectionsVector(t, n) {
    t.startVector(4, n.length, 4);
    for (let e = n.length - 1; 0 <= e; e--) t.addOffset(n[e]);
    return t.endVector();
  }
  static startForwardSectionsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addBackWardSections(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createBackWardSectionsVector(t, n) {
    t.startVector(4, n.length, 4);
    for (let e = n.length - 1; 0 <= e; e--) t.addOffset(n[e]);
    return t.endVector();
  }
  static startBackWardSectionsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endLevelSequenceFrameEventComponent(e) {
    return e.endObject();
  }
  static createLevelSequenceFrameEventComponent(e, t, n, r) {
    return (
      LevelSequenceFrameEventComponent.startLevelSequenceFrameEventComponent(e),
      LevelSequenceFrameEventComponent.addDisabled(e, t),
      LevelSequenceFrameEventComponent.addForwardSections(e, n),
      LevelSequenceFrameEventComponent.addBackWardSections(e, r),
      LevelSequenceFrameEventComponent.endLevelSequenceFrameEventComponent(e)
    );
  }
}
exports.LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent;
//# sourceMappingURL=level-sequence-frame-event-component.js.map
