"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BackgroundCard = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BackgroundCard {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get QualityId() {
    return this.qualityid();
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), (t) =>
      this.itemaccess(t),
    );
  }
  get SortIndex() {
    return this.sortindex();
  }
  get LongCardPath() {
    return this.longcardpath();
  }
  get CardPath() {
    return this.cardpath();
  }
  get FunctionViewCardPath() {
    return this.functionviewcardpath();
  }
  get Icon() {
    return this.icon();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get Title() {
    return this.title();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get Tips() {
    return this.tips();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsBackgroundCard(t, i) {
    return (i || new BackgroundCard()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  qualityid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t);
  }
  itemaccess(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  itemaccessLength() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  itemaccessArray() {
    const t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  sortindex() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  longcardpath(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  cardpath(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  functionviewcardpath(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  icon(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  iconmiddle(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  iconsmall(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  title(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  attributesdescription(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  obtainedshowdescription(t) {
    const i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  typedescription(t) {
    const i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  bgdescription(t) {
    const i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tips(t) {
    const i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  showinbag() {
    const t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  reddotdisablerule() {
    const t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BackgroundCard = BackgroundCard;
// # sourceMappingURL=BackgroundCard.js.map
