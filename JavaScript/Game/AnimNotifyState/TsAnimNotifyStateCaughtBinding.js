"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  PROFILE_KEY = "FightCameraLogicComponent_CheckCollision_ExecutionAdjust",
  AIRWALL_PORFILENAME = "InvisibleWall";
class TsAnimNotifyStateCaughtBinding extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.CaughtIds = void 0),
      (this.DetectionRadius = 500);
  }
  Constructor() {}
  K2_NotifyBegin(e, t, i) {
    var r,
      e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent.Entity) &&
      ((t = e
        .GetComponent(207)
        ?.CreateAnimNotifyContent(t.GetName(), this.exportIndex)),
      (r = e.GetComponent(39)),
      !!(e = e.GetComponent(51))) &&
      (0 < this.DetectionRadius && this.CheckPosition(e),
      e.SetCaughtBindingAnsInfo(t),
      e.BeginCaught(this.CaughtIds, r?.CurrentSkill?.SkillId ?? 0),
      !0)
    );
  }
  CheckPosition(i) {
    for (let e = 0; e < this.CaughtIds.Num(); e++) {
      var r = this.CaughtIds.Get(e),
        o = i.Entity.GetComponent(3),
        r = i.PendingCaughtList.get(r);
      if (!r) return;
      TsAnimNotifyStateCaughtBinding.InitTrace();
      var n = o?.ActorLocationProxy,
        a = TsAnimNotifyStateCaughtBinding.SphereTrace,
        s =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, n),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, n),
          (a.Radius = this.DetectionRadius),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(a, PROFILE_KEY));
      if (!s) return;
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
      var c,
        s = r[0].GetComponent(0);
      s?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster &&
        ((s = Vector_1.Vector.Create(s?.GetInitLocation())),
        (n = Vector_1.Vector.Create(n)),
        (c = Vector_1.Vector.Create()),
        s.Subtraction(n, c),
        c.Normalize(),
        c.Multiply(this.DetectionRadius, c),
        (s = Vector_1.Vector.Create(o?.ActorLocation).AdditionEqual(c)),
        o?.SetActorLocation(s.ToUeVector(), "ExecutionAdjustMove", !1),
        (n = r[0].GetComponent(3)),
        (o = Vector_1.Vector.Create(n?.ActorLocation).AdditionEqual(c)),
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
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !(
        !e.CharacterActorComponent ||
        !(e = e.CharacterActorComponent.Entity) ||
        !(e = e.GetComponent(51)) ||
        (e.EndCaught(), 0)
      )
    );
  }
  GetNotifyName() {
    return "抓取绑定";
  }
}
(TsAnimNotifyStateCaughtBinding.SphereTrace = void 0),
  (exports.default = TsAnimNotifyStateCaughtBinding);
//# sourceMappingURL=TsAnimNotifyStateCaughtBinding.js.map
