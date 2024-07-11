"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimUnit = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 200;
const MAX_BYTE = 255;
class AimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Tei = 0),
      (this.Lei = !1),
      (this.Dei = void 0),
      (this.Rei = !1),
      (this.EPe = void 0),
      (this.Uei = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UISprite],
    ];
  }
  OnStart() {
    (this.Dei = [
      this.GetSprite(1),
      this.GetSprite(2),
      this.GetSprite(3),
      this.GetSprite(4),
      this.GetSprite(5),
      this.GetSprite(6),
      this.GetSprite(7),
      this.GetSprite(8),
      this.GetSprite(9),
      this.GetSprite(10),
      this.GetSprite(11),
    ]),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    this.EPe?.Clear(), (this.EPe = void 0), this.Aei();
  }
  SetTargetVisible(t, i) {
    (this.Lei = t),
      this.Aei(),
      i || t || !this.GetActive() || this.Tei === 0
        ? (t && (this.EPe.StopCurrentSequence(), this.GetItem(0).SetAlpha(1)),
          this.SetVisible(t))
        : this.SetAimStatus(0);
  }
  GetTargetVisible() {
    return this.Lei;
  }
  SetAimStatus(t) {
    if (this.Tei !== t) {
      switch (t) {
        case 0:
          this.Pei();
          break;
        case 1:
          this.xei();
          break;
        case 2:
          this.wei();
          break;
        case 3:
          this.Bei();
      }
      this.Tei = t;
    }
  }
  xei() {
    this.bei(!1),
      this.qei(!1),
      this.Tei === 3
        ? this.Gei("Change", !0)
        : this.Tei === 0 && this.Gei("Start1");
  }
  wei() {
    this.bei(!0),
      this.qei(!1),
      this.Tei === 3
        ? this.Gei("Change", !0)
        : this.Tei === 0 && this.Gei("Start1");
  }
  Bei() {
    this.bei(!0),
      this.qei(!0),
      this.Tei === 2 || this.Tei === 1
        ? this.Gei("Change")
        : this.Tei === 0 && this.Gei("Start2");
  }
  Pei() {
    this.Gei("close"), this.Nei();
  }
  Gei(t, i = !1) {
    this.Aei(),
      this.EPe.StopCurrentSequence(),
      this.EPe.PlaySequencePurely(t, !1, i);
  }
  SetActive(t) {
    (t && !this.Lei) || super.SetActive(t);
  }
  Nei() {
    this.Uei = TimerSystem_1.TimerSystem.Delay(() => {
      this.SetActive(!1), (this.Uei = void 0);
    }, CLOSE_ANIM_TIME);
  }
  Aei() {
    this.Uei &&
      (TimerSystem_1.TimerSystem.Remove(this.Uei), (this.Uei = void 0));
  }
  bei(t) {
    if (void 0 === this.Rei || this.Rei !== t) {
      this.Rei = t;
      const i = this.Rei ? AimUnit.Oei : AimUnit.kei;
      for (const s of this.Dei) s.SetColor(i);
    }
  }
  qei(t) {
    this.GetSprite(6).SetAlpha(t ? 0 : 1),
      this.GetSprite(7).SetAlpha(t ? 0 : 1),
      this.GetSprite(8).SetAlpha(t ? 1 : 0),
      this.GetSprite(9).SetAlpha(t ? 1 : 0);
  }
}
((exports.AimUnit = AimUnit).kei = new UE.Color(
  MAX_BYTE,
  MAX_BYTE,
  MAX_BYTE,
  MAX_BYTE,
)),
  (AimUnit.Oei = new UE.Color(MAX_BYTE, 0, 0, MAX_BYTE));
// # sourceMappingURL=ArmUnit.js.map
