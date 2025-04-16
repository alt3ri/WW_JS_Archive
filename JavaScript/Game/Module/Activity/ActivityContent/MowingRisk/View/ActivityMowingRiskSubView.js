"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingRiskSubView = void 0);
const UE = require("ue"),
  RiskHarvestActivityInfoByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestActivityInfoByActivityId"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  WorldMapController_1 = require("../../../../WorldMap/WorldMapController"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityFunctionalArea_1 = require("../../UniversalComponents/Functional/ActivityFunctionalArea");
class ActivityMowingRiskSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.bOe = void 0),
      (this.ANe = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.RefreshRewardCountText = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel.GetRewardCount();
        this.GetText(16)?.SetText(e[0] + "/" + e[1]);
      }),
      (this.R2e = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          e.BuildActivityRewardViewData(),
          (e, i) => {
            e &&
              UiManager_1.UiManager.IsViewOpen("CommonActivityView") &&
              UiManager_1.UiManager.GetViewByName(
                "CommonActivityView",
              )?.AddChildViewById(i);
          },
        );
      }),
      (this.U2e = () => {
        var e = new UiAsyncTask_1.UiAsyncTask(
          "ActivityMowingRiskSubView.OnClickBtnEnterAsync",
          async () => {
            await this.XN_();
          },
        );
        this.RunAsyncTask(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIText],
      [15, UE.UIButtonComponent],
      [16, UE.UIText],
    ]),
      (this.BtnBindInfo = [[15, this.R2e]]);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(6);
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(
      this.ActivityBaseData,
    )),
      await this.ANe.CreateThenShowByActorAsync(e.GetOwner()),
      RedDotController_1.RedDotController.BindRedDot(
        "RedDotMowingRiskReward",
        this.GetItem(12),
      );
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "RedDotMowingRiskReward",
      this.GetItem(12),
    );
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(5);
    (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.JGe)),
      this.ANe.SetRewardButtonFunction(this.R2e),
      this.ANe.FunctionButton.SetFunction(this.U2e);
  }
  OnSetData() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MowingRiskOnGetReward,
      this.RefreshRewardCountText,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MowingRiskOnGetReward,
      this.RefreshRewardCountText,
    );
  }
  OnRefreshView() {
    this.T2e(),
      this.A2e(),
      this._Oe(),
      this.BNe(),
      this.h9a(),
      this.RefreshRewardCountText();
  }
  h9a() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    e.IsNewInstanceOpen &&
      e.IsPreQuestFinished &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
        "ActivityMowing_Newlevelunlock",
      );
  }
  OnTimer(e) {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.GetText(10).SetUIActive(i), i && this.GetText(10).SetText(t);
  }
  T2e() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.ActivityTitleTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        e.ActivityDescriptionTextId,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(14),
        "CollectActivity_Button_ahead",
      );
  }
  A2e() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.bOe.RefreshByData(e);
  }
  _Oe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e),
      e ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ),
      this.GetItem(11)?.SetUIActive(e);
  }
  BNe() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    this.ANe.SetRewardRedDotVisible(e.HasAnyReward),
      this.ANe.FunctionButton.SetRedDotVisible(e.IsNewInstanceOpen),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityBaseData.Id,
      );
  }
  async XN_() {
    var e = ModelManager_1.ModelManager.MowingRiskModel,
      i =
        RiskHarvestActivityInfoByActivityId_1.configRiskHarvestActivityInfoByActivityId.GetConfig(
          this.ActivityBaseData.Id,
        );
    if (i)
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(i.QuestId)
        ? ((t = { MarkId: i.MarkId, MarkType: 0, OpenFogId: 0 }),
          WorldMapController_1.WorldMapController.OpenView(2, !1, t))
        : await ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(
            i.EntranceId,
          );
    else {
      if (!e.IsPreQuestFinished)
        return void UiManager_1.UiManager.OpenView(
          "QuestView",
          e.UnFinishPreGuideQuestId,
        );
      var t = { MarkId: e.MapMarkId, MarkType: e.MapMarkType, OpenFogId: 0 };
      WorldMapController_1.WorldMapController.OpenView(2, !1, t);
    }
    e.SetCurrentInstancesOld(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e.ActivityData.Id,
      );
  }
}
exports.ActivityMowingRiskSubView = ActivityMowingRiskSubView;
//# sourceMappingURL=ActivityMowingRiskSubView.js.map
