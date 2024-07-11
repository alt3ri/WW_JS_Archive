"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerPerceptionEvent = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PlayerPerceptionEvent {
  constructor() {
    (this.w_e = void 0),
      (this.Yir = void 0),
      (this.Sqo = void 0),
      (this.$ir = void 0),
      (this.EventToken = 0),
      (this.tor = () => {
        this.w_e && this.w_e();
      }),
      (this.ior = () => {
        this.Yir && this.Yir();
      }),
      (this.eor = () => !this.$ir || this.$ir()),
      (this.dVs = () => {
        (this.w_e = void 0),
          (this.Yir = void 0),
          (this.$ir = void 0),
          (this.EventToken = 0),
          this.Sqo && (this.Sqo(), (this.Sqo = void 0));
      });
  }
  Init(
    i,
    t,
    s = void 0,
    o = void 0,
    h = void 0,
    e = void 0,
    r = -1,
    v = void 0,
  ) {
    0 !== this.EventToken
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Perception", 37, "重复初始化主角感知事件")
      : s || o
        ? t
          ? ((this.w_e = s),
            (this.Yir = o),
            (this.Sqo = h),
            (this.$ir = e),
            (this.EventToken =
              cpp_1.FKuroPerceptionInterface.RegisterPlayerPerceptionEvent(
                i,
                r,
                t,
                this,
                this.$ir ? this.eor : void 0,
                this.w_e ? this.tor : void 0,
                this.Yir ? this.ior : void 0,
                v && !v.Equals(Vector_1.Vector.ZeroVectorProxy)
                  ? v.ToUeVector()
                  : void 0,
                this.Sqo ? this.dVs : void 0,
              )),
            0 === this.EventToken &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Perception", 37, "初始化感知事件失败"))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Perception",
              37,
              "初始化的主角感知事件时传入的时间预算管理Token非法",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Perception", 37, "初始化的主角感知事件没有意义");
  }
  Clear() {
    (this.w_e = void 0),
      (this.Yir = void 0),
      (this.Sqo = void 0),
      (this.$ir = void 0),
      0 !== this.EventToken &&
        (cpp_1.FKuroPerceptionInterface.UnregisterPlayerPerceptionEvent(
          this.EventToken,
        ),
        (this.EventToken = 0));
  }
  UpdateDistance(i, t = -1) {
    0 !== this.EventToken &&
      cpp_1.FKuroPerceptionInterface.UpdatePerceptionEventDistance(
        this.EventToken,
        i,
        t,
      );
  }
}
exports.PlayerPerceptionEvent = PlayerPerceptionEvent;
//# sourceMappingURL=PlayerPerceptionEvent.js.map
