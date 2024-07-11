"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorLevelSequence = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  UiSequencePlayer_1 = require("./UiSequencePlayer");
class UiBehaviorLevelSequence {
  constructor(e) {
    (this.rcr = void 0),
      (this.ncr = "Start"),
      (this.scr = "Close"),
      (this.i0a = "ShowView"),
      (this.r0a = "HideView"),
      (this.acr = new Map()),
      (this.hcr = new Map()),
      (this.lcr = ""),
      (this.OQt = void 0),
      (this.owt = (e) => {
        var t = this.hcr?.get(e);
        if (t) for (const i of t) i?.(e);
      }),
      (this._cr = (e) => {
        var t = this.acr?.get(e);
        if (t) for (const i of t) i?.(e);
      }),
      (this.OQt = e);
  }
  get StartSequenceName() {
    return this.ncr;
  }
  set StartSequenceName(e) {
    this.ncr = e;
  }
  set CloseSequenceName(e) {
    this.scr = e;
  }
  get CloseSequenceName() {
    return this.scr;
  }
  get ShowSequenceName() {
    return this.i0a;
  }
  set ShowSequenceName(e) {
    this.i0a = e;
  }
  get HideSequenceName() {
    return this.r0a;
  }
  set HideSequenceName(e) {
    this.r0a = e;
  }
  OnAfterUiStart() {
    (this.rcr = new UiSequencePlayer_1.UiSequencePlayer(
      this.OQt.GetRootItem(),
    )),
      this.rcr.BindOnStartSequenceEvent(this.owt),
      this.rcr.BindOnEndSequenceEvent(this._cr);
  }
  IsInSequence() {
    return this.rcr.IsInSequence();
  }
  HasSequenceNameInPlaying(e) {
    return this.rcr?.IsSequenceInPlaying(e) ?? !1;
  }
  SetSequenceName(e) {
    e &&
      ((this.ncr = e.StartSequenceName ?? "Start"),
      (this.scr = e.CloseSequenceName ?? "Close"));
  }
  AddSequenceFinishEvent(e, t, i = !1) {
    let s = this.acr.get(e);
    s ? i && s.clear() : ((s = new Set()), this.acr.set(e, s)),
      s.has(t)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiCore", 3, "SequenceFinishEvent重复添加。")
        : s.add(t);
  }
  RemoveSequenceFinishEvent(e, t) {
    this.acr && t && (e = this.acr.get(e)) && e.has(t) && e.delete(t);
  }
  AddSequenceStartEvent(e, t) {
    let i = this.hcr.get(e);
    i || ((i = new Set()), this.hcr.set(e, i)),
      i.has(t)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiCore", 28, "AddSequenceStartEvent重复添加。")
        : i.add(t);
  }
  StopSequenceByKey(e, t = !1, i = !1) {
    this.rcr.StopSequenceByKey(e, t, i);
  }
  SequencePlayReverseByKey(e, t) {
    this.rcr.PlaySequencePurely(e, t, !0);
  }
  PlaySequence(e, t = !1) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 28, "开始PlaySequence", ["Name", e]),
      (this.lcr = e),
      this.rcr.PlaySequence(e, t);
  }
  get CurrentSequenceName() {
    return this.lcr;
  }
  async PlaySequenceAsync(e, t, i = !1, s = !1) {
    (this.lcr = e), await this.rcr?.PlaySequenceAsync(e, t, i, s);
  }
  PlaySequencePurely(e, t = !1, i = !1) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 28, "开始PurePlaySequence", ["Name", e]),
      (this.lcr = e),
      this.rcr?.PlaySequencePurely(e, t, i);
  }
  PauseSequence() {
    this.rcr.PauseSequence();
  }
  ResumeSequence() {
    this.rcr.ResumeSequence();
  }
  StopPrevSequence(e, t = !1) {
    this.IsInSequence() && this.rcr.StopCurrentSequenceByName(this.lcr, e, t);
  }
  ReplaySequence(e) {
    this.IsInSequence() && this.rcr.ReplaySequence(e);
  }
  ChangePlaybackDirection(e) {
    this.HasSequenceNameInPlaying(e) && this.rcr.ChangePlaybackDirection(e);
  }
  SetActorTag(e, t, i) {
    this.rcr.SetActorTag(e, t, i);
  }
  SetRelativeTransform(e, t) {
    this.rcr.SetRelativeTransform(e, t);
  }
  OnBeforeDestroy() {
    this.rcr && (this.rcr.Clear(), (this.rcr = void 0)),
      this.acr.clear(),
      this.hcr.clear();
  }
}
exports.UiBehaviorLevelSequence = UiBehaviorLevelSequence;
//# sourceMappingURL=UiViewSequence.js.map
