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
  ACTIVITYFORCECLOSETIME = -1;
class ActivityBaseData {
  constructor() {
    (this.FFe = 0),
      (this.R4e = void 0),
      (this.U4e = -0),
      (this.EndShowTimeInternal = -0),
      (this.WFe = -0),
      (this.EndOpenTimeInternal = -0),
      (this.P4e = !1),
      (this.x4e = !1),
      (this.w4e = 0),
      (this.B4e = new Array()),
      (this.b4e = 0),
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
  get RedPointShowState() {
    return !!(
      this.CheckIfInShowTime() &&
      (this.x4e || (this.P4e && this.GetExDataRedPointShowState()))
    );
  }
  get ConditionGroupId() {
    return this.b4e;
  }
  CheckIfInShowTime() {
    return this.CheckIfInTimeInterval(this.U4e, this.EndShowTimeInternal);
  }
  CheckIfClose() {
    return (
      (this.WFe === ACTIVITYFORCECLOSETIME &&
        this.EndOpenTimeInternal === ACTIVITYFORCECLOSETIME) ||
      !this.CheckIfInOpenTime()
    );
  }
  CheckIfInOpenTime() {
    return this.CheckIfInTimeInterval(this.WFe, this.EndOpenTimeInternal);
  }
  CheckIfInTimeInterval(t, e) {
    return (
      (t !== ACTIVITYFORCECLOSETIME || e !== ACTIVITYFORCECLOSETIME) &&
      ((0 === t && 0 === e) ||
        (t <= (t = TimeUtil_1.TimeUtil.GetServerTime()) && t <= e))
    );
  }
  GetPreviewReward(t = this.LocalConfig.PreviewDrop) {
    var e =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          t,
        )?.DropPreview,
      i = [];
    if (e)
      for (var [r, s] of e) {
        r = [{ IncId: 0, ItemId: r }, s];
        i.push(r);
      }
    else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 28, "找不到奖励配置", ["id", t]);
    return i;
  }
  GetTitle() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      this.LocalConfig.Title,
    );
  }
  GetHelpId() {
    return this.LocalConfig.HelpId;
  }
  IsUnLock() {
    return !!this.P4e;
  }
  GetPreGuideQuestFinishState() {
    var e = this.B4e,
      i = e.length;
    for (let t = 0; t < i; t++)
      if (
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e[t]) <
        Protocol_1.Aki.Protocol.tTs.Proto_Finish
      )
        return !1;
    return !!this.P4e;
  }
  GetUnFinishPreGuideQuestId() {
    var e = this.B4e,
      i = e.length;
    for (let t = 0; t < i; t++)
      if (
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e[t]) <
        Protocol_1.Aki.Protocol.tTs.Proto_Finish
      )
        return e[t];
    return 0;
  }
  GetPreShowGuideQuestName() {
    var e = new StringBuilder_1.StringBuilder(),
      i = new Array(),
      r = this.B4e;
    let s = r.length;
    for (let t = 0; t < s; t++)
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r[0]) ||
        i.push(r[t]);
    s = i.length;
    for (let t = 0; t < s; t++) {
      var n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i[t]).TidName,
      );
      e.Append(n), t !== s - 1 && e.Append(",");
    }
    return e.ToString();
  }
  GetIfFirstOpen() {
    return this.x4e;
  }
  SetFirstOpenFalse() {
    this.x4e &&
      ((this.x4e = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.FFe,
      ));
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
  Phrase(t) {
    (this.FFe = t.J4n),
      (this.R4e = t.Z4n),
      (this.U4e = Number(MathUtils_1.MathUtils.LongToBigInt(t.Tps))),
      (this.EndShowTimeInternal = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.Lps),
      )),
      (this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.yps))),
      (this.EndOpenTimeInternal = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.Ips),
      )),
      (this.P4e = t.G6n),
      (this.x4e = t.Dps),
      (this.LocalConfig =
        ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(
          this.FFe,
        )),
      (this.b4e = this.LocalConfig.PreConditionGroupId),
      (this.w4e = this.LocalConfig.Sort),
      (this.B4e = this.LocalConfig.PreShowGuideQuest),
      ModelManager_1.ModelManager.QuestNewModel.SetActivityQuestData(
        this.FFe,
        this.B4e,
      );
    var e = new StringBuilder_1.StringBuilder();
    e.Append(t.J4n),
      e.Append("_"),
      e.Append(this.WFe),
      (this.q4e = e.ToString()),
      this.PhraseEx(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Activity",
          38,
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
