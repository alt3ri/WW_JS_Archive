"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Activity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Activity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get OpenType() {
    return this.opentype();
  }
  get Sort() {
    return this.sort();
  }
  get TimeIsDisplay() {
    return this.timeisdisplay();
  }
  get ShowPermanentTips() {
    return this.showpermanenttips();
  }
  get ShowTabTime() {
    return this.showtabtime();
  }
  get ShowTabFinish() {
    return this.showtabfinish();
  }
  get SinkTabFinish() {
    return this.sinktabfinish();
  }
  get PreConditionGroupId() {
    return this.preconditiongroupid();
  }
  get PreOpenCondition() {
    return this.preopencondition();
  }
  get PreOpenText() {
    return this.preopentext();
  }
  get ShowUnlockTip() {
    return this.showunlocktip();
  }
  get PreShowGuideQuest() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.preshowguidequestLength(),
      this.preshowguidequest,
      this,
    );
  }
  get IfShowQuestLeftTime() {
    return this.ifshowquestlefttime();
  }
  get CloseGiveUpGuideQuest() {
    return this.closegiveupguidequest();
  }
  get TabResource() {
    return this.tabresource();
  }
  get TabResource2() {
    return this.tabresource2();
  }
  get TabTexture() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.tabtextureLength(),
      this.tabtexture,
      this,
    );
  }
  get Name() {
    return this.name();
  }
  get Title() {
    return this.title();
  }
  get DescTheme() {
    return this.desctheme();
  }
  get Desc() {
    return this.desc();
  }
  get BgResource() {
    return this.bgresource();
  }
  get PreviewDrop() {
    return this.previewdrop();
  }
  get HelpId() {
    return this.helpid();
  }
  get DescThemeIcon() {
    return this.descthemeicon();
  }
  get TabTagIcon() {
    return this.tabtagicon();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsActivity(t, i) {
    return (i || new Activity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  opentype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sort() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
  timeisdisplay() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showpermanenttips() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showtabtime() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  showtabfinish() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  sinktabfinish() {
    var t = this.J7.__offset(this.z7, 20);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  preconditiongroupid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  preopencondition() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  preopentext(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  showunlocktip() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetPreshowguidequestAt(t) {
    return this.preshowguidequest(t);
  }
  preshowguidequest(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  preshowguidequestLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  preshowguidequestArray() {
    var t = this.J7.__offset(this.z7, 30);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  ifshowquestlefttime() {
    var t = this.J7.__offset(this.z7, 32);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  closegiveupguidequest() {
    var t = this.J7.__offset(this.z7, 34);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  tabresource(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  tabresource2(t) {
    var i = this.J7.__offset(this.z7, 38),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetTabtextureAt(t) {
    return this.tabtexture(t);
  }
  tabtexture(t, i) {
    var s = this.J7.__offset(this.z7, 40),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  tabtextureLength() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  desctheme(t) {
    var i = this.J7.__offset(this.z7, 46),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 48),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  bgresource(t) {
    var i = this.J7.__offset(this.z7, 50),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  previewdrop() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 54);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  descthemeicon(t) {
    var i = this.J7.__offset(this.z7, 56),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  tabtagicon(t) {
    var i = this.J7.__offset(this.z7, 58),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.Activity = Activity;
//# sourceMappingURL=Activity.js.map
