"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGrid = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemGridBase_1 = require("../ItemGridBase/ItemGridBase");
const SmallItemGridCookUpComponent_1 = require("./SmallItemGridComponent/SmallItemGridCookUpComponent");
const SmallItemGridCoolDownComponent_1 = require("./SmallItemGridComponent/SmallItemGridCoolDownComponent");
const SmallItemGridCurrentEquipmentComponent_1 = require("./SmallItemGridComponent/SmallItemGridCurrentEquipmentComponent");
const SmallItemGridDisableComponent_1 = require("./SmallItemGridComponent/SmallItemGridDisableComponent");
const SmallItemGridElementComponent_1 = require("./SmallItemGridComponent/SmallItemGridElementComponent");
const SmallItemGridEmptySlotComponent_1 = require("./SmallItemGridComponent/SmallItemGridEmptySlotComponent");
const SmallItemGridFirstRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridFirstRewardComponent");
const SmallItemGridLockBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockBlackComponent");
const SmallItemGridLockComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockComponent");
const SmallItemGridNewFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridNewFlagComponent");
const SmallItemGridNotFoundComponent_1 = require("./SmallItemGridComponent/SmallItemGridNotFoundComponent");
const SmallItemGridReceivableComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivableComponent");
const SmallItemGridReceivedComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivedComponent");
const SmallItemGridSelectedFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectedFlagComponent");
const SmallItemGridVisionRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionRoleHeadComponent");
const TRIAL_ROLE_ID = 1e4;
class SmallItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments),
      (this.IsSelected = !1),
      (this.IsForceSelected = !1),
      (this.txt = 0),
      (this.oxt = void 0),
      (this.OnClickedEmptySlotButton = () => {
        let t;
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
      t.Type === 1 && this.ApplyEmptySmallItemGrid(t),
      t.Type === 4 && this.ApplyPropSmallItemGrid(t),
      t.Type === 3 && this.ApplyPhantomSmallItemGrid(t),
      t.Type === 2 && this.ApplyCharacterSmallItemGrid(t),
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
    const e = t.IsLockVisible;
    const i = t.IsReceivableVisible;
    const o = t.IsReceivedVisible;
    const l = t.IsNewVisible;
    const m = t.IsNotFoundVisible;
    const r = t.CoolDownTime;
    const n = t.IsDisable;
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
    const e = t.IsLockVisible;
    const i = t.IsLockVisibleBlack;
    const o = t.IsReceivableVisible;
    const l = t.IsReceivedVisible;
    const m = t.IsNewVisible;
    const r = t.IsNotFoundVisible;
    const n = t.IsSelectedFlag;
    const s = t.VisionRoleHeadInfo;
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
    const e = t.IsLockVisible;
    const i = t.IsReceivableVisible;
    const o = t.IsReceivedVisible;
    const l = t.IsSelectedFlag;
    const m = t.IsCookUp ?? !1;
    this.SetLockVisible(e),
      this.SetReceivableVisible(i),
      this.SetReceivedVisible(o),
      this.SetSelectedFlagVisible(l),
      this.pBt(m),
      this.SetElement(t.ElementId),
      this.vBt(t);
  }
  gBt(t) {
    let e;
    const i = t.ItemConfigId;
    const o = t.BottomTextId;
    const l = t.BottomText;
    const m = t.BottomTextParameter;
    var r = t.IsQualityHidden;
    const n = ((this.Data = t.Data), this.GetSprite(0));
    var r =
      (t.IconPath
        ? ((e = this.GetTexture(1)), this.SetTextureByPath(t.IconPath, e))
        : this.IIt(i),
      r
        ? n.SetUIActive(!1)
        : (t.QualityId > 0
            ? this.SetQualityIconById(n, t.QualityId, void 0, t.QualityType)
            : t.QualityId === 0
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
    const e = t.ItemConfigId;
    const i = t.BottomTextId;
    const o = t.BottomText;
    const l = t.BottomTextParameter;
    const m = t.MonsterId;
    const r = t.QualityIconResourceId;
    const n = t.IsQualityHidden;
    var s = t.IconHidden;
    var t =
      ((this.Data = t.Data),
      s ? this.GetTexture(1)?.SetUIActive(!1) : m ? this.dxt(m) : this.IIt(e),
      this.GetSprite(0));
    var s =
      (n ? t.SetUIActive(!1) : void 0 !== r ? this.Cxt(r) : this._xt(e),
      !StringUtils_1.StringUtils.IsEmpty(i) ||
        !StringUtils_1.StringUtils.IsEmpty(o));
    this.SetBottomTextVisible(s),
      s && (this.SetBottomTextId(i, l), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0);
  }
  vBt(t) {
    let e = t.ItemConfigId;
    const i = t.BottomTextId;
    const o = t.BottomText;
    const l = t.BottomTextParameter;
    var m = t.IsQualityHidden;
    let r = ((this.Data = t.Data), this.GetTexture(1));
    var n =
      (e > TRIAL_ROLE_ID &&
        ((n = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e)),
        (e = n.ParentId)),
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e));
    var n = n.RoleHeadIconBig;
    var n = (this.SetRoleIcon(n, r, e), r.SetUIActive(!0), this.GetSprite(0));
    var m =
      (m
        ? n.SetUIActive(!1)
        : (t.QualityId > 0
            ? this.SetQualityIconById(n, t.QualityId, void 0, t.QualityType)
            : t.QualityId === 0
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
    const e = this.GetTexture(1);
    void 0 === t
      ? e.SetUIActive(!1)
      : (this.SetItemIcon(e, t), e.SetUIActive(!0));
  }
  dxt(t) {
    const e = this.GetTexture(1);
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
    const e = this.GetSprite(0);
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
      void 0 !== t && t > 0,
      e,
    );
  }
  SetEmptySlotVisible(t) {
    const e = this.RefreshComponent(
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
    const e = this.GetSprite(0);
    void 0 === t ||
    ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
    StringUtils_1.StringUtils.IsEmpty(t))
      ? e.SetUIActive(!1)
      : (this.SetSpriteByPath(t, e, !0), e.SetUIActive(!0));
  }
  SetBottomTextVisible(t) {
    const e = this.GetSprite(4);
    const i = this.GetText(3);
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
    const i = this.GetText(3);
    StringUtils_1.StringUtils.IsEmpty(t) ||
      (e
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(i, t, ...e)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(i, t));
  }
  SetBottomText(t) {
    const e = this.GetText(3);
    StringUtils_1.StringUtils.IsEmpty(t) || e.SetText(t);
  }
  SetBottomTextColor(t) {
    this.GetText(3).SetColor(UE.Color.FromHex(t));
  }
  SetSelected(t, e = !1) {
    const i = this.GetExtendToggle(7);
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
// # sourceMappingURL=SmallItemGrid.js.map
