"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassMainView = void 0);
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiModel_1 = require("../../../Ui/UiModel");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponDefine_1 = require("../../Weapon/WeaponDefine");
const BattlePassController_1 = require("./BattlePassController");
class BattlePassMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.TabDataList = []),
      (this.MOi = 0),
      (this.TDe = void 0),
      (this.dVe = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        const t = this.TabDataList[e];
        const i = t.ChildViewName;
        var e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, e, this.SOi),
          this.GetItem(2).SetUIActive(i !== "BattlePassWeaponView"),
          this.GetItem(4).SetUIActive(i !== "BattlePassWeaponView"),
          this.GetItem(5).SetUIActive(i !== "BattlePassWeaponView"),
          this.GetItem(6).SetUIActive(i !== "BattlePassWeaponView"),
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
      (this.gpt = () => {
        this.CloseMe();
      }),
      (this.EOi = () => {
        let e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
        (e = e || UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal))
          .Info.Name === this.Info.Name &&
          BattlePassController_1.BattlePassController.TryShowUpLevelView(!1);
      }),
      (this.RefreshLeftTime = () => {
        var e = TimeUtil_1.TimeUtil.GetServerTime();
        var e = this.MOi - e;
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
      (this.SOi = void 0);
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
    const e = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.gpt,
      )),
      await this.TabComponent.RefreshTabItemByLengthAsync(
        this.TabDataList.length,
      ),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      )),
      (this.MOi =
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
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
      this.EOi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
      this.EOi,
    );
  }
  BindTabViewRed(t, e) {
    const i = this.TabDataList.findIndex((e) => e.ChildViewName === t);
    this.TabComponent.GetTabItemByIndex(i).BindRedDot(e);
  }
  yOi(t) {
    const e = this.TabDataList.findIndex((e) => e.ChildViewName === t);
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
      this.yOi("BattlePassRewardView"),
      this.yOi("BattlePassTaskView");
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
        this.SOi.WeaponObserver,
      ),
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(
        this.SOi.WeaponScabbardObserver,
      ),
      (this.SOi = void 0);
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitWeaponObserver(),
      UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver(),
      (this.SOi = new WeaponDefine_1.WeaponSkeletalObserverHandles(
        UiSceneManager_1.UiSceneManager.GetWeaponObserver(),
        UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver(),
      ));
  }
}
exports.BattlePassMainView = BattlePassMainView;
// # sourceMappingURL=BattlePassMainView.js.map
