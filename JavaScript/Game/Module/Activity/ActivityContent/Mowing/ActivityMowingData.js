"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingData = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const KillMonstersScoresByInstanceID_1 = require("../../../../../Core/Define/ConfigQuery/KillMonstersScoresByInstanceID");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ScoreRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ScoreRewardById");
const TakeWeedsDifficultyById_1 = require("../../../../../Core/Define/ConfigQuery/TakeWeedsDifficultyById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityManager_1 = require("../../ActivityManager");
class ActivityMowingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.eke = void 0),
      (this.tke = void 0),
      (this.ike = void 0),
      (this.oke = void 0),
      (this.MowingLevelInfoDict = void 0),
      (this.ENe = (t, e) => {
        const [, i] = this.rke(t.RewardState);
        const [, r] = this.rke(e.RewardState);
        return i === r ? t.Id - e.Id : i - r;
      });
  }
  rke(t) {
    let [e, i] = ["", 0];
    switch (t) {
      case Protocol_1.Aki.Protocol.D0s.h3n:
        (e = "PrefabTextItem_1443074454_Text"), (i = 2);
        break;
      case Protocol_1.Aki.Protocol.D0s.j0s:
        (e = "CollectActivity_state_CanRecive"), (i = 1);
        break;
      case Protocol_1.Aki.Protocol.D0s.qms:
        (e = "CollectActivity_state_recived"), (i = 3);
    }
    let r = "";
    return [
      (r =
        e !== ""
          ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? ""
          : r),
      i,
    ];
  }
  PhraseEx(t) {
    if (t.f0s) {
      (this.eke = []),
        (this.tke = []),
        (this.oke = new Map()),
        (this.ike = new Map()),
        (this.MowingLevelInfoDict = new Map());
      for (const r of t.f0s.t0s) {
        const e =
          KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
            r.Ekn,
          );
        if (e) {
          this.MowingLevelInfoDict.set(r.Ekn, r);
          const t = this.nke(r, e);
          this.oke.set(r.Ekn, t), this.tke.push(t);
        }
      }
      for (const n of t.f0s.e0s) {
        const i = ScoreRewardById_1.configScoreRewardById.GetConfig(n.Ekn);
        const t = this.ske(n, i);
        this.eke.push(t), this.ike.set(n.Ekn, t);
      }
    } else (this.eke = []), (this.tke = []);
  }
  ske(t, e) {
    const i = ActivityManager_1.ActivityManager.GetActivityController(
      this.Type,
    );
    const [r] = this.rke(t.ckn);
    return {
      Id: t.Ekn,
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc),
      RewardList: this.ake(e.Reward),
      RewardButtonText: r,
      RewardState: t.ckn,
      ClickFunction: () => {
        i.RequestGetPointReward(this.Id, t.Ekn);
      },
    };
  }
  nke(t, e) {
    const i = ActivityManager_1.ActivityManager.GetActivityController(
      this.Type,
    );
    const [r] = this.rke(t.ckn);
    return {
      Id: t.Ekn,
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc),
      RewardList: this.ake(e.Reward),
      RewardState: t.ckn,
      RewardButtonText: r,
      ClickFunction: () => {
        i.RequestGetLevelReward(this.Id, e.InstanceID, t.Ekn);
      },
    };
  }
  hke(t, e) {
    const [i] = this.rke(t.RewardState);
    (t.NameText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      (t.RewardButtonText = i);
  }
  GetExDataRedPointShowState() {
    return this.IsHaveRewardToGet() || this.IsNewInstanceOpen();
  }
  IsHaveRewardToGet() {
    for (const t of this.eke) if (t.RewardState === 1) return !0;
    for (const e of this.tke) if (e.RewardState === 1) return !0;
    return !1;
  }
  IsNewInstanceOpen() {
    if (this.IsUnLock() && this.GetPreGuideQuestFinishState())
      for (const [, t] of this.MowingLevelInfoDict.entries()) {
        const e = t.JCs <= TimeUtil_1.TimeUtil.GetServerTime();
        if (
          !ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
            this.Id,
            0,
            t.Ekn,
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
    for (const [, t] of this.MowingLevelInfoDict.entries())
      t.JCs <= TimeUtil_1.TimeUtil.GetServerTime() &&
        ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
          this.Id,
          t.Ekn,
          0,
          0,
          1,
        );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  ake(t) {
    let e;
    let i;
    const r = [];
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
    for (const e of this.eke) {
      const t = ScoreRewardById_1.configScoreRewardById.GetConfig(e.Id);
      t && this.hke(e, t.Desc);
    }
    return this.eke.sort(this.ENe);
  }
  GetLevelRewards() {
    for (const e of this.tke) {
      const t =
        KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
          e.Id,
        );
      t && this.hke(e, t.Desc);
    }
    return this.tke.sort(this.ENe);
  }
  GetRewardViewData() {
    const t = StringUtils_1.StringUtils.Format(
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
    let e;
    var t = this.oke.get(t);
    t &&
      ((t.RewardState = 2),
      ([e] = this.rke(Protocol_1.Aki.Protocol.D0s.qms)),
      (t.RewardState = 2),
      (t.RewardButtonText = e));
  }
  SetPointRewardState(t) {
    let e;
    var t = this.ike.get(t);
    t &&
      (([e] = this.rke(Protocol_1.Aki.Protocol.D0s.qms)),
      (t.RewardState = 2),
      (t.RewardButtonText = e));
  }
  GetInstanceCurrentPoint(t) {
    return this.MowingLevelInfoDict.get(t)?.ZCs ?? 0;
  }
  SetInstanceCurrentSelectedDiff(t, e) {
    t = this.MowingLevelInfoDict.get(t);
    t && (t.a3n = e);
  }
  UpdatePointRewards(t) {
    for (const r of t.P0s) {
      var e = ScoreRewardById_1.configScoreRewardById.GetConfig(r.Ekn);
      var e = this.ske(r, e);
      const i = this.ike.get(r.Ekn);
      (i.RewardButtonText = e.RewardButtonText),
        (i.RewardState = e.RewardState);
    }
  }
  UpdateLevelRewards(t) {
    for (const r of t.t0s) {
      var e, i;
      this.MowingLevelInfoDict.get(r.Ekn)
        ? (this.MowingLevelInfoDict?.set(r.Ekn, r),
          (e = r),
          (i =
            KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
              e.Ekn,
            )),
          (e = this.nke(e, i)),
          ((i = this.oke.get(r.Ekn)).RewardState = e.RewardState),
          (i.RewardButtonText = e.RewardButtonText))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Activity", 50, "后端推了一个不存在的割草副本数据", [
            "id",
            r.Ekn.toString(),
          ]);
    }
  }
  GetLevelDiffIndex(t) {
    const e = this.MowingLevelInfoDict.get(t);
    return e
      ? KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID
          .GetConfig(t)
          .DifficultyOptions.indexOf(e.a3n)
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
      ? TakeWeedsDifficultyById_1.configTakeWeedsDifficultyById.GetConfig(t.a3n)
          ?.RecommendedLevel ?? 0
      : 0;
  }
  GetTotalPoint() {
    let t = 0;
    for (const [, e] of this.MowingLevelInfoDict) t += e.ZCs;
    return t;
  }
  GetLevelMaxPoint(t) {
    t = this.MowingLevelInfoDict.get(t);
    return t ? t.ZCs : 0;
  }
  GetActivityLevelUnlockState(t) {
    t = this.MowingLevelInfoDict?.get(t);
    return !!t && t.JCs <= TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetActivityLevelCountdownText(t) {
    t =
      (this.MowingLevelInfoDict?.get(t)).JCs -
      TimeUtil_1.TimeUtil.GetServerTime();
    return t <= 0 ? "" : this.lke(t);
  }
  lke(t) {
    var t = Math.max(t, TimeUtil_1.TimeUtil.Minute);
    const e = this.jNe(t);
    var t =
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
// # sourceMappingURL=ActivityMowingData.js.map
