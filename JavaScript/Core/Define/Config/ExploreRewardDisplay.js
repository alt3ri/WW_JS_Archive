"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreRewardDisplay = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploreRewardDisplay {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get TitleHexColor() {
    return this.titlehexcolor();
  }
  get TitleIconPath() {
    return this.titleiconpath();
  }
  get TitleIconHexColor() {
    return this.titleiconhexcolor();
  }
  get IsRecordVisible() {
    return this.isrecordvisible();
  }
  get IsItemVisible() {
    return this.isitemvisible();
  }
  get IsExploreProgressVisible() {
    return this.isexploreprogressvisible();
  }
  get ExploreBarTipsTextId() {
    return this.explorebartipstextid();
  }
  get IsDescription() {
    return this.isdescription();
  }
  get Description() {
    return this.description();
  }
  get IsSuccess() {
    return this.issuccess();
  }
  get AudioId() {
    return this.audioid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsExploreRewardDisplay(t, i) {
    return (i || new ExploreRewardDisplay()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titlehexcolor(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titleiconpath(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titleiconhexcolor(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  isrecordvisible() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isitemvisible() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  isexploreprogressvisible() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  explorebartipstextid(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  isdescription() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  issuccess() {
    var t = this.J7.__offset(this.z7, 26);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  audioid(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.ExploreRewardDisplay = ExploreRewardDisplay;
//# sourceMappingURL=ExploreRewardDisplay.js.map
