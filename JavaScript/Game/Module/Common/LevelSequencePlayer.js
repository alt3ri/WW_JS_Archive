"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelSequencePlayer = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const UiLayer_1 = require("../../Ui/UiLayer");
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
    (this.VPt = new Map()),
      (this.HPt = void 0),
      (this.jPt = void 0),
      (this.WPt = void 0),
      (this.KPt = void 0),
      (this.QPt = void 0),
      (this.XPt = new Map()),
      (this.jPt = e),
      (this.HPt = e.GetOwner());
  }
  BindSequenceCloseEvent(e) {
    this.WPt || (this.WPt = new Array()), this.WPt.push(e);
  }
  BindSequenceStartEvent(e) {
    this.KPt || (this.KPt = new Array()), this.KPt.push(e);
  }
  StopCurrentSequence(e = !1, t = !1) {
    this.QPt && (this.StopSequenceByKey(this.QPt, e, t), (this.QPt = void 0));
  }
  StopSequenceByKey(e, t = !1, i = !1) {
    i && this.EndSequenceLastFrame(e);
    (i = this.XPt.get(e)), i && (i.NeedFinishEvent = t), (i = this.VPt.get(e));
    i?.IsValid() ? i.TryStop() : this.vxe(e);
  }
  ReplaySequenceByKey(e) {
    let t;
    const i = this.XPt.get(e);
    i &&
      this.VPt.get(e) &&
      (t = this.HPt.GetSequencePlayerByKey(e))?.IsValid() &&
      (t = t.SequencePlayer)?.IsValid() &&
      (t.IsStopped()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "UI动画播放重播时已结束,重新调用播放逻辑",
              ["节点", this.jPt.GetDisplayName()],
              ["关卡序列", this.QPt],
            ),
          this.PlayLevelSequenceByName(e, i.IsBlock))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "UI动画播放重播时在持续,修改播放帧",
              ["节点", this.jPt.GetDisplayName()],
              ["关卡序列", this.QPt],
            ),
          this.HPt.SequenceJumpToSecondByKey(e, new UE.FrameTime())));
  }
  GetCurrentSequence() {
    return this.QPt;
  }
  PauseSequence() {
    let e;
    this.QPt &&
      ((e = this.$Pt(this.QPt))
        ? e.SequencePlayer.Pause()
        : (e = this.VPt.get(this.QPt)) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "异步加载暂停关卡序列",
              ["停止节点", this.jPt.GetDisplayName()],
              ["关卡序列", this.QPt],
            ),
          e.TryStop()));
  }
  ResumeSequence() {
    let e;
    this.QPt &&
      ((e = this.$Pt(this.QPt))
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "恢复关卡序列动画",
              ["停止节点", this.jPt.GetDisplayName()],
              ["关卡序列", this.QPt],
            ),
          e.SequencePlayer.Play())
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              11,
              "异步恢复关卡序列动画",
              ["停止节点", this.jPt.GetDisplayName()],
              ["关卡序列", this.QPt],
            ),
          this.VPt.get(this.QPt).ExecutePlay()));
  }
  Clear() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 11, "关卡序列动画 Clear", [
        "节点名称",
        this.jPt.GetDisplayName(),
      ]);
    for (const e of this.VPt.values()) e.OnStop.Unbind();
    for (const t of this.XPt.keys()) this.vxe(t);
    this.VPt.clear(),
      this.XPt.clear(),
      LevelSequencePlayer.YPt.delete(this),
      this.HPt.ClearAllSequence(),
      (this.HPt = void 0),
      (this.jPt = void 0);
  }
  EndSequenceLastFrame(e) {
    let t;
    this.HPt.GetUIItem().LevelSequences.Get(e) &&
      (t = this.$Pt(e)) &&
      this.HPt.SequenceJumpToSecondByKey(
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
    const h = this.JPt(e);
    const r = this.jPt.displayName;
    var t =
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          11,
          "播放的关卡序列",
          ["播放节点", r],
          ["关卡序列", e],
        ),
      (this.QPt = e),
      new SequenceData(e, t, r, s));
    this.XPt.set(e, t),
      LevelSequencePlayer.YPt.add(this),
      LevelSequencePlayer.zPt
        ? (this.ZPt(e), this.vxe(e))
        : h
          ? ((h.bReverse = i), h.ExecutePlay(), this.ZPt(e))
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiCore",
                11,
                "关卡序列不存在",
                ["播放节点", r],
                ["关卡序列", e],
              ),
            this.vxe(e));
  }
  JPt(e) {
    let t = this.VPt.get(e);
    if (!t) {
      if (!(t = this.HPt.GetSequencePlayContextOfKey(e))) return;
      (t.bIsAsync = !1),
        t.OnStop.Bind(() => {
          this.vxe(e);
        }),
        this.VPt.set(e, t);
    }
    return t;
  }
  ZPt(t) {
    const e = this.XPt.get(t);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiCore",
        17,
        "播放UI动画",
        ["动画名称", t],
        ["sequenceData.Tag", e?.Tag],
      ),
      e &&
        e.IsBlock &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "打开动画遮罩",
            ["播放节点", e.Tag],
            ["关卡序列", t],
          ),
        UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, !0)),
      this.KPt?.forEach((e) => {
        e(t);
      });
  }
  vxe(t) {
    const e = this.XPt.get(t);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiCore",
        17,
        "UI动画播放完成",
        ["动画名称", t],
        ["sequenceData.Tag", e?.Tag],
      );
    let i = !0;
    e &&
      (e.IsBlock &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            11,
            "关闭动画遮罩",
            ["播放节点", e.Tag],
            ["关卡序列", t],
          ),
        UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, !1)),
      (i = e.NeedFinishEvent),
      (e.NeedFinishEvent = !0),
      this.XPt.delete(t)),
      this.QPt === t && (this.QPt = void 0),
      i &&
        this.WPt?.forEach((e) => {
          e(t);
        }),
      this.XPt.size === 0 && LevelSequencePlayer.YPt.delete(this),
      e?.StopPromise &&
        (e.StopPromise?.SetResult(!0), (e.StopPromise = void 0));
  }
  $Pt(e) {
    if (this.HPt) return this.HPt.GetSequencePlayerByKey(e);
  }
  SetActorTag(e, t, i) {
    e = this.$Pt(e);
    e && e.AddBindingByTag(t, i);
  }
  SetRelativeTransform(e, t) {
    e = this.$Pt(e);
    e &&
      ((e.bOverrideInstanceData = !0),
      (e.DefaultInstanceData.TransformOrigin = t));
  }
  IsValid() {
    return this.HPt?.IsValid() ?? !1;
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
      LevelSequencePlayer.zPt = !0;
      for (const t of LevelSequencePlayer.YPt.values())
        t.IsValid()
          ? t.StopCurrentSequence(!0)
          : LevelSequencePlayer.YPt.delete(t);
    } else LevelSequencePlayer.zPt = !1;
  }
}
((exports.LevelSequencePlayer = LevelSequencePlayer).YPt = new Set()),
  (LevelSequencePlayer.zPt = !1);
// # sourceMappingURL=LevelSequencePlayer.js.map
