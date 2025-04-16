"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderModuleConfig = exports.RenderStats = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RenderStats {
  static Init() {
    !this.gU &&
      Info_1.Info.IsGameRunning() &&
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
((exports.RenderStats = RenderStats).gU = !1),
  (RenderStats.StatRenderModuleModelAddTickable = void 0),
  (RenderStats.StatRenderModuleModelTickTickable = void 0),
  (RenderStats.StatRenderModuleModelTickRenderShell = void 0),
  (RenderStats.StatBadSignalUpdate = void 0),
  (RenderStats.StatComplexBrokenUpdate = void 0),
  (RenderStats.StatCharRenderingComponentAddData = void 0),
  (RenderStats.StatCharRenderingComponentDataCache = void 0),
  (RenderStats.StatCharRenderingComponentInit = void 0),
  (RenderStats.StatCharRenderingComponentUpdate = void 0),
  (RenderStats.StatCharRenderingComponentDataGroupBeforeUpdate = void 0),
  (RenderStats.StatCharRenderingComponentDataGroupAfterUpdate = void 0),
  (RenderStats.StatCharRenderingComponentUpdateInner = void 0),
  (RenderStats.StatCharRenderingComponentLateUpdate = void 0),
  (RenderStats.StatCharRenderingComponentRuntimeDataUpdateState = void 0),
  (RenderStats.StatCharRenderingComponentRuntimeDataUpdateEffect = void 0),
  (RenderStats.StatCharRenderingComponentRuntimeDataSetSpecified = void 0),
  (RenderStats.StatCharRenderShellTick = void 0),
  (RenderStats.StatRenderBillboardTick = void 0),
  (RenderStats.StatEffectBaseActorTick = void 0),
  (RenderStats.StatEffectBaseActorInit = void 0),
  (RenderStats.StatEffectBaseActorComplete = void 0),
  (RenderStats.StatEffectBaseActorUpdateTime = void 0),
  (RenderStats.StatEffectBaseActorUpdateNiagara = void 0),
  (RenderStats.StatEffectBaseActorUpdateTsUpdate = void 0),
  (RenderStats.StatSceneCharLimbTick = void 0),
  (RenderStats.StatSceneInteractionManagerTick = void 0),
  (RenderStats.StatSceneInteractionPc = void 0),
  (RenderStats.StatSceneInteractionGrass = void 0),
  (RenderStats.StatSceneInteractionWater = void 0),
  (RenderStats.StatSceneInteractionOthers = void 0),
  (RenderStats.StatRenderDataManagerTick = void 0),
  (RenderStats.StatItemMaterialManagerTick = void 0),
  (RenderStats.StatItemMaterialControllerCollectParameter = void 0),
  (RenderStats.StatEffectTick = void 0),
  (RenderStats.StatFoliageClusteredEffectTick = void 0),
  (RenderStats.StatAudioVisualizationManagerTick = void 0),
  (RenderStats.StatCharMaterialControllerUpdateRim = void 0),
  (RenderStats.StatCharMaterialControllerUpdateDissolve = void 0),
  (RenderStats.StatCharMaterialControllerUpdateOutline = void 0),
  (RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters = void 0),
  (RenderStats.StatCharMaterialControllerUpdateSampleTexture = void 0),
  (RenderStats.StatCharMaterialControllerUpdateTransfer = void 0),
  (RenderStats.StatCharMaterialControllerUpdateMotionOffset = void 0),
  (RenderStats.StatCharMaterialControllerUpdateAbsorbed = void 0),
  (RenderStats.StatCharMaterialControllerUpdateStripMask = void 0),
  (RenderStats.StatCharMaterialControllerUpdateDither = void 0),
  (RenderStats.StatCharMaterialControllerUpdateCustomMaterialEffect = void 0),
  (RenderStats.StatCharMaterialControllerUpdateHairReplace = void 0),
  (RenderStats.StatCharMaterialControllerUpdateMaterialReplace = void 0),
  (RenderStats.StatSceneInteractionActor = void 0);
class RenderModuleConfig extends ConfigBase_1.ConfigBase {}
exports.RenderModuleConfig = RenderModuleConfig;
//# sourceMappingURL=RenderModuleConfig.js.map
