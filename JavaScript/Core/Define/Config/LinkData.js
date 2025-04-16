"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkData = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LinkData {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BattleScoreId() {
    return this.battlescoreid();
  }
  get BuffIdsInAccumulate() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsinaccumulateLength(),
      this.buffidsinaccumulate,
      this,
    );
  }
  get BulletIdsInAccumulate() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bulletidsinaccumulateLength(),
      this.bulletidsinaccumulate,
      this,
    );
  }
  get BuffIdsInReady() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsinreadyLength(),
      this.buffidsinready,
      this,
    );
  }
  get BulletIdsInReady() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bulletidsinreadyLength(),
      this.bulletidsinready,
      this,
    );
  }
  get BuffIdsInBrust() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsinbrustLength(),
      this.buffidsinbrust,
      this,
    );
  }
  get BulletIdsInBrust() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bulletidsinbrustLength(),
      this.bulletidsinbrust,
      this,
    );
  }
  get BrustDuration() {
    return this.brustduration();
  }
  get IsEnableOneRoleBurst() {
    return this.isenableoneroleburst();
  }
  get OneRoleBurstTeammateId() {
    return this.oneroleburstteammateid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsLinkData(t, i) {
    return (i || new LinkData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  battlescoreid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBuffidsinaccumulateAt(t) {
    return this.buffidsinaccumulate(t);
  }
  buffidsinaccumulate(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  buffidsinaccumulateLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBulletidsinaccumulateAt(t) {
    return this.bulletidsinaccumulate(t);
  }
  bulletidsinaccumulate(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  bulletidsinaccumulateLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBuffidsinreadyAt(t) {
    return this.buffidsinready(t);
  }
  buffidsinready(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  buffidsinreadyLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBulletidsinreadyAt(t) {
    return this.bulletidsinready(t);
  }
  bulletidsinready(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  bulletidsinreadyLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBuffidsinbrustAt(t) {
    return this.buffidsinbrust(t);
  }
  buffidsinbrust(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  buffidsinbrustLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBulletidsinbrustAt(t) {
    return this.bulletidsinbrust(t);
  }
  bulletidsinbrust(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  bulletidsinbrustLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  brustduration() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  isenableoneroleburst() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  oneroleburstteammateid() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.LinkData = LinkData;
//# sourceMappingURL=LinkData.js.map
