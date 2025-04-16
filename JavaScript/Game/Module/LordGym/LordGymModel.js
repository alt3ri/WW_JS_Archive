"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymModel = void 0);
const LordGymEntranceSetById_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceSetById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  PayShopDefine_1 = require("../PayShop/PayShopDefine");
class LordGymModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LordId2EntranceIdMap = void 0),
      (this.UnLockLordGym = []),
      (this.ReadLoadGymIds = []),
      (this.FirstUnLockLordGym = []),
      (this.EntranceEntityId = 0),
      (this.EntranceSetId = 0),
      (this.CurrentChallengeLordGymId = 0),
      (this.IsDeadInChallenge = !1),
      (this.LordGymRecord = new Map()),
      (this.NewLordGymEntranceIdRecord = void 0),
      (this.CacheTransform = void 0),
      (this.CacheLocation = void 0),
      (this.CacheRotator = void 0),
      (this.CacheScale = void 0);
  }
  OnInit() {
    this.LordId2EntranceIdMap = new Map();
    for (const r of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceAllConfig())
      for (const e of r.LordGymList) this.LordId2EntranceIdMap.set(e, r.Id);
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
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    if (e.Difficulty <= 1) return !0;
    for (const t of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
      e.Difficulty - 1,
    ))
      if (t.PlayId === e.PlayId) return this.LordGymRecord.has(t.Id);
    return !1;
  }
  GetNextGymId(r) {
    const e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
      e.Difficulty + 1,
    )?.find((r) => r.PlayId === e.PlayId)?.Id;
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
    var e = this.GetGymCanFightMaxLevelWithoutLockCondition(r);
    return this.GetHasFinishLord(r) + "/" + e;
  }
  GetHasFinishLord(r) {
    r =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) return 0;
    let e = 0;
    for (const t of r.LordGymList) this.GetLordGymIsFinish(t) && e++;
    return e;
  }
  GetMaxDifficultyLordGymEntrance(e) {
    e =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      let r = 0;
      for (const n of e.LordGymList) {
        var t =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        this.GetLordGymIsUnLock(n) && t.Difficulty > r && (r = t.Difficulty);
      }
      return r;
    }
  }
  GetMaxDifficultyLordGymEntranceCanFight(e) {
    e =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      let r = 1;
      for (const n of e.LordGymList) {
        var t =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        1 < t.Difficulty &&
          this.GetLordGymIsUnLock(n) &&
          this.GetLordGymIsFinish(n - 1) &&
          t.Difficulty > r &&
          (r = t.Difficulty);
      }
      return r;
    }
  }
  GetCanFightLordGym(r = !1) {
    for (const o of this.UnLockLordGym) {
      var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
      if (r === e.IsNew) {
        var t = this.GetLordGymIsUnLock(o),
          e = 1 === e.Difficulty || this.GetLordGymIsFinish(o - 1),
          n = this.GetLordGymIsFinish(o);
        if (t && e && !n) return o;
      }
    }
    return 0;
  }
  GetGymEntranceAllFinish(r) {
    r =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) return !1;
    for (const e of r.LordGymList) if (!this.GetLordGymIsFinish(e)) return !1;
    return !0;
  }
  GetGymCanFightMaxLevelWithoutLockCondition(e) {
    e =
      ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      let r = 1;
      for (const n of e.LordGymList) {
        var t =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        1 < t.Difficulty &&
          this.GetLordGymIsUnLock(n) &&
          t.Difficulty > r &&
          (r = t.Difficulty);
      }
      return r;
    }
  }
  GetLordGymCurrencyRewardAndTotalCount(r) {
    r =
      LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(
        r,
      ).LordEntranceList;
    let e = 0,
      t = 0;
    var n = ConfigManager_1.ConfigManager.LordGymConfig,
      o = ConfigManager_1.ConfigManager.ExchangeRewardConfig;
    for (const s of r)
      for (const f of n.GetLordGymEntranceConfig(s).LordGymList) {
        var i = n.GetLordGymConfig(f).RewardId,
          i = o.GetExchangeRewardPreviewRewardList(i),
          a = this.GetLordGymIsFinish(f);
        for (const h of i)
          h[0].ItemId === PayShopDefine_1.LORD_GYM_CURRENCY_ID &&
            (a && (e += h[1]), (t += h[1]));
      }
    return [e, t];
  }
  IsChallenging() {
    return 0 < this.CurrentChallengeLordGymId;
  }
  InitNewLordGymEntranceIdRecord() {
    this.NewLordGymEntranceIdRecord =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.NewLordGymEntranceIdRecord,
      ) ?? new Array();
  }
  RecordNewLordGymEntrance(r) {
    this.NewLordGymEntranceIdRecord &&
      !this.IsNewLordGymEntranceRecord(r) &&
      (this.NewLordGymEntranceIdRecord.push(r),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.NewLordGymEntranceIdRecord,
        this.NewLordGymEntranceIdRecord,
      ));
  }
  IsNewLordGymEntranceRecord(r) {
    return this.NewLordGymEntranceIdRecord?.includes(r) ?? !1;
  }
}
exports.LordGymModel = LordGymModel;
//# sourceMappingURL=LordGymModel.js.map
