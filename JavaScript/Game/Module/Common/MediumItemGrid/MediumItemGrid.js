"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGrid = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemGridBase_1 = require("../ItemGridBase/ItemGridBase");
const MediumItemGridBuffIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridBuffIconComponent");
const MediumItemGridCheckTickComponent_1 = require("./MediumItemGridComponent/MediumItemGridCheckTickComponent");
const MediumItemGridCoolDownComponent_1 = require("./MediumItemGridComponent/MediumItemGridCoolDownComponent");
const MediumItemGridCostComponent_1 = require("./MediumItemGridComponent/MediumItemGridCostComponent");
const MediumItemGridDevelopRewardComponent_1 = require("./MediumItemGridComponent/MediumItemGridDevelopRewardComponent");
const MediumItemGridDisableComponent_1 = require("./MediumItemGridComponent/MediumItemGridDisableComponent");
const MediumItemGridElementComponent_1 = require("./MediumItemGridComponent/MediumItemGridElementComponent");
const MediumItemGridEmptySlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridEmptySlotComponent");
const MediumItemGridLevelAndLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridLevelAndLockComponent");
const MediumItemGridMainVisionComponent_1 = require("./MediumItemGridComponent/MediumItemGridMainVisionComponent");
const MediumItemGridNewFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridNewFlagComponent");
const MediumItemGridPhantomLockComponent_1 = require("./MediumItemGridComponent/MediumItemGridPhantomLockComponent");
const MediumItemGridProhibitComponent_1 = require("./MediumItemGridComponent/MediumItemGridProhibitComponent");
const MediumItemGridReceivedComponent_1 = require("./MediumItemGridComponent/MediumItemGridReceivedComponent");
const MediumItemGridRecommendComponent_1 = require("./MediumItemGridComponent/MediumItemGridRecommendComponent");
const MediumItemGridRedDotComponent_1 = require("./MediumItemGridComponent/MediumItemGridRedDotComponent");
const MediumItemGridReduceButtonComponent_1 = require("./MediumItemGridComponent/MediumItemGridReduceButtonComponent");
const MediumItemGridRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridRoleHeadComponent");
const MediumItemGridSortHighlightIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortHighlightIndexComponent");
const MediumItemGridSortIndexComponent_1 = require("./MediumItemGridComponent/MediumItemGridSortIndexComponent");
const MediumItemGridSpriteIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridSpriteIconComponent");
const MediumItemGridTeamIconComponent_1 = require("./MediumItemGridComponent/MediumItemGridTeamIconComponent");
const MediumItemGridTimeFlagComponent_1 = require("./MediumItemGridComponent/MediumItemGridTimeFlagComponent");
const MediumItemGridVisionFetterComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionFetterComponent");
const MediumItemGridVisionRoleHeadComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionRoleHeadComponent");
const MediumItemGridVisionSlotComponent_1 = require("./MediumItemGridComponent/MediumItemGridVisionSlotComponent");
const TRIAL_ROLE_ID = 1e4;
class MediumItemGrid extends ItemGridBase_1.ItemGridBase {
  constructor() {
    super(...arguments),
      (this.ext = 0),
      (this.txt = 0),
      (this.ixt = void 0),
      (this.oxt = void 0),
      (this.rxt = void 0),
      (this.nxt = (e) => {
        this.rxt && this.rxt(e, this, this.Data);
      }),
      (this.OnClickedReduceButton = () => {
        let e;
        this.ixt &&
          ((e = { MediumItemGrid: this, Data: this.Data }), this.ixt(e));
      }),
      (this.OnClickedEmptySlotButton = () => {
        let e;
        this.oxt &&
          ((e = { MediumItemGrid: this, Data: this.Data }), this.oxt(e));
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
      e.Type === 1 && this.sxt(e),
      e.Type === 4 && this.axt(e),
      e.Type === 3 && this.hxt(e),
      e.Type === 2 && this.lxt(e),
      this.RefreshComponentVisible(),
      this.RefreshComponentHierarchyIndex();
  }
  sxt(e) {
    (this.Data = e.Data),
      this.SetEmptySlotVisible(!0),
      this.IIt(void 0),
      this._xt(void 0),
      this.uxt(!1),
      this.cxt(!1),
      this.SetExtendToggleEnable(!0),
      this.ApplyEmptyDisplay(e);
  }
  axt(e) {
    const i = e.StarLevel;
    const t = e.IsNewVisible;
    const o = e.BuffIconType;
    const m = e.IsRedDotVisible;
    const n = e.IsLockVisible;
    const d = e.Level;
    const r = e.IsLevelTextUseChangeColor;
    const s = e.CoolDown;
    const h = e.TotalCoolDown;
    const u = e.IsProhibit;
    const p = e.ReduceButtonInfo;
    const I = e.IsCheckTick;
    const C = e.IsTimeFlagVisible;
    const M = e.IsReceivedFlagVisible;
    const a = e.RoleHeadInfo;
    const l = e.SortIndex;
    const G = e.IsDisable;
    const _ = e.IsMainVisionVisible;
    const v = e.VisionFetterGroupId;
    const S = e.VisionRoleHeadInfo;
    const c =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e.ItemConfigId,
      ) === 3;
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
  hxt(e) {
    const i = e.StarLevel;
    const t = e.IsMainVisionVisible;
    const o = e.RoleHeadInfo;
    const m = e.IsNewVisible;
    const n = e.IsLockVisible;
    const d = e.IsPhantomLock;
    const r = e.DevelopRewardInfo;
    const s = e.IsRedDotVisible;
    const h = e.Level;
    const u = e.IsLevelTextUseChangeColor;
    const p = e.FetterGroupId;
    const I = e.VisionRoleHeadInfo;
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
  lxt(e) {
    this.SetElement(e.ElementId),
      this.SetSortIndex(e.Index, e.HighlightIndex),
      this.SetTeamIcon(e.IsInTeam),
      this.SetRecommendVisible(e.IsRecommendVisible),
      this.SetIsDisable(e.IsDisable),
      this.SetTrialRoleVisible(e.IsTrialRoleVisible),
      this.SetLevelAndLock(e.Level, e.IsShowLock, e.IsLevelTextUseChangeColor),
      this.SetNewVisible(e.IsNewVisible),
      this.mxt(e.IsShowCost, e.ItemConfigId),
      this.ApplyCharacterBaseDisplay(e);
  }
  SetBuffSprite(e) {
    this.RefreshComponent(
      MediumItemGridBuffIconComponent_1.MediumItemGridBuffIconComponent,
      void 0 !== e && e !== 0,
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
      void 0 !== e && e.RoleConfigId > 0,
      e,
    );
  }
  SetVisionRoleHead(e) {
    this.RefreshComponent(
      MediumItemGridVisionRoleHeadComponent_1.MediumItemGridVisionRoleHeadComponent,
      void 0 !== e && e.RoleConfigId > 0,
      e,
    );
  }
  SetVisionSlotState(e) {
    this.RefreshComponent(
      MediumItemGridVisionSlotComponent_1.MediumItemGridVisionSlotComponent,
      void 0 !== e && e.length > 0,
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
      void 0 !== e && e > 0,
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
    const i = e?.IsVisible;
    var e = this.RefreshComponent(
      MediumItemGridReduceButtonComponent_1.MediumItemGridReduceButtonComponent,
      i,
      e,
    );
    e &&
      (i
        ? (e.BindReduceButtonCallback(this.OnClickedReduceButton),
          e.BindLongPressCallback(this.nxt))
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
    this.rxt = e;
  }
  UnBindReduceLongPress() {
    this.rxt = void 0;
  }
  SetCheckTickVisible(e) {
    const i = { IsCheckTick: e };
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
    const i = this.RefreshComponent(
      MediumItemGridEmptySlotComponent_1.MediumItemGridEmptySlotComponent,
      e,
      e,
    );
    i &&
      (e
        ? i.BindEmptySlotButtonCallback(this.OnClickedEmptySlotButton)
        : i.UnBindEmptySlotButtonCallback());
  }
  uxt(e) {
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
      void 0 !== e && e > 0,
      e,
    );
  }
  IsDisable() {
    const e = this.GetItemGridComponent(
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
      void 0 !== e && e !== "",
      e,
    );
  }
  ApplyEmptyDisplay(e) {
    const i = e.BottomTextId;
    const t = e.BottomText;
    var e = e.BottomTextParameter;
    const o =
      !StringUtils_1.StringUtils.IsEmpty(i) ||
      !StringUtils_1.StringUtils.IsEmpty(t);
    this.cxt(o), o && (this.SetBottomTextId(i, e), this.SetBottomText(t));
  }
  ApplyPropBaseDisplay(e) {
    const i = e.ItemConfigId;
    const t = e.BottomTextId;
    const o = e.BottomText;
    const m = e.BottomTextParameter;
    const n = e.SpriteIconPath;
    var d =
      ((this.Data = e.Data),
      e.IconPath
        ? ((d = this.GetTexture(1)),
          this.SetTextureByPath(e.IconPath, d),
          d?.SetUIActive(!0))
        : this.IIt(i),
      this.SetIconSprite(n),
      e.QualityId
        ? this.SetQualityIconById(
            this.GetSprite(0),
            e.QualityId,
            void 0,
            e.QualityType,
          )
        : this._xt(i),
      !StringUtils_1.StringUtils.IsEmpty(t) ||
        !StringUtils_1.StringUtils.IsEmpty(o));
    this.cxt(d),
      d && (this.SetBottomTextId(t, m), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0),
      this.uxt(!0);
  }
  ApplyPhantomBaseDisplay(e) {
    const i = e.ItemConfigId;
    const t = e.BottomTextId;
    const o = e.BottomText;
    const m = e.BottomTextParameter;
    var n = e.MonsterId;
    const d = e.QualityIconResourceId;
    var n =
      ((this.Data = e.Data),
      n ? this.dxt(n) : this.IIt(i),
      void 0 !== d
        ? this.Cxt(d)
        : e.QualityId
          ? this.SetQualityIconById(
              this.GetSprite(0),
              e.QualityId,
              void 0,
              e.QualityType,
            )
          : this._xt(i),
      !StringUtils_1.StringUtils.IsEmpty(t) ||
        !StringUtils_1.StringUtils.IsEmpty(o));
    this.cxt(n),
      n && (this.SetBottomTextId(t, m), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0),
      this.uxt(!0);
  }
  ApplyCharacterBaseDisplay(e) {
    let i = e.ItemConfigId;
    const t = e.BottomTextId;
    const o = e.BottomText;
    const m = e.BottomTextParameter;
    var e = ((this.Data = e.Data), this.GetTexture(1));
    var n =
      (i > TRIAL_ROLE_ID &&
        ((n = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i)),
        (i = n.ParentId)),
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i));
    var n = n.RoleHeadIconLarge;
    var n =
      (this.SetRoleIcon(n, e, i),
      this._xt(i),
      e?.SetUIActive(!0),
      !StringUtils_1.StringUtils.IsEmpty(t) ||
        !StringUtils_1.StringUtils.IsEmpty(o));
    this.cxt(n),
      n && (this.SetBottomTextId(t, m), this.SetBottomText(o)),
      this.SetExtendToggleEnable(!0),
      this.uxt(!0);
  }
  IIt(e) {
    const i = this.GetTexture(1);
    void 0 === e
      ? i.SetUIActive(!1)
      : (this.ext !== e && ((this.ext = e), this.SetItemIcon(i, e)),
        i.SetUIActive(!0));
  }
  dxt(e) {
    const i = this.GetTexture(1);
    void 0 === e
      ? i.SetUIActive(!1)
      : ((e =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e)),
        this.SetTextureByPath(e, i),
        i.SetUIActive(!0));
  }
  _xt(e) {
    const i = this.GetSprite(0);
    void 0 === e
      ? i.SetUIActive(!1)
      : (this.txt !== e &&
          ((this.txt = e),
          this.SetItemQualityIcon(
            i,
            e,
            void 0,
            "MediumItemGridQualitySpritePath",
          )),
        i.SetUIActive(!0));
  }
  Cxt(e) {
    const i = this.GetSprite(0);
    void 0 === e ||
    ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
    StringUtils_1.StringUtils.IsEmpty(e))
      ? i.SetUIActive(!1)
      : (this.SetSpriteByPath(e, i, !0), i.SetUIActive(!0));
  }
  cxt(e) {
    const i = this.GetText(2);
    i.IsUIActiveSelf() !== e && i.SetUIActive(e);
  }
  SetBottomTextId(e, i) {
    const t = this.GetText(2);
    StringUtils_1.StringUtils.IsEmpty(e) ||
      (i
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, e, ...i)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  SetBottomText(e) {
    const i = this.GetText(2);
    StringUtils_1.StringUtils.IsEmpty(e) || i.SetText(e);
  }
  BindReduceButtonCallback(e, i) {
    this.ixt = e;
  }
  UnBindReduceButtonCallback() {
    this.ixt = void 0;
  }
  BindEmptySlotButtonCallback(e) {
    this.oxt = e;
  }
  UnBindEmptySlotButtonCallback() {
    this.oxt = void 0;
  }
  GetItemGridExtendToggle() {
    return this.GetExtendToggle(6);
  }
  mxt(e, i) {
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
// # sourceMappingURL=MediumItemGrid.js.map
