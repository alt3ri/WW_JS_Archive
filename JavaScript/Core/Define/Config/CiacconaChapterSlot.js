"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaChapterSlot = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CiacconaChapterSlot {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ChapterId() {
    return this.chapterid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get SlotImage() {
    return this.slotimage();
  }
  get SlotLockImage() {
    return this.slotlockimage();
  }
  get RomanNumberIcon() {
    return this.romannumbericon();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsCiacconaChapterSlot(t, i) {
    return (i || new CiacconaChapterSlot()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  chapterid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  slotimage(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  slotlockimage(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  romannumbericon(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.CiacconaChapterSlot = CiacconaChapterSlot;
//# sourceMappingURL=CiacconaChapterSlot.js.map
