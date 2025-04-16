"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinTabView = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView"),
  ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  SkinController_1 = require("../../SkinController"),
  WeaponSkinDefine_1 = require("../../Tab/Weapon/WeaponSkinDefine"),
  RoleSkinItem_1 = require("../Item/RoleSkinItem"),
  RoleSkinObtainItem_1 = require("../Item/RoleSkinObtainItem");
class RoleSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.kIl = void 0),
      (this.ObtainLayout = void 0),
      (this.yil = void 0),
      (this.OIl = void 0),
      (this.NIl = 0),
      (this.FIl = !1),
      (this.gbl = 0),
      (this.pbl = 0),
      (this.SQl = !0),
      (this.CNc = !1),
      (this.VIl = (i) => {
        var e = new RoleSkinItem_1.RoleSkinItem();
        return e.CreateThenShowByActor(i), (e.ButtonFunction = this.HIl), e;
      }),
      (this.qil = () => new RoleSkinObtainItem_1.RoleSkinObtainItem()),
      (this.Am1 = () => {
        this.rTl(), this.oTl(), this.R_1();
      }),
      (this.HIl = (i) => {
        this.NIl !== i &&
          ((this.NIl = i),
          this.kIl.GetCurrentSelectIndex() !== i && this.kIl.AttachToIndex(i),
          (i = this.OIl[this.NIl]),
          this.Hqe(i),
          ControllerHolder_1.ControllerHolder.GuideController.TryFinishRunningGuides());
      }),
      (this.jIl = (i) => {
        1 === i
          ? (this.UiViewSequence?.PlaySequence("UiIn"),
            this.yil.SetCaptionItemActive(!0),
            this.GetButton(3).RootUIComp.SetUIActive(!this.SQl))
          : (this.UiViewSequence?.PlaySequence("UiOut"),
            this.yil.SetCaptionItemActive(!1),
            this.GetButton(3).RootUIComp.SetUIActive(!1)),
          ControllerHolder_1.ControllerHolder.GuideController.TryFinishRunningGuides();
      }),
      (this.WIl = () => {
        var i = this.OIl[this.NIl];
        SkinController_1.SkinController.OpenSkinShowView(i.GetItemId());
      }),
      (this.QIl = () => {
        this.fbl() &&
          (this.NIl--,
          this.Hqe(this.OIl[this.NIl]),
          this.kIl.AttachToIndex(this.NIl, !1));
      }),
      (this.KIl = () => {
        this.fbl() &&
          (this.NIl++,
          this.Hqe(this.OIl[this.NIl]),
          this.kIl.AttachToIndex(this.NIl, !1));
      }),
      (this.$Il = (i) => {
        (this.FIl = 1 === i), (this.yil.IsWearWeaponSkin = this.FIl);
        var i = this.OIl[this.NIl],
          e = i.GetRoleSkinConfig().SuitWeaponSkinId;
        ModelManager_1.ModelManager.RoleSkinModel.CheckSuitWeaponFirstWear(e) &&
          (this.GetUiNiagara(16).SetUIActive(!1),
          ModelManager_1.ModelManager.RoleSkinModel.RecordSuitWeaponFirstWear(
            e,
            !1,
          )),
          this.FIl &&
            ((e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(
              i.GetRoleSkinConfig().SuitWeaponSkinId,
            )),
            this.yil.TsUiSceneRoleActor?.Model?.CheckGetComponent(
              15,
            )?.ReplaceWeaponModel(e.Models)),
          this.KLc(i, this.FIl),
          this.XIl(i, this.FIl),
          this.YIl(this.FIl);
      }),
      (this.gke = () => this.fbl()),
      (this.zIl = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(231);
        ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
      }),
      (this.JIl = () => {
        var i;
        ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip() &&
          ((i = this.OIl[this.NIl]),
          RoleController_1.RoleController.RoleSkinChangeRequest(
            this.yil.RoleId,
            i.ItemId,
            this.FIl,
            this.ZIl,
          ));
      }),
      (this.ZIl = (i, e) => {
        i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i);
        this.XIl(i, e),
          this.kIl.RefreshItems(),
          e && this.yil.InitSelectedWeaponSkinId();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIExtendToggle],
      [11, UE.UIButtonComponent],
      [12, UE.UIVerticalLayout],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [
        [2, this.jIl],
        [3, this.WIl],
        [4, this.QIl],
        [5, this.KIl],
        [10, this.$Il],
        [11, this.zIl],
        [14, this.JIl],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.yil = this.ExtraParams),
      this.yil.SelectRoleSkinId <= 0 &&
        ((i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.yil.RoleId,
        )),
        (this.yil.SelectRoleSkinId = i.GetRoleSkinId()));
    var i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
      this.yil.SelectRoleSkinId,
    );
    (this.FIl = i.IsWearWeaponSkin()),
      (this.yil.IsWearWeaponSkin = this.FIl),
      (this.gbl = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SkinDetailButtonGap",
      )),
      await this.Ykl(),
      (this.kIl = new NoCircleAttachView_1.NoCircleAttachView(
        this.GetItem(0).GetOwner(),
      )),
      this.GetItem(1).SetUIActive(!1),
      this.kIl.CreateItems(this.GetItem(1).GetOwner(), -50, this.VIl),
      (this.ObtainLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(12),
        this.qil,
        this.GetItem(13).GetOwner(),
      )),
      this.GetExtendToggle(2).SetToggleState(1),
      this.GetExtendToggle(10).CanExecuteChange.Bind(this.gke),
      this.eTl();
  }
  async Ykl() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "Ani_RoleSkin_Offset",
      ),
      i = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat),
      e =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "Ani_RoleSkin_Scale",
        ),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat),
      t =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "Ani_RoleSkin_Alpha",
        ),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    await Promise.all([i.Promise, e.Promise, t.Promise]).then((i) => {
      (RoleSkinItem_1.RoleSkinItem.OffsetCurve = i[0]),
        (RoleSkinItem_1.RoleSkinItem.ScaleCurve = i[1]),
        (RoleSkinItem_1.RoleSkinItem.AlphaCurve = i[2]);
    });
  }
  eTl() {
    (this.OIl = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataList(
      this.yil.RoleId,
    )),
      this.kIl.ReloadView(this.OIl.length, this.OIl);
  }
  Hqe(i) {
    (this.FIl = i.IsWearWeaponSkin()),
      (this.yil.IsWearWeaponSkin = this.FIl),
      (this.yil.SelectRoleSkinId = i.GetItemId());
    var e = i.GetRoleSkinConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.TitleName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.SubDecName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.BgDescription),
      this.ObtainLayout.SetActive(i.IsLocked() && 0 < e.ItemAccess.length),
      this.XIl(i, this.FIl),
      this.tTl(e.Id),
      this.GetButton(4).RootUIComp.SetUIActive(0 < this.NIl),
      this.GetButton(5).RootUIComp.SetUIActive(this.NIl < this.OIl.length - 1),
      (this.SQl = i.IsOriginalSkin()),
      this.GetButton(3).RootUIComp.SetUIActive(!this.SQl),
      this.GetItem(9).SetUIActive(0 < e.SuitWeaponSkinId);
    let t = ModelManager_1.ModelManager.RoleSkinModel.CheckSuitWeaponFirstWear(
      e.SuitWeaponSkinId,
    );
    t &&
      this.FIl &&
      ((t = !1),
      ModelManager_1.ModelManager.RoleSkinModel?.RecordSuitWeaponFirstWear(
        e.SuitWeaponSkinId,
        !1,
      )),
      this.GetUiNiagara(16).SetUIActive(t),
      RoleController_1.RoleController.RefreshUiSceneRoleActor(
        this.yil.TsUiSceneRoleActor,
        this.yil.RoleId,
        i.ItemId,
      );
    e = this.FIl && 0 < e.SuitWeaponSkinId;
    e && this.iTl(i), this.KLc(i, this.FIl), this.YIl(e), this.i4_(i);
  }
  KLc(i, e) {
    (e = e ? 1 : 0),
      this.GetExtendToggle(10).SetToggleStateForce(e),
      (e =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData());
    e &&
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        e.HandleName,
        !0,
        !0,
        "1001",
      ),
      this.CNc
        ? this.yil.ReActiveRoleTabCameraInput()
        : (this.yil.ActiveRoleTabCameraInput(), (this.CNc = !0));
  }
  XIl(i, e) {
    var t = this.GetButton(14);
    t.RootUIComp.SetUIActive(!i.IsLocked()),
      t.SetSelfInteractive(this.CanWearSkin(i, e));
  }
  i4_(i) {
    i.IsLocked() ||
      (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot,
        i.GetItemId(),
      ),
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleSkinRedDotRefresh,
        i.GetRoleId(),
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MainViewRoleButtonRefreshByRoleSkin,
      ));
  }
  CanWearSkin(i, e) {
    var t;
    return !(
      i.IsLocked() ||
      (i.IsWear() &&
        ((t = i.GetRoleSkinConfig().SuitWeaponSkinId) <= 0 ||
          ((i =
            ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(
              i.GetRoleId(),
            ) === t) &&
            e) ||
          (!i && !e)))
    );
  }
  iTl(i) {
    0 < i.GetRoleSkinConfig().SuitWeaponSkinId
      ? ((i = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(
          i.GetRoleSkinConfig().SuitWeaponSkinId,
        )),
        this.yil.TsUiSceneRoleActor?.Model?.CheckGetComponent(
          15,
        )?.ReplaceWeaponModel(i.Models))
      : this.WQl();
  }
  WQl() {
    var i,
      e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(
        this.yil.RoleId,
      ),
      t = this.yil.TsUiSceneRoleActor;
    e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID
      ? ((i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          this.yil.WeaponIncId,
        ).GetWeaponConfig()),
        t?.Model?.CheckGetComponent(15)?.ReplaceWeaponModel(i.Models))
      : ((i = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)),
        t?.Model?.CheckGetComponent(15)?.ReplaceWeaponModel(i.Models));
  }
  YIl(i) {
    i
      ? RoleController_1.RoleController.PlayRoleMontage(6, !1)
      : RoleController_1.RoleController.PlayRoleMontage(3, !1);
  }
  OnBeforeShow() {
    var i = this.OIl.findIndex((i) => i.ItemId === this.yil.SelectRoleSkinId),
      i = (this.kIl.AttachToIndex(i, !0), (this.NIl = i), this.OIl[this.NIl]);
    this.kIl.RefreshItems(),
      this.Hqe(i),
      this.yil.ChangeModelState(0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRoleSkinSubViewShow,
        0 === this.NIl && 1 < this.OIl.length,
      );
  }
  tTl(i) {
    i = ModelManager_1.ModelManager.InventoryModel.GetGetWayDataList(i);
    this.ObtainLayout.RefreshByData(i);
  }
  OnBeforeHide() {
    this.rTl(), this.oTl(), this.R_1();
  }
  R_1() {
    this.CNc && (this.yil.CameraInputComponent.End(), (this.CNc = !1));
  }
  rTl() {
    this.WQl();
  }
  oTl() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.yil.RoleId,
    );
    void 0 !== i &&
      void 0 !== this.yil.TsUiSceneRoleActor &&
      RoleController_1.RoleController.RefreshUiSceneRoleActor(
        this.yil.TsUiSceneRoleActor,
        this.yil.RoleId,
        i.GetRoleSkinId(),
      );
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkinRootViewDestroy,
      this.Am1,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkinRootViewDestroy,
      this.Am1,
    );
  }
  fbl() {
    if (0 !== this.pbl && Time_1.Time.Now - this.pbl <= this.gbl) return !1;
    return (this.pbl = Time_1.Time.Now), !0;
  }
}
exports.RoleSkinTabView = RoleSkinTabView;
//# sourceMappingURL=RoleSkinTabView.js.map
