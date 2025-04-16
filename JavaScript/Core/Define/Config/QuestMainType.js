"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestMainType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestMainType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MainTypeName() {
    return this.maintypename();
  }
  get QuestTabIcon() {
    return this.questtabicon();
  }
  get QuestTypeTitleIcon() {
    return this.questtypetitleicon();
  }
  get QuestChapterBg() {
    return this.questchapterbg();
  }
  get TrackIconId() {
    return this.trackiconid();
  }
  get TypeColor() {
    return this.typecolor();
  }
  get SortValue() {
    return this.sortvalue();
  }
  get AutoHideTrack() {
    return this.autohidetrack();
  }
  get NewQuestTipTime() {
    return this.newquesttiptime();
  }
  get QuestUpdateTipsTime() {
    return this.questupdatetipstime();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsQuestMainType(t, e) {
    return (e || new QuestMainType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maintypename(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  questtabicon(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  questtypetitleicon(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  questchapterbg(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  trackiconid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  typecolor(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  sortvalue() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  autohidetrack() {
    var t = this.J7.__offset(this.z7, 20);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  newquesttiptime() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  questupdatetipstime() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
}
exports.QuestMainType = QuestMainType;
//# sourceMappingURL=QuestMainType.js.map
