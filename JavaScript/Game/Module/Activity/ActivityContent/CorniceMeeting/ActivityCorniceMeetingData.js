"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCorniceMeetingData =
    exports.ActivityCorniceMeetingLevelEntryData =
      void 0);
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
class ActivityCorniceMeetingLevelEntryData {
  constructor(t, e) {
    (this.LevelPlayId = 0),
      (this.MaxScore = 0),
      (this.RemainTime = 0),
      (this.UnlockTime = 0),
      (this.CurrentScore = 0),
      (this.RewardedMap = new Map()),
      (this.LevelPlayId = e),
      (this.MaxScore = t.tBs),
      (this.RemainTime = t.gih),
      (this.UnlockTime = MathUtils_1.MathUtils.LongToNumber(t.yzs)),
      t.fih.forEach((t) => {
        this.RewardedMap.set(t, !0);
      });
  }
  IsUnlock() {
    return 0 !== this.UnlockTime
      ? TimeUtil_1.TimeUtil.GetServerTimeStamp() >= this.UnlockTime
      : 0 === this.UnlockTime;
  }
  IsRewarded(t) {
    return this.RewardedMap.has(t);
  }
  IsAllFinished() {
    return this.MaxScore === this.GetMaxScoreConfig();
  }
  UpdateData(t) {
    (this.MaxScore = t.tBs),
      (this.UnlockTime = MathUtils_1.MathUtils.LongToNumber(t.yzs)),
      t.fih.forEach((t) => {
        this.RewardedMap.set(t, !0);
      });
  }
  UpdateRewarded(t) {
    this.RewardedMap.set(t, !0);
  }
  GetBackgroundPath() {
    return ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
      this.LevelPlayId,
    ).BackgroundTexture;
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
      this.LevelPlayId,
    ).Title;
  }
  GetMarkId() {
    return ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
      this.LevelPlayId,
    ).MarkId;
  }
  GetMaxScoreConfig() {
    return ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
      this.LevelPlayId,
    ).MaxScore;
  }
  IsRewardAllFinished() {
    return (
      ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
        this.LevelPlayId,
      ).RewardList.length === this.RewardedMap.size
    );
  }
  GetRewardList() {
    return ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
      this.LevelPlayId,
    ).RewardList.map((t) => t.Item1);
  }
  GetRewardPair(t) {
    return ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
      this.LevelPlayId,
    ).RewardList[t];
  }
  GetRedDot() {
    return !(
      !this.IsUnlock() ||
      (!this.GetChallengeNewLocalRedDot() && !this.GetScoreRedDot())
    );
  }
  GetScoreRedDot() {
    var e =
      ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(
        this.LevelPlayId,
      );
    let i = !1;
    for (let t = 0; t < e.RewardList.length; t++)
      if (this.MaxScore >= e.RewardList[t].Item1 && !this.RewardedMap.has(t)) {
        i = !0;
        break;
      }
    return i;
  }
  SetChallengeLocalRedDot(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController
        .ActivityId,
      this.LevelPlayId,
      0,
      0,
      t ? 1 : 0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController
          .ActivityId,
      );
  }
  GetChallengeNewLocalRedDot() {
    return (
      1 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController
          .ActivityId,
        1,
        this.LevelPlayId,
        0,
        0,
      )
    );
  }
}
exports.ActivityCorniceMeetingLevelEntryData =
  ActivityCorniceMeetingLevelEntryData;
class ActivityCorniceMeetingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.LevelEntryMap = new Map()),
      (this.CurrentSelectLevelPlayId = 0),
      (this.UnlockTime = 0);
  }
  PhraseEx(t) {
    this.UnlockTime = MathUtils_1.MathUtils.LongToNumber(t.dih.lih);
    for (const e of Object.keys(t.dih._ih))
      0 === this.CurrentSelectLevelPlayId &&
        (this.CurrentSelectLevelPlayId = Number(e)),
        this.LevelEntryMap.has(Number(e))
          ? this.LevelEntryMap.get(Number(e))?.UpdateData(t.dih._ih[Number(e)])
          : this.LevelEntryMap.set(
              Number(e),
              new ActivityCorniceMeetingLevelEntryData(
                t.dih._ih[Number(e)],
                Number(e),
              ),
            );
  }
  GetLevelPlayIdList(t = !0) {
    return t
      ? Array.from(this.LevelEntryMap.keys()).sort((t, e) => {
          (t =
            ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeConfig(
              t,
            )),
            (e =
              ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeConfig(
                e,
              ));
          return t && e ? t.SortId - e.SortId : 0;
        })
      : Array.from(this.LevelEntryMap.keys());
  }
  UpdateRewarded(t, e) {
    this.LevelEntryMap.get(t)?.UpdateRewarded(e);
  }
  GetLevelEntryData(t) {
    return this.LevelEntryMap.get(t);
  }
  GetDefaultSelectLevelPlayId() {
    var t = this.GetLevelPlayIdList();
    this.CurrentSelectLevelPlayId = t[0];
    for (const e of t)
      if (
        this.GetLevelEntryData(e)?.IsUnlock() &&
        !this.GetLevelEntryData(e)?.IsRewardAllFinished()
      ) {
        this.CurrentSelectLevelPlayId = e;
        break;
      }
    return this.CurrentSelectLevelPlayId;
  }
  GetSelectLevelPlayIdIndex() {
    return this.GetLevelPlayIdList().indexOf(this.CurrentSelectLevelPlayId);
  }
  GetScoreIndexPreviewItem(t, e) {
    t =
      ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeConfig(
        t,
      );
    if (!t) return [];
    t = t.RewardList.find((t) => t.Item1 === e);
    if (void 0 === t) return [];
    var i,
      r,
      t = t.Item2,
      n = [];
    if (0 !== t)
      for ([i, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
        t,
      ).DropPreview) {
        var s = [{ IncId: 0, ItemId: i }, r];
        n.push(s);
      }
    return n;
  }
  GetRewardState(t, e) {
    t = this.GetLevelEntryData(t);
    return t
      ? t.IsRewarded(e)
        ? 2
        : ((e = t.GetRewardPair(e)), t.MaxScore >= e.Item1 ? 1 : 0)
      : 0;
  }
  IsUnlockTailQuest() {
    let t = !0;
    for (const e of this.GetLevelPlayIdList())
      if (0 === this.GetLevelEntryData(e)?.MaxScore) {
        t = !1;
        break;
      }
    return (
      (0 === this.UnlockTime ||
        TimeUtil_1.TimeUtil.GetServerTimeStamp() >= this.UnlockTime) &&
      t
    );
  }
  GetIsShow(t) {
    return !!(
      this.GetLevelEntryData(t)?.IsUnlock() &&
      this.CheckIfInShowTime() &&
      this.GetPreGuideQuestFinishState()
    );
  }
  CheckIfInShowTime() {
    var t;
    return (
      (0 === this.BeginOpenTime && 0 === this.EndOpenTime) ||
      ((t = TimeUtil_1.TimeUtil.GetServerTime()) >= this.BeginOpenTime &&
        t <= this.EndOpenTime)
    );
  }
  GetExDataRedPointShowState() {
    if (!this.GetPreGuideQuestFinishState())
      return (
        0 ===
        ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(
          this.Id,
          0,
          this.GetUnFinishPreGuideQuestId(),
          0,
          0,
        )
      );
    for (const t of this.GetLevelPlayIdList())
      if (this.GetLevelEntryData(t)?.GetRedDot()) return !0;
    return !1;
  }
  SavePreQuestRedDot(t) {
    ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(
      this.Id,
      t,
      0,
      0,
      1,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  RefreshAllLevelEntryDataRedDot() {
    for (const t of this.GetLevelPlayIdList())
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCorniceMeetingRedDot,
        t,
      );
  }
}
exports.ActivityCorniceMeetingData = ActivityCorniceMeetingData;
//# sourceMappingURL=ActivityCorniceMeetingData.js.map
