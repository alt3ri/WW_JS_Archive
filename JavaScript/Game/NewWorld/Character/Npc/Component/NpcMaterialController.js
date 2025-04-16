"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcMaterialController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
class NpcMatHandleInfo {
  constructor() {
    (this.Id = ++NpcMatHandleInfo.Yla), (this.Type = 0), (this.Handle = 0);
  }
}
NpcMatHandleInfo.Yla = 0;
class NpcMaterialController {
  constructor(t) {
    (this.Entity = void 0),
      (this.ActorComp = void 0),
      (this.CreatureData = void 0),
      (this.HolographicEffectActor = void 0),
      (this.SimpleMatControlComponentInternal = void 0),
      (this.IsInitSimpleMatController = !1),
      (this.MaterialEffectHandleMap = new Map()),
      (this.Entity = t),
      (this.CreatureData = this.Entity.GetComponent(0)),
      (this.ActorComp = this.Entity.GetComponent(2));
  }
  get SimpleMatControlComponent() {
    if (!this.IsInitSimpleMatController) {
      this.IsInitSimpleMatController = !0;
      var t = this.ActorComp.Actor.AddComponentByClass(
        UE.BP_NPCMaterialController_C.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      );
      if (!t?.IsValid()) return;
      this.SimpleMatControlComponentInternal = t;
    }
    return this.SimpleMatControlComponentInternal;
  }
  Dispose() {
    var t;
    return (
      this.SimpleMatControlComponentInternal?.IsValid() &&
        this.SimpleMatControlComponent.K2_DestroyComponent(
          this.ActorComp.Actor,
        ),
      this.HolographicEffectActor?.IsValid() &&
        ((t = this.HolographicEffectActor) &&
          t.IsA(UE.BP_MaterialControllerRenderActor_C.StaticClass()) &&
          t.CharRenderingComponent?.Destroy(),
        ActorSystem_1.ActorSystem.Put(
          "NpcMaterialController.Dispose",
          this.HolographicEffectActor,
        )),
      !0
    );
  }
  LoadAndSetHolographicEffect() {
    if (!this.HolographicEffectActor?.IsValid()) {
      const e = RenderConfig_1.RenderConfig.HolographicPath;
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_CharacterControllerDataGroup_C,
        (t) => {
          this.ActorComp?.Actor.IsValid() &&
            (t?.IsValid()
              ? this.ActorComp.Actor.CharRenderingComponent?.AddMaterialControllerDataGroup(
                  t,
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "NPC",
                  50,
                  "[NpcMaterialController.LoadAndSetHolographicEffect] 无法找到投影材质效果DA",
                  ["EffectPath", e],
                  ["PbDataId", this.CreatureData?.GetPbDataId()],
                ));
        },
      );
    }
  }
  ApplyMaterialEffect(e) {
    if ("" === e || "None" === e) return 0;
    const i = new NpcMatHandleInfo();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrimaryDataAsset, (t) => {
        this.ActorComp?.Actor?.IsValid() &&
          (t?.IsValid()
            ? this.ApplyMaterialEffectInternal(t, i)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "NPC",
                50,
                "[NpcMaterialController.ApplyMaterialEffect] 加载DA失败",
                ["EffectPath", e],
                ["PbDataId", this.CreatureData?.GetPbDataId()],
              ));
      }),
      i.Id
    );
  }
  ApplyMaterialEffectByAsset(t) {
    var e = new NpcMatHandleInfo();
    return this.ApplyMaterialEffectInternal(t, e), e.Id;
  }
  ApplyMaterialEffectInternal(i, s) {
    if (i?.IsValid()) {
      let t = 0,
        e = 0;
      i.IsA(UE.PD_HolographicEffect_C.StaticClass())
        ? ((t = 1), (e = -1), this.ApplySimpleMaterialEffectByAsset(i))
        : i.IsA(UE.PD_CharacterControllerDataGroup_C.StaticClass())
          ? ((t = 3),
            (e =
              this.ActorComp?.Actor.CharRenderingComponent?.AddMaterialControllerDataGroup(
                i,
              ) ?? 0))
          : i.IsA(UE.PD_CharacterControllerData_C.StaticClass()) &&
            ((t = 2),
            (e =
              this.ActorComp?.Actor.CharRenderingComponent?.AddMaterialControllerData(
                i,
              ) ?? 0)),
        e
          ? ((s.Type = t),
            (s.Handle = e),
            this.MaterialEffectHandleMap.set(s.Id, s))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "NPC",
              50,
              "无法识别的材质特效类型",
              ["Effect", i.GetName()],
              ["PbDataId", this.CreatureData?.GetPbDataId()],
            );
    }
  }
  ApplySimpleMaterialEffect(e) {
    "" !== e &&
      "None" !== e &&
      this.SimpleMatControlComponent?.IsValid() &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_HolographicEffect_C,
        (t) => {
          this.ActorComp.Actor?.IsValid() &&
            this.SimpleMatControlComponent?.IsValid() &&
            (t?.IsValid()
              ? this.ApplySimpleMaterialEffectByAsset(t)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "NPC",
                  50,
                  "[NpcMaterialController.ApplySimpleMaterialEffect] 加载DA失败",
                  ["EffectPath", e],
                  ["PbDataId", this.CreatureData?.GetPbDataId()],
                ));
        },
      );
  }
  ApplySimpleMaterialEffectByAsset(t) {
    t?.IsValid() &&
      this.SimpleMatControlComponent?.IsValid() &&
      ((this.SimpleMatControlComponent.DATA = t),
      this.SimpleMatControlComponent.StartEffect());
  }
  RemoveMaterialEffect(t) {
    var e = this.MaterialEffectHandleMap.get(t);
    if (e) {
      switch (e.Type) {
        case 1:
          this.RemoveSimpleMaterialEffect();
          break;
        case 2:
          this.ActorComp?.Actor.CharRenderingComponent?.RemoveMaterialControllerData(
            e.Handle,
          );
          break;
        case 3:
          this.ActorComp?.Actor.CharRenderingComponent?.RemoveMaterialControllerDataGroup(
            e.Handle,
          );
      }
      this.MaterialEffectHandleMap.delete(t);
    }
  }
  RemoveSimpleMaterialEffect() {
    this.SimpleMatControlComponent?.IsValid() &&
      this.SimpleMatControlComponent.EndEffect();
  }
}
exports.NpcMaterialController = NpcMaterialController;
//# sourceMappingURL=NpcMaterialController.js.map
