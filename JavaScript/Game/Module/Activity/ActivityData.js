"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCacheData =
    exports.ActivityExData =
    exports.ActivityBaseData =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityCommonDefine_1 = require("./ActivityCommonDefine"),
  ACTIVITYFORCECLOSETIME = -1;
class ActivityBaseData {
  constructor() {
    (this.FFe = 0),
      (this.R4e = void 0),
      (this.Bel = 0),
      (this.U4e = -0),
      (this.EndShowTimeInternal = -0),
      (this.WFe = -0),
      (this.EndOpenTimeInternal = -0),
      (this.P4e = !1),
      (this.Dk_ = !1),
      (this.x4e = !1),
      (this.w4e = 0),
      (this.B4e = new Array()),
      (this.b4e = 0),
      (this.Bk_ = 0),
      (this._8a = []),
      (this.q4e = ""),
      (this.LocalConfig = void 0);
  }
  get Id() {
    return this.FFe;
  }
  GetCacheKey() {
    return this.q4e;
  }
  get Type() {
    return this.R4e;
  }
  get TimeType() {
    return this.Bel;
  }
  get Sort() {
    return this.w4e;
  }
  get BeginShowTime() {
    return this.U4e;
  }
  get EndShowTime() {
    return this.EndShowTimeInternal;
  }
  get BeginOpenTime() {
    return this.WFe;
  }
  get EndOpenTime() {
    return this.EndOpenTimeInternal;
  }
  get FinishShowState() {
    if (!this.LocalConfig) return !1;
    if (!this.LocalConfig.ShowTabFinish) return !1;
    try {
      if (!this.GetExDataFinishShowState()) return !1;
    } catch (t) {
      ModelManager_1.ModelManager.ActivityModel.OpenActivityErrorConfirmBox(
        this.Id,
        this.Type,
      ),
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Activity",
              37,
              "[Activity] 活动完成状态异常",
              t,
              ["id", this.Id],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 37, "[Activity] 活动完成状态异常", [
              "id",
              this.Id,
            ]);
    }
    return !0;
  }
  get FinishSinkState() {
    return (
      !!this.LocalConfig &&
      this.LocalConfig.SinkTabFinish &&
      this.FinishShowState
    );
  }
  get RedPointShowState() {
    if (this.CheckIfInShowTime()) {
      if (this.x4e) return !0;
      var t = this.Dk_ && this.HasPreOpenCondition();
      if (this.P4e || t)
        try {
          if (this.GetExDataRedPointShowState()) return !0;
        } catch (t) {
          ModelManager_1.ModelManager.ActivityModel.OpenActivityErrorConfirmBox(
            this.Id,
            this.Type,
          ),
            t instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "Activity",
                  37,
                  "[Activity] 活动红点异常",
                  t,
                  ["id", this.Id],
                  ["error", t.message],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Activity", 37, "[Activity] 活动红点异常", [
                  "id",
                  this.Id,
                ]);
        }
    }
    return !1;
  }
  get ConditionGroupId() {
    return this.b4e;
  }
  get PreOpenConditionGroupId() {
    return this.Bk_;
  }
  get FinishedConditionIdList() {
    return this._8a;
  }
  get BgTexturePath() {
    return this.LocalConfig.BgResource;
  }
  IsActivityConditionFinished(t) {
    return !!this.IsUnLock() || this._8a.includes(t);
  }
  CheckIfInShowTime() {
    return this.CheckIfInTimeInterval(this.U4e, this.EndShowTimeInternal);
  }
  CheckIfClose() {
    return (
      (this.WFe === ACTIVITYFORCECLOSETIME &&
        this.EndOpenTimeInternal === ACTIVITYFORCECLOSETIME) ||
      (!this.CheckIfInOpenTime() && !this.CheckIfInShowTime())
    );
  }
  CheckIfInOpenTime() {
    return this.CheckIfInTimeInterval(this.WFe, this.EndOpenTimeInternal);
  }
  CheckIfInTimeInterval(t, i) {
    return (
      (t !== ACTIVITYFORCECLOSETIME || i !== ACTIVITYFORCECLOSETIME) &&
      ((0 === t && 0 === i) ||
        (t <= (t = TimeUtil_1.TimeUtil.GetServerTime()) && t <= i))
    );
  }
  GetPreviewReward(t = this.LocalConfig.PreviewDrop) {
    var i = [];
    if (0 !== t) {
      var e =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          t,
        )?.DropPreview;
      if (e)
        for (var [r, s] of e) {
          r = [{ IncId: 0, ItemId: r }, s];
          i.push(r);
        }
      else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Activity", 27, "找不到奖励配置", ["id", t]);
    }
    return i;
  }
  GetTitle() {
    return void 0 === this.LocalConfig
      ? ""
      : (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          this.LocalConfig.Title,
        ) ?? "");
  }
  GetHelpId() {
    return this.LocalConfig.HelpId;
  }
  IsUnLock() {
    return !!this.P4e;
  }
  CanPreOpen() {
    return !!this.IsUnLock() || this.Dk_;
  }
  HasPreOpenCondition() {
    return 0 < this.Bk_;
  }
  GetPreGuideQuestFinishState() {
    var i = this.B4e,
      e = i.length;
    for (let t = 0; t < e; t++)
      if (
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i[t]) <
        Protocol_1.Aki.Protocol.hTs.a3_
      )
        return !1;
    return !!this.P4e;
  }
  GetUnFinishPreGuideQuestId() {
    var i = this.B4e,
      e = i.length;
    for (let t = 0; t < e; t++)
      if (
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i[t]) <
        Protocol_1.Aki.Protocol.hTs.a3_
      )
        return i[t];
    return 0;
  }
  GetPreShowGuideQuestName() {
    var i = new StringBuilder_1.StringBuilder(),
      e = new Array(),
      r = this.B4e;
    let s = r.length;
    for (let t = 0; t < s; t++)
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r[0]) ||
        e.push(r[t]);
    s = e.length;
    for (let t = 0; t < s; t++) {
      var h = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e[t]).TidName,
      );
      i.Append(h), t !== s - 1 && i.Append(",");
    }
    return i.ToString();
  }
  GetIfFirstOpen() {
    return this.x4e;
  }
  SetFirstOpenFalse() {
    this.x4e &&
      (this.OnSetFirstOpenFalse(),
      (this.x4e = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.FFe,
      ));
  }
  OnSetFirstOpenFalse() {}
  GetExDataFinishShowState() {
    return !1;
  }
  GetExDataRedPointShowState() {
    return !1;
  }
  ForceClose() {
    (this.WFe = ACTIVITYFORCECLOSETIME),
      (this.EndOpenTimeInternal = ACTIVITYFORCECLOSETIME),
      (this.U4e = ACTIVITYFORCECLOSETIME),
      (this.EndShowTimeInternal = ACTIVITYFORCECLOSETIME),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.FFe,
      );
  }
  Init(t) {
    (this.FFe = t.s5n),
      (this.R4e = t.h5n),
      (this.LocalConfig =
        ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(
          this.FFe,
        )),
      this.LocalConfig &&
        ((this.b4e = this.LocalConfig.PreConditionGroupId),
        (this.Bk_ = this.LocalConfig.PreOpenCondition),
        (this.w4e = this.LocalConfig.Sort),
        (this.B4e = this.LocalConfig.PreShowGuideQuest)),
      ModelManager_1.ModelManager.QuestNewModel.SetActivityQuestData(
        this.FFe,
        this.B4e ?? [],
      ),
      (this.U4e = Number(MathUtils_1.MathUtils.LongToBigInt(t.wps))),
      (this.EndShowTimeInternal = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.xps),
      )),
      (this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps))),
      (this.EndOpenTimeInternal = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.Ups),
      )),
      (this.P4e = t.K6n),
      (this.Dk_ = t.lk_),
      (this.x4e = t.qps),
      (this._8a = t.qS_),
      (this.Bel = ActivityCommonDefine_1.timeTypeStateResolver[t.OS_]),
      this.OnInit(t);
  }
  Phrase(t) {
    (this.U4e = Number(MathUtils_1.MathUtils.LongToBigInt(t.wps))),
      (this.EndShowTimeInternal = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.xps),
      )),
      (this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps))),
      (this.EndOpenTimeInternal = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.Ups),
      )),
      (this.P4e = t.K6n),
      (this.Dk_ = t.lk_),
      (this.x4e = t.qps),
      (this._8a = t.qS_);
    var i = new StringBuilder_1.StringBuilder();
    i.Append(t.s5n),
      i.Append("_"),
      i.Append(this.WFe),
      (this.q4e = i.ToString()),
      this.PhraseEx(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Activity",
          37,
          "活动数据刷新",
          ["Id", this.FFe],
          ["Type", this.R4e],
          ["IsUnlock", this.P4e],
          ["ShowTime", [this.U4e, this.EndShowTimeInternal]],
          ["OpenTime", [this.WFe, this.EndOpenTimeInternal]],
          ["HasRedDot", this.RedPointShowState],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.FFe,
      );
  }
  OnInit(t) {}
  PhraseEx(t) {}
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
}
exports.ActivityBaseData = ActivityBaseData;
class ActivityExData {
  constructor(t) {
    (this.ActivityId = 0), (this.ActivityId = t);
  }
  GetActivityId() {
    return this.ActivityId;
  }
  RefreshActivityRedPoint() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.ActivityId,
    );
  }
}
exports.ActivityExData = ActivityExData;
class ActivityCacheData {
  constructor() {
    (this.Key = 0), (this.Value = 0);
  }
}
exports.ActivityCacheData = ActivityCacheData;
//# sourceMappingURL=ActivityData.js.map
