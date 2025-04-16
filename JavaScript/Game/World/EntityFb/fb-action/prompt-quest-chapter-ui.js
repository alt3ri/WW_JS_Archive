"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PromptQuestChapterUI = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PromptQuestChapterUI {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPromptQuestChapterUI(t, e) {
    return (e || new PromptQuestChapterUI()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPromptQuestChapterUI(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PromptQuestChapterUI()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  chapterState() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startPromptQuestChapterUI(t) {
    t.startObject(2);
  }
  static addChapterState(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addQuestId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endPromptQuestChapterUI(t) {
    return t.endObject();
  }
  static createPromptQuestChapterUI(t, e, r) {
    return (
      PromptQuestChapterUI.startPromptQuestChapterUI(t),
      PromptQuestChapterUI.addChapterState(t, e),
      PromptQuestChapterUI.addQuestId(t, r),
      PromptQuestChapterUI.endPromptQuestChapterUI(t)
    );
  }
}
exports.PromptQuestChapterUI = PromptQuestChapterUI;
//# sourceMappingURL=prompt-quest-chapter-ui.js.map
