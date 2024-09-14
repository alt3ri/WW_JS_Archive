"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHookCommonItem = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
class GameplayCueHookCommonItem {
  constructor(e, t, r, o) {
    (this.OQt = e),
      (this.u$o = t),
      (this.TargetPosition = r),
      (this.Paths = o),
      (this.c$o = void 0),
      (this.m$o = 0),
      (this.dce = !1);
  }
  static Spawn(e, t, r, o) {
    e = new this(e, t, r, o);
    return (e.dce = !0), (e.c$o = e.d$o()), (e.m$o = e.C$o()), e;
  }
  Destroy() {
    RecorderBlueprintFunctionLibrary_1.default.Recording &&
      RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(
        this,
      ),
      (this.dce = !1),
      ActorSystem_1.ActorSystem.Put(this.c$o),
      EffectSystem_1.EffectSystem.IsValid(this.m$o) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.m$o,
          "[GameplayCueHookCommonItem.Destroy]",
          !0,
        ),
      this.g$o();
  }
  d$o() {
    const r = ActorSystem_1.ActorSystem.Get(
      UE.Actor.StaticClass(),
      this.OQt.GetTransform(),
    );
    return (
      GlobalData_1.GlobalData.IsPlayInEditor &&
        r.SetActorLabel(
          this.OQt.GetActorLabel() + ":" + GameplayCueHookCommonItem.name,
        ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Paths[0],
        UE.NiagaraSystem,
        (e) => {
          var t;
          this.dce &&
            e?.IsValid() &&
            r?.IsValid() &&
            ((t = r.AddComponentByClass(
              UE.NiagaraComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )).SetAsset(e),
            t.SetNiagaraVariableVec3("End", this.TargetPosition),
            r.K2_AttachToComponent(this.OQt.Mesh, this.u$o, 2, 2, 2, !1),
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
  C$o() {
    return EffectSystem_1.EffectSystem.SpawnEffect(
      this.OQt,
      new UE.Transform(this.TargetPosition),
      this.Paths[1],
      "[GameplayCueHookCommonItem.CreateBallEffect]",
      new EffectContext_1.EffectContext(this.OQt.EntityId),
      0,
    );
  }
  g$o() {
    EffectSystem_1.EffectSystem.SpawnEffect(
      this.OQt,
      new UE.Transform(this.TargetPosition),
      this.Paths[2],
      "[GameplayCueHookCommonItem.DestroyBallEffect]",
      new EffectContext_1.EffectContext(this.OQt.EntityId),
      0,
    );
  }
}
exports.GameplayCueHookCommonItem = GameplayCueHookCommonItem;
//# sourceMappingURL=GameplayCueHookCommonItem.js.map
