"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  MAX_DISTANCE = 5e3,
  SPHERE_TRACE_RADIUS = 1,
  SUMMON_ID_A = 39900002,
  SUMMON_ID_B = 39900003,
  SKILL_ID = 210019,
  PORTAL_HALF_X = 200,
  PORTAL_HALF_Y = 150,
  PORTAL_GEN_OFFSET = 2;
class PortalController extends ControllerBase_1.ControllerBase {
  static RegisterPair(r, o, e, t, l) {
    var a;
    ModelManager_1.ModelManager.PortalModel?.GetPortal(r) ||
      ((a = new UE.Transform()).SetLocation(o.GetLocation()),
      (a = ActorSystem_1.ActorSystem.Spawn(
        UE.BP_Portal_C.StaticClass(),
        a,
        t,
      )).SetPortal1Transform(o, t.GetTransform()),
      a.SetPortal2Transform(e, l.GetTransform()),
      a.EnablePortal1Rendering(),
      a.EnablePortal2Rendering(),
      ModelManager_1.ModelManager.PortalModel?.AddPortalPair(r, a));
  }
  static UnRegisterPair(r) {
    var o = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    o &&
      (o.DisablePortal1Rendering(),
      o.DisablePortal2Rendering(),
      ModelManager_1.ModelManager.PortalModel?.RemovePortalPair(r),
      ActorSystem_1.ActorSystem.Put(o));
  }
  static TryGenerateDynamicPortal() {
    var r, o, e, t, l, a;
    Global_1.Global.BaseCharacter?.CharacterActorComponent?.CreatureData?.Valid
      ? ((a = (o = Global_1.Global.CharacterCameraManager).GetCameraLocation()),
        (o = o.GetCameraRotation().Vector()),
        PortalController.bsr || this.F7r(),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          PortalController.bsr,
          a,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          PortalController.bsr,
          a.op_Addition(o.op_Multiply(MAX_DISTANCE)),
        ),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          PortalController.bsr,
          "PortalController.TryGenerateDynamicPortal",
        ) &&
          PortalController.bsr.HitResult.bBlockingHit &&
          ((a = Vector_1.Vector.Create()),
          (o = Vector_1.Vector.Create()),
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            PortalController.bsr.HitResult,
            0,
            a,
          ),
          TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
            PortalController.bsr.HitResult,
            0,
            o,
          ),
          UE.KismetSystemLibrary.DrawDebugSphere(
            Global_1.Global.BaseCharacter,
            a.ToUeVector(),
            10,
            12,
            ColorUtils_1.ColorUtils.LinearCyan,
            10,
          ),
          o.Normalize(),
          (r = Vector_1.Vector.Create(o)),
          a.AdditionEqual(r.MultiplyEqual(PORTAL_GEN_OFFSET)),
          UE.KismetSystemLibrary.DrawDebugSphere(
            Global_1.Global.BaseCharacter,
            a.ToUeVector(),
            10,
            12,
            ColorUtils_1.ColorUtils.LinearYellow,
            5,
          ),
          (r = UE.KismetMathLibrary.MakeRotFromX(o.ToUeVector())),
          this.Uyn(a, o, r)) &&
          ((o =
            Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.Id),
          (e = this.Ayn ? 0 : 1),
          (l = this.Pyn[e]) &&
            (this.Pyn[0] &&
              ((t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
                this.Pyn[0],
              )?.Entity?.GetComponent(198)),
              this.UnRegisterPair(t.GetPbDataId())),
            ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(
              SKILL_ID,
              o,
              l,
            ).finally(void 0),
            (this.Pyn[e] = void 0)),
          (t = new UE.Transform()).SetLocation(a.ToUeVector()),
          t.SetRotation(r.Quaternion()),
          (l = this.Ayn ? SUMMON_ID_A : SUMMON_ID_B),
          void 0 !==
            (a =
              ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(
                SKILL_ID,
                !0,
                t,
                o,
                l,
                0,
              )) && (this.xyn(a, e), (this.Ayn = !this.Ayn)),
          this.wyn ||
            TimerSystem_1.TimerSystem.Forever(() => {
              this.Byn();
            }, 500)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "PortalGamePlay",
          32,
          "未找到玩家角色对应的CreatureDataComp",
        );
  }
  static F7r() {
    (PortalController.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (PortalController.bsr.WorldContextObject = Global_1.Global.BaseCharacter),
      (PortalController.bsr.bIsSingle = !0),
      (PortalController.bsr.bIgnoreSelf = !0);
    var r = UE.NewArray(UE.BuiltinByte),
      r =
        (r.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        (0, puerts_1.$ref)(r));
    PortalController.bsr.SetObjectTypesQuery(r),
      (PortalController.bsr.Radius = SPHERE_TRACE_RADIUS),
      PortalController.bsr.SetDrawDebugTrace(2),
      (PortalController.bsr.DrawTime = 5);
  }
  static byn() {
    (PortalController.xEr = UE.NewObject(UE.TraceBoxElement.StaticClass())),
      (PortalController.xEr.WorldContextObject = Global_1.Global.BaseCharacter),
      (PortalController.xEr.bIsSingle = !0),
      (PortalController.xEr.bIgnoreSelf = !0);
    var r = UE.NewArray(UE.BuiltinByte),
      r =
        (r.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        (0, puerts_1.$ref)(r));
    PortalController.xEr.SetObjectTypesQuery(r),
      (PortalController.xEr.HalfSizeX = PORTAL_HALF_X),
      (PortalController.xEr.HalfSizeY = PORTAL_HALF_Y),
      (PortalController.xEr.HalfSizeZ = 10),
      PortalController.xEr.SetDrawDebugTrace(2),
      (PortalController.xEr.DrawTime = 5);
  }
  static xyn(r, o) {
    PortalController.Pyn[o] = r;
  }
  static Uyn(r, o, e) {
    void 0 === this.xEr && this.byn();
    var t = Vector_1.Vector.Create(o),
      r = (t.MultiplyEqual(10), t.AdditionEqual(r), Vector_1.Vector.Create(o)),
      o =
        (r.MultiplyEqual(10),
        r.AdditionEqual(t),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          PortalController.xEr,
          t,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          PortalController.xEr,
          r,
        ),
        Rotator_1.Rotator.Create(e).Quaternion()),
      t = Rotator_1.Rotator.Create(90, 0, 0).Quaternion(),
      r = Quat_1.Quat.Create(),
      e = (o.Multiply(t, r), r.Rotator()),
      o =
        (TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
          PortalController.xEr,
          e,
        ),
        TraceElementCommon_1.TraceElementCommon.BoxTrace(
          PortalController.xEr,
          "PortalController.RecalculateLocation",
        ));
    return !o || !PortalController.bsr.HitResult?.bBlockingHit;
  }
  static Byn() {
    var r, o, e, t;
    this.Pyn[0] &&
      this.Pyn[1] &&
      ((o = (r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
        this.Pyn[0],
      ))?.Entity?.GetComponent(198)),
      (t = (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
        this.Pyn[1],
      ))?.Entity?.GetComponent(198)),
      r?.IsInit) &&
      e?.IsInit &&
      o &&
      t &&
      (o.PortalCapture.SetPair(t.PortalCapture),
      t.PortalCapture.SetPair(o.PortalCapture),
      this.RegisterPair(
        o.GetPbDataId(),
        o.PortalCapture.Plane.K2_GetComponentToWorld(),
        t.PortalCapture.Plane.K2_GetComponentToWorld(),
        r.Entity.GetComponent(1).Owner,
        e.Entity.GetComponent(1).Owner,
      ),
      this.wyn) &&
      (TimerSystem_1.TimerSystem.Remove(this.wyn), (this.wyn = void 0));
  }
}
((exports.PortalController = PortalController).bsr = void 0),
  (PortalController.xEr = void 0),
  (PortalController.Pyn = []),
  (PortalController.Ayn = !0),
  (PortalController.wyn = void 0);
//# sourceMappingURL=PortalController.js.map
