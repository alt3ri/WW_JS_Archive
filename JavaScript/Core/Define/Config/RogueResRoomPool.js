"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResRoomPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResRoomPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BehaviorTree() {
    return this.behaviortree();
  }
  get RoomsMusicState() {
    return this.roomsmusicstate();
  }
  get MonsterDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monsterdescLength(),
      this.monsterdesc,
      this,
    );
  }
  get MonsterDescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monsterdescparamsLength(),
      this.monsterdescparams,
      this,
    );
  }
  get MonsterFig() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monsterfigLength(),
      this.monsterfig,
      this,
    );
  }
  get EnvDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.envdescLength(),
      this.envdesc,
      this,
    );
  }
  get EnvFig() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.envfigLength(),
      this.envfig,
      this,
    );
  }
  get EnvDescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.envdescparamsLength(),
      this.envdescparams,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResRoomPool(t, s) {
    return (s || new RogueResRoomPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  behaviortree() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roomsmusicstate(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetMonsterdescAt(t) {
    return this.monsterdesc(t);
  }
  monsterdesc(t, s) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  monsterdescLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMonsterdescparamsAt(t) {
    return this.monsterdescparams(t);
  }
  monsterdescparams(t, s) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  monsterdescparamsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMonsterfigAt(t) {
    return this.monsterfig(t);
  }
  monsterfig(t, s) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  monsterfigLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetEnvdescAt(t) {
    return this.envdesc(t);
  }
  envdesc(t, s) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  envdescLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetEnvfigAt(t) {
    return this.envfig(t);
  }
  envfig(t, s) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  envfigLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetEnvdescparamsAt(t) {
    return this.envdescparams(t);
  }
  envdescparams(t, s) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  envdescparamsLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueResRoomPool = RogueResRoomPool;
//# sourceMappingURL=RogueResRoomPool.js.map
