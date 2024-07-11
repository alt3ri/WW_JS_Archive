"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMoonChasingData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
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
      (this.jWs = new Map()),
      (this.PermanentTargetOn = !1),
      (this.ActivityFlowState = 0),
      (this.SNe = (e, t) => {
        var i = this.jWs.get(e.Id),
          r = this.jWs.get(t.Id);
        return i === r ? e.Id - t.Id : i - r;
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
        ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest(),
        this.jWs.clear();
      t = e.l$s;
      if (t) {
        for (const i of t.h$s)
          this.jWs.set(i.J4n, ActivityCommonDefine_1.taskStateResolver[i.w6n]);
        this.LimitTimeRewardOn && this.WWs();
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
      this.IsHasLimitTimeReward() ||
      this.yya() ||
      this.Iya() ||
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
    for ([e, t] of this.jWs) {
      var r = this.KWs(e, t);
      r && i.push(r);
    }
    if (0 !== i.length)
      return { DataPageList: [{ DataList: i.sort(this.SNe) }] };
  }
  KWs(e, n) {
    const o =
      ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingRewardConfigById(
        e,
      );
    if (o) {
      let e = 0,
        t = "",
        i = () => {},
        r = !1,
        a = !1;
      switch (n) {
        case 1:
          o.TargetFunc
            ? ((i = () => {
                SkipTaskManager_1.SkipTaskManager.RunByConfigId(o.TargetFunc);
              }),
              (e = 1),
              (t = "Moonfiesta_Skip"),
              (a = !0))
            : ((e = 0), (t = "Moonfiesta_Underway"));
          break;
        case 0:
          (e = 1),
            (t = "Moonfiesta_AwardGet"),
            (r = !0),
            (i = () => {
              ActivityMoonChasingController_1.ActivityMoonChasingController.TrackMoonActivityTargetRewardRequest(
                this.Id,
                o.Id,
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
          Id: o.Id,
          NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            o.TargetName,
          ),
          RewardList: this.GetPreviewReward(o.TargetReward),
          RewardState: e,
          RewardButtonText: t,
          RewardButtonRedDot: r,
          ClickFunction: i,
          ClickFunctionAndCloseSelf: a,
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
    this.jWs.has(e) &&
      (this.jWs.set(e, t),
      this.WWs(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  IsHasLimitTimeReward() {
    if (this.LimitTimeRewardOn)
      for (const e of this.jWs.values()) if (0 === e) return !0;
    return !1;
  }
  WWs() {
    var e;
    UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
      (e = this.GetAllRewardData()) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
        e,
      );
  }
  yya() {
    return (
      !(!this.IsUnLock() || !this.GetPreGuideQuestFinishState()) &&
      (ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(
        !0,
      ) ||
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState())
    );
  }
  Iya() {
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
