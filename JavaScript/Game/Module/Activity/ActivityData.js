"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCacheData =
    exports.ActivityExData =
    exports.ActivityBaseData =
      void 0);
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ACTIVITYFORCECLOSETIME = -1;
class ActivityBaseData {
  constructor() {
    (this.T2e = 0),
      (this.c3e = void 0),
      (this.m3e = -0),
      (this.d3e = -0),
      (this.U2e = -0),
      (this.A2e = -0),
      (this.C3e = !1),
      (this.g3e = !1),
      (this.f3e = 0),
      (this.p3e = new Array()),
      (this.v3e = 0),
      (this.M3e = ""),
      (this.LocalConfig = void 0);
  }
  get Id() {
    return this.T2e;
  }
  GetCacheKey() {
    return this.M3e;
  }
  get Type() {
    return this.c3e;
  }
  get Sort() {
    return this.f3e;
  }
  get BeginShowTime() {
    return this.m3e;
  }
  get EndShowTime() {
    return this.d3e;
  }
  get BeginOpenTime() {
    return this.U2e;
  }
  get EndOpenTime() {
    return this.A2e;
  }
  get RedPointShowState() {
    return !!(
      this.CheckIfInShowTime() &&
      (this.g3e || (this.C3e && this.GetExDataRedPointShowState()))
    );
  }
  get ConditionGroupId() {
    return this.v3e;
  }
  CheckIfInShowTime() {
    return this.CheckIfInTimeInterval(this.m3e, this.d3e);
  }
  CheckIfClose() {
    return (
      (this.U2e === ACTIVITYFORCECLOSETIME &&
        this.A2e === ACTIVITYFORCECLOSETIME) ||
      !this.CheckIfInOpenTime()
    );
  }
  CheckIfInOpenTime() {
    return this.CheckIfInTimeInterval(this.U2e, this.A2e);
  }
  CheckIfInTimeInterval(t, e) {
    return (
      (t !== ACTIVITYFORCECLOSETIME || e !== ACTIVITYFORCECLOSETIME) &&
      ((t === 0 && e === 0) ||
        (t <= (t = TimeUtil_1.TimeUtil.GetServerTime()) && t <= e))
    );
  }
  GetPreviewReward(t = this.LocalConfig.PreviewDrop) {
    const e =
      ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t)?.DropPreview;
    const i = [];
    if (e)
      for (let [r, s] of e) {
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
    return !!this.C3e;
  }
  GetPreGuideQuestFinishState() {
    const e = this.p3e;
    const i = e.length;
    for (let t = 0; t < i; t++)
      if (
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e[t]) <
        Protocol_1.Aki.Protocol.kMs.Proto_Finish
      )
        return !1;
    return !!this.C3e;
  }
  GetUnFinishPreGuideQuestId() {
    const e = this.p3e;
    const i = e.length;
    for (let t = 0; t < i; t++)
      if (
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e[t]) <
        Protocol_1.Aki.Protocol.kMs.Proto_Finish
      )
        return e[t];
    return 0;
  }
  GetPreShowGuideQuestName() {
    const e = new StringBuilder_1.StringBuilder();
    const i = new Array();
    const r = this.p3e;
    let s = r.length;
    for (let t = 0; t < s; t++)
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r[0]) ||
        i.push(r[t]);
    s = i.length;
    for (let t = 0; t < s; t++) {
      const n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i[t]).TidName,
      );
      e.Append(n), t !== s - 1 && e.Append(",");
    }
    return e.ToString();
  }
  GetIfFirstOpen() {
    return this.g3e;
  }
  SetFirstOpenFalse() {
    this.g3e &&
      ((this.g3e = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.T2e,
      ));
  }
  GetExDataRedPointShowState() {
    return !1;
  }
  ForceClose() {
    (this.U2e = ACTIVITYFORCECLOSETIME),
      (this.A2e = ACTIVITYFORCECLOSETIME),
      (this.m3e = ACTIVITYFORCECLOSETIME),
      (this.d3e = ACTIVITYFORCECLOSETIME),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.T2e,
      );
  }
  Phrase(t) {
    (this.T2e = t.Ekn),
      (this.c3e = t.Ikn),
      (this.m3e = Number(MathUtils_1.MathUtils.LongToBigInt(t.l0s))),
      (this.d3e = Number(MathUtils_1.MathUtils.LongToBigInt(t._0s))),
      (this.U2e = Number(MathUtils_1.MathUtils.LongToBigInt(t.a0s))),
      (this.A2e = Number(MathUtils_1.MathUtils.LongToBigInt(t.h0s))),
      (this.C3e = t.m3n),
      (this.g3e = t.c0s),
      (this.LocalConfig =
        ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(
          this.T2e,
        )),
      (this.v3e = this.LocalConfig.PreConditionGroupId),
      (this.f3e = this.LocalConfig.Sort),
      (this.p3e = this.LocalConfig.PreShowGuideQuest),
      ModelManager_1.ModelManager.QuestNewModel.SetActivityQuestData(
        this.T2e,
        this.p3e,
      );
    const e = new StringBuilder_1.StringBuilder();
    e.Append(t.Ekn),
      e.Append("_"),
      e.Append(this.U2e),
      (this.M3e = e.ToString()),
      this.PhraseEx(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Activity",
          38,
          "活动数据刷新",
          ["Id", this.T2e],
          ["Type", this.c3e],
          ["IsUnlock", this.C3e],
          ["ShowTime", [this.m3e, this.d3e]],
          ["OpenTime", [this.U2e, this.A2e]],
          ["HasRedDot", this.RedPointShowState],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.T2e,
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
// # sourceMappingURL=ActivityData.js.map
