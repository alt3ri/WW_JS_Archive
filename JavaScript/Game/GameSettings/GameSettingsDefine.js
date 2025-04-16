"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.gameSettingsInitSourceTypePriority =
    exports.MAIN_TYPE_OF_KEY_SETTING =
    exports.NPC_DENSITY_THRESHOLD =
    exports.WINDOWS_RESOLUTION_INDEX =
    exports.function2GameSettings =
    exports.EFunction =
      void 0);
const AudioDefine_1 = require("../../Core/Audio/AudioDefine"),
  Info_1 = require("../../Core/Common/Info"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GameSettingsDumpUtils_1 = require("./GameSettingsDumpUtils"),
  GameSettingsUtils_1 = require("./GameSettingsUtils");
var EFunction;
!(function (e) {
  (e[(e.MASTERVOLUMEFUNCTION = 1)] = "MASTERVOLUMEFUNCTION"),
    (e[(e.VOICEVOLUMEFUNCTION = 2)] = "VOICEVOLUMEFUNCTION"),
    (e[(e.MUSICVOLUMEFUNCTION = 3)] = "MUSICVOLUMEFUNCTION"),
    (e[(e.SFXVOLUMEFUNCTION = 4)] = "SFXVOLUMEFUNCTION"),
    (e[(e.AMBVOLUMEFUNCTION = 69)] = "AMBVOLUMEFUNCTION"),
    (e[(e.UIVOLUMEFUNCTION = 70)] = "UIVOLUMEFUNCTION"),
    (e[(e.DOLBYATOMS = 76)] = "DOLBYATOMS"),
    (e[(e.IMAGEQUALITY = 10)] = "IMAGEQUALITY"),
    (e[(e.DISPLAYMODE = 5)] = "DISPLAYMODE"),
    (e[(e.RESOLUTION = 6)] = "RESOLUTION"),
    (e[(e.BRIGHTNESS = 7)] = "BRIGHTNESS"),
    (e[(e.HIGHESTFPS = 11)] = "HIGHESTFPS"),
    (e[(e.SHADOWQUALITY = 54)] = "SHADOWQUALITY"),
    (e[(e.NIAGARAQUALITY = 55)] = "NIAGARAQUALITY"),
    (e[(e.IMAGEDETAIL = 56)] = "IMAGEDETAIL"),
    (e[(e.ANTIALISING = 57)] = "ANTIALISING"),
    (e[(e.SCENEAO = 58)] = "SCENEAO"),
    (e[(e.NPCDENSITY = 79)] = "NPCDENSITY"),
    (e[(e.NVIDIADLSS = 81)] = "NVIDIADLSS"),
    (e[(e.NVIDIADLSSFG = 82)] = "NVIDIADLSSFG"),
    (e[(e.NVIDIADLSSQUALITY = 831)] = "NVIDIADLSSQUALITY"),
    (e[(e.NVIDIADLSSSHARPNESS = 84)] = "NVIDIADLSSSHARPNESS"),
    (e[(e.NVIDIAREFLEX = 85)] = "NVIDIAREFLEX"),
    (e[(e.FSR = 87)] = "FSR"),
    (e[(e.XESS = 125)] = "XESS"),
    (e[(e.XESS_QUALITY = 126)] = "XESS_QUALITY"),
    (e[(e.METALFX = 127)] = "METALFX"),
    (e[(e.IRX = 128)] = "IRX"),
    (e[(e.BLOOM = 132)] = "BLOOM"),
    (e[(e.VOLUMEFOG = 63)] = "VOLUMEFOG"),
    (e[(e.VOLUMELIGHT = 64)] = "VOLUMELIGHT"),
    (e[(e.MOTIONBLUR = 65)] = "MOTIONBLUR"),
    (e[(e.PCVSYNC = 66)] = "PCVSYNC"),
    (e[(e.MOBILERESOLUTION = 67)] = "MOBILERESOLUTION"),
    (e[(e.TEXTLANGUAGE = 51)] = "TEXTLANGUAGE"),
    (e[(e.VOICELANGUAGE = 52)] = "VOICELANGUAGE"),
    (e[(e.VOICEPACKMANAGER = 53)] = "VOICEPACKMANAGER"),
    (e[(e.ADVICESETTING = 59)] = "ADVICESETTING"),
    (e[(e.GENDERSETTING = 88)] = "GENDERSETTING"),
    (e[(e.HorizontalViewSensitivity = 89)] = "HorizontalViewSensitivity"),
    (e[(e.VerticalViewSensitivity = 90)] = "VerticalViewSensitivity"),
    (e[(e.AimHorizontalViewSensitivity = 91)] = "AimHorizontalViewSensitivity"),
    (e[(e.AimVerticalViewSensitivity = 92)] = "AimVerticalViewSensitivity"),
    (e[(e.CameraShakeStrength = 93)] = "CameraShakeStrength"),
    (e[(e.MobileHorizontalViewSensitivity = 94)] =
      "MobileHorizontalViewSensitivity"),
    (e[(e.MobileVerticalViewSensitivity = 95)] =
      "MobileVerticalViewSensitivity"),
    (e[(e.MobileAimHorizontalViewSensitivity = 96)] =
      "MobileAimHorizontalViewSensitivity"),
    (e[(e.MobileAimVerticalViewSensitivity = 97)] =
      "MobileAimVerticalViewSensitivity"),
    (e[(e.CommonSpringArmLength = 99)] = "CommonSpringArmLength"),
    (e[(e.FightSpringArmLength = 100)] = "FightSpringArmLength"),
    (e[(e.ResetFocusEnable = 101)] = "ResetFocusEnable"),
    (e[(e.IsSidestepCameraEnable = 102)] = "IsSidestepCameraEnable"),
    (e[(e.IsSoftLockCameraEnable = 103)] = "IsSoftLockCameraEnable"),
    (e[(e.JoystickShakeStrength = 104)] = "JoystickShakeStrength"),
    (e[(e.JoystickShakeType = 105)] = "JoystickShakeType"),
    (e[(e.WalkOrRunRate = 106)] = "WalkOrRunRate"),
    (e[(e.LogUpload = 107)] = "LogUpload"),
    (e[(e.JoystickMode = 108)] = "JoystickMode"),
    (e[(e.SkillButtonMode = 109)] = "SkillButtonMode"),
    (e[(e.CdKey = 112)] = "CdKey"),
    (e[(e.UserCenterDomestic = 113)] = "UserCenterDomestic"),
    (e[(e.TermsOfUseDomestic = 114)] = "TermsOfUseDomestic"),
    (e[(e.PrivacyPolicyDomestic = 115)] = "PrivacyPolicyDomestic"),
    (e[(e.ChildrenPrivacy = 116)] = "ChildrenPrivacy"),
    (e[(e.ThirdPartyInfo = 117)] = "ThirdPartyInfo"),
    (e[(e.TermsOfUseOverSeas = 118)] = "TermsOfUseOverSeas"),
    (e[(e.PrivacyPolicyOverSeas = 119)] = "PrivacyPolicyOverSeas"),
    (e[(e.PrivacyPolicySetting = 120)] = "PrivacyPolicySetting"),
    (e[(e.License = 146)] = "License"),
    (e[(e.UserCenterOverseas = 123)] = "UserCenterOverseas"),
    (e[(e.PushMode = 121)] = "PushMode"),
    (e[(e.AimAssist = 122)] = "AimAssist"),
    (e[(e.KeyboardLockEnemyMode = 129)] = "KeyboardLockEnemyMode"),
    (e[(e.HorizontalViewRevert = 130)] = "HorizontalViewRevert"),
    (e[(e.VerticalViewRevert = 131)] = "VerticalViewRevert"),
    (e[(e.SkillLockEnemyMode = 133)] = "SkillLockEnemyMode"),
    (e[(e.GamepadLockEnemyMode = 134)] = "GamepadLockEnemyMode"),
    (e[(e.EnemyHitDisplayMode = 135)] = "EnemyHitDisplayMode"),
    (e[(e.PlayStationOnly = 136)] = "PlayStationOnly"),
    (e[(e.MobileGamepadMode = 137)] = "MobileGamepadMode"),
    (e[(e.SkinDamageMode = 20031)] = "SkinDamageMode"),
    (e[(e.AutoAdjustImageQuality = 145)] = "AutoAdjustImageQuality"),
    (e[(e.ShowDamage = 20023)] = "ShowDamage"),
    (e[(e.DynamicBones = 20024)] = "DynamicBones"),
    (e[(e.FlowAdaptation = 20025)] = "FlowAdaptation"),
    (e[(e.UIPureMode = 51101)] = "UIPureMode"),
    (e[(e.FlyControlMode = 60207)] = "FlyControlMode"),
    (e[(e.RayTracing = 20026)] = "RayTracing"),
    (e[(e.RayTracedReflection = 20027)] = "RayTracedReflection"),
    (e[(e.RayTracedGI = 20028)] = "RayTracedGI"),
    (e[(e.RayTracedShadow = 20029)] = "RayTracedShadow"),
    (e[(e.TeammateFx = 20030)] = "TeammateFx"),
    (e[(e.Saturation = 20204)] = "Saturation"),
    (e[(e.Contrast = 20205)] = "Contrast"),
    (e[(e.AdrenoFME = 20032)] = "AdrenoFME"),
    (e[(e.BasicGraphicSetting = 20203)] = "BasicGraphicSetting"),
    (e[(e.Vulkan = 20360)] = "Vulkan"),
    (e[(e.ResDownLoad = 55113)] = "ResDownLoad"),
    (e[(e.AutoRun = 60208)] = "AutoRun"),
    (e[(e.AutoSprint = 60209)] = "AutoSprint");
})((EFunction = exports.EFunction || (exports.EFunction = {})));
const masterVolume = {
    GameSettingId: EFunction.MASTERVOLUMEFUNCTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MasterVolume,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_master"),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_master"),
  },
  voiceVolume = {
    GameSettingId: EFunction.VOICEVOLUMEFUNCTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceVolume,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_voice"),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_voice"),
  },
  musicVolume = {
    GameSettingId: EFunction.MUSICVOLUMEFUNCTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MusicVolume,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_music"),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_music"),
  },
  sfxVolume = {
    GameSettingId: EFunction.SFXVOLUMEFUNCTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SFXVolume,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_sfx"),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_sfx"),
  },
  uiVolume = {
    GameSettingId: EFunction.UIVOLUMEFUNCTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.UIVolume,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_sfx_ui"),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume("volume_sfx_ui"),
  },
  ambVolume = {
    GameSettingId: EFunction.AMBVOLUMEFUNCTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AMBVolume,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(e, "volume_sfx_amb"),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume(
        "volume_sfx_amb",
      ),
  },
  imageQuality = {
    GameSettingId: EFunction.IMAGEQUALITY,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ImageQuality,
    ApplyCallback: (e, t) => {
      var a = GameSettingsUtils_1.GameSettingsUtils.ApplyImageQualityOnly(e);
      return GameSettingsUtils_1.GameSettingsUtils.ApplySceneLightQuality(e), a;
    },
    HandleDoneCallback: (e, t) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetImageQualityWithValue,
        e,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetImageQuality,
        );
    },
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpImageQuality(),
  },
  displayMode = {
    GameSettingId: EFunction.DISPLAYMODE,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyDisplayMode(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpDisplayMode(),
  },
  resolution = {
    GameSettingId: EFunction.RESOLUTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionIndex,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyResolution(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpResolution(),
  },
  brightness = {
    GameSettingId: EFunction.BRIGHTNESS,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyBrightness(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpBrightness(),
  },
  highestFps = {
    GameSettingId: EFunction.HIGHESTFPS,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyHighestFps(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHighestFps(),
  },
  shadowQuality = {
    GameSettingId: EFunction.SHADOWQUALITY,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpShadowQuality(),
  },
  niagaraQuality = {
    GameSettingId: EFunction.NIAGARAQUALITY,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNiagaraQuality(e),
    HandleDoneCallback: (e, t) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetNiagaraQuality,
      );
    },
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNiagaraQuality(),
  },
  imageDetail = {
    GameSettingId: EFunction.IMAGEDETAIL,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpImageDetail(),
  },
  antiAliasing = {
    GameSettingId: EFunction.ANTIALISING,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyAntiAliasing(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAntiAliasing(),
  },
  sceneAo = {
    GameSettingId: EFunction.SCENEAO,
    GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplySceneAo(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSceneAo(),
  },
  npcDensity = {
    GameSettingId: EFunction.NPCDENSITY,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNpcDensity(),
  },
  nvidiaDlss = {
    GameSettingId: EFunction.NVIDIADLSS,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingEnable(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlss(),
  },
  nvidiaDlssFg = {
    GameSettingId: EFunction.NVIDIADLSSFG,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .NvidiaSuperSamplingFrameGenerate,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingFrameGenerate(
        e,
      ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlssFg(),
    HandleDoneCallback: (e, t) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetDLSSFGWithValue,
        e,
      );
    },
  },
  nvidiaDlssQuality = {
    GameSettingId: EFunction.NVIDIADLSSQUALITY,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingQuality,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingQuality(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlssQuality(),
  },
  nvidiaDlssSharpness = {
    GameSettingId: EFunction.NVIDIADLSSSHARPNESS,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingSharpness,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingSharpness(
        e,
      ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaDlssSharpness(),
  },
  nvidiaReflex = {
    GameSettingId: EFunction.NVIDIAREFLEX,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaReflex(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpNvidiaReflex(),
  },
  fsr = {
    GameSettingId: EFunction.FSR,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyFsrEnable(e),
    DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFsr(),
  },
  xess = {
    GameSettingId: EFunction.XESS,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyXessEnable(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXess(),
  },
  xessQuality = {
    GameSettingId: EFunction.XESS_QUALITY,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyXessQuality(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpXessQuality(),
  },
  metalFxEnable = {
    GameSettingId: EFunction.METALFX,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpMetalFxEnable(),
  },
  irx = {
    GameSettingId: EFunction.IRX,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyIrxEnable(e),
    DumpCallback: () => GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpIrx(),
  },
  bloom = {
    GameSettingId: EFunction.BLOOM,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyBloomEnable(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpBloom(),
  },
  volumeFog = {
    GameSettingId: EFunction.VOLUMEFOG,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeFog(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolumeFog(),
  },
  volumeLight = {
    GameSettingId: EFunction.VOLUMELIGHT,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolumeLight(),
  },
  motionBlur = {
    GameSettingId: EFunction.MOTIONBLUR,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpMotionBlur(),
  },
  pcvSync = {
    GameSettingId: EFunction.PCVSYNC,
    GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyPcVsync(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpPcVsync(),
  },
  mobileResolution = {
    GameSettingId: EFunction.MOBILERESOLUTION,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileResolution(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpMobileResolution(),
  },
  textLanguage = {
    GameSettingId: EFunction.TEXTLANGUAGE,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.TextLanguage,
    ApplyCallback: (e, t) =>
      2 === t
        ? GameSettingsUtils_1.GameSettingsUtils.ApplyTextLanguageOnGameStart(e)
        : GameSettingsUtils_1.GameSettingsUtils.ApplyTextLanguage(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpTextLanguage(),
  },
  voiceLanguage = {
    GameSettingId: EFunction.VOICELANGUAGE,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceLanguage,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyLanguageAudio(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVoiceLanguage(),
  },
  voicePackManager = {
    GameSettingId: EFunction.VOICEPACKMANAGER,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[DumpVoicePackManager]this is just a switch entry",
  },
  adviceSetting = {
    GameSettingId: EFunction.ADVICESETTING,
    GetCallbackOrGlobalKey: () =>
      ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting() ? 1 : 0,
    ApplyCallback: (e, t) => (
      1 === t &&
        ControllerHolder_1.ControllerHolder.AdviceController.RequestSetAdviceShowState(
          1 === e,
        ),
      !1
    ),
    DumpCallback: () => "[DumpAdviceSetting]same to getter",
  },
  genderSetting = {
    GameSettingId: EFunction.GENDERSETTING,
    GetCallbackOrGlobalKey: () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
      return ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(e).Gender;
    },
    DumpCallback: () => "[DumpGenderSetting]same to getter",
  },
  horizontalViewSensitivity = {
    GameSettingId: EFunction.HorizontalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
    ApplyCallback: (e, t) => (
      Platform_1.Platform.IsCloudGame()
        ? GameSettingsUtils_1.GameSettingsUtils.ApplyMobileHorizontalViewSensitivity(
            e,
          )
        : GameSettingsUtils_1.GameSettingsUtils.ApplyHorizontalViewSensitivity(
            e,
          ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHorizontalViewSensitivity(),
  },
  verticalViewSensitivity = {
    GameSettingId: EFunction.VerticalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
    ApplyCallback: (e, t) => (
      Platform_1.Platform.IsCloudGame()
        ? GameSettingsUtils_1.GameSettingsUtils.ApplyMobileVerticalViewSensitivity(
            e,
          )
        : GameSettingsUtils_1.GameSettingsUtils.ApplyVerticalViewSensitivity(e),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVerticalViewSensitivity(),
  },
  aimHorizontalViewSensitivity = {
    GameSettingId: EFunction.AimHorizontalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimHorizontalViewSensitivity,
    ApplyCallback: (e, t) => (
      Platform_1.Platform.IsCloudGame()
        ? GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimHorizontalViewSensitivity(
            e,
          )
        : GameSettingsUtils_1.GameSettingsUtils.ApplyAimHorizontalViewSensitivity(
            e,
          ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimHorizontalViewSensitivity(),
  },
  aimVerticalViewSensitivity = {
    GameSettingId: EFunction.AimVerticalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
    ApplyCallback: (e, t) => (
      Platform_1.Platform.IsCloudGame()
        ? GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimVerticalViewSensitivity(
            e,
          )
        : GameSettingsUtils_1.GameSettingsUtils.ApplyAimVerticalViewSensitivity(
            e,
          ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimVerticalViewSensitivity(),
  },
  cameraShakeStrength = {
    GameSettingId: EFunction.CameraShakeStrength,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyCameraShakeStrength(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpCameraShakeStrength(),
  },
  mobileHorizontalViewSensitivity = {
    GameSettingId: EFunction.MobileHorizontalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileHorizontalViewSensitivity,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileHorizontalViewSensitivity(
        e,
      ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpHorizontalViewSensitivity(),
  },
  mobileVerticalViewSensitivity = {
    GameSettingId: EFunction.MobileVerticalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileVerticalViewSensitivity,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileVerticalViewSensitivity(
        e,
      ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVerticalViewSensitivity(),
  },
  mobileAimHorizontalViewSensitivity = {
    GameSettingId: EFunction.MobileAimHorizontalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimHorizontalViewSensitivity,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimHorizontalViewSensitivity(
        e,
      ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimHorizontalViewSensitivity(),
  },
  mobileAimVerticalViewSensitivity = {
    GameSettingId: EFunction.MobileAimVerticalViewSensitivity,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimVerticalViewSensitivity,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimVerticalViewSensitivity(
        e,
      ),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimVerticalViewSensitivity(),
  },
  commonSpringArmLength = {
    GameSettingId: EFunction.CommonSpringArmLength,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyCommonSpringArmLength(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpCommonSpringArmLength(),
  },
  fightSpringArmLength = {
    GameSettingId: EFunction.FightSpringArmLength,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyFightSpringArmLength(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpFightSpringArmLength(),
  },
  resetFocusEnable = {
    GameSettingId: EFunction.ResetFocusEnable,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyResetFocusEnable(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpResetFocusEnable(),
  },
  isSidestepCameraEnable = {
    GameSettingId: EFunction.IsSidestepCameraEnable,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyIsSidestepCameraEnable(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpIsSidestepCameraEnable(),
  },
  isSoftLockCameraEnable = {
    GameSettingId: EFunction.IsSoftLockCameraEnable,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyIsSoftLockCameraEnable(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpIsSoftLockCameraEnable(),
  },
  joystickShakeStrength = {
    GameSettingId: EFunction.JoystickShakeStrength,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickShakeStrength(e),
    DumpCallback: () => "[DumpJoystickShakeStrength]no way to dump",
  },
  joystickShakeType = {
    GameSettingId: EFunction.JoystickShakeType,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickShakeType(e),
    DumpCallback: () => "[DumpJoystickShakeType]no way to dump",
  },
  walkOrRunRate = {
    GameSettingId: EFunction.WalkOrRunRate,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyWalkOrRunRate(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpWalkOrRunRate(),
  },
  joystickMode = {
    GameSettingId: EFunction.JoystickMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickMode(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpJoystickMode(),
  },
  skillButtonMode = {
    GameSettingId: EFunction.SkillButtonMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAutoSwitchSkillButtonMode(e),
      !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSkillButtonMode(),
  },
  cdKey = {
    GameSettingId: EFunction.CdKey,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[DumpCdKey]this is just a switch entry",
  },
  resDownLoad = {
    GameSettingId: EFunction.CdKey,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[resDownLoad]this is just a switch entry",
  },
  pushMode = {
    GameSettingId: EFunction.PushMode,
    GetCallbackOrGlobalKey: () =>
      ControllerHolder_1.ControllerHolder.KuroPushController.GetPushState()
        ? 1
        : 0,
    ApplyCallback: (e, t) =>
      1 === t &&
      (GameSettingsUtils_1.GameSettingsUtils.ApplyPushEnableState(e, t), !0),
    DumpCallback: () => "[DumpPushMode]same to getter",
  },
  aimAssist = {
    GameSettingId: EFunction.AimAssist,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAimAssistEnable(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAimAssist(),
  },
  keyboardLockEnemyMode = {
    GameSettingId: EFunction.KeyboardLockEnemyMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyKeyboardLockEnemyMode(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpKeyboardLockEnemyMode(),
  },
  horizontalViewRevert = {
    GameSettingId: EFunction.HorizontalViewRevert,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
    ApplyCallback: (e, t) => (
      Info_1.Info.IsInGamepad() &&
        GameSettingsUtils_1.GameSettingsUtils.ApplyHorizontalViewRevert(e),
      !0
    ),
    DumpCallback: () => "[DumpHorizontalViewRevert]no way to dump",
  },
  verticalViewRevert = {
    GameSettingId: EFunction.VerticalViewRevert,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
    ApplyCallback: (e, t) => (
      Info_1.Info.IsInGamepad() &&
        GameSettingsUtils_1.GameSettingsUtils.ApplyVerticalViewRevert(e),
      !0
    ),
    DumpCallback: () => "[DumpVerticalViewRevert]no way to dump",
  },
  skillLockEnemyMode = {
    GameSettingId: EFunction.SkillLockEnemyMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
    DumpCallback: () => "[DumpSkillLockEnemyMode]same to getter",
  },
  gamepadLockEnemyMode = {
    GameSettingId: EFunction.GamepadLockEnemyMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyGamepadLockEnemyMode(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpGamepadLockEnemyMode(),
  },
  enemyHitDisplayMode = {
    GameSettingId: EFunction.EnemyHitDisplayMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyEnemyHitDisplayMode(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpEnemyHitDisplayMode(),
  },
  mobileGamepadMode = {
    GameSettingId: EFunction.MobileGamepadMode,
    GetCallbackOrGlobalKey: () =>
      ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached() ? 1 : 0,
    DumpCallback: () => "[DumpMobileGamepadMode]same to getter",
  },
  autoAdjustImageQuality = {
    GameSettingId: EFunction.AutoAdjustImageQuality,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AutoAdjustImageQuality,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAutoAdjustImageQuality(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoAdjustImageQuality(),
  },
  showDamage = {
    GameSettingId: EFunction.ShowDamage,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ShowDamage,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyShowDamage(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpShowDamage(),
  },
  dynamicBones = {
    GameSettingId: EFunction.DynamicBones,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.DynamicBones,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyDynamicBones(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpDynamicBones(),
  },
  uiPureMode = {
    GameSettingId: EFunction.UIPureMode,
    GetCallbackOrGlobalKey: () =>
      ModelManager_1.ModelManager.BattleUiModel?.PureModeData?.IsOpen ? 1 : 0,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyUiPureMode(e),
    DumpCallback: () => "[DumpUiPureMode]same to getter",
  },
  flyControlMode = {
    GameSettingId: EFunction.FlyControlMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.FlyControlMode,
    ApplyCallback: (e, t) => !0,
    DumpCallback: () => "[DumpFlyControlMode]same to getter",
  },
  dolbyAtmos = {
    GameSettingId: EFunction.DOLBYATOMS,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.DolbyAtmos,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyDolbyAtmos(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVolume(
        AudioDefine_1.RTPC_DOLBY_ATMOS,
      ),
  },
  flowAdaptation = {
    GameSettingId: EFunction.FlowAdaptation,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.FlowAdaptation,
    DumpCallback: () => "[DumpFlowAdaptation]same to getter",
  },
  rayTracing = {
    GameSettingId: EFunction.RayTracing,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracing,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracing(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpRayTracing(),
    HandleDoneCallback: (e, t) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetRayTracingWithValue,
        e,
      );
    },
  },
  rayTracedReflection = {
    GameSettingId: EFunction.RayTracedReflection,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracedReflection,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedReflection(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpRayTracedReflection(),
  },
  rayTracedGI = {
    GameSettingId: EFunction.RayTracedGI,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracedGI,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedGI(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpRayTracedGI(),
  },
  rayTracedShadow = {
    GameSettingId: EFunction.RayTracedShadow,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.RayTracedShadow,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedShadow(e),
    DumpCallback: () => "[DumpRayTracedShadow]not implemented",
  },
  teammateFx = {
    GameSettingId: EFunction.TeammateFx,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.TeammateFx,
    ApplyCallback: (e, t) => (
      (EffectEnvironment_1.EffectEnvironment.DisableOtherEffect = 0 === e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpTeammateFx(),
  },
  saturation = {
    GameSettingId: EFunction.Saturation,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SaturationNew,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplySaturationClient(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSaturation(),
  },
  contrast = {
    GameSettingId: EFunction.Contrast,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ContrastNew,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyContrastClient(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpContrast(),
  },
  skinDamageMode = {
    GameSettingId: EFunction.SkinDamageMode,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SkinDamageMode,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplySkinDamageMode(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpSkinDamageMode(),
  },
  playStationOnly = {
    GameSettingId: EFunction.PlayStationOnly,
    GetCallbackOrGlobalKey: () =>
      ModelManager_1.ModelManager.KuroSdkModel.PlayStationPlayOnlyState ? 1 : 0,
    ApplyCallback: (e, t) => (
      1 === t &&
        ControllerHolder_1.ControllerHolder.KuroSdkController.RequestChangeServerPlayStationPlayOnlyState(
          1 === e,
        ),
      !1
    ),
    DumpCallback: () => "[DumpPlayStationOnly]same to getter",
  },
  adrenoFME = {
    GameSettingId: EFunction.AdrenoFME,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AfmeSince2Dot3,
    ApplyCallback: (e, t) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAFMEOption(e), !0
    ),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAdrenoFME(),
  },
  userCenterDomestic = {
    GameSettingId: EFunction.UserCenterDomestic,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[DumpUserCenterDomestic]this is just a switch entry",
  },
  userCenterOverseas = {
    GameSettingId: EFunction.UserCenterOverseas,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  privacyPolicyDomestic = {
    GameSettingId: EFunction.PrivacyPolicyDomestic,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  privacyPolicyOverSeas = {
    GameSettingId: EFunction.PrivacyPolicyOverSeas,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  termsOfUseDomestic = {
    GameSettingId: EFunction.TermsOfUseDomestic,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  termsOfUseOverSeas = {
    GameSettingId: EFunction.TermsOfUseOverSeas,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  childrenPrivacy = {
    GameSettingId: EFunction.ChildrenPrivacy,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  thirdPartyInfo = {
    GameSettingId: EFunction.ThirdPartyInfo,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  privacyPolicySetting = {
    GameSettingId: EFunction.PrivacyPolicySetting,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  license = {
    GameSettingId: EFunction.License,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  logUpload = {
    GameSettingId: EFunction.LogUpload,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  basicGraphicSetting = {
    GameSettingId: EFunction.BasicGraphicSetting,
    GetCallbackOrGlobalKey: () => 0,
    DumpCallback: () => "[]this is just a switch entry",
  },
  autoRun = {
    GameSettingId: EFunction.AutoRun,
    GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.AutoRun,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyAutoRun(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoRun(),
  },
  autoSprint = {
    GameSettingId: EFunction.AutoSprint,
    GetCallbackOrGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AutoSprint,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyAutoSprint(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpAutoSprint(),
  },
  vulkan = {
    GameSettingId: EFunction.Vulkan,
    GetCallbackOrGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.Vulkan,
    ApplyCallback: (e, t) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVulkan(e),
    DumpCallback: () =>
      GameSettingsDumpUtils_1.GameSettingsDumpUtils.DumpVulkan(),
  };
(exports.function2GameSettings = {
  [EFunction.MASTERVOLUMEFUNCTION]: masterVolume,
  [EFunction.VOICEVOLUMEFUNCTION]: voiceVolume,
  [EFunction.MUSICVOLUMEFUNCTION]: musicVolume,
  [EFunction.SFXVOLUMEFUNCTION]: sfxVolume,
  [EFunction.UIVOLUMEFUNCTION]: uiVolume,
  [EFunction.AMBVOLUMEFUNCTION]: ambVolume,
  [EFunction.IMAGEQUALITY]: imageQuality,
  [EFunction.DISPLAYMODE]: displayMode,
  [EFunction.RESOLUTION]: resolution,
  [EFunction.BRIGHTNESS]: brightness,
  [EFunction.HIGHESTFPS]: highestFps,
  [EFunction.SHADOWQUALITY]: shadowQuality,
  [EFunction.NIAGARAQUALITY]: niagaraQuality,
  [EFunction.IMAGEDETAIL]: imageDetail,
  [EFunction.ANTIALISING]: antiAliasing,
  [EFunction.SCENEAO]: sceneAo,
  [EFunction.NPCDENSITY]: npcDensity,
  [EFunction.NVIDIADLSS]: nvidiaDlss,
  [EFunction.NVIDIADLSSFG]: nvidiaDlssFg,
  [EFunction.NVIDIADLSSQUALITY]: nvidiaDlssQuality,
  [EFunction.NVIDIADLSSSHARPNESS]: nvidiaDlssSharpness,
  [EFunction.NVIDIAREFLEX]: nvidiaReflex,
  [EFunction.FSR]: fsr,
  [EFunction.XESS]: xess,
  [EFunction.XESS_QUALITY]: xessQuality,
  [EFunction.METALFX]: metalFxEnable,
  [EFunction.IRX]: irx,
  [EFunction.BLOOM]: bloom,
  [EFunction.VOLUMEFOG]: volumeFog,
  [EFunction.VOLUMELIGHT]: volumeLight,
  [EFunction.MOTIONBLUR]: motionBlur,
  [EFunction.PCVSYNC]: pcvSync,
  [EFunction.MOBILERESOLUTION]: mobileResolution,
  [EFunction.TEXTLANGUAGE]: textLanguage,
  [EFunction.VOICELANGUAGE]: voiceLanguage,
  [EFunction.VOICEPACKMANAGER]: voicePackManager,
  [EFunction.ADVICESETTING]: adviceSetting,
  [EFunction.GENDERSETTING]: genderSetting,
  [EFunction.HorizontalViewSensitivity]: horizontalViewSensitivity,
  [EFunction.VerticalViewSensitivity]: verticalViewSensitivity,
  [EFunction.AimHorizontalViewSensitivity]: aimHorizontalViewSensitivity,
  [EFunction.AimVerticalViewSensitivity]: aimVerticalViewSensitivity,
  [EFunction.CameraShakeStrength]: cameraShakeStrength,
  [EFunction.MobileHorizontalViewSensitivity]: mobileHorizontalViewSensitivity,
  [EFunction.MobileVerticalViewSensitivity]: mobileVerticalViewSensitivity,
  [EFunction.MobileAimHorizontalViewSensitivity]:
    mobileAimHorizontalViewSensitivity,
  [EFunction.MobileAimVerticalViewSensitivity]:
    mobileAimVerticalViewSensitivity,
  [EFunction.CommonSpringArmLength]: commonSpringArmLength,
  [EFunction.FightSpringArmLength]: fightSpringArmLength,
  [EFunction.ResetFocusEnable]: resetFocusEnable,
  [EFunction.IsSidestepCameraEnable]: isSidestepCameraEnable,
  [EFunction.IsSoftLockCameraEnable]: isSoftLockCameraEnable,
  [EFunction.JoystickShakeStrength]: joystickShakeStrength,
  [EFunction.JoystickShakeType]: joystickShakeType,
  [EFunction.WalkOrRunRate]: walkOrRunRate,
  [EFunction.JoystickMode]: joystickMode,
  [EFunction.SkillButtonMode]: skillButtonMode,
  [EFunction.CdKey]: cdKey,
  [EFunction.PushMode]: pushMode,
  [EFunction.AimAssist]: aimAssist,
  [EFunction.KeyboardLockEnemyMode]: keyboardLockEnemyMode,
  [EFunction.HorizontalViewRevert]: horizontalViewRevert,
  [EFunction.VerticalViewRevert]: verticalViewRevert,
  [EFunction.SkillLockEnemyMode]: skillLockEnemyMode,
  [EFunction.GamepadLockEnemyMode]: gamepadLockEnemyMode,
  [EFunction.EnemyHitDisplayMode]: enemyHitDisplayMode,
  [EFunction.MobileGamepadMode]: mobileGamepadMode,
  [EFunction.AutoAdjustImageQuality]: autoAdjustImageQuality,
  [EFunction.ShowDamage]: showDamage,
  [EFunction.DynamicBones]: dynamicBones,
  [EFunction.UIPureMode]: uiPureMode,
  [EFunction.FlyControlMode]: flyControlMode,
  [EFunction.DOLBYATOMS]: dolbyAtmos,
  [EFunction.FlowAdaptation]: flowAdaptation,
  [EFunction.RayTracing]: rayTracing,
  [EFunction.RayTracedReflection]: rayTracedReflection,
  [EFunction.RayTracedGI]: rayTracedGI,
  [EFunction.RayTracedShadow]: rayTracedShadow,
  [EFunction.TeammateFx]: teammateFx,
  [EFunction.Saturation]: saturation,
  [EFunction.Contrast]: contrast,
  [EFunction.SkinDamageMode]: skinDamageMode,
  [EFunction.PlayStationOnly]: playStationOnly,
  [EFunction.AdrenoFME]: adrenoFME,
  [EFunction.UserCenterDomestic]: userCenterDomestic,
  [EFunction.UserCenterOverseas]: userCenterOverseas,
  [EFunction.PrivacyPolicyDomestic]: privacyPolicyDomestic,
  [EFunction.PrivacyPolicyOverSeas]: privacyPolicyOverSeas,
  [EFunction.TermsOfUseDomestic]: termsOfUseDomestic,
  [EFunction.TermsOfUseOverSeas]: termsOfUseOverSeas,
  [EFunction.ChildrenPrivacy]: childrenPrivacy,
  [EFunction.ThirdPartyInfo]: thirdPartyInfo,
  [EFunction.PrivacyPolicySetting]: privacyPolicySetting,
  [EFunction.License]: license,
  [EFunction.LogUpload]: logUpload,
  [EFunction.BasicGraphicSetting]: basicGraphicSetting,
  [EFunction.AutoRun]: autoRun,
  [EFunction.Vulkan]: vulkan,
  [EFunction.ResDownLoad]: resDownLoad,
  [EFunction.AutoSprint]: autoSprint,
}),
  (exports.WINDOWS_RESOLUTION_INDEX = 2),
  (exports.NPC_DENSITY_THRESHOLD = 1),
  (exports.MAIN_TYPE_OF_KEY_SETTING = 3),
  (exports.gameSettingsInitSourceTypePriority = [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
//# sourceMappingURL=GameSettingsDefine.js.map
