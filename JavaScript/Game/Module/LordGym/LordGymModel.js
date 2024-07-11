"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class LordGymModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LordId2EntranceIdMap = void 0),
      (this.UnLockLordGym = []),
      (this.ReadLoadGymIds = []),
      (this.FirstUnLockLordGym = []),
      (this.LordGymRecord = new Map());
  }
  OnInit() {
    this.LordId2EntranceIdMap = new Map();
    for (const r of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceAllConfig())
      for (const t of r.LordGymList) this.LordId2EntranceIdMap.set(t, r.Id);
    return !0;
  }
  GetLordGymIsUnLock(r) {
    return this.UnLockLordGym.includes(r);
  }
  GetLordGymHasRead(r) {
    return this.ReadLoadGymIds.includes(r);
  }
  ReadLordGym(r) {
    this.ReadLoadGymIds.push(r);
  }
  GetLordGymEntranceList(r) {
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(
      r,
    );
  }
  GetLastGymFinish(r) {
    var t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    if (t.Difficulty <= 1) return !0;
    for (const n of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
      t.Difficulty - 1,
    ))
      if (n.PlayId === t.PlayId) return this.LordGymRecord.has(n.Id);
    return !1;
  }
  GetNextGymId(r) {
    const t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
      t.Difficulty + 1,
    )?.find((r) => r.PlayId === t.PlayId)?.Id;
  }
  GetLordGymIsFinish(r) {
    return this.LordGymRecord.has(r);
  }
  GetMarkIdByLordGymId(r) {
    r = this.LordId2EntranceIdMap.get(r);
    return ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
      r,
    )?.MarkId;
  }
  GetLordGymEntranceFinish(r) {
    var t = this.GetGymCanFightMaxLevelWithoutLockCondition(r);
    return this.GetHasFinishLord(r) + "/" + t;
  }
  GetHasFinishLord(r) {
    r =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) return 0;
    let t = 0;
    for (const n of r.LordGymList) this.GetLordGymIsFinish(n) && t++;
    return t;
  }
  GetMaxDifficultyLordGymEntrance(t) {
    t =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(t);
    if (t) {
      let r = 0;
      for (const e of t.LordGymList) {
        var n =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(e);
        this.GetLordGymIsUnLock(e) && n.Difficulty > r && (r = n.Difficulty);
      }
      return r;
    }
  }
  GetMaxDifficultyLordGymEntranceCanFight(t) {
    t =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(t);
    if (t) {
      let r = 1;
      for (const e of t.LordGymList) {
        var n =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(e);
        1 < n.Difficulty &&
          this.GetLordGymIsUnLock(e) &&
          this.GetLordGymIsFinish(e - 1) &&
          n.Difficulty > r &&
          (r = n.Difficulty);
      }
      return r;
    }
  }
  GetCanFightLordGym() {
    for (const e of this.UnLockLordGym) {
      var r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(e),
        t = this.GetLordGymIsUnLock(e),
        r = 1 === r.Difficulty || this.GetLordGymIsFinish(e - 1),
        n = this.GetLordGymIsFinish(e);
      if (t && r && !n) return e;
    }
    return 0;
  }
  GetGymEntranceAllFinish(r) {
    r =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) return !1;
    for (const t of r.LordGymList) if (!this.GetLordGymIsFinish(t)) return !1;
    return !0;
  }
  GetGymCanFightMaxLevelWithoutLockCondition(t) {
    t =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(t);
    if (t) {
      let r = 1;
      for (const e of t.LordGymList) {
        var n =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(e);
        1 < n.Difficulty &&
          this.GetLordGymIsUnLock(e) &&
          n.Difficulty > r &&
          (r = n.Difficulty);
      }
      return r;
    }
  }
}
exports.LordGymModel = LordGymModel;
//# sourceMappingURL=LordGymModel.js.map
