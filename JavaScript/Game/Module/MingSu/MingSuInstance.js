"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuInstance = void 0);
const DragonPoolById_1 = require("../../../Core/Define/ConfigQuery/DragonPoolById");
class MingSuInstance {
  constructor(t) {
    (this.Rbi = 0),
      (this.Abi = 0),
      (this.Pbi = 0),
      (this.xbi = 0),
      (this.Dbi = void 0),
      (this.Ubi = void 0),
      (this.Rbi = t),
      (this.Ubi = DragonPoolById_1.configDragonPoolById.GetConfig(this.Rbi)),
      (this.Abi = 0),
      (this.Pbi = 0),
      (this.xbi = 0);
  }
  SetDragonPoolLevel(t) {
    this.Pbi = t;
  }
  GetDragonPoolLevel() {
    return this.Pbi;
  }
  SetDragonPoolState(t) {
    this.Abi = t;
  }
  GetDragonPoolState() {
    return this.Abi;
  }
  SetHadCoreCount(t) {
    this.xbi = t;
  }
  GetHadCoreCount() {
    return this.xbi;
  }
  GetDragonPoolMaxLevel() {
    return this.Ubi.Goal.length;
  }
  GetNeedCoreCount(t) {
    return this.Ubi.Goal[t];
  }
  GetGoalList() {
    return this.Ubi.Goal;
  }
  GetRewardId(t) {
    return this.Ubi.DropIds[t];
  }
  GetCoreId() {
    return this.Ubi.CoreId;
  }
  SetDropItemList(t) {
    this.Dbi = t;
  }
  GetDropItemList() {
    return this.Dbi;
  }
}
exports.MingSuInstance = MingSuInstance;
//# sourceMappingURL=MingSuInstance.js.map
