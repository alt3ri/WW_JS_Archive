"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioFilterController = void 0);
const Log_1 = require("../Common/Log"),
  PriorityQueue_1 = require("../Container/PriorityQueue"),
  AudioSystem_1 = require("./AudioSystem");
class AudioFilterState {
  constructor(t, e) {
    (this.State = "none"),
      (this.Priority = 0),
      (this.State = t),
      (this.Priority = e ?? 0);
  }
}
AudioFilterState.Compare = (t, e) => {
  let i = e.Priority - t.Priority;
  return 0 === i && i--, i;
};
class AudioFilterController {
  static get S$_() {
    return (
      this.M$_ ||
        (this.M$_ = new Map([
          ["none", this.E$_],
          ["ui_default", new AudioFilterState("ui_default")],
        ])),
      this.M$_
    );
  }
  static set zyi(t) {
    if (this.I$_ !== t) {
      if (this.I$_.State !== t.State) {
        if (!t.State)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              42,
              "[FilterState] [SetCurrent] 传入异常的State",
              ["State", t.State],
            )
          );
        AudioSystem_1.AudioSystem.SetState("filter", t.State),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Audio", 42, "[FilterState] [SetCurrent]", [
              "State",
              t.State,
            ]);
      }
      this.I$_ = t;
    }
  }
  static get zyi() {
    return this.I$_;
  }
  static T$_() {
    this.b$_.Empty || "none" === this.b$_.Top.State
      ? this.L$_.Empty
        ? (this.zyi = AudioFilterController.E$_)
        : (this.zyi = this.L$_.Top)
      : (this.zyi = this.b$_.Top);
  }
  static PushFilterState(t, e, i = "", r = 0) {
    var o;
    return e.Empty || this.zyi.State !== t || e.Top !== this.zyi
      ? ((r = AudioFilterController.CreateFilterState(t, r)),
        (o = this._A++),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[FilterState] [Push]",
            ["uid", o],
            ["State", r],
            ["Context", i],
          ),
        e.Push(r),
        this.w$_.set(o, r),
        this.T$_(),
        o)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[FilterState] [Push] 当前状态和需要入栈状态一致，跳过push",
            ["State", t],
            ["Context", i],
          ),
        0);
  }
  static RemoveFilterState(t, e, i) {
    var r;
    t <= 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Audio", 42, "[FilterState] [Remove] uid不大于零,跳过", [
          "Context",
          i,
        ])
      : ((r = this.w$_.get(t)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[FilterState] [Remove]",
            ["uid", t],
            ["State", r],
            ["Context", i],
          ),
        r
          ? (e.Remove(r), this.w$_.delete(t), this.T$_())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              42,
              "[FilterState] [Remove] 传入异常的uid",
              ["uid", t],
            ));
  }
  static PushUiFilterState(t, e) {
    return this.PushFilterState(t, this.b$_, "[UI] " + e);
  }
  static RemoveUiFilterState(t, e) {
    this.RemoveFilterState(t, this.b$_, "[UI] " + e);
  }
  static PushSceneFilterState(t, e, i = 0) {
    return this.PushFilterState(t, this.L$_, "[Scene]" + e, i);
  }
  static RemoveSceneFilterState(t, e) {
    this.RemoveFilterState(t, this.b$_, "[Scene] " + e);
  }
  static CreateFilterState(t, e) {
    return t
      ? !e && this.S$_.has(t)
        ? this.S$_.get(t)
        : new AudioFilterState(t, e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            42,
            "[FilterState] [Create] 传入异常的State",
            ["State", t],
            ["priority", e],
          ),
        this.E$_);
  }
}
((exports.AudioFilterController = AudioFilterController)._A = 0),
  (AudioFilterController.w$_ = new Map()),
  (AudioFilterController.b$_ = new PriorityQueue_1.PriorityQueue(
    AudioFilterState.Compare,
  )),
  (AudioFilterController.L$_ = new PriorityQueue_1.PriorityQueue(
    AudioFilterState.Compare,
  )),
  (AudioFilterController.E$_ = new AudioFilterState("none")),
  (AudioFilterController.M$_ = void 0),
  (AudioFilterController.I$_ = AudioFilterController.E$_);
//# sourceMappingURL=AudioFilterController.js.map
