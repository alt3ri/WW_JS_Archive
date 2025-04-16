"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.globalConfigTemp =
    exports.globalConfig =
    exports.BRANCH_EXTENSIONS_DIR =
    exports.USE_TEMP_PATH =
    exports.GLOBAL_CONFIG_PATH =
      void 0);
const Init_1 = require("./Init");
function getGlobalConfig() {
  return (0, Init_1.isUe5)()
    ? {
        ActionConfigPath: "Content/Data/Json/Action.json",
        ComponentConfigPath: "Content/Data/Json/Component.json",
        EntityConfigPath: "Content/Data/Json/Entity.json",
        BlueprintConfigPath: "Content/Data/Json/Blueprint.json",
        EntityStateConfigPath: "Content/Data/Json/EntityState.json",
        EntityOwnerConfigPath: "Content/Data/Json/EntityOwner.json",
        AlwaysLoadEntityConfigPath: "Content/Data/Json/AlwaysLoadEntity.json",
        LevelsConfigPath: "Content/Data/Json/Level.json",
        LevelsDir: "Content/Data/Levels",
        LevelsDataDir: "Content/Data/LevelsData",
        TemplateDir: "Content/Data/Template",
        TemplateConfigPath: "Content/Data/Json/Template.json",
        PrefabDir: "Content/Data/Prefab",
        BundleDir: "Content/Data/Bundle",
        PrefabConfigPath: "Content/Data/Json/PrefabConfig.json",
        EntityDataConfigPath: "Content/Data/Json/EntityData.json",
        TypeScriptRoot: "TypeScript",
        CsvFileDir: "Content/Data/Tables",
        FlowListDir: "Content/Data/FlowList",
        QuestListDir: "Content/Data/QuestList",
        LevelPlayListDir: "Content/Data/LevelPlayList",
        FunctionalTestDir: "Content/Data/FunctionalTest",
        FlowTemplateConfigPath: "Content/Data/Json/FlowTemplate.json",
        FlowTemplateCameraDir: "Content/Data/FlowTemplateCamera",
        FlowTemplateCameraConfigPath:
          "Content/Data/Json/FlowTemplateCamera.json",
        FlowTemplateCameraConfgSourcePath:
          "Content/Data/FlowTemplateCamera/FlowTemplateCamera.json",
        GlobalVarConfigPath: "Content/Data/Json/GlobalVar.json",
        SystemVarConfigPath: "Content/Data/Json/SystemVar.json",
        VehicleRidingRolesConfigPath:
          "Content/Data/Json/VehicleRidingRoles.json",
        GridItemShapeConfigPath:
          "Content/Data/Json/GridItemShapeConfigPath.json",
        OccupationConfigPath: "Content/Data/Json/Occupation.json",
        OccupiedExportPath: "Content/Data/Json/OccupiedExport.json",
        InteractOptionConfigPath: "Content/Data/InteractOption.json",
        AreaEntitiesPath: "Content/Data/Json/AreaEntitiesPath.json",
        BtConfigPath: "Content/Data/Json/BtConfig.json",
        MontageConfigPath: "Content/Data/Json/MontageConfig.json",
        AbpMontageConfigPath: "Content/Data/Json/AbpMontageConfig.json",
        AbpOverlayMontageConfigPath:
          "Content/Data/Json/AbpOverlayMontageConfig.json",
        FaceExpressionConfigPath: "Content/Data/Json/FaceExpressionConfig.json",
        AoiGroupPath: "Content/Data/Json/AoiGroupPath.json",
        EntityPerformanceDataPath:
          "Content/Data/Json/EntityPerformanceData.json",
        ActorRefConfigPath: "Content/Data/Json/ActorRefConfig.json",
        AoiDefineDataPath: "Content/Data/Json/AoiDefine.json",
        EditorStartConfig: "Content/Data/Json/EditorStartConfig.json",
        BubbleConfigPath: "Content/Data/Json/BubbleConfig.json",
        LevelEntityVoxelPath: "Content/Data/Json/LevelEntityVoxel.json",
        PipelineConfigPath: "Content/Data/Json/PipelineConfig.json",
        TidTextTempPath: "",
        AudioStatePath: "",
        PlotHandBookPath: "Content/Data/Json/PlotHandBook.json",
        PlotPositionPath: "Content/Data/Json/PlotPosition.json",
        EnrichmentArea: "Content/Data/Json/EnrichmentArea.json",
        BrokenRockConfig: "Content/Data/Json/BrokenRockConfig.json",
        FishingRouletteConfig: "Content/Data/Json/FishingRouletteConfig.json",
        AreaQuestTracking: "Content/Data/Json/AreaQuestTracking.json",
      }
    : {
        FlowListDir: "../Config/Raw/Tables/k.可视化编辑/j.剧情",
        QuestListDir: "../Config/Raw/Tables/k.可视化编辑/r.任务",
        LevelPlayListDir: "../Config/Raw/Tables/k.可视化编辑/w.玩法",
        CsvFileDir: "../Config/Raw/Tables/k.可视化编辑/c.Csv",
        LevelsDir: "../Config/Raw/Tables/k.可视化编辑/d.地图",
        TemplateDir: "../Config/Raw/Tables/k.可视化编辑/m.模板",
        PrefabDir: "../Config/Raw/Tables/k.可视化编辑/y.预制体",
        BundleDir: "../Config/Raw/Tables/k.可视化编辑/s.实体包",
        AreaEntitiesPath:
          "../Config/Raw/Tables/k.可视化编辑/AreaEntitiesPath.json",
        LevelEntityVoxelPath:
          "../Config/Raw/Tables/k.可视化编辑/LevelEntityVoxel.json",
        PipelineConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/PipelineConfig.json",
        FlowTemplateCameraDir: "../Config/Raw/Tables/k.可视化编辑/y.演出模板",
        EntityPerformanceDataPath:
          "../Config/Raw/Tables/k.可视化编辑/EntityPerformanceData.json",
        MarkedErrorCsvPath:
          "../Config/Raw/Tables/k.可视化编辑/MarkedErrorData.csv",
        FunctionalTestDir: "Content/Aki/UniverseEditor/FunctionalTest",
        AreaQuestTracking:
          "../Config/Raw/Tables/k.可视化编辑/AreaQuestTracking.json",
        LevelsConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Level.json",
        ActionConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Action.json",
        ComponentConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Component.json",
        EntityConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Entity.json",
        BlueprintConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Blueprint.json",
        EntityStateConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/EntityState.json",
        EntityOwnerConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/EntityOwner.json",
        AlwaysLoadEntityConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/AlwaysLoadEntity.json",
        LevelsDataDir: "../Config/Raw/Tables/k.可视化编辑/__Temp__/Levels",
        TemplateConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/Template.json",
        PrefabConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/Prefab.json",
        EntityDataConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/EntityData.json",
        OccupationConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/Occupation.json",
        OccupiedExportPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/OccupiedExport.json",
        FlowTemplateConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/FlowTemplate.json",
        FlowTemplateCameraConfgSourcePath:
          "../Config/Raw/Tables/k.可视化编辑/y.演出模板/FlowTemplateCamera.json",
        FlowTemplateCameraConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/FlowTemplateCamera.json",
        InteractOptionConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/InteractOption.json",
        BtConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/BtConfig.json",
        MontageConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/MontageConfig.json",
        AbpMontageConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/AbpMontageConfig.json",
        AbpOverlayMontageConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/AbpOverlayMontageConfig.json",
        FaceExpressionConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/FaceExpressionConfig.json",
        AoiGroupPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/AoiGroupPath.json",
        ActorRefConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/ActorRefConfig.json",
        AoiDefineDataPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/AoiDefine.json",
        EditorStartConfig:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json",
        BubbleConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/BubbleConfig.json",
        TidTextTempPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Csv/TidText.csv",
        AudioStatePath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/a.AudioState.json",
        PlotHandBookPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/PlotHandBook.json",
        PlotPositionPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/PlotPosition.json",
        EnrichmentArea:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/EnrichmentArea.json",
        BrokenRockConfig:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/BrokenRockConfig.json",
        FishingRouletteConfig:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/FishingRouletteConfig.json",
        OfflineComponentExportPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/OfflineComponentConfig.json",
        SummonGongduolaConfigExportPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/SummonGongduolaConfig.json",
        HideGroupFixConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/HideGroupFixConfig.json",
        GravityAbnormalEntityListPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/GravityAbnormalEntityList.json",
        ActorRefComponentsConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/ActorRefComponentsConfig.json",
        QuestRefMp4Path:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/QuestRefMp4Config.json",
        TypeScriptRoot: "TypeScript/Src",
        GlobalVarConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/GlobalVar.json",
        SystemVarConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/SystemVar.json",
        VehicleRidingRolesConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/VehicleRidingRoles.json",
        GridItemShapeConfigPath:
          "../Config/Raw/Tables/k.可视化编辑/__Temp__/Json/GridItemShapeConfig.json",
      };
}
(exports.GLOBAL_CONFIG_PATH = (0, Init_1.isUe5)()
  ? "Content/Aki/Data/Json/Global.json"
  : "../Config/Raw/Tables/k.可视化编辑/Global.json"),
  (exports.USE_TEMP_PATH =
    "../Config/Raw/Tables/k.可视化编辑/__Temp__/UseTemp"),
  (exports.BRANCH_EXTENSIONS_DIR =
    "../Config/Raw/Tables/k.可视化编辑/b.BranchExtensions"),
  (exports.globalConfig = getGlobalConfig()),
  (exports.globalConfigTemp = {
    ActionConfigPath: "Content/Data/Json/Action.json",
    ComponentConfigPath: "Content/Data/Json/Component.json",
    EntityConfigPath: "Content/Aki/Data/UniverseEditorConfig/Entity.json",
    BlueprintConfigPath: "Content/Aki/UniverseEditorConfig/Blueprint.json",
    EntityStateConfigPath: "Content/Aki/UniverseEditorConfig/EntityState.json",
    EntityOwnerConfigPath: "Content/Aki/UniverseEditorConfig/EntityOwner.json",
    AlwaysLoadEntityConfigPath:
      "Content/Aki/UniverseEditorConfig/AlwaysLoadEntity.json",
    LevelsConfigPath: "Content/Aki/UniverseEditorConfig/Level.json",
    FlowListDir: "Content/Aki/UniverseEditorConfig/FlowList",
    QuestListDir: "Content/Aki/UniverseEditorConfig/Quest",
    LevelPlayListDir: "Content/Aki/UniverseEditorConfig/LevelPlay",
    CsvFileDir: "../Config/Raw/Tables/k.可视化编辑/c.Csv",
    TemplateDir: "Content/Aki/UniverseEditor/Template",
    PrefabDir: "Content/Aki/UniverseEditor/Prefab",
    BundleDir: "Content/Aki/UniverseEditor/Bundle",
    FlowTemplateCameraDir: "Content/Aki/UniverseEditor/FlowTemplateCamera",
    LevelsDir: "Content/Aki/UniverseEditor/Levels",
    FunctionalTestDir: "Content/Aki/UniverseEditor/FunctionalTest",
    LevelsDataDir: "Content/Aki/UniverseEditorConfig/Levels",
    TemplateConfigPath: "Content/Aki/UniverseEditorConfig/Json/Template.json",
    PrefabConfigPath: "Content/Aki/UniverseEditorConfig/Json/Prefab.json",
    EntityDataConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/EntityData.json",
    FlowTemplateConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/FlowTemplate.json",
    FlowTemplateCameraConfgSourcePath:
      "Content/Aki/UniverseEditorConfig/FlowTemplateCamera/FlowTemplateCamera.json",
    FlowTemplateCameraConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/FlowTemplateCamera.json",
    TypeScriptRoot: "TypeScript/Src",
    GlobalVarConfigPath: "Content/Aki/UniverseEditorConfig/Json/GlobalVar.json",
    SystemVarConfigPath: "Content/Aki/UniverseEditorConfig/Json/SystemVar.json",
    VehicleRidingRolesConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/VehicleRidingRoles.json",
    GridItemShapeConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/GridItemShapeConfigPath.json",
    OccupationConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/Occupation.json",
    OccupiedExportPath:
      "Content/Aki/UniverseEditorConfig/Json/OccupiedExport.json",
    InteractOptionConfigPath:
      "Content/Aki/UniverseEditorConfig/InteractOption.json",
    AreaEntitiesPath: "Content/Aki/UniverseEditorConfig/AreaEntitiesPath.json",
    BtConfigPath: "Content/Aki/UniverseEditorConfig/Json/BtConfig.json",
    MontageConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/MontageConfig.json",
    AbpMontageConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/AbpMontageConfig.json",
    AbpOverlayMontageConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/AbpOverlayMontageConfig.json",
    FaceExpressionConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/FaceExpressionConfig.json",
    AoiGroupPath: "Content/Aki/UniverseEditorConfig/Json/AoiGroupPath.json",
    ActorRefConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/ActorRefConfig.json",
    EntityPerformanceDataPath:
      "Content/Aki/UniverseEditorConfig/EntityPerformanceData.json",
    AoiDefineDataPath: "Content/Aki/UniverseEditorConfig/Json/AoiDefine.json",
    EditorStartConfig:
      "Content/Aki/UniverseEditorConfig/Json/EditorStartConfig.json",
    BubbleConfigPath: "Content/Aki/UniverseEditorConfig/Json/BubbleConfig.json",
    LevelEntityVoxelPath:
      "Content/Aki/UniverseEditorConfig/LevelEntityVoxel.json",
    PipelineConfigPath: "Content/Aki/UniverseEditorConfig/PipelineConfig.json",
    TidTextTempPath: "",
    AudioStatePath: "Content/Aki/UniverseEditorConfig/Json/a.AudioState.json",
    PlotHandBookPath: "Content/Aki/UniverseEditorConfig/Json/PlotHandBook.json",
    PlotPositionPath: "Content/Aki/UniverseEditorConfig/Json/PlotPosition.json",
    EnrichmentArea: "Content/Aki/UniverseEditorConfig/Json/EnrichmentArea.json",
    BrokenRockConfig:
      "Content/Aki/UniverseEditorConfig/Json/BrokenRockConfig.json",
    FishingRouletteConfig:
      "Content/Aki/UniverseEditorConfig/Json/FishingRouletteConfig.json",
    AreaQuestTracking:
      "Content/Aki/UniverseEditorConfig/AreaQuestTracking.json",
    HideGroupFixConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/HideGroupFixConfig.json",
    GravityAbnormalEntityListPath:
      "Content/Aki/UniverseEditorConfig/Json/GravityAbnormalEntityList.json",
    ActorRefComponentsConfigPath:
      "Content/Aki/UniverseEditorConfig/Json/ActorRefComponentsConfig.json",
    QuestRefMp4Path:
      "Content/Aki/UniverseEditorConfig/Json/QuestRefMp4Config.json",
  });
//# sourceMappingURL=IGlobal.js.map
