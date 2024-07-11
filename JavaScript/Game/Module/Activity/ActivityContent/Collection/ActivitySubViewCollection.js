"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewCollection = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityProgressComponent_1 = require("../UniversalComponents/Content/ActivityProgressComponent"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewCollection extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.RNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.PNe = !1),
      (this.xNe = 0),
      (this.wNe = (t) => {
        t === this.ActivityBaseData.Id && this.BNe();
      }),
      (this.DEe = (t) => {
        this.ActivityBaseData.QuestStateMap.get(t) &&
          (this.bNe(), this.qNe(), this.GNe());
      }),
      (this.NNe = () => {
        var t = this.ActivityBaseData.GetAllRewardQuestDataList();
        UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", t);
      }),
      (this.ONe = () => {
        switch (this.ActivityBaseData.GetProgressState()) {
          case 0: {
            const e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
            var t = () => {
              var t = {
                MarkId:
                  ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(
                    e,
                  ),
                MarkType: 12,
                OpenAreaId: 0,
              };
              WorldMapController_1.WorldMapController.OpenView(2, !1, t);
            };
            if (!ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(e)) {
              QuestController_1.QuestNewController.RequestTrackQuest(
                e,
                !0,
                2,
                0,
                t,
              );
              break;
            }
            t();
            break;
          }
          case 1:
            var [t] = this.ActivityBaseData.GetCurrentProgress(),
              t = {
                MarkId:
                  ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetActivityCollectionConfig(
                    t + 1,
                  ).MarkId,
                MarkType: 0,
                OpenAreaId: 0,
              },
              t =
                (WorldMapController_1.WorldMapController.OpenView(2, !1, t),
                this.ActivityBaseData.GetCurrentProgressQuestId());
            ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
              this.ActivityBaseData.Id,
              t,
              0,
              0,
              0,
            ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                this.ActivityBaseData.Id,
              );
            break;
          case 2:
            t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "CollectActivity_prompt_finish",
            );
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
        }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(1)),
      t =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        await this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(2)),
      t =
        ((this.RNe =
          new ActivityProgressComponent_1.ActivityProgressComponents()),
        await this.RNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(3)),
      t =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        await this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(4));
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea()),
      await this.ANe.CreateThenShowByActorAsync(t.GetOwner()),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(5),
      ));
  }
  OnStart() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.DNe.SetUiActive(!1),
      this.kNe(),
      this.OnRefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.wNe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.wNe,
      );
  }
  OnRefreshView() {
    this.bNe(), this.FNe(), this.qNe(), this.VNe(), this.BNe(), this.GNe();
  }
  GNe() {
    var t;
    this.ActivityBaseData.IsHasNewQuestRedDot() &&
      ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectionAtivity_NewQuest",
      )),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t));
  }
  OnTimer(t) {
    this.FNe();
  }
  bNe() {
    this.ActivityBaseData.RefreshRewardData();
  }
  FNe() {
    var [t, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t),
      t && this.LNe.SetTimeTextByText(e),
      this.PNe &&
        this.RNe?.SetDescriptionByTextId(
          "CollectionAtivity_AcceptQuestTime",
          this.HNe(this.xNe),
        );
  }
  qNe() {
    var [t] = this.ActivityBaseData.GetCurrentProgress(),
      e = this.ActivityBaseData.GetTotalProgress(),
      i = this.ActivityBaseData.GetCurrentProgressQuestId(),
      s = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i)?.TidName,
      r = s ? PublicUtil_1.PublicUtil.GetConfigTextByKey(s) : "",
      s =
        (this.RNe?.SetProgressPercent(t / e),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_ItemShow_Text",
        ));
    switch (
      (this.RNe?.SetProgressTextByText(
        StringUtils_1.StringUtils.Format(s, t.toString(), e.toString()),
      ),
      this.RNe?.SetTitleByTextId("CollectActivity_schedule"),
      this.ActivityBaseData.GetProgressState())
    ) {
      case 0:
        var n = this.ActivityBaseData.GetPreShowGuideQuestName();
        this.RNe?.SetDescriptionByText(n);
        break;
      case 1:
        var o,
          n = this.ActivityBaseData.QuestStateMap.get(i);
        n &&
          ((o = n.QuestUnlockStamp - TimeUtil_1.TimeUtil.GetServerTime()),
          2 === n.QuestState || o < 0
            ? (this.RNe?.SetDescriptionByText(r), (this.PNe = !1))
            : ((this.xNe = n.QuestUnlockStamp),
              this.RNe?.SetDescriptionByTextId(
                "CollectionAtivity_AcceptQuestTime",
                this.HNe(this.xNe),
              ),
              (this.PNe = !0)));
        break;
      case 2:
        this.RNe?.SetDescriptionByTextId("CollectActivity_state_finish");
    }
  }
  HNe(t) {
    var e = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(t - e, TimeUtil_1.TimeUtil.Minute),
      e = this.jNe(t);
    return (
      TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1])
        .CountDownText ?? ""
    );
  }
  jNe(t) {
    return t > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : t > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 2]
        : [1, 1];
  }
  kNe() {
    var t = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(t);
  }
  VNe() {
    var t,
      e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e),
      e ||
        ((t = this.GetCurrentLockConditionText()),
        this.ANe.SetLockTextByTextId(t)),
      this.ANe.SetRewardButtonVisible(e),
      e && this.ANe.SetRewardButtonFunction(this.NNe),
      this.ANe.FunctionButton.SetUiActive(e),
      e &&
        ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "CollectActivity_Button_ahead",
        )),
        this.ANe.FunctionButton.SetText(t),
        this.ANe.FunctionButton.SetFunction(this.ONe));
  }
  BNe() {
    var t = this.ActivityBaseData.IsHasRewardRedPoint(),
      t =
        (this.ANe.SetRewardRedDotVisible(t),
        this.ActivityBaseData.IsHasNewQuestRedDot());
    this.ANe.FunctionButton.SetRedDotVisible(t);
  }
  PlaySubViewSequence(t) {
    this.WNe();
  }
  WNe() {
    var [t] = this.ActivityBaseData.GetCurrentProgress(),
      t = "Shape0" + t;
    this.LevelSequencePlayer.GetCurrentSequence() === t
      ? this.LevelSequencePlayer.ReplaySequenceByKey(t)
      : this.LevelSequencePlayer.PlayLevelSequenceByName(t, !1);
  }
}
exports.ActivitySubViewCollection = ActivitySubViewCollection;
//# sourceMappingURL=ActivitySubViewCollection.js.map
