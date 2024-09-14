"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassMainView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiModel_1 = require("../../../Ui/UiModel"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeaponDefine_1 = require("../../Weapon/WeaponDefine"),
  BattlePassController_1 = require("./BattlePassController");
class BattlePassMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.TabDataList = []),
      (this.Eki = 0),
      (this.TDe = void 0),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        var t = this.TabDataList[e],
          i = t.ChildViewName,
          e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, e, this.yki),
          this.J4a(),
          this.GetItem(2).SetUIActive("BattlePassWeaponView" !== i),
          this.GetItem(4).SetUIActive("BattlePassWeaponView" !== i),
          this.GetItem(5).SetUIActive("BattlePassWeaponView" !== i),
          this.GetItem(6).SetUIActive("BattlePassWeaponView" !== i),
          this.TabComponent?.SetPopupToggleVisible(
            "BattlePassWeaponView" === i,
          ),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
            i);
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.Rvt = () => {
        this.CloseMe();
      }),
      (this.Iki = () => {
        let e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
        (e = e || UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal))
          .Info.Name === this.Info.Name &&
          BattlePassController_1.BattlePassController.TryShowUpLevelView(!1);
      }),
      (this.vya = (e) => {
        var t;
        "BattlePassWeaponView" ===
          this.TabViewComponent.GetCurrentTabViewName() &&
          void 0 !== (t = this.TabViewComponent.GetCurrentTabView()) &&
          t.OnClickFullLevelToggle(e);
      }),
      (this.RefreshLeftTime = () => {
        var e = TimeUtil_1.TimeUtil.GetServerTime(),
          e = this.Eki - e;
        e < 0
          ? this.WaitToDestroy ||
            BattlePassController_1.BattlePassController.ShowTimePassConfirm()
          : ((e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e)),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              "Text_GachaRemainingTime_Text",
              e.CountDownText,
            ));
      }),
      (this.yki = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.TabDataList =
      ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "BattlePassMainView",
      );
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.Rvt,
      )),
      await this.TabComponent.RefreshTabItemByLengthAsync(
        this.TabDataList.length,
      ),
      await this.TabComponent.CreatePopupToggleTab(this.vya),
      this.TabComponent.SetPopupToggleName("PrefabTextItem_3652268202_Text"),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      )),
      (this.Eki =
        ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime()),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(
        this.RefreshLeftTime,
        CommonDefine_1.MILLIONSECOND_PER_SECOND,
      )),
      this.RefreshLeftTime();
  }
  OnStart() {
    this.TabComponent.SelectToggleByIndex(0, !0);
  }
  J4a() {
    var e, t;
    "BattlePassWeaponView" === this.TabViewComponent.GetCurrentTabViewName() &&
      ((e = this.TabViewComponent.GetCurrentTabView()),
      (t = this.TabComponent.GetCaptionToggleState()),
      e.RefreshToggleState(t));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
      this.Iki,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
      this.Iki,
    );
  }
  BindTabViewRed(t, e) {
    var i = this.TabDataList.findIndex((e) => e.ChildViewName === t);
    this.TabComponent.GetTabItemByIndex(i).BindRedDot(e);
  }
  Tki(t) {
    var e = this.TabDataList.findIndex((e) => e.ChildViewName === t);
    this.TabComponent.GetTabItemByIndex(e).UnBindRedDot();
  }
  OnBeforeShow() {
    this.TabViewComponent.SetCurrentTabViewState(!0),
      this.BindTabViewRed("BattlePassRewardView", "BattlePassReward"),
      this.BindTabViewRed("BattlePassTaskView", "BattlePassTask");
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattlePassMainViewHide,
    ),
      this.TabViewComponent.SetCurrentTabViewState(!1),
      this.Tki("BattlePassRewardView"),
      this.Tki("BattlePassTaskView");
  }
  OnBeforeDestroy() {
    this.TDe?.Remove(),
      (this.TDe = void 0),
      this.TabComponent &&
        (this.TabComponent.Destroy(), (this.TabComponent = void 0)),
      this.TabViewComponent &&
        (this.TabViewComponent.DestroyTabViewComponent(),
        (this.TabViewComponent = void 0)),
      (this.TabDataList = []),
      UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(
        this.yki.WeaponObserver,
      ),
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(
        this.yki.WeaponScabbardObserver,
      ),
      (this.yki = void 0);
  }
  OnBeforeCreate() {
    var e = UiSceneManager_1.UiSceneManager.InitWeaponObserver(!0),
      t =
        (e.Model?.CheckGetComponent(3)?.SetLoadingActive(!1),
        UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver());
    this.yki = new WeaponDefine_1.WeaponSkeletalObserverHandles(e, t);
  }
}
exports.BattlePassMainView = BattlePassMainView;
//# sourceMappingURL=BattlePassMainView.js.map
