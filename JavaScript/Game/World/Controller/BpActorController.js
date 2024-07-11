"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BpActorController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  AOI_OFFSET = 1e3,
  MEDIA_ACTOR_TICK_FEQ = 30,
  Media_Actor_Group = new UE.FName("MediaActor");
class BpActorController extends ControllerBase_1.ControllerBase {
  static RegisterBpActor(o, r) {
    r?.IsValid()
      ? o.op_Equality(Media_Actor_Group) &&
        (r
          ? (r.SetActorTickEnabled(!1), this.Npa.add(r))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 39, "MediaActor 只能放在Actor下实现接口"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 39, "BpActorController sceneBp 是空的");
  }
  static UnregisterBpActor(o, r) {
    r?.IsValid()
      ? o.op_Equality(Media_Actor_Group) &&
        (r
          ? (this.Npa.delete(r),
            0 === this.Npa.size &&
              this.Fpa &&
              (this.Fpa.Stop(), (this.Fpa = void 0), Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "World",
                39,
                "BpActorController MediaActor 移除最后一个 关掉当前",
              ))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "World",
              39,
              "BpActorController MediaActor 只能放在Actor下实现接口",
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 39, "BpActorController sceneBp 是空的");
  }
  static OnTick(o) {
    this.Vpa();
  }
  static Vpa() {
    if (0 < this.Npa.size && (this.Hpa++, this.Hpa > MEDIA_ACTOR_TICK_FEQ)) {
      let o = void (this.Hpa = 0);
      var t,
        e,
        i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const _ of this.Npa) {
        var l = _,
          s = Vector_1.Vector.Create(),
          l =
            (s.FromUeVector(l.K2_GetActorLocation()),
            Vector_1.Vector.DistSquared(i, s));
        l < r && ((r = l), (o = _));
      }
      o &&
        ((r = Math.sqrt(r)),
        (e = ((t = 0), puerts_1.$ref)(0)),
        o.GetAoiRange(e),
        (t = (0, puerts_1.$unref)(e)),
        this.Fpa === o
          ? t &&
            t + AOI_OFFSET < r &&
            (this.Fpa.Stop(), (this.Fpa = void 0), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "World",
              39,
              "BpActorController MediaActor 超出Aoi 关掉当前",
            )
          : (this.Fpa &&
              (this.Fpa.Stop(), (this.Fpa = void 0), Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "World",
                39,
                "BpActorController MediaActor 有新Actor 关掉当前",
              ),
            o &&
              t &&
              r < t &&
              (o.Start(), (this.Fpa = o), Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "World",
                39,
                "BpActorController MediaActor 开始最近的一个",
              )));
    }
  }
}
((exports.BpActorController = BpActorController).Hpa = 0),
  (BpActorController.Npa = new Set()),
  (BpActorController.Fpa = void 0);
//# sourceMappingURL=BpActorController.js.map
