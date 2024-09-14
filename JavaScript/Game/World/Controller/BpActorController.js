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
          ? (r.SetActorTickEnabled(!1), this.NSa.add(r))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 39, "MediaActor 只能放在Actor下实现接口"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 39, "BpActorController sceneBp 是空的");
  }
  static UnregisterBpActor(o, r) {
    r?.IsValid()
      ? o.op_Equality(Media_Actor_Group) &&
        (r
          ? (this.NSa.delete(r),
            0 === this.NSa.size &&
              this.FSa &&
              (this.FSa.Stop(), (this.FSa = void 0), Log_1.Log.CheckDebug()) &&
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
    this.VSa();
  }
  static VSa() {
    if (0 < this.NSa.size && (this.HSa++, this.HSa > MEDIA_ACTOR_TICK_FEQ)) {
      let o = void (this.HSa = 0);
      var t,
        e,
        i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const _ of this.NSa) {
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
        this.FSa === o
          ? t &&
            t + AOI_OFFSET < r &&
            (this.FSa.Stop(), (this.FSa = void 0), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "World",
              39,
              "BpActorController MediaActor 超出Aoi 关掉当前",
            )
          : (this.FSa &&
              (this.FSa.Stop(), (this.FSa = void 0), Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "World",
                39,
                "BpActorController MediaActor 有新Actor 关掉当前",
              ),
            o &&
              t &&
              r < t &&
              (o.Start(), (this.FSa = o), Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "World",
                39,
                "BpActorController MediaActor 开始最近的一个",
              )));
    }
  }
}
((exports.BpActorController = BpActorController).HSa = 0),
  (BpActorController.NSa = new Set()),
  (BpActorController.FSa = void 0);
//# sourceMappingURL=BpActorController.js.map
