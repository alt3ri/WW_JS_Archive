"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCollectionData = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityCollectionController_1 = require("./ActivityCollectionController");
class ActivityCollectionData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.TaskIdToQuestIdMap = new Map()),
      (this.QuestStateMap = new Map()),
      (this.MNe = new Map()),
      (this.ENe = -1),
      (this.SNe = (t, e) => {
        var i = this.QuestStateMap.get(t.Id),
          r = this.QuestStateMap.get(e.Id),
          [, , i] = this.yNe(i.QuestState, i.ClaimedReward),
          [, , r] = this.yNe(r.QuestState, r.ClaimedReward);
        return i === r ? t.Id - e.Id : i - r;
      });
  }
  PhraseEx(t) {
    this.RefreshRewardData(), this.GetTotalProgress();
    t = t.Hps?.vps;
    if (t)
      for (const o of t) {
        var e,
          i = this.MNe.get(o.gps),
          r = this.TaskIdToQuestIdMap.get(o.gps),
          a = this.QuestStateMap.get(r);
        a &&
          i &&
          ((e = o.Y4n === Protocol_1.Aki.Protocol.dks.Proto_GatherTakeReward),
          ([e, r] =
            ((a.ClaimedReward = e),
            this.QuestStateMap.set(r, a),
            this.yNe(a.QuestState, a.ClaimedReward))),
          (i.RewardState = e),
          (i.RewardButtonText = r),
          this.MNe.set(o.gps, i));
      }
    (ActivityCollectionController_1.ActivityCollectionController.CurrentActivityId =
      this.Id),
      UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
          this.GetAllRewardQuestDataList(),
        );
  }
  GetExDataRedPointShowState() {
    return this.IsHasRewardRedPoint() || this.IsHasNewQuestRedDot();
  }
  IsHasRewardRedPoint() {
    for (const t of this.QuestStateMap.entries())
      if (3 === t[1].QuestState && !t[1].ClaimedReward) return !0;
    return !1;
  }
  IsHasNewQuestRedDot() {
    for (var [t, e] of this.QuestStateMap.entries())
      if (3 !== e.QuestState && 0 !== e.QuestState)
        if (
          ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
            this.Id,
            0,
            t,
            0,
            0,
          )
        )
          return !0;
    return !1;
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetAllRewardQuestDataList() {
    return (
      this.RefreshRewardData(),
      {
        DataPageList: [
          { DataList: Array.from(this.MNe.values()).sort(this.SNe) },
        ],
      }
    );
  }
  GetProgressState() {
    var [t, e] = this.GetCurrentProgress();
    return t === this.GetTotalProgress() ? 2 : e ? 0 : 1;
  }
  GetCurrentProgress() {
    let i = 0,
      r = !0;
    return (
      this.QuestStateMap.forEach((t, e) => {
        2 <= t.QuestState && (r = !1), 3 === t.QuestState && i++;
      }),
      [i, r]
    );
  }
  GetCurrentProgressQuestId() {
    for (const t of this.QuestStateMap.entries())
      if (t[1].QuestState <= 2) return t[0];
    return 0;
  }
  GetTotalProgress() {
    var t;
    return (
      -1 === this.ENe &&
        ((t =
          ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetAllActivityCollectionConfig()),
        (this.ENe = t.length)),
      this.ENe
    );
  }
  RefreshRewardData() {
    let t = 0;
    for (const s of ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetAllActivityCollectionConfig()) {
      var e,
        i,
        r,
        a,
        o = this.MNe.get(s.Id);
      o
        ? ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(
            s.PlayTask,
          )),
          (i = this.QuestStateMap.get(s.PlayTask)),
          ([i, r] = this.yNe(i.QuestState, i.ClaimedReward)),
          (o.NameText = e?.TidName
            ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidName)
            : ""),
          (o.RewardState = i),
          (o.RewardButtonText = r),
          this.MNe.set(s.Id, o))
        : ((e = this.INe(s.Reward)),
          (i = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(
            s.PlayTask,
          )),
          (r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
            s.PlayTask,
          )),
          ([o, a] = this.yNe(r, !1)),
          (a = {
            QuestState: r,
            ClaimedReward: !(o = {
              NameText: i?.TidName
                ? PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidName)
                : "",
              RewardState: o,
              RewardList: e,
              RewardButtonText: a,
              Id: s.PlayTask,
              ClickFunction: () => {
                ActivityCollectionController_1.ActivityCollectionController.RequestCollectionQuestReward(
                  s.Id,
                );
              },
            }),
            QuestUnlockStamp: this.TNe(this.BeginOpenTime, t),
          }),
          this.TaskIdToQuestIdMap.set(s.Id, s.PlayTask),
          this.QuestStateMap.set(s.PlayTask, a),
          this.MNe.set(s.Id, o),
          t++);
    }
  }
  TNe(t, e) {
    (t = new Date(t * TimeUtil_1.TimeUtil.InverseMillisecond)),
      t.setHours(TimeUtil_1.TimeUtil.CrossDayHour),
      (t = t.getTime() * TimeUtil_1.TimeUtil.Millisecond);
    return t + e * TimeUtil_1.TimeUtil.OneDaySeconds;
  }
  yNe(t, e) {
    let i = 0,
      r = "",
      a = 0;
    switch (t) {
      case 0:
      case 1:
        (i = 0), (r = "CollectActivity_state_unopen"), (a = 2);
        break;
      case 2:
        (i = 0), (r = "CollectActivity_state_open"), (a = 1);
        break;
      case 3:
        (i = e ? 2 : 1),
          (r = "CollectActivity_state_CanRecive"),
          (a = e ? 3 : 0);
    }
    return (
      (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r)), [i, r, a]
    );
  }
  INe(t) {
    var t =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          t,
        )?.DropPreview,
      e = [];
    if (t)
      for (var [i, r] of t) {
        i = [{ IncId: 0, ItemId: i }, r];
        e.push(i);
      }
    return e;
  }
}
exports.ActivityCollectionData = ActivityCollectionData;
//# sourceMappingURL=ActivityCollectionData.js.map
