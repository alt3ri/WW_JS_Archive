"use strict";
var RoleSceneInteractComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        n = arguments.length,
        h =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (o = t[r]) &&
            (h = (n < 3 ? o(h) : 3 < n ? o(e, i, h) : o(e, i)) || h);
      return 3 < n && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSceneInteractComponent = exports.fixHookSkillIds = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
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
  DEFAULT_MIN_LENGTH = 100,
  HOOK_VISION_ID = 1001,
  SPHERE_TRACE_RADIUS = 5;
let RoleSceneInteractComponent =
  (RoleSceneInteractComponent_1 = class RoleSceneInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.won = void 0),
        (this.LYe = Vector_1.Vector.Create()),
        (this.Bon = Vector_1.Vector.Create()),
        (this.bon = Vector_1.Vector.Create()),
        (this.s_e = Vector_1.Vector.Create()),
        (this.qon = []),
        (this.Gon = !1),
        (this.Non = new Set()),
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
            this.Die.TryStartCd(),
            this.jon(),
            this.Won(),
            CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraHook(),
            (this.Kon = !0),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.RemoveEntity,
              this.Fm,
            ));
        }),
        (this.Qon = (t, e) => {
          if (exports.fixHookSkillIds.has(e)) {
            for (const i of this.Xon) this.Non.add(i);
            for (const s of this.$on) this.Non.add(s);
            this.Non.add(this.Die),
              this.Die?.Valid && (this.Die.ChangeHookPointState(0), this.Yon()),
              EventSystem_1.EventSystem.Has(
                EventDefine_1.EEventName.RemoveEntity,
                this.Fm,
              ) &&
                EventSystem_1.EventSystem.Remove(
                  EventDefine_1.EEventName.RemoveEntity,
                  this.Fm,
                ),
              (this.Die = void 0),
              (this.Jon = void 0),
              (this.TargetLocation = void 0),
              this.zon.clear(),
              (this.Kon = !1);
          }
        }),
        (this.Fm = (t, e) => {
          if (e.Id === this.Die?.Entity.Id) {
            var i = this.Entity.GetComponent(33);
            for (const s of exports.fixHookSkillIds)
              i.EndSkill(s, "CurrentTarget is Remove");
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                32,
                "钩锁点在勾的时候被删除，请检查配置",
                ["PbDataId", e.Entity.GetComponent(0)?.GetPbDataId()],
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
        (this.Xon = new Set()),
        (this.$on = new Set()),
        (this.irn = new Set()),
        (this.zon = new Set()),
        (this.bsr = void 0),
        (this.orn = !0),
        (this.Lie = void 0),
        (this.Fon = void 0),
        (this.rrn = !1),
        (this.Kon = !1),
        (this.nrn = !1),
        (this.srn = void 0),
        (this.a7r = () => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
          HOOK_VISION_ID
            ? ((this.Gon = !1),
              this.rrn &&
                this.Von(
                  !0,
                  this.Hon?.GetTagId(),
                  "切换到钩锁技能且NeedAddTag为真时，添加定点钩索可用标签",
                ))
            : ((this.Gon = !0),
              this.Von(!1, void 0, "切换到非钩锁技能时，删除定点钩索可用标签"),
              this.Hon &&
                (this.Hon.ChangeHookPointState(0), (this.Hon = void 0)));
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
        void 0 !== this.Hon &&
        this.Hon.ChangeHookPointState(this.ern ? 1 : 2);
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.won = this.Entity.GetComponent(35)),
        (this.Lie = this.Entity.GetComponent(188)),
        (this.Fon = this.Entity.GetComponent(46)),
        this.Lie.ListenForTagAddOrRemove(283451623, (t, e) => {
          e && (this.arn(this.Hon), (this.Hon = void 0));
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
      Global_1.Global.BaseCharacter === this.Hte.Actor &&
        (RoleSceneInteractComponent_1.f7r
          ? ModelManager_1.ModelManager.CameraModel &&
            !this.Lie.HasTag(283451623) &&
            (this.hrn(), this.lrn())
          : (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
              HOOK_VISION_ID,
            ) && (RoleSceneInteractComponent_1.f7r = !0),
            (this.trn = void 0)));
    }
    hrn() {
      var t = ModelManager_1.ModelManager.CameraModel;
      let e = !1,
        i = !1;
      var s, o;
      this.bsr.SetDrawDebugTrace(
        RoleSceneInteractComponent_1.TraceDebug ? 1 : 0,
      ),
        this._rn(t),
        (e = this.nrn),
        (s = this.srn),
        e &&
          this.won?.Valid &&
          ((o = this.won.GetVisionIdList()),
          (e = o.Contains(HOOK_VISION_ID)),
          (i = !0)),
        (this.Zon === e && this.Hon === s && this.ern === i) ||
          ((o = this.Hon),
          (this.Hon = s),
          (this.ern = i),
          o?.Valid && o !== s && o.ChangeHookPointState(0),
          s
            ? (this.NeedChangeTargetState &&
                this.Hon.ChangeHookPointState(i ? 1 : 2),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleFindFixHook,
                !0,
                s.Location,
              ))
            : this.arn(o),
          (this.Zon = e),
          void 0 !== this.Hon && i
            ? ModelManager_1.ModelManager.RouletteModel
                .CurrentExploreSkillId !== HOOK_VISION_ID
              ? (this.rrn = !0)
              : e
                ? this.Von(
                    !0,
                    this.Hon?.GetTagId(),
                    "当前选中的钩锁点有效, 且不需要切换技能",
                  )
                : this.Fon.IsNeedResetSkill() ||
                  this.Von(!1, void 0, "当前选中的钩锁点无效，且不需要切换技能")
            : ((this.rrn = !1),
              this.Fon.IsNeedResetSkill() ||
                this.Von(!1, void 0, "当前未选中点，且不需要切换技能"))),
        this.crn(t);
    }
    arn(t) {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleFindFixHook,
        !1,
        void 0,
      );
    }
    lrn() {
      this.CanActivateFixHook() ? (this.trn = void 0) : (this.trn = this.mrn());
    }
    GetSecondaryTarget() {
      return this.trn;
    }
    IsInInteractArea(t) {
      t = t.Entity.Id;
      return this.qon.includes(t);
    }
    _rn(h) {
      if (h?.CurrentCameraActor) {
        let e = void 0,
          i = void 0,
          s = DEFAULT_MIN_LENGTH,
          o = void 0,
          n = ((this.qon.length = 0), !1);
        if ((this.irn.clear(), this.bsr)) {
          let t = !0;
          for (const c of GrapplingHookPointComponent_1
            .GrapplingHookPointComponent.AllPoints)
            if (c.CheckCondition()) {
              if (
                c.WasRecentlyRenderOnScreen() &&
                !c.IsInCd &&
                c !== this.Die &&
                (void 0 === e && (e = this.Hte?.ActorLocationProxy),
                !c.Entity.GetComponent(119)?.IsInState(3))
              ) {
                var r = Vector_1.Vector.DistSquared(c.Location, e);
                if (r > c.RadiusSquared) this.Non.has(c) && this.Non.delete(c);
                else if ((this.$on.add(c), r < MIN_DIST_SQUARED))
                  this.zon.delete(c);
                else {
                  c.CameraGaze &&
                    0 <= c.CameraGaze.LockPriority &&
                    !this.Xon.has(c) &&
                    !this.Non.has(c) &&
                    this.irn.add(c),
                    void 0 === i &&
                      ((i = h.CameraLocation),
                      this.LYe.FromUeVector(
                        h.CurrentCameraActor.GetActorForwardVector(),
                      ),
                      this.Bon.FromUeVector(
                        h.CurrentCameraActor.GetActorRightVector(),
                      ),
                      this.bon.FromUeVector(
                        h.CurrentCameraActor.GetActorUpVector(),
                      )),
                    c.Location.Subtraction(i, this.s_e);
                  r = this.s_e.DotProduct(this.LYe);
                  if (!(r <= 0)) {
                    var _ = Math.abs(this.s_e.DotProduct(this.Bon) / r);
                    if (
                      !(_ > (this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT))
                    ) {
                      r = Math.abs(this.s_e.DotProduct(this.bon) / r);
                      if (!(r > (this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN))) {
                        this.qon.push(c.Entity.Id),
                          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                            this.bsr,
                            c.Location,
                          );
                        _ =
                          MathUtils_1.MathUtils.Square(_ * LEFT_RIGHT_SCALE) +
                          MathUtils_1.MathUtils.Square(r);
                        if (n) {
                          if (s <= _) continue;
                          if (
                            (t &&
                              (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                                this.bsr,
                                this.Hte.ActorLocation,
                              ),
                              (t = !1)),
                            TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                              this.Hte.Actor.CapsuleComponent,
                              this.bsr,
                              TRACE_TAG_NAME,
                              PROFILE_KEY,
                            ))
                          )
                            continue;
                        } else if (
                          (t &&
                            (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                              this.bsr,
                              this.Hte.ActorLocation,
                            ),
                            (t = !1)),
                          TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                            this.Hte.Actor.CapsuleComponent,
                            this.bsr,
                            TRACE_TAG_NAME,
                            PROFILE_KEY,
                          ))
                        ) {
                          if (s <= _) continue;
                        } else n = !0;
                        (s = _), (o = c);
                      }
                    }
                  }
                }
              }
            } else
              c !== this.Die ||
                this.Kon ||
                (c.ChangeHookPointState(0),
                (this.Die = void 0),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.RoleFindFixHook,
                  !1,
                  void 0,
                ));
          this.Xon.clear();
          var a = this.Xon;
          (this.Xon = this.$on), (this.$on = a), (this.nrn = n), (this.srn = o);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Interaction",
              6,
              "RoleInteract: Missing SphereTrace",
            ),
            (this.nrn = !1),
            (this.srn = void 0);
      } else (this.nrn = !1), (this.srn = void 0);
    }
    mrn() {
      if (this.bsr) {
        let t = void 0,
          e = 1 / 0,
          i = void 0,
          s = !0;
        for (const n of this.Xon)
          if (
            n.Valid &&
            n.WasRecentlyRenderOnScreen() &&
            n.Entity.Id !== this.Die?.Entity?.Id &&
            n.Entity.Id !== this.Hon?.Entity?.Id
          ) {
            if (n) {
              void 0 === i && (i = this.Hte.ActorLocationProxy);
              var o = Vector_1.Vector.DistSquared(n.Location, i);
              if (o > n.RadiusSquared) continue;
              if (o > e) continue;
              if ((this.$on.add(n), o < MIN_DIST_SQUARED)) continue;
              e = o;
            }
            s &&
              (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                this.bsr,
                this.Hte.ActorLocation,
              ),
              (s = !1)),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                this.bsr,
                n.Location,
              ),
              TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                this.Hte.Actor.CapsuleComponent,
                this.bsr,
                TRACE_TAG_NAME,
                PROFILE_KEY,
              ) || (t = n);
          }
        return t;
      }
    }
    crn(t) {
      for (const i of this.zon) this.Xon.has(i) || this.zon.delete(i);
      for (const s of this.irn) this.zon.add(s);
      if (
        (this.irn.clear(),
        this.Jon &&
          (t.FightCamera.LogicComponent.CameraGuideController.IsBlending ||
            this.zon.delete(this.Jon),
          this.zon.has(this.Jon) || (this.Jon = void 0)),
        !(this.Jon ?? 0 === this.zon.size))
      ) {
        let t = -1;
        var e = void 0 !== this.Die;
        for (const o of this.zon)
          o.CameraGaze.GazeInHook && !e
            ? this.zon.delete(o)
            : o.CameraGaze.LockPriority > t &&
              ((this.Jon = o), (t = o.CameraGaze.LockPriority));
        this.Jon &&
          CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(
            this.Jon,
          );
      }
    }
    CanActivateFixHook() {
      return this.Zon && void 0 !== this.Hon && this.Die !== this.Hon;
    }
    GetCurrentTargetLocation() {
      return this.TargetLocation
        ? this.TargetLocation.ToUeVector()
        : this.Die?.Location.ToUeVector() ?? this.Hte.ActorLocation;
    }
    GetNextTarget() {
      return this.Hon;
    }
    GetCurrentTarget() {
      return this.Die;
    }
    GetCurrentTargetActor() {
      return this.Die.Entity.GetComponent(1).Owner;
    }
    GetNextTargetLocation() {
      return this.Hon.Location.ToUeVector();
    }
    GetGuideSpare() {
      return this.zon;
    }
    GetNextTargetVector() {
      return this.Hon.Location;
    }
    GetInheritSpeed() {
      return this.Die.InheritSpeed;
    }
    GetIsClimb() {
      return this.Die.IsClimb;
    }
    GetCurrentTargetForward() {
      var t = this.Die.Entity.GetComponent(0);
      return t?.Valid
        ? t.GetRotation().RotateVector(Vector_1.Vector.ForwardVector)
        : this.Hte.ActorForward;
    }
    IsLegalExceptSkill() {
      return this.ern;
    }
    GetTargetIsSuiGuangType() {
      var t = this.Die?.GetHookInteractType();
      return !!t && "SuiGuangHook" === t;
    }
    Von(t, e, i) {
      t
        ? e &&
          !this.Lie.HasTag(e) &&
          (this.Lie.AddTag(e), (this.Oon = e), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Character",
            32,
            "[RoleSceneInteractComponent] 添加定点钩索可用标签",
            ["reason", i],
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
            ["reason", i],
            ["EntityId", this.Entity.Id],
          );
    }
    jon() {
      var t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.z3n.create()).P4n =
          MathUtils_1.MathUtils.NumberToLong(
            this.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        (t.e8n = Protocol_1.Aki.Protocol.Pks.create()),
        (t.e8n.X = this.Die.Location.X),
        (t.e8n.Y = this.Die.Location.Y),
        (t.e8n.Z = this.Die.Location.Z),
        CombatMessage_1.CombatNet.Call(22472, this.Entity, t));
    }
    Won() {
      var t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.sms.create()).P4n =
          MathUtils_1.MathUtils.NumberToLong(
            this.Die.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        Net_1.Net.Call(8633, t, (t) => {
          switch (t.O4n) {
            case Protocol_1.Aki.Protocol.O4n.NRs:
              break;
            case Protocol_1.Aki.Protocol.O4n.Proto_ErrSceneEntityNotExist:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 32, "钩锁点不存在", [
                  "EntityId",
                  this.Die.Entity.GetComponent(0).GetCreatureDataId(),
                ]);
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.O4n,
                3115,
              );
          }
        }));
    }
    Yon() {
      var t;
      this.Hte.IsAutonomousProxy && this.Die?.WillBeDestroyedAfterHook
        ? (((t = Protocol_1.Aki.Protocol.kgs.create()).P4n =
            MathUtils_1.MathUtils.NumberToLong(
              this.Die.Entity.GetComponent(0).GetCreatureDataId(),
            )),
          Net_1.Net.Call(3214, t, (t) => {}))
        : this.Hte.IsAutonomousProxy &&
          this.Die?.WillBeHideAfterHook &&
          ((t = this.Die.Entity),
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
      [(0, RegisterComponent_1.RegisterComponent)(89)],
      RoleSceneInteractComponent,
    )),
  (exports.RoleSceneInteractComponent = RoleSceneInteractComponent);
//# sourceMappingURL=RoleSceneInteractComponent.js.map
