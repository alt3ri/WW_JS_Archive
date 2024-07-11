"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorLevelSequence = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  UiSequencePlayer_1 = require("./UiSequencePlayer");
class UiBehaviorLevelSequence {
  constructor(e) {
    (this.aur = void 0),
      (this.hur = "Start"),
      (this.lur = "Close"),
      (this._ur = new Map()),
      (this.uur = new Map()),
      (this.cur = ""),
      (this.OKt = void 0),
      (this.ZPt = (e) => {
        var t = this.uur?.get(e);
        if (t) for (const i of t) i?.(e);
      }),
      (this.mur = (e) => {
        var t = this._ur?.get(e);
        if (t) for (const i of t) i?.(e);
      }),
      (this.OKt = e);
  }
  get StartSequenceName() {
    return this.hur;
  }
  set CloseSequenceName(e) {
    this.lur = e;
  }
  get CloseSequenceName() {
    return this.lur;
  }
  OnAfterUiStart() {
    (this.aur = new UiSequencePlayer_1.UiSequencePlayer(
      this.OKt.GetRootItem(),
    )),
      this.aur.BindOnStartSequenceEvent(this.ZPt),
      this.aur.BindOnEndSequenceEvent(this.mur);
  }
  IsInSequence() {
    return this.aur.IsInSequence();
  }
  HasSequenceNameInPlaying(e) {
    return this.aur?.IsSequenceInPlaying(e) ?? !1;
  }
  SetSequenceName(e) {
    e &&
      ((this.hur = e.StartSequenceName ?? "Start"),
      (this.lur = e.CloseSequenceName ?? "Close"));
  }
  AddSequenceFinishEvent(e, t, i = !1) {
    let s = this._ur.get(e);
    s ? i && s.clear() : ((s = new Set()), this._ur.set(e, s)),
      s.has(t)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiCore", 3, "SequenceFinishEvent重复添加。")
        : s.add(t);
  }
  RemoveSequenceFinishEvent(e, t) {
    this._ur && t && (e = this._ur.get(e)) && e.has(t) && e.delete(t);
  }
  AddSequenceStartEvent(e, t) {
    let i = this.uur.get(e);
    i || ((i = new Set()), this.uur.set(e, i)),
      i.has(t)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiCore", 28, "AddSequenceStartEvent重复添加。")
        : i.add(t);
  }
  StopSequenceByKey(e, t = !1, i = !1) {
    this.aur.StopSequenceByKey(e, t, i);
  }
  SequencePlayReverseByKey(e, t) {
    this.aur.PlaySequencePurely(e, t, !0);
  }
  PlaySequence(e, t = !1) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 28, "开始PlaySequence", ["Name", e]),
      (this.cur = e),
      this.aur.PlaySequence(e, t);
  }
  get CurrentSequenceName() {
    return this.cur;
  }
  async PlaySequenceAsync(e, t, i = !1, s = !1) {
    (this.cur = e), await this.aur?.PlaySequenceAsync(e, t, i, s);
  }
  PlaySequencePurely(e, t = !1, i = !1) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 28, "开始PurePlaySequence", ["Name", e]),
      (this.cur = e),
      this.aur?.PlaySequencePurely(e, t, i);
  }
  PauseSequence() {
    this.aur.PauseSequence();
  }
  ResumeSequence() {
    this.aur.ResumeSequence();
  }
  StopPrevSequence(e, t = !1) {
    this.IsInSequence() && this.aur.StopCurrentSequenceByName(this.cur, e, t);
  }
  ReplaySequence(e) {
    this.IsInSequence() && this.aur.ReplaySequence(e);
  }
  SetActorTag(e, t, i) {
    this.aur.SetActorTag(e, t, i);
  }
  SetRelativeTransform(e, t) {
    this.aur.SetRelativeTransform(e, t);
  }
  OnBeforeDestroy() {
    this.aur && (this.aur.Clear(), (this.aur = void 0)),
      this._ur.clear(),
      this.uur.clear();
  }
}
exports.UiBehaviorLevelSequence = UiBehaviorLevelSequence;
//# sourceMappingURL=UiViewSequence.js.map
