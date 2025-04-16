"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSplineUtils = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager");
class GameSplineUtils {
  static InitGameSpline(e, t) {
    let o = Vector_1.Vector.ZeroVectorDouble;
    let r = void 0,
      i = !1;
    if (e.IsA(UE.BP_BasePathLine_C.StaticClass())) {
      var a = e,
        n =
          ((r = a.Spline),
          UE.KismetMathLibrary.Conv_VectorToVectorDouble(a.OriginalLocation));
      (o = n),
        (i = a.IsAttachedToEntity),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          t &&
          (a.DebugTarget = t.Owner);
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
      (n = e),
        (a =
          ((r = n.Spline),
          UE.KismetMathLibrary.Conv_VectorToVectorDouble(n.OriginalLocation)));
      (o = a),
        (i = n.IsAttachedToEntity),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          t &&
          (n.DebugTarget = t.Owner);
    }
    return (
      r &&
        ObjectUtils_1.ObjectUtils.IsValid(r) &&
        (i && t
          ? e.D_K2_SetActorLocationAndRotation(
              t.ActorLocation,
              t.ActorRotation,
              !1,
              void 0,
              !1,
            )
          : e.D_K2_SetActorLocationAndRotation(
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
        var i = Vector_1.Vector.Create(
            r.Transform?.Pos?.X ?? 0,
            r.Transform?.Pos?.Y ?? 0,
            r.Transform?.Pos?.Z ?? 0,
          ),
          a = Rotator_1.Rotator.Create(
            r.Transform?.Rot?.Y ?? 0,
            r.Transform?.Rot?.Z ?? 0,
            r.Transform?.Rot?.X ?? 0,
          ),
          r = (0, IComponent_1.getComponent)(
            r.ComponentsData,
            "SplineComponent",
          );
        if (r)
          return (
            o.D_K2_SetActorLocationAndRotation(
              i.ToUeVector(),
              a.ToUeRotator(),
              !1,
              void 0,
              !1,
            ),
            (i = r.Option),
            e.ClearSplinePoints(),
            (a = this.Zye(i.Points)),
            e.AddPoints(a),
            (o.SplineData = r.Option),
            e.UpdateSpline(),
            e
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            31,
            "[InitGameSplineBySplineEntity] 找不到pdDataId对应的ComponentsData找不到SplineComponent",
            ["pbDataId", t],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            31,
            "[InitGameSplineBySplineEntity] 找不到pdDataId对应的数据",
            ["pbDataId", t],
          );
    }
  }
  static Zye(t) {
    var o = UE.NewArray(UE.SplinePoint);
    if (0 < t.length) {
      var r = [],
        i = [],
        a = [],
        n = [],
        l = [];
      for (const _ of t) {
        var e = Vector_1.Vector.Create(
            _.Position.X ?? 0,
            _.Position.Y ?? 0,
            _.Position.Z ?? 0,
          ),
          e =
            (r.push(e),
            Rotator_1.Rotator.Create(
              _.Rotation?.Y ?? 0,
              _.Rotation?.Z ?? 0,
              _.Rotation?.X ?? 0,
            )),
          e =
            (i.push(e),
            Vector_1.Vector.Create(
              _.ArriveTangent.X ?? 0,
              _.ArriveTangent.Y ?? 0,
              _.ArriveTangent.Z ?? 0,
            )),
          e =
            (a.push(e),
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
        var s = new UE.SplinePoint(
          e,
          r[e].ToUeVectorOld(),
          a[e].ToUeVectorOld(),
          n[e].ToUeVectorOld(),
          i[e].ToUeRotator(),
          Vector_1.Vector.OneVector,
          l[e],
        );
        o.Add(s);
      }
    }
    return o;
  }
  static GenerateGuideEffect(e, t, o) {
    var r = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransformDouble,
      ),
      e =
        (r.D_K2_SetActorLocation(e.ToUeVector(), !1, void 0, !0),
        r.GetComponentByClass(UE.SplineComponent.StaticClass())),
      t =
        (e.D_SetSplinePoints(t, 0, !0),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransformDouble,
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
  static GenerateGuideEffectWithSplineData(e, t, o) {
    if (!StringUtils_1.StringUtils.IsEmpty(o)) {
      var e = ActorSystem_1.ActorSystem.Get(
          UE.BP_BasePathLine_C.StaticClass(),
          e,
        ),
        r = e.GetComponentByClass(UE.SplineComponent.StaticClass()),
        t = (r.ClearSplinePoints(), this.Zye(t)),
        t =
          (r.AddPoints(t),
          EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            MathUtils_1.MathUtils.DefaultTransformDouble,
            o,
            "[GameSplineUtils.GenerateEffectHandle]",
            new EffectContext_1.EffectContext(void 0, e),
          ));
      if (EffectSystem_1.EffectSystem.IsValid(t))
        return (
          EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToActor(
            e,
            void 0,
            2,
            2,
            2,
            !1,
          ),
          { EffectHandle: t, SplineActor: e, SplineComp: r }
        );
    }
  }
}
exports.GameSplineUtils = GameSplineUtils;
//# sourceMappingURL=GameSplineUtils.js.map
