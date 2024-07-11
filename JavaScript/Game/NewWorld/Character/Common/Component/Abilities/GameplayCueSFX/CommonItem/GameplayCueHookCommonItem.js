"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHookCommonItem = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../../../GlobalData");
const RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
class GameplayCueHookCommonItem {
  constructor(t, e, r, o) {
    (this.OKt = t),
      (this.dXo = e),
      (this.TargetPosition = r),
      (this.Paths = o),
      (this.CXo = void 0),
      (this.gXo = 0),
      (this.dce = !1);
  }
  static Spawn(t, e, r, o) {
    t = new this(t, e, r, o);
    return (t.dce = !0), (t.CXo = t.fXo()), (t.gXo = t.pXo()), t;
  }
  Destroy() {
    RecorderBlueprintFunctionLibrary_1.default.Recording &&
      RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(
        this,
      ),
      (this.dce = !1),
      ActorSystem_1.ActorSystem.Put(this.CXo),
      EffectSystem_1.EffectSystem.IsValid(this.gXo) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.gXo,
          "[GameplayCueHookCommonItem.Destroy]",
          !0,
        ),
      this.vXo();
  }
  static StaticSpawnHookActorRecord(t, e, r) {
    t = ResourceSystem_1.ResourceSystem.SyncLoad(t, UE.NiagaraSystem);
    t?.IsValid() &&
      e?.IsValid() &&
      ((e = e.AddComponentByClass(
        UE.NiagaraComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )).SetAsset(t),
      e.SetNiagaraVariableVec3("End", r));
  }
  fXo() {
    const r = ActorSystem_1.ActorSystem.Get(
      UE.Actor.StaticClass(),
      this.OKt.GetTransform(),
    );
    return (
      GlobalData_1.GlobalData.IsPlayInEditor &&
        r.SetActorLabel(
          this.OKt.GetActorLabel() + ":" + GameplayCueHookCommonItem.name,
        ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Paths[0],
        UE.NiagaraSystem,
        (t) => {
          let e;
          this.dce &&
            t?.IsValid() &&
            r?.IsValid() &&
            ((e = r.AddComponentByClass(
              UE.NiagaraComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )).SetAsset(t),
            e.SetNiagaraVariableVec3("End", this.TargetPosition),
            r.K2_AttachToComponent(this.OKt.Mesh, this.dXo, 2, 2, 2, !1),
            RecorderBlueprintFunctionLibrary_1.default.Recording) &&
            RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(
              r,
              this,
            );
        },
      ),
      r
    );
  }
  pXo() {
    return EffectSystem_1.EffectSystem.SpawnEffect(
      this.OKt,
      new UE.Transform(this.TargetPosition),
      this.Paths[1],
      "[GameplayCueHookCommonItem.CreateBallEffect]",
      new EffectContext_1.EffectContext(this.OKt.EntityId),
      0,
    );
  }
  vXo() {
    EffectSystem_1.EffectSystem.SpawnEffect(
      this.OKt,
      new UE.Transform(this.TargetPosition),
      this.Paths[2],
      "[GameplayCueHookCommonItem.DestroyBallEffect]",
      new EffectContext_1.EffectContext(this.OKt.EntityId),
      0,
    );
  }
}
exports.GameplayCueHookCommonItem = GameplayCueHookCommonItem;
// # sourceMappingURL=GameplayCueHookCommonItem.js.map
