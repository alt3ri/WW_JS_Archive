"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonHeadState = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleUiDefine_1 = require("../../BattleUiDefine");
const BuffItem_1 = require("../BuffItem");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class CommonHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.Jot = new Map()),
      (this.zot = []),
      (this.Zot = []),
      (this.srt = 0),
      (this.OnAddOrRemoveBuff = (t, e, i, s) => {
        this.HeadStateData.GetEntityId() === t &&
          e.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
          (i ? this.Yrt(e, s, !0) : this.Jrt(s, !0));
      }),
      (this.OnShieldChanged = (t) => {
        this.RefreshHpAndShield(!1);
      }),
      (this.OnChangeTeam = () => {
        this.Lht();
      }),
      (this.OnLevelChanged = (t, e, i) => {
        this.Lht();
      }),
      (this.OnRoleLevelChange = (t, e, i) => {
        this.Lht();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
    ];
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t),
      this.RefreshHpAndShield(),
      this.Lht(),
      this.Dht(),
      this.Rht(),
      this.Uht(),
      this.Vrt(),
      this.Aht();
  }
  OnStart() {
    this.srt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  ResetBattleHeadState() {
    this.Wrt(), super.ResetBattleHeadState();
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  OnRefresh(t, e, i) {
    super.OnRefresh(t, e, i), this.Dht(), this.Rht(), this.Uht(), this.Pht(i);
  }
  Yrt(e, i, s = !1) {
    if (!this.Jot.has(i)) {
      let t = this.zrt();
      (t = t || this.Zrt()), this.ent(t, e, i, s);
    }
  }
  Zrt() {
    const t = this.GetItem(5);
    return new BuffItem_1.BuffItem(t);
  }
  ent(t, e, i, s = !1) {
    const h = this.Jot.size;
    const r = this.HeadStateData.GetBuff(i);
    t.Activate(e, r, s),
      t.GetRootItem().SetHierarchyIndex(h),
      this.Jot.set(i, t);
  }
  Jrt(t, e = !1) {
    const i = this.tnt(t);
    i &&
      (this.Jot.delete(t),
      (e
        ? (i.DeactivateWithCloseAnim(), this.zot)
        : (i.Deactivate(), this.Zot)
      ).push(i));
  }
  zrt() {
    let t;
    if (!(this.Zot.length < 1))
      return (t = this.Zot[0]), this.Zot.splice(0, 1), t;
  }
  tnt(t) {
    return this.Jot.get(t);
  }
  Wrt() {
    for (const t of this.Jot.values()) t.Destroy();
    this.Jot.clear();
    for (const e of this.zot) e.Deactivate(), e.Destroy();
    this.zot.length = 0;
    for (const i of this.Zot) i.Destroy();
    this.Zot.length = 0;
  }
  Vrt() {
    if ((this.Wrt(), this.HeadStateData))
      for (const e of this.HeadStateData.GetAllCurrentCueRef()) {
        const t = e.CueConfig;
        t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
          this.Yrt(t, e.ActiveHandleId);
      }
  }
  Aht() {
    let t = this.GetHpColor();
    t && ((t = UE.Color.FromHex(t)), this.GetSprite(0).SetColor(t));
  }
  Dht() {
    const t = this.IsDetailVisible();
    this.GetItem(4).SetUIActive(t);
  }
  Rht() {
    const t = this.IsLevelTextVisible();
    this.GetText(3).SetUIActive(t);
  }
  Uht() {
    const t = this.IsBuffVisible();
    this.GetItem(5).SetUIActive(t);
  }
  Pht(e) {
    if (this.IsBuffVisible()) {
      for (const t of this.Jot.values()) t.Tick(e);
      for (let t = this.zot.length - 1; t >= 0; t--) {
        const i = this.zot[t];
        i.TickHiding(e) || (this.zot.splice(t, 1), this.Zot.push(i));
      }
    }
  }
  RefreshHpAndShield(t = !1) {
    const [e, i] = this.GetHpAndShieldPercent();
    this.int(e),
      this.ont(i),
      t ? this.PlayBarAnimation(e) : this.StopBarLerpAnimation();
  }
  OnBeginBarAnimation(t) {
    this.Xrt(t);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
  }
  OnLerpBarBufferPercent(t) {
    this.Xrt(t);
  }
  int(t) {
    this.GetSprite(0).SetFillAmount(t);
  }
  Xrt(t) {
    var e = this.GetSprite(1);
    var e =
      (e.SetFillAmount(t),
      e.IsUIActiveSelf() || e.SetUIActive(!0),
      this.GetSprite(2));
    e.SetStretchLeft(this.srt * this.CurrentBarPercent - 2),
      e.SetStretchRight(this.srt * (1 - t) - 2);
  }
  ont(t) {
    const e = this.GetSprite(6);
    t > 0 ? (e.SetFillAmount(t), e.SetUIActive(!0)) : e.SetUIActive(!1);
  }
  OnHealthChanged(t) {
    this.HeadStateData.GetEntityId() === t && this.RefreshHpAndShield(!0);
  }
  Lht() {
    let t, e, i;
    this.HeadStateData &&
      ((t = this.GetLevel()),
      (e = this.GetText(3)),
      (i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(
        t,
        this.HeadStateData.Camp,
      )),
      e.SetColor(UE.Color.FromHex(i)),
      LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", t));
  }
}
exports.CommonHeadState = CommonHeadState;
// # sourceMappingURL=CommonHeadState.js.map
