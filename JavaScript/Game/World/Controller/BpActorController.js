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
  Media_Actor_Group = new UE.FName("MediaActor"),
  MEDIA_ACTOR_CHECKFRAME_CLOSE = 10,
  MEDIA_ACTOR_CHECKFRAME_PLAY = 15,
  Media_Actor_Group_Extra = new UE.FName("MediaActor_Extra"),
  MEDIA_ACTOR_Extra_CHECKFRAME_CLOSE = 20,
  MEDIA_ACTOR_Extra_CHECKFRAME_PLAY = 25;
class BpActorController extends ControllerBase_1.ControllerBase {
  static RegisterBpActor(o, r) {
    if (r?.IsValid())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("World", 38, "BpActorController 注册", [
            "BPI_SceneBp",
            r.GetName(),
          ]),
        o.op_Equality(Media_Actor_Group)
          ? r
            ? (r.SetActorTickEnabled(!1), void this.VSa.add(r))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "World",
                  38,
                  "BpActorController MediaActor 只能放在Actor下实现接口",
                )
              )
          : o.op_Equality(Media_Actor_Group_Extra)
            ? r
              ? (r.SetActorTickEnabled(!1), void this.gzl.add(r))
              : void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "World",
                    38,
                    "BpActorController MediaActor_Extra 只能放在Actor下实现接口",
                  )
                )
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "World",
                  38,
                  "SceneBp 注册失败,没有对应的处理类型",
                )
              )
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("World", 38, "BpActorController sceneBp 是空的");
  }
  static UnregisterBpActor(o, r) {
    if (r?.IsValid())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("World", 38, "BpActorController 反注册", [
            "BPI_SceneBp",
            r.GetName(),
          ]),
        o.op_Equality(Media_Actor_Group)
          ? r
            ? (this.VSa.delete(r),
              void (
                0 === this.VSa.size &&
                this.HSa &&
                (this.HSa.Stop(),
                (this.HSa = void 0),
                Log_1.Log.CheckDebug()) &&
                Log_1.Log.Debug(
                  "World",
                  38,
                  "BpActorController MediaActor 移除最后一个 关掉当前",
                )
              ))
            : void (
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "World",
                  38,
                  "BpActorController MediaActor 只能放在Actor下实现接口",
                )
              )
          : o.op_Equality(Media_Actor_Group_Extra)
            ? r
              ? (this.gzl.delete(r),
                void (
                  0 === this.gzl.size &&
                  this.pzl &&
                  (this.pzl.Stop(),
                  (this.pzl = void 0),
                  Log_1.Log.CheckDebug()) &&
                  Log_1.Log.Debug(
                    "World",
                    38,
                    "BpActorController MediaActor_Extra 移除最后一个 关掉当前",
                  )
                ))
              : void (
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "World",
                    38,
                    "BpActorController MediaActor_Extra 只能放在Actor下实现接口",
                  )
                )
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "World",
                  38,
                  "SceneBp 反注册失败,没有对应的处理类型",
                )
              )
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("World", 38, "BpActorController sceneBp 是空的");
  }
  static OnTick(o) {
    this.jSa();
  }
  static DisableMediaByGM(o) {
    (this.IsDisableMediaByGM = o),
      this.IsDisableMediaByGM &&
        (this.HSa?.Stop(),
        (this.HSa = void 0),
        this.pzl?.Stop(),
        (this.pzl = void 0));
  }
  static jSa() {
    if (!this.IsDisableMediaByGM && (0 < this.VSa.size || 0 < this.gzl.size)) {
      if (
        (this.WSa++,
        this.WSa > MEDIA_ACTOR_TICK_FEQ && (this.WSa = 0),
        0 < this.VSa.size)
      ) {
        if (this.WSa === MEDIA_ACTOR_CHECKFRAME_CLOSE) return void this.so_();
        if (this.WSa === MEDIA_ACTOR_CHECKFRAME_PLAY) return void this.ao_();
      }
      0 < this.gzl.size &&
        (this.WSa === MEDIA_ACTOR_Extra_CHECKFRAME_CLOSE
          ? this.ho_()
          : this.WSa === MEDIA_ACTOR_Extra_CHECKFRAME_PLAY && this.lo_());
    }
  }
  static so_() {
    if (0 < this.VSa.size && this.HSa?.IsValid()) {
      let o = void 0;
      var t,
        e,
        i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const s of this.VSa) {
        var _ = s,
          l = Vector_1.Vector.Create(),
          _ =
            (l.FromUeVector(_.D_K2_GetActorLocation()),
            Vector_1.Vector.Dist(i, l));
        _ < r && ((r = _), (o = s));
      }
      o?.IsValid() &&
        ((e = ((t = 0), puerts_1.$ref)(0)),
        o.GetAoiRange(e),
        (t = (0, puerts_1.$unref)(e)),
        this.HSa === o
          ? t &&
            t + AOI_OFFSET < r &&
            (this.HSa.Stop(), (this.HSa = void 0), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "World",
              38,
              "BpActorController MediaActor 超出Aoi 关掉当前",
            )
          : this.HSa?.IsValid() &&
            (this.HSa.Stop(), (this.HSa = void 0), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "World",
              38,
              "BpActorController MediaActor 要切换新的 关掉当前",
            ));
    }
  }
  static ao_() {
    if (0 < this.VSa.size && !this.HSa?.IsValid()) {
      let o = void 0;
      var t,
        e,
        i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const s of this.VSa) {
        var _ = s,
          l = Vector_1.Vector.Create(),
          _ =
            (l.FromUeVector(_.D_K2_GetActorLocation()),
            Vector_1.Vector.DistSquared(i, l));
        _ < r && ((r = _), (o = s));
      }
      o?.IsValid() &&
        ((r = Math.sqrt(r)),
        (e = ((t = 0), puerts_1.$ref)(0)),
        o.GetAoiRange(e),
        (t = (0, puerts_1.$unref)(e))) &&
        t > r &&
        (o.Start(), (this.HSa = o), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "World",
          38,
          "BpActorController MediaActor 当前距离小于AOI 开始播放",
        );
    }
  }
  static ho_() {
    if (0 < this.gzl.size && this.pzl?.IsValid()) {
      let o = void 0;
      var t,
        e,
        i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const s of this.gzl) {
        var _ = s,
          l = Vector_1.Vector.Create(),
          _ =
            (l.FromUeVector(_.D_K2_GetActorLocation()),
            Vector_1.Vector.Dist(i, l));
        _ < r && ((r = _), (o = s));
      }
      o?.IsValid() &&
        ((e = ((t = 0), puerts_1.$ref)(0)),
        o.GetAoiRange(e),
        (t = (0, puerts_1.$unref)(e)),
        this.pzl === o
          ? t &&
            t + AOI_OFFSET < r &&
            (this.pzl.Stop(), (this.pzl = void 0), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "World",
              38,
              "BpActorController MediaActor 超出Aoi 关掉当前",
            )
          : this.pzl?.IsValid() &&
            (this.pzl.Stop(), (this.pzl = void 0), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "World",
              38,
              "BpActorController MediaActor 要切换新的 关掉当前",
            ));
    }
  }
  static lo_() {
    if (0 < this.gzl.size && !this.pzl?.IsValid()) {
      let o = void 0;
      var t,
        e,
        i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const s of this.gzl) {
        var _ = s,
          l = Vector_1.Vector.Create(),
          _ =
            (l.FromUeVector(_.D_K2_GetActorLocation()),
            Vector_1.Vector.DistSquared(i, l));
        _ < r && ((r = _), (o = s));
      }
      o?.IsValid() &&
        ((r = Math.sqrt(r)),
        (e = ((t = 0), puerts_1.$ref)(0)),
        o.GetAoiRange(e),
        (t = (0, puerts_1.$unref)(e))) &&
        t > r &&
        (o.Start(), (this.pzl = o), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "World",
          38,
          "BpActorController MediaActor 当前距离小于AOI 开始播放",
        );
    }
  }
}
((exports.BpActorController = BpActorController).IsDisableMediaByGM = !1),
  (BpActorController.WSa = 0),
  (BpActorController.VSa = new Set()),
  (BpActorController.gzl = new Set()),
  (BpActorController.HSa = void 0),
  (BpActorController.pzl = void 0);
//# sourceMappingURL=BpActorController.js.map
