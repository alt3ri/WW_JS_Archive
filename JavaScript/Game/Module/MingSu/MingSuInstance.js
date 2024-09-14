"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuInstance = void 0);
const DragonPoolById_1 = require("../../../Core/Define/ConfigQuery/DragonPoolById");
class MingSuInstance {
  constructor(t) {
    (this.DragonPoolId = 0),
      (this.DragonPoolState = 0),
      (this.DragonPoolLevel = 0),
      (this.HadCoreCount = 0),
      (this.DropItemList = void 0),
      (this.DragonPoolConfig = void 0),
      (this.DragonPoolId = t),
      (this.DragonPoolConfig = DragonPoolById_1.configDragonPoolById.GetConfig(
        this.DragonPoolId,
      )),
      (this.DragonPoolState = 0),
      (this.DragonPoolLevel = 0),
      (this.HadCoreCount = 0);
  }
  SetDragonPoolLevel(t) {
    this.DragonPoolLevel = t;
  }
  GetDragonPoolLevel() {
    return this.DragonPoolLevel;
  }
  SetDragonPoolState(t) {
    this.DragonPoolState = t;
  }
  GetDragonPoolState() {
    return this.DragonPoolState;
  }
  SetHadCoreCount(t) {
    this.HadCoreCount = t;
  }
  GetHadCoreCount() {
    return this.HadCoreCount;
  }
  GetDragonPoolMaxLevel() {
    return this.DragonPoolConfig.Goal.length;
  }
  GetNeedCoreCount(t) {
    return this.DragonPoolConfig.Goal[t];
  }
  GetGoalList() {
    return this.DragonPoolConfig.Goal;
  }
  GetRewardId(t) {
    return this.DragonPoolConfig.DropIds[t];
  }
  GetCoreId() {
    return this.DragonPoolConfig.CoreId;
  }
  SetLevelGainList(t) {}
  SetDropItemList(t) {
    this.DropItemList = t;
  }
  GetDropItemList() {
    return this.DropItemList;
  }
}
exports.MingSuInstance = MingSuInstance;
//# sourceMappingURL=MingSuInstance.js.map
