"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGrid = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemGridBase_1 = require("../ItemGridBase/ItemGridBase"),
  MediumItemGridBuffIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridBuffIconComponent"),
  MediumItemGridCheckTickComponent_1 = require("./MediumItemGridComponent/MediumItemGridCheckTickComponent"),
  MediumItemGridCoolDownComponent_1 = require("./MediumItemGridComponent/MediumItemGridCoolDownComponent"),
  MediumItemGridCostComponent_1 = require("./MediumItemGridComponent/MediumItemGridCostComponent"),
  MediumItemGridDevelopRewardComponent_1 = require("./MediumItemGridComponent/MediumItemGridDevelopRewardComponent"),
  MediumItemGridDisableComponent_1 = require("./MediumItemGridComponent/MediumItemGridDisableComponent"),
  MediumItemGridElementComponent_1 = require("./MediumItemGridComponent/MediumItemGridElementComponent"),
  MediumItemGridEmptySlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridEmptySlotComponent"),
  MediumItemGridLevelAndLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridLevelAndLockComponent"),
  MediumItemGridMainVisionComponent_1 = require("./MediumItemGridComponent/MediumItemGridMainVisionComponent"),
  MediumItemGridNewFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridNewFlagComponent"),
  MediumItemGridPhantomLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridPhantomLockComponent"),
  MediumItemGridProhibitComponent_1 = require("./MediumItemGridComponent/MediumItemGridProhibitComponent"),
  MediumItemGridReceivedComponent_1 = require("./MediumItemGridComponent/MediumItemGridReceivedComponent"),
  MediumItemGridRecommendComponent_1 = require("./MediumItemGridComponent/MediumItemGridRecommendComponent"),
  MediumItemGridRedDotComponent_1 = require("./MediumItemGridComponent/MediumItemGridRedDotComponent"),
  MediumItemGridReduceButtonComponent_1 = require("./MediumItemGridComponent/MediumItemGridReduceButtonComponent"),
  MediumItemGridRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridRoleHeadComponent"),
  MediumItemGridSortHighlightIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortHighlightIndexComponent"),
  MediumItemGridSortIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortIndexComponent"),
  MediumItemGridSpriteIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridSpriteIconComponent"),
  MediumItemGridTeamIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridTeamIconComponent"),
  MediumItemGridTimeFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridTimeFlagComponent"),
  MediumItemGridVisionFetterComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionFetterComponent"),
  MediumItemGridVisionRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionRoleHeadComponent"),
  MediumItemGridVisionSlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionSlotComponent"),
  TRIAL_ROLE_ID = 1e4;
class MediumItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments),
      (this.rwt = 0),
      (this.nwt = 0),
      (this.swt = void 0),
      (this.awt = void 0),
      (this.hwt = void 0),
      (this.lwt = (e) => {
        this.hwt && this.hwt(e, this, this.Data);
      }),
      (this.OnClickedReduceButton = () => {
        var e;
        this.swt &&
          ((e = { MediumItemGrid: this, Data: this.Data }), this.swt(e));
      }),
      (this.OnClickedEmptySlotButton = () => {
        var e;
        this.awt &&
          ((e = { MediumItemGrid: this, Data: this.Data }), this.awt(e));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIExtendToggle],
    ];
  }
  OnSetBottomAdditionItem() {
    return this.GetItem(5);
  }
  OnSetTopAdditionItem() {
    return this.GetItem(4);
  }
  UnBindComponentEvents() {
    this.UnBindReduceButtonCallback(),
      this.UnBindEmptySlotButtonCallback(),
      this.UnBindReduceLongPress();
  }
  Apply(e) {
    this.ClearVisibleComponent(),
      this.ClearComponentList(),
      1 === e.Type && this._wt(e),
      4 === e.Type && this.uwt(e),
      3 === e.Type && this.cwt(e),
      2 === e.Type && this.mwt(e),
      this.RefreshComponentVisible(),
      this.RefreshComponentHierarchyIndex();
  }
  _wt(e) {
    (this.Data = e.Data),
      this.SetEmptySlotVisible(!0),
      this.UTt(void 0),
      this.dwt(void 0),
      this.Cwt(!1),
      this.gwt(!1),
      this.SetExtendToggleEnable(!0),
      this.ApplyEmptyDisplay(e);
  }
  uwt(e) {
    var i = e.StarLevel,
      t = e.IsNewVisible,
      o = e.BuffIconType,
      m = e.IsRedDotVisible,
      n = e.IsLockVisible,
      d = e.Level,
      r = e.IsLevelTextUseChangeColor,
      s = e.CoolDown,
      h = e.TotalCoolDown,
      u = e.IsProhibit,
      p = e.ReduceButtonInfo,
      I = e.IsCheckTick,
      C = e.IsTimeFlagVisible,
      M = e.IsReceivedFlagVisible,
      a = e.RoleHeadInfo,
      l = e.SortIndex,
      G = e.IsDisable,
      _ = e.IsMainVisionVisible,
      v = e.VisionFetterGroupId,
      S = e.VisionRoleHeadInfo,
      c =
        3 ===
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e.ItemConfigId,
        );
    this.SetStartLevel(i),
      this.SetBuffSprite(o),
      this.SetRedDotVisible(m),
      this.SetLevelAndLock(d, n, r, c),
      this.SetCoolDown(s, h),
      this.SetIsProhibit(u),
      this.SetReduceButton(p),
      this.SetCheckTickVisible(I),
      this.SetTimeFlagVisible(C),
      this.SetReceivedFlagVisible(M),
      this.SetRoleHead(a),
      this.SetSortIndex(l),
      this.SetIsDisable(G),
      this.SetIsMainVision(_),
      this.SetNewVisible(!m && t),
      this.SetVisionFetterGroup(v),
      this.SetVisionRoleHead(S),
      this.ApplyPropBaseDisplay(e);
  }
  cwt(e) {
    var i = e.StarLevel,
      t = e.IsMainVisionVisible,
      o = e.RoleHeadInfo,
      m = e.IsNewVisible,
      n = e.IsLockVisible,
      d = e.IsPhantomLock,
      r = e.DevelopRewardInfo,
      s = e.IsRedDotVisible,
      h = e.Level,
      u = e.IsLevelTextUseChangeColor,
      p = e.FetterGroupId,
      I = e.VisionRoleHeadInfo;
    this.SetStartLevel(i),
      this.SetRedDotVisible(s),
      this.SetIsMainVision(t),
      this.SetRoleHead(o),
      this.SetLevelAndLock(h, n, u, !0),
      this.SetIsPhantomLock(d),
      this.SetDevelopRewardInfo(r),
      this.SetNewVisible(m),
      this.SetVisionFetterGroup(p),
      this.SetVisionRoleHead(I),
      this.ApplyPhantomBaseDisplay(e);
  }
  mwt(e) {
    this.SetElement(e.ElementId),
      this.SetSortIndex(e.Index, e.HighlightIndex),
      this.SetTeamIcon(e.IsInTeam),
      this.SetRecommendVisible(e.IsRecommendVisible),
      this.SetIsDisable(e.IsDisable),
      this.SetTrialRoleVisible(e.IsTrialRoleVisible),
      this.SetLevelAndLock(e.Level, e.IsShowLock, e.IsLevelTextUseChangeColor),
      this.SetNewVisible(e.IsNewVisible),
      this.fwt(e.IsShowCost, e.ItemConfigId),
      this.ApplyCharacterBaseDisplay(e);
  }
  SetBuffSprite(e) {
    this.RefreshComponent(
      MediumItemGridBuffIconComponent_1.MediumItemGridBuffIconComponent,
      void 0 !== e && 0 !== e,
      e,
    );
  }
  SetLevelAndLock(e, i, t, o) {
    t = {
      Level: e,
      IsLockVisible: i,
      IsLevelUseChangeColor: t,
      IsUseVision: o,
    };
    this.RefreshComponent(
      MediumItemGridLevelAndLockComponent_1.MediumItemGridLevelAndLockComponent,
      void 0 !== e || i,
      t,
    );
  }
  SetRedDotVisible(e) {
    this.RefreshComponent(
      MediumItemGridRedDotComponent_1.MediumItemGridRedDotComponent,
      e,
      e,
    );
  }
  SetNewVisible(e) {
    this.RefreshComponent(
      MediumItemGridNewFlagComponent_1.MediumItemGridNewFlagComponent,
      e,
      e,
    );
  }
  SetStartLevel(e) {}
  SetRoleHead(e) {
    this.RefreshComponent(
      MediumItemGridRoleHeadComponent_1.MediumItemGridRoleHeadComponent,
      void 0 !== e && 0 < e.RoleConfigId,
      e,
    );
  }
  SetVisionRoleHead(e) {
    this.RefreshComponent(
      MediumItemGridVisionRoleHeadComponent_1.MediumItemGridVisionRoleHeadComponent,
      void 0 !== e && 0 < e.RoleConfigId,
      e,
    );
  }
  SetVisionSlotState(e) {
    this.RefreshComponent(
      MediumItemGridVisionSlotComponent_1.MediumItemGridVisionSlotComponent,
      void 0 !== e && 0 < e.length,
      e,
    );
  }
  SetIsPhantomLock(e) {
    this.RefreshComponent(
      MediumItemGridPhantomLockComponent_1.MediumItemGridPhantomLockComponent,
      e,
      e,
    );
  }
  SetDevelopRewardInfo(e) {
    this.RefreshComponent(
      MediumItemGridDevelopRewardComponent_1.MediumItemGridDevelopRewardComponent,
      void 0 !== e,
      e,
    );
  }
  SetIsMainVision(e) {
    this.RefreshComponent(
      MediumItemGridMainVisionComponent_1.MediumItemGridMainVisionComponent,
      e,
      e,
    );
  }
  SetCoolDown(e, i) {
    i = { CoolDown: e, TotalCdTime: i };
    this.RefreshComponent(
      MediumItemGridCoolDownComponent_1.MediumItemGridCoolDownComponent,
      void 0 !== e && 0 < e,
      i,
    );
  }
  SetIsProhibit(e) {
    this.RefreshComponent(
      MediumItemGridProhibitComponent_1.MediumItemGridProhibitComponent,
      e,
      e,
    );
  }
  SetReduceButton(e) {
    var i = e?.IsVisible,
      e = this.RefreshComponent(
        MediumItemGridReduceButtonComponent_1.MediumItemGridReduceButtonComponent,
        i,
        e,
      );
    e &&
      (i
        ? (e.BindReduceButtonCallback(this.OnClickedReduceButton),
          e.BindLongPressCallback(this.lwt))
        : (e.UnBindReduceButtonCallback(), e.UnBindLongPressCallback()));
  }
  SetSortIndex(e, i = !1) {
    i
      ? this.RefreshComponent(
          MediumItemGridSortHighlightIndexComponent_1.MediumItemGridSortHighlightIndexComponent,
          void 0 !== e,
          e,
        )
      : this.RefreshComponent(
          MediumItemGridSortIndexComponent_1.MediumItemGridSortIndexComponent,
          void 0 !== e,
          e,
        );
  }
  SetTeamIcon(e) {
    this.RefreshComponent(
      MediumItemGridTeamIconComponent_1.MediumItemGridTeamIconComponent,
      void 0 !== e,
      e,
    );
  }
  BindReduceLongPress(e) {
    this.hwt = e;
  }
  UnBindReduceLongPress() {
    this.hwt = void 0;
  }
  SetCheckTickVisible(e) {
    var i = { IsCheckTick: e };
    this.RefreshComponent(
      MediumItemGridCheckTickComponent_1.MediumItemGridCheckTickComponent,
      e,
      i,
    );
  }
  SetCheckTickPerformance(e, i, t, o) {
    i = { IsCheckTick: e, HexColor: i, Alpha: t, TickHexColor: o };
    this.RefreshComponent(
      MediumItemGridCheckTickComponent_1.MediumItemGridCheckTickComponent,
      e,
      i,
    );
  }
  SetTimeFlagVisible(e) {
    this.RefreshComponent(
      MediumItemGridTimeFlagComponent_1.MediumItemGridTimeFlagComponent,
      e,
      e,
    );
  }
  SetReceivedFlagVisible(e) {
    this.RefreshComponent(
      MediumItemGridReceivedComponent_1.MediumItemGridReceivedComponent,
      e,
      e,
    );
  }
  SetEmptySlotVisible(e) {
    var i = this.RefreshComponent(
      MediumItemGridEmptySlotComponent_1.MediumItemGridEmptySlotComponent,
      e,
      e,
    );
    i &&
      (e
        ? i.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton)
        : i.UnBindEmptySlotButtonCallback());
  }
  Cwt(e) {
    this.GetSprite(3).SetUIActive(e);
  }
  SetElement(e) {
    this.RefreshComponent(
      MediumItemGridElementComponent_1.MediumItemGridElementComponent,
      void 0 !== e,
      e,
    );
  }
  SetRecommendVisible(e) {
    this.RefreshComponent(
      MediumItemGridRecommendComponent_1.MediumItemGridRecommendComponent,
      e,
      e,
    );
  }
  SetIsDisable(e) {
    this.RefreshComponent(
      MediumItemGridDisableComponent_1.MediumItemGridDisableComponent,
      e,
      e,
    );
  }
  SetVisionFetterGroup(e) {
    this.RefreshComponent(
      MediumItemGridVisionFetterComponent_1.MediumItemGridVisionFetterComponent,
      void 0 !== e && 0 < e,
      e,
    );
  }
  IsDisable() {
    var e = this.GetItemGridComponent(
      MediumItemGridDisableComponent_1.MediumItemGridDisableComponent,
    );
    return !!e && e.GetActive();
  }
  SetTrialRoleVisible(e) {
    this.RefreshComponent(
      MediumItemGridTimeFlagComponent_1.MediumItemGridTimeFlagComponent,
      e,
      e,
    );
  }
  SetIconSprite(e) {
    this.RefreshComponent(
      MediumItemGridSpriteIconComponent_1.MediumItemGridSpriteIconComponent,
      void 0 !== e && "" !== e,
      e,
    );
  }
  ApplyEmptyDisplay(e) {
    var i = e.BottomTextId,
      t = e.BottomText,
      e = e.BottomTextParameter,
      o =
        !StringUtils_1.StringUtils.IsEmpty(i) ||
        !StringUtils_1.StringUtils.IsEmpty(t);
    this.gwt(o), o && (this.SetBottomTextId(i, e), this.SetBottomText(t));
  }
  ApplyPropBaseDisplay(e) {
    var i = e.ItemConfigId,
      t = e.BottomTextId,
      o = e.BottomText,
      m = e.BottomTextParameter,
      n = e.SpriteIconPath,
      d =
        ((this.Data = e.Data),
        e.IconPath
          ? ((d = this.GetTexture(1)),
            this.SetTextureByPath(e.IconPath, d),
            d?.SetUIActive(!0))
          : this.UTt(i),
        this.SetIconSprite(n),
        e.QualityId
          ? this.SetQualityIconById(
              this.GetSprite(0),
              e.QualityId,
              void 0,
              e.QualityType,
            )
          : this.dwt(i),
        !StringUtils_1.StringUtils.IsEmpty(t) ||
          !StringUtils_1.StringUtils.IsEmpty(o));
    this.gwt(d),
      d && (this.SetBottomTextId(t, m), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0),
      this.Cwt(!0);
  }
  ApplyPhantomBaseDisplay(e) {
    var i = e.ItemConfigId,
      t = e.BottomTextId,
      o = e.BottomText,
      m = e.BottomTextParameter,
      n = e.MonsterId,
      d = e.QualityIconResourceId,
      n =
        ((this.Data = e.Data),
        n ? this.pwt(n) : this.UTt(i),
        void 0 !== d
          ? this.vwt(d)
          : e.QualityId
            ? this.SetQualityIconById(
                this.GetSprite(0),
                e.QualityId,
                void 0,
                e.QualityType,
              )
            : this.dwt(i),
        !StringUtils_1.StringUtils.IsEmpty(t) ||
          !StringUtils_1.StringUtils.IsEmpty(o));
    this.gwt(n),
      n && (this.SetBottomTextId(t, m), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0),
      this.Cwt(!0);
  }
  ApplyCharacterBaseDisplay(e) {
    let i = e.ItemConfigId;
    var t = e.BottomTextId,
      o = e.BottomText,
      m = e.BottomTextParameter,
      e = ((this.Data = e.Data), this.GetTexture(1)),
      n =
        (i > TRIAL_ROLE_ID &&
          ((n = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i)),
          (i = n.ParentId)),
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)),
      n = n.RoleHeadIconLarge,
      n =
        (this.SetRoleIcon(n, e, i),
        this.dwt(i),
        e?.SetUIActive(!0),
        !StringUtils_1.StringUtils.IsEmpty(t) ||
          !StringUtils_1.StringUtils.IsEmpty(o));
    this.gwt(n),
      n && (this.SetBottomTextId(t, m), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0),
      this.Cwt(!0);
  }
  UTt(e) {
    var i = this.GetTexture(1);
    void 0 === e
      ? i.SetUIActive(!1)
      : (this.rwt !== e && ((this.rwt = e), this.SetItemIcon(i, e)),
        i.SetUIActive(!0));
  }
  pwt(e) {
    var i = this.GetTexture(1);
    void 0 === e
      ? i.SetUIActive(!1)
      : ((e =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e)),
        this.SetTextureByPath(e, i),
        i.SetUIActive(!0));
  }
  dwt(e) {
    var i = this.GetSprite(0);
    void 0 === e
      ? i.SetUIActive(!1)
      : (this.nwt !== e &&
          ((this.nwt = e),
          this.SetItemQualityIcon(
            i,
            e,
            void 0,
            "MediumItemGridQualitySpritePath",
          )),
        i.SetUIActive(!0));
  }
  vwt(e) {
    var i = this.GetSprite(0);
    void 0 === e ||
    ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
    StringUtils_1.StringUtils.IsEmpty(e))
      ? i.SetUIActive(!1)
      : (this.SetSpriteByPath(e, i, !0), i.SetUIActive(!0));
  }
  gwt(e) {
    var i = this.GetText(2);
    i.IsUIActiveSelf() !== e && i.SetUIActive(e);
  }
  SetBottomTextId(e, i) {
    var t = this.GetText(2);
    StringUtils_1.StringUtils.IsEmpty(e) ||
      (i
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, e, ...i)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  SetBottomText(e) {
    var i = this.GetText(2);
    StringUtils_1.StringUtils.IsEmpty(e) || i.SetText(e);
  }
  BindReduceButtonCallback(e, i) {
    this.swt = e;
  }
  UnBindReduceButtonCallback() {
    this.swt = void 0;
  }
  BindEmptySlotButtonCallback(e) {
    this.awt = e;
  }
  UnBindEmptySlotButtonCallback() {
    this.awt = void 0;
  }
  GetItemGridExtendToggle() {
    return this.GetExtendToggle(6);
  }
  fwt(e, i) {
    this.RefreshComponent(
      MediumItemGridCostComponent_1.MediumItemGridCostComponent,
      e,
      i,
    );
  }
  SetBottomTextColor(e) {
    this.GetText(2).SetColor(UE.Color.FromHex(e));
  }
}
exports.MediumItemGrid = MediumItemGrid;
//# sourceMappingURL=MediumItemGrid.js.map
