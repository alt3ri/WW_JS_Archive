"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponRootView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  WeaponTabItem_1 = require("../Common/TabComponent/TabItem/WeaponTabItem"),
  TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  WeaponController_1 = require("./WeaponController");
class WeaponRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.TabDataList = []),
      (this.DOo = 0),
      (this.N2i = void 0),
      (this.O2i = void 0),
      (this.R6e = (e) => new WeaponTabItem_1.WeaponTabItem()),
      (this.pqe = (e) => {
        var t = this.TabDataList[e],
          n = t.ChildViewName,
          e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, n, e, this.DOo);
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.Ako = () => {
        this.UpdateDynamicTabComponent();
      }),
      (this.l7i = (e) => {
        "WeaponRootView" === e.ViewName &&
          (UiLayer_1.UiLayer.SetShowMaskLayer("WeaponRootView", !1),
          this.N2i) &&
          this.O2i &&
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              this.DOo,
            ),
            this.N2i,
            this.O2i,
          );
      }),
      (this.W7t = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnBeforeCreate() {
    var e = this.OpenParam;
    e
      ? ((this.DOo = e.WeaponIncId),
        (this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
        (this.O2i =
          UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 44, "进入武器培养界面未传参");
  }
  async OnBeforeStartAsync() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.W7t,
      )),
      await this.TabComponent.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  OnHandleLoadScene() {
    this.N2i ||
      (this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
      this.O2i ||
        (this.O2i =
          UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver());
  }
  OnBeforeShow() {
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponRootView", !0),
      this.UpdateDynamicTabComponent(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() ||
        (WeaponController_1.WeaponController.OnSelectedWeaponChange(
          ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            this.DOo,
          ),
          this.N2i,
          this.O2i,
        ),
        UiLayer_1.UiLayer.SetShowMaskLayer("WeaponRootView", !1));
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponCanGoBreach,
      this.Ako,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.l7i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponCanGoBreach,
      this.Ako,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.l7i,
      );
  }
  OnBeforePlayCloseSequence() {
    this.Pko();
  }
  OnHandleReleaseScene() {
    this.Pko();
  }
  Pko() {
    this.N2i &&
      (UiSceneManager_1.UiSceneManager.HideObserver(
        this.N2i,
        "ShowHideWeaponEffect",
      ),
      UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.N2i),
      (this.N2i = void 0)),
      this.O2i &&
        (UiSceneManager_1.UiSceneManager.HideObserver(
          this.O2i,
          "ShowHideWeaponEffect",
        ),
        UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.N2i),
        (this.O2i = void 0));
  }
  OnBeforeDestroy() {
    var e = this.OpenParam;
    e &&
      e.IsFromRoleRootView &&
      UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor() &&
      WeaponController_1.WeaponController.RoleFadeOut(
        UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
      ),
      this.TabComponent &&
        (this.TabComponent.Destroy(), (this.TabComponent = void 0)),
      (this.TabDataList = []),
      this.TabViewComponent &&
        (this.TabViewComponent.DestroyTabViewComponent(),
        (this.TabViewComponent = void 0));
  }
  UpdateDynamicTabComponent() {
    this.TabDataList = this.GetWeaponTabList();
    const t = this.TabComponent.GetSelectedIndex();
    this.TabComponent.RefreshTabItemByLength(this.TabDataList.length, () => {
      var e = 0 < t ? t : 0;
      this.TabComponent.SelectToggleByIndex(e);
    });
  }
  GetWeaponTabList() {
    var e = [],
      t =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "WeaponRootView",
        ),
      n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.DOo,
      ).CanGoBreach();
    for (const i of t)
      ("WeaponBreachView" === i.ChildViewName && !n) ||
        ("WeaponLevelUpView" === i.ChildViewName && n) ||
        e.push(i);
    return e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (1 === e.length) {
      if (!this.TabComponent) return;
      if (!this.TabComponent.GetTabComponent().GetLayout())
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            54,
            "角色界面聚焦引导的额外参数配置有误, 找不到Layout",
            ["configParams", e],
          )
        );
      const t = Number(e[0]);
      e = this.TabComponent.GetTabItemByIndex(
        this.TabDataList.findIndex((e) => e.Id === t),
      ).GetRootItem();
      if (e) return [e, e];
    }
  }
}
exports.WeaponRootView = WeaponRootView;
//# sourceMappingURL=WeaponRootView.js.map
