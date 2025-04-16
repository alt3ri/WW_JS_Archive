"use strict";
var SubActorPerformanceComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, r) {
      var o,
        i = arguments.length,
        s =
          i < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, n, r);
      else
        for (var c = t.length - 1; 0 <= c; c--)
          (o = t[c]) &&
            (s = (i < 3 ? o(s) : 3 < i ? o(e, n, s) : o(e, n)) || s);
      return 3 < i && s && Object.defineProperty(e, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubActorPerformanceComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class OrientActorData {
  constructor(t, e) {
    (this.OriginActor = t), (this.TargetActor = e);
  }
}
let SubActorPerformanceComponent =
  (SubActorPerformanceComponent_1 = class SubActorPerformanceComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.y0l = []),
        (this.E0l = new Set()),
        (this.I0l = new Set()),
        (this.Rnn = () => {
          if (this.Lo?.TowardEntity && 0 < this.Lo.TowardEntity.length)
            for (const n of this.Lo.TowardEntity) {
              var t,
                e = this.Hte?.GetInteractionMainActor();
              e &&
                (e = e.ReferenceActors?.Get(n.ReferenceActorKey)) &&
                ((t =
                  ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                    n.TargetEntityId,
                  ))
                  ? (t = t?.Entity?.GetComponent(1)) &&
                    (this.y0l.push(new OrientActorData(e, t)),
                    this.T0l(e),
                    this.L0l(n.TargetEntityId))
                  : this.R0l(n.TargetEntityId));
            }
        }),
        (this.GUe = (t, e, n) => {
          const r = e.PbDataId;
          this.E0l.has(r) &&
            (this.E0l.delete(r),
            this.Lo.TowardEntity?.forEach((t) => {
              var e;
              t.TargetEntityId === r &&
                ((e = this.Hte?.GetInteractionMainActor().ReferenceActors?.Get(
                  t.ReferenceActorKey,
                )),
                (t =
                  ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                    t.TargetEntityId,
                  )?.Entity?.GetComponent(1)),
                e) &&
                t &&
                (this.T0l(e),
                this.y0l.push(new OrientActorData(e, t)),
                this.L0l(r));
            }),
            0 === this.E0l.size) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            );
        }),
        (this.zpe = (t, e) => {
          var n;
          this.I0l.has(e.PbDataId) &&
            (this.I0l.delete(e.PbDataId),
            (n = this.y0l.find(
              (t) =>
                t.TargetActor.CreatureData.GetPbDataId() === e.PbDataId &&
                (this.U0l(t.OriginActor), !0),
            )),
            this.y0l.splice(this.y0l.indexOf(n), 1),
            this.R0l(e.PbDataId));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SubActorPerformanceComponent_1)[0];
      return (this.Lo = t), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(200)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        !0
      );
    }
    OnTick(t) {
      this.D0l();
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.GUe,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.GUe,
          ),
        !0
      );
    }
    D0l() {
      this.y0l &&
        0 < this.y0l.length &&
        this.y0l.forEach((t) => {
          var e = t.OriginActor.D_K2_GetActorLocation(),
            n = t.TargetActor.ActorLocation,
            e = UE.KismetMathLibrary.D_FindLookAtRotation(e, n);
          t.OriginActor.K2_SetActorRotation(e, !1);
        });
    }
    T0l(e) {
      var t = (0, puerts_1.$ref)(void 0),
        n = (e.GetAttachedActors(t, !0), (0, puerts_1.$unref)(t));
      for (let t = 0; t < n.Num(); ++t) {
        var r = n.Get(t);
        r instanceof UE.StaticMeshActor
          ? r.SetActorHiddenInGame(!1)
          : r instanceof UE.BP_EffectActor_C
            ? r.Play("[SubActorPerformanceComp]ShowOrientActor")
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "[SubActorPerformanceComp] RefActor的子Actor非StaticMesh及EffectActor",
                ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
                ["refActor", e.GetName()],
                ["subActor", r.GetName()],
              );
      }
    }
    U0l(e) {
      var t = (0, puerts_1.$ref)(void 0),
        n = (e.GetAttachedActors(t, !0), (0, puerts_1.$unref)(t));
      for (let t = 0; t < n.Num(); ++t) {
        var r = n.Get(t);
        r instanceof UE.StaticMeshActor
          ? r.SetActorHiddenInGame(!0)
          : r instanceof UE.BP_EffectActor_C
            ? r.Stop("[SubActorPerformanceComp]ShowOrientActor", !1)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "[SubActorPerformanceComp] RefActor的子Actor非StaticMesh及EffectActor",
                ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
                ["refActor", e.GetName()],
                ["subActor", r.GetName()],
              );
      }
    }
    R0l(t) {
      this.E0l.add(t),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.GUe,
        ) ||
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.AddEntity,
            this.GUe,
          );
    }
    L0l(t) {
      this.I0l.add(t),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ) ||
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          );
    }
  });
(SubActorPerformanceComponent = SubActorPerformanceComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(262)],
    SubActorPerformanceComponent,
  )),
  (exports.SubActorPerformanceComponent = SubActorPerformanceComponent);
//# sourceMappingURL=SubActorPerformanceComponent.js.map
