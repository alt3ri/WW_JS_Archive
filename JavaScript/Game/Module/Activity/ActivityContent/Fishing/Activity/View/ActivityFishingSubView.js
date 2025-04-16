"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityFishingSubView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  ActivitySubViewBase_1 = require("../../../../View/SubView/ActivitySubViewBase"),
  RecommendQuestTipsSubPanel_1 = require("../../../DirectTrain/SubView/RecommendQuestTipsSubPanel"),
  ActivityDescriptionTypeA_1 = require("../../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../../UniversalComponents/Title/ActivityTitleTypeA"),
  FishingPermanentRewardButton_1 = require("../../FishingDock/FishingPermanentRewardButton"),
  ActivityFishingDefine_1 = require("../ActivityFishingDefine"),
  FishingRewardLimitTimeButton_1 = require("./Components/FishingRewardLimitTimeButton");
class ActivityFishingSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.Atl = void 0),
      (this.hx_ = void 0),
      (this.cxl = void 0),
      (this.ActivityBaseData = void 0),
      (this.mxl = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(237);
        i.FunctionMap.set(2, () => {
          var i = this.ActivityBaseData.GetRecommendQuestLinkId();
          UiManager_1.UiManager.OpenView("QuestView", i);
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.xJa = () => {
        this.ActivityBaseData.SaveFirstCheckRedDotState(0) || this.BNe();
      }),
      (this.h6_ = (i) => {
        this.ActivityBaseData.Id !== i ||
          ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
          ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(i)) ||
          ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(
            i,
            !0,
            2,
            0,
          );
      }),
      (this.uZ_ = () =>
        !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "CantUseInMultiplayerMode",
        ),
        !1)),
      (this.DFe = () => {
        if (this.uZ_())
          if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
            let i =
              ModelManager_1.ModelManager.FishingModel.GetShipData().GetLastPortId();
            i <= 0 && (i = ActivityFishingDefine_1.DEFAULT_PORT_ID);
            var e = {
              MarkId:
                ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(
                  i,
                ).MarkId,
              MarkType: 34,
            };
            ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
              2,
              !1,
              e,
            );
          } else
            (e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
              UiManager_1.UiManager.OpenView("QuestView", e);
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
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [],
      e = this.GetItem(0),
      e =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        i.push(this.LNe.CreateThenShowByActorAsync(e.GetOwner())),
        this.GetItem(1)),
      e =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        i.push(this.DNe.CreateThenShowByActorAsync(e.GetOwner())),
        this.GetItem(2)),
      e =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        i.push(this.UNe.CreateThenShowByActorAsync(e.GetOwner())),
        this.GetItem(3)),
      e =
        ((this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
          this.ActivityBaseData,
        )),
        i.push(this.ANe.CreateThenShowByActorAsync(e.GetOwner())),
        this.GetItem(4)),
      e =
        ((this.Atl =
          new FishingRewardLimitTimeButton_1.FishingRewardLimitTimeButton(
            this.ActivityBaseData,
          )),
        i.push(this.Atl.CreateByActorAsync(e.GetOwner())),
        this.GetItem(5)),
      e =
        ((this.hx_ =
          new FishingPermanentRewardButton_1.FishingPermanentRewardButton()),
        i.push(this.hx_.CreateByActorAsync(e.GetOwner())),
        this.GetItem(6));
    (this.cxl = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel()),
      i.push(this.cxl.CreateThenShowByActorAsync(e.GetOwner())),
      this.cxl.BindClickBtnTipsCallBack(this.mxl),
      await Promise.all(i);
  }
  OnStart() {
    var i,
      e,
      t = this.ActivityBaseData.LocalConfig;
    t &&
      ((e = t.DescTheme),
      (i = !StringUtils_1.StringUtils.IsEmpty(e)),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(e),
      (i = t.Desc),
      this.DNe.SetContentByTextId(i),
      (e = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(e),
      this.ZGe(),
      this.ANe.FunctionButton.SetExtraFunction(this.xJa),
      this.KV_());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivityPreOpen,
      this.h6_,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivityPreOpen,
      this.h6_,
    );
  }
  OnRefreshView() {
    this.FNe(), this._Fe(), this.BNe(), this.Cxl(), this.ZGe();
  }
  async OnBeforeHideSelfAsync() {
    this.Atl.SetActive(!1);
  }
  OnTimer(i) {
    this.FNe();
  }
  KV_() {
    var i = 1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.GetItem(7)?.SetUIActive(i), this.GetItem(8)?.SetUIActive(!i);
  }
  _Fe() {
    var i = {
      UnlockBtnTextId: "Fishing_Goto",
      UnlockBtnFunction: this.DFe,
      BeforePreOpenCheck: this.uZ_,
    };
    this.ANe.RefreshGeneralPerformance(i);
  }
  FNe() {
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(e);
  }
  ZGe() {
    this.Atl.RefreshActive();
    var i = this.ActivityBaseData.IsUnLock();
    i && this.hx_.Refresh(), this.hx_.SetUiActive(i);
  }
  BNe() {
    var i = this.ActivityBaseData.GetButtonRedPointShowState();
    this.ANe.SetFunctionRedDotVisible(i);
  }
  RPl() {
    return !this.ActivityBaseData.IsRecommendQuestFinished();
  }
  Cxl() {
    var i = this.RPl();
    this.cxl.SetUiActive(i),
      i &&
        ((i = this.ActivityBaseData.GetActivityConfig().RecommendQuestLabel),
        this.cxl.SetTipsTxtByTextId(i));
  }
}
exports.ActivityFishingSubView = ActivityFishingSubView;
//# sourceMappingURL=ActivityFishingSubView.js.map
