"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiMask = void 0);
const Log_1 = require("../../Core/Common/Log"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  UiLayer_1 = require("./UiLayer"),
  MASK_DESTROY_TIME = 2e3;
class UiMask {
  constructor() {
    this.o8_ = new Map();
  }
  n8_(e) {
    void 0 !== e.Timer &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiMask",
          10,
          "[UiMask]移除定时器",
          ["MaskTag", e.Tag],
          ["MaskCount", e.Count],
        ),
      TimerSystem_1.TimerSystem.Remove(e.Timer),
      (e.Timer = void 0));
  }
  s8_(e, i) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiMask",
          10,
          "[UiMask]添加定时器",
          ["MaskTag", e],
          ["MaskCount", i],
        ),
      TimerSystem_1.TimerSystem.Delay(() => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiMask",
            10,
            "[UiMask]超过保底时间,定时器执行逻辑,解除遮罩",
            ["MaskTag", e],
          ),
          this.a8_(e);
      }, MASK_DESTROY_TIME)
    );
  }
  h8_(e) {
    (e.Timer = this.s8_(e.Tag, e.Count)),
      UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, !0);
  }
  l8_(e) {
    let i = this.o8_.get(e);
    i
      ? (this.n8_(i), (i.Count += 1))
      : ((i = { Tag: e, Timer: void 0, Count: 1 }), this.o8_.set(e, i)),
      this.h8_(i);
  }
  _8_(e) {
    var i = this.o8_.get(e);
    i && (--i.Count, i.Count <= 0) && (this.n8_(i), this.a8_(e));
  }
  a8_(e) {
    this.o8_.delete(e), UiLayer_1.UiLayer.SetShowMaskLayer(e, !1);
  }
  SetMask(e, i) {
    i ? this.l8_(e) : this._8_(e);
  }
}
exports.UiMask = UiMask;
//# sourceMappingURL=UiMask.js.map
