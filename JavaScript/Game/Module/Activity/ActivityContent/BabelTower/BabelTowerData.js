"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityData_1 = require("../../ActivityData");
class BabelTowerData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.NormalLevelDataMap = new Map()),
      (this.HardLevelDataMap = new Map()),
      (this.NormalQuest = new Map()),
      (this.DailyQuest = new Map()),
      (this.BuffUnlock = new Map()),
      (this.DeTermUnlock = new Map()),
      (this.RoleLockData = new Map()),
      (this.CurrentItemCount = 0);
  }
  PhraseEx(t) {
    this.HardLevelDataMap.clear(),
      this.NormalLevelDataMap.clear(),
      this.RoleLockData.clear();
    for (const e of t.OX_.QX_)
      (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
        e.ELl,
      ).IsDifficult
        ? this.HardLevelDataMap
        : this.NormalLevelDataMap
      ).set(e.ELl, e),
        this.RoleLockData.set(e.ELl, e.FX_);
    this.NormalQuest.clear();
    for (const r of t.OX_.E$s) this.NormalQuest.set(r.s5n, r);
    this.DailyQuest.clear();
    for (const i of t.OX_.YX_) this.DailyQuest.set(i.s5n, i);
    this.BuffUnlock.clear();
    for (const o of t.OX_.XX_) this.BuffUnlock.set(o.WX_, o.$X_);
    this.DeTermUnlock.clear();
    for (const a of t.OX_.KX_) this.DeTermUnlock.set(a.HX_, a.$X_);
    (this.CurrentItemCount = t.OX_.ETc),
      UiManager_1.UiManager.IsViewOpen("BabelTowerQuestView") &&
        UiManager_1.UiManager.CloseView("BabelTowerQuestView");
  }
  GetNextLevelOpenTimeText() {
    var t,
      e,
      r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    for ([, t] of this.NormalLevelDataMap) {
      var i = MathUtils_1.MathUtils.LongToNumber(t.yzs);
      if (r < i)
        return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          (i - r) * TimeUtil_1.TimeUtil.Millisecond,
        ).CountDownText;
    }
    for ([, e] of this.HardLevelDataMap) {
      var o = MathUtils_1.MathUtils.LongToNumber(e.yzs);
      if (r < o)
        return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          (o - r) * TimeUtil_1.TimeUtil.Millisecond,
        ).CountDownText;
    }
  }
  GetNormalLevelPassText() {
    var t,
      e = this.NormalLevelDataMap.size;
    let r = 0;
    for ([, t] of this.NormalLevelDataMap) t.dMs && r++;
    return r + "/" + e;
  }
  GetHardLevelStarText() {
    let t = 0;
    for (var [, e] of this.HardLevelDataMap) t += e.jX_;
    return t + "";
  }
  GetBuffIsLock(t) {
    return !this.BuffUnlock.get(t);
  }
  GetBuffIsUse(t) {
    for (var [e, r] of this.HardLevelDataMap) if (r.Dks.includes(t)) return e;
    return -1;
  }
  GetBuffUseLevel(t) {
    for (var [e, r] of this.HardLevelDataMap) if (r.Dks.includes(t)) return e;
    return -1;
  }
  GetDeTermIsLock(t) {
    return !this.DeTermUnlock.get(t);
  }
  GetDeTermIsUse(t, e) {
    t = this.NormalLevelDataMap.get(t) ?? this.HardLevelDataMap.get(t);
    return !!t && t.GX_.includes(e);
  }
  GetQuestAnyRedDot() {
    for (var [, t] of this.DailyQuest)
      if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
        return !0;
    for (var [, e] of this.NormalQuest)
      if (e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
        return !0;
    return !1;
  }
  GetDifficultyNewLevelRedDot(t) {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (0 === t)
      for (var [r, i] of this.NormalLevelDataMap) {
        i = MathUtils_1.MathUtils.LongToNumber(i.yzs);
        if (i <= e)
          if (
            !(
              LocalStorage_1.LocalStorage.GetPlayer(
                LocalStorageDefine_1.ELocalStoragePlayerKey
                  .BabelTowerNewLevelHasClick,
              )?.get(r) ?? !1
            )
          )
            return !0;
      }
    else
      for (var [o, a] of this.HardLevelDataMap) {
        a = MathUtils_1.MathUtils.LongToNumber(a.yzs);
        if (a <= e)
          if (
            !(
              LocalStorage_1.LocalStorage.GetPlayer(
                LocalStorageDefine_1.ELocalStoragePlayerKey
                  .BabelTowerNewLevelHasClick,
              )?.get(o) ?? !1
            )
          )
            return !0;
      }
    return !1;
  }
  GetNewLevelRedDot(t) {
    var e =
      ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
        t,
      ).IsDifficult;
    let r = !1;
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    return (
      (r = e
        ? MathUtils_1.MathUtils.LongToNumber(
            this.HardLevelDataMap.get(t).yzs,
          ) <= i
        : MathUtils_1.MathUtils.LongToNumber(
            this.NormalLevelDataMap.get(t).yzs,
          ) <= i) &&
      !(
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .BabelTowerNewLevelHasClick,
        )?.get(t) ?? !1
      )
    );
  }
  GetNewLevel() {
    let t = 0;
    var e,
      r,
      i,
      o,
      a = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    let s = 0;
    for ([e, r] of this.NormalLevelDataMap) {
      var f = MathUtils_1.MathUtils.LongToNumber(r.yzs);
      f <= a && t < f && ((s = e), (t = f));
    }
    for ([i, o] of this.HardLevelDataMap) {
      var l = MathUtils_1.MathUtils.LongToNumber(o.yzs);
      l <= a && t < l && ((s = i), (t = l));
    }
    return s;
  }
  GetHardNewLevel() {
    let t = 0;
    var e,
      r,
      i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    let o = 0;
    for ([e, r] of this.HardLevelDataMap) {
      var a = MathUtils_1.MathUtils.LongToNumber(r.yzs);
      a <= i && t < a && ((o = e), (t = a));
    }
    return o;
  }
  GetNormalNewLevel() {
    let t = 0;
    var e,
      r,
      i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    let o = 0;
    for ([e, r] of this.NormalLevelDataMap) {
      var a = MathUtils_1.MathUtils.LongToNumber(r.yzs);
      a <= i && t < a && ((o = e), (t = a));
    }
    return o;
  }
  GetQuestTabRedDot(t) {
    if (0 === t) {
      for (var [, e] of this.DailyQuest)
        if (e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
          return !0;
    } else
      for (var [r, i] of this.NormalQuest) {
        (r =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerNormalQuest(
            r,
          )),
          (r =
            ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
              r.LevelId,
            ));
        if (r.IsDifficult && 2 === t) {
          if (i.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
            return !0;
        } else if (
          !r.IsDifficult &&
          1 === t &&
          i.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish
        )
          return !0;
      }
    return !1;
  }
  GetDailyDeTerm() {
    var t,
      e,
      r,
      i = [];
    for ([t, e] of this.DailyQuest)
      e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning &&
        ((r =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDailyQuest(
            t,
          )),
        i.push(...r.ShowDeTerm));
    return i;
  }
  GetDailyLevel() {
    var t,
      e,
      r,
      i = [];
    for ([t, e] of this.DailyQuest)
      e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning &&
        ((r =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDailyQuest(
            t,
          )),
        i.push(r.JumpToLevelId));
    return i;
  }
  GetExDataRedPointShowState() {
    return (
      this.GetQuestAnyRedDot() ||
      this.GetDifficultyNewLevelRedDot(0) ||
      this.GetDifficultyNewLevelRedDot(1)
    );
  }
}
exports.BabelTowerData = BabelTowerData;
//# sourceMappingURL=BabelTowerData.js.map
