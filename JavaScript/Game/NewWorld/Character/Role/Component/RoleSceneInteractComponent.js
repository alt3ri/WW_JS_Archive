"use strict";
var RoleSceneInteractComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var o,
        h = arguments.length,
        n =
          h < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, i, e, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (o = t[r]) &&
            (n = (h < 3 ? o(n) : 3 < h ? o(i, e, n) : o(i, e)) || n);
      return 3 < h && n && Object.defineProperty(i, e, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSceneInteractComponent = exports.fixHookSkillIds = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
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
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  PortalUtils_1 = require("../../../../Utils/PortalUtils"),
  GrapplingHookPointComponent_1 = require("../../Custom/Components/GrapplingHookPointComponent"),
  TRACE_TAG_NAME =
    ((exports.fixHookSkillIds = new Set([100020, 100021, 100022])),
    "RoleSceneInteract"),
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
  ENABLE_SECONDARY_TARGET = !1;
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
    s = !(i instanceof HookPointInfo) || i.PortalA2B,
  ) {
    var o = i instanceof HookPointInfo ? i.Point : i;
    let h = t.get(o);
    if (h) {
      if (-1 !== h.findIndex((t, i) => t[0] === e && t[1] === s)) return t;
    } else (h = []), t.set(o, h);
    return h.push([e, s]), t;
  }
  static HookPointSetHas(
    t,
    i,
    e = i instanceof HookPointInfo ? i.PortalPairId : 0,
    s = !(i instanceof HookPointInfo) || i.PortalA2B,
  ) {
    var o = i instanceof HookPointInfo ? i.Point : i,
      t = t?.get(o);
    return !!t && -1 !== t.findIndex((t, i) => t[0] === e && t[1] === s);
  }
  static HookPointSetDelete(
    t,
    i,
    e = i instanceof HookPointInfo ? i.PortalPairId : 0,
    s = !(i instanceof HookPointInfo) || i.PortalA2B,
  ) {
    var o,
      h = i instanceof HookPointInfo ? i.Point : i,
      n = t.get(h);
    return (
      !!n &&
      (-1 !== (o = n.findIndex((t, i) => t[0] === e && t[1] === s)) &&
        n.splice(o, 1),
      0 === n.length && t.delete(h),
      -1 !== o)
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
        (this.FZa = Transform_1.Transform.Create()),
        (this.JWs = Vector_1.Vector.Create()),
        (this.zWs = Vector_1.Vector.Create()),
        (this.ZWs = new Map()),
        (this.Gon = !1),
        (this.eKs = new Map()),
        (this.Oon = void 0),
        (this.kon = (t) => {
          exports.fixHookSkillIds.has(t) &&
            (this.Fon.IsNeedResetSkill() ||
              this.Von(
                !1,
                void 0,
                "使用钩锁技能且不需要切换技能时，删除定点钩索可用标签",
              ),
            (this.Die = this.Hon),
            (this.tKs.length = 0),
            (t = this.tKs),
            (this.tKs = this.iKs),
            (this.iKs = t),
            (this.rKs = 0),
            this.Die.Point.TryStartCd(),
            this.jon(),
            this.Won(),
            CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraHook(),
            (this.Kon = !0),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.RemoveEntity,
              this.Fm,
            ));
        }),
        (this.Qon = (t, i) => {
          exports.fixHookSkillIds.has(i) &&
            (HookPointUtils.HookPointSetForEach(this.oKs, (t, i, e) => {
              HookPointUtils.HookPointSetAdd(this.eKs, t, i, e);
            }),
            HookPointUtils.HookPointSetForEach(this.$on, (t, i, e) => {
              HookPointUtils.HookPointSetAdd(this.eKs, t, i, e);
            }),
            HookPointUtils.HookPointSetAdd(
              this.eKs,
              this.Die.Point,
              this.Die.PortalPairId,
              this.Die.PortalA2B,
            ),
            this.Die?.Point?.Valid &&
              (this.Die.Point.ChangeHookPointState(0), this.Yon()),
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
            (this.TargetLocation = void 0),
            this.zon.clear(),
            (this.Kon = !1));
        }),
        (this.Fm = (t, i) => {
          if (i.Id === this.Die?.Point.Entity.Id) {
            var e = this.Entity.GetComponent(34);
            for (const s of exports.fixHookSkillIds)
              e.EndSkill(s, "CurrentTarget is Remove");
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                32,
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
        (this.TargetLocation = void 0),
        (this.trn = void 0),
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
        (this.Fon = void 0),
        (this.rrn = !1),
        (this.Kon = !1),
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
      return [3, 17];
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
        (this.won = this.Entity.GetComponent(36)),
        (this.Lie = this.Entity.GetComponent(190)),
        (this.Fon = this.Entity.GetComponent(47)),
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
        (this.bsr.bIsSingle = !0),
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
            this.hrn(), ENABLE_SECONDARY_TARGET && this.lrn();
            for (var [i] of this.eKs)
              i?.Valid || HookPointUtils.HookPointSetDelete(this.eKs, i);
          }
        } else
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            HOOK_VISION_ID,
          ) && (RoleSceneInteractComponent_1.f7r = !0),
            (this.trn = void 0);
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
        s = this.iKs;
      (this.iKs = this.hKs),
        (this.hKs = s),
        t &&
          this.won?.Valid &&
          ((s = this.won.GetVisionIdList()),
          (t = s.Contains(HOOK_VISION_ID)),
          (i = !0)),
        (this.Zon === t && this.Hon?.Point === e?.Point && this.ern === i) ||
          ((s = this.Hon),
          (this.Hon = e),
          (this.ern = i),
          (this.Zon = t),
          s?.Point.Valid &&
            s.Point !== e?.Point &&
            s.Point.ChangeHookPointState(0),
          this.Hon
            ? (this.NeedChangeTargetState &&
                this.Hon.Point.ChangeHookPointState(i ? 1 : 2),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleFindFixHook,
                !0,
                this.Hon.Point.HookLocation,
              ))
            : s && this.arn(s),
          void 0 !== this.Hon && i
            ? ModelManager_1.ModelManager.RouletteModel
                .CurrentExploreSkillId !== HOOK_VISION_ID
              ? (this.rrn = !0)
              : t
                ? this.Von(
                    !0,
                    this.Hon?.Point.GetTagId(),
                    "当前选中的钩锁点有效, 且不需要切换技能",
                  )
                : this.Fon.IsNeedResetSkill() ||
                  this.Von(!1, void 0, "当前选中的钩锁点无效，且不需要切换技能")
            : ((this.rrn = !1),
              this.Fon.IsNeedResetSkill() ||
                this.Von(!1, void 0, "当前未选中点，且不需要切换技能"))),
        this.crn();
    }
    arn(t) {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleFindFixHook,
        !1,
        void 0,
      );
    }
    lrn() {
      this.CanActivateFixHook() ? (this.trn = void 0) : (this.trn = this._Ks());
    }
    GetSecondaryTarget() {
      return this.trn.Point;
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
        let [s, o] = this.uKs(),
          h = 0,
          n = !0;
        ModelManager_1.ModelManager.PortalModel?.GetPortals().forEach(
          (t, i) => {
            var e = this.cKs(i, !0),
              e =
                (e[1] && ((s = e[0]), (o = e[1]), (h = i), (n = !0)),
                this.cKs(i, !1));
            e[1] && ((s = e[0]), (o = e[1]), (h = i), (n = !1));
          },
        ),
          o && ((this.sKs = s), (this.aKs = new HookPointInfo(o, h, n))),
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
      this.jWs.FromUeVector(t.K2_GetActorLocation()),
        this.kue.FromUeVector(t.GetActorForwardVector()),
        this.WWs.FromUeVector(t.GetActorRightVector()),
        this.KWs.FromUeVector(t.GetActorUpVector());
      var i,
        e,
        s,
        o = this.jWs,
        h = this.kue,
        n = this.WWs,
        r = this.KWs,
        a = Math.tan(MathUtils_1.MathUtils.DegToRad * t.FOVAngle),
        _ = Math.tan(
          MathUtils_1.MathUtils.DegToRad * (t.FOVAngle / t.AspectRatio),
        ),
        l = (this.QWs.FromConfigVector(this.Hte.ActorLocationProxy), this.QWs);
      let c = [!1, void 0],
        v = !0;
      for (const E of GrapplingHookPointComponent_1.GrapplingHookPointComponent
        .AllPoints)
        E.CheckCondition()
          ? !E.WasRecentlyRenderOnScreen() ||
            E.IsInCd ||
            E.Entity.GetComponent(120)?.IsInState(3) ||
            (E === this.Die?.Point &&
              0 === this.Die.PortalPairId &&
              this.Die.PortalA2B) ||
            (Vector_1.Vector.DistSquared(E.TriggerLocation, l) > E.RadiusSquared
              ? HookPointUtils.HookPointSetDelete(this.eKs, E)
              : (HookPointUtils.HookPointSetAdd(this.$on, E),
                Vector_1.Vector.DistSquared(E.HookLocation, l) <
                MIN_DIST_SQUARED
                  ? HookPointUtils.HookPointSetDelete(this.zon, E)
                  : (E.CameraGaze &&
                      0 <= E.CameraGaze.LockPriority &&
                      !HookPointUtils.HookPointSetHas(this.oKs, E) &&
                      !HookPointUtils.HookPointSetHas(this.eKs, E) &&
                      HookPointUtils.HookPointSetAdd(this.nKs, E),
                    (i = this.$Ws),
                    E.HookLocation.Subtraction(o, i),
                    (e = i.DotProduct(h)) <= 0 ||
                      ((s = i.DotProduct(n)),
                      Math.abs(s / e) >
                        Math.min(
                          a,
                          this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT,
                        )) ||
                      ((i = i.DotProduct(r)),
                      Math.abs(i / e) >
                        Math.min(
                          _,
                          this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN,
                        )) ||
                      (HookPointUtils.HookPointSetAdd(this.ZWs, E),
                      (e =
                        MathUtils_1.MathUtils.Square(s * LEFT_RIGHT_SCALE) +
                        MathUtils_1.MathUtils.Square(i)),
                      this.lKs <= e) ||
                      (v &&
                        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                          this.bsr,
                          l,
                        ),
                        (v = !1)),
                      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                        this.bsr,
                        E.HookLocation,
                      ),
                      (s = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                        this.Hte.Actor.CapsuleComponent,
                        this.bsr,
                        TRACE_TAG_NAME,
                        PROFILE_KEY,
                      )),
                      (this.lKs = e),
                      (this.hKs.length = 0),
                      this.hKs.push([
                        this.Hte.ActorLocationProxy,
                        E.HookLocation,
                      ]),
                      (c = [!s, E])))))
          : E !== this.Die?.Point ||
            this.Kon ||
            (E.ChangeHookPointState(0),
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
      var s = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
      if (!s || !s.Portal1Enable || !s.Portal2Enable) return [!1, void 0];
      var o =
        ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          t,
        )?.Entity?.GetComponent(200);
      if (!o) return [!1, void 0];
      var h = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
        o.GetPairCreatureDataId(),
      )?.Entity?.GetComponent(200);
      if (!h) return [!1, void 0];
      this.FZa.FromUeTransform(
        i ? s.PortalWorldTransform1 : s.PortalWorldTransform2,
      );
      var n = this.FZa,
        r = (i ? o : h).PortalBounds,
        a = n.GetLocation(),
        _ = (n.GetRotation().GetForwardVector(this.YWs), this.YWs),
        s = this.Hte.ActorLocationProxy,
        l = this.QWs,
        o =
          (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(s, t, i, l),
          e.GetTransform()),
        h = PortalUtils_1.PortalUtils.GetMappingTransformToOtherPortal(o, t, i),
        c = this.jWs,
        s =
          (c.FromUeVector(h.GetLocation()),
          MathUtils_1.MathUtils.CommonTempQuat),
        v = (s.FromUeQuat(h.GetRotation()), this.kue),
        E = (s.GetForwardVector(v), this.WWs),
        I = (s.GetRightVector(E), this.KWs),
        o =
          (s.GetUpVector(I), MathUtils_1.MathUtils.DegToRad * (e.FOVAngle / 2)),
        M = Math.tan(o),
        d = Math.tan(o * e.AspectRatio);
      let u = [!1, void 0];
      for (const S of GrapplingHookPointComponent_1.GrapplingHookPointComponent
        .AllPoints)
        if (S.CheckCondition()) {
          if (
            S.WasRecentlyRenderOnScreen() &&
            !(
              S.IsInCd ||
              S.Entity.GetComponent(120)?.IsInState(3) ||
              (S === this.Die?.Point &&
                t === this.Die.PortalPairId &&
                i === this.Die.PortalA2B)
            )
          ) {
            var C = Vector_1.Vector.DistSquared(S.HookLocation, l);
            if (C > S.RadiusSquared)
              HookPointUtils.HookPointSetDelete(this.eKs, S, t, i);
            else if (
              (HookPointUtils.HookPointSetAdd(this.$on, S, t, i),
              C < MIN_DIST_SQUARED)
            )
              HookPointUtils.HookPointSetDelete(this.zon, S, t, i);
            else {
              S.CameraGaze &&
                0 <= S.CameraGaze.LockPriority &&
                !HookPointUtils.HookPointSetHas(this.oKs, S, t, i) &&
                !HookPointUtils.HookPointSetHas(this.eKs, S, t, i) &&
                HookPointUtils.HookPointSetAdd(this.nKs, S, t, i);
              var C = this.$Ws,
                m = (S.HookLocation.Subtraction(c, C), C.DotProduct(v));
              if (!(m <= 0)) {
                var f = C.DotProduct(E),
                  T = Math.abs(f / m);
                if (
                  !(
                    T >
                    Math.min(
                      M,
                      this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT,
                    )
                  )
                ) {
                  (T = C.DotProduct(I)), (C = Math.abs(T / m));
                  if (
                    !(
                      C >
                      Math.min(d, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)
                    )
                  ) {
                    m = this.JWs;
                    if (
                      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
                        this.Hte.ActorLocationProxy,
                        PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
                          S.Entity.GetComponent(1).ActorLocationProxy,
                          t,
                          !i,
                          MathUtils_1.MathUtils.CommonTempVector,
                        ),
                        a,
                        _,
                        m,
                      )
                    ) {
                      n.InverseTransformPosition(
                        m,
                        MathUtils_1.MathUtils.CommonTempVector,
                      );
                      C = MathUtils_1.MathUtils.CommonTempVector;
                      if (
                        !(
                          Math.abs(C.Y) > Math.abs(r.Y) ||
                          Math.abs(C.Z) > Math.abs(r.Z)
                        )
                      ) {
                        (C = this.zWs),
                          (f =
                            (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
                              m,
                              t,
                              i,
                              C,
                            ),
                            HookPointUtils.HookPointSetAdd(this.ZWs, S, t, i),
                            MathUtils_1.MathUtils.Square(f * LEFT_RIGHT_SCALE) +
                              MathUtils_1.MathUtils.Square(T)));
                        if (!(this.lKs <= f)) {
                          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                            this.bsr,
                            this.Hte.ActorLocation,
                          ),
                            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                              this.bsr,
                              m,
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
                              C,
                            ),
                            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                              this.bsr,
                              S.HookLocation,
                            ),
                            (t =
                              TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                                this.Hte.Actor.CapsuleComponent,
                                this.bsr,
                                TRACE_TAG_NAME,
                                PROFILE_KEY,
                              ))),
                            (this.lKs = f),
                            (this.hKs.length = 0),
                            this.hKs.push([
                              this.Hte.ActorLocationProxy,
                              Vector_1.Vector.Create(m),
                            ]),
                            this.hKs.push([
                              Vector_1.Vector.Create(C),
                              S.HookLocation,
                            ]),
                            (u = [!t, S]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else
          S !== this.Die?.Point ||
            this.Kon ||
            (S.ChangeHookPointState(0),
            (this.Die = void 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoleFindFixHook,
              !1,
              void 0,
            ));
      return u;
    }
    _Ks() {
      var t, i;
      if (this.bsr)
        return (
          ([t, i] = this.mKs()), t && i ? new HookPointInfo(i, 0, !0) : void 0
        );
    }
    mKs() {
      if (!this.bsr) return [!1, void 0, MIN_DIST_SQUARED];
      if (!ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor)
        return [!1, void 0, MIN_DIST_SQUARED];
      this.QWs.FromConfigVector(this.Hte.ActorLocationProxy);
      var t,
        i,
        e = this.QWs;
      let s = void 0,
        o = 1 / 0,
        h = !0;
      for ([t, i] of this.oKs)
        if (t.Valid) {
          var n = i.findIndex((t, i) => !(0 !== t[0] || !t[1]));
          if (
            -1 !== n &&
            t.WasRecentlyRenderOnScreen() &&
            t.Entity.Id !== this.Die?.Point.Entity?.Id &&
            t.Entity.Id !== this.Hon?.Point.Entity?.Id
          ) {
            if (t) {
              n = Vector_1.Vector.DistSquared(t.HookLocation, e);
              if (n > t.RadiusSquared) continue;
              if (n > o) continue;
              if (
                (HookPointUtils.HookPointSetAdd(this.$on, t),
                n < MIN_DIST_SQUARED)
              )
                continue;
              o = n;
            }
            h &&
              (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                this.bsr,
                this.Hte.ActorLocation,
              ),
              (h = !1)),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                this.bsr,
                t.HookLocation,
              ),
              TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                this.Hte.Actor.CapsuleComponent,
                this.bsr,
                TRACE_TAG_NAME,
                PROFILE_KEY,
              ) || (s = t);
          }
        }
      return s ? [!0, s, o] : [!1, void 0, MIN_DIST_SQUARED];
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
        const o = void 0 !== this.Die;
        HookPointUtils.HookPointSetForEach(this.zon, (t, i, e) => {
          t.CameraGaze.GazeInHook && !o
            ? HookPointUtils.HookPointSetDelete(this.zon, t, i, e)
            : t.CameraGaze.LockPriority > s &&
              ((this.Jon = new HookPointInfo(t, i, e)),
              (s = t.CameraGaze.LockPriority));
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
    GetCurrentTargetLocation() {
      return this.TargetLocation
        ? this.TargetLocation.ToUeVector()
        : (this.Die?.Point.HookLocation.ToUeVector() ?? this.Hte.ActorLocation);
    }
    OnRoleTeleport() {
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
      return 0 <= this.rKs && this.rKs < this.tKs.length
        ? this.tKs[this.rKs][1]
        : (this.Die?.Point.HookLocation ?? this.Hte.ActorLocationProxy);
    }
    GetCurrentPathways() {
      return this.tKs;
    }
    GetCurrentTargetEnterPortalCapture() {
      if (this.Die?.Point && this.Die.PortalPairId) {
        var t,
          i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
            this.Die.PortalPairId,
          )?.Entity?.GetComponent(200);
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
          )?.Entity?.GetComponent(200);
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
      return this.Die.Point.Entity.GetComponent(1).Owner;
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
        ? t.GetRotation().RotateVector(Vector_1.Vector.ForwardVector)
        : this.Hte.ActorForward;
    }
    IsLegalExceptSkill() {
      return this.ern;
    }
    GetTargetIsSuiGuangType() {
      var t = this.Die?.Point?.GetHookInteractType();
      return !!t && "SuiGuangHook" === t;
    }
    Von(t, i, e) {
      t
        ? i &&
          !this.Lie.HasTag(i) &&
          (this.Lie.AddTag(i), (this.Oon = i), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Character",
            32,
            "[RoleSceneInteractComponent] 添加定点钩索可用标签",
            ["reason", e],
            ["EntityId", this.Entity.Id],
          )
        : this.Oon &&
          this.Lie.HasTag(this.Oon) &&
          (this.Lie.RemoveTag(this.Oon),
          (this.Oon = void 0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Character",
            32,
            "[RoleSceneInteractComponent] 删除定点钩索可用标签",
            ["reason", e],
            ["EntityId", this.Entity.Id],
          );
    }
    jon() {
      var t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.a4n.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(
            this.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        (t.l8n = Protocol_1.Aki.Protocol.Gks.create()),
        (t.l8n.X = this.Die.Point.HookLocation.X),
        (t.l8n.Y = this.Die.Point.HookLocation.Y),
        (t.l8n.Z = this.Die.Point.HookLocation.Z),
        CombatMessage_1.CombatNet.Call(18409, this.Entity, t));
    }
    Won() {
      var t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.dms.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(
            this.Die.Point.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        Net_1.Net.Call(27520, t, (t) => {
          switch (t.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
              break;
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 32, "钩锁点不存在", [
                  "EntityId",
                  this.Die.Point.Entity.GetComponent(0).GetCreatureDataId(),
                ]);
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                27688,
              );
          }
        }));
    }
    Yon() {
      var t;
      this.Hte.IsAutonomousProxy && this.Die?.Point.WillBeDestroyedAfterHook
        ? (((t = Protocol_1.Aki.Protocol.Wgs.create()).F4n =
            MathUtils_1.MathUtils.NumberToLong(
              this.Die.Point.Entity.GetComponent(0).GetCreatureDataId(),
            )),
          Net_1.Net.Call(26327, t, (t) => {}))
        : this.Hte.IsAutonomousProxy &&
          this.Die?.Point.WillBeHideAfterHook &&
          ((t = this.Die.Point.Entity),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            t,
            !1,
            "RoleSceneInteractComponent.SendHookDestroyRequest",
            !0,
          ));
    }
  });
(RoleSceneInteractComponent.f7r = !1),
  (RoleSceneInteractComponent.TraceDebug = !1),
  (RoleSceneInteractComponent.DebugLog = !1),
  (RoleSceneInteractComponent = RoleSceneInteractComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(90)],
      RoleSceneInteractComponent,
    )),
  (exports.RoleSceneInteractComponent = RoleSceneInteractComponent);
//# sourceMappingURL=RoleSceneInteractComponent.js.map
