"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiMask = void 0);
const Log_1 = require("../../Core/Common/Log"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  UiLayer_1 = require("./UiLayer"),
  MASK_DESTROY_TIME = 2e3;
class UiMask {
  constructor(i) {
    (this.YCr = 0), (this.IRe = void 0), (this.JCr = i);
  }
  kot() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiMask",
        11,
        "[UiMask]添加定时器",
        ["MaskTag", this.JCr],
        ["MaskCount", this.YCr],
      ),
      (this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiMask",
            11,
            "[UiMask]超过保底时间,定时器执行逻辑,解除遮罩",
            ["MaskTag", this.JCr],
          ),
          this.zCr();
      }, MASK_DESTROY_TIME));
  }
  xHe() {
    void 0 !== this.IRe &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiMask",
          11,
          "[UiMask]移除定时器",
          ["MaskTag", this.JCr],
          ["MaskCount", this.YCr],
        ),
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0));
  }
  ZCr() {
    (this.YCr += 1),
      this.kot(),
      UiLayer_1.UiLayer.SetShowMaskLayer(this.JCr, !0);
  }
  egr() {
    --this.YCr,
      this.YCr <= 0 && UiLayer_1.UiLayer.SetShowMaskLayer(this.JCr, !1);
  }
  zCr() {
    (this.YCr = 0),
      (this.IRe = void 0),
      UiLayer_1.UiLayer.SetShowMaskLayer(this.JCr, !1);
  }
  SetMask(i) {
    i ? (this.xHe(), this.ZCr()) : 0 < this.YCr && this.egr(),
      this.YCr <= 0 && this.xHe();
  }
}
exports.UiMask = UiMask;
//# sourceMappingURL=UiMask.js.map
