"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGrid = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemGridBase_1 = require("../ItemGridBase/ItemGridBase"),
  SmallItemGridBirthdayEffectComponent_1 = require("./SmallItemGridComponent/SmallItemGridBirthdayEffectComponent"),
  SmallItemGridBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridBlackComponent"),
  SmallItemGridCookUpComponent_1 = require("./SmallItemGridComponent/SmallItemGridCookUpComponent"),
  SmallItemGridCoolDownComponent_1 = require("./SmallItemGridComponent/SmallItemGridCoolDownComponent"),
  SmallItemGridCurrentEquipmentComponent_1 = require("./SmallItemGridComponent/SmallItemGridCurrentEquipmentComponent"),
  SmallItemGridDangoPluginIconComponent_1 = require("./SmallItemGridComponent/SmallItemGridDangoPluginIconComponent"),
  SmallItemGridDisableComponent_1 = require("./SmallItemGridComponent/SmallItemGridDisableComponent"),
  SmallItemGridElementComponent_1 = require("./SmallItemGridComponent/SmallItemGridElementComponent"),
  SmallItemGridEmptySlotComponent_1 = require("./SmallItemGridComponent/SmallItemGridEmptySlotComponent"),
  SmallItemGridExchangeRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridExchangeRewardComponent"),
  SmallItemGridFirstRewardComponent_1 = require("./SmallItemGridComponent/SmallItemGridFirstRewardComponent"),
  SmallItemGridLockBlackComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockBlackComponent"),
  SmallItemGridLockComponent_1 = require("./SmallItemGridComponent/SmallItemGridLockComponent"),
  SmallItemGridNewFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridNewFlagComponent"),
  SmallItemGridNotFoundComponent_1 = require("./SmallItemGridComponent/SmallItemGridNotFoundComponent"),
  SmallItemGridReceivableComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivableComponent"),
  SmallItemGridReceivedComponent_1 = require("./SmallItemGridComponent/SmallItemGridReceivedComponent"),
  SmallItemGridRedDotComponent_1 = require("./SmallItemGridComponent/SmallItemGridRedDotComponent"),
  SmallItemGridRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridRoleHeadComponent"),
  SmallItemGridSelectComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectComponent"),
  SmallItemGridSelectedFlagComponent_1 = require("./SmallItemGridComponent/SmallItemGridSelectedFlagComponent"),
  SmallItemGridSkinComponent_1 = require("./SmallItemGridComponent/SmallItemGridSkinComponent"),
  SmallItemGridVisionFetterComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionFetterComponent"),
  SmallItemGridVisionRoleHeadComponent_1 = require("./SmallItemGridComponent/SmallItemGridVisionRoleHeadComponent"),
  SmallItemTopRightTagComponent_1 = require("./SmallItemGridComponent/SmallItemTopRightTagComponent"),
  TRIAL_ROLE_ID = 1e4;
class SmallItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments),
      (this.IsSelected = !1),
      (this.IsForceSelected = !1),
      (this.nwt = 0),
      (this.awt = void 0),
      (this.OnClickedEmptySlotButton = () => {
        var t;
        this.awt &&
          ((t = { SmallItemGrid: this, Data: this.Data }), this.awt(t));
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
      [8, UE.UISprite],
      [9, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetSprite(8)?.SetUIActive(!1);
  }
  OnSetUnderTextAdditionItem() {
    return this.GetItem(9);
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
      this.UTt(void 0),
      this.Hpl(void 0),
      this.SetBottomTextVisible(!1),
      this.SetQuality(void 0),
      this.SetExtendToggleEnable(!1),
      this.SetElement(void 0);
  }
  ApplyEmptyWithoutAddSmallItemGrid(t) {
    this.ClearVisibleComponent(),
      this.ClearComponentList(),
      this.UTt(void 0),
      this.Hpl(void 0),
      this.SetBottomTextVisible(!1),
      this.SetQuality(void 0),
      this.SetExtendToggleEnable(!1),
      this.SetElement(void 0),
      this.RefreshComponentVisible(),
      this.RefreshComponentHierarchyIndex();
  }
  ApplyPropSmallItemGrid(t) {
    var e = t.IsLockVisible,
      i = t.IsReceivableVisible,
      o = t.IsReceivedVisible,
      m = t.IsNewVisible,
      l = t.IsNotFoundVisible,
      n = t.CoolDownTime,
      r = t.IsDisable,
      a = t.IsBirthdayEffectVisible;
    this.SetIsDisable(r),
      this.SetLockVisible(e),
      this.SetReceivableVisible(i),
      this.SetReceivedVisible(o),
      this.SetNewFlagVisible(m),
      this.SetNotFoundVisible(l),
      this.SetCoolDown(n),
      this.SetRedDotVisible(t.IsRedDotVisible),
      this.SetBirthdayEffect(a),
      this.vbt(t);
  }
  ApplyPhantomSmallItemGrid(t) {
    var e = t.IsLockVisible,
      i = t.IsLockVisibleBlack,
      o = t.IsReceivableVisible,
      m = t.IsReceivedVisible,
      l = t.IsNewVisible,
      n = t.IsNotFoundVisible,
      r = t.IsSelectedFlag,
      a = t.VisionRoleHeadInfo,
      s = t.FetterGroupId;
    this.SetLockVisible(e),
      this.SetLockBlackVisible(i),
      this.SetReceivableVisible(o),
      this.SetReceivedVisible(m),
      this.SetNewFlagVisible(l),
      this.SetNotFoundVisible(n),
      this.SetSelectedFlagVisible(r),
      this.SetVisionRoleHead(a),
      this.SetVisionFetterGroup(s),
      this.SetRedDotVisible(t.IsRedDotVisible),
      this.Mbt(t);
  }
  ApplyCharacterSmallItemGrid(t) {
    var e = t.IsLockVisible,
      i = t.IsReceivableVisible,
      o = t.IsReceivedVisible,
      m = t.IsSelectedFlag,
      l = t.IsCookUp ?? !1,
      n = t.IsBlack;
    this.SetIsBlack(n),
      this.SetLockVisible(e),
      this.SetReceivableVisible(i),
      this.SetReceivedVisible(o),
      this.SetSelectedFlagVisible(m),
      this.Ebt(l),
      this.SetElement(t.ElementId),
      this.SetRedDotVisible(t.IsRedDotVisible),
      this.Sbt(t);
  }
  vbt(t) {
    var e = t.ItemConfigId,
      i = ((this.Data = t.Data), this.GetTexture(1)),
      o =
        ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(
          t.ItemConfigId,
        );
    t.IsIconHide
      ? i?.SetUIActive(!1)
      : t.IconPath
        ? this.SetTextureByPath(t.IconPath, i)
        : 13 === o
          ? this.sL1(e)
          : this.UTt(e),
      this.SetItemQuality(t),
      this.dal(t),
      this.RefreshTopRightText(t),
      this.SetExtendToggleEnable(!0),
      this.RefreshSkin(t, e);
  }
  SetElement(t) {
    this.RefreshComponent(
      SmallItemGridElementComponent_1.SmallItemGridElementComponent,
      void 0 !== t,
      t,
    );
  }
  Mbt(t) {
    var e = t.ItemConfigId,
      i = t.MonsterId,
      o = t.PhantomId,
      m = t.QualityIconResourceId,
      l = t.IsQualityHidden,
      n = t.IconHidden,
      n =
        ((this.Data = t.Data),
        n
          ? this.GetTexture(1)?.SetUIActive(!1)
          : i
            ? this.pwt(i)
            : o
              ? this.Gzs(o)
              : this.UTt(e),
        this.GetSprite(0));
    l ? n.SetUIActive(!1) : void 0 !== m ? this.vwt(m) : this.SetQuality(e),
      this.dal(t),
      this.RefreshTopRightText(t),
      this.SetExtendToggleEnable(!0);
  }
  Sbt(t) {
    let e = t.ItemConfigId;
    var i,
      o = t.IsQualityHidden,
      m = ((this.Data = t.Data), this.GetTexture(1)),
      l =
        (e > TRIAL_ROLE_ID &&
          ((l = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e)),
          (e = l.ParentId)),
        t.SkinId),
      l =
        (l
          ? ((i =
              ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(
                l,
              ).RoleHeadIconLarge),
            this.SetRoleSkinIcon(i, m, l))
          : ((i =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                e,
              ).RoleHeadIconBig),
            this.SetRoleIcon(i, m, e)),
        m.SetUIActive(!0),
        this.GetSprite(0));
    o
      ? l.SetUIActive(!1)
      : (0 < t.QualityId
          ? this.SetQualityIconById(l, t.QualityId, void 0, t.QualityType)
          : 0 === t.QualityId
            ? ((i =
                ModelManager_1.ModelManager.SmallItemGridModel
                  .DefaultQualitySpritePath),
              this.SetSpriteByPath(i, l, !1))
            : this.SetQuality(e),
        l.SetUIActive(!0)),
      this.dal(t),
      this.RefreshTopRightText(t),
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
  SetSelectVisible(t) {
    this.RefreshComponent(
      SmallItemGridSelectComponent_1.SmallItemGridSelectComponent,
      t,
      t,
    );
  }
  Ebt(t) {
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
  SetExchangeRewardVisible(t) {
    this.RefreshComponent(
      SmallItemGridExchangeRewardComponent_1.SmallItemGridExchangeRewardComponent,
      t,
      t,
    );
  }
  SetTextureByIconPath(t) {
    var e = this.GetTexture(1);
    this.SetTextureByPath(t, e);
  }
  UTt(t) {
    var e = this.GetTexture(1);
    void 0 === t
      ? e.SetUIActive(!1)
      : (this.SetItemIcon(e, t), e.SetUIActive(!0));
  }
  sL1(t) {
    this.SetDangoPluginIcon({ PluginItemId: t }),
      this.GetTexture(1)?.SetUIActive(!1);
  }
  pwt(t) {
    var e = this.GetTexture(1);
    void 0 === t
      ? e.SetUIActive(!1)
      : ((t =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(t)),
        this.SetTextureByPath(t, e),
        e.SetUIActive(!0));
  }
  Gzs(t) {
    var e = this.GetTexture(1);
    void 0 === t
      ? e.SetUIActive(!1)
      : ((t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            t,
          )),
        this.SetTextureByPath(t.IconMiddle, e),
        e.SetUIActive(!0));
  }
  SetVisionRoleHead(t) {
    this.RefreshComponent(
      SmallItemGridVisionRoleHeadComponent_1.SmallItemGridVisionRoleHeadComponent,
      void 0 !== t,
      t,
    );
  }
  SetRoleHead(t) {
    this.RefreshComponent(
      SmallItemGridRoleHeadComponent_1.SmallItemGridRoleHeadComponent,
      void 0 !== t,
      t,
    );
  }
  SetItemQuality(t) {
    var e =
      ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(
        t.ItemConfigId,
      );
    10 === e || 11 === e || 14 === e
      ? (this.SetQuality(void 0), this.Hpl(t))
      : 13 === e
        ? this.ET1(t)
        : (this.SetSkinQuality(void 0), this.jpl(t));
  }
  SetQuality(t) {
    var e = this.GetSprite(0);
    void 0 === t
      ? e.SetUIActive(!1)
      : (this.nwt !== t &&
          ((this.nwt = t), this.SetItemQualityIcon(e, t, void 0)),
        e.SetUIActive(!0));
  }
  SetSkinQuality(t) {
    var e = this.GetSprite(8);
    void 0 === t
      ? e.SetUIActive(!1)
      : (this.nwt !== t &&
          ((this.nwt = t),
          (t =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
          (t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(
            t.QualityId,
          )),
          this.SetSpriteByPath(t.SkinQuality, e, !1)),
        e.SetUIActive(!0));
  }
  jpl(t) {
    var e,
      i = this.GetSprite(0);
    !t || t.IsQualityHidden
      ? i.SetUIActive(!1)
      : 0 < t.QualityId
        ? (this.SetQualityIconById(i, t.QualityId, void 0, t.QualityType),
          i.SetUIActive(!0))
        : 0 === t.QualityId
          ? ((e =
              ModelManager_1.ModelManager.SmallItemGridModel
                .DefaultQualitySpritePath),
            this.SetSpriteByPath(e, i, !1),
            i.SetUIActive(!0))
          : this.SetQuality(t.ItemConfigId);
  }
  Hpl(t) {
    var e,
      i = this.GetSprite(8);
    !t || t.IsQualityHidden
      ? i.SetUIActive(!1)
      : 0 < t.QualityId
        ? ((e = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(
            t.QualityId,
          )),
          this.SetSpriteByPath(e.SkinQuality, i, !1),
          i.SetUIActive(!0))
        : 0 === t.QualityId
          ? ((e =
              ModelManager_1.ModelManager.SmallItemGridModel
                .DefaultQualitySpritePath),
            this.SetSpriteByPath(e, i, !1),
            i.SetUIActive(!0))
          : this.SetSkinQuality(t.ItemConfigId);
  }
  ET1(t) {
    var e = this.GetSprite(0);
    !t || !t.ItemConfigId || t.IsQualityHidden
      ? e.SetUIActive(!1)
      : ((t =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(
            t.ItemConfigId,
          )[t.QualityType ?? "BackgroundSprite"] ??
          ModelManager_1.ModelManager.SmallItemGridModel
            .DefaultQualitySpritePath),
        this.SetSpriteByPath(t, e, !1),
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
  SetVisionFetterGroup(t) {
    this.RefreshComponent(
      SmallItemGridVisionFetterComponent_1.SmallItemGridVisionFetterComponent,
      void 0 !== t && 0 < t,
      t,
    );
  }
  RefreshSkin(t, e) {
    t = { SkinId: e, BottomText: t.BottomText };
    let i = !1;
    e &&
      ((e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e,
        )),
      (i = 10 === e || 11 === e || 14 === e)),
      i && this.SetBottomTextVisible(!1),
      this.RefreshComponent(
        SmallItemGridSkinComponent_1.SmallItemGridSkinComponent,
        i,
        t,
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
  BindEmptySlotButtonCallback(t) {
    this.awt = t;
  }
  SetNewFlagVisible(t) {
    this.RefreshComponent(
      SmallItemGridNewFlagComponent_1.SmallItemGridNewFlagComponent,
      t,
      t,
    );
  }
  SetRedDotVisible(t) {
    this.RefreshComponent(
      SmallItemGridRedDotComponent_1.SmallItemGridRedDotComponent,
      t,
      t,
    );
  }
  SetDangoPluginIcon(t) {
    this.RefreshComponent(
      SmallItemGridDangoPluginIconComponent_1.SmallItemGridDangoPluginIconComponent,
      !0,
      t,
    );
  }
  SetBirthdayEffect(t) {
    this.RefreshComponent(
      SmallItemGridBirthdayEffectComponent_1.SmallItemGridBirthdayEffectComponent,
      !0,
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
  vwt(t) {
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
  SetIsBlack(t) {
    this.RefreshComponent(
      SmallItemGridBlackComponent_1.SmallItemGridBlackComponent,
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
  dal(t) {
    var e = t.BottomTextId,
      i = t.BottomText,
      t = t.BottomTextParameter,
      o =
        !StringUtils_1.StringUtils.IsEmpty(e) ||
        !StringUtils_1.StringUtils.IsEmpty(i);
    this.SetBottomTextVisible(o),
      o && (this.SetBottomTextId(e, t), this.SetBottomText(i));
  }
  RefreshTopRightText(t) {
    var e = {
        TopRightTextBgColor: t.TopRightTextBgColor,
        TopRightTextColor: t.TopRightTextColor,
        TopRightTextId: t.TopRightTextId,
        TopRightText: t.TopRightText,
        TopRightTextParameter: t.TopRightTextParameter,
      },
      t =
        !StringUtils_1.StringUtils.IsEmpty(t.TopRightTextId) ||
        !StringUtils_1.StringUtils.IsEmpty(t.TopRightText);
    this.RefreshComponent(
      SmallItemTopRightTagComponent_1.SmallItemTopRightTagComponent,
      t,
      e,
    );
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
