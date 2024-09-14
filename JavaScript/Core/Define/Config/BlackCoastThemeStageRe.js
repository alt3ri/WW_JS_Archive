"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastThemeStageRe = void 0);
class BlackCoastThemeStageRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Title() {
    return this.title();
  }
  get TitleDetail() {
    return this.titledetail();
  }
  get OpenConditionId() {
    return this.openconditionid();
  }
  get QuestionId() {
    return this.questionid();
  }
  get VideoSource() {
    return this.videosource();
  }
  get TextureSmall() {
    return this.texturesmall();
  }
  get TextureNormal() {
    return this.texturenormal();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsBlackCoastThemeStageRe(t, e) {
    return (e || new BlackCoastThemeStageRe()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 8);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  titledetail(t) {
    var e = this.J7.__offset(this.z7, 10);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  openconditionid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  questionid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  videosource(t) {
    var e = this.J7.__offset(this.z7, 16);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  texturesmall(t) {
    var e = this.J7.__offset(this.z7, 18);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  texturenormal(t) {
    var e = this.J7.__offset(this.z7, 20);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
}
exports.BlackCoastThemeStageRe = BlackCoastThemeStageRe;
//# sourceMappingURL=BlackCoastThemeStageRe.js.map
