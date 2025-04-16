"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkinTabView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  UiCameraHandleData_1 = require("../../../UiCameraAnimation/UiCameraContext/UiCameraHandleData"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WeaponController_1 = require("../../../Weapon/WeaponController"),
  WeaponSkinController_1 = require("./WeaponSkinController"),
  WeaponSkinDefine_1 = require("./WeaponSkinDefine"),
  WeaponSkinGridItem_1 = require("./WeaponSkinGridItem"),
  WeaponSkinObtainItem_1 = require("./WeaponSkinObtainItem");
class WeaponSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.yil = void 0),
      (this.GridLayout = void 0),
      (this.ObtainLayout = void 0),
      (this.N2i = void 0),
      (this.O2i = void 0),
      (this.dmo = void 0),
      (this.S6_ = !0),
      (this.W2e = () => {
        var e = new WeaponSkinGridItem_1.WeaponSkinGridItem();
        return (
          e.BindOnExtendToggleStateChanged(this.yil.GridItemClick),
          e.BindOnCanExecuteChange(this.yil.GridItemCanExecuteChange),
          e
        );
      }),
      (this.qil = () => new WeaponSkinObtainItem_1.WeaponSkinObtainItem());
  }
  OnRegisterComponent() {
    (this.yil = this.ExtraParams),
      this.yil.RegisterWeaponSkinTabView(this),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UILayoutBase],
        [2, UE.UIItem],
        [3, UE.UIExtendToggle],
        [4, UE.UIExtendToggle],
        [5, UE.UIButtonComponent],
        [6, UE.UILayoutBase],
        [7, UE.UIItem],
        [8, UE.UIText],
        [9, UE.UIText],
      ]),
      (this.BtnBindInfo = [
        [3, this.yil.WeaponHideUiClick],
        [4, this.yil.WeaponSwitchShowClick],
        [5, this.yil.WeaponConfirmClick],
      ]);
  }
  async uvt() {
    (this.GridLayout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(1),
      this.W2e,
      this.GetItem(2).GetOwner(),
    )),
      await this.GridLayout.RefreshByDataAsync(this.yil.SkinDataList);
  }
  async OnBeforeStartAsync() {
    (this.S6_ = !0), await this.uvt();
  }
  OnStart() {
    (this.ObtainLayout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(6),
      this.qil,
      this.GetItem(7).GetOwner(),
    )),
      this.GetExtendToggle(3)?.SetToggleState(1);
    var e = this.yil.IsInShowWeapon ? 1 : 0;
    this.GetExtendToggle(4)?.SetToggleState(e);
  }
  OnBeforeShow() {
    this.S6_
      ? (this.S6_ = !1)
      : this.GridLayout.RefreshByData(this.yil.SkinDataList),
      this.yil.InitGridSelected(),
      RoleController_1.RoleController.PlayRoleMontage(6, !1),
      this.SwitchWeaponSkinModel(
        this.yil.WeaponIncId,
        this.yil.SelectedSkinId,
        this.yil.IsInShowWeapon,
      ),
      this.yil.IsInShowWeapon
        ? this.yil.ChangeModelState(1)
        : this.yil.ChangeModelState(0);
  }
  OnBeforeHide() {
    var e;
    this.yil.IsInShowWeapon &&
      ((this.yil.IsInShowWeapon = !1),
      (e = this.yil.IsInShowWeapon ? 1 : 0),
      this.GetExtendToggle(4)?.SetToggleState(e),
      this.RecoverySceneRoleActor(),
      this.LKt(),
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1));
  }
  OnBeforeDestroy() {
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", !1);
  }
  LKt() {
    this.N2i &&
      UiSceneManager_1.UiSceneManager.HideObserver(
        this.N2i,
        "ShowHideWeaponEffect",
      ),
      this.O2i &&
        UiSceneManager_1.UiSceneManager.HideObserver(
          this.O2i,
          "ShowHideWeaponEffect",
        );
  }
  Oil(e, i) {
    WeaponController_1.WeaponController.SelectedWeaponSkinChange(
      e,
      i,
      this.N2i,
      this.O2i,
    );
  }
  ReleaseWeaponObserver() {
    this.N2i &&
      UiSceneManager_1.UiSceneManager.HideObserverWithCallback(
        this.N2i,
        "ShowHideWeaponEffect",
        (e) => {
          UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(e);
        },
      ),
      this.O2i &&
        UiSceneManager_1.UiSceneManager.HideObserverWithCallback(
          this.O2i,
          "ShowHideWeaponEffect",
          (e) => {
            UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(e);
          },
        );
  }
  RecoverySceneRoleActor() {
    this.yil.IsInShowWeapon && this.yil.ChangeModelState(0),
      this.dmo.Model?.CheckGetComponent(15)?.Refresh();
  }
  RecoverySceneRoleActorBySkin(e, i) {
    this.yil.IsInShowWeapon && this.yil.ChangeModelState(0);
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    this.dmo.Model?.CheckGetComponent(15)?.SetWeaponByWeaponData(e, i);
  }
  SelectedGrid(e) {
    this.GridLayout.DeselectCurrentGridProxy(),
      this.GridLayout.SelectGridProxy(e, !0);
  }
  RefreshText(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i);
  }
  RefreshConfirmBox(e) {
    this.GetButton(5)?.SetSelfInteractive(!e);
  }
  RefreshGridSelect(e, i) {
    this.GridLayout.GetLayoutItemByIndex(e)?.RefreshVisible(),
      this.GridLayout.GetLayoutItemByIndex(i)?.RefreshVisible();
  }
  RefreshBottom(e, i) {
    var n = e.GetIsLock();
    this.GetButton(5)?.RootUIComp.SetUIActive(!n),
      this.ObtainLayout.SetActive(n),
      n
        ? ((n = this.yil.GetSkinSkipDataList(e.SkinId)),
          this.ObtainLayout.SetActive(0 !== n.length),
          0 < n.length && this.ObtainLayout.RefreshByData(n))
        : this.GetButton(5)?.SetSelfInteractive(!i);
  }
  HideView() {
    this.GetItem(0)?.SetUIActive(!1),
      this.GetExtendToggle(4)?.RootUIComp.SetUIActive(!1);
  }
  ShowView() {
    this.GetItem(0)?.SetUIActive(!0),
      this.GetExtendToggle(4)?.RootUIComp.SetUIActive(!0);
  }
  SwitchRoleWeaponShow(e) {
    e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID
      ? this.dmo.Model?.CheckGetComponent(15)?.Refresh()
      : ((e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)),
        this.dmo.Model?.CheckGetComponent(15)?.ReplaceWeaponModel(e.Models)),
      this.yil.ChangeModelState(0),
      this.LKt();
    e = UiCameraHandleData_1.UiCameraHandleData.NewByView("WeaponSkinTabView");
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", !0),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandle(
        e,
        !0,
        !0,
        "1001",
        !0,
        () => {
          UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", !1);
        },
      ),
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
  }
  SwitchWeaponShow(e, i) {
    this.yil.ChangeModelState(1),
      UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", !0),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "1072",
        !0,
        !0,
        "1001",
        !0,
        () => {
          UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", !1),
            ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2),
            this.Oil(e, i);
        },
      );
  }
  kil(e) {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e),
      i =
        ((this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver()),
        this.N2i.Model);
    i.CheckGetComponent(20)?.SetWeaponData(e),
      i.CheckGetComponent(0)?.SetLoadingIconFollowState(!1);
  }
  Nil(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    (this.O2i = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver()),
      this.O2i.Model.CheckGetComponent(20).SetWeaponData(e);
  }
  InitWeaponModel(e, i) {
    this.kil(e),
      this.Nil(e),
      (this.dmo = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
  }
  SwitchWeaponSkinModel(e, i, n) {
    n
      ? WeaponController_1.WeaponController.SelectedWeaponSkinChange(
          e,
          i,
          this.N2i,
          this.O2i,
        )
      : i === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID
        ? ((n =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              e,
            ).GetWeaponConfig()),
          this.dmo.Model?.CheckGetComponent(15)?.ReplaceWeaponModel(n.Models))
        : ((e =
            ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i)),
          this.dmo.Model?.CheckGetComponent(15)?.ReplaceWeaponModel(e.Models));
  }
  ShowEquipTips() {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "WeaponSkinReplaceTip",
    );
  }
  TrySendPbEquipTakeOnRequest(e, i) {
    var n,
      a,
      t = ModelManager_1.ModelManager.WeaponSkinModel.GetRoleIdBySkinId(i),
      r = () => {
        WeaponSkinController_1.WeaponSkinController.SendEquipSkinRequest(e, i);
      };
    t
      ? ((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(226)),
        (a =
          ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i).Name),
        (a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a)),
        (t =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t).GetName()),
        n.SetTextArgs(a, t),
        n.FunctionMap.set(2, r),
        ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(n))
      : r();
  }
}
exports.WeaponSkinTabView = WeaponSkinTabView;
//# sourceMappingURL=WeaponSkinTabView.js.map
