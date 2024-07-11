"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRogue = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRogueController_1 = require("./ActivityRogueController");
class ActivitySubViewRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.OnBtnAchievement = () => {
        2 ===
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().GetRogueActivityState()
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Rogue_Function_End_Tip",
            )
          : UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
      }),
      (this.OnBtnShop = () => {
        var i, e;
        2 ===
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().GetRogueActivityState()
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Rogue_Function_End_Tip",
            )
          : void 0 !==
              (e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData) &&
            ((e =
              ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
                e.MHn,
              )),
            ((i = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [
              e.ShopId,
            ]),
            (i.PayShopId = e.ShopId),
            ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(
              !0,
            ),
            (e = TimeUtil_1.TimeUtil.GetNextDayTimeStamp()),
            LocalStorage_1.LocalStorage.SetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .RoguelikeShopNextTimeStamp,
              e,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoguelikeDataUpdate,
            ),
            ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
              i,
            ));
      }),
      (this.DFe = () => {
        var i = this.ActivityBaseData.GetPreGuideQuestFinishState(),
          e = this.ActivityBaseData.GetRogueActivityState();
        i || 0 !== e
          ? ActivityRogueController_1.ActivityRogueController.ActivityFunctionExecute(
              this.ActivityBaseData.Id,
            )
          : ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", i),
            ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
              this.ActivityBaseData,
              1,
            )),
          (this.ActivityBaseData.FunctionBtnRedDot = !1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.OnBtnAchievement],
        [5, this.OnBtnShop],
      ]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(1)),
      i =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(2)),
      i =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i,
      e = this.ActivityBaseData.LocalConfig,
      t = this.ActivityBaseData.GetExtraConfig();
    e &&
      t &&
      ((t = e.DescTheme),
      (i = !StringUtils_1.StringUtils.IsEmpty(t)),
      this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(t),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      (i = e.Desc),
      this.DNe.SetContentByTextId(i),
      (t = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(t),
      this.ANe.FunctionButton?.BindCallback(this.DFe),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      )),
      this.ANe.FunctionButton.SetText(e),
      this.OnRefreshView());
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot(
      "RoguelikeAchievement",
      this.GetItem(6),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "RoguelikeShop",
        this.GetItem(7),
        (i) => {
          this.GetItem(7)?.SetUIActive(i);
        },
      );
    var i = this.ActivityBaseData.GetPreGuideQuestFinishState();
    this.GetItem(8).SetUIActive(i), this.GetItem(9).SetUIActive(i);
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindRedDot("RoguelikeAchievement"),
      RedDotController_1.RedDotController.UnBindRedDot("RoguelikeShop");
  }
  OnRefreshView() {
    this._Fe(), this.FNe(), this.BNe();
  }
  OnTimer(i) {
    this.OnRefreshView();
  }
  BNe() {
    this.ANe?.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
  }
  FNe() {
    var i;
    0 === this.ActivityBaseData.GetRogueActivityState()
      ? (([, i] = this.GetTimeVisibleAndRemainTime()),
        this.LNe.SetTimeTextByText(i))
      : this.LNe.SetTimeTextByTextId("Rogue_Function_End_Tip");
  }
  _Fe() {
    var i,
      e = this.ActivityBaseData.GetExtraConfig();
    e &&
      ((i = this.ActivityBaseData.IsUnLock()),
      (e = 0 === e.FunctionType),
      i
        ? e
          ? (this.ANe.FunctionButton?.SetUiActive(!1),
            this.ANe.SetPanelConditionVisible(!1))
          : ((i = this.ActivityBaseData.GetRogueActivityState()),
            this.ANe.FunctionButton?.SetUiActive(2 !== i),
            this.ANe.SetPanelConditionVisible(2 === i),
            this.ANe.SetLockTextByTextId("Rogue_Function_End_Tip"))
        : (this.ANe.FunctionButton?.SetUiActive(!1),
          (e = this.GetCurrentLockConditionText()),
          this.ANe.SetLockTextByTextId(e),
          this.ANe.SetPanelConditionVisible(!0)));
  }
}
exports.ActivitySubViewRogue = ActivitySubViewRogue;
//# sourceMappingURL=ActivitySubViewRogue.js.map
