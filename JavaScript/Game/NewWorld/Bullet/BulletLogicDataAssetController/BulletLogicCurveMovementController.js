"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicCurveMovementController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletLogicController_1 = require("./BulletLogicController"),
  PROFILE_KEY = "BulletLogicCurveMovementController_GetDestLocation",
  HEIGHT_DETECT = 500,
  DRAW_DURATION = 5;
class BulletLogicCurveMovementController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e),
      (this.zie = void 0),
      (this.r1t = -0),
      (this.uoe = void 0),
      (this._7o = 0),
      (this.u7o = 1),
      (this.Hte = this.Bullet.GetComponent(155)),
      (this.a7o = this.Bullet.GetBulletInfo());
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      this.LogicController.SplineTrace.ToAssetPathName(),
      UE.Class,
      (t) => {
        this.c7o(t);
      },
    ),
      (this.a7o.BulletDataMain.Execution.MovementReplaced = !0);
  }
  OnBulletDestroy() {
    this.zie &&
      (ActorSystem_1.ActorSystem.Put(this.zie.GetOwner()), (this.zie = void 0));
  }
  c7o(t) {
    var e, i;
    this.Bullet?.Valid &&
      this.LogicController.SplineTrace &&
      ((i = (e = this.m7o())
        ? UE.KismetMathLibrary.FindLookAtRotation(this.Hte.ActorLocation, e)
        : void 0),
      (i = UE.KismetMathLibrary.MakeTransform(
        this.Hte.ActorLocation,
        e ? i : this.Hte.ActorRotation,
        Vector_1.Vector.OneVector,
      )),
      (t = ActorSystem_1.ActorSystem.Get(t, i)),
      ObjectUtils_1.ObjectUtils.IsValid(t)
        ? t.IsA(UE.BP_BasePathLineBullet_C.StaticClass())
          ? ((this.zie = t.Spline),
            (i = this.zie.GetNumberOfSplinePoints()),
            (t = this.zie.GetLocationAtSplinePoint(i - 1, 1)),
            (i = this.zie.GetLocationAtSplinePoint(0, 1)),
            (i = UE.Vector.DistSquared(i, t)),
            (t = e
              ? UE.Vector.DistSquared(this.Hte.ActorLocation, e)
              : this.zie.GetSplineLength()),
            e &&
              ((this.u7o = Math.sqrt(t / i)),
              this.zie
                .GetOwner()
                .SetActorScale3D(
                  Vector_1.Vector.OneVector.op_Multiply(this.u7o),
                )),
            (this.r1t = this.d7o()),
            (this.zie.Duration = this.r1t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              21,
              "加载的Spline不是BP_BasePathLineBullet_C类型",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "加载的Spline为空"));
  }
  BulletLogicAction(t) {
    var e,
      i = this._7o;
    this.zie &&
      !this.a7o.NeedDestroy &&
      ((e = this.zie.GetLocationAtTime(i, 1, !0)),
      this.Hte.SetActorLocation(e),
      this.LogicController.IsForwardTangent &&
        ((e = this.zie.GetRotationAtTime(i, 1, !0)),
        this.Hte.SetActorRotation(e)),
      (this._7o += t * this.Hte.TimeDilation)),
      i >= this.r1t &&
        (ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(
          this.LogicController.EffectOnReach,
        ) &&
          ((e = this.Hte.Owner),
          EffectSystem_1.EffectSystem.SpawnEffect(
            e,
            e.GetTransform(),
            this.LogicController.EffectOnReach.ToAssetPathName(),
            "[BulletLogicCurveMovementController.BulletLogicAction]",
            new EffectContext_1.EffectContext(
              this.a7o.Attacker ? this.a7o.Attacker.Id : void 0,
            ),
          )),
        this.LogicController.IsDestroyReach) &&
        BulletController_1.BulletController.DestroyBullet(
          this.Bullet.Id,
          this.LogicController.IsSummonOnReach,
        );
  }
  koe() {
    (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.uoe.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.uoe.bIsSingle = !0),
      (this.uoe.bIgnoreSelf = !0),
      this.uoe.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      (this.uoe.DrawTime = DRAW_DURATION),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.uoe,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.uoe,
        ColorUtils_1.ColorUtils.LinearRed,
      );
  }
  m7o() {
    var t = this.a7o.TargetActorComp;
    if (this.LogicController.UseTargetLocation)
      return BulletUtil_1.BulletUtil.GetTargetLocation(
        t,
        FNameUtil_1.FNameUtil.NONE,
        this.a7o,
      );
    this.uoe || this.koe();
    var e = t?.Valid,
      i = (0, puerts_1.$ref)(void 0),
      t =
        (UE.BPL_Fight_C.获取Actor周围坐标点(
          e ? t.Owner : this.a7o.AttackerActorComp.Actor,
          e ? this.LogicController.Rotate : this.LogicController.SelfRotate,
          0,
          e ? this.LogicController.Length : this.LogicController.SelfLength,
          this.Hte.Owner,
          i,
        ),
        (0, puerts_1.$unref)(i)),
      i =
        ((t.Z += e
          ? this.LogicController.Height
          : this.LogicController.SelfHeight),
        this.uoe.SetStartLocation(t.X, t.Y, t.Z + HEIGHT_DETECT),
        this.uoe.SetEndLocation(t.X, t.Y, t.Z - HEIGHT_DETECT),
        t),
      t = TraceElementCommon_1.TraceElementCommon.LineTrace(
        this.uoe,
        PROFILE_KEY,
      ),
      s = this.uoe.HitResult;
    return (
      t &&
        s.bBlockingHit &&
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, i),
        (i.Z += e
          ? this.LogicController.Height
          : this.LogicController.SelfHeight)),
      i
    );
  }
  d7o() {
    var t = this.LogicController.Duration,
      e = this.LogicController.MaxSpeed,
      i = this.LogicController.MinSpeed,
      s = this.zie.GetSplineLength() * this.u7o,
      i = 0 < i ? s / i : MathUtils_1.MathUtils.MaxFloat,
      s = 0 < e ? s / e : 0;
    return (
      MathUtils_1.MathUtils.Clamp(t, s, i) *
      TimeUtil_1.TimeUtil.InverseMillisecond
    );
  }
}
exports.BulletLogicCurveMovementController = BulletLogicCurveMovementController;
//# sourceMappingURL=BulletLogicCurveMovementController.js.map
