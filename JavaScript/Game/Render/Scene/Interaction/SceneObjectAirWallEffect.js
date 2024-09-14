"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneObjectAirWallEffect = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  SceneItemReferenceComponent_1 = require("../../../NewWorld/SceneItem/SceneItemReferenceComponent"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  EffectGlobal_1 = require("../../Effect/EffectGlobal"),
  PROFILE_KEY = "SceneObjectAirWallEffect_Update",
  RADIUS = 1;
class SceneObjectAirWallEffect {
  constructor() {
    (this.ActorToAttach = void 0),
      (this.IsReady = !1),
      (this.IsEnabled = !1),
      (this.BKs = Vector_1.Vector.Create()),
      (this.wKs = Vector_1.Vector.Create()),
      (this.bsr = void 0);
  }
  koe() {
    var e = UE.NewObject(UE.TraceSphereElement.StaticClass()),
      t =
        ((e.WorldContextObject = GlobalData_1.GlobalData.World),
        (e.bIsSingle = !1),
        (e.bIgnoreSelf = !0),
        (e.Radius = RADIUS),
        UE.NewArray(UE.BuiltinByte)),
      t =
        (t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet),
        (0, puerts_1.$ref)(t));
    e.SetObjectTypesQuery(t),
      EffectGlobal_1.EffectGlobal.SceneObjectAirWallEffectShowDebugTrace &&
        ((e.DrawTime = 5),
        e.SetDrawDebugTrace(2),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          e,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          e,
          ColorUtils_1.ColorUtils.LinearRed,
        )),
      (this.bsr = e);
  }
  GetActorLocation() {
    this.wKs.FromUeVector(this.ActorToAttach.K2_GetComponentLocation());
  }
  Start(e) {
    e && ((this.ActorToAttach = e), (this.IsReady = !0), this.koe());
  }
  AfterRegistered() {
    this.IsReady &&
      (this.GetActorLocation(),
      this.BKs.DeepCopy(this.wKs),
      (this.IsEnabled = !0));
  }
  BeforeUnregistered() {
    this.IsEnabled = !1;
  }
  Update(e) {
    if (this.IsEnabled && this.ActorToAttach?.IsValid()) {
      this.GetActorLocation();
      var t = this.bsr,
        r =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            t,
            this.BKs,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.wKs),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(t, PROFILE_KEY));
      const c = t.HitResult;
      if (r && c?.bBlockingHit) {
        const c = t.HitResult;
        var o = c.GetHitCount();
        for (let e = 0; e < o; e++) {
          var i,
            n,
            s = c.Actors.Get(e);
          -1 !== s.Tags.FindIndex(SceneItemReferenceComponent_1.AIR_WALL) &&
            ((i = Vector_1.Vector.Create()),
            TraceElementCommon_1.TraceElementCommon.GetImpactPoint(c, e, i),
            (n = Vector_1.Vector.Create()),
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(c, e, n),
            EventSystem_1.EventSystem.EmitWithTarget(
              s,
              EventDefine_1.EEventName.BulletHitAirWall,
              s,
              i,
              n,
            ));
        }
      }
      this.BKs.DeepCopy(this.wKs);
    }
  }
}
exports.SceneObjectAirWallEffect = SceneObjectAirWallEffect;
//# sourceMappingURL=SceneObjectAirWallEffect.js.map
