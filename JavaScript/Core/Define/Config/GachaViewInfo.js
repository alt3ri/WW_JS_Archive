"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaViewInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GachaViewInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get SummaryTitle() {
    return this.summarytitle();
  }
  get SummaryDescribe() {
    return this.summarydescribe();
  }
  get ThemeColor() {
    return this.themecolor();
  }
  get ContentTexturePath() {
    return this.contenttexturepath();
  }
  get ContentTextureBgPath() {
    return this.contenttexturebgpath();
  }
  get UnderBgTexturePath() {
    return this.underbgtexturepath();
  }
  get TagNotSelectedSpritePath() {
    return this.tagnotselectedspritepath();
  }
  get TagSelectedSpritePath() {
    return this.tagselectedspritepath();
  }
  get WeaponPrefabPath() {
    return this.weaponprefabpath();
  }
  get UpList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.uplistLength(), (t) =>
      this.uplist(t),
    );
  }
  get ShowIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showidlistLength(), (t) =>
      this.showidlist(t),
    );
  }
  get PreviewIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.previewidlistLength(),
      (t) => this.previewidlist(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGachaViewInfo(t, i) {
    return (i || new GachaViewInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  summarytitle(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  summarydescribe(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  themecolor(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  contenttexturepath(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  contenttexturebgpath(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  underbgtexturepath(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tagnotselectedspritepath(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tagselectedspritepath(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  weaponprefabpath(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetUplistAt(t) {
    return this.uplist(t);
  }
  uplist(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  uplistLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  uplistArray() {
    const t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetShowidlistAt(t) {
    return this.showidlist(t);
  }
  showidlist(t) {
    const i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  showidlistLength() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showidlistArray() {
    const t = this.J7.__offset(this.z7, 28);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetPreviewidlistAt(t) {
    return this.previewidlist(t);
  }
  previewidlist(t) {
    const i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  previewidlistLength() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  previewidlistArray() {
    const t = this.J7.__offset(this.z7, 30);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.GachaViewInfo = GachaViewInfo;
// # sourceMappingURL=GachaViewInfo.js.map
