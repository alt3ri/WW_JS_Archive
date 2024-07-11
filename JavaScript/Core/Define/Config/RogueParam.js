"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueParam = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueParam {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoguelikeSettleBgS() {
    return this.roguelikesettlebgs();
  }
  get RoguelikeSettleBgNormal() {
    return this.roguelikesettlebgnormal();
  }
  get RoguelikeRoomFloatTipsNoHeadIcon() {
    return this.roguelikeroomfloattipsnoheadicon();
  }
  get RoguelikeRoomFloatTipsSpecialIcon() {
    return this.roguelikeroomfloattipsspecialicon();
  }
  get RoguelikeSettleS() {
    return this.roguelikesettles();
  }
  get RoguelikeSettleA() {
    return this.roguelikesettlea();
  }
  get RoguelikeSettleB() {
    return this.roguelikesettleb();
  }
  get RoguelikeSettleC() {
    return this.roguelikesettlec();
  }
  get PointItem() {
    return this.pointitem();
  }
  get PointItemMaxCount() {
    return this.pointitemmaxcount();
  }
  get TokenItem() {
    return this.tokenitem();
  }
  get WeekTokenMaxCount() {
    return this.weektokenmaxcount();
  }
  get SkillPoint() {
    return this.skillpoint();
  }
  get SkillPointMaxCount() {
    return this.skillpointmaxcount();
  }
  get InsideCurrency() {
    return this.insidecurrency();
  }
  get GuideInstArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.guideinstarrayLength(),
      (t) => this.guideinstarray(t),
    );
  }
  get GuideInstRoleIdArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.guideinstroleidarrayLength(),
      (t) => this.guideinstroleidarray(t),
    );
  }
  get DungeonList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dungeonlistLength(), (t) =>
      this.dungeonlist(t),
    );
  }
  get DungeonRoleOpenTimeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.dungeonroleopentimemapLength(),
      (t) => this.dungeonroleopentimemap(t)?.key(),
      (t) => this.dungeonroleopentimemap(t)?.value(),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueParam(t, i) {
    return (i || new RogueParam()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roguelikesettlebgs(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roguelikesettlebgnormal(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roguelikeroomfloattipsnoheadicon(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roguelikeroomfloattipsspecialicon(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roguelikesettles() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roguelikesettlea() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roguelikesettleb() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roguelikesettlec() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  pointitem() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  pointitemmaxcount() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tokenitem() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weektokenmaxcount() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillpoint() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillpointmaxcount() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  insidecurrency() {
    const t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetGuideinstarrayAt(t) {
    return this.guideinstarray(t);
  }
  guideinstarray(t) {
    const i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  guideinstarrayLength() {
    const t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  guideinstarrayArray() {
    const t = this.J7.__offset(this.z7, 36);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetGuideinstroleidarrayAt(t) {
    return this.guideinstroleidarray(t);
  }
  guideinstroleidarray(t) {
    const i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  guideinstroleidarrayLength() {
    const t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  guideinstroleidarrayArray() {
    const t = this.J7.__offset(this.z7, 38);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDungeonlistAt(t) {
    return this.dungeonlist(t);
  }
  dungeonlist(t) {
    const i = this.J7.__offset(this.z7, 40);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  dungeonlistLength() {
    const t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dungeonlistArray() {
    const t = this.J7.__offset(this.z7, 40);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDungeonroleopentimemapAt(t, i) {
    return this.dungeonroleopentimemap(t);
  }
  dungeonroleopentimemap(t, i) {
    const e = this.J7.__offset(this.z7, 42);
    return e
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  dungeonroleopentimemapLength() {
    const t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueParam = RogueParam;
// # sourceMappingURL=RogueParam.js.map
