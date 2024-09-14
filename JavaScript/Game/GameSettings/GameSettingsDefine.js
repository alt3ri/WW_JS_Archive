"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NPC_DENSITY_THRESHOLD =
    exports.WINDOWS_RESOLUTION_INDEX =
    exports.gameSettingsRegisterList =
      void 0);
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GameSettingsUtils_1 = require("./GameSettingsUtils"),
  masterVolume = {
    GameSettingId: 1,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MasterVolume,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(
        e,
        "Master_Audio_Bus_Volume",
      ),
  },
  voiceVolume = {
    GameSettingId: 2,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceVolume,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(
        e,
        "Vocal_Audio_Bus_Volume",
      ),
  },
  musicVolume = {
    GameSettingId: 3,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MusicVolume,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(
        e,
        "Music_Audio_Bus_Volume",
      ),
  },
  sfxVolume = {
    GameSettingId: 4,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SFXVolume,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(
        e,
        "SFX_Audio_Bus_Volume",
      ),
  },
  uiVolume = {
    GameSettingId: 70,
    LocalStorageGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.UIVolume,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(
        e,
        "UI_Audio_Bus_Volume",
      ),
  },
  ambVolume = {
    GameSettingId: 69,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AMBVolume,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolume(
        e,
        "AMB_Audio_Bus_Volume",
      ),
  },
  imageQuality = {
    GameSettingId: 10,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ImageQuality,
    IsSkipInitializeApply: !0,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyImageQuality(e),
  },
  displayMode = {
    GameSettingId: 5,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyDisplayMode(e),
  },
  resolution = {
    GameSettingId: 6,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionIndex,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyResolution(e),
  },
  brightness = {
    GameSettingId: 7,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyBrightness(e),
  },
  highestFps = {
    GameSettingId: 11,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyHighestFps(e),
  },
  shadowQuality = {
    GameSettingId: 54,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(e),
  },
  niagaraQuality = {
    GameSettingId: 55,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNiagaraQuality(e),
  },
  imageDetail = {
    GameSettingId: 56,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(e),
  },
  antiAliasing = {
    GameSettingId: 57,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyAntiAliasing(e),
  },
  sceneAo = {
    GameSettingId: 58,
    LocalStorageGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo,
    ApplyCallback: (e) => GameSettingsUtils_1.GameSettingsUtils.ApplySceneAo(e),
  },
  npcDensity = {
    GameSettingId: 79,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(e),
  },
  nvidiaDless = {
    GameSettingId: 81,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingEnable(e),
  },
  nvidiaDlssFg = {
    GameSettingId: 82,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .NvidiaSuperSamplingFrameGenerate,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingFrameGenerate(),
  },
  nvidiaDlssMode = {
    GameSettingId: 83,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingMode(e),
  },
  nvidiaDlssSharpness = {
    GameSettingId: 84,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingSharpness,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingSharpness(
        e,
      ),
  },
  nvidiaReflex = {
    GameSettingId: 85,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaReflex(e),
  },
  fsr = {
    GameSettingId: 87,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyFsrEnable(e),
  },
  xess = {
    GameSettingId: 125,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyXessEnable(e),
  },
  xessQuality = {
    GameSettingId: 126,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyXessQuality(e),
  },
  metalFxEnable = {
    GameSettingId: 127,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(e),
  },
  irx = {
    GameSettingId: 128,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyIrxEnable(e),
  },
  bloom = {
    GameSettingId: 132,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyBloomEnable(e),
  },
  volumeFog = {
    GameSettingId: 63,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeFog(e),
  },
  volumeLight = {
    GameSettingId: 64,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(e),
  },
  motionBlur = {
    GameSettingId: 65,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(e),
  },
  pcvSync = {
    GameSettingId: 66,
    LocalStorageGlobalKey: LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync,
    ApplyCallback: (e) => GameSettingsUtils_1.GameSettingsUtils.ApplyPcVsync(e),
  },
  mobileResolution = {
    GameSettingId: 67,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileResolution(e),
  },
  superResolution = {
    GameSettingId: 68,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplySuperResolution(e),
  },
  textLanguage = {
    GameSettingId: 51,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.TextLanguage,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyTextLanguage(e),
  },
  voiceLanguage = {
    GameSettingId: 52,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceLanguage,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyLanguageAudio(e),
  },
  adviceSetting = {
    GameSettingId: 59,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AdviceSetting,
  },
  genderSetting = {
    GameSettingId: 88,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.GenderSetting,
  },
  horizontalViewSensitivity = {
    GameSettingId: 89,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
    AllowPlatform: new Set([3, 5, 4, 7, 8, 6]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyHorizontalViewSensitivity(e),
      !0
    ),
  },
  verticalViewSensitivity = {
    GameSettingId: 90,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
    AllowPlatform: new Set([3, 5, 4, 7, 8, 6]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyVerticalViewSensitivity(e), !0
    ),
  },
  aimHorizontalViewSensitivity = {
    GameSettingId: 91,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimHorizontalViewSensitivity,
    AllowPlatform: new Set([3, 5, 4, 7, 8, 6]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAimHorizontalViewSensitivity(
        e,
      ),
      !0
    ),
  },
  aimVerticalViewSensitivity = {
    GameSettingId: 92,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
    AllowPlatform: new Set([3, 5, 4, 7, 8, 6]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAimVerticalViewSensitivity(e),
      !0
    ),
  },
  cameraShakeStrength = {
    GameSettingId: 93,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyCameraShakeStrength(e), !0
    ),
  },
  mobileHorizontalViewSensitivity = {
    GameSettingId: 94,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileHorizontalViewSensitivity,
    AllowPlatform: new Set([2, 1]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileHorizontalViewSensitivity(
        e,
      ),
      !0
    ),
  },
  mobileVerticalViewSensitivity = {
    GameSettingId: 95,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileVerticalViewSensitivity,
    AllowPlatform: new Set([2, 1]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileVerticalViewSensitivity(
        e,
      ),
      !0
    ),
  },
  mobileAimHorizontalViewSensitivity = {
    GameSettingId: 96,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimHorizontalViewSensitivity,
    AllowPlatform: new Set([2, 1]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimHorizontalViewSensitivity(
        e,
      ),
      !0
    ),
  },
  mobileAimVerticalViewSensitivity = {
    GameSettingId: 97,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimVerticalViewSensitivity,
    AllowPlatform: new Set([2, 1]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileAimVerticalViewSensitivity(
        e,
      ),
      !0
    ),
  },
  mobileCameraShakeStrength = {
    GameSettingId: 98,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
    AllowPlatform: new Set([2, 1]),
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyMobileCameraShakeStrength(e),
      !0
    ),
  },
  commonSpringArmLength = {
    GameSettingId: 99,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyCommonSpringArmLength(e), !0
    ),
  },
  fightSpringArmLength = {
    GameSettingId: 100,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyFightSpringArmLength(e), !0
    ),
  },
  resetFocusEnable = {
    GameSettingId: 101,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyResetFocusEnable(e), !0
    ),
  },
  isSidestepCameraEnable = {
    GameSettingId: 102,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyIsSidestepCameraEnable(e), !0
    ),
  },
  isSoftLockCameraEnable = {
    GameSettingId: 103,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyIsSoftLockCameraEnable(e), !0
    ),
  },
  joystickShakeStrength = {
    GameSettingId: 104,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickShakeStrength(e),
  },
  joystickShakeType = {
    GameSettingId: 105,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
    ApplyCallback: (e) =>
      GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickShakeType(e),
  },
  walkOrRunRate = {
    GameSettingId: 106,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyWalkOrRunRate(e), !0
    ),
  },
  joystickMode = {
    GameSettingId: 108,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyJoystickMode(e), !0
    ),
  },
  skillButtonMode = {
    GameSettingId: 109,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAutoSwitchSkillButtonMode(e),
      !0
    ),
  },
  cdKey = { GameSettingId: 112 },
  pushMode = {
    GameSettingId: 121,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyPushEnableState(e), !0
    ),
  },
  aimAssist = {
    GameSettingId: 122,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAimAssistEnable(e), !0
    ),
  },
  keyboardLockEnemyMode = {
    GameSettingId: 129,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
    GetDefaultValue: () => 1,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyKeyboardLockEnemyMode(e), !0
    ),
  },
  horizontalViewRevert = {
    GameSettingId: 130,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyHorizontalViewRevert(e), !0
    ),
  },
  verticalViewRevert = {
    GameSettingId: 131,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyVerticalViewRevert(e), !0
    ),
  },
  skillLockEnemyMode = {
    GameSettingId: 133,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
  },
  gamepadLockEnemyMode = {
    GameSettingId: 134,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
    GetDefaultValue: () => 1,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyGamepadLockEnemyMode(e), !0
    ),
  },
  enemyHitDisplayMode = {
    GameSettingId: 135,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyEnemyHitDisplayMode(e), !0
    ),
  },
  mobileGamepadMode = {
    GameSettingId: 137,
    IsSkipInitializeApply: !0,
    AllowPlatform: new Set([2, 1]),
  },
  autoAdjustImageQuality = {
    GameSettingId: 145,
    LocalStorageGlobalKey:
      LocalStorageDefine_1.ELocalStorageGlobalKey.AutoAdjustImageQuality,
    ApplyCallback: (e) => (
      GameSettingsUtils_1.GameSettingsUtils.ApplyAutoAdjustImageQuality(e), !0
    ),
  };
(exports.gameSettingsRegisterList = [
  masterVolume,
  voiceVolume,
  musicVolume,
  sfxVolume,
  ambVolume,
  uiVolume,
  imageQuality,
  shadowQuality,
  displayMode,
  resolution,
  brightness,
  highestFps,
  niagaraQuality,
  imageDetail,
  antiAliasing,
  sceneAo,
  npcDensity,
  nvidiaDless,
  nvidiaDlssFg,
  nvidiaDlssMode,
  nvidiaDlssSharpness,
  nvidiaReflex,
  fsr,
  xess,
  xessQuality,
  metalFxEnable,
  irx,
  bloom,
  volumeFog,
  volumeLight,
  motionBlur,
  pcvSync,
  mobileResolution,
  superResolution,
  textLanguage,
  voiceLanguage,
  adviceSetting,
  genderSetting,
  horizontalViewSensitivity,
  verticalViewSensitivity,
  aimHorizontalViewSensitivity,
  aimVerticalViewSensitivity,
  cameraShakeStrength,
  mobileHorizontalViewSensitivity,
  mobileVerticalViewSensitivity,
  mobileAimHorizontalViewSensitivity,
  mobileAimVerticalViewSensitivity,
  mobileCameraShakeStrength,
  commonSpringArmLength,
  fightSpringArmLength,
  resetFocusEnable,
  isSidestepCameraEnable,
  isSoftLockCameraEnable,
  joystickShakeStrength,
  joystickShakeType,
  walkOrRunRate,
  joystickMode,
  skillButtonMode,
  cdKey,
  pushMode,
  aimAssist,
  keyboardLockEnemyMode,
  horizontalViewRevert,
  verticalViewRevert,
  skillLockEnemyMode,
  gamepadLockEnemyMode,
  mobileGamepadMode,
  enemyHitDisplayMode,
  autoAdjustImageQuality,
]),
  (exports.WINDOWS_RESOLUTION_INDEX = 3),
  (exports.NPC_DENSITY_THRESHOLD = 1);
//# sourceMappingURL=GameSettingsDefine.js.map
