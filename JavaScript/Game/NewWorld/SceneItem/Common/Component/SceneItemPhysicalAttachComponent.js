"use strict";
let SceneItemPhysicalAttachComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let h;
    const o = arguments.length;
    let n =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, s);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (h = t[r]) && (n = (o < 3 ? h(n) : o > 3 ? h(e, i, n) : h(e, i)) || n);
    return o > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPhysicalAttachComponent = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
let SceneItemPhysicalAttachComponent =
  (SceneItemPhysicalAttachComponent_1 = class SceneItemPhysicalAttachComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.d1n = void 0),
        (this.C1n = void 0),
        (this.g1n = void 0),
        (this.f1n = void 0),
        (this.p1n = void 0),
        (this.Krr = void 0),
        (this.zie = void 0),
        (this.opi = void 0),
        (this.v1n = Vector_1.Vector.Create()),
        (this.M1n = (t) => {
          void 0 === this.f1n && this.S1n(),
            (this.Hte.PhysicsMode = 1),
            this.d1n?.SetLinearDamping(0.1),
            this.g1n || this.E1n();
          t = Vector_1.Vector.Create(
            this.g1n.HitLocation.op_Subtraction(
              t.Attacker.GetComponent(1).ActorLocation,
            ),
          );
          t.Normalize(),
            t.MultiplyEqual(this.g1n.HitDirection.Size()),
            this.d1n?.SetPhysicsLinearVelocity(t.ToUeVector());
        }),
        (this.y1n = (t, e) => {
          void 0 !== this.opi &&
            EffectSystem_1.EffectSystem.IsValid(this.opi) &&
            t.includes(-1278190765) &&
            (EffectSystem_1.EffectSystem.StopEffectById(
              this.opi,
              "[SceneItemPhysicalAttachComponent.StartHandleDestoryState]",
              !1,
            ),
            (this.opi = void 0));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemPhysicalAttachComponent_1)[0];
      return (this.Lo = t), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        (this.d1n = this.Hte.Owner?.GetComponentByClass(
          UE.StaticMeshComponent.StaticClass(),
        )),
        (this.C1n = this.Entity.GetComponent(138)),
        this.C1n.RegisterComponent(this),
        this.mEe(),
        !0
      );
    }
    OnActivate() {
      this.I1n(),
        StringUtils_1.StringUtils.IsEmpty(this.Lo?.EffectPath) || this.T1n(),
        this.v1n.DeepCopy(this.Hte.ActorLocationProxy);
    }
    OnEnd() {
      return this.L1n(), this.dEe(), !0;
    }
    OnTick(t) {
      let e = UE.NewArray(UE.Vector);
      e.Add(this.p1n.K2_GetActorLocation()),
        e.Add(this.Hte.ActorLocation),
        this.zie?.SetSplinePoints(e, 1, !0),
        !this.f1n?.IsValid() ||
          this.d1n.GetPhysicsLinearVelocity().Size() > 10 ||
          ((e = this.Hte.ActorLocationProxy),
          Vector_1.Vector.Dist(this.v1n, e) > 10) ||
          ((this.Hte.PhysicsMode = 0),
          this.f1n.K2_DestroyActor(),
          (this.f1n = void 0));
    }
    mEe() {
      EventSystem_1.EventSystem.AddWithTarget(
        this,
        EventDefine_1.EEventName.OnSceneItemHitByHitData,
        this.M1n,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.y1n,
        );
    }
    dEe() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this,
        EventDefine_1.EEventName.OnSceneItemHitByHitData,
        this.M1n,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.y1n,
        );
    }
    I1n() {
      let t;
      const e = new UE.Transform();
      e.SetTranslation(this.Hte.ActorLocation),
        this.Lo.AttachTarget.Type === "RelativePoint" &&
          ((t = new UE.Vector(
            this.Lo.AttachTarget.RelativePoint.X ?? 0,
            this.Lo.AttachTarget.RelativePoint.Y ?? 0,
            this.Lo.AttachTarget.RelativePoint.Z ?? 0,
          )),
          e.SetTranslation(this.Hte.ActorLocation.op_Addition(t))),
        void 0 === this.p1n &&
          (this.p1n = ActorSystem_1.ActorSystem.Get(
            UE.BP_PhysicsAttachedBase_C.StaticClass(),
            e,
          ));
    }
    S1n() {
      switch (
        (void 0 === this.f1n &&
          (this.f1n = ActorSystem_1.ActorSystem.Spawn(
            UE.PhysicsConstraintActor.StaticClass(),
            void 0,
            void 0,
          )),
        this.Lo.AngularLimit.Swing1Motion.Type)
      ) {
        case "ACM_Free":
          this.f1n.ConstraintComp.SetAngularSwing1Limit(0, 0);
          break;
        case "ACM_Limited":
          this.f1n.ConstraintComp.SetAngularSwing1Limit(
            1,
            this.Lo.AngularLimit.Swing1Motion.LimitValue,
          );
          break;
        case "ACM_Locked":
          this.f1n.ConstraintComp.SetAngularSwing1Limit(2, 0);
      }
      switch (this.Lo.AngularLimit.Swing2Motion.Type) {
        case "ACM_Free":
          this.f1n.ConstraintComp.SetAngularSwing2Limit(0, 0);
          break;
        case "ACM_Limited":
          this.f1n.ConstraintComp.SetAngularSwing2Limit(
            1,
            this.Lo.AngularLimit.Swing2Motion.LimitValue,
          );
          break;
        case "ACM_Locked":
          this.f1n.ConstraintComp.SetAngularSwing2Limit(2, 0);
      }
      switch (this.Lo.AngularLimit.TwistMotion.Type) {
        case "ACM_Free":
          this.f1n.ConstraintComp.SetAngularTwistLimit(0, 0);
          break;
        case "ACM_Limited":
          this.f1n.ConstraintComp.SetAngularTwistLimit(
            1,
            this.Lo.AngularLimit.TwistMotion.LimitValue,
          );
          break;
        case "ACM_Locked":
          this.f1n.ConstraintComp.SetAngularTwistLimit(2, 0);
      }
      this.f1n.K2_AttachToActor(this.p1n, void 0, 2, 2, 2, !1),
        (this.f1n.ConstraintComp.ConstraintActor1 = this.p1n),
        (this.f1n.ConstraintComp.ConstraintActor2 = this.Hte.Owner),
        this.f1n.ConstraintComp.SetConstrainedComponents(
          this.p1n?.GetComponentByClass(UE.PrimitiveComponent.StaticClass()),
          void 0,
          this.d1n,
          void 0,
        );
    }
    T1n() {
      let t;
      (this.Krr = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
        this.Krr &&
          (this.Krr.K2_AttachToActor(this.p1n, void 0, 2, 2, 2, !1),
          (t = UE.NewArray(UE.Vector)).Add(this.p1n.K2_GetActorLocation()),
          t.Add(this.Hte.ActorLocation),
          (this.zie = this.Krr.GetComponentByClass(
            UE.SplineComponent.StaticClass(),
          )),
          this.zie.SetSplinePoints(t, 1, !0),
          (this.opi = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            MathUtils_1.MathUtils.DefaultTransform,
            this.Lo?.EffectPath,
            "[SceneItemPhysicalAttachComponent.CreateSplineActor]",
            new EffectContext_1.EffectContext(void 0, this.Krr),
          )),
          EffectSystem_1.EffectSystem.IsValid(this.opi)) &&
          EffectSystem_1.EffectSystem.GetEffectActor(this.opi).K2_AttachToActor(
            this.Krr,
            void 0,
            2,
            2,
            2,
            !1,
          );
    }
    E1n() {
      this.g1n = this.Hte?.GetInteractionMainActor();
    }
    L1n() {
      void 0 !== this.f1n &&
        (ActorSystem_1.ActorSystem.Put(this.f1n), (this.f1n = void 0)),
        void 0 !== this.p1n &&
          (ActorSystem_1.ActorSystem.Put(this.p1n), (this.p1n = void 0));
    }
  });
(SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(196)],
    SceneItemPhysicalAttachComponent,
  )),
  (exports.SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent);
// # sourceMappingURL=SceneItemPhysicalAttachComponent.js.map
