"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimUnit = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 200,
  MAX_BYTE = 255;
class AimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Tti = 0),
      (this.Lti = !1),
      (this.Dti = void 0),
      (this.Rti = !1),
      (this.SPe = void 0),
      (this.Uti = void 0);
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
    (this.Dti = [
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
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), (this.SPe = void 0), this.Ati();
  }
  SetTargetVisible(t, i) {
    (this.Lti = t),
      this.Ati(),
      i || t || !this.GetActive() || 0 === this.Tti
        ? (t && (this.SPe.StopCurrentSequence(), this.GetItem(0).SetAlpha(1)),
          this.SetVisible(t))
        : this.SetAimStatus(0);
  }
  GetTargetVisible() {
    return this.Lti;
  }
  SetAimStatus(t) {
    if (this.Tti !== t) {
      switch (t) {
        case 0:
          this.Pti();
          break;
        case 1:
          this.xti();
          break;
        case 2:
          this.wti();
          break;
        case 3:
          this.Bti();
      }
      this.Tti = t;
    }
  }
  xti() {
    this.bti(!1),
      this.qti(!1),
      3 === this.Tti
        ? this.Gti("Change", !0)
        : 0 === this.Tti && this.Gti("Start1");
  }
  wti() {
    this.bti(!0),
      this.qti(!1),
      3 === this.Tti
        ? this.Gti("Change", !0)
        : 0 === this.Tti && this.Gti("Start1");
  }
  Bti() {
    this.bti(!0),
      this.qti(!0),
      2 === this.Tti || 1 === this.Tti
        ? this.Gti("Change")
        : 0 === this.Tti && this.Gti("Start2");
  }
  Pti() {
    this.Gti("close"), this.Nti();
  }
  Gti(t, i = !1) {
    this.Ati(),
      this.SPe.StopCurrentSequence(),
      this.SPe.PlaySequencePurely(t, !1, i);
  }
  SetActive(t) {
    (t && !this.Lti) || super.SetActive(t);
  }
  Nti() {
    this.Uti = TimerSystem_1.TimerSystem.Delay(() => {
      this.SetActive(!1), (this.Uti = void 0);
    }, CLOSE_ANIM_TIME);
  }
  Ati() {
    this.Uti &&
      (TimerSystem_1.TimerSystem.Remove(this.Uti), (this.Uti = void 0));
  }
  bti(t) {
    if (void 0 === this.Rti || this.Rti !== t) {
      this.Rti = t;
      var i = this.Rti ? AimUnit.Oti : AimUnit.kti;
      for (const s of this.Dti) s.SetColor(i);
    }
  }
  qti(t) {
    this.GetSprite(6).SetAlpha(t ? 0 : 1),
      this.GetSprite(7).SetAlpha(t ? 0 : 1),
      this.GetSprite(8).SetAlpha(t ? 1 : 0),
      this.GetSprite(9).SetAlpha(t ? 1 : 0);
  }
}
((exports.AimUnit = AimUnit).kti = new UE.Color(
  MAX_BYTE,
  MAX_BYTE,
  MAX_BYTE,
  MAX_BYTE,
)),
  (AimUnit.Oti = new UE.Color(MAX_BYTE, 0, 0, MAX_BYTE));
//# sourceMappingURL=ArmUnit.js.map
