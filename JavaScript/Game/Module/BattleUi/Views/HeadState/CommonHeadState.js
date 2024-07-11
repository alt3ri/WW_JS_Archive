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
      (this.okn = new BuffItemContainer_1.BuffItemContainer()),
      (this.pnt = 0),
      (this.OnAddOrRemoveBuff = (t, e, i, s) => {
        this.HeadStateData.GetEntityId() === t &&
          (i
            ? this.okn.AddBuffByCue(e, s, !0)
            : this.okn.RemoveBuffByCue(e, s, !0));
      }),
      (this.OnShieldChanged = (t) => {
        this.RefreshHpAndShield(!1);
      }),
      (this.OnChangeTeam = () => {
        this.Olt();
      }),
      (this.OnLevelChanged = (t, e, i) => {
        this.Olt();
      }),
      (this.OnRoleLevelChange = (t, e, i) => {
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
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t),
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
      this.okn.Init(this.GetItem(5));
  }
  ResetBattleHeadState() {
    this.okn.ClearAll(), super.ResetBattleHeadState();
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  OnRefresh(t, e, i) {
    super.OnRefresh(t, e, i), this.klt(), this.Flt(), this.Vlt(), this.jlt(i);
  }
  tst() {
    var t;
    this.HeadStateData
      ? ((t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(
          this.HeadStateData.GetEntityId(),
        )),
        this.okn.RefreshBuff(t))
      : this.okn.ClearAll();
  }
  Hlt() {
    var t = this.GetHpColor();
    t && ((t = UE.Color.FromHex(t)), this.GetSprite(0).SetColor(t));
  }
  klt() {
    var t = this.IsDetailVisible();
    this.GetItem(4).SetUIActive(t);
  }
  Flt() {
    var t = this.IsLevelTextVisible();
    this.GetText(3).SetUIActive(t);
  }
  Vlt() {
    var t = this.IsBuffVisible();
    this.GetItem(5).SetUIActive(t);
  }
  jlt(t) {
    this.IsBuffVisible() && this.okn.Tick(t);
  }
  RefreshHpAndShield(t = !1) {
    var [e, i] = this.GetHpAndShieldPercent();
    this.Cst(e),
      this.gst(i),
      t ? this.PlayBarAnimation(e) : this.StopBarLerpAnimation();
  }
  OnBeginBarAnimation(t) {
    this.ast(t);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
  }
  OnLerpBarBufferPercent(t) {
    this.ast(t);
  }
  Cst(t) {
    this.GetSprite(0).SetFillAmount(t);
  }
  ast(t) {
    var e = this.GetSprite(1),
      e =
        (e.SetFillAmount(t),
        e.IsUIActiveSelf() || e.SetUIActive(!0),
        this.GetSprite(2));
    e.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2),
      e.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  gst(t) {
    var e = this.GetSprite(6);
    0 < t ? (e.SetFillAmount(t), e.SetUIActive(!0)) : e.SetUIActive(!1);
  }
  OnHealthChanged(t) {
    this.HeadStateData.GetEntityId() === t && this.RefreshHpAndShield(!0);
  }
  Olt() {
    var t, e, i;
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
//# sourceMappingURL=CommonHeadState.js.map
