"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewMoonChasing = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalArea_1 = require("../../UniversalComponents/Functional/ActivityFunctionalArea"),
  ActivityQuestTipsItem_1 = require("../../UniversalComponents/Functional/ActivityQuestTipsItem"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewMoonChasing extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.nta = void 0),
      (this.Tfa = void 0),
      (this.s6e = void 0),
      (this.wNe = (i) => {
        i === this.ActivityBaseData.Id && this.BNe();
      }),
      (this.sta = () => {
        UiManager_1.UiManager.OpenView(
          "QuestView",
          this.ActivityBaseData.GetPreStageQuestId(),
        );
      }),
      (this.JLa = () => {
        var i;
        this.ActivityBaseData.PermanentTargetOn &&
          ((i = 0 === this.ActivityBaseData.ActivityFlowState),
          ControllerHolder_1.ControllerHolder.MoonChasingController.OpenRewardView(
            i,
          ));
      }),
      (this.zLa = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHandbookView();
      }),
      (this.OpenRewardPopUp = () => {
        var i;
        this.ActivityBaseData.LimitTimeRewardOn &&
          (i = this.ActivityBaseData.GetAllRewardData()) &&
          UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", i);
      }),
      (this.ONe = () => {
        var i;
        if (1 !== this.ActivityBaseData.ActivityFlowState)
          return this.ActivityBaseData.GetPreGuideQuestFinishState()
            ? ((i = {
                MarkId:
                  ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(
                    this.ActivityBaseData.Id,
                  ).FocusMarkId,
                MarkType: 6,
              }),
              void ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
                2,
                !1,
                i,
              ))
            : this.ActivityBaseData.IsPreStageQuestFinished()
              ? void UiManager_1.UiManager.OpenView(
                  "QuestView",
                  this.ActivityBaseData.GetUnFinishPreGuideQuestId(),
                )
              : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  190,
                )).FunctionMap.set(2, () => {
                  UiManager_1.UiManager.OpenView(
                    "QuestView",
                    this.ActivityBaseData.GetUnFinishPreGuideQuestId(),
                  );
                }),
                void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i,
                ));
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenMemoryEntranceView();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ];
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
        this.GetItem(3)),
      i =
        ((this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(
          this.ActivityBaseData,
        )),
        await this.ANe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(7));
    (this.nta = new ActivityQuestTipsItem_1.ActivityQuestTipsItem()),
      await this.nta.CreateThenShowByActorAsync(i.GetOwner()),
      (this.Tfa = new ButtonItem_1.ButtonItem(this.GetItem(9))),
      this.Tfa.SetFunction(this.zLa),
      (this.s6e = new ButtonItem_1.ButtonItem(this.GetItem(8))),
      this.s6e.SetFunction(this.JLa);
  }
  OnStart() {
    var i,
      t,
      e = this.ActivityBaseData.LocalConfig;
    e &&
      ((t = e.DescTheme),
      (i = !StringUtils_1.StringUtils.IsEmpty(t)),
      this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(t),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      (i = e.Desc),
      this.DNe.SetContentByTextId(i),
      (t = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetActive(0 < t.length),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(t),
      this.GetItem(4).SetUIActive(!1),
      this.ANe.FunctionButton.SetFunction(this.ONe),
      this.nta.SetActive(!1),
      this.nta.SetRewardButtonFunction(this.sta));
  }
  OnRefreshView() {
    this.VNe(), this.ata(), this.ZGe(), this.BNe();
  }
  OnTimer(i) {
    this.FNe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.wNe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.wNe,
    );
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = this.GetGuideUiItem("0");
    if (void 0 !== t) return [t, t];
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
  ata() {
    var i = this.ActivityBaseData.IsPreStageQuestFinished(),
      t = this.ActivityBaseData.GetPreGuideQuestFinishState();
    this.nta.SetActive(!i && !t),
      i ||
        ((t =
          ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(
            this.ActivityBaseData.Id,
          )),
        this.nta.SetContentByTextId(t.StageQuestTips));
  }
  ZGe() {
    var i =
        ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount(),
      t =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetAllBuildingData()
          .length,
      i =
        (this.Tfa.SetText(i.toString() + "/" + t.toString()),
        ModelManager_1.ModelManager.MoonChasingRewardModel.TargetTotalCount),
      t = Math.min(
        i,
        ModelManager_1.ModelManager.MoonChasingRewardModel.TargetGetCount,
      );
    this.s6e.SetText(t.toString() + "/" + i.toString());
  }
  VNe() {
    var i = this.ActivityBaseData.IsUnLock(),
      t = this.ActivityBaseData.GetPreGuideQuestFinishState(),
      e = this.ActivityBaseData.ActivityFlowState;
    this.ANe.SetPanelConditionVisible(!i),
      i ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ),
      this.ANe.SetRewardButtonVisible(!1),
      this.GetItem(6).SetUIActive(!1),
      this.s6e.SetActive(this.ActivityBaseData.PermanentTargetOn && i && t),
      this.Tfa.SetActive(i && t && 0 === e),
      this.ANe.FunctionButton.SetUiActive(i);
    let s = "Moonfiesta_Skip";
    1 === e ? (s = "Moonfiesta_Memory") : t || (s = "JumpToQuestText"),
      this.ANe.FunctionButton.SetShowText(s);
  }
  BNe() {
    this.ANe.FunctionButton.SetRedDotVisible(
      this.ActivityBaseData.IsHasMoonChasingRedDot(),
    ),
      this.Tfa.BindRedDot("MoonChasingHandbook"),
      this.s6e.BindRedDot("MoonChasingRewardAndShop");
  }
}
exports.ActivitySubViewMoonChasing = ActivitySubViewMoonChasing;
//# sourceMappingURL=ActivitySubViewMoonChasing.js.map
