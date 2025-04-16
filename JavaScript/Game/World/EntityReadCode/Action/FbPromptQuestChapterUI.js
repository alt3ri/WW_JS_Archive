"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPromptQuestChapterUI = void 0);
class FbPromptQuestChapterUI {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.g0h = !1),
      (this.f0h = void 0),
      (this.Qch = !1),
      (this.Kch = 0);
  }
  static Create(t) {
    if (t) return new FbPromptQuestChapterUI(t);
  }
  get ChapterState() {
    return (
      this.g0h ||
        ((this.g0h = !0), (this.f0h = this.FbDataInternal.chapterState())),
      this.f0h
    );
  }
  get QuestId() {
    return (
      this.Qch || ((this.Qch = !0), (this.Kch = this.FbDataInternal.questId())),
      this.Kch
    );
  }
}
exports.FbPromptQuestChapterUI = FbPromptQuestChapterUI;
//# sourceMappingURL=FbPromptQuestChapterUI.js.map
