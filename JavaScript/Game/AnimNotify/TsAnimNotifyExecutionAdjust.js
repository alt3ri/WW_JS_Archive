"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const PROFILE_KEY = "FightCameraLogicComponent_CheckCollision_ExecutionAdjust";
const AIRWALL_PORFILENAME = "InvisibleWall";
class TsAnimNotifyExecutionAdjust extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.DetectionRadius = 100), (this.CaughtId = "");
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      let o = e.CharacterActorComponent.Entity.GetComponent(43);
      if (o) {
        o = o.PendingCaughtList.get(this.CaughtId);
        if (o) {
          TsAnimNotifyExecutionAdjust.InitTrace();
          let i;
          let r = e.CharacterActorComponent?.ActorLocationProxy;
          const s = TsAnimNotifyExecutionAdjust.SphereTrace;
          let n =
            (TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, r),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, r),
            (s.Radius = this.DetectionRadius),
            TraceElementCommon_1.TraceElementCommon.SphereTrace(
              s,
              PROFILE_KEY,
            ));
          if (n) {
            let t = !1;
            for (let e = 0; e < s.HitResult.GetHitCount(); e++)
              if (
                s.HitResult?.Components.Get(e)
                  .GetCollisionProfileName()
                  ?.toString()
                  .includes(AIRWALL_PORFILENAME)
              ) {
                t = !0;
                break;
              }
            t &&
              (n = o[0].GetComponent(0))?.GetEntityType() ===
                Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
              ((n = Vector_1.Vector.Create(n?.GetInitLocation())),
              (r = Vector_1.Vector.Create(r)),
              (i = Vector_1.Vector.Create()),
              n.Subtraction(r, i),
              i.Normalize(),
              i.Multiply(this.DetectionRadius, i),
              (n = Vector_1.Vector.Create(
                e.CharacterActorComponent?.ActorLocation,
              ).AdditionEqual(i)),
              e.CharacterActorComponent?.SetActorLocation(
                n.ToUeVector(),
                "ExecutionAdjustMove",
                !1,
              ),
              (r = o[0].GetComponent(3)),
              (e = Vector_1.Vector.Create(r?.ActorLocation).AdditionEqual(i)),
              o[0]
                .GetComponent(3)
                ?.SetActorLocation(e.ToUeVector(), "ExecutionAdjustMove", !1));
          }
        }
      }
    }
    return !0;
  }
  static InitTrace() {
    (this.SphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.SphereTrace.bIsSingle = !1),
      (this.SphereTrace.bIgnoreSelf = !0),
      (this.SphereTrace.bTraceComplex = !0),
      this.SphereTrace.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      this.SphereTrace.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
      ),
      (this.SphereTrace.WorldContextObject = GlobalData_1.GlobalData.World);
  }
  GetNotifyName() {
    return "处决调整位置";
  }
}
(TsAnimNotifyExecutionAdjust.SphereTrace = void 0),
  (exports.default = TsAnimNotifyExecutionAdjust);
// # sourceMappingURL=TsAnimNotifyExecutionAdjust.js.map
