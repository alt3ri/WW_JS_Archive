"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiComponentsTween = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log");
class UiComponentsTween {
  constructor(t) {
    (this.G1r = void 0), (this.N1r = void 0), (this.DIt = t);
  }
  O1r(t = !1) {
    var e = this.G1r.Time,
      s = this.G1r.TargetAlpha,
      i = t ? s : 1,
      o = t ? 1 : s;
    for (const r of this.N1r) r.PlayUIItemAlphaTween(i, o, e);
    var s = this.G1r.TargetSize,
      n = t ? s : 1,
      h = t ? 1 : s;
    for (const a of this.N1r) a.PlayUIItemScaleTween(n, h, e);
  }
  CollectUnSafeItem() {
    if (!this.N1r) {
      let s = !(this.N1r = []);
      var i = this.DIt.GetAttachUIChildren();
      for (let t = 0, e = i.Num(); t < e; ++t) {
        var o = i.Get(t);
        if (!s)
          if (o.GetOwner().GetComponentByClass(UE.UISafeZone.StaticClass())) {
            s = !0;
            continue;
          }
        this.N1r.push(o);
      }
      s || ((this.N1r.length = 0), this.N1r.push(this.DIt));
    }
  }
  SetUiComponentsTweenData(t) {
    t &&
      (this.G1r = new UiComponentsTweenData(
        t.GetTweenAlpha(),
        t.GetTweenSize(),
        t.GetTweenTime(),
      ));
  }
  PlayStartTween() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("UiCore", 11, "关卡序列:播放界面间的Tween"),
      this.CollectUnSafeItem(),
      this.O1r();
  }
  PlayCloseTween() {
    this.O1r(!0);
  }
  Destroy() {
    (this.G1r = void 0), (this.DIt = void 0), (this.N1r = []);
  }
}
exports.UiComponentsTween = UiComponentsTween;
class UiComponentsTweenData {
  constructor(t, e, s) {
    (this.TargetAlpha = t), (this.TargetSize = e), (this.Time = s);
  }
}
//# sourceMappingURL=UiComponentsTween.js.map
