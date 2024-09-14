"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  KillMonstersScoresByInstanceID_1 = require("../../../../../Core/Define/ConfigQuery/KillMonstersScoresByInstanceID"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ScoreRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ScoreRewardById"),
  TakeWeedsDifficultyById_1 = require("../../../../../Core/Define/ConfigQuery/TakeWeedsDifficultyById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityManager_1 = require("../../ActivityManager");
class ActivityMowingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.f2e = void 0),
      (this.p2e = void 0),
      (this.v2e = void 0),
      (this.M2e = void 0),
      (this.MowingLevelInfoDict = void 0),
      (this.SNe = (t, e) => {
        var [, i] = this.E2e(t.RewardState),
          [, r] = this.E2e(e.RewardState);
        return i === r ? t.Id - e.Id : i - r;
      });
  }
  E2e(t) {
    let [e, i] = ["", 0];
    switch (t) {
      case Protocol_1.Aki.Protocol.zps.Z6n:
        (e = "PrefabTextItem_1443074454_Text"), (i = 2);
        break;
      case Protocol_1.Aki.Protocol.zps.CMs:
        (e = "CollectActivity_state_CanRecive"), (i = 1);
        break;
      case Protocol_1.Aki.Protocol.zps.ovs:
        (e = "CollectActivity_state_recived"), (i = 3);
    }
    let r = "";
    return [
      (r =
        "" !== e
          ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "")
          : r),
      i,
    ];
  }
  PhraseEx(t) {
    if (t.Fps) {
      (this.f2e = []),
        (this.p2e = []),
        (this.M2e = new Map()),
        (this.v2e = new Map()),
        (this.MowingLevelInfoDict = new Map());
      for (const r of t.Fps.Ips) {
        var e =
          KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
            r.s5n,
          );
        if (e) {
          this.MowingLevelInfoDict.set(r.s5n, r);
          const t = this.S2e(r, e);
          this.M2e.set(r.s5n, t), this.p2e.push(t);
        }
      }
      for (const n of t.Fps.yps) {
        var i = ScoreRewardById_1.configScoreRewardById.GetConfig(n.s5n);
        const t = this.y2e(n, i);
        this.f2e.push(t), this.v2e.set(n.s5n, t);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ActivityViewRefreshCurrent,
        this.Id,
      );
    } else (this.f2e = []), (this.p2e = []);
  }
  y2e(t, e) {
    const i = ActivityManager_1.ActivityManager.GetActivityController(
      this.Type,
    );
    var [r] = this.E2e(t.Y4n);
    return {
      Id: t.s5n,
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc),
      RewardList: this.I2e(e.Reward),
      RewardButtonText: r,
      RewardState: t.Y4n,
      ClickFunction: () => {
        i.RequestGetPointReward(this.Id, t.s5n);
      },
    };
  }
  S2e(t, e) {
    const i = ActivityManager_1.ActivityManager.GetActivityController(
      this.Type,
    );
    var [r] = this.E2e(t.Y4n);
    return {
      Id: t.s5n,
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc),
      RewardList: this.I2e(e.Reward),
      RewardState: t.Y4n,
      RewardButtonText: r,
      ClickFunction: () => {
        i.RequestGetLevelReward(this.Id, e.InstanceID, t.s5n);
      },
    };
  }
  T2e(t, e) {
    var [i] = this.E2e(t.RewardState);
    (t.NameText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      (t.RewardButtonText = i);
  }
  GetExDataRedPointShowState() {
    return this.IsHaveRewardToGet() || this.IsNewInstanceOpen();
  }
  IsHaveRewardToGet() {
    for (const t of this.f2e) if (1 === t.RewardState) return !0;
    for (const e of this.p2e) if (1 === e.RewardState) return !0;
    return !1;
  }
  IsNewInstanceOpen() {
    if (this.IsUnLock() && this.GetPreGuideQuestFinishState())
      for (var [, t] of this.MowingLevelInfoDict.entries()) {
        var e = t.Mps <= TimeUtil_1.TimeUtil.GetServerTime();
        if (
          !ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
            this.Id,
            0,
            t.s5n,
            0,
            0,
          ) &&
          e
        )
          return !0;
      }
    return !1;
  }
  ReadNewInstance() {
    for (var [, t] of this.MowingLevelInfoDict.entries())
      t.Mps <= TimeUtil_1.TimeUtil.GetServerTime() &&
        ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
          this.Id,
          t.s5n,
          0,
          0,
          1,
        );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  I2e(t) {
    var e,
      i,
      r = [];
    for ([
      e,
      i,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t))
      r.push([{ ItemId: e, IncId: 0 }, i]);
    return r;
  }
  GetDesc() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      this.LocalConfig.Desc,
    );
  }
  GetPointRewards() {
    for (const e of this.f2e) {
      var t = ScoreRewardById_1.configScoreRewardById.GetConfig(e.Id);
      t && this.T2e(e, t.Desc);
    }
    return this.f2e.sort(this.SNe);
  }
  GetLevelRewards() {
    for (const e of this.p2e) {
      var t =
        KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
          e.Id,
        );
      t && this.T2e(e, t.Desc);
    }
    return this.p2e.sort(this.SNe);
  }
  GetRewardViewData() {
    var t = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MowingTotalPoint"),
      this.GetTotalPoint().toString(),
    );
    return {
      DataPageList: [
        {
          DataList: this.GetLevelRewards(),
          TabName:
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "MowingLevelRewards",
            ),
          TabTips: t,
        },
        {
          DataList: this.GetPointRewards(),
          TabName:
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "MowingPointRewards",
            ),
          TabTips: t,
        },
      ],
    };
  }
  SetLevelRewardStateToGot(t) {
    var e,
      t = this.M2e.get(t);
    t &&
      ((t.RewardState = 2),
      ([e] = this.E2e(Protocol_1.Aki.Protocol.zps.ovs)),
      (t.RewardState = 2),
      (t.RewardButtonText = e));
  }
  SetPointRewardState(t) {
    var e,
      t = this.v2e.get(t);
    t &&
      (([e] = this.E2e(Protocol_1.Aki.Protocol.zps.ovs)),
      (t.RewardState = 2),
      (t.RewardButtonText = e));
  }
  GetInstanceCurrentPoint(t) {
    return this.MowingLevelInfoDict.get(t)?.Eps ?? 0;
  }
  SetInstanceCurrentSelectedDiff(t, e) {
    t = this.MowingLevelInfoDict.get(t);
    t && (t.z6n = e);
  }
  UpdatePointRewards(t) {
    for (const r of t.eMs) {
      var e = ScoreRewardById_1.configScoreRewardById.GetConfig(r.s5n),
        e = this.y2e(r, e),
        i = this.v2e.get(r.s5n);
      (i.RewardButtonText = e.RewardButtonText),
        (i.RewardState = e.RewardState);
    }
  }
  UpdateLevelRewards(t) {
    for (const r of t.Ips) {
      var e, i;
      this.MowingLevelInfoDict.get(r.s5n)
        ? (this.MowingLevelInfoDict?.set(r.s5n, r),
          (e = r),
          (i =
            KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
              e.s5n,
            )),
          (e = this.S2e(e, i)),
          ((i = this.M2e.get(r.s5n)).RewardState = e.RewardState),
          (i.RewardButtonText = e.RewardButtonText))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Activity", 50, "后端推了一个不存在的割草副本数据", [
            "id",
            r.s5n.toString(),
          ]);
    }
  }
  GetLevelDiffIndex(t) {
    var e = this.MowingLevelInfoDict.get(t);
    return e
      ? KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID
          .GetConfig(t)
          .DifficultyOptions.indexOf(e.z6n)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Activity",
            50,
            "当前[击杀积分|KillMonstersScores]没有割草活动副本数据",
          ),
        0);
  }
  GetLevelDiffRecommendLevel(t) {
    t = this.MowingLevelInfoDict.get(t);
    return t
      ? (TakeWeedsDifficultyById_1.configTakeWeedsDifficultyById.GetConfig(
          t.z6n,
        )?.RecommendedLevel ?? 0)
      : 0;
  }
  GetTotalPoint() {
    let t = 0;
    for (var [, e] of this.MowingLevelInfoDict) t += e.Eps;
    return t;
  }
  GetLevelMaxPoint(t) {
    t = this.MowingLevelInfoDict.get(t);
    return t ? t.Eps : 0;
  }
  GetActivityLevelUnlockState(t) {
    t = this.MowingLevelInfoDict?.get(t);
    return !!t && t.Mps <= TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetActivityLevelCountdownText(t) {
    t =
      (this.MowingLevelInfoDict?.get(t)).Mps -
      TimeUtil_1.TimeUtil.GetServerTime();
    return t <= 0 ? "" : this.L2e(t);
  }
  L2e(t) {
    var t = Math.max(t, TimeUtil_1.TimeUtil.Minute),
      e = this.jNe(t),
      t =
        TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1])
          .CountDownText ?? "";
    return StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "ActivityMowing_UnlockCondition",
      ),
      t,
    );
  }
  jNe(t) {
    return t > CommonDefine_1.SECOND_PER_DAY
      ? [3, 3]
      : t > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 2]
        : [1, 1];
  }
}
exports.ActivityMowingData = ActivityMowingData;
//# sourceMappingURL=ActivityMowingData.js.map
