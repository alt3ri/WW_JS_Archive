"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderModuleConfig = exports.RenderStats = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RenderStats {
  static Init() {
    this.gU ||
      ((this.gU = !0),
      (this.StatRenderModuleModelAddTickable = Stats_1.Stat.Create(
        "Render_RenderModuleModel_AddTickable",
      )),
      (this.StatRenderModuleModelTickTickable = Stats_1.Stat.Create(
        "Render_RenderModuleModel_TickTickable",
      )),
      (this.StatRenderModuleModelTickRenderShell = Stats_1.Stat.Create(
        "Render_RenderModuleModel_TickRenderShell",
      )),
      (this.StatBadSignalUpdate = Stats_1.Stat.Create(
        "Render_BadSignal_Update",
      )),
      (this.StatComplexBrokenUpdate = Stats_1.Stat.Create(
        "Render_ComplexBroken_Update",
      )),
      (this.StatCharRenderingComponentAddData = Stats_1.Stat.Create(
        "Render_CharRenderComponent_AddMaterialControlData",
      )),
      (this.StatCharRenderingComponentDataCache = Stats_1.Stat.Create(
        "Render_CharRenderComponent_CacheData",
      )),
      (this.StatCharRenderingComponentInit = Stats_1.Stat.Create(
        "Render_CharRenderComponent_Init",
      )),
      (this.StatCharRenderingComponentUpdate = Stats_1.Stat.Create(
        "Render_CharRenderingComponent_Update",
      )),
      (this.StatCharRenderingComponentDataGroupBeforeUpdate =
        Stats_1.Stat.Create(
          "Render_CharRenderComponent_DataGroupBeforeUpdate",
        )),
      (this.StatCharRenderingComponentDataGroupAfterUpdate =
        Stats_1.Stat.Create("Render_CharRenderComponent_DataGroupAfterUpdate")),
      (this.StatCharRenderingComponentUpdateInner = Stats_1.Stat.Create(
        "Render_CharRenderComponent_UpdateInner",
      )),
      (this.StatCharRenderingComponentLateUpdate = Stats_1.Stat.Create(
        "Render_CharRenderComponent_LateUpdate",
      )),
      (this.StatCharRenderingComponentRuntimeDataUpdateState =
        Stats_1.Stat.Create(
          "Render_CharRenderComponent_RuntimeDataUpdateState",
        )),
      (this.StatCharRenderingComponentRuntimeDataUpdateEffect =
        Stats_1.Stat.Create(
          "Render_CharRenderComponent_RuntimeDataUpdateEffect",
        )),
      (this.StatCharRenderingComponentRuntimeDataSetSpecified =
        Stats_1.Stat.Create(
          "Render_CharRenderComponent_RuntimeDataSetSpecified",
        )),
      (this.StatCharRenderShellTick = Stats_1.Stat.Create(
        "Render_RenderShell_Tick",
      )),
      (this.StatRenderBillboardTick = Stats_1.Stat.Create(
        "Render_Billboard_Tick",
      )),
      (this.StatEffectBaseActorTick = Stats_1.Stat.Create(
        "Render_EffectBaseActor_Tick",
      )),
      (this.StatEffectBaseActorInit = Stats_1.Stat.Create(
        "Render_EffectBaseActor_Init",
      )),
      (this.StatEffectBaseActorComplete = Stats_1.Stat.Create(
        "Render_EffectBaseActor_Complete",
      )),
      (this.StatEffectBaseActorUpdateTime = Stats_1.Stat.Create(
        "Render_EffectBaseActor_UpdateTime",
      )),
      (this.StatEffectBaseActorUpdateNiagara = Stats_1.Stat.Create(
        "Render_EffectBaseActor_UpdateNiagara",
      )),
      (this.StatEffectBaseActorUpdateTsUpdate = Stats_1.Stat.Create(
        "Render_EffectBaseActor_TsUpdate",
      )),
      (this.StatSceneCharLimbTick = Stats_1.Stat.Create(
        "Render_SceneCharLimb_Tick",
      )),
      (this.StatSceneInteractionManagerTick = Stats_1.Stat.Create(
        "Render_SceneInteraction_Tick",
      )),
      (this.StatSceneInteractionGrass = Stats_1.Stat.Create(
        "Render_SceneInteraction_Grass_Tick",
      )),
      (this.StatSceneInteractionPc = Stats_1.Stat.Create(
        "Render_SceneInteraction_PC_Tick",
      )),
      (this.StatSceneInteractionWater = Stats_1.Stat.Create(
        "Render_SceneInteraction_Water_Tick",
      )),
      (this.StatSceneInteractionOthers = Stats_1.Stat.Create(
        "Render_SceneInteraction_Others_Tick",
      )),
      (this.StatRenderDataManagerTick = Stats_1.Stat.Create(
        "Render_RenderDataManager_Tick",
      )),
      (this.StatItemMaterialManagerTick = Stats_1.Stat.Create(
        "Render_ItemMaterialManager_Tick",
      )),
      (this.StatItemMaterialControllerCollectParameter = Stats_1.Stat.Create(
        "Render_ItemMaterialController_CollectParameter",
      )),
      (this.StatEffectTick = Stats_1.Stat.Create("Render_Effect_Tick")),
      (this.StatFoliageClusteredEffectTick = Stats_1.Stat.Create(
        "Render_FoliageClusteredEffect_Tick",
      )),
      (this.StatAudioVisualizationManagerTick = Stats_1.Stat.Create(
        "Render_AudioVisualizationManager_Tick",
      )),
      (this.StatCharMaterialControllerUpdateRim = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateRim_Tick",
      )),
      (this.StatCharMaterialControllerUpdateDissolve = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateDissolve_Tick",
      )),
      (this.StatCharMaterialControllerUpdateOutline = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateOutline_Tick",
      )),
      (this.StatCharMaterialControllerUpdateModifyOtherParameters =
        Stats_1.Stat.Create(
          "Render_StatCharMaterialControllerUpdateModifyOtherParameters_Tick",
        )),
      (this.StatCharMaterialControllerUpdateSampleTexture = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateSampleTexture_Tick",
      )),
      (this.StatCharMaterialControllerUpdateTransfer = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateTransfer_Tick",
      )),
      (this.StatCharMaterialControllerUpdateMotionOffset = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateMotionOffset_Tick",
      )),
      (this.StatCharMaterialControllerUpdateAbsorbed = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateAbsorbed_Tick",
      )),
      (this.StatCharMaterialControllerUpdateStripMask = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateStripMask_Tick",
      )),
      (this.StatCharMaterialControllerUpdateDither = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateDither_Tick",
      )),
      (this.StatCharMaterialControllerUpdateCustomMaterialEffect =
        Stats_1.Stat.Create(
          "Render_StatCharMaterialControllerUpdateCustomMaterialEffect_Tick",
        )),
      (this.StatCharMaterialControllerUpdateHairReplace = Stats_1.Stat.Create(
        "Render_StatCharMaterialControllerUpdateHairReplace_Tick",
      )),
      (this.StatCharMaterialControllerUpdateMaterialReplace =
        Stats_1.Stat.Create(
          "Render_StatCharMaterialControllerUpdateMaterialReplace_Tick",
        )));
  }
}
(exports.RenderStats = RenderStats).gU = !1;
class RenderModuleConfig extends ConfigBase_1.ConfigBase {}
exports.RenderModuleConfig = RenderModuleConfig;
//# sourceMappingURL=RenderModuleConfig.js.map
