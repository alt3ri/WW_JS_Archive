"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudio = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntString_1 = require("./SubType/DicIntString");
class RoleAudio {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get FootstepEvent() {
    return this.footstepevent();
  }
  get FoleyEvent() {
    return this.foleyevent();
  }
  get FastClimbEvent() {
    return this.fastclimbevent();
  }
  get VisionMorphEvent() {
    return this.visionmorphevent();
  }
  get VisionSummonEvent() {
    return this.visionsummonevent();
  }
  get OpenTreasureBoxEvent() {
    return this.opentreasureboxevent();
  }
  get ScanTreasureBoxEvent() {
    return this.scantreasureboxevent();
  }
  get JoinTeamEvent() {
    return this.jointeamevent();
  }
  get LostHealthEventMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.losthealtheventmapLength(),
      this.losthealtheventmapKey,
      this.losthealtheventmapValue,
      this,
    );
  }
  losthealtheventmapKey(t) {
    return this.losthealtheventmap(t)?.key();
  }
  losthealtheventmapValue(t) {
    return this.losthealtheventmap(t)?.value();
  }
  get DeathEvent() {
    return this.deathevent();
  }
  get LowStrengthEventList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.lowstrengtheventlistLength(),
      this.lowstrengtheventlist,
      this,
    );
  }
  get LowStrengthEvent() {
    return this.lowstrengthevent();
  }
  get BreakUpEventList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.breakupeventlistLength(),
      this.breakupeventlist,
      this,
    );
  }
  get ExtremeDodgeEvent() {
    return this.extremedodgeevent();
  }
  get ParryEvent() {
    return this.parryevent();
  }
  get EnterBattleEvent() {
    return this.enterbattleevent();
  }
  get UnderAttackEvent() {
    return this.underattackevent();
  }
  get KnockUpEvent() {
    return this.knockupevent();
  }
  get EnterGlideEvent() {
    return this.enterglideevent();
  }
  get UseExploreHookEvent() {
    return this.useexplorehookevent();
  }
  get ClimbLeapEvent() {
    return this.climbleapevent();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRoleAudio(t, e) {
    return (e || new RoleAudio()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  footstepevent(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  foleyevent(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  fastclimbevent(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  visionmorphevent(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  visionsummonevent(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  opentreasureboxevent(t) {
    var e = this.J7.__offset(this.z7, 18),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  scantreasureboxevent(t) {
    var e = this.J7.__offset(this.z7, 20),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  jointeamevent(t) {
    var e = this.J7.__offset(this.z7, 22),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetLosthealtheventmapAt(t, e) {
    return this.losthealtheventmap(t);
  }
  losthealtheventmap(t, e) {
    var s = this.J7.__offset(this.z7, 24);
    return s
      ? (e || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  losthealtheventmapLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  deathevent(t) {
    var e = this.J7.__offset(this.z7, 26),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetLowstrengtheventlistAt(t) {
    return this.lowstrengtheventlist(t);
  }
  lowstrengtheventlist(t, e) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  lowstrengtheventlistLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  lowstrengthevent(t) {
    var e = this.J7.__offset(this.z7, 30),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetBreakupeventlistAt(t) {
    return this.breakupeventlist(t);
  }
  breakupeventlist(t, e) {
    var s = this.J7.__offset(this.z7, 32),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  breakupeventlistLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  extremedodgeevent(t) {
    var e = this.J7.__offset(this.z7, 34),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  parryevent(t) {
    var e = this.J7.__offset(this.z7, 36),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  enterbattleevent(t) {
    var e = this.J7.__offset(this.z7, 38),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  underattackevent(t) {
    var e = this.J7.__offset(this.z7, 40),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  knockupevent(t) {
    var e = this.J7.__offset(this.z7, 42),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  enterglideevent(t) {
    var e = this.J7.__offset(this.z7, 44),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  useexplorehookevent(t) {
    var e = this.J7.__offset(this.z7, 46),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  climbleapevent(t) {
    var e = this.J7.__offset(this.z7, 48),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.RoleAudio = RoleAudio;
//# sourceMappingURL=RoleAudio.js.map
