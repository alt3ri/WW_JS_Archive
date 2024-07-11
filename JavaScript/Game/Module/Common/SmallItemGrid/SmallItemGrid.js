"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGrid = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemGridBase_1 = require("../ItemGridBase/ItemGridBase"),
  SmallItemGridCookUpComponent_1 = require("./SmallItemGridComponent/SmallItemGridCookUpComponent"),
  SmallItemGridCoolDownComponent_1 = require("./SmallItemGridComponent/SmallItemGridCoolDownComponent"),
  SmallItemGridCurrentEquipmentComponent_1 = require("./SmallItemGridComponent/SmallItemGridCurrentEquipmentComponent"),
  SmallItemGridDisableComponent_1 = require("./SmallItemGridComponent/SmallItemGridDisableComponent"),
  SmallItemGridElementComponent_1 = require("./SmallItemGridComponent/SmallItemGridElementComponent"),
  SmallItemGridEmptySlotComponent_1 = require("./SmallItemGridComponent/SmallItemGridEmptySlotComponent"),
  SmallItemGridFirstRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridFirstRewardComponent"),
  SmallItemGridLockBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockBlackComponent"),
  SmallItemGridLockComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockComponent"),
  SmallItemGridNewFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridNewFlagComponent"),
  SmallItemGridNotFoundComponent_1 = require("./SmallItemGridComponent/SmallItemGridNotFoundComponent"),
  SmallItemGridReceivableComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivableComponent"),
  SmallItemGridReceivedComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivedComponent"),
  SmallItemGridSelectedFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectedFlagComponent"),
  SmallItemGridVisionRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionRoleHeadComponent"),
  TRIAL_ROLE_ID = 1e4;
class SmallItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments),
      (this.IsSelected = !1),
      (this.IsForceSelected = !1),
      (this.txt = 0),
      (this.oxt = void 0),
      (this.OnClickedEmptySlotButton = () => {
        var t;
        this.oxt &&
          ((t = { SmallItemGrid: this, Data: this.Data }), this.oxt(t));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIExtendToggle],
    ];
  }
  OnSetBottomAdditionItem() {
    return this.GetItem(5);
  }
  OnSetTopAdditionItem() {
    return this.GetItem(6);
  }
  GetItemGridExtendToggle() {
    return this.GetExtendToggle(7);
  }
  Apply(t) {
    this.ClearVisibleComponent(),
      this.ClearComponentList(),
      1 === t.Type && this.ApplyEmptySmallItemGrid(t),
      4 === t.Type && this.ApplyPropSmallItemGrid(t),
      3 === t.Type && this.ApplyPhantomSmallItemGrid(t),
      2 === t.Type && this.ApplyCharacterSmallItemGrid(t),
      this.RefreshComponentVisible(),
      this.RefreshComponentHierarchyIndex();
  }
  ApplyEmptySmallItemGrid(t) {
    this.SetEmptySlotVisible(!0),
      this.IIt(void 0),
      this._xt(void 0),
      this.SetBottomTextVisible(!1),
      this.SetExtendToggleEnable(!1),
      this.SetElement(void 0);
  }
  ApplyPropSmallItemGrid(t) {
    var e = t.IsLockVisible,
      i = t.IsReceivableVisible,
      o = t.IsReceivedVisible,
      l = t.IsNewVisible,
      m = t.IsNotFoundVisible,
      r = t.CoolDownTime,
      n = t.IsDisable;
    this.SetIsDisable(n),
      this.SetLockVisible(e),
      this.SetReceivableVisible(i),
      this.SetReceivedVisible(o),
      this.SetNewFlagVisible(l),
      this.SetNotFoundVisible(m),
      this.SetCoolDown(r),
      this.gBt(t);
  }
  ApplyPhantomSmallItemGrid(t) {
    var e = t.IsLockVisible,
      i = t.IsLockVisibleBlack,
      o = t.IsReceivableVisible,
      l = t.IsReceivedVisible,
      m = t.IsNewVisible,
      r = t.IsNotFoundVisible,
      n = t.IsSelectedFlag,
      s = t.VisionRoleHeadInfo;
    this.SetLockVisible(e),
      this.SetLockBlackVisible(i),
      this.SetReceivableVisible(o),
      this.SetReceivedVisible(l),
      this.SetNewFlagVisible(m),
      this.SetNotFoundVisible(r),
      this.SetSelectedFlagVisible(n),
      this.SetVisionRoleHead(s),
      this.fBt(t);
  }
  ApplyCharacterSmallItemGrid(t) {
    var e = t.IsLockVisible,
      i = t.IsReceivableVisible,
      o = t.IsReceivedVisible,
      l = t.IsSelectedFlag,
      m = t.IsCookUp ?? !1;
    this.SetLockVisible(e),
      this.SetReceivableVisible(i),
      this.SetReceivedVisible(o),
      this.SetSelectedFlagVisible(l),
      this.pBt(m),
      this.SetElement(t.ElementId),
      this.vBt(t);
  }
  gBt(t) {
    var e,
      i = t.ItemConfigId,
      o = t.BottomTextId,
      l = t.BottomText,
      m = t.BottomTextParameter,
      r = t.IsQualityHidden,
      n = ((this.Data = t.Data), this.GetSprite(0)),
      r =
        (t.IconPath
          ? ((e = this.GetTexture(1)), this.SetTextureByPath(t.IconPath, e))
          : this.IIt(i),
        r
          ? n.SetUIActive(!1)
          : (0 < t.QualityId
              ? this.SetQualityIconById(n, t.QualityId, void 0, t.QualityType)
              : 0 === t.QualityId
                ? ((e =
                    ModelManager_1.ModelManager.SmallItemGridModel
                      .DefaultQualitySpritePath),
                  this.SetSpriteByPath(e, n, !1))
                : this._xt(i),
            n.SetUIActive(!0)),
        !StringUtils_1.StringUtils.IsEmpty(o) ||
          !StringUtils_1.StringUtils.IsEmpty(l));
    this.SetBottomTextVisible(r),
      r && (this.SetBottomTextId(o, m), this.SetBottomText(l)),
      this.SetExtendToggleEnable(!0);
  }
  SetElement(t) {
    this.RefreshComponent(
      SmallItemGridElementComponent_1.SmallItemGridElementComponent,
      void 0 !== t,
      t,
    );
  }
  fBt(t) {
    var e = t.ItemConfigId,
      i = t.BottomTextId,
      o = t.BottomText,
      l = t.BottomTextParameter,
      m = t.MonsterId,
      r = t.QualityIconResourceId,
      n = t.IsQualityHidden,
      s = t.IconHidden,
      t =
        ((this.Data = t.Data),
        s ? this.GetTexture(1)?.SetUIActive(!1) : m ? this.dxt(m) : this.IIt(e),
        this.GetSprite(0)),
      s =
        (n ? t.SetUIActive(!1) : void 0 !== r ? this.Cxt(r) : this._xt(e),
        !StringUtils_1.StringUtils.IsEmpty(i) ||
          !StringUtils_1.StringUtils.IsEmpty(o));
    this.SetBottomTextVisible(s),
      s && (this.SetBottomTextId(i, l), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0);
  }
  vBt(t) {
    let e = t.ItemConfigId;
    var i = t.BottomTextId,
      o = t.BottomText,
      l = t.BottomTextParameter,
      m = t.IsQualityHidden,
      r = ((this.Data = t.Data), this.GetTexture(1)),
      n =
        (e > TRIAL_ROLE_ID &&
          ((n = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e)),
          (e = n.ParentId)),
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
      n = n.RoleHeadIconBig,
      n = (this.SetRoleIcon(n, r, e), r.SetUIActive(!0), this.GetSprite(0)),
      m =
        (m
          ? n.SetUIActive(!1)
          : (0 < t.QualityId
              ? this.SetQualityIconById(n, t.QualityId, void 0, t.QualityType)
              : 0 === t.QualityId
                ? ((r =
                    ModelManager_1.ModelManager.SmallItemGridModel
                      .DefaultQualitySpritePath),
                  this.SetSpriteByPath(r, n, !1))
                : this._xt(e),
            n.SetUIActive(!0)),
        !StringUtils_1.StringUtils.IsEmpty(i) ||
          !StringUtils_1.StringUtils.IsEmpty(o));
    this.SetBottomTextVisible(m),
      m && (this.SetBottomTextId(i, l), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0);
  }
  SetLockVisible(t) {
    this.RefreshComponent(
      SmallItemGridLockComponent_1.SmallItemGridLockComponent,
      t,
      t,
    );
  }
  SetLockBlackVisible(t) {
    this.RefreshComponent(
      SmallItemGridLockBlackComponent_1.SmallItemGridLockBlackComponent,
      t,
      t,
    );
  }
  SetCurrentEquipmentVisible(t) {
    this.RefreshComponent(
      SmallItemGridCurrentEquipmentComponent_1.SmallItemGridCurrentEquipmentComponent,
      t,
      t,
    );
  }
  SetReceivableVisible(t) {
    this.RefreshComponent(
      SmallItemGridReceivableComponent_1.SmallItemGridReceivableComponent,
      t,
      t,
    );
  }
  SetReceivedVisible(t) {
    this.RefreshComponent(
      SmallItemGridReceivedComponent_1.SmallItemGridReceivedComponent,
      t,
      t,
    );
  }
  SetSelectedFlagVisible(t) {
    this.RefreshComponent(
      SmallItemGridSelectedFlagComponent_1.SmallItemGridSelectedFlagComponent,
      t,
      t,
    );
  }
  pBt(t) {
    this.RefreshComponent(
      SmallItemGridCookUpComponent_1.SmallItemGridCookUpComponent,
      t,
      t,
    );
  }
  SetFirstRewardVisible(t) {
    this.RefreshComponent(
      SmallItemGridFirstRewardComponent_1.SmallItemGridFirstRewardComponent,
      t,
      t,
    );
  }
  IIt(t) {
    var e = this.GetTexture(1);
    void 0 === t
      ? e.SetUIActive(!1)
      : (this.SetItemIcon(e, t), e.SetUIActive(!0));
  }
  dxt(t) {
    var e = this.GetTexture(1);
    void 0 === t
      ? e.SetUIActive(!1)
      : ((t =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(t)),
        this.SetTextureByPath(t, e),
        e.SetUIActive(!0));
  }
  SetVisionRoleHead(t) {
    this.RefreshComponent(
      SmallItemGridVisionRoleHeadComponent_1.SmallItemGridVisionRoleHeadComponent,
      void 0 !== t,
      t,
    );
  }
  _xt(t) {
    var e = this.GetSprite(0);
    void 0 === t
      ? e.SetUIActive(!1)
      : (this.txt !== t &&
          ((this.txt = t), this.SetItemQualityIcon(e, t, void 0)),
        e.SetUIActive(!0));
  }
  SetCoolDown(t, e) {
    e = { CoolDown: t, TotalCdTime: e };
    this.RefreshComponent(
      SmallItemGridCoolDownComponent_1.SmallItemGridCoolDownComponent,
      void 0 !== t && 0 < t,
      e,
    );
  }
  SetEmptySlotVisible(t) {
    var e = this.RefreshComponent(
      SmallItemGridEmptySlotComponent_1.SmallItemGridEmptySlotComponent,
      t,
      t,
    );
    e &&
      (t
        ? e.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton)
        : e.UnBindEmptySlotButtonCallback());
  }
  SetNewFlagVisible(t) {
    this.RefreshComponent(
      SmallItemGridNewFlagComponent_1.SmallItemGridNewFlagComponent,
      t,
      t,
    );
  }
  SetNotFoundVisible(t) {
    this.RefreshComponent(
      SmallItemGridNotFoundComponent_1.SmallItemGridNotFoundComponent,
      t,
      t,
    );
  }
  Cxt(t) {
    var e = this.GetSprite(0);
    void 0 === t ||
    ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
    StringUtils_1.StringUtils.IsEmpty(t))
      ? e.SetUIActive(!1)
      : (this.SetSpriteByPath(t, e, !0), e.SetUIActive(!0));
  }
  SetBottomTextVisible(t) {
    var e = this.GetSprite(4),
      i = this.GetText(3);
    e.IsUIActiveSelf() !== t && e.SetUIActive(t),
      i.IsUIActiveSelf() !== t && i.SetUIActive(t);
  }
  SetIsDisable(t) {
    this.RefreshComponent(
      SmallItemGridDisableComponent_1.SmallItemGridDisableComponent,
      t,
      t,
    );
  }
  SetDisableComponentColor(e, t = !0) {
    t = this.RefreshComponent(
      SmallItemGridDisableComponent_1.SmallItemGridDisableComponent,
      !1,
      t,
    );
    t &&
      t.GetAsync().then((t) => {
        t.SetSpriteColor(e);
      });
  }
  SetBottomTextId(t, e) {
    var i = this.GetText(3);
    StringUtils_1.StringUtils.IsEmpty(t) ||
      (e
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(i, t, ...e)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(i, t));
  }
  SetBottomText(t) {
    var e = this.GetText(3);
    StringUtils_1.StringUtils.IsEmpty(t) || e.SetText(t);
  }
  SetBottomTextColor(t) {
    this.GetText(3).SetColor(UE.Color.FromHex(t));
  }
  SetSelected(t, e = !1) {
    var i = this.GetExtendToggle(7);
    t
      ? e
        ? i.SetToggleStateForce(1, !1)
        : i.SetToggleState(1, !1)
      : e
        ? i.SetToggleStateForce(0, !1)
        : i.SetToggleState(0, !1),
      (this.IsSelected = t),
      (this.IsForceSelected = e);
  }
}
exports.SmallItemGrid = SmallItemGrid;
//# sourceMappingURL=SmallItemGrid.js.map
