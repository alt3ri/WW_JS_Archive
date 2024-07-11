"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSplineUtils = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class GameSplineUtils {
  static InitGameSpline(e, t) {
    let o = Vector_1.Vector.ZeroVector;
    let r = void 0;
    let a = !1;
    if (e.IsA(UE.BP_BasePathLine_C.StaticClass())) {
      var i = e;
      (r = i.Spline),
        (o = i.OriginalLocation),
        (a = i.IsAttachedToEntity),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          t &&
          (i.DebugTarget = t.Owner);
    } else {
      if (!e.IsA(UE.BP_MovePathLine_C.StaticClass()))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Level", 7, "加载的内容不是支持的Spline", [
              "AssetType",
              e.GetName(),
            ]),
          r
        );
      i = e;
      (r = i.Spline),
        (o = i.OriginalLocation),
        (a = i.IsAttachedToEntity),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          t &&
          (i.DebugTarget = t.Owner);
    }
    return (
      r &&
        ObjectUtils_1.ObjectUtils.IsValid(r) &&
        (a && t
          ? e.K2_SetActorLocationAndRotation(
              t.ActorLocation,
              t.ActorRotation,
              !1,
              void 0,
              !1,
            )
          : e.K2_SetActorLocationAndRotation(
              o,
              Rotator_1.Rotator.ZeroRotator,
              !1,
              void 0,
              !1,
            )),
      r
    );
  }
  static InitGameSplineBySplineEntity(t, o) {
    if (o?.IsValid()) {
      let e = o.GetComponentByClass(UE.SplineComponent.StaticClass());
      e =
        e ||
        o.AddComponentByClass(
          UE.SplineComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        );
      var r =
        ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
      if (r) {
        let a = Vector_1.Vector.Create(
          r.Transform?.Pos?.X ?? 0,
          r.Transform?.Pos?.Y ?? 0,
          r.Transform?.Pos?.Z ?? 0,
        );
        let i = Rotator_1.Rotator.Create(
          r.Transform?.Rot?.Y ?? 0,
          r.Transform?.Rot?.Z ?? 0,
          r.Transform?.Rot?.X ?? 0,
        );
        var r = (0, IComponent_1.getComponent)(
          r.ComponentsData,
          "SplineComponent",
        );
        if (r)
          return (
            o.K2_SetActorLocationAndRotation(
              a.ToUeVector(),
              i.ToUeRotator(),
              !1,
              void 0,
              !1,
            ),
            (a = r.Option),
            e.ClearSplinePoints(),
            (i = this.Zye(a.Points)),
            e.AddPoints(i),
            (o.SplineData = r.Option),
            e.UpdateSpline(),
            e
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            32,
            "[InitGameSplineBySplineEntity] 找不到pdDataId对应的ComponentsData找不到SplineComponent",
            ["pbDataId", t],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            32,
            "[InitGameSplineBySplineEntity] 找不到pdDataId对应的数据",
            ["pbDataId", t],
          );
    }
  }
  static Zye(t) {
    const o = UE.NewArray(UE.SplinePoint);
    if (t.length > 0) {
      const r = [];
      const a = [];
      const i = [];
      const n = [];
      const l = [];
      for (const _ of t) {
        var e = Vector_1.Vector.Create(
          _.Position.X ?? 0,
          _.Position.Y ?? 0,
          _.Position.Z ?? 0,
        );
        var e =
          (r.push(e),
          Rotator_1.Rotator.Create(
            _.Rotation?.Y ?? 0,
            _.Rotation?.Z ?? 0,
            _.Rotation?.X ?? 0,
          ));
        var e =
          (a.push(e),
          Vector_1.Vector.Create(
            _.ArriveTangent.X ?? 0,
            _.ArriveTangent.Y ?? 0,
            _.ArriveTangent.Z ?? 0,
          ));
        var e =
          (i.push(e),
          Vector_1.Vector.Create(
            _.LeaveTangent.X ?? 0,
            _.LeaveTangent.Y ?? 0,
            _.LeaveTangent.Z ?? 0,
          ));
        switch ((n.push(e), _.LineType)) {
          case IComponent_1.ESplineLine.Linear:
            l.push(0);
            break;
          case IComponent_1.ESplineLine.CurveCustomTangent:
            l.push(4);
            break;
          case IComponent_1.ESplineLine.Curve:
            l.push(1);
            break;
          case IComponent_1.ESplineLine.Constant:
            l.push(2);
        }
      }
      for (let e = 0; e < t.length; e++) {
        const s = new UE.SplinePoint(
          e,
          r[e].ToUeVector(),
          i[e].ToUeVector(),
          n[e].ToUeVector(),
          a[e].ToUeRotator(),
          Vector_1.Vector.OneVector,
          l[e],
        );
        o.Add(s);
      }
    }
    return o;
  }
  static GenerateGuideEffect(e, t, o) {
    const r = ActorSystem_1.ActorSystem.Get(
      UE.BP_BasePathLine_C.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransform,
    );
    var e =
      (r.K2_SetActorLocation(e.ToUeVector(), !1, void 0, !0),
      r.GetComponentByClass(UE.SplineComponent.StaticClass()));
    var t =
      (e.SetSplinePoints(t, 0, !0),
      EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        MathUtils_1.MathUtils.DefaultTransform,
        o,
        "[GameSplineUtils.GenerateEffectHandle]",
        new EffectContext_1.EffectContext(void 0, r),
      ));
    if (EffectSystem_1.EffectSystem.IsValid(t))
      return (
        EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToActor(
          r,
          void 0,
          2,
          2,
          2,
          !1,
        ),
        { EffectHandle: t, SplineActor: r, SplineComp: e }
      );
  }
}
exports.GameSplineUtils = GameSplineUtils;
// # sourceMappingURL=GameSplineUtils.js.map
