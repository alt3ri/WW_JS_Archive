"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpringChat = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SpringChat {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ContentList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.contentlistLength(),
      this.contentlist,
      this,
    );
  }
  get PosList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.poslistLength(),
      this.poslist,
      this,
    );
  }
  get AnimNameList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.animnamelistLength(),
      this.animnamelist,
      this,
    );
  }
  get LeftSpineAtlas() {
    return this.leftspineatlas();
  }
  get LeftSpineSkeletonData() {
    return this.leftspineskeletondata();
  }
  get RightSpineAtlas() {
    return this.rightspineatlas();
  }
  get RightSpineSkeletonData() {
    return this.rightspineskeletondata();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSpringChat(t, i) {
    return (i || new SpringChat()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetContentlistAt(t) {
    return this.contentlist(t);
  }
  contentlist(t, i) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  contentlistLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPoslistAt(t) {
    return this.poslist(t);
  }
  poslist(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  poslistLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  poslistArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetAnimnamelistAt(t) {
    return this.animnamelist(t);
  }
  animnamelist(t, i) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  animnamelistLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  leftspineatlas(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  leftspineskeletondata(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  rightspineatlas(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  rightspineskeletondata(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.SpringChat = SpringChat;
//# sourceMappingURL=SpringChat.js.map
