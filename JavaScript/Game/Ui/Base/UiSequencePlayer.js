"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSequencePlayer = void 0);
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
class UiSequencePlayer {
  constructor(e) {
    (this.a_r = new Map()),
      (this.EPe = void 0),
      (this.WPt = void 0),
      (this.KPt = void 0),
      (this.WFt = (t) => {
        this.a_r.set(t, 2),
          this.WPt?.forEach((e) => {
            e(t);
          });
      }),
      (this.h_r = (t) => {
        this.a_r.set(t, 1),
          this.KPt?.forEach((e) => {
            e(t);
          });
      }),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
      this.EPe.BindSequenceCloseEvent(this.WFt),
      this.EPe.BindSequenceStartEvent(this.h_r);
  }
  l_r(e) {
    this.a_r.delete(e);
  }
  __r(e) {
    this.a_r.set(e, 0);
  }
  BindOnEndSequenceEvent(e) {
    this.WPt || (this.WPt = new Array()), this.WPt.push(e);
  }
  BindOnStartSequenceEvent(e) {
    this.KPt || (this.KPt = new Array()), this.KPt.push(e);
  }
  IsInSequence() {
    let t = !1;
    const i = Array.from(this.a_r.keys());
    const s = i.length;
    for (let e = 0; e < s; e++)
      if (this.a_r.get(i[e]) !== 2) {
        t = !0;
        break;
      }
    return t;
  }
  IsSequenceInPlaying(e) {
    return !!this.a_r.has(e) && this.a_r.get(e) === 1;
  }
  IsSequenceFinish(e) {
    return !this.a_r.has(e) || this.a_r.get(e) === 2;
  }
  IsStartSequenceFinish(e) {
    return !this.a_r.has(e) || this.a_r.get(e) > 0;
  }
  GetCurrentSequence() {
    return this.EPe.GetCurrentSequence();
  }
  PlaySequencePurely(e, t = !1, i = !1) {
    this.EPe.PlaySequencePurely(e, t, i);
  }
  StopPrevSequence(e, t = !1) {
    const i = this.EPe.GetCurrentSequence();
    this.EPe.StopCurrentSequence(e, t), this.l_r(i);
  }
  StopCurrentSequenceByName(e, t, i = !1) {
    const s = this.EPe.GetCurrentSequence();
    s === e && (this.EPe.StopCurrentSequence(t, i), this.l_r(s));
  }
  PlaySequence(e, t = !1) {
    this.u_r(), this.__r(e), this.EPe.PlayLevelSequenceByName(e, t);
  }
  async PlaySequenceAsync(e, t, i = !1, s = !1) {
    this.u_r(), this.__r(e), await this.EPe.PlaySequenceAsync(e, t, i, s);
  }
  ReplaySequence(e) {
    this.EPe.ReplaySequenceByKey(e);
  }
  u_r() {
    let e;
    this.IsInSequence() && ((e = Array.from(this.a_r.keys())[0]), this.l_r(e));
  }
  StopSequenceByKey(e, t = !1, i = !1) {
    this.EPe.StopSequenceByKey(e, t, i);
  }
  SequencePlayReverseByKey(e, t) {
    this.EPe.PlaySequencePurely(e, t, !0);
  }
  PauseSequence() {
    this.EPe.PauseSequence();
  }
  ResumeSequence() {
    this.EPe.ResumeSequence();
  }
  SetActorTag(e, t, i) {
    this.EPe.SetActorTag(e, t, i);
  }
  SetRelativeTransform(e, t) {
    this.EPe.SetRelativeTransform(e, t);
  }
  Clear() {
    this.EPe.Clear(), (this.EPe = void 0);
  }
}
exports.UiSequencePlayer = UiSequencePlayer;
// # sourceMappingURL=UiSequencePlayer.js.map
