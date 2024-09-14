"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMoonChasingData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager"),
  ActivityCommonDefine_1 = require("../../../ActivityCommonDefine"),
  ActivityData_1 = require("../../../ActivityData"),
  ActivityMoonChasingController_1 = require("./ActivityMoonChasingController");
class ActivityMoonChasingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.LimitTimeRewardOn = !1),
      (this.ZKs = new Map()),
      (this.PermanentTargetOn = !1),
      (this.ActivityFlowState = 0),
      (this.SNe = (e, t) => {
        var i = this.ZKs.get(e.Id),
          a = this.ZKs.get(t.Id);
        return i === a ? e.Id - t.Id : i - a;
      });
  }
  PhraseEx(e) {
    (this.LimitTimeRewardOn = !1),
      (this.PermanentTargetOn = !1),
      (this.ActivityFlowState = 0);
    var t =
      ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(
        this.Id,
      );
    if (t) {
      (this.LimitTimeRewardOn = t.ActivityReward),
        (this.PermanentTargetOn = t.PermanentTarget),
        (this.ActivityFlowState = 0 === t.ActivityButtonType ? 0 : 1),
        this.ZKs.clear();
      t = e.y$s;
      if (t) {
        for (const i of t.E$s)
          this.ZKs.set(i.s5n, ActivityCommonDefine_1.taskStateResolver[i.H6n]);
        this.LimitTimeRewardOn && this.eQs();
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Activity",
          38,
          "[ActivityMoonChasing] 活动配置不存在",
          ["Id", this.Id],
        );
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetExDataRedPointShowState() {
    return (
      (1 !== this.ActivityFlowState &&
        (this.IsHasLimitTimeReward() || this.XLa() || this.YLa())) ||
      this.IsHasMoonChasingRedDot()
    );
  }
  IsPreStageQuestFinished() {
    var e =
      ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(
        this.Id,
      );
    return (
      !e ||
      void 0 === (e = e.StageQuestId) ||
      0 === e ||
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e)
    );
  }
  GetPreStageQuestId() {
    var e =
      ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1);
    if (e) return e.Id;
  }
  GetAllRewardData() {
    var e,
      t,
      i = [];
    for ([e, t] of this.ZKs) {
      var a = this.tQs(e, t);
      a && i.push(a);
    }
    if (0 !== i.length)
      return { DataPageList: [{ DataList: i.sort(this.SNe) }] };
  }
  tQs(e, n) {
    const s =
      ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingRewardConfigById(
        e,
      );
    if (s) {
      let e = 0,
        t = "",
        i = () => {},
        a = !1,
        r = !1;
      switch (n) {
        case 1:
          s.TargetFunc
            ? ((i = () => {
                SkipTaskManager_1.SkipTaskManager.RunByConfigId(s.TargetFunc);
              }),
              (e = 1),
              (t = "Moonfiesta_Skip"),
              (r = !0))
            : ((e = 0), (t = "Moonfiesta_Underway"));
          break;
        case 0:
          (e = 1),
            (t = "Moonfiesta_AwardGet"),
            (a = !0),
            (i = () => {
              ActivityMoonChasingController_1.ActivityMoonChasingController.TrackMoonActivityTargetRewardRequest(
                this.Id,
                s.Id,
              );
            });
          break;
        case 2:
          e = 2;
      }
      return (
        StringUtils_1.StringUtils.IsEmpty(t) ||
          (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
        {
          Id: s.Id,
          NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            s.TargetName,
          ),
          RewardList: this.GetPreviewReward(s.TargetReward),
          RewardState: e,
          RewardButtonText: t,
          RewardButtonRedDot: a,
          ClickFunction: i,
          ClickFunctionAndCloseSelf: r,
        }
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Activity",
        38,
        "[ActivityMoonChasing] 活动限时奖励配置无配置",
        ["RewardId", e],
      );
  }
  SetRewardState(e, t) {
    this.ZKs.has(e) &&
      (this.ZKs.set(e, t),
      this.eQs(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  IsHasLimitTimeReward() {
    if (this.LimitTimeRewardOn)
      for (const e of this.ZKs.values()) if (0 === e) return !0;
    return !1;
  }
  eQs() {
    var e;
    UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
      (e = this.GetAllRewardData()) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
        e,
      );
  }
  XLa() {
    return (
      !(!this.IsUnLock() || !this.GetPreGuideQuestFinishState()) &&
      (ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(
        !0,
      ) ||
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState())
    );
  }
  YLa() {
    return ModelManager_1.ModelManager.MoonChasingModel.HasHandbookRewardRedDot();
  }
  IsHasMoonChasingRedDot() {
    return (
      !(!this.IsUnLock() || !this.GetPreGuideQuestFinishState()) &&
      (1 === this.ActivityFlowState
        ? ModelManager_1.ModelManager.MoonChasingModel.CheckMemoryRedDotState()
        : !!ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckAllBuildingRedDotState() ||
          !!ModelManager_1.ModelManager.MoonChasingModel?.CheckQuestRedDotState())
    );
  }
}
exports.ActivityMoonChasingData = ActivityMoonChasingData;
//# sourceMappingURL=ActivityMoonChasingData.js.map
