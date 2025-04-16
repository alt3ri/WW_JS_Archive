"use strict";
var RoleSceneInteractComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, o) {
      var s,
        r = arguments.length,
        h =
          r < 3
            ? i
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(i, e))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, i, e, o);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (s = t[n]) &&
            (h = (r < 3 ? s(h) : 3 < r ? s(i, e, h) : s(i, e)) || h);
      return 3 < r && h && Object.defineProperty(i, e, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSceneInteractComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RoleSceneInteractController_1 = require("../../../../Module/CombatMessage/RoleSceneInteractController"),
  SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController"),
  PortalUtils_1 = require("../../../../Utils/PortalUtils"),
  GrapplingHookPointComponent_1 = require("../../Custom/Components/GrapplingHookPointComponent"),
  updateTargetSkillIds = new Set([
    100020, 100021, 100022, 200004, 50170004, 501700042, 501700043, 501700044,
    501700045, 50170001, 501700011, 50180004, 210130, 100024,
  ]),
  TRACE_TAG_NAME = "RoleSceneInteract",
  PROFILE_KEY = "RoleSceneInteractComponent_FindBestTarget",
  MIN_DIST = 500,
  MIN_DIST_SQUARED = MIN_DIST * MIN_DIST,
  MIN_LEFT_RIGHT = 0.4142,
  MIN_UP_DOWN = 0.38,
  MIN_LEFT_RIGHT_SCALE = 0.33,
  MIN_UP_DOWN_SCALE = 0.28,
  LEFT_RIGHT_SCALE = MIN_UP_DOWN / MIN_LEFT_RIGHT,
  DEFAULT_MIN_LENGTH = 1 / 0,
  HOOK_VISION_ID = 1001,
  SPHERE_TRACE_RADIUS = 5,
  DEFAULT_GAZE_IN_DIST = 400,
  DEFAULT_GAZE_HEIGHT = 3e3,
  DEFAULT_GAZE_RADIUS = 3e3;
class HookPointInfo {
  constructor(t, i = 0, e = !0) {
    (this.Point = t), (this.PortalPairId = i), (this.PortalA2B = e);
  }
}
class HookPointUtils {
  static HookPointEqual(t, i) {
    return (
      t.Point === i.Point &&
      t.PortalPairId === i.PortalPairId &&
      t.PortalA2B === i.PortalA2B
    );
  }
  static HookPointSetAdd(
    t,
    i,
    e = i instanceof HookPointInfo ? i.PortalPairId : 0,
    o = !(i instanceof HookPointInfo) || i.PortalA2B,
  ) {
    var s = i instanceof HookPointInfo ? i.Point : i;
    let r = t.get(s);
    if (r) {
      if (-1 !== r.findIndex((t, i) => t[0] === e && t[1] === o)) return t;
    } else (r = []), t.set(s, r);
    return r.push([e, o]), t;
  }
  static HookPointSetHas(
    t,
    i,
    e = i instanceof HookPointInfo ? i.PortalPairId : 0,
    o = !(i instanceof HookPointInfo) || i.PortalA2B,
  ) {
    var s = i instanceof HookPointInfo ? i.Point : i,
      t = t?.get(s);
    return !!t && -1 !== t.findIndex((t, i) => t[0] === e && t[1] === o);
  }
  static HookPointSetDelete(
    t,
    i,
    e = i instanceof HookPointInfo ? i.PortalPairId : 0,
    o = !(i instanceof HookPointInfo) || i.PortalA2B,
  ) {
    var s,
      r = i instanceof HookPointInfo ? i.Point : i,
      h = t.get(r);
    return (
      !!h &&
      (-1 !== (s = h.findIndex((t, i) => t[0] === e && t[1] === o)) &&
        h.splice(s, 1),
      0 === h.length && t.delete(r),
      -1 !== s)
    );
  }
  static HookPointSetForEach(t, e) {
    t?.forEach((t, i) => {
      t.forEach((t) => {
        e(i, t[0], t[1]);
      });
    });
  }
}
let RoleSceneInteractComponent =
  (RoleSceneInteractComponent_1 = class RoleSceneInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.won = void 0),
        (this.jWs = Vector_1.Vector.Create()),
        (this.kue = Vector_1.Vector.Create()),
        (this.WWs = Vector_1.Vector.Create()),
        (this.KWs = Vector_1.Vector.Create()),
        (this.QWs = Vector_1.Vector.Create()),
        (this.$Ws = Vector_1.Vector.Create()),
        (this.YWs = Vector_1.Vector.Create()),
        (this.chh = Transform_1.Transform.Create()),
        (this.JWs = Vector_1.Vector.Create()),
        (this.zWs = Vector_1.Vector.Create()),
        (this.ZWs = new Map()),
        (this.Gon = !1),
        (this.eKs = new Map()),
        (this.Oon = void 0),
        (this.Lul = !1),
        (this.kon = (t) => {
          this.Hte?.IsAutonomousProxy &&
            updateTargetSkillIds.has(t) &&
            (void 0 === this.Hon || void 0 === this.Hon.Point
              ? Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  31,
                  "使用技能时，没有选中的钩锁点，请检查技能Id配置",
                  ["SkillId", t],
                )
              : ((this.Die = this.Hon),
                (this.SimulateHookTargetEntity = void 0),
                (this.SimulateHookTargetLocation = void 0),
                (this.tKs.length = 0),
                (t = this.tKs),
                (this.tKs = this.iKs),
                (this.iKs = t),
                (this.rKs = 0),
                (this.Lul = !!this.Die?.Point.GazeNextPointAfterInteract),
                this.SetIsHookEndByInterrupt(!1),
                this.Die.Point.TryStartCd(),
                this.jon(),
                this.Won(),
                CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraHook(),
                (this.Kon = !0),
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.RemoveEntity,
                  this.Fm,
                )));
        }),
        (this.Qon = (t, i) => {
          this.Hte?.IsAutonomousProxy &&
            updateTargetSkillIds.has(i) &&
            (void 0 === this.Die || void 0 === this.Die.Point
              ? Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  31,
                  "使用技能时，没有选中的钩锁点，请检查技能Id配置",
                  ["SkillId", i],
                )
              : (HookPointUtils.HookPointSetForEach(this.oKs, (t, i, e) => {
                  HookPointUtils.HookPointSetAdd(this.eKs, t, i, e);
                }),
                HookPointUtils.HookPointSetForEach(this.$on, (t, i, e) => {
                  HookPointUtils.HookPointSetAdd(this.eKs, t, i, e);
                }),
                this.Die?.Point?.Valid &&
                  (HookPointUtils.HookPointSetAdd(
                    this.eKs,
                    this.Die.Point,
                    this.Die.PortalPairId,
                    this.Die.PortalA2B,
                  ),
                  this.Die.Point.ChangeHookPointState(0),
                  this.zlh()),
                EventSystem_1.EventSystem.Has(
                  EventDefine_1.EEventName.RemoveEntity,
                  this.Fm,
                ) &&
                  EventSystem_1.EventSystem.Remove(
                    EventDefine_1.EEventName.RemoveEntity,
                    this.Fm,
                  ),
                (this.Die = void 0),
                (this.tKs.length = 0),
                (this.rKs = -1),
                (this.Jon = void 0),
                (this.SimulateHookTargetEntity = void 0),
                (this.SimulateHookTargetLocation = void 0),
                this.zon.clear(),
                (this.Kon = !1),
                (this.Lul = !1)));
        }),
        (this.vgl = (t, i) => {
          t === this.Entity.Id &&
            updateTargetSkillIds.has(i) &&
            this.SetIsHookEndByInterrupt(!0);
        }),
        (this.Fm = (t, i) => {
          if (i.Id === this.Die?.Point.Entity.Id) {
            var e = this.Entity.GetComponent(39);
            this.SetIsHookEndByInterrupt(!0);
            for (const o of updateTargetSkillIds)
              e.EndSkill(o, "CurrentTarget is Remove");
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                31,
                "钩锁点在勾的时候被删除，请检查配置",
                ["PbDataId", i.Entity.GetComponent(0)?.GetPbDataId()],
              );
          }
        }),
        (this.Die = void 0),
        (this.Zon = !1),
        (this.ern = !1),
        (this.Hon = void 0),
        (this.Jon = void 0),
        (this.SimulateHookTargetEntity = void 0),
        (this.SimulateHookTargetLocation = void 0),
        (this.oKs = new Map()),
        (this.$on = new Map()),
        (this.tKs = []),
        (this.rKs = -1),
        (this.iKs = []),
        (this.nKs = new Map()),
        (this.zon = new Map()),
        (this.bsr = void 0),
        (this.orn = !0),
        (this.Lie = void 0),
        (this.rrn = !1),
        (this.Kon = !1),
        (this.Jlh = !1),
        (this.sKs = !1),
        (this.aKs = void 0),
        (this.hKs = []),
        (this.lKs = DEFAULT_MIN_LENGTH),
        (this.a7r = () => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
          HOOK_VISION_ID
            ? ((this.Gon = !1),
              this.rrn &&
                this.Von(
                  !0,
                  this.Hon?.Point.GetTagId(),
                  "切换到钩锁技能且NeedAddTag为真时，添加定点钩索可用标签",
                ))
            : ((this.Gon = !0),
              this.Von(!1, void 0, "切换到非钩锁技能时，删除定点钩索可用标签"),
              this.Hon &&
                (this.Hon.Point.ChangeHookPointState(0), (this.Hon = void 0)));
        });
    }
    static get Dependencies() {
      return [3, 18];
    }
    get NeedChangeTargetState() {
      return this.orn;
    }
    set NeedChangeTargetState(t) {
      (this.orn = t) &&
        this.Hon?.Point &&
        this.Hon.Point.ChangeHookPointState(this.ern ? 1 : 2);
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.won = this.Entity.GetComponent(42)),
        (this.Lie = this.Entity.GetComponent(203)),
        this.Lie.ListenForTagAddOrRemove(283451623, (t, i) => {
          i &&
            (this.Hon && this.arn(this.Hon),
            (this.Hon = void 0),
            (this.hKs.length = 0));
        }),
        this.Hte.IsRoleAndCtrlByMe ||
          this.Disable("[RoleSceneInteractComponent.OnStart] 模拟端"),
        this.InitTraceInfo(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.a7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharInterruptSkill,
          this.vgl,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeforeSkillWithTarget,
          this.kon,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.Qon,
        ),
        !0
      );
    }
    InitTraceInfo() {
      (this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.bsr.WorldContextObject = this.Hte.Owner),
        (this.bsr.bIsSingle = !1),
        (this.bsr.bIgnoreSelf = !0),
        this.bsr.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
        ),
        (this.bsr.Radius = SPHERE_TRACE_RADIUS);
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.a7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharInterruptSkill,
          this.vgl,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeforeSkillWithTarget,
          this.kon,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.Qon,
        ),
        !0
      );
    }
    OnTick(t) {
      if (Global_1.Global.BaseCharacter === this.Hte.Actor)
        if (RoleSceneInteractComponent_1.f7r) {
          if (
            ModelManager_1.ModelManager.CameraModel &&
            !this.Lie.HasTag(283451623)
          ) {
            this.hrn(), this.Rul();
            for (var [i] of this.eKs)
              i?.Valid || HookPointUtils.HookPointSetDelete(this.eKs, i);
          }
        } else
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            HOOK_VISION_ID,
          ) && (RoleSceneInteractComponent_1.f7r = !0);
    }
    hrn() {
      let t = !1,
        i = !1;
      this.bsr.SetDrawDebugTrace(
        RoleSceneInteractComponent_1.TraceDebug ? 1 : 0,
      ),
        this._rn(),
        (t = this.sKs),
        (e = this.aKs),
        (this.iKs.length = 0);
      var e,
        o = this.iKs;
      (this.iKs = this.hKs),
        (this.hKs = o),
        t &&
          this.won?.Valid &&
          ((o = this.won.GetVisionIdList()),
          (t = o.Contains(HOOK_VISION_ID)),
          (i = !0)),
        (this.Zon === t && this.Hon?.Point === e?.Point && this.ern === i) ||
          ((o = this.Hon),
          (this.Hon = e),
          (this.ern = i),
          (this.Zon = t),
          o?.Point.Valid &&
            o.Point !== e?.Point &&
            o.Point.ChangeHookPointState(0),
          this.Hon
            ? (this.NeedChangeTargetState &&
                this.Hon.Point.ChangeHookPointState(i ? 1 : 2),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleFindFixHook,
                !0,
                this.Hon.Point.HookLocation,
              ))
            : o && this.arn(o),
          void 0 !== this.Hon && i
            ? ModelManager_1.ModelManager.RouletteModel
                .CurrentExploreSkillId !== HOOK_VISION_ID
              ? (this.rrn = !0)
              : t
                ? (this.Von(
                    !0,
                    this.Hon?.Point.GetTagId(),
                    "当前选中的钩锁点有效, 且不需要切换技能",
                  ),
                  this.gOc(!0))
                : (ModelManager_1.ModelManager.ExploreModel
                    .AutoResetSkillFinished &&
                    this.Von(
                      !1,
                      void 0,
                      "当前选中的钩锁点无效，且不需要切换技能",
                    ),
                  this.gOc(!1))
            : ((this.rrn = !1),
              ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished &&
                this.Von(!1, void 0, "当前未选中点，且不需要切换技能"),
              this.gOc(!1))),
        this.crn();
    }
    arn(t) {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleFindFixHook,
        !1,
        void 0,
      );
    }
    IsInInteractArea(t) {
      return HookPointUtils.HookPointSetHas(this.ZWs, t);
    }
    _rn() {
      if (
        ((this.sKs = !1),
        (this.aKs = void 0),
        (this.lKs = DEFAULT_MIN_LENGTH),
        (this.hKs.length = 0),
        this.ZWs.clear(),
        this.nKs.clear(),
        this.bsr)
      ) {
        let [o, s] = this.uKs(),
          r = 0,
          h = !0;
        ModelManager_1.ModelManager.PortalModel?.GetPortals().forEach(
          (t, i) => {
            var e = this.cKs(i, !0),
              e =
                (e[1] && ((o = e[0]), (s = e[1]), (r = i), (h = !0)),
                this.cKs(i, !1));
            e[1] && ((o = e[0]), (s = e[1]), (r = i), (h = !1));
          },
        ),
          s && ((this.sKs = o), (this.aKs = new HookPointInfo(s, r, h))),
          this.oKs.clear();
        var t = this.oKs;
        (this.oKs = this.$on), (this.$on = t);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Interaction", 6, "RoleInteract: Missing SphereTrace");
    }
    uKs() {
      if (!this.bsr) return [!1, void 0];
      var t = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
      if (!t) return [!1, void 0];
      this.jWs.FromUeVector(t.D_K2_GetActorLocation()),
        this.kue.FromUeVector(t.GetActorForwardVector()),
        this.WWs.FromUeVector(t.GetActorRightVector()),
        this.KWs.FromUeVector(t.GetActorUpVector());
      var i,
        e,
        o,
        s = this.jWs,
        r = this.kue,
        h = this.WWs,
        n = this.KWs,
        a = Math.tan(MathUtils_1.MathUtils.DegToRad * t.FOVAngle),
        _ = Math.tan(
          MathUtils_1.MathUtils.DegToRad * (t.FOVAngle / t.AspectRatio),
        ),
        l = (this.QWs.FromConfigVector(this.Hte.ActorLocationProxy), this.QWs);
      let c = [!1, void 0],
        d = !0;
      for (const v of GrapplingHookPointComponent_1.GrapplingHookPointComponent
        .AllPoints)
        if (v.CheckCondition()) {
          if (
            v.WasRecentlyRenderOnScreen() &&
            this.x1h(v.MatchRoleOption) &&
            !v.IsInCd &&
            !v.Entity.GetComponent(131)?.IsInState(3) &&
            !(
              v.IsHookDisabled ||
              (v === this.Die?.Point &&
                0 === this.Die.PortalPairId &&
                this.Die.PortalA2B)
            )
          ) {
            if (v.UseRangeComponent) {
              if (!v.Entity.GetComponent(84)?.IsOverlappingPlayer()) continue;
            } else if (
              Vector_1.Vector.DistSquared(v.TriggerLocation, l) >
              v.RadiusSquared
            ) {
              HookPointUtils.HookPointSetDelete(this.eKs, v);
              continue;
            }
            HookPointUtils.HookPointSetAdd(this.$on, v),
              Vector_1.Vector.DistSquared(v.HookLocation, l) < MIN_DIST_SQUARED
                ? HookPointUtils.HookPointSetDelete(this.zon, v)
                : (v.CameraGaze &&
                    0 <= v.CameraGaze.LockPriority &&
                    !HookPointUtils.HookPointSetHas(this.oKs, v) &&
                    !HookPointUtils.HookPointSetHas(this.eKs, v) &&
                    HookPointUtils.HookPointSetAdd(this.nKs, v),
                  (i = this.$Ws),
                  v.HookLocation.Subtraction(s, i),
                  (e = i.DotProduct(r)) <= 0 ||
                    ((o = i.DotProduct(h)),
                    Math.abs(o / e) >
                      Math.min(
                        a,
                        this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT,
                      )) ||
                    ((i = i.DotProduct(n)),
                    Math.abs(i / e) >
                      Math.min(
                        _,
                        this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN,
                      )) ||
                    (HookPointUtils.HookPointSetAdd(this.ZWs, v),
                    (e =
                      MathUtils_1.MathUtils.Square(o * LEFT_RIGHT_SCALE) +
                      MathUtils_1.MathUtils.Square(i)),
                    this.lKs <= e) ||
                    (d &&
                      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                        this.bsr,
                        l,
                      ),
                      (d = !1)),
                    TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                      this.bsr,
                      v.HookLocation,
                    ),
                    (o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                      this.Hte.Actor.CapsuleComponent,
                      this.bsr,
                      TRACE_TAG_NAME,
                      PROFILE_KEY,
                    )),
                    (o = this.rAl(o, v, this.bsr.HitResult)),
                    (this.lKs = e),
                    (this.hKs.length = 0),
                    this.hKs.push([
                      this.Hte.ActorLocationProxy,
                      v.HookLocation,
                    ]),
                    (c = [!o, v])));
          }
        } else
          v !== this.Die?.Point ||
            this.Kon ||
            (v.ChangeHookPointState(0),
            (this.Die = void 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoleFindFixHook,
              !1,
              void 0,
            ));
      return c;
    }
    cKs(t, i) {
      if (!this.bsr) return [!1, void 0];
      var e = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
      if (!e) return [!1, void 0];
      if (!t) return [!1, void 0];
      var o = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
      if (!o || !o.Portal1Enable || !o.Portal2Enable) return [!1, void 0];
      var s =
        ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          t,
        )?.Entity?.GetComponent(213);
      if (!s) return [!1, void 0];
      var r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
        s.GetPairCreatureDataId(),
      )?.Entity?.GetComponent(213);
      if (!r) return [!1, void 0];
      this.chh.FromUeTransform(
        i ? o.PortalWorldTransform1 : o.PortalWorldTransform2,
      );
      var h = this.chh,
        n = (i ? s : r).PortalBounds,
        a = h.GetLocation(),
        _ = (h.GetRotation().GetForwardVector(this.YWs), this.YWs),
        o = this.Hte.ActorLocationProxy,
        l = this.QWs,
        s =
          (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, t, i, l),
          e.D_GetTransform()),
        r = PortalUtils_1.PortalUtils.GetMappingTransformToOtherPortal(s, t, i),
        c = this.jWs,
        o =
          (c.FromUeVector(r.GetLocation()),
          MathUtils_1.MathUtils.CommonTempQuat),
        d = (o.FromUeQuat(r.GetRotation()), this.kue),
        v = (o.GetForwardVector(d), this.WWs),
        I = (o.GetRightVector(v), this.KWs),
        s =
          (o.GetUpVector(I), MathUtils_1.MathUtils.DegToRad * (e.FOVAngle / 2)),
        E = Math.tan(s),
        u = Math.tan(s * e.AspectRatio);
      let C = [!1, void 0];
      for (const g of GrapplingHookPointComponent_1.GrapplingHookPointComponent
        .AllPoints)
        if (g.CheckCondition()) {
          if (
            g.WasRecentlyRenderOnScreen() &&
            this.x1h(g.MatchRoleOption) &&
            !g.IsInCd &&
            !(
              g.Entity.GetComponent(131)?.IsInState(3) ||
              "FixedPointHook" !== g.GetHookInteractType() ||
              g.IsHookDisabled ||
              (g === this.Die?.Point &&
                t === this.Die.PortalPairId &&
                i === this.Die.PortalA2B)
            )
          ) {
            var T = Vector_1.Vector.DistSquared(g.HookLocation, l);
            if (T > g.RadiusSquared)
              HookPointUtils.HookPointSetDelete(this.eKs, g, t, i);
            else if (
              (HookPointUtils.HookPointSetAdd(this.$on, g, t, i),
              T < MIN_DIST_SQUARED)
            )
              HookPointUtils.HookPointSetDelete(this.zon, g, t, i);
            else {
              g.CameraGaze &&
                0 <= g.CameraGaze.LockPriority &&
                !HookPointUtils.HookPointSetHas(this.oKs, g, t, i) &&
                !HookPointUtils.HookPointSetHas(this.eKs, g, t, i) &&
                HookPointUtils.HookPointSetAdd(this.nKs, g, t, i);
              var T = this.$Ws,
                f = (g.HookLocation.Subtraction(c, T), T.DotProduct(d));
              if (!(f <= 0)) {
                var m = T.DotProduct(v),
                  M = Math.abs(m / f);
                if (
                  !(
                    M >
                    Math.min(
                      E,
                      this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT,
                    )
                  )
                ) {
                  (M = T.DotProduct(I)), (T = Math.abs(M / f));
                  if (
                    !(
                      T >
                      Math.min(u, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)
                    )
                  ) {
                    f = this.JWs;
                    if (
                      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
                        this.Hte.ActorLocationProxy,
                        PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
                          g.Entity.GetComponent(1).ActorLocationProxy,
                          t,
                          !i,
                          MathUtils_1.MathUtils.CommonTempVector,
                        ),
                        a,
                        _,
                        f,
                      )
                    ) {
                      h.InverseTransformPosition(
                        f,
                        MathUtils_1.MathUtils.CommonTempVector,
                      );
                      T = MathUtils_1.MathUtils.CommonTempVector;
                      if (
                        !(
                          Math.abs(T.Y) > Math.abs(n.Y) ||
                          Math.abs(T.Z) > Math.abs(n.Z)
                        )
                      ) {
                        (T = this.zWs),
                          (m =
                            (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
                              f,
                              t,
                              i,
                              T,
                            ),
                            HookPointUtils.HookPointSetAdd(this.ZWs, g, t, i),
                            MathUtils_1.MathUtils.Square(m * LEFT_RIGHT_SCALE) +
                              MathUtils_1.MathUtils.Square(M)));
                        if (!(this.lKs <= m)) {
                          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                            this.bsr,
                            this.Hte.ActorLocation,
                          ),
                            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                              this.bsr,
                              f,
                            );
                          let t = !1;
                          (t =
                            TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                              this.Hte.Actor.CapsuleComponent,
                              this.bsr,
                              TRACE_TAG_NAME,
                              PROFILE_KEY,
                            )) ||
                            (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                              this.bsr,
                              T,
                            ),
                            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                              this.bsr,
                              g.HookLocation,
                            ),
                            (t =
                              TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                                this.Hte.Actor.CapsuleComponent,
                                this.bsr,
                                TRACE_TAG_NAME,
                                PROFILE_KEY,
                              ))),
                            (t = this.rAl(t, g, this.bsr.HitResult)),
                            (this.lKs = m),
                            (this.hKs.length = 0),
                            this.hKs.push([
                              this.Hte.ActorLocationProxy,
                              Vector_1.Vector.Create(f),
                            ]),
                            this.hKs.push([
                              Vector_1.Vector.Create(T),
                              g.HookLocation,
                            ]),
                            (C = [!t, g]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else
          g !== this.Die?.Point ||
            this.Kon ||
            (g.ChangeHookPointState(0),
            (this.Die = void 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoleFindFixHook,
              !1,
              void 0,
            ));
      return C;
    }
    crn() {
      var t = ModelManager_1.ModelManager.CameraModel;
      if (
        (HookPointUtils.HookPointSetForEach(this.zon, (t, i, e) => {
          HookPointUtils.HookPointSetHas(this.oKs, t, i, e) &&
            HookPointUtils.HookPointSetDelete(this.zon, t, i, e);
        }),
        HookPointUtils.HookPointSetForEach(this.nKs, (t, i, e) => {
          HookPointUtils.HookPointSetAdd(this.zon, t, i, e);
        }),
        this.nKs.clear(),
        this.Jon &&
          (t.FightCamera.LogicComponent.CameraGuideController.IsBlending ||
            HookPointUtils.HookPointSetDelete(this.zon, this.Jon),
          HookPointUtils.HookPointSetHas(this.zon, this.Jon) ||
            (this.Jon = void 0)),
        !(this.Jon ?? 0 === this.zon.size))
      ) {
        let s = -1;
        const r = void 0 !== this.Die;
        HookPointUtils.HookPointSetForEach(this.zon, (t, i, e) => {
          var o = t.CameraGaze.GazeInHook;
          0 === i &&
            (o && !r
              ? HookPointUtils.HookPointSetDelete(this.zon, t, i, e)
              : t.CameraGaze.LockPriority > s &&
                ((this.Jon = new HookPointInfo(t, i, e)),
                (s = t.CameraGaze.LockPriority)));
        }),
          this.Jon &&
            CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(
              this.Jon.Point,
            );
      }
    }
    CanActivateFixHook() {
      return this.Zon && void 0 !== this.Hon && this.Die !== this.Hon;
    }
    GetCurrentTargetEntity() {
      return this.Hte?.IsAutonomousProxy
        ? this.Die
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(
              this.Die.Point.Entity.Id,
            )
          : void 0
        : this.SimulateHookTargetEntity;
    }
    GetCurrentTargetLocation() {
      let t = void 0;
      return (
        (t = this.Hte?.IsAutonomousProxy
          ? this.Die?.Point.HookLocation
          : (this.SimulateHookTargetEntity?.Entity?.GetComponent(83)
              ?.HookLocation ?? this.SimulateHookTargetLocation)) ??
        this.Hte.ActorLocationProxy
      );
    }
    OnRoleBeforeTeleportThroughPortal() {
      if (
        this.Lie?.HasTag(-1009010563) &&
        !(0 <= this.rKs && this.rKs + 1 < this.tKs.length)
      ) {
        var t = this.Entity.GetComponent(39);
        for (const i of updateTargetSkillIds)
          t.EndSkill(i, "Portal Stop skill (fix hook without portal)");
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            39,
            "没有透过传送门勾取钩锁点，但勾的过程中穿过传送门，请检查钩锁点是否离传送门过近",
            ["PbDataId", this.Die?.Point.Entity.GetComponent(0)?.GetPbDataId()],
          );
      }
    }
    OnRoleTeleportThroughPortal() {
      this.Lie?.HasTag(-1009010563) &&
        0 <= this.rKs &&
        this.rKs + 1 < this.tKs.length &&
        (this.rKs += 1);
    }
    GetIsInLastPathway() {
      return (
        !(0 <= this.rKs && this.rKs < this.tKs.length) ||
        this.rKs >= this.tKs.length - 1
      );
    }
    GetCurrentPathwayEndLocation() {
      let t = void 0;
      return (
        (t =
          this.Hte?.IsAutonomousProxy &&
          0 <= this.rKs &&
          this.rKs < this.tKs.length
            ? this.tKs[this.rKs][1]
            : t) ??
        this.Die?.Point.HookLocation ??
        this.Hte.ActorLocationProxy
      );
    }
    GetCurrentPathways() {
      return this.tKs;
    }
    GetCurrentTargetEnterPortalCapture() {
      if (this.Die?.Point && this.Die.PortalPairId) {
        var t,
          i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
            this.Die.PortalPairId,
          )?.Entity?.GetComponent(213);
        if (i)
          return (
            (i = i?.PortalCapture),
            this.Die.PortalA2B
              ? i
              : ((t = (0, puerts_1.$ref)(void 0)),
                i?.GetPair(t),
                (0, puerts_1.$unref)(t))
          );
      }
    }
    GetCurrentTargetExitPortalCapture() {
      if (this.Die?.Point && this.Die.PortalPairId) {
        var t,
          i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
            this.Die.PortalPairId,
          )?.Entity?.GetComponent(213);
        if (i)
          return (
            (i = i?.PortalCapture),
            this.Die.PortalA2B
              ? i
              : ((t = (0, puerts_1.$ref)(void 0)),
                i?.GetPair(t),
                (0, puerts_1.$unref)(t))
          );
      }
    }
    GetNextTarget() {
      return this.Hon?.Point;
    }
    GetCurrentTarget() {
      return this.Die?.Point;
    }
    GetCurrentTargetActor() {
      return this.Die?.Point.Entity.GetComponent(1)?.Owner;
    }
    GetNextTargetLocation() {
      return this.Hon.Point.HookLocation.ToUeVector();
    }
    GetNextTargetVector() {
      return this.Hon.Point.HookLocation;
    }
    GetInheritSpeed() {
      return this.Die.Point.InheritSpeed;
    }
    GetIsClimb() {
      return this.Die.Point.IsClimb;
    }
    GetCurrentTargetForward() {
      var t = this.Die.Point.Entity.GetComponent(0);
      return t?.Valid
        ? t
            .GetRotation()
            .RotateVectorDouble(Vector_1.Vector.ForwardVectorDouble)
        : this.Hte.ActorForward;
    }
    IsLegalExceptSkill() {
      return this.ern;
    }
    GetTargetIsSuiGuangType() {
      var t = this.Die?.Point?.GetHookInteractType();
      return !!t && "SuiGuangHook" === t;
    }
    GetTargetType() {
      var t = this.Die?.Point?.GetHookInteractType();
      return t ? (RoleSceneInteractComponent_1.dth.get(t) ?? 0) : 0;
    }
    SetIsHookEndByInterrupt(t) {
      this.Jlh = t;
    }
    Von(t, i, e) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          31,
          "[RoleSceneInteractComponent]AddOrRemoveHookTag",
          ["reason", e],
          ["isAdd", t],
          ["EntityId", this.Entity.Id],
        );
      var o = this.Oon;
      t
        ? (o &&
            i !== o &&
            this.Lie.HasTag(o) &&
            (this.Lie.RemoveTag(o), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Character",
              31,
              "[RoleSceneInteractComponent] 添加定点钩索可用标签时删除旧的定点钩索标签",
              ["reason", e],
              ["EntityId", this.Entity.Id],
              ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o)],
            ),
          i &&
            !this.Lie.HasTag(i) &&
            (this.Lie.AddTag(i), (this.Oon = i), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Character",
              31,
              "[RoleSceneInteractComponent] 添加定点钩索可用标签",
              ["reason", e],
              ["EntityId", this.Entity.Id],
              ["Tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i)],
            ))
        : this.Oon &&
          this.Lie.HasTag(this.Oon) &&
          (this.Lie.RemoveTag(this.Oon),
          (this.Oon = void 0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Character",
            31,
            "[RoleSceneInteractComponent] 删除定点钩索可用标签",
            ["reason", e],
            ["EntityId", this.Entity.Id],
            ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o)],
          );
    }
    gOc(t) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          31,
          "[RoleSceneInteractComponent]UpdateHookHighlightTag",
          ["add", t],
          ["EntityId", this.Entity.Id],
        );
      var i = 1734819366;
      t
        ? this.Lie.HasTag(i) || this.Lie.AddTag(i)
        : this.Lie.HasTag(i) && this.Lie.RemoveTag(i);
    }
    jon() {
      this.Hte.IsAutonomousProxy &&
        RoleSceneInteractController_1.RoleSceneInteractController.SendHookMoveRequest(
          this.Entity,
          this.Die.Point,
        );
    }
    Won() {
      var t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.dms.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(
            this.Die.Point.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        Net_1.Net.Call(22794, t, (t) => {
          switch (t.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointLocked:
              break;
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 31, "钩锁点不存在", [
                  "EntityId",
                  this.Die.Point.Entity.GetComponent(0).GetCreatureDataId(),
                ]);
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                26394,
              );
          }
          if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            var i = this.Entity.GetComponent(39);
            this.SetIsHookEndByInterrupt(!0);
            for (const e of updateTargetSkillIds)
              i.EndSkill(e, "HookLockPointRequest请求返回错误，终止钩锁技能");
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 39, "请求勾钩锁返回错误", [
                "PbDataId",
                this.Die?.Point.Entity.GetComponent(0)?.GetPbDataId(),
              ]);
          }
        }));
    }
    zlh() {
      if (this.Die?.Point && this.Hte.IsAutonomousProxy) {
        var t = this.Die.Point.Entity.GetComponent(0).GetCreatureDataId();
        const i = Protocol_1.Aki.Protocol.DC_.create();
        if (
          ((i.F4n = MathUtils_1.MathUtils.NumberToLong(t)),
          (i.Zlh = this.Jlh
            ? Protocol_1.Aki.Protocol.Zlh.Proto_Midway
            : Protocol_1.Aki.Protocol.Zlh.Proto_Endpoint),
          Net_1.Net.Call(24465, i, (t) => {}),
          this.Die?.Point.WillBeDestroyedAfterHook)
        ) {
          const i = Protocol_1.Aki.Protocol.Wgs.create();
          (i.F4n = MathUtils_1.MathUtils.NumberToLong(t)),
            Net_1.Net.Call(27851, i, (t) => {});
        } else
          this.Die?.Point.WillBeHideAfterHook &&
            ((t = this.Die.Point.Entity),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              t,
              !1,
              "RoleSceneInteractComponent.SendHookDestroyRequest",
              !0,
            ));
      }
    }
    Rul() {
      if (this.Lul && ModelManager_1.ModelManager.CameraModel && this.Die) {
        var t = this.Die.Point.GazeNextPointAfterInteract;
        if (
          t &&
          !(
            Vector_1.Vector.DistSquared(
              this.Hte.ActorLocationProxy,
              this.Die.Point.HookLocation,
            ) >
            MathUtils_1.MathUtils.Square(
              t?.GazeCondition?.GazeInDistance || DEFAULT_GAZE_IN_DIST,
            )
          )
        ) {
          this.Lul = !1;
          var i,
            e = new Map(),
            o = Quat_1.Quat.Create(),
            s =
              (ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
                o,
              ),
              o.Inverse(o),
              t?.GazeCondition?.ScanRange?.Height ?? DEFAULT_GAZE_HEIGHT),
            t =
              (t?.GazeCondition?.ScanRange?.Radius ?? DEFAULT_GAZE_RADIUS) / s;
          this.Uul(
            ModelManager_1.ModelManager.CameraModel.CameraLocation,
            o,
            s,
            t,
            t,
            e,
          );
          for ([, i] of e)
            if (
              i !== this.Die.Point &&
              i.GetHookInteractType() === this.Die.Point.GetHookInteractType()
            ) {
              CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(
                i,
                this.Die.Point,
              );
              break;
            }
        }
      }
    }
    Uul(t, i, e, o, s, r, h = !0, n = !1) {
      h && r.clear();
      var a = this.Hte.ActorLocationProxy,
        _ = o * o,
        l = s * s;
      let c = !0;
      for (const I of GrapplingHookPointComponent_1.GrapplingHookPointComponent
        .AllPoints)
        if (I.CheckCondition()) {
          if (
            I.WasRecentlyRenderOnScreen() &&
            !I.IsInCd &&
            !I.Entity.GetComponent(131)?.IsInState(3) &&
            (I !== this.Die?.Point ||
              0 !== this.Die.PortalPairId ||
              !this.Die.PortalA2B)
          ) {
            var d = this.$Ws;
            if (
              (I.HookLocation.Subtraction(t, d),
              i.RotateVector(d, d),
              !(d.X <= 0 || d.X > e))
            ) {
              var v = d.Y / d.X,
                d = d.Z / d.X;
              if (!(1 < (v * v) / _ + (d * d) / l)) {
                c &&
                  (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                    this.bsr,
                    a,
                  ),
                  (c = !1)),
                  TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                    this.bsr,
                    I.HookLocation,
                  );
                (v = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                  this.Hte.Actor.CapsuleComponent,
                  this.bsr,
                  TRACE_TAG_NAME,
                  PROFILE_KEY,
                )),
                  (v = this.rAl(v, I, this.bsr.HitResult));
                if (!v && (r.set(I.Entity.Id, I), n)) return;
              }
            }
          }
        } else
          I !== this.Die?.Point ||
            this.Kon ||
            (I.ChangeHookPointState(0),
            (this.Die = void 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoleFindFixHook,
              !1,
              void 0,
            ));
    }
    x1h(t) {
      return !t || t.length <= 0
        ? !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
        : SceneTeamController_1.SceneTeamController.IsMatchRoleOption(t);
    }
    rAl(t, i, s) {
      if (t) {
        var r = i.Entity.GetComponent(200)?.Owner;
        if (!r) return !0;
        var h = i.IsIgnorePlayerCollision;
        for (let o = 0; o < s.Actors.Num(); o++) {
          let e = s.Actors.Get(o);
          if (void 0 !== e) {
            var n = s.Components.Get(o);
            let t = !0,
              i = 10;
            for (; e && 0 < --i; ) {
              if (h) {
                var a = n.GetCollisionObjectType();
                if (
                  a === QueryTypeDefine_1.KuroCollisionChannel.Pawn ||
                  a === QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer
                ) {
                  t = !1;
                  break;
                }
              }
              if (e === r) return !1;
              e = e.GetAttachParentActor();
            }
            if (t) return !0;
          }
        }
      }
      return !1;
    }
    SetDataFromOldRole(t) {
      t = t.Entity.GetComponent(97);
      (this.Hon = t.Hon),
        (this.Zon = t.Zon),
        void 0 !== this.Hon &&
          this.Zon &&
          (this.Von(!0, this.Hon?.Point.GetTagId(), "切换角色从旧角色继承过来"),
          this.gOc(!0));
    }
    CheckCurrentTargetCanInteract() {
      var t = this.GetCurrentTarget();
      return !t?.Valid || t.OnlineTypeCanInteract;
    }
    GetCurrentTargetIsIgnorePlayerCollision() {
      var t = this.GetCurrentTarget();
      return !!t?.Valid && t.IsIgnorePlayerCollision;
    }
  });
(RoleSceneInteractComponent.f7r = !1),
  (RoleSceneInteractComponent.TraceDebug = !1),
  (RoleSceneInteractComponent.DebugLog = !1),
  (RoleSceneInteractComponent.dth = new Map([
    ["FixedPointHook", 0],
    ["SuiGuangHook", 1],
    ["KiteHook", 2],
    ["RagDollJumpingPoint", 3],
    ["RagDollClimbingPoint", 4],
  ])),
  (RoleSceneInteractComponent = RoleSceneInteractComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(97)],
      RoleSceneInteractComponent,
    )),
  (exports.RoleSceneInteractComponent = RoleSceneInteractComponent);
//# sourceMappingURL=RoleSceneInteractComponent.js.map
