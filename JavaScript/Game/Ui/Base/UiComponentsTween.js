"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiComponentsTween = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log");
class UiComponentsTween {
  constructor(t) {
    (this.B_r = void 0), (this.b_r = void 0), (this.xTt = t);
  }
  q_r(t = !1) {
    var e = this.B_r.Time,
      s = this.B_r.TargetAlpha,
      i = t ? s : 1,
      o = t ? 1 : s;
    for (const r of this.b_r) r.PlayUIItemAlphaTween(i, o, e);
    var s = this.B_r.TargetSize,
      n = t ? s : 1,
      h = t ? 1 : s;
    for (const a of this.b_r) a.PlayUIItemScaleTween(n, h, e);
  }
  CollectUnSafeItem() {
    if (!this.b_r) {
      let s = !(this.b_r = []);
      var i = this.xTt.GetAttachUIChildren();
      for (let t = 0, e = i.Num(); t < e; ++t) {
        var o = i.Get(t);
        if (!s)
          if (o.GetOwner().GetComponentByClass(UE.UISafeZone.StaticClass())) {
            s = !0;
            continue;
          }
        this.b_r.push(o);
      }
      s || ((this.b_r.length = 0), this.b_r.push(this.xTt));
    }
  }
  SetUiComponentsTweenData(t) {
    t &&
      (this.B_r = new UiComponentsTweenData(
        t.GetTweenAlpha(),
        t.GetTweenSize(),
        t.GetTweenTime(),
      ));
  }
  PlayStartTween() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 11, "关卡序列:播放界面间的Tween"),
      this.CollectUnSafeItem(),
      this.q_r();
  }
  PlayCloseTween() {
    this.q_r(!0);
  }
  Destroy() {
    (this.B_r = void 0), (this.xTt = void 0), (this.b_r = []);
  }
}
exports.UiComponentsTween = UiComponentsTween;
class UiComponentsTweenData {
  constructor(t, e, s) {
    (this.TargetAlpha = t), (this.TargetSize = e), (this.Time = s);
  }
}
//# sourceMappingURL=UiComponentsTween.js.map
