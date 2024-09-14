"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DungeonDetection = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class DungeonDetection {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get DungeonId() {
    return this.dungeonid();
  }
  get Name() {
    return this.name();
  }
  get GuideId() {
    return this.guideid();
  }
  get LevelPlayList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.levelplaylistLength(),
      this.levelplaylist,
      this,
    );
  }
  get InstanceSubTypeDescription() {
    return this.instancesubtypedescription();
  }
  get TypeDescription1() {
    return this.typedescription1();
  }
  get Secondary() {
    return this.secondary();
  }
  get MatType() {
    return this.mattype();
  }
  get TypeDescription2() {
    return this.typedescription2();
  }
  get AttributesDescriptionLock() {
    return this.attributesdescriptionlock();
  }
  get AttributesDescriptionUnlock() {
    return this.attributesdescriptionunlock();
  }
  get BigIcon() {
    return this.bigicon();
  }
  get Icon() {
    return this.icon();
  }
  get LockBigIcon() {
    return this.lockbigicon();
  }
  get TemporaryIconUnLock() {
    return this.temporaryiconunlock();
  }
  get TemporaryIconlock() {
    return this.temporaryiconlock();
  }
  get ShowReward() {
    return this.showreward();
  }
  get ShowRewardMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.showrewardmapLength(),
      this.showrewardmapKey,
      this.showrewardmapValue,
      this,
    );
  }
  showrewardmapKey(t) {
    return this.showrewardmap(t)?.key();
  }
  showrewardmapValue(t) {
    return this.showrewardmap(t)?.value();
  }
  get BeginTimeStamp() {
    return this.begintimestamp();
  }
  get LockCon() {
    return this.lockcon();
  }
  get PhantomId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.phantomidLength(),
      this.phantomid,
      this,
    );
  }
  get SubDungeonId() {
    return this.subdungeonid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDungeonDetection(t, i) {
    return (i || new DungeonDetection()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dungeonid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  guideid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLevelplaylistAt(t) {
    return this.levelplaylist(t);
  }
  levelplaylist(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  levelplaylistLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  levelplaylistArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  instancesubtypedescription(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  typedescription1() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  secondary() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mattype() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  typedescription2(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  attributesdescriptionlock(t) {
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  attributesdescriptionunlock(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  bigicon(t) {
    var i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  lockbigicon(t) {
    var i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  temporaryiconunlock(t) {
    var i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  temporaryiconlock(t) {
    var i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  showreward() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetShowrewardmapAt(t, i) {
    return this.showrewardmap(t);
  }
  showrewardmap(t, i) {
    var s = this.J7.__offset(this.z7, 40);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  showrewardmapLength() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  begintimestamp() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lockcon() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPhantomidAt(t) {
    return this.phantomid(t);
  }
  phantomid(t) {
    var i = this.J7.__offset(this.z7, 46);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  phantomidLength() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  phantomidArray() {
    var t = this.J7.__offset(this.z7, 46);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  subdungeonid() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DungeonDetection = DungeonDetection;
//# sourceMappingURL=DungeonDetection.js.map
