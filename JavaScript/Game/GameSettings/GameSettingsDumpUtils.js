"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsDumpUtils = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../Core/Audio/AudioController"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  DamageUiManager_1 = require("../Module/DamageUi/DamageUiManager"),
  CharacterSkinDamageComponent_1 = require("../NewWorld/Character/Common/Component/CharacterSkinDamageComponent"),
  RoleGaitStatic_1 = require("../NewWorld/Character/Role/Component/Define/RoleGaitStatic"),
  RenderConfig_1 = require("../Render/Config/RenderConfig"),
  RenderDataManager_1 = require("../Render/Data/RenderDataManager"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender");
class GameSettingsDumpUtils {
  static zlc(e) {
    return (
      e +
      `: ${UE.KismetSystemLibrary.GetConsoleVariableFloatValue(e)}
`
    );
  }
}
(exports.GameSettingsDumpUtils = GameSettingsDumpUtils),
  ((_a = GameSettingsDumpUtils).DumpVolume = (e) => {
    var a = (0, puerts_1.$ref)(0);
    return (
      AudioController_1.AudioController.GetRTPCValue(a, e),
      `${e}: ${(0, puerts_1.$unref)(a)}\n`
    );
  }),
  (GameSettingsDumpUtils.DumpImageQuality = () => {
    var e = _a.zlc("sg.KuroRenderQuality");
    return (e += _a.zlc("r.Kuro.GlobalLightQuality"));
  }),
  (GameSettingsDumpUtils.DumpDisplayMode = () => {
    return (
      "GetFullscreenMode: " +
      UE.GameUserSettings.GetGameUserSettings().GetFullscreenMode()
    );
  }),
  (GameSettingsDumpUtils.DumpResolution = () => {
    var e = UE.GameUserSettings.GetGameUserSettings().GetScreenResolution();
    return `GetScreenResolution: ${e.X}, ` + e.Y;
  }),
  (GameSettingsDumpUtils.DumpBrightness = () => {
    var e = "",
      a =
        ((e = (e += _a.zlc("r.TonemapperGamma")) + _a.zlc("r.LUT.Regenerate")),
        UE.KismetMaterialLibrary.GetScalarParameterValue(
          GlobalData_1.GlobalData.World,
          RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(),
          RenderConfig_1.RenderConfig.UIShowBrightness,
        ));
    return (e += `GetScalarParameterValue_UIShowBrightness: ${a}
`);
  }),
  (GameSettingsDumpUtils.DumpHighestFps = () => {
    return (
      "GetFrameRateLimit: " +
      UE.GameUserSettings.GetGameUserSettings().GetFrameRateLimit()
    );
  }),
  (GameSettingsDumpUtils.DumpShadowQuality = () => _a.zlc("sg.ShadowQuality")),
  (GameSettingsDumpUtils.DumpNiagaraQuality = () => {
    var e = _a.zlc("fx.Niagara.QualityLevel");
    return (e += _a.zlc("r.DisableDistortion"));
  }),
  (GameSettingsDumpUtils.DumpImageDetail = () => {
    var e = "";
    return (
      (e += _a.zlc("r.Kuro.ToonOutlineDrawDistancePc")) +
      _a.zlc("r.Streaming.ForceKuroRuntimeLODBias") +
      _a.zlc("r.Kuro.ToonOutlineDrawDistanceMobile") +
      _a.zlc("foliage.DensityType") +
      _a.zlc("r.Mobile.SceneObjMobileSSR") +
      _a.zlc("r.Mobile.TreeRimLight") +
      _a.zlc("r.Kuro.AutoExposure") +
      _a.zlc("r.Streaming.ForceKuroRuntimeLODBias")
    );
  }),
  (GameSettingsDumpUtils.DumpAntiAliasing = () =>
    _a.zlc("r.DefaultFeature.AntiAliasing")),
  (GameSettingsDumpUtils.DumpSceneAo = () => {
    var e = "",
      a =
        ((e =
          (e += _a.zlc("r.AmbientOcclusionLevels")) + _a.zlc("r.Mobile.SSAO")),
        UE.KismetMaterialLibrary.GetScalarParameterValue(
          GlobalData_1.GlobalData.World,
          RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(),
          new UE.FName("EnableMobileScreenAO"),
        ));
    return (e =
      (e += `GetScalarParameterValue_EnableMobileScreenAO: ${a}
`) +
      `GetScalarParameterValue_GlobalGrassAO: ${(a = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(), RenderConfig_1.RenderConfig.GlobalGrassAO))}
`);
  }),
  (GameSettingsDumpUtils.DumpNpcDensity =
    () => `CreatureController.CurrentCreatureDensityLevelExternal: ${ControllerHolder_1.ControllerHolder.CreatureController.CurrentCreatureDensityLevelExternal}
`),
  (GameSettingsDumpUtils.DumpNvidiaDlss = () => {
    var e = "";
    return (
      (e += _a.zlc("r.NGX.DLSS.Enable")) +
      _a.zlc("r.TemporalAASamples") +
      _a.zlc("r.TemporalAAFilterSize") +
      _a.zlc("r.FidelityFX.FSR.SecondaryUpscale") +
      ("GameSettingsDeviceRender.IsEnableDLSSG: " +
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsEnableDLSSG())
    );
  }),
  (GameSettingsDumpUtils.DumpNvidiaDlssFg = () =>
    "GameSettingsDeviceRender.IsEnableDLSSG: " +
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsEnableDLSSG()),
  (GameSettingsDumpUtils.DumpNvidiaDlssQuality = () => {
    var e = "";
    return (
      (e += _a.zlc("r.NGX.DLSS.Quality.Auto")) + _a.zlc("r.NGX.DLSS.Quality")
    );
  }),
  (GameSettingsDumpUtils.DumpNvidiaDlssSharpness = () =>
    "SetDLSSSharpness: " + UE.DLSSLibrary.GetDLSSSharpness()),
  (GameSettingsDumpUtils.DumpNvidiaReflex = () =>
    "[DumpNvidiaReflex]can not get setting value in engine"),
  (GameSettingsDumpUtils.DumpFsr = () => {
    var e = "";
    return (
      (e += _a.zlc("r.TemporalAASamples")) +
      _a.zlc("r.FidelityFX.FSR.PrimaryUpscale") +
      _a.zlc("r.ScreenPercentage") +
      _a.zlc("r.MipMapLODBias") +
      _a.zlc("r.TemporalAACurrentFrameWeight") +
      _a.zlc("r.TemporalAA.ClampTolerant") +
      _a.zlc("r.TemporalAA.SharpenLimitDepth") +
      _a.zlc("r.NGX.DLSS.Enable")
    );
  }),
  (GameSettingsDumpUtils.DumpXess = () => _a.zlc("r.XeSS.Enabled")),
  (GameSettingsDumpUtils.DumpXessQuality = () => _a.zlc("r.XeSS.Enabled")),
  (GameSettingsDumpUtils.DumpMetalFxEnable = () => {
    var e = _a.zlc("r.MetalFxUpscale");
    return (e += _a.zlc("r.TemporalAA.SharpenLimitDepth"));
  }),
  (GameSettingsDumpUtils.DumpIrx = () =>
    "[DumpIrx]can not get setting value in engine"),
  (GameSettingsDumpUtils.DumpBloom = () => _a.zlc("r.Kuro.KuroBloomEnable")),
  (GameSettingsDumpUtils.DumpVolumeFog = () => _a.zlc("r.volumetricfog")),
  (GameSettingsDumpUtils.DumpVolumeLight = () => {
    var e = _a.zlc("r.lightShaftQuality");
    return (e += _a.zlc("r.MobileLightShaft"));
  }),
  (GameSettingsDumpUtils.DumpMotionBlur = () => _a.zlc("r.MotionBlur.Amount")),
  (GameSettingsDumpUtils.DumpPcVsync = () => {
    return (
      "IsVSyncEnabled: " +
      UE.GameUserSettings.GetGameUserSettings().IsVSyncEnabled()
    );
  }),
  (GameSettingsDumpUtils.DumpMobileResolution = () => {
    var e = "";
    return (
      (e += _a.zlc("r.TemporalAA.SharpenLimitDepth")) +
      _a.zlc("r.TemporalAA.Sharpness") +
      _a.zlc("r.ScreenPercentage")
    );
  }),
  (GameSettingsDumpUtils.DumpTextLanguage = () =>
    "LanguageSystem.PackageLanguage: " +
    LanguageSystem_1.LanguageSystem.PackageLanguage),
  (GameSettingsDumpUtils.DumpVoiceLanguage = () =>
    "LanguageSystem.PackageAudio: " +
    LanguageSystem_1.LanguageSystem.PackageAudio),
  (GameSettingsDumpUtils.DumpHorizontalViewSensitivity = () =>
    "CameraBaseYawSensitivity: " +
    ModelManager_1.ModelManager.CameraModel.CameraBaseYawSensitivity),
  (GameSettingsDumpUtils.DumpVerticalViewSensitivity = () =>
    "CameraBasePitchSensitivity: " +
    ModelManager_1.ModelManager.CameraModel.CameraBasePitchSensitivity),
  (GameSettingsDumpUtils.DumpAimHorizontalViewSensitivity = () =>
    "CameraAimingYawSensitivity: " +
    ModelManager_1.ModelManager.CameraModel.CameraAimingYawSensitivity),
  (GameSettingsDumpUtils.DumpAimVerticalViewSensitivity = () =>
    "CameraAimingPitchSensitivity: " +
    ModelManager_1.ModelManager.CameraModel.CameraAimingPitchSensitivity),
  (GameSettingsDumpUtils.DumpCameraShakeStrength = () =>
    "ShakeModify: " + ModelManager_1.ModelManager.CameraModel.ShakeModify),
  (GameSettingsDumpUtils.DumpCommonSpringArmLength = () =>
    "CameraSettingNormalAdditionArmLength: " +
    ModelManager_1.ModelManager.CameraModel
      .CameraSettingNormalAdditionArmLength),
  (GameSettingsDumpUtils.DumpFightSpringArmLength = () =>
    "CameraSettingFightAdditionArmLength: " +
    ModelManager_1.ModelManager.CameraModel
      .CameraSettingFightAdditionArmLength),
  (GameSettingsDumpUtils.DumpResetFocusEnable = () =>
    "IsEnableResetFocus: " +
    ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus),
  (GameSettingsDumpUtils.DumpIsSidestepCameraEnable = () =>
    "IsEnableSidestepCamera: " +
    ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera),
  (GameSettingsDumpUtils.DumpIsSoftLockCameraEnable = () =>
    "IsEnableSoftLockCameraExternal: " +
    ModelManager_1.ModelManager.CameraModel.IsEnableSoftLockCameraExternal),
  (GameSettingsDumpUtils.DumpWalkOrRunRate = () =>
    "GetWalkOrRunRate: " + RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate()),
  (GameSettingsDumpUtils.DumpJoystickMode = () =>
    "GetIsDynamicJoystick: " +
    ModelManager_1.ModelManager.BattleUiModel.GetIsDynamicJoystick()),
  (GameSettingsDumpUtils.DumpSkillButtonMode = () =>
    "GetIsAutoSwitchSkillButtonMode: " +
    ModelManager_1.ModelManager.BattleUiModel.GetIsAutoSwitchSkillButtonMode()),
  (GameSettingsDumpUtils.DumpAimAssist = () =>
    "GetAimAssistEnable: " +
    ModelManager_1.ModelManager.CameraModel.GetAimAssistEnable()),
  (GameSettingsDumpUtils.DumpKeyboardLockEnemyMode = () =>
    "DumpKeyboardLockEnemyMode: " +
    ModelManager_1.ModelManager.FormationDataModel.KeyboardLockEnemyMode),
  (GameSettingsDumpUtils.DumpGamepadLockEnemyMode = () =>
    "DumpGamepadLockEnemyMode: " +
    ModelManager_1.ModelManager.FormationDataModel.GamepadLockEnemyMode),
  (GameSettingsDumpUtils.DumpEnemyHitDisplayMode = () =>
    "OpenHitMaterial: " +
    ModelManager_1.ModelManager.BulletModel.OpenHitMaterial),
  (GameSettingsDumpUtils.DumpAutoAdjustImageQuality = () =>
    _a.zlc("r.Kuro.AutoCoolUIEnable")),
  (GameSettingsDumpUtils.DumpShowDamage = () =>
    "GetDamageViewVisible: " +
    DamageUiManager_1.DamageUiManager.GetDamageViewVisible()),
  (GameSettingsDumpUtils.DumpDynamicBones = () =>
    "KuroLodMask: " + ModelManager_1.ModelManager.CreatureModel.KuroLodMask),
  (GameSettingsDumpUtils.DumpRayTracing = () => _a.zlc("sg.RayTracingQuality")),
  (GameSettingsDumpUtils.DumpRayTracedReflection = () =>
    _a.zlc("r.Lumen.Reflections.Allow")),
  (GameSettingsDumpUtils.DumpRayTracedGI = () =>
    _a.zlc("r.Lumen.DiffuseIndirect.Allow")),
  (GameSettingsDumpUtils.DumpTeammateFx = () =>
    "EffectEnvironment.DisableOtherEffect: " +
    EffectEnvironment_1.EffectEnvironment.DisableOtherEffect),
  (GameSettingsDumpUtils.DumpSaturation = () => _a.zlc("r.Client.Saturation")),
  (GameSettingsDumpUtils.DumpContrast = () => _a.zlc("r.Client.Contrast")),
  (GameSettingsDumpUtils.DumpSkinDamageMode = () =>
    "CharacterSkinDamageComponent.EnableSkinDamage: " +
    CharacterSkinDamageComponent_1.CharacterSkinDamageComponent
      .EnableSkinDamage),
  (GameSettingsDumpUtils.DumpAdrenoFME = () => _a.zlc("r.FEstimation.Option")),
  (GameSettingsDumpUtils.DumpAutoRun = () =>
    "AutoMovingSettingEnable: " +
    ModelManager_1.ModelManager.BattleUiModel?.FormationData
      ?.AutoMovingSettingEnable),
  (GameSettingsDumpUtils.DumpAutoSprint = () =>
    "AutoSprintSettingEnable: " +
    ModelManager_1.ModelManager.BattleUiModel?.FormationData
      ?.AutoSprintSettingEnable),
  (GameSettingsDumpUtils.DumpVulkan = () => {
    var e = "";
    return (
      (e += _a.zlc("r.Android.DisableVulkanSupport")) +
      _a.zlc("r.Mobile.FlushSceneColorRendering")
    );
  });
//# sourceMappingURL=GameSettingsDumpUtils.js.map
