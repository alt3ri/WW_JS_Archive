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
class TsAnimNotifyStateCaughtBinding extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.CaughtIds = void 0),
      (this.DetectionRadius = 500),
      (this.SkillId = 0);
  }
  K2_NotifyBegin(e, t, i) {
    let r;
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent.Entity) &&
      ((r = e.GetComponent(33)),
      (this.SkillId = r?.CurrentSkill?.SkillId ?? 0),
      r?.SetCurSkillAnIndex(this.exportIndex),
      !!(r = e.GetComponent(43))) &&
      (this.DetectionRadius > 0 && this.CheckPosition(r),
      r.BeginCaught(this.CaughtIds, this.SkillId),
      !0)
    );
  }
  CheckPosition(i) {
    for (let e = 0; e < this.CaughtIds.Num(); e++) {
      var r = this.CaughtIds.Get(e);
      let o = i.Entity.GetComponent(3);
      var r = i.PendingCaughtList.get(r);
      if (!r) return;
      TsAnimNotifyStateCaughtBinding.InitTrace();
      let s = o?.ActorLocationProxy;
      const a = TsAnimNotifyStateCaughtBinding.SphereTrace;
      var n =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, s),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, s),
        (a.Radius = this.DetectionRadius),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(a, PROFILE_KEY));
      if (!n) return;
      let t = !1;
      for (let e = 0; e < a.HitResult.GetHitCount(); e++)
        if (
          a.HitResult?.Components.Get(e)
            .GetCollisionProfileName()
            ?.toString()
            .includes(AIRWALL_PORFILENAME)
        ) {
          t = !0;
          break;
        }
      if (!t) return;
      var c;
      var n = r[0].GetComponent(0);
      n?.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        ((n = Vector_1.Vector.Create(n?.GetInitLocation())),
        (s = Vector_1.Vector.Create(s)),
        (c = Vector_1.Vector.Create()),
        n.Subtraction(s, c),
        c.Normalize(),
        c.Multiply(this.DetectionRadius, c),
        (n = Vector_1.Vector.Create(o?.ActorLocation).AdditionEqual(c)),
        o?.SetActorLocation(n.ToUeVector(), "ExecutionAdjustMove", !1),
        (s = r[0].GetComponent(3)),
        (o = Vector_1.Vector.Create(s?.ActorLocation).AdditionEqual(c)),
        r[0]
          .GetComponent(3)
          ?.SetActorLocation(o.ToUeVector(), "ExecutionAdjustMove", !1));
    }
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
  K2_NotifyEnd(e, t) {
    let i;
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !(
        !e.CharacterActorComponent ||
        !(e = e.CharacterActorComponent.Entity) ||
        ((i = e.GetComponent(43)),
        e.GetComponent(33)?.SetCurSkillAnIndex(this.exportIndex),
        !i) ||
        (i.EndCaught(), 0)
      )
    );
  }
  GetNotifyName() {
    return "抓取绑定";
  }
}
(TsAnimNotifyStateCaughtBinding.SphereTrace = void 0),
  (exports.default = TsAnimNotifyStateCaughtBinding);
// # sourceMappingURL=TsAnimNotifyStateCaughtBinding.js.map
