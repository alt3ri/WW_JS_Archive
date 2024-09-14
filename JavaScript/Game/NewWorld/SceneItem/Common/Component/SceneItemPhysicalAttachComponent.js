"use strict";
var SceneItemPhysicalAttachComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        o = arguments.length,
        n =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (h = t[r]) &&
            (n = (o < 3 ? h(n) : 3 < o ? h(e, i, n) : h(e, i)) || n);
      return 3 < o && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPhysicalAttachComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData");
let SceneItemPhysicalAttachComponent =
  (SceneItemPhysicalAttachComponent_1 = class SceneItemPhysicalAttachComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.Qln = void 0),
        (this.Xln = void 0),
        (this.$ln = void 0),
        (this.Yln = void 0),
        (this.Jln = void 0),
        (this.Hnr = void 0),
        (this.zie = void 0),
        (this.rvi = void 0),
        (this.zln = Vector_1.Vector.Create()),
        (this.Zln = (t) => {
          void 0 === this.Yln && this.e1n(),
            (this.Hte.PhysicsMode = 1),
            this.Qln?.SetLinearDamping(0.1),
            this.$ln || this.t1n();
          t = Vector_1.Vector.Create(
            this.$ln.HitLocation.op_Subtraction(
              t.Attacker.GetComponent(1).ActorLocation,
            ),
          );
          t.Normalize(),
            t.MultiplyEqual(this.$ln.HitDirection.Size()),
            this.Qln?.SetPhysicsLinearVelocity(t.ToUeVector());
        }),
        (this.i1n = (t, e) => {
          void 0 !== this.rvi &&
            EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
            t.includes(-1278190765) &&
            (EffectSystem_1.EffectSystem.StopEffectById(
              this.rvi,
              "[SceneItemPhysicalAttachComponent.StartHandleDestoryState]",
              !1,
            ),
            (this.rvi = void 0));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemPhysicalAttachComponent_1)[0];
      return (this.Lo = t), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(187)),
        (this.Qln = this.Hte.Owner?.GetComponentByClass(
          UE.StaticMeshComponent.StaticClass(),
        )),
        (this.Xln = this.Entity.GetComponent(141)),
        this.Xln.RegisterComponent(this),
        this.mSe(),
        !0
      );
    }
    OnActivate() {
      this.o1n(),
        StringUtils_1.StringUtils.IsEmpty(this.Lo?.EffectPath) || this.r1n(),
        this.zln.DeepCopy(this.Hte.ActorLocationProxy);
    }
    OnEnd() {
      return this.n1n(), this.dSe(), !0;
    }
    OnTick(t) {
      var e = UE.NewArray(UE.Vector);
      e.Add(this.Jln.K2_GetActorLocation()),
        e.Add(this.Hte.ActorLocation),
        this.zie?.SetSplinePoints(e, 1, !0),
        !this.Yln?.IsValid() ||
          10 < this.Qln.GetPhysicsLinearVelocity().Size() ||
          ((e = this.Hte.ActorLocationProxy),
          10 < Vector_1.Vector.Dist(this.zln, e)) ||
          ((this.Hte.PhysicsMode = 0),
          this.Yln.K2_DestroyActor(),
          (this.Yln = void 0));
    }
    mSe() {
      EventSystem_1.EventSystem.AddWithTarget(
        this,
        EventDefine_1.EEventName.OnSceneItemHitByHitData,
        this.Zln,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.i1n,
        );
    }
    dSe() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this,
        EventDefine_1.EEventName.OnSceneItemHitByHitData,
        this.Zln,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.i1n,
        );
    }
    o1n() {
      var t,
        e = new UE.Transform();
      e.SetTranslation(this.Hte.ActorLocation),
        "RelativePoint" === this.Lo.AttachTarget.Type &&
          ((t = new UE.Vector(
            this.Lo.AttachTarget.RelativePoint.X ?? 0,
            this.Lo.AttachTarget.RelativePoint.Y ?? 0,
            this.Lo.AttachTarget.RelativePoint.Z ?? 0,
          )),
          e.SetTranslation(this.Hte.ActorLocation.op_Addition(t))),
        void 0 === this.Jln &&
          (this.Jln = ActorSystem_1.ActorSystem.Get(
            UE.BP_PhysicsAttachedBase_C.StaticClass(),
            e,
          ));
    }
    e1n() {
      switch (
        (void 0 === this.Yln &&
          (this.Yln = ActorSystem_1.ActorSystem.Spawn(
            UE.PhysicsConstraintActor.StaticClass(),
            void 0,
            void 0,
          )),
        this.Lo.AngularLimit.Swing1Motion.Type)
      ) {
        case "ACM_Free":
          this.Yln.ConstraintComp.SetAngularSwing1Limit(0, 0);
          break;
        case "ACM_Limited":
          this.Yln.ConstraintComp.SetAngularSwing1Limit(
            1,
            this.Lo.AngularLimit.Swing1Motion.LimitValue,
          );
          break;
        case "ACM_Locked":
          this.Yln.ConstraintComp.SetAngularSwing1Limit(2, 0);
      }
      switch (this.Lo.AngularLimit.Swing2Motion.Type) {
        case "ACM_Free":
          this.Yln.ConstraintComp.SetAngularSwing2Limit(0, 0);
          break;
        case "ACM_Limited":
          this.Yln.ConstraintComp.SetAngularSwing2Limit(
            1,
            this.Lo.AngularLimit.Swing2Motion.LimitValue,
          );
          break;
        case "ACM_Locked":
          this.Yln.ConstraintComp.SetAngularSwing2Limit(2, 0);
      }
      switch (this.Lo.AngularLimit.TwistMotion.Type) {
        case "ACM_Free":
          this.Yln.ConstraintComp.SetAngularTwistLimit(0, 0);
          break;
        case "ACM_Limited":
          this.Yln.ConstraintComp.SetAngularTwistLimit(
            1,
            this.Lo.AngularLimit.TwistMotion.LimitValue,
          );
          break;
        case "ACM_Locked":
          this.Yln.ConstraintComp.SetAngularTwistLimit(2, 0);
      }
      this.Yln.K2_AttachToActor(this.Jln, void 0, 2, 2, 2, !1),
        (this.Yln.ConstraintComp.ConstraintActor1 = this.Jln),
        (this.Yln.ConstraintComp.ConstraintActor2 = this.Hte.Owner),
        this.Yln.ConstraintComp.SetConstrainedComponents(
          this.Jln?.GetComponentByClass(UE.PrimitiveComponent.StaticClass()),
          void 0,
          this.Qln,
          void 0,
        );
    }
    r1n() {
      var t;
      (this.Hnr = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
        this.Hnr &&
          (this.Hnr.K2_AttachToActor(this.Jln, void 0, 2, 2, 2, !1),
          (t = UE.NewArray(UE.Vector)).Add(this.Jln.K2_GetActorLocation()),
          t.Add(this.Hte.ActorLocation),
          (this.zie = this.Hnr.GetComponentByClass(
            UE.SplineComponent.StaticClass(),
          )),
          this.zie.SetSplinePoints(t, 1, !0),
          (this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            MathUtils_1.MathUtils.DefaultTransform,
            this.Lo?.EffectPath,
            "[SceneItemPhysicalAttachComponent.CreateSplineActor]",
            new EffectContext_1.EffectContext(void 0, this.Hnr),
          )),
          EffectSystem_1.EffectSystem.IsValid(this.rvi)) &&
          EffectSystem_1.EffectSystem.GetEffectActor(this.rvi).K2_AttachToActor(
            this.Hnr,
            void 0,
            2,
            2,
            2,
            !1,
          );
    }
    t1n() {
      this.$ln = this.Hte?.GetInteractionMainActor();
    }
    n1n() {
      void 0 !== this.Yln &&
        (ActorSystem_1.ActorSystem.Put(this.Yln), (this.Yln = void 0)),
        void 0 !== this.Jln &&
          (ActorSystem_1.ActorSystem.Put(this.Jln), (this.Jln = void 0));
    }
  });
(SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(203)],
    SceneItemPhysicalAttachComponent,
  )),
  (exports.SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent);
//# sourceMappingURL=SceneItemPhysicalAttachComponent.js.map
