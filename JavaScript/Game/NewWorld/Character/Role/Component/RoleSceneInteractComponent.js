"use strict";
let RoleSceneInteractComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let o;
    const n = arguments.length;
    let h =
      n < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, i, s);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (o = t[r]) && (h = (n < 3 ? o(h) : n > 3 ? o(e, i, h) : o(e, i)) || h);
    return n > 3 && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSceneInteractComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const GrapplingHookPointComponent_1 = require("../../Custom/Components/GrapplingHookPointComponent");
const TRACE_TAG_NAME = "RoleSceneInteract";
const PROFILE_KEY = "RoleSceneInteractComponent_FindBestTarget";
const MIN_DIST = 500;
const MIN_DIST_SQUARED = MIN_DIST * MIN_DIST;
const MIN_LEFT_RIGHT = 0.4142;
const MIN_UP_DOWN = 0.38;
const MIN_LEFT_RIGHT_SCALE = 0.33;
const MIN_UP_DOWN_SCALE = 0.28;
const LEFT_RIGHT_SCALE = MIN_UP_DOWN / MIN_LEFT_RIGHT;
const DEFAULT_MIN_LENGTH = 100;
const HOOK_VISION_ID = 1001;
const fixHookSkillIds = new Set([100020, 100021, 100022]);
const SPHERE_TRACE_RADIUS = 5;
let RoleSceneInteractComponent =
  (RoleSceneInteractComponent_1 = class RoleSceneInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.zon = void 0),
        (this.d$e = Vector_1.Vector.Create()),
        (this.Zon = Vector_1.Vector.Create()),
        (this.ern = Vector_1.Vector.Create()),
        (this.s_e = Vector_1.Vector.Create()),
        (this.trn = []),
        (this.irn = !1),
        (this.orn = new Set()),
        (this.rrn = void 0),
        (this.nrn = (t) => {
          fixHookSkillIds.has(t) &&
            (this.srn.IsNeedResetSkill() ||
              this.arn(
                !1,
                void 0,
                "使用钩锁技能且不需要切换技能时，删除定点钩索可用标签",
              ),
            (this.Die = this.hrn),
            this.Die.TryStartCd(),
            this.lrn(),
            this._rn(),
            CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraHook(),
            (this.crn = !0));
        }),
        (this.mrn = (t, e) => {
          if (fixHookSkillIds.has(e)) {
            for (const i of this.drn) this.orn.add(i);
            for (const s of this.Crn) this.orn.add(s);
            this.orn.add(this.Die),
              this.Die?.Valid && (this.Die.ChangeHookPointState(0), this.grn()),
              (this.Die = void 0),
              (this.frn = void 0),
              (this.TargetLocation = void 0),
              this.prn.clear(),
              (this.crn = !1);
          }
        }),
        (this.Die = void 0),
        (this.vrn = !1),
        (this.Mrn = !1),
        (this.hrn = void 0),
        (this.frn = void 0),
        (this.TargetLocation = void 0),
        (this.Srn = void 0),
        (this.drn = new Set()),
        (this.Crn = new Set()),
        (this.Ern = new Set()),
        (this.prn = new Set()),
        (this.Nnr = void 0),
        (this.yrn = !0),
        (this.Lie = void 0),
        (this.srn = void 0),
        (this.Irn = !1),
        (this.crn = !1),
        (this.Trn = !1),
        (this.Lrn = void 0),
        (this.D7r = () => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
          HOOK_VISION_ID
            ? ((this.irn = !1),
              this.Irn &&
                this.arn(
                  !0,
                  this.hrn?.GetTagId(),
                  "切换到钩锁技能且NeedAddTag为真时，添加定点钩索可用标签",
                ))
            : ((this.irn = !0),
              this.arn(!1, void 0, "切换到非钩锁技能时，删除定点钩索可用标签"),
              this.hrn &&
                (this.hrn.ChangeHookPointState(0), (this.hrn = void 0)));
        });
    }
    static get Dependencies() {
      return [3, 17];
    }
    get NeedChangeTargetState() {
      return this.yrn;
    }
    set NeedChangeTargetState(t) {
      (this.yrn = t) &&
        void 0 !== this.hrn &&
        this.hrn.ChangeHookPointState(this.Mrn ? 1 : 2);
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.zon = this.Entity.GetComponent(34)),
        (this.Lie = this.Entity.GetComponent(185)),
        (this.srn = this.Entity.GetComponent(45)),
        this.Lie.ListenForTagAddOrRemove(283451623, (t, e) => {
          e && (this.Drn(this.hrn), (this.hrn = void 0));
        }),
        this.Hte.IsRoleAndCtrlByMe ||
          this.Disable("[RoleSceneInteractComponent.OnStart] 模拟端"),
        this.InitTraceInfo(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.D7r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeforeSkillWithTarget,
          this.nrn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.mrn,
        ),
        !0
      );
    }
    InitTraceInfo() {
      (this.Nnr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.Nnr.WorldContextObject = this.Hte.Owner),
        (this.Nnr.bIsSingle = !0),
        (this.Nnr.bIgnoreSelf = !0),
        this.Nnr.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
        ),
        (this.Nnr.Radius = SPHERE_TRACE_RADIUS);
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.D7r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeforeSkillWithTarget,
          this.nrn,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.mrn,
        ),
        !0
      );
    }
    OnTick(t) {
      Global_1.Global.BaseCharacter === this.Hte.Actor &&
        (RoleSceneInteractComponent_1.G7r
          ? ModelManager_1.ModelManager.CameraModel &&
            !this.Lie.HasTag(283451623) &&
            (this.Rrn(), this.Arn())
          : (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
              HOOK_VISION_ID,
            ) && (RoleSceneInteractComponent_1.G7r = !0),
            (this.Srn = void 0)));
    }
    Rrn() {
      const t = ModelManager_1.ModelManager.CameraModel;
      let e = !1;
      let i = !1;
      let s, o;
      this.Nnr.SetDrawDebugTrace(
        RoleSceneInteractComponent_1.TraceDebug ? 1 : 0,
      ),
        this.Urn(t),
        (e = this.Trn),
        (s = this.Lrn),
        e &&
          this.zon?.Valid &&
          ((o = this.zon.GetVisionIdList()),
          (e = o.Contains(HOOK_VISION_ID)),
          (i = !0)),
        (this.vrn === e && this.hrn === s && this.Mrn === i) ||
          ((o = this.hrn),
          (this.hrn = s),
          (this.Mrn = i),
          o?.Valid && o !== s && o.ChangeHookPointState(0),
          s
            ? (this.NeedChangeTargetState &&
                this.hrn.ChangeHookPointState(i ? 1 : 2),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleFindFixHook,
                !0,
                s.Location,
              ))
            : this.Drn(o),
          (this.vrn = e),
          void 0 !== this.hrn && i
            ? ModelManager_1.ModelManager.RouletteModel
                .CurrentExploreSkillId !== HOOK_VISION_ID
              ? (this.Irn = !0)
              : e
                ? this.arn(
                    !0,
                    this.hrn?.GetTagId(),
                    "当前选中的钩锁点有效, 且不需要切换技能",
                  )
                : this.srn.IsNeedResetSkill() ||
                  this.arn(!1, void 0, "当前选中的钩锁点无效，且不需要切换技能")
            : ((this.Irn = !1),
              this.srn.IsNeedResetSkill() ||
                this.arn(!1, void 0, "当前未选中点，且不需要切换技能"))),
        this.Prn(t);
    }
    Drn(t) {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleFindFixHook,
        !1,
        void 0,
      );
    }
    Arn() {
      this.CanActivateFixHook() ? (this.Srn = void 0) : (this.Srn = this.xrn());
    }
    GetSecondaryTarget() {
      return this.Srn;
    }
    IsInInteractArea(t) {
      t = t.Entity.Id;
      return this.trn.includes(t);
    }
    Urn(h) {
      if (h?.CurrentCameraActor) {
        let e = void 0;
        let i = void 0;
        let s = DEFAULT_MIN_LENGTH;
        let o = void 0;
        let n = ((this.trn.length = 0), !1);
        if ((this.Ern.clear(), this.Nnr)) {
          let t = !0;
          for (const l of GrapplingHookPointComponent_1
            .GrapplingHookPointComponent.AllPoints)
            if (l.CheckCondition()) {
              if (
                l.WasRecentlyRenderOnScreen() &&
                !l.IsInCd &&
                l !== this.Die &&
                (void 0 === e && (e = this.Hte?.ActorLocationProxy),
                !l.Entity.GetComponent(117)?.IsInState(3))
              ) {
                let r = Vector_1.Vector.DistSquared(l.Location, e);
                if (r > l.RadiusSquared) this.orn.has(l) && this.orn.delete(l);
                else if ((this.Crn.add(l), r < MIN_DIST_SQUARED))
                  this.prn.delete(l);
                else {
                  l.CameraGaze &&
                    l.CameraGaze.LockPriority >= 0 &&
                    !this.drn.has(l) &&
                    !this.orn.has(l) &&
                    this.Ern.add(l),
                    void 0 === i &&
                      ((i = h.CameraLocation),
                      this.d$e.FromUeVector(
                        h.CurrentCameraActor.GetActorForwardVector(),
                      ),
                      this.Zon.FromUeVector(
                        h.CurrentCameraActor.GetActorRightVector(),
                      ),
                      this.ern.FromUeVector(
                        h.CurrentCameraActor.GetActorUpVector(),
                      )),
                    l.Location.Subtraction(i, this.s_e);
                  r = this.s_e.DotProduct(this.d$e);
                  if (!(r <= 0)) {
                    let _ = Math.abs(this.s_e.DotProduct(this.Zon) / r);
                    if (
                      !(_ > (this.irn ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT))
                    ) {
                      r = Math.abs(this.s_e.DotProduct(this.ern) / r);
                      if (!(r > (this.irn ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN))) {
                        this.trn.push(l.Entity.Id),
                          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                            this.Nnr,
                            l.Location,
                          );
                        _ =
                          MathUtils_1.MathUtils.Square(_ * LEFT_RIGHT_SCALE) +
                          MathUtils_1.MathUtils.Square(r);
                        if (n) {
                          if (s <= _) continue;
                          if (
                            (t &&
                              (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                                this.Nnr,
                                this.Hte.ActorLocation,
                              ),
                              (t = !1)),
                            TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                              this.Hte.Actor.CapsuleComponent,
                              this.Nnr,
                              TRACE_TAG_NAME,
                              PROFILE_KEY,
                            ))
                          )
                            continue;
                        } else if (
                          (t &&
                            (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                              this.Nnr,
                              this.Hte.ActorLocation,
                            ),
                            (t = !1)),
                          TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                            this.Hte.Actor.CapsuleComponent,
                            this.Nnr,
                            TRACE_TAG_NAME,
                            PROFILE_KEY,
                          ))
                        ) {
                          if (s <= _) continue;
                        } else n = !0;
                        (s = _), (o = l);
                      }
                    }
                  }
                }
              }
            } else
              l !== this.Die ||
                this.crn ||
                (l.ChangeHookPointState(0),
                (this.Die = void 0),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.RoleFindFixHook,
                  !1,
                  void 0,
                ));
          this.drn.clear();
          const a = this.drn;
          (this.drn = this.Crn), (this.Crn = a), (this.Trn = n), (this.Lrn = o);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Interaction",
              6,
              "RoleInteract: Missing SphereTrace",
            ),
            (this.Trn = !1),
            (this.Lrn = void 0);
      } else (this.Trn = !1), (this.Lrn = void 0);
    }
    xrn() {
      if (this.Nnr) {
        let t = void 0;
        let e = 1 / 0;
        let i = void 0;
        let s = !0;
        for (const n of this.drn)
          if (
            n.Valid &&
            n.WasRecentlyRenderOnScreen() &&
            n.Entity.Id !== this.Die?.Entity?.Id &&
            n.Entity.Id !== this.hrn?.Entity?.Id
          ) {
            if (n) {
              void 0 === i && (i = this.Hte.ActorLocationProxy);
              const o = Vector_1.Vector.DistSquared(n.Location, i);
              if (o > n.RadiusSquared) continue;
              if (o > e) continue;
              if ((this.Crn.add(n), o < MIN_DIST_SQUARED)) continue;
              e = o;
            }
            s &&
              (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                this.Nnr,
                this.Hte.ActorLocation,
              ),
              (s = !1)),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                this.Nnr,
                n.Location,
              ),
              TraceElementCommon_1.TraceElementCommon.ShapeTrace(
                this.Hte.Actor.CapsuleComponent,
                this.Nnr,
                TRACE_TAG_NAME,
                PROFILE_KEY,
              ) || (t = n);
          }
        return t;
      }
    }
    Prn(t) {
      for (const i of this.prn) this.drn.has(i) || this.prn.delete(i);
      for (const s of this.Ern) this.prn.add(s);
      if (
        (this.Ern.clear(),
        this.frn &&
          (t.FightCamera.LogicComponent.CameraGuideController.IsBlending ||
            this.prn.delete(this.frn),
          this.prn.has(this.frn) || (this.frn = void 0)),
        !(this.frn ?? this.prn.size === 0))
      ) {
        let t = -1;
        const e = void 0 !== this.Die;
        for (const o of this.prn)
          o.CameraGaze.GazeInHook && !e
            ? this.prn.delete(o)
            : o.CameraGaze.LockPriority > t &&
              ((this.frn = o), (t = o.CameraGaze.LockPriority));
        this.frn &&
          CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(
            this.frn,
          );
      }
    }
    CanActivateFixHook() {
      return this.vrn && void 0 !== this.hrn && this.Die !== this.hrn;
    }
    GetCurrentTargetLocation() {
      return this.TargetLocation
        ? this.TargetLocation.ToUeVector()
        : this.Die?.Location.ToUeVector() ?? this.Hte.ActorLocation;
    }
    GetNextTarget() {
      return this.hrn;
    }
    GetCurrentTarget() {
      return this.Die;
    }
    GetCurrentTargetActor() {
      return this.Die.Entity.GetComponent(1).Owner;
    }
    GetNextTargetLocation() {
      return this.hrn.Location.ToUeVector();
    }
    GetGuideSpare() {
      return this.prn;
    }
    GetNextTargetVector() {
      return this.hrn.Location;
    }
    GetInheritSpeed() {
      return this.Die.InheritSpeed;
    }
    GetIsClimb() {
      return this.Die.IsClimb;
    }
    GetCurrentTargetForward() {
      const t = this.Die.Entity.GetComponent(0);
      return t?.Valid
        ? t.GetRotation().RotateVector(Vector_1.Vector.ForwardVector)
        : this.Hte.ActorForward;
    }
    IsLegalExceptSkill() {
      return this.Mrn;
    }
    GetTargetIsSuiGuangType() {
      const t = this.Die?.GetHookInteractType();
      return !!t && t === "SuiGuangHook";
    }
    arn(t, e, i) {
      t
        ? e &&
          !this.Lie.HasTag(e) &&
          (this.Lie.AddTag(e), (this.rrn = e), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Character",
            32,
            "[RoleSceneInteractComponent] 添加定点钩索可用标签",
            ["reason", i],
            ["EntityId", this.Entity.Id],
          )
        : this.rrn &&
          this.Lie.HasTag(this.rrn) &&
          (this.Lie.RemoveTag(this.rrn),
          (this.rrn = void 0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Character",
            32,
            "[RoleSceneInteractComponent] 删除定点钩索可用标签",
            ["reason", i],
            ["EntityId", this.Entity.Id],
          );
    }
    lrn() {
      let t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.yNn.create()).rkn =
          MathUtils_1.MathUtils.NumberToLong(
            this.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        (t.M3n = Protocol_1.Aki.Protocol.VBs.create()),
        (t.M3n.X = this.Die.Location.X),
        (t.M3n.Y = this.Die.Location.Y),
        (t.M3n.Z = this.Die.Location.Z),
        CombatMessage_1.CombatNet.Call(14412, this.Entity, t));
    }
    _rn() {
      let t;
      this.Hte.IsAutonomousProxy &&
        (((t = Protocol_1.Aki.Protocol.u_s.create()).rkn =
          MathUtils_1.MathUtils.NumberToLong(
            this.Die.Entity.GetComponent(0).GetCreatureDataId(),
          )),
        Net_1.Net.Call(4996, t, (t) => {
          switch (t.lkn) {
            case Protocol_1.Aki.Protocol.lkn.Sys:
              break;
            case Protocol_1.Aki.Protocol.lkn.Proto_ErrSceneEntityNotExist:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 32, "钩锁点不存在", [
                  "EntityId",
                  this.Die.Entity.GetComponent(0).GetCreatureDataId(),
                ]);
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.lkn,
                5049,
              );
          }
        }));
    }
    grn() {
      let t;
      this.Hte.IsAutonomousProxy && this.Die?.WillBeDestroyedAfterHook
        ? (((t = Protocol_1.Aki.Protocol.jds.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(
              this.Die.Entity.GetComponent(0).GetCreatureDataId(),
            )),
          Net_1.Net.Call(24445, t, (t) => {}))
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
(RoleSceneInteractComponent.G7r = !1),
  (RoleSceneInteractComponent.TraceDebug = !1),
  (RoleSceneInteractComponent.DebugLog = !1),
  (RoleSceneInteractComponent = RoleSceneInteractComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(87)],
      RoleSceneInteractComponent,
    )),
  (exports.RoleSceneInteractComponent = RoleSceneInteractComponent);
// # sourceMappingURL=RoleSceneInteractComponent.js.map
