"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseSubView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalArea_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalArea"),
  ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  DifficultUnlockTipView_1 = require("../../InstanceDungeon/DifficultUnlockTipView"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  TowerDefenceController_1 = require("../TowerDefenceController");
class TowerDefenseSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.kZs = () => {
        var e;
        (ModelManager_1.ModelManager.TowerDefenseModel.IsEnterInActivityClicked =
          !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            this.ActivityBaseData.Id,
          ),
          this.ActivityBaseData.GetPreGuideQuestFinishState()
            ? ((e = {
                MarkId:
                  TowerDefenceController_1.TowerDefenseController.GetMarkIdByActivityId(
                    this.ActivityBaseData.Id,
                  ),
                MarkType: 0,
                OpenAreaId: 0,
              }),
              WorldMapController_1.WorldMapController.OpenView(2, !1, e))
            : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
              UiManager_1.UiManager.OpenView("QuestView", e));
      }),
      (this.XPa = () => {
        this.ANe.SetRewardRedDotVisible(
          TowerDefenceController_1.TowerDefenseController.CheckHasReward(),
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.XPa,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.XPa,
    );
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      i =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      r =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(
      this.ActivityBaseData,
    )),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(r.GetOwner()),
      ]),
      this.ANe.FunctionButton.SetFunction(this.kZs),
      this.ANe.SetRewardButtonFunction(
        TowerDefenceController_1.TowerDefenseController.HandleOnClickReward,
      );
  }
  OnRefreshView() {
    this.ActivityBaseData.LocalConfig &&
      (this.Pqe(),
      this.mGe(),
      this.FNe(),
      this.jqe(),
      this.VNe(),
      this.Eyn(),
      this.XPa(),
      this.YPa());
  }
  OnTimer(e) {
    this.FNe(), this.VNe();
  }
  Eyn() {
    var e;
    TowerDefenceController_1.TowerDefenseController.GetIsFirstOpen() &&
      (((e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
        "BossRushUnlockTips"),
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e));
  }
  mGe() {
    var e =
      TowerDefenceController_1.TowerDefenseController.GetActivitySubViewTitle();
    this.LNe.SetTitleByText(e);
  }
  FNe() {
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
  }
  Pqe() {
    var e = TowerDefenceController_1.TowerDefenseController.GetActivityCfg(),
      t = e.DescTheme,
      e = e.Desc,
      i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.DNe.SetContentVisible(i),
      i && this.DNe.SetContentByTextId(t),
      this.DNe.SetContentByTextId(e);
  }
  jqe() {
    var e =
      TowerDefenceController_1.TowerDefenseController.GetActivityPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    var e;
    TowerDefenceController_1.TowerDefenseController.CheckActivityUnlockByMulti()
      ? ((e =
          TowerDefenceController_1.TowerDefenseController.CheckActivityUnlockByCondition()),
        this.ANe.SetPanelConditionVisible(!e),
        this.ANe.SetRewardButtonVisible(e),
        this.ANe.SetFunctionButtonVisible(e),
        e
          ? ((e =
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "BossRushEnterText",
              )),
            this.ANe.FunctionButton.SetText(e))
          : this.ANe.SetPerformanceConditionLock(
              this.ActivityBaseData.ConditionGroupId,
              this.ActivityBaseData.Id,
            ))
      : (this.ANe.SetPanelConditionVisible(!0),
        this.ANe.SetLockTextByTextId("TowerDefence_Cantplay"),
        this.ANe.SetRewardButtonVisible(!1),
        this.ANe.SetFunctionButtonVisible(!1));
  }
  YPa() {
    this.ANe.FunctionButton.SetRedDotVisible(
      TowerDefenceController_1.TowerDefenseController.CheckHasNewStage(),
    );
  }
}
exports.TowerDefenseSubView = TowerDefenseSubView;
//# sourceMappingURL=TowerDefenceSubView.js.map
