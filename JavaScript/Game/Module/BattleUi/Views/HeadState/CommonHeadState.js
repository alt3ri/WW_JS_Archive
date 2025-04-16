"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonHeadState = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BuffItemContainer_1 = require("../BuffItemContainer"),
  HeadStateViewBase_1 = require("./HeadStateViewBase");
class CommonHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.mkn = new BuffItemContainer_1.BuffItemContainer()),
      (this.pnt = 0),
      (this.OnAddOrRemoveBuff = (e, t, i, s) => {
        this.HeadStateData.GetEntityId() === e &&
          (i
            ? this.mkn.AddBuffByCue(t, s, !0)
            : this.mkn.RemoveBuffByCue(t, s, !0));
      }),
      (this.OnShieldChanged = (e) => {
        this.RefreshHpAndShield(!1);
      }),
      (this.OnChangeTeam = () => {
        this.Olt();
      }),
      (this.OnLevelChanged = (e, t, i) => {
        this.Olt();
      }),
      (this.OnRoleLevelChange = (e, t, i) => {
        this.Olt();
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
  ActiveBattleHeadState(e) {
    super.ActiveBattleHeadState(e),
      this.RefreshHpAndShield(),
      this.Olt(),
      this.klt(),
      this.Flt(),
      this.Vlt(),
      this.tst(),
      this.Hlt();
  }
  OnStart() {
    (this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth()),
      this.mkn.Init(this.GetItem(5), void 0, !0);
  }
  ResetBattleHeadState() {
    this.mkn.ClearAll(), super.ResetBattleHeadState();
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  OnRefresh(e, t, i) {
    super.OnRefresh(e, t, i), this.klt(), this.Flt(), this.Vlt(), this.jlt(i);
  }
  tst() {
    var e;
    this.HeadStateData
      ? ((e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(
          this.HeadStateData.GetEntityId(),
        )),
        this.mkn.RefreshBuff(e))
      : this.mkn.ClearAll();
  }
  Hlt() {
    var e = this.GetHpColor();
    e && ((e = UE.Color.FromHex(e)), this.GetSprite(0)?.SetColor(e));
  }
  klt() {
    var e = this.IsDetailVisible();
    this.GetItem(4).SetUIActive(e);
  }
  Flt() {
    var e = this.IsLevelTextVisible();
    this.GetText(3).SetUIActive(e);
  }
  Vlt() {
    var e = this.IsBuffVisible();
    this.GetItem(5).SetUIActive(e);
  }
  jlt(e) {
    this.IsBuffVisible() && this.mkn.Tick(e);
  }
  RefreshHpAndShield(e = !1) {
    var [t, i] = this.GetHpAndShieldPercent();
    this.Cst(t),
      this.gst(i),
      e ? this.PlayBarAnimation(t) : this.StopBarLerpAnimation();
  }
  OnBeginBarAnimation(e) {
    this.ast(e);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
  }
  OnLerpBarBufferPercent(e) {
    this.ast(e);
  }
  Cst(e) {
    this.GetSprite(0).SetFillAmount(e);
  }
  ast(e) {
    var t = this.GetSprite(1),
      t =
        (t.SetFillAmount(e),
        t.IsUIActiveSelf() || t.SetUIActive(!0),
        this.GetSprite(2));
    t.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2),
      t.SetStretchRight(this.pnt * (1 - e) - 2);
  }
  gst(e) {
    var t = this.GetSprite(6);
    0 < e ? (t.SetFillAmount(e), t.SetUIActive(!0)) : t.SetUIActive(!1);
  }
  OnHealthChanged() {
    this.RefreshHpAndShield(!0);
  }
  Olt() {
    var e, t, i;
    this.HeadStateData &&
      ((e = this.GetLevel()),
      (t = this.GetText(3)),
      (i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(
        e,
        this.HeadStateData.Camp,
      )),
      t.SetColor(UE.Color.FromHex(i)),
      LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e));
  }
  RefreshOnCampChanged() {
    this.Olt(), this.Hlt();
  }
}
exports.CommonHeadState = CommonHeadState;
//# sourceMappingURL=CommonHeadState.js.map
