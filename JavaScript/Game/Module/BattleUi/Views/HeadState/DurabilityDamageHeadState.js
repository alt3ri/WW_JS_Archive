"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurabilityDamageHeadState = void 0);
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class DurabilityDamageHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.xht = -0),
      (this.wht = !1),
      (this.EPe = void 0),
      (this.Bht = (t) => {
        this.bht(this.qht(), !0);
      }),
      (this.Ght = () => {
        const t = this.GetUiNiagara(5);
        this.wht &&
          t &&
          !t.NiagaraComponent?.IsActive() &&
          (t.SetNiagaraUIActive(!0, !0), t.ActivateSystem(!0));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UINiagara],
      [6, UE.UINiagara],
    ];
  }
  GetResourceId() {
    return "UiItem_BarSandBag";
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t),
      this.GetSprite(0).SetUIActive(!0),
      this.GetSprite(1).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      this.GetSprite(4).SetUIActive(!1),
      this.GetUiNiagara(5).SetNiagaraUIActive(!1, !0),
      this.GetUiNiagara(6).SetNiagaraUIActive(!1, !0),
      (this.wht = !1),
      (this.xht = this.GetSprite(2).GetParentAsUIItem().GetWidth()),
      t.OriginalHp
        ? ((this.CurrentBarPercent = t.OriginalHp / this.GetMaxHp()),
          this.Nht(this.CurrentBarPercent))
        : this.Nht(1),
      this.bht(this.qht(), !0);
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  BindCallback() {
    super.BindCallback(),
      this.HeadStateData.BindOnSceneItemDurabilityChange(this.Bht),
      this.HeadStateData.BindOnSceneItemEntityHit(this.Ght);
  }
  bht(t, e = !1) {
    let i;
    t <= 0
      ? ((i = this.CurrentBarPercent > 0), this.Nht(t), this.Oht(i))
      : e
        ? (this.kht(t),
          this.PlayBarAnimation(t),
          this.EPe?.StopCurrentSequence(!0, !0),
          this.EPe?.PlayLevelSequenceByName("Increase"))
        : this.Nht(t),
      this.HeadStateData?.SetOriginalHp(this.GetHp());
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation(),
      this.GetSprite(1).SetUIActive(!1),
      this.EPe?.StopSequenceByKey("Increase", !0, !0);
  }
  OnLerpBarBufferPercent(t) {
    this.Fht(t);
  }
  Nht(t) {
    this.kht(t), this.Fht(t), this.StopBarLerpAnimation();
  }
  kht(t) {
    const e = 1 - t;
    const i = this.GetSprite(1);
    const s = this.GetSprite(2);
    i.SetFillAmount(e),
      s.SetStretchRight(this.xht * t - 2),
      i.IsUIActiveSelf() || i.SetUIActive(!0);
  }
  Fht(t) {
    var t = 1 - t;
    const e = this.GetSprite(1);
    const i = this.GetSprite(2);
    const s = this.GetSprite(3);
    i.SetStretchLeft(this.xht * t - 2),
      s.SetFillAmount(t),
      e.IsUIActiveSelf() || e.SetUIActive(!0),
      s.IsUIActiveSelf() || s.SetUIActive(!0);
  }
  Oht(t) {
    this.HeadStateType === 7
      ? (t && this.GetUiNiagara(6).SetNiagaraUIActive(!0, !0),
        this.GetSprite(0).SetUIActive(!1),
        this.GetSprite(3).SetUIActive(!1),
        this.GetSprite(1).SetUIActive(!1),
        this.GetSprite(4).SetUIActive(!1))
      : this.HeadStateType === 8 &&
        ((t = this.GetSprite(4)).IsUIActiveSelf() || t.SetUIActive(!0),
        (this.wht = !0));
  }
  qht() {
    return this.GetHp() / this.GetMaxHp();
  }
  GetMaxHp() {
    return this.HeadStateData.GetMaxDurable();
  }
  GetHp() {
    return this.HeadStateData.GetDurable();
  }
}
exports.DurabilityDamageHeadState = DurabilityDamageHeadState;
// # sourceMappingURL=DurabilityDamageHeadState.js.map
