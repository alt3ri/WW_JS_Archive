"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoMemoryCollect = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PhotoMemoryCollect {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TopicID() {
    return this.topicid();
  }
  get Type() {
    return this.type();
  }
  get Rank() {
    return this.rank();
  }
  get ThemeBg() {
    return this.themebg();
  }
  get BgResourceM() {
    return this.bgresourcem();
  }
  get BgResourceF() {
    return this.bgresourcef();
  }
  get Title() {
    return this.title();
  }
  get TipsDesc() {
    return this.tipsdesc();
  }
  get ClueId() {
    return this.clueid();
  }
  get Desc() {
    return this.desc();
  }
  get DropId() {
    return this.dropid();
  }
  get TraceEntityId() {
    return this.traceentityid();
  }
  get TraceMarkId() {
    return this.tracemarkid();
  }
  get QuestId() {
    return this.questid();
  }
  get QuestIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.questidlistLength(),
      this.questidlist,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsPhotoMemoryCollect(t, s) {
    return (s || new PhotoMemoryCollect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  topicid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  rank() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  themebg(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  bgresourcem(t) {
    var s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  bgresourcef(t) {
    var s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 18);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  tipsdesc(t) {
    var s = this.J7.__offset(this.z7, 20);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  clueid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 24);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  traceentityid() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tracemarkid() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  questid() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetQuestidlistAt(t) {
    return this.questidlist(t);
  }
  questidlist(t) {
    var s = this.J7.__offset(this.z7, 34);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  questidlistLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  questidlistArray() {
    var t = this.J7.__offset(this.z7, 34);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.PhotoMemoryCollect = PhotoMemoryCollect;
//# sourceMappingURL=PhotoMemoryCollect.js.map
