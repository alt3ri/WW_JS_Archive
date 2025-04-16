"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockOnController = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IUtil_1 = require("../../../UniverseEditor/Interface/IUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  HudUnitUtils_1 = require("../HudUnit/Utils/HudUnitUtils"),
  PROFILE_KEY = "LockOnController_IsBlock",
  SCENE_ITEM_ACTOR_KEY = "Center";
class LockOnController {
  static LockOnCircle(e, t, r, i) {
    var o = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(t, 63, o);
    let n = Number.MAX_VALUE,
      c = void 0;
    var s = e.D_K2_GetActorLocation();
    for (const f of o)
      if (this.IsValidLockOnTarget(f)) {
        var a = f.Entity.GetComponent(0);
        switch (a?.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
            continue;
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            if (
              void 0 === f.Entity.GetComponent(152) ||
              7 !== a.GetBaseInfo().Camp
            )
              continue;
            break;
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
          case Protocol_1.Aki.Protocol.kks.Proto_Monster:
            var l = f.Entity.GetComponent(2);
            if (l && this.CheckFriendCamp(l.Actor.Camp)) continue;
        }
        if (this.cY_(i, a?.GetBaseInfo()?.Category)) {
          var _ = this.GetLockOnTargetLocation(f),
            u = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
              _,
              this.jma,
            );
          if (u && !(this.jma.Size() > r)) {
            const t = s.op_Subtraction(_).Size();
            if (!(t > n)) {
              u = this.Coi(e, s, _);
              if (u?.bBlockingHit) {
                var _ = f.Entity.GetComponent(1).Owner,
                  u = u.Actors.Get(0),
                  C =
                    ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(
                      u,
                    );
                if (_ !== u && _ !== C) continue;
              }
              (n = t), (c = f);
            }
          }
        }
      }
    return c;
  }
  static cY_(e, t) {
    if (!e || 0 === e.length) return !0;
    if (void 0 !== t)
      for (const r of e) if ((0, IUtil_1.matchCategory)(r, t)) return !0;
    return !1;
  }
  static Coi(e, t, r) {
    if (
      (this.uoe ||
        ((this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.bIsSingle = !0),
        (this.uoe.bIgnoreSelf = !0),
        this.uoe.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
        )),
      (this.uoe.WorldContextObject = e),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, r),
      TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY))
    )
      return this.uoe.HitResult;
  }
  static CheckFriendCamp(e) {
    return 0 === e || 2 === e || 4 === e;
  }
  static GetLockOnTargetLocation(e) {
    let t = void 0;
    var r = e.Entity.GetComponent(200);
    return (t =
      (t =
        r &&
        (r = r.GetInteractionMainActor()) &&
        (r = r.GetActorByKey(SCENE_ITEM_ACTOR_KEY))
          ? r.D_K2_GetActorLocation()
          : t) || e.Entity.GetComponent(1).ActorLocation);
  }
  static IsValidLockOnTarget(e) {
    var t;
    return (
      !!e?.Valid &&
      !(
        !e?.IsInit ||
        !e?.Entity?.Active ||
        (t = e.Entity.GetComponent(0))?.GetRemoveState() ||
        !t?.GetVisible() ||
        ((t = e.Entity.GetComponent(203)) &&
          t.HasAnyTag([1008164187, -1243968098]))
      )
    );
  }
}
((exports.LockOnController = LockOnController).jma = new Vector2D_1.Vector2D()),
  (LockOnController.uoe = void 0);
//# sourceMappingURL=LockOnController.js.map
