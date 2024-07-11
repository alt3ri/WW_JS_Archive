"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSequencePlayer = void 0);
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
class UiSequencePlayer {
  constructor(e) {
    (this.rur = new Map()),
      (this.SPe = void 0),
      (this.$xt = void 0),
      (this.Yxt = void 0),
      (this.K3t = (t) => {
        this.rur.set(t, 2),
          this.$xt?.forEach((e) => {
            e(t);
          });
      }),
      (this.nur = (t) => {
        this.rur.set(t, 1),
          this.Yxt?.forEach((e) => {
            e(t);
          });
      }),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
      this.SPe.BindSequenceCloseEvent(this.K3t),
      this.SPe.BindSequenceStartEvent(this.nur);
  }
  sur(e) {
    this.rur.delete(e);
  }
  aur(e) {
    this.rur.set(e, 0);
  }
  BindOnEndSequenceEvent(e) {
    this.$xt || (this.$xt = new Array()), this.$xt.push(e);
  }
  BindOnStartSequenceEvent(e) {
    this.Yxt || (this.Yxt = new Array()), this.Yxt.push(e);
  }
  IsInSequence() {
    let t = !1;
    var i = Array.from(this.rur.keys()),
      s = i.length;
    for (let e = 0; e < s; e++)
      if (2 !== this.rur.get(i[e])) {
        t = !0;
        break;
      }
    return t;
  }
  IsSequenceInPlaying(e) {
    return !!this.rur.has(e) && 1 === this.rur.get(e);
  }
  IsSequenceFinish(e) {
    return !this.rur.has(e) || 2 === this.rur.get(e);
  }
  IsStartSequenceFinish(e) {
    return !this.rur.has(e) || 0 < this.rur.get(e);
  }
  GetCurrentSequence() {
    return this.SPe.GetCurrentSequence();
  }
  PlaySequencePurely(e, t = !1, i = !1) {
    this.SPe.PlaySequencePurely(e, t, i);
  }
  StopPrevSequence(e, t = !1) {
    var i = this.SPe.GetCurrentSequence();
    this.SPe.StopCurrentSequence(e, t), this.sur(i);
  }
  StopCurrentSequenceByName(e, t, i = !1) {
    var s = this.SPe.GetCurrentSequence();
    s === e && (this.SPe.StopCurrentSequence(t, i), this.sur(s));
  }
  PlaySequence(e, t = !1) {
    this.hur(), this.aur(e), this.SPe.PlayLevelSequenceByName(e, t);
  }
  async PlaySequenceAsync(e, t, i = !1, s = !1) {
    this.hur(), this.aur(e), await this.SPe.PlaySequenceAsync(e, t, i, s);
  }
  ReplaySequence(e) {
    this.SPe.ReplaySequenceByKey(e);
  }
  hur() {
    var e;
    this.IsInSequence() && ((e = Array.from(this.rur.keys())[0]), this.sur(e));
  }
  StopSequenceByKey(e, t = !1, i = !1) {
    this.SPe.StopSequenceByKey(e, t, i);
  }
  SequencePlayReverseByKey(e, t) {
    this.SPe.PlaySequencePurely(e, t, !0);
  }
  PauseSequence() {
    this.SPe.PauseSequence();
  }
  ResumeSequence() {
    this.SPe.ResumeSequence();
  }
  ChangePlaybackDirection(e) {
    this.SPe.ChangePlaybackDirection(e);
  }
  SetActorTag(e, t, i) {
    this.SPe.SetActorTag(e, t, i);
  }
  SetRelativeTransform(e, t) {
    this.SPe.SetRelativeTransform(e, t);
  }
  Clear() {
    this.SPe.Clear(), (this.SPe = void 0);
  }
}
exports.UiSequencePlayer = UiSequencePlayer;
//# sourceMappingURL=UiSequencePlayer.js.map
