"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelSequencePlayer = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  UiLayer_1 = require("../../Ui/UiLayer");
class SequenceData {
  constructor(e, t, i, s = void 0) {
    (this.SequenceName = ""),
      (this.IsBlock = !1),
      (this.Tag = ""),
      (this.NeedFinishEvent = !0),
      (this.StopPromise = void 0),
      (this.SequenceName = e),
      (this.IsBlock = t),
      (this.Tag = i),
      (this.StopPromise = s);
  }
}
class LevelSequencePlayer {
  constructor(e) {
    (this.Kxt = new Map()),
      (this.Qxt = void 0),
      (this.Xxt = void 0),
      (this.$xt = void 0),
      (this.Yxt = void 0),
      (this.Jxt = void 0),
      (this.zxt = new Map()),
      (this.Xxt = e),
      (this.Qxt = e.GetOwner());
  }
  BindSequenceCloseEvent(e) {
    this.$xt || (this.$xt = new Array()), this.$xt.push(e);
  }
  BindSequenceStartEvent(e) {
    this.Yxt || (this.Yxt = new Array()), this.Yxt.push(e);
  }
  StopCurrentSequence(e = !1, t = !1) {
    this.Jxt && (this.StopSequenceByKey(this.Jxt, e, t), (this.Jxt = void 0));
  }
  StopSequenceByKey(e, t = !1, i = !1) {
    i && this.EndSequenceLastFrame(e);
    (i = this.zxt.get(e)), i && (i.NeedFinishEvent = t), (i = this.Kxt.get(e));
    i?.IsValid() ? i.TryStop() : this.vxe(e);
  }
  ReplaySequenceByKey(e) {
    var t,
      i = this.zxt.get(e);
    i &&
      this.Kxt.get(e) &&
      (t = this.Qxt.GetSequencePlayerByKey(e))?.IsValid() &&
      (t = t.SequencePlayer)?.IsValid() &&
      (t.IsStopped()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "UI动画播放重播时已结束,重新调用播放逻辑",
              ["节点", this.Xxt.GetDisplayName()],
              ["关卡序列", this.Jxt],
            ),
          this.PlayLevelSequenceByName(e, i.IsBlock))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "UI动画播放重播时在持续,修改播放帧",
              ["节点", this.Xxt.GetDisplayName()],
              ["关卡序列", this.Jxt],
            ),
          this.Qxt.SequenceJumpToSecondByKey(e, new UE.FrameTime())));
  }
  ChangePlaybackDirection(e) {
    this.zxt.get(e) &&
      this.Kxt.get(e) &&
      void 0 !== (e = this.Qxt.GetSequencePlayerByKey(e)) &&
      e.IsValid() &&
      void 0 !== (e = e.GetSequencePlayer()) &&
      e.IsValid() &&
      e.ChangePlaybackDirection();
  }
  GetCurrentSequence() {
    return this.Jxt;
  }
  PauseSequence() {
    var e;
    this.Jxt &&
      ((e = this.Zxt(this.Jxt))
        ? e.SequencePlayer.Pause()
        : (e = this.Kxt.get(this.Jxt)) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "异步加载暂停关卡序列",
              ["停止节点", this.Xxt.GetDisplayName()],
              ["关卡序列", this.Jxt],
            ),
          e.TryStop()));
  }
  ResumeSequence() {
    var e;
    this.Jxt &&
      ((e = this.Zxt(this.Jxt))
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "恢复关卡序列动画",
              ["停止节点", this.Xxt.GetDisplayName()],
              ["关卡序列", this.Jxt],
            ),
          e.SequencePlayer.Play())
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "异步恢复关卡序列动画",
              ["停止节点", this.Xxt.GetDisplayName()],
              ["关卡序列", this.Jxt],
            ),
          this.Kxt.get(this.Jxt).ExecutePlay()));
  }
  Clear() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 11, "关卡序列动画 Clear", [
        "节点名称",
        this.Xxt.GetDisplayName(),
      ]);
    for (const e of this.Kxt.values()) e.OnStop.Unbind();
    for (const t of this.zxt.keys()) this.vxe(t);
    this.Kxt.clear(),
      this.zxt.clear(),
      LevelSequencePlayer.ewt.delete(this),
      this.Qxt.ClearAllSequence(),
      (this.Qxt = void 0),
      (this.Xxt = void 0);
  }
  EndSequenceLastFrame(e) {
    var t;
    this.Qxt.GetUIItem().LevelSequences.Get(e) &&
      (t = this.Zxt(e)) &&
      this.Qxt.SequenceJumpToSecondByKey(
        e,
        t.SequencePlayer.GetDuration().Time,
      );
  }
  PlayLevelSequenceByName(e, t = !1) {
    this.PlaySequencePurely(e, t);
  }
  async PlaySequenceAsync(e, t, i = !1, s = !1) {
    this.PlaySequencePurely(e, i, s, t), await t?.Promise;
  }
  PlaySequencePurely(e, t = !1, i = !1, s = void 0) {
    var h = this.twt(e),
      o = this.Xxt.displayName,
      t =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            11,
            "播放的关卡序列",
            ["播放节点", o],
            ["关卡序列", e],
          ),
        (this.Jxt = e),
        new SequenceData(e, t, o, s));
    this.zxt.set(e, t),
      LevelSequencePlayer.ewt.add(this),
      LevelSequencePlayer.iwt
        ? (this.owt(e), this.vxe(e))
        : h
          ? ((h.bReverse = i), h.ExecutePlay(), this.owt(e))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "UiCore",
                11,
                "关卡序列不存在",
                ["播放节点", o],
                ["关卡序列", e],
              ),
            this.vxe(e));
  }
  twt(e) {
    let t = this.Kxt.get(e);
    if (!t) {
      if (!(t = this.Qxt.GetSequencePlayContextOfKey(e))) return;
      (t.bIsAsync = !1),
        t.OnStop.Bind(() => {
          this.vxe(e);
        }),
        this.Kxt.set(e, t);
    }
    return t;
  }
  owt(t) {
    var e = this.zxt.get(t);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCore",
        17,
        "播放UI动画",
        ["动画名称", t],
        ["sequenceData.Tag", e?.Tag],
      ),
      e &&
        e.IsBlock &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            11,
            "打开动画遮罩",
            ["播放节点", e.Tag],
            ["关卡序列", t],
          ),
        UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, !0)),
      this.Yxt?.forEach((e) => {
        e(t);
      });
  }
  vxe(t) {
    var e = this.zxt.get(t);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCore",
        17,
        "UI动画播放完成",
        ["动画名称", t],
        ["sequenceData.Tag", e?.Tag],
      );
    let i = !0;
    e &&
      (e.IsBlock &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            11,
            "关闭动画遮罩",
            ["播放节点", e.Tag],
            ["关卡序列", t],
          ),
        UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, !1)),
      (i = e.NeedFinishEvent),
      (e.NeedFinishEvent = !0),
      this.zxt.delete(t)),
      this.Jxt === t && (this.Jxt = void 0),
      i &&
        this.$xt?.forEach((e) => {
          e(t);
        }),
      0 === this.zxt.size && LevelSequencePlayer.ewt.delete(this),
      e?.StopPromise &&
        (e.StopPromise?.SetResult(!0), (e.StopPromise = void 0));
  }
  Zxt(e) {
    if (this.Qxt) return this.Qxt.GetSequencePlayerByKey(e);
  }
  SetActorTag(e, t, i) {
    e = this.Zxt(e);
    e && e.AddBindingByTag(t, i);
  }
  SetRelativeTransform(e, t) {
    e = this.Zxt(e);
    e &&
      ((e.bOverrideInstanceData = !0),
      (e.DefaultInstanceData.TransformOrigin = t));
  }
  IsValid() {
    return this.Qxt?.IsValid() ?? !1;
  }
  static SetBanned(e) {
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "[LevelSequencePlayer.SetBanned] 设置禁用动画",
          ["value", e],
        ),
      e)
    ) {
      LevelSequencePlayer.iwt = !0;
      for (const t of LevelSequencePlayer.ewt.values())
        t.IsValid()
          ? t.StopCurrentSequence(!0)
          : LevelSequencePlayer.ewt.delete(t);
    } else LevelSequencePlayer.iwt = !1;
  }
}
((exports.LevelSequencePlayer = LevelSequencePlayer).ewt = new Set()),
  (LevelSequencePlayer.iwt = !1);
//# sourceMappingURL=LevelSequencePlayer.js.map
