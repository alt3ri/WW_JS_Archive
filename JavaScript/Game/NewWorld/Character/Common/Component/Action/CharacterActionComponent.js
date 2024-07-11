"use strict";
var CharacterActionComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, o) {
      var s,
        h = arguments.length,
        r =
          h < 3
            ? i
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(i, e))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, e, o);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (s = t[n]) &&
            (r = (h < 3 ? s(r) : 3 < h ? s(i, e, r) : s(i, e)) || r);
      return 3 < h && r && Object.defineProperty(i, e, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterActionComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../../Global"),
  InputController_1 = require("../../../../../Input/InputController"),
  LevelGamePlayController_1 = require("../../../../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FOURTY_FIVE = 45,
  ZERO_EIGHT = 0.8,
  FIVETY = 50,
  ONE_HUNDRED_FOURTY = 140,
  TWO_HUNDRED_TWENTY = 220,
  COLLISION_RADIUS_IN = 15,
  COLLISION_RADIUS_OUT = 50,
  COLLISION_RESET_ANGLE = 91,
  DEFAULT_CATAPULT_TIME = 0.6,
  DEFAULT_CATAPULT_GRAVITY = 1960,
  CATAPULT_SKILL_ID = 400102,
  SUPER_CATAPULT_SKILL_ID = 400107,
  BOUNCE_SKILL_ID = 400104,
  MAX_ANIM_STATE_CHANGE_COUNT = 600;
let CharacterActionComponent =
  (CharacterActionComponent_1 = class CharacterActionComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.mBe = void 0),
        (this.Lie = void 0),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.cBe = void 0),
        (this.OriginCapsuleHalfHeight = 0),
        (this.OriginCapsuleRadius = 0),
        (this.IsSitDown = !1),
        (this.IsStandingUp = !1),
        (this.Chair = void 0),
        (this.EnterSitDownIndex = 0),
        (this.LeaveSitDownIndex = 0),
        (this.IsUseCatapultUpAnim = !1),
        (this.w2r = void 0),
        (this.B2r = void 0),
        (this.cz = Vector_1.Vector.Create()),
        (this.fz = Vector_1.Vector.Create()),
        (this.cie = Rotator_1.Rotator.Create()),
        (this.b2r = void 0),
        (this.q2r = void 0),
        (this.pZo = new Array()),
        (this.G2r = !1),
        (this.N2r = void 0),
        (this.O2r = void 0),
        (this.gU = !1),
        (this.Giant = void 0),
        (this.k2r = !1),
        (this.F2r = Vector_1.Vector.Create()),
        (this.V2r = (t, i) => {
          i || this.LeaveSitDownAction();
        }),
        (this.Moi = (t, i) => {
          i && this.IsSitDown && this.PreLeaveSitDownAction();
        }),
        (this.H2r = () => {
          this.IsSitDown && this.PreLeaveSitDownAction();
        }),
        (this.j2r = (t) => {
          this.IsSitDown &&
            "LevelD" !== t.PlotLevel &&
            this.PreLeaveSitDownAction();
        }),
        (this.W2r = (t) => {
          var i;
          this.Hte.IsAutonomousProxy &&
            t?.Valid &&
            ((i = this.Entity.GetComponent(26)),
            (t = t.GetComponent(26)),
            (i.IsSitDown = t.IsSitDown),
            t.Chair) &&
            ((i.G2r = t.G2r),
            (i.Chair = t.Chair),
            i.CalculateChairDir(),
            (t.G2r || t.IsStandingUp) && (t.ResetCollision(), i.FTe()),
            t.IsSitDown) &&
            (i.EnterSitDownAction(t.Chair),
            i.DoSitDownAction(),
            t.ResetCollision());
        }),
        (this.K2r = (t, i) => {
          var e, o;
          this.Chair &&
            ((e = this.Chair.GetComponent(0)?.GetCreatureDataId()),
            (o = Protocol_1.Aki.Protocol.nNn.create()),
            t &&
              ((o.f9n = t), o.f9n.length > MAX_ANIM_STATE_CHANGE_COUNT) &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Interaction",
                20,
                "RequestSitDownAction同步数据过大",
                ["States", o.f9n],
              ),
            i && (o.p9n = i),
            LevelGamePlayController_1.LevelGamePlayController.RequestChairSit(
              e,
              this.IsSitDown,
              o,
            ));
        }),
        (this.Q2r = (t, i) => {
          i || (this.Gce.JumpUpRate = 1);
        });
    }
    static get Dependencies() {
      return [3, 158, 185];
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.CheckGetComponent(3)),
        (this.OriginCapsuleRadius = this.Hte.Radius),
        (this.OriginCapsuleHalfHeight = this.Hte.HalfHeight),
        (this.mBe = this.Entity.GetComponent(158)),
        (this.Gce = this.Entity.GetComponent(161)),
        (this.cBe = this.Entity.GetComponent(33)),
        !!this.mBe &&
          ((this.Lie = this.Entity.GetComponent(185)), !!this.Lie) &&
          ((this.IsSitDown = !1),
          (this.Chair = void 0),
          (this.Giant = void 0),
          (this.G2r = !1),
          (this.gU = !1),
          (this.q2r = this.Lie.ListenForTagAddOrRemove(-451106150, this.Q2r)),
          !0)
      );
    }
    OnActivate() {
      if (this.Hte.IsAutonomousProxy && !this.gU) {
        if (
          ((this.b2r = this.Lie.ListenForTagAddOrRemove(-2104691392, this.V2r)),
          this.Lie?.Valid)
        )
          for (const t of CharacterActionComponent_1.X2r)
            this.pZo.push(this.Lie.ListenForTagAddOrRemove(t, this.Moi));
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W2r,
        ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.TeleportStart,
            this.H2r,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.PlotNetworkStart,
            this.j2r,
          ),
          (this.gU = !0);
      }
    }
    OnEnd() {
      if (this.gU) {
        this.b2r.EndTask(),
          (this.b2r = void 0),
          this.q2r.EndTask(),
          (this.q2r = void 0);
        for (const t of this.pZo) t.EndTask();
        (this.pZo.length = 0),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.RoleOnStateInherit,
            this.W2r,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.TeleportStart,
            this.H2r,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.PlotNetworkStart,
            this.j2r,
          );
      }
      return !0;
    }
    OnTick() {
      var t, i, e;
      this.Hte.IsAutonomousProxy &&
        (this.IsSitDown &&
          this.Lie.HasTag(30322312) &&
          this.Gce.HasMoveInput &&
          this.PreLeaveSitDownAction(),
        this.G2r &&
          ((e = this.Chair.GetComponent(182).ActorLocationProxy),
          (t = this.Hte.ActorLocationProxy),
          (i = this.Hte.ActorForwardProxy),
          (t = Vector2D_1.Vector2D.Create(t.X - e.X, t.Y - e.Y).DotProduct(
            this.N2r,
          )),
          (e = Vector2D_1.Vector2D.Create(i.X, i.Y)).Normalize(),
          (i =
            Math.acos(this.O2r.DotProduct(e)) * MathUtils_1.MathUtils.RadToDeg),
          t < COLLISION_RADIUS_IN ||
            (t > COLLISION_RADIUS_OUT && this.Gce.HasMoveInput) ||
            Math.abs(i) > COLLISION_RESET_ANGLE) &&
          this.ResetCollision(),
        this.k2r) &&
        this.Hte.ActorRotationProxy.Equals2(this.Hte.InputRotator) &&
        ((this.k2r = !1),
        this.Lie.AddTag(1190560501),
        (e = this.Entity.GetComponent(52)),
        InputController_1.InputController.AddInputHandler(e),
        CameraController_1.CameraController.SetInputEnable(
          Global_1.Global.BaseCharacter,
          !0,
        ));
    }
    HTe(t, i) {
      var e = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0,
        e = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
      let o = void 0;
      o =
        e &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))
          ?.Valid
          ? e.Entity.GetComponent(182)
          : t;
      var e = (0, puerts_1.$ref)(void 0),
        s = (o.Owner.GetAttachedActors(e), (0, puerts_1.$unref)(e)),
        h = s.Num();
      for (let t = 0; t < h; ++t) {
        var r = s.Get(t),
          n = (0, puerts_1.$ref)(void 0),
          a = (r.GetAttachedActors(n), (0, puerts_1.$unref)(n)),
          _ = a.Num();
        for (let t = 0; t < _; ++t)
          this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(a.Get(t), i);
      }
    }
    ResetCollision() {
      this.G2r = !1;
      var t = this.Chair.GetComponent(182);
      this.HTe(t, !1),
        this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2),
        (this.Chair = void 0);
    }
    GetSitDownState() {
      return this.IsSitDown;
    }
    EnterSitDownAction(t) {
      return (
        !this.Lie.HasAnyTag([-1446183172, -1371021686]) &&
        (this.cBe.StopAllSkills("CharacterActionComponent.EnterSitDownAction"),
        (this.EnterSitDownIndex = this.IsChairCanInteract(t) - 1),
        (this.IsSitDown = !0),
        (this.G2r = !1),
        (this.Chair = t),
        this.$2r(),
        !0)
      );
    }
    $2r() {
      this.K2r(void 0, void 0);
    }
    OnResponseSit(t, i) {
      0 !== i && (this.IsSitDown = !t);
    }
    DoSitDownAction() {
      var t, i;
      this.Chair &&
        (this.cz.Reset(),
        this.Gce.SetForceSpeed(this.cz),
        (t = this.Chair.GetComponent(182)),
        (i = this.Chair.GetComponent(178)),
        this.cz.DeepCopy(i.GetInteractPoint()),
        (this.cz.Z += this.OriginCapsuleHalfHeight),
        this.cie.DeepCopy(t.ActorRotationProxy),
        (this.cie.Yaw += 90),
        this.Hte.SetInputRotator(this.cie),
        this.Hte.SetActorLocationAndRotation(
          this.cz.ToUeVector(),
          this.cie.ToUeRotator(),
          "角色坐下",
          !1,
        ),
        CameraController_1.CameraController.FightCamera.GetComponent(
          5,
        ).ResetArmLocation(!0, 0.5),
        this.FTe());
    }
    FTe() {
      this.HTe(this.Chair.GetComponent(182), !0),
        this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
    }
    PreLeaveSitDownAction() {
      (this.IsSitDown = !1),
        (this.IsStandingUp = !0),
        this.Y2r(),
        this.K2r(void 0, void 0);
    }
    Y2r() {
      var t;
      this.Chair &&
        (this.Hte.Actor.CharacterMovement.SetMovementMode(1),
        this.cz.DeepCopy(this.Hte.InputDirectProxy),
        this.cz.Normalize(),
        (t = this.Chair.GetComponent(178).GetInteractController().SectorRange),
        this.cz.DotProduct(this.Hte.ActorForwardProxy) > ZERO_EIGHT
          ? (this.LeaveSitDownIndex = 0)
          : (this.cz.CrossProduct(this.Hte.ActorForwardProxy, this.fz),
            0 <= this.fz.Z
              ? t.Begin < -FOURTY_FIVE
                ? (this.LeaveSitDownIndex = 1)
                : (this.LeaveSitDownIndex = 0)
              : t.End > FOURTY_FIVE
                ? (this.LeaveSitDownIndex = 2)
                : (this.LeaveSitDownIndex = 0)));
    }
    LeaveSitDownAction() {
      (this.IsStandingUp = !1),
        this.Chair &&
          this.Hte.IsAutonomousProxy &&
          ((this.G2r = !0), this.CalculateChairDir());
    }
    CalculateChairDir() {
      var t, i, e;
      this.Chair &&
        this.Hte &&
        ((t = this.Chair.GetComponent(182).ActorLocationProxy),
        (i = this.Hte.ActorLocationProxy),
        (e = this.Hte.ActorForwardProxy),
        (this.N2r = Vector2D_1.Vector2D.Create(i.X - t.X, i.Y - t.Y)),
        this.N2r.Normalize(),
        (this.O2r = Vector2D_1.Vector2D.Create(e.X, e.Y)),
        this.O2r.Normalize());
    }
    IsChairCanInteract(t) {
      t = t.GetComponent(182);
      if (!t) return 0;
      this.Hte.ActorLocationProxy.Subtraction(t.ActorLocationProxy, this.cz),
        (this.cz.Z = 0),
        this.cz.Normalize();
      var i = this.cz.DotProduct(t.ActorRightProxy);
      let e = Math.acos(i) * MathUtils_1.MathUtils.RadToDeg;
      return (
        this.cz.CrossProduct(t.ActorRightProxy, this.fz),
        this.fz.Z < 0 && (e *= -1),
        e >= -FIVETY && e <= FIVETY
          ? 1
          : e >= FIVETY && e <= ONE_HUNDRED_FOURTY
            ? 2
            : e >= -ONE_HUNDRED_FOURTY && e <= -FIVETY
              ? 3
              : (e < 0 && (e += MathUtils_1.PI_DEG_DOUBLE),
                e >= ONE_HUNDRED_FOURTY && e <= TWO_HUNDRED_TWENTY ? 4 : 0)
      );
    }
    StartCatapult(t, i) {
      var e, o, s, h, r, n, a;
      t &&
        i.Param &&
        (a = this.Entity.GetComponent(30)) &&
        (e = this.Entity.GetComponent(33)) &&
        ((s = (o = i.Type === IAction_1.ELeisureInteract.SuperCatapult)
          ? SUPER_CATAPULT_SKILL_ID
          : CATAPULT_SKILL_ID),
        e.BeginSkill(s, {
          Context: "CharacterActionComponent.StartCatapult",
        })) &&
        ((h = (t = t.GetComponent(1)).ActorLocationProxy),
        (t = t.ActorQuatProxy),
        (r = i.Param.Time ?? DEFAULT_CATAPULT_TIME),
        (n = i.Param.Gravity ?? DEFAULT_CATAPULT_GRAVITY),
        CharacterActionComponent_1.Lz.FromConfigVector(i.Param.P1),
        t.RotateVector(
          CharacterActionComponent_1.Lz,
          CharacterActionComponent_1.Lz,
        ),
        CharacterActionComponent_1.Lz.AdditionEqual(h),
        CharacterActionComponent_1.Tz.FromConfigVector(i.Param.P2),
        t.RotateVector(
          CharacterActionComponent_1.Tz,
          CharacterActionComponent_1.Tz,
        ),
        CharacterActionComponent_1.Tz.AdditionEqual(h),
        a.SetConfig(
          r,
          h,
          CharacterActionComponent_1.Lz,
          CharacterActionComponent_1.Tz,
          void 0,
          n,
          void 0,
          o,
        ),
        (i = Vector_1.Vector.Create(
          CharacterActionComponent_1.Lz,
        )).SubtractionEqual(h),
        i.Normalize(),
        (t = Vector_1.Vector.Create(0, 0, 1)),
        (a = MathUtils_1.MathUtils.DotProduct(t, i)),
        (this.IsUseCatapultUpAnim =
          a > Math.cos((this.J2r() / 2 / 180) * Math.PI)),
        this.F2r.DeepCopy(CharacterActionComponent_1.Tz),
        e.BeginSkill(s, { Context: "CharacterActionComponent.StartCatapult" }));
    }
    EndCatapult() {}
    StartBounce(t) {
      var i,
        e,
        o = this.Entity.GetComponent(30);
      o &&
        (i = this.Entity.GetComponent(33)) &&
        i.BeginSkill(BOUNCE_SKILL_ID, {
          Context: "CharacterActionComponent.StartBounce",
        }) &&
        ((e = (i = this.Entity.GetComponent(1)).ActorLocationProxy),
        CharacterActionComponent_1.Lz.DeepCopy(e),
        (CharacterActionComponent_1.Lz.Z += t.Height),
        o.SetConfig(
          t.Time ?? 2,
          e,
          CharacterActionComponent_1.Lz,
          CharacterActionComponent_1.Lz,
          t.MotionCurve,
          0,
          i.ActorRotationProxy,
        ),
        (this.IsUseCatapultUpAnim = !1));
    }
    EndBounce() {
      var t = this.Entity.GetComponent(33);
      !t ||
        (void 0 !== (t = t.CurrentSkill) && t.SkillId !== BOUNCE_SKILL_ID) ||
        ((t = this.Entity.GetComponent(161)).SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        t.CharacterMovement.SetMovementMode(3));
    }
    GetInteractionTargetLocation() {
      return this.F2r;
    }
    get ExecutionTrace() {
      return (
        this.B2r ||
          ((this.B2r = UE.NewObject(UE.TraceLineElement.StaticClass())),
          (this.B2r.WorldContextObject = this.Hte.Owner),
          (this.B2r.bIgnoreSelf = !0),
          (this.B2r.bIsSingle = !0),
          this.B2r.SetTraceTypeQuery(
            QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
          ),
          this.B2r.SetDrawDebugTrace(0)),
        this.B2r
      );
    }
    PlayCustomCommonSkill(t) {
      this.cBe?.CheckIsLoaded() &&
        this.cBe.BeginSkill(t, {
          Context: "CharacterActionComponent.PlayCustomCommonSkill",
        });
    }
    J2r() {
      return (
        this.w2r ||
          (this.w2r =
            CommonParamById_1.configCommonParamById.GetFloatConfig(
              "CatapultAnimAngle",
            )),
        this.w2r
      );
    }
  });
(CharacterActionComponent.X2r = [
  -1371021686, -1503953470, 1008164187, 1996624497,
]),
  (CharacterActionComponent.Lz = Vector_1.Vector.Create()),
  (CharacterActionComponent.Tz = Vector_1.Vector.Create()),
  (CharacterActionComponent = CharacterActionComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(26)],
      CharacterActionComponent,
    )),
  (exports.CharacterActionComponent = CharacterActionComponent);
//# sourceMappingURL=CharacterActionComponent.js.map
