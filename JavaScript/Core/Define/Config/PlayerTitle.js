"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerTitle = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PlayerTitle {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TitleType() {
    return this.titletype();
  }
  get TitleStyle() {
    return this.titlestyle();
  }
  get TitleName() {
    return this.titlename();
  }
  get TitleQuality() {
    return this.titlequality();
  }
  get TitleIcon() {
    return this.titleicon();
  }
  get RoleHeadIcon() {
    return this.roleheadicon();
  }
  get FemaleRoleHeadIcon() {
    return this.femaleroleheadicon();
  }
  get DecorateLeftIcon() {
    return this.decoratelefticon();
  }
  get DecorateRightIcon() {
    return this.decoraterighticon();
  }
  get DecorateLeftNiagara() {
    return this.decorateleftniagara();
  }
  get DecorateRightNiagara() {
    return this.decoraterightniagara();
  }
  get DecorateBgNiagara() {
    return this.decoratebgniagara();
  }
  get TitleBgIcon() {
    return this.titlebgicon();
  }
  get StarTitleIcon() {
    return this.startitleicon();
  }
  get StarTitleBgIcon() {
    return this.startitlebgicon();
  }
  get SelectedIcon() {
    return this.selectedicon();
  }
  get Description() {
    return this.description();
  }
  get ActivityId() {
    return this.activityid();
  }
  get HonorDescription() {
    return this.honordescription();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get SeasonName() {
    return this.seasonname();
  }
  get ActvityName() {
    return this.actvityname();
  }
  get ItemAccess() {
    return this.itemaccess();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get IconInTitleInfo() {
    return this.iconintitleinfo();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPlayerTitle(t, i) {
    return (i || new PlayerTitle()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  titletype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  titlestyle() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  titlename(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titlequality() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  titleicon(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleheadicon(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  femaleroleheadicon(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  decoratelefticon(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  decoraterighticon(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  decorateleftniagara(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  decoraterightniagara(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  decoratebgniagara(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titlebgicon(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  startitleicon(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  startitlebgicon(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  selectedicon(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 38),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  honordescription(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  seasonid(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  seasonname(t) {
    var i = this.J7.__offset(this.z7, 46),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  actvityname(t) {
    var i = this.J7.__offset(this.z7, 48),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 50),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  iconintitleinfo(t) {
    var i = this.J7.__offset(this.z7, 54),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.PlayerTitle = PlayerTitle;
//# sourceMappingURL=PlayerTitle.js.map
