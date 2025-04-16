"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinRootView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  EffectUtil_1 = require("../../Utils/EffectUtil"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent"),
  HelpController_1 = require("../Help/HelpController"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  SkinTabItem_1 = require("./Role/Item/SkinTabItem");
class SkinRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.TabDataList = []),
      (this.yil = void 0),
      (this.L6e = 0),
      (this.Nlo = 0),
      (this.c8l = !1),
      (this.R6e = (e) => new SkinTabItem_1.SkinTabItem()),
      (this.pqe = (e) => {
        this.L6e = Time_1.Time.Now;
        var t = this.TabDataList[e],
          i = t.ChildViewName,
          e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, e, this.yil),
          this.TabComponent.SetHelpButtonShowState("RoleSkinTabView" === i);
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.CanToggleChange = (e) => {
        var t;
        return (
          !!Info_1.Info.IsInGamepad() ||
          ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.L6e) ||
          Time_1.Time.Now - this.L6e >= t
        );
      }),
      (this.pcr = () => {
        "RoleWeaponTabView" !== this.TabViewComponent.GetCurrentTabViewName() &&
          HelpController_1.HelpController.OpenHelpById(146);
      });
  }
  OnRegisterComponent() {
    (this.yil = this.OpenParam),
      this.yil.RegisterView(this),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIItem],
        [2, UE.UIDraggableComponent],
      ]);
  }
  OnStart() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.yil.CloseView,
      )),
      this.TabComponent.SetHelpButtonCallBack(this.pcr),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      )),
      this.d8l();
  }
  OnHandleLoadScene() {
    var e;
    this.yil.NeedLoadRole &&
      ((e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase")) &&
        (this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect(
          "RoleSystemFloorEffect",
          "[RoleRootView.LoadFloorEffect]",
          e.D_GetTransform(),
          new EffectContext_1.EffectContext(void 0, e),
        )),
      UiSceneManager_1.UiSceneManager.GetActorByTag("RoleCase")) &&
      this.yil.TsUiSceneRoleActor &&
      this.yil.TsUiSceneRoleActor.Model.CheckGetComponent(1)?.SetTransformByTag(
        "RoleCase",
      );
  }
  d8l() {
    this.yil.NeedLoadRole
      ? this.c8l ||
        ((this.c8l = !0),
        (this.yil.TsUiSceneRoleActor =
          UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
        UiSceneManager_1.UiSceneManager.GetActorByTag("RoleCase") &&
          this.yil.TsUiSceneRoleActor.Model.CheckGetComponent(
            1,
          )?.SetTransformByTag("RoleCase"))
      : (this.yil.TsUiSceneRoleActor =
          UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
  }
  OnHandleReleaseScene() {
    this.yil.NeedLoadRole &&
      EffectSystem_1.EffectSystem.IsValid(this.Nlo) &&
      EffectSystem_1.EffectSystem.StopEffectById(
        this.Nlo,
        "[RoleRootView.HandleReleaseScene]",
        !1,
      );
  }
  OnBeforeShow() {
    this.UpdateDynamicTabComponent();
  }
  UpdateDynamicTabComponent() {
    this.TabDataList =
      ModelManager_1.ModelManager.RoleSkinModel.GetSkinTabList();
    var t = this.TabDataList.length,
      i = this.TabComponent.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      var o = this.TabDataList[e].ChildViewName,
        o = this.yil.GetTabRedDotName(o);
      i[e].RedDotName = o;
    }
    this.TabComponent.RefreshTabItem(i, () => {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++)
        if (
          this.TabDataList[e].ChildViewName === this.yil.CurSelectTabViewName
        ) {
          t = e;
          break;
        }
      this.TabComponent.SelectToggleByIndex(t, !0);
    });
  }
  OnAddEventListener() {
    this.yil.AddEventListener();
  }
  OnRemoveEventListener() {
    this.yil.RemoveEventListener();
  }
  OnBeforeHide() {
    this.LastHide && this.yil.BeforeDestroy();
  }
  OnBeforeDestroy() {
    this.m8l();
  }
  m8l() {
    this.c8l &&
      ((this.c8l = !1),
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(
        this.yil.TsUiSceneRoleActor,
      ),
      (this.yil.TsUiSceneRoleActor = void 0));
  }
  HideView() {
    this.TabComponent.SetUiActive(!1);
  }
  ShowView() {
    this.TabComponent.SetUiActive(!0);
  }
  GetDragItem() {
    return this.GetDraggable(2);
  }
}
exports.SkinRootView = SkinRootView;
//# sourceMappingURL=SkinRootView.js.map
