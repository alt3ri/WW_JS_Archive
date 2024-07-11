"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponRootView = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const WeaponTabItem_1 = require("../Common/TabComponent/TabItem/WeaponTabItem");
const TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const WeaponController_1 = require("./WeaponController");
class WeaponRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.TabDataList = []),
      (this.ANo = 0),
      (this.Nki = void 0),
      (this.Oki = void 0),
      (this.dVe = (e) => new WeaponTabItem_1.WeaponTabItem()),
      (this.pqe = (e) => {
        const t = this.TabDataList[e];
        const n = t.ChildViewName;
        var e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, n, e, this.ANo);
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.wOo = () => {
        this.UpdateDynamicTabComponent();
      }),
      (this._9i = (e) => {
        e.ViewName === "WeaponRootView" &&
          this.Nki &&
          this.Oki &&
          WeaponController_1.WeaponController.OnSelectedWeaponChange(
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              this.ANo,
            ),
            this.Nki,
            this.Oki,
          );
      }),
      (this.W9t = () => {
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
    const e = this.OpenParam;
    e
      ? ((this.ANo = e.WeaponIncId),
        (this.Nki = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
        (this.Oki =
          UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 44, "进入武器培养界面未传参");
  }
  async OnBeforeStartAsync() {
    const e = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.W9t,
      )),
      await this.TabComponent.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  OnHandleLoadScene() {
    this.Nki ||
      (this.Nki = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
      this.Oki ||
        (this.Oki =
          UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver());
  }
  OnBeforeShow() {
    this.UpdateDynamicTabComponent(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() ||
        WeaponController_1.WeaponController.OnSelectedWeaponChange(
          ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            this.ANo,
          ),
          this.Nki,
          this.Oki,
        );
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponCanGoBreach,
      this.wOo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this._9i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponCanGoBreach,
      this.wOo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this._9i,
      );
  }
  OnBeforePlayCloseSequence() {
    this.BOo();
  }
  OnHandleReleaseScene() {
    this.BOo();
  }
  BOo() {
    this.Nki &&
      (UiSceneManager_1.UiSceneManager.HideObserver(
        this.Nki,
        "ShowHideWeaponEffect",
      ),
      UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.Nki),
      (this.Nki = void 0)),
      this.Oki &&
        (UiSceneManager_1.UiSceneManager.HideObserver(
          this.Oki,
          "ShowHideWeaponEffect",
        ),
        UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.Nki),
        (this.Oki = void 0));
  }
  OnBeforeDestroy() {
    const e = this.OpenParam;
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
      const e = t > 0 ? t : 0;
      this.TabComponent.SelectToggleByIndex(e);
    });
  }
  GetWeaponTabList() {
    const e = [];
    const t =
      ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "WeaponRootView",
      );
    const n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
      this.ANo,
    ).CanGoBreach();
    for (const i of t)
      (i.ChildViewName === "WeaponBreachView" && !n) ||
        (i.ChildViewName === "WeaponLevelUpView" && n) ||
        e.push(i);
    return e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length === 1) {
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
// # sourceMappingURL=WeaponRootView.js.map
