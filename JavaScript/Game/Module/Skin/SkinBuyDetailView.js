"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinBuyDetailView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  SkinRewardItemGrid_1 = require("./SkinRewardItemGrid");
class SkinBuyDetailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.Syl = 0),
      (this.lqe = void 0),
      (this.dmo = void 0),
      (this.x8i = void 0),
      (this.A8i = void 0),
      (this.s4e = void 0),
      (this.vql = 0),
      (this.Sql = 0),
      (this.Iu_ = !1),
      (this.Tu_ = 0),
      (this.USe = (i) => {
        this.Og();
      }),
      (this.t3i = (i, t, e) => {
        i ===
          this.C0t.GetCurrentGoodsData()?.GetCurrentGoodsData().GetGoodsId() &&
          this.Og();
      }),
      (this.Eqt = (i, t) => {
        2 === t.TouchType && this.Egt();
      }),
      (this.w8i = (i) => {
        this.x8i = i.GetLocalPointInPlane();
      }),
      (this.B8i = (i) => {
        var t;
        1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
        InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
          ? (this.x8i = void 0)
          : ((t = this.x8i),
            (this.x8i = i.GetLocalPointInPlane()),
            t &&
              ((i = this.x8i.X - t.X),
              (t = this.x8i.Y - t.Y),
              0 != i && this.A8i.AddYawInput(i),
              0 != t) &&
              this.A8i.AddPitchInput(t));
      }),
      (this.b8i = (i) => {
        this.x8i = void 0;
      }),
      (this.N8i = (i) => {
        0 !== i.scrollAxisValue && this.A8i.AddZoomInput(-i.scrollAxisValue);
      }),
      (this.q8i = (i) => {
        0 !== i && Info_1.Info.IsInGamepad() && this.A8i.AddPitchInput(-i);
      }),
      (this.G8i = (i) => {
        0 !== i && Info_1.Info.IsInGamepad() && this.A8i.AddYawInput(i);
      }),
      (this.PUn = (i, t) => {
        0 !== t && Info_1.Info.IsInGamepad() && this.A8i.AddZoomInput(t);
      }),
      (this._mo = () => {
        var i =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
        i &&
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            i.HandleName,
            !0,
            !0,
            "1001",
          );
      }),
      (this.A5e = () =>
        !(
          TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Sql <
          ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonSwitchGap()
        )),
      (this.W2e = () => {
        return new SkinRewardItemGrid_1.SkinRewardItemGrid();
      }),
      (this.$Oe = () => {
        this.CloseMe();
      }),
      (this.U5l = () => {
        (this.Syl = 1),
          this.Eyl(),
          this.Iyl(),
          (this.Sql = 0),
          this.GetExtendToggle(8).SetToggleState(0, !1),
          (this.Sql = TimeUtil_1.TimeUtil.GetServerTimeStamp());
      }),
      (this.D5l = () => {
        (this.Syl = 0),
          this.Eyl(),
          this.Iyl(),
          (this.Sql = 0),
          this.GetExtendToggle(31).SetToggleState(0, !1),
          (this.Sql = TimeUtil_1.TimeUtil.GetServerTimeStamp());
      }),
      (this.cmo = () => {
        this.A8i?.PauseTick();
      }),
      (this.mmo = (i) => {
        this.Tyl();
      }),
      (this.Lyl = () => {
        const i = this.GetItem(28).bIsUIActive;
        i
          ? this.PlaySequence(
              "UiOut",
              () => {
                this.GetItem(28).SetUIActive(!i),
                  this.GetButton(2).RootUIComp.SetUIActive(!i);
              },
              !0,
            )
          : (this.GetItem(28).SetUIActive(!i),
            this.GetButton(2).RootUIComp.SetUIActive(!i),
            this.PlaySequence("UiIn", () => {}, !0));
      }),
      (this.zSl = () => {
        var i;
        this.C0t.GetCurrentSkinData().GetIfHaveRole()
          ? this.Ryl()
          : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              229,
            )).FunctionMap.set(2, () => {
              this.Ryl();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              i,
            ));
      }),
      (this.iNe = () => {
        TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.vql <
          ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonGap() ||
          ((this.vql = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
          this.C0t &&
            (this.C0t.SwitchToNextGoods(), this.Uyl(), this.Og(), this.Iyl()),
          this.PlaySequence("Switch", void 0, !0));
      }),
      (this.tNe = () => {
        TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.vql <
          ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonGap() ||
          ((this.vql = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
          this.C0t &&
            (this.C0t.SwitchToPreGoods(), this.Uyl(), this.Og(), this.Iyl()),
          this.PlaySequence("Switch", void 0, !0));
      }),
      (this.Dyl = () => {
        ControllerHolder_1.ControllerHolder.SkinController.OpenSkinShowView(
          this.C0t.GetCurrentSkinData().GetItemId(),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIExtendToggle],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIExtendToggle],
      [9, UE.UIItem],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [14, UE.UITexture],
      [12, UE.UIText],
      [13, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIButtonComponent],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UIItem],
      [21, UE.UIText],
      [22, UE.UITexture],
      [23, UE.UITexture],
      [24, UE.UITexture],
      [25, UE.UIItem],
      [26, UE.UITexture],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIDraggableComponent],
      [30, UE.UITexture],
      [31, UE.UIExtendToggle],
      [32, UE.UIItem],
      [33, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.Dyl],
        [3, this.tNe],
        [4, this.iNe],
        [17, this.zSl],
        [8, this.D5l],
        [31, this.U5l],
        [1, this.Lyl],
      ]);
  }
  OnAddEventListener() {
    var i = this.GetDraggable(29);
    i.OnPointerBeginDragCallBack.Bind(this.w8i),
      i.OnPointerDragCallBack.Bind(this.B8i),
      i.OnPointerEndDragCallBack.Bind(this.b8i),
      i.OnPointerScrollCallBack.Bind(this.N8i),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.q8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.G8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.PUn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this._mo,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayCameraAnimationStart,
        this.cmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshGoods,
        this.t3i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.USe,
      );
  }
  pmo() {
    var i = this.GetDraggable(29);
    i.OnPointerBeginDragCallBack.Unbind(),
      i.OnPointerDragCallBack.Unbind(),
      i.OnPointerEndDragCallBack.Unbind(),
      i.OnPointerScrollCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.q8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.G8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.PUn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this._mo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayCameraAnimationStart,
        this.cmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshGoods,
        this.t3i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.USe,
      );
  }
  OnHandleLoadScene() {
    this.dmo?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  Egt() {
    var i;
    1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
      ((i = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      )),
      this.A8i.AddZoomInput(-i));
  }
  OnBeforeShow() {
    this.Og();
  }
  OnAfterShow() {
    this.Tyl();
  }
  Tyl() {
    var i;
    UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() ||
      ((i =
        0 === this.Syl
          ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId()
          : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId()),
      this.Ayl(i));
  }
  Ayl(i) {
    var t = UiCameraManager_1.UiCameraManager.Get(),
      t =
        ((this.A8i = t.AddUiCameraComponent(
          UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
          !1,
        )),
        ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(
          i,
        ));
    this.A8i.InitDataByConfig(t), this.A8i.SetNeedFloorReflection(!0);
    (i = this.dmo.D_K2_GetActorLocation()),
      (t = this.C0t.GetCurrentSkinData().GetRoleId()),
      (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t).RoleBody),
      (t =
        ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(
          t,
        ));
    this.A8i.UpdateData(
      i,
      t.镜头浮动最大高度,
      t.镜头浮动最低高度,
      t.镜头浮动最长臂长,
      t.镜头浮动最短臂长,
    ),
      this.A8i.Activate(),
      this.A8i.ResumeTick();
  }
  OnStart() {
    (this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(11)),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.$Oe),
      (this.C0t = this.OpenParam),
      this.lqe.SetTitleLocalText(this.C0t.GetPreviewTitle()),
      (this.s4e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(10),
        this.W2e,
      )),
      this.GetExtendToggle(8).CanExecuteChange.Bind(this.A5e),
      this.GetExtendToggle(31).CanExecuteChange.Bind(this.A5e),
      this.Uyl();
  }
  OnBeforeHide() {
    this.pmo(), this.A8i.PauseTick();
  }
  OnBeforeDestroy() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
      UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
    ),
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo),
      (this.dmo = void 0);
  }
  xyl() {
    ControllerHolder_1.ControllerHolder.RoleController.RefreshUiSceneRoleActorByConfigId(
      this.C0t.GetCurrentSkinData().GetRoleId(),
      this.C0t.GetCurrentSkinData().GetItemId(),
      () => {
        this.Pyl();
      },
    );
  }
  Eyl() {
    var i = 0 === this.Syl ? 3 : 6;
    this.dmo?.Model?.CheckGetComponent(14)?.SetState(i, !1, !1, !1);
  }
  Pyl() {
    var i = this.C0t?.GetCurrentSkinData().GetSuitWeaponSkinConfig();
    if (i) {
      const t = this.dmo?.Model?.CheckGetComponent(15);
      t?.ReplaceWeaponModel(i.Models, () => {
        t?.RefreshWeaponCase(), t?.AttachWeaponToRole();
      });
    }
  }
  OnHandleReleaseScene() {
    this.UDn();
  }
  UDn() {}
  Iyl() {
    var i;
    0 === this.Syl
      ? (UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", !0),
        (i =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) &&
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            i.HandleName,
            !0,
            !0,
            "1001",
            !0,
            () => {
              UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", !1);
            },
          ))
      : (UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", !0),
        (i =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) &&
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            i.HandleName,
            !0,
            !0,
            "1001",
            !0,
            () => {
              UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", !1);
            },
          ));
  }
  Ryl() {
    var i;
    this.C0t.GetIfDirect()
      ? ((i = this.C0t.GetCurrentGoodsData()
          .GetCurrentGoodsData()
          .GetGoodsData().Id),
        ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(i))
      : ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(
          this.C0t.GetCurrentGoodsData().GetCurrentGoodsData(),
        );
  }
  Uyl() {
    this.Syl = 0;
  }
  Og() {
    this.C0t?.GetCurrentGoodsData()
      ?.GetCurrentGoodsData()
      .SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime()),
      this.wyl(this.C0t),
      this.Byl(this.C0t),
      this.Nft(this.C0t),
      this.Myl(this.C0t),
      this.Iwn(this.C0t),
      this.byl(this.C0t),
      this.Zke(this.C0t),
      this.ZSl(this.C0t),
      this.qyl(this.C0t),
      this.Gyl(this.C0t),
      this.nyl(this.C0t),
      this.c3i(this.C0t),
      this.syl(this.C0t),
      this.iyl(this.C0t),
      this.ryl(this.C0t),
      this.kyl(this.C0t),
      this.Oyl(this.C0t),
      this.Ywn(this.C0t),
      this.Nyl(this.C0t),
      this.KWt(this.C0t),
      this.Fyl(),
      this.Eyl(),
      this.xyl(),
      this.jQl(this.C0t),
      this.f7l(this.C0t);
  }
  Fyl() {
    this.GetExtendToggle(8).SetToggleState(0 === this.Syl ? 1 : 0, !1),
      this.GetExtendToggle(31).SetToggleState(1 === this.Syl ? 1 : 0, !1),
      this.Eyl();
  }
  Iwn(i) {
    i
      ? ((i = i.GetCurrentSkinData().GetDesc()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i))
      : this.GetText(12).SetText("");
  }
  Nft(i) {
    i
      ? ((i = i.GetCurrentSkinData().GetTitleName()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i))
      : this.GetText(5).SetText("");
  }
  Myl(i) {
    i
      ? ((i = i.GetCurrentSkinData().GetSubTitle()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i))
      : this.GetText(6).SetText("");
  }
  Byl(i) {
    i = !!i && i.CheckIfHaveMutiGood();
    this.GetButton(4).RootUIComp.SetUIActive(i);
  }
  wyl(i) {
    i = !!i && i.CheckIfHaveMutiGood();
    this.GetButton(3).RootUIComp.SetUIActive(i);
  }
  byl(i) {
    i && ((i = i.GetIfNeedShowSwitchItem()), this.GetItem(7).SetUIActive(i));
  }
  Zke(i) {
    i &&
      ((i = i.GetCurrentSkinData().GetBuyPreviewRoleCardPath()),
      this.SetTextureByPath(i, this.GetTexture(23)));
  }
  Gyl(i) {
    i &&
      ((i = i.GetCurrentSkinData().GetBuyPreviewRoleQualityBgPath()),
      this.SetTextureByPath(i, this.GetTexture(22)));
  }
  ZSl(i) {
    i && 0 < i.GetCurrentSkinData().GetSuitWeaponSkinId()
      ? ((i = i.GetCurrentSkinData().GetSuitWeaponPreviewTexturePath()),
        this.SetTextureByPath(i, this.GetTexture(26)),
        this.GetTexture(26).SetUIActive(!0))
      : this.GetTexture(26).SetUIActive(!1);
  }
  qyl(i) {
    i && 0 < i.GetCurrentSkinData().GetSuitWeaponSkinId()
      ? ((i = i.GetCurrentSkinData()),
        (i = UE.Color.FromHex(i.GetRoleSkinConfig().SuitWeaponSkinColor)),
        this.GetTexture(30).SetColor(i),
        this.GetItem(25).SetUIActive(!0))
      : this.GetItem(25).SetUIActive(!1);
  }
  nyl(i) {
    i
      ? ((i = i.GetDiscountText()),
        this.GetItem(18).SetUIActive("" !== i),
        this.GetText(19).SetText(i))
      : this.GetItem(18).SetUIActive(!1);
  }
  c3i(i) {
    var t;
    (i = i && i.GetDiscountTimeData())
      ? (this.GetItem(20).SetUIActive(!0),
        (t = this.GetText(21)),
        "string" == typeof i
          ? t.SetText(i)
          : LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue))
      : this.GetItem(20).SetUIActive(!1);
  }
  syl(i) {
    var t;
    i && i.GetCurrentGoodsData()
      ? ((t = i.GetIfDirect()),
        this.GetTexture(14).SetUIActive(!t),
        t ||
          ((t = i.GetPriceData()),
          this.SetItemIcon(this.GetTexture(14), t.CurrencyId)))
      : this.GetTexture(14).SetUIActive(!1);
  }
  ryl(i) {
    !(i && i.GetCurrentGoodsData() && i.GetCurrentGoodsData().GetIfCanBuy()) ||
    i.GetIfDirect()
      ? this.GetText(16).SetText("")
      : (i = i.GetPriceData().OriginalPrice)
        ? (this.GetText(16).SetUIActive(!0),
          this.GetText(16).SetText(`<s>${i.toString()}</s>`))
        : this.GetText(16).SetUIActive(!1);
  }
  iyl(i) {
    var t;
    i && i.GetCurrentGoodsData()
      ? i.GetIfDirect()
        ? ((t = i.GetDirectPriceText()), this.GetText(15).SetText(t))
        : ((t = i.GetPriceData().NowPrice),
          this.GetText(15).SetText(t.toString()))
      : this.GetText(15).SetText("");
  }
  kyl(i) {
    i && i.GetCurrentGoodsData()
      ? ((i = i.GetCurrentGoodsData().GetIfCanBuy()),
        this.GetText(15).SetUIActive(i))
      : this.GetText(15).SetUIActive(!1);
  }
  Oyl(i) {
    i && i.GetCurrentGoodsData()
      ? ((i = i.GetCurrentGoodsData().GetIfCanBuy()),
        this.GetButton(17).RootUIComp.SetUIActive(i))
      : this.GetButton(17).RootUIComp.SetUIActive(!1);
  }
  Ywn(i) {
    i && i.GetCurrentGoodsData()
      ? ((i = i.GetCurrentGoodsData().GetIfCanBuy()),
        this.GetItem(27).SetUIActive(!i))
      : this.GetItem(27).SetUIActive(!1);
  }
  Nyl(i) {
    i && i.GetCurrentGoodsData()
      ? ((i = i.GetIfHaveSkinNeedRole()), this.GetItem(13).SetUIActive(!i))
      : this.GetItem(13).SetUIActive(!1);
  }
  KWt(i) {
    if (i && i.GetCurrentGoodsData()) {
      var t = [];
      for (const s of i.GetCurrentGoodsData().GetOtherReward()) {
        var e = new SkinRewardItemGrid_1.SkinRewardData();
        (e.ItemData = s),
          (e.FinishState = !i.GetCurrentGoodsData().GetIfCanBuy()),
          t.push(e);
      }
      this.s4e?.SetActive(0 !== t.length), this.s4e?.RefreshByData(t);
    } else this.s4e?.SetActive(!1);
  }
  jQl(i) {
    i && i.GetCurrentGoodsData()
      ? this.GetItem(9).SetUIActive(!0)
      : this.GetItem(9).SetUIActive(!1);
  }
  f7l(i) {
    i && i.GetCurrentGoodsData()
      ? ((i = 0 < i.GetCurrentSkinData().GetSuitWeaponSkinId()),
        this.GetItem(33).SetUIActive(i),
        this.GetItem(32).SetUIActive(i))
      : (this.GetItem(33).SetUIActive(!1), this.GetItem(32).SetUIActive(!1));
  }
  OnTick(i) {
    var t,
      e = this.C0t?.GetCurrentGoodsData()?.GetCurrentGoodsData();
    e &&
      (this.Tu_ !== e.GetGoodsData()?.Id
        ? ((this.Tu_ = e.GetGoodsData().Id), (this.Iu_ = e.HasDiscount()))
        : ((t = e?.HasDiscount()),
          this.Iu_ !== t &&
            this.Tu_ === e.GetGoodsData()?.Id &&
            ((this.Iu_ = t),
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(
              2,
              () => {
                this.Og();
              },
            ),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))));
  }
}
exports.SkinBuyDetailView = SkinBuyDetailView;
//# sourceMappingURL=SkinBuyDetailView.js.map
