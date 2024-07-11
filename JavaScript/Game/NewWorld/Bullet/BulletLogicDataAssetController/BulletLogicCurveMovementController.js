"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicCurveMovementController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletLogicController_1 = require("./BulletLogicController");
const PROFILE_KEY = "BulletLogicCurveMovementController_GetDestLocation";
const HEIGHT_DETECT = 500;
const DRAW_DURATION = 5;
class BulletLogicCurveMovementController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e),
      (this.zie = void 0),
      (this.Wht = -0),
      (this.uoe = void 0),
      (this.m9o = 0),
      (this.d9o = 1),
      (this.Hte = this.Bullet.GetComponent(152)),
      (this._9o = this.Bullet.GetBulletInfo());
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      this.LogicController.SplineTrace.ToAssetPathName(),
      UE.Class,
      (t) => {
        this.C9o(t);
      },
    ),
      (this._9o.BulletDataMain.Execution.MovementReplaced = !0);
  }
  OnBulletDestroy() {
    this.zie &&
      (ActorSystem_1.ActorSystem.Put(this.zie.GetOwner()), (this.zie = void 0));
  }
  C9o(t) {
    let e, i;
    this.Bullet?.Valid &&
      this.LogicController.SplineTrace &&
      ((i = (e = this.g9o())
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
              ((this.d9o = Math.sqrt(t / i)),
              this.zie
                .GetOwner()
                .SetActorScale3D(
                  Vector_1.Vector.OneVector.op_Multiply(this.d9o),
                )),
            (this.Wht = this.f9o()),
            (this.zie.Duration = this.Wht))
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
    let e;
    const i = this.m9o;
    this.zie &&
      !this._9o.NeedDestroy &&
      ((e = this.zie.GetLocationAtTime(i, 1, !0)),
      this.Hte.SetActorLocation(e),
      this.LogicController.IsForwardTangent &&
        ((e = this.zie.GetRotationAtTime(i, 1, !0)),
        this.Hte.SetActorRotation(e)),
      (this.m9o += t * this.Hte.TimeDilation)),
      i >= this.Wht &&
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
              this._9o.Attacker ? this._9o.Attacker.Id : void 0,
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
  g9o() {
    var t = this._9o.TargetActorComp;
    if (this.LogicController.UseTargetLocation)
      return BulletUtil_1.BulletUtil.GetTargetLocation(
        t,
        FNameUtil_1.FNameUtil.NONE,
        this._9o,
      );
    this.uoe || this.koe();
    const e = t?.Valid;
    var i = (0, puerts_1.$ref)(void 0);
    var t =
      (UE.BPL_Fight_C.获取Actor周围坐标点(
        e ? t.Owner : this._9o.AttackerActorComp.Actor,
        e ? this.LogicController.Rotate : this.LogicController.SelfRotate,
        0,
        e ? this.LogicController.Length : this.LogicController.SelfLength,
        this.Hte.Owner,
        i,
      ),
      (0, puerts_1.$unref)(i));
    var i =
      ((t.Z += e
        ? this.LogicController.Height
        : this.LogicController.SelfHeight),
      this.uoe.SetStartLocation(t.X, t.Y, t.Z + HEIGHT_DETECT),
      this.uoe.SetEndLocation(t.X, t.Y, t.Z - HEIGHT_DETECT),
      t);
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(
      this.uoe,
      PROFILE_KEY,
    );
    const s = this.uoe.HitResult;
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
  f9o() {
    const t = this.LogicController.Duration;
    const e = this.LogicController.MaxSpeed;
    var i = this.LogicController.MinSpeed;
    var s = this.zie.GetSplineLength() * this.d9o;
    var i = i > 0 ? s / i : MathUtils_1.MathUtils.MaxFloat;
    var s = e > 0 ? s / e : 0;
    return (
      MathUtils_1.MathUtils.Clamp(t, s, i) *
      TimeUtil_1.TimeUtil.InverseMillisecond
    );
  }
}
exports.BulletLogicCurveMovementController = BulletLogicCurveMovementController;
// # sourceMappingURL=BulletLogicCurveMovementController.js.map
