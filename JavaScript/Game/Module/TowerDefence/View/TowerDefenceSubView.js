"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseSubView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
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
      (this.sSc = void 0),
      (this.kZs = () => {
        var e;
        (ModelManager_1.ModelManager.TowerDefenseModel.IsEnterInActivityClicked =
          !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            this.ActivityBaseData.Id,
          ),
          this.ActivityBaseData.GetPreGuideQuestFinishState()
            ? 0 !==
              (e =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigByActivityId(
                  this.ActivityBaseData.Id,
                )).EntranceId
              ? ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(
                  e.EntranceId,
                )
              : ((e = {
                  MarkId:
                    TowerDefenceController_1.TowerDefenseController.GetMarkIdByActivityId(
                      this.ActivityBaseData.Id,
                    ),
                  MarkType: 0,
                  OpenFogId: 0,
                }),
                WorldMapController_1.WorldMapController.OpenView(2, !1, e))
            : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
              UiManager_1.UiManager.OpenView("QuestView", e));
      }),
      (this.ZPa = () => {
        this.sSc.SetRedDotVisible(
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
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.ZPa,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.ZPa,
    );
  }
  async aSc() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_LordGymBg01",
      );
    await this.LoadPrefabAsync(e, this.GetItem(4));
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
        this.GetItem(3)),
      n =
        ((this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
          this.ActivityBaseData,
        )),
        this.GetItem(5));
    (this.sSc = new ActivityButtonItem_1.ActivityButtonItem()),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(r.GetOwner()),
        this.sSc.CreateThenShowByActorAsync(n.GetOwner()),
        this.aSc(),
      ]),
      this.ANe.FunctionButton.SetFunction(this.kZs),
      this.sSc.SetFunction(
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
      this.ZPa(),
      this.ewa());
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
    this.UNe.SetTitleByTextId("FragmentMemoryCollectReward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    var e, t;
    TowerDefenceController_1.TowerDefenseController.CheckActivityUnlockByMulti()
      ? ((e =
          TowerDefenceController_1.TowerDefenseController.CheckActivityUnlockByCondition()),
        this.ANe.SetPanelConditionVisible(!e),
        this.ANe.FunctionButton.SetUiActive(e),
        e
          ? ((t =
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "BossRushEnterText",
              )),
            this.ANe.FunctionButton.SetText(t))
          : this.ANe.SetPerformanceConditionLock(
              this.ActivityBaseData.ConditionGroupId,
              this.ActivityBaseData.Id,
            ),
        (t =
          ModelManager_1.ModelManager.TowerDefenseModel.GetPreviewRewardCount()),
        this.sSc.SetText(t[0] + "/" + t[1]),
        this.sSc.SetUiActive(e))
      : (this.ANe.SetPanelConditionVisible(!0),
        this.ANe.SetLockTextByTextId("TowerDefence_Cantplay"),
        this.sSc.SetUiActive(!1),
        this.ANe.FunctionButton.SetUiActive(!1));
  }
  ewa() {
    this.ANe.SetFunctionRedDotVisible(
      TowerDefenceController_1.TowerDefenseController.CheckHasNewStage(),
    );
  }
}
exports.TowerDefenseSubView = TowerDefenseSubView;
//# sourceMappingURL=TowerDefenceSubView.js.map
