"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerPerceptionEvent = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PlayerPerceptionEvent {
  constructor() {
    (this.w_e = void 0),
      (this.$or = void 0),
      (this.pGo = void 0),
      (this.Xor = void 0),
      (this.EventTokenInternal = 0),
      (this.RBa = -1),
      (this.UBa = -1),
      (this.xBa = 0),
      (this.PBa = void 0),
      (this.err = () => {
        this.w_e && this.w_e();
      }),
      (this.trr = () => {
        this.$or && this.$or();
      }),
      (this.Zor = () => !this.Xor || this.Xor()),
      (this.Iea = () => {
        (this.EventTokenInternal = 0),
          (this.xBa = 0),
          this.pGo && (this.pGo(), (this.pGo = void 0));
      });
  }
  IsValid() {
    return 0 < this.EventTokenInternal;
  }
  get EventToken() {
    return this.EventTokenInternal;
  }
  Init(
    i,
    t,
    s = void 0,
    h = void 0,
    o = void 0,
    e = void 0,
    r = -1,
    v = void 0,
  ) {
    0 !== this.EventTokenInternal
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Perception", 36, "重复初始化主角感知事件")
      : s || h
        ? t
          ? ((this.RBa = i),
            (this.UBa = r),
            (this.xBa = t),
            (this.PBa = v),
            (this.w_e = s),
            (this.$or = h),
            (this.pGo = o),
            (this.Xor = e),
            (this.EventTokenInternal =
              cpp_1.FKuroPerceptionInterface.RegisterPlayerPerceptionEvent(
                i,
                r,
                t,
                this,
                this.Xor ? this.Zor : void 0,
                this.w_e ? this.err : void 0,
                this.$or ? this.trr : void 0,
                v && !v.Equals(Vector_1.Vector.ZeroVectorProxy)
                  ? v.ToUeVectorOld()
                  : void 0,
                this.Iea,
              )),
            0 === this.EventTokenInternal &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Perception", 36, "初始化感知事件失败"))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Perception",
              36,
              "初始化的主角感知事件时传入的时间预算管理Token非法",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Perception", 36, "初始化的主角感知事件没有意义");
  }
  Register(i) {
    0 !== this.EventTokenInternal
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Perception", 36, "重新注册时，仍然还存在感知事件")
      : ((this.xBa = i),
        (this.EventTokenInternal =
          cpp_1.FKuroPerceptionInterface.RegisterPlayerPerceptionEvent(
            this.RBa,
            this.UBa,
            this.xBa,
            this,
            this.Xor ? this.Zor : void 0,
            this.w_e ? this.err : void 0,
            this.$or ? this.trr : void 0,
            this.PBa && !this.PBa.Equals(Vector_1.Vector.ZeroVectorProxy)
              ? this.PBa.ToUeVectorOld()
              : void 0,
            this.Iea,
          )),
        0 === this.EventTokenInternal &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Perception", 36, "重新注册感知事件失败"));
  }
  Unregister() {
    0 === this.EventTokenInternal
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Perception", 36, "临时注销感知事件时，感知事件不存在")
      : (cpp_1.FKuroPerceptionInterface.UnregisterPlayerPerceptionEvent(
          this.EventTokenInternal,
        ),
        (this.EventTokenInternal = 0));
  }
  Clear() {
    (this.w_e = void 0),
      (this.$or = void 0),
      (this.pGo = void 0),
      (this.Xor = void 0),
      (this.RBa = -1),
      (this.UBa = -1),
      (this.xBa = 0),
      (this.PBa = void 0),
      0 !== this.EventTokenInternal &&
        (cpp_1.FKuroPerceptionInterface.UnregisterPlayerPerceptionEvent(
          this.EventTokenInternal,
        ),
        (this.EventTokenInternal = 0));
  }
  UpdateDistance(i, t = -1) {
    (this.RBa = i),
      (this.UBa = t),
      0 !== this.EventTokenInternal &&
        cpp_1.FKuroPerceptionInterface.UpdatePerceptionEventDistance(
          this.EventTokenInternal,
          i,
          t,
        );
  }
}
exports.PlayerPerceptionEvent = PlayerPerceptionEvent;
//# sourceMappingURL=PlayerPerceptionEvent.js.map
