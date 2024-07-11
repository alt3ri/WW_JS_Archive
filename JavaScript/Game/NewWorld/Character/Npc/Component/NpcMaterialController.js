"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcMaterialController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
class NpcMaterialController {
  constructor(t) {
    (this.Entity = void 0),
      (this.ActorComp = void 0),
      (this.CreatureData = void 0),
      (this.HolographicEffectActor = void 0),
      (this.SimpleMatControlComponentInternal = void 0),
      (this.IsInitSimpleMatController = !1),
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
    return (
      this.SimpleMatControlComponentInternal?.IsValid() &&
        this.SimpleMatControlComponent.K2_DestroyComponent(
          this.ActorComp.Actor,
        ),
      this.HolographicEffectActor?.IsValid() &&
        ActorSystem_1.ActorSystem.Put(this.HolographicEffectActor),
      !0
    );
  }
  LoadAndSetHolographicEffect() {
    if (!this.HolographicEffectActor?.IsValid()) {
      var t = this.CreatureData?.GetModelConfig()?.DA.AssetPathName?.toString();
      if (t?.length && "None" !== t)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "NPC",
            51,
            "[NpcMaterialController.LoadAndSetHolographicEffect] 无法为拼装NPC实体添加投影效果",
            ["CombineDaPath", t],
            ["PbDataId", this.CreatureData?.GetPbDataId()],
          );
      else {
        const r = RenderConfig_1.RenderConfig.HolographicPath;
        ResourceSystem_1.ResourceSystem.LoadAsync(
          r,
          UE.PD_CharacterControllerDataGroup_C,
          (t) => {
            var e, i, o;
            this.ActorComp?.Actor.IsValid() &&
              (t?.IsValid()
                ? (i = (e = this.ActorComp.Actor.K2_GetComponentsByClass(
                    UE.SkeletalMeshComponent.StaticClass(),
                  )).Num())
                  ? ((this.HolographicEffectActor =
                      ActorSystem_1.ActorSystem.Get(
                        UE.BP_MaterialControllerRenderActor_C.StaticClass(),
                        this.ActorComp.Actor.GetOwner().GetTransform(),
                      )),
                    (o =
                      this.HolographicEffectActor).CharRenderingComponent.Init(
                      7,
                    ),
                    o.CharRenderingComponent.AddComponentByCase(0, e.Get(0)),
                    o.CharRenderingComponent.AddMaterialControllerDataGroup(t))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "NPC",
                      51,
                      "[NpcMaterialController.LoadAndSetHolographicEffect] 尝试添加投影效果时找不到实体MeshComp",
                      ["EffectPath", r],
                      ["PbDataId", this.CreatureData?.GetPbDataId()],
                      ["SkeletalCompNum", i],
                    )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "NPC",
                    51,
                    "[NpcMaterialController.LoadAndSetHolographicEffect] 无法找到投影材质效果DA",
                    ["EffectPath", r],
                    ["PbDataId", this.CreatureData?.GetPbDataId()],
                  ));
          },
        );
      }
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
              ? ((this.SimpleMatControlComponent.DATA = t),
                this.SimpleMatControlComponent.StartEffect())
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "NPC",
                  51,
                  "[NpcMaterialController.ApplySimpleMaterialEffect] 加载DA失败",
                  ["EffectPath", e],
                  ["PbDataId", this.CreatureData?.GetPbDataId()],
                ));
        },
      );
  }
  RemoveSimpleMaterialEffect() {
    this.SimpleMatControlComponent?.IsValid() &&
      this.SimpleMatControlComponent.EndEffect();
  }
}
exports.NpcMaterialController = NpcMaterialController;
//# sourceMappingURL=NpcMaterialController.js.map
