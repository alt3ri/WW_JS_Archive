"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHookCommonItem = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
class GameplayCueHookCommonItem {
  constructor(t, e, r, i) {
    (this.OQt = t),
      (this.u$o = e),
      (this.TargetPosition = r),
      (this.Paths = i),
      (this.c$o = void 0),
      (this.m$o = 0),
      (this.dce = !1),
      (this.nfn = void 0);
  }
  static Spawn(t, e, r, i) {
    t = new this(t, e, r, i);
    return (t.dce = !0), (t.c$o = t.d$o()), (t.m$o = t.C$o()), t;
  }
  Destroy() {
    RecorderBlueprintFunctionLibrary_1.default.Recording &&
      RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(
        this,
      ),
      (this.dce = !1),
      (this.nfn = void 0),
      ActorSystem_1.ActorSystem.Put(
        "GameplayCueHookCommonItem.Destroy",
        this.c$o,
      ),
      EffectSystem_1.EffectSystem.IsValid(this.m$o) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.m$o,
          "[GameplayCueHookCommonItem.Destroy]",
          !0,
        ),
      this.g$o();
  }
  Tick(t) {
    this.TargetPosition.Set(t.X, t.Y, t.Z),
      EffectSystem_1.EffectSystem.IsValid(this.m$o) &&
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.m$o,
        )?.D_K2_SetActorLocation(t, !1, void 0, !0);
    t = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, t);
    this.nfn?.SetNiagaraVariableVec3("end", t);
  }
  d$o() {
    const e = ActorSystem_1.ActorSystem.Get(
      UE.Actor.StaticClass(),
      this.OQt.D_GetTransform(),
    );
    return (
      GlobalData_1.GlobalData.IsPlayInEditor &&
        e.SetActorLabel(
          this.OQt.GetActorLabel() + ":" + GameplayCueHookCommonItem.name,
        ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Paths[0],
        UE.NiagaraSystem,
        (t) => {
          this.dce &&
            t?.IsValid() &&
            e?.IsValid() &&
            ((this.nfn = e.AddComponentByClass(
              UE.NiagaraComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )),
            this.nfn.SetAsset(t),
            (t = UE.KismetMathLibrary.WD_WorldToLocal(
              GlobalData_1.GlobalData.World,
              this.TargetPosition,
            )),
            this.nfn.SetNiagaraVariableVec3("end", t),
            TimerSystem_1.TimerSystem.Next(() => {
              UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(
                this.nfn,
                -1,
              );
            }),
            e.K2_AttachToComponent(this.OQt.Mesh, this.u$o, 2, 2, 2, !1),
            RecorderBlueprintFunctionLibrary_1.default.Recording) &&
            RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(
              e,
              this,
            );
        },
      ),
      e
    );
  }
  C$o() {
    return EffectSystem_1.EffectSystem.SpawnEffect(
      this.OQt,
      new UE.TransformDouble(this.TargetPosition),
      this.Paths[1],
      "[GameplayCueHookCommonItem.CreateBallEffect]",
      new EffectContext_1.EffectContext(this.OQt.EntityId),
      0,
    );
  }
  g$o() {
    EffectSystem_1.EffectSystem.SpawnEffect(
      this.OQt,
      new UE.TransformDouble(this.TargetPosition),
      this.Paths[2],
      "[GameplayCueHookCommonItem.DestroyBallEffect]",
      new EffectContext_1.EffectContext(this.OQt.EntityId),
      0,
    );
  }
}
exports.GameplayCueHookCommonItem = GameplayCueHookCommonItem;
//# sourceMappingURL=GameplayCueHookCommonItem.js.map
