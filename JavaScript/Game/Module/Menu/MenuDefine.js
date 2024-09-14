"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.npcDensityScores =
    exports.bloomScores =
    exports.metalFxScores =
    exports.amdFsrScores =
    exports.motionBlurScores =
    exports.volumeLightScores =
    exports.volumeFogScores =
    exports.antiAliasingScores =
    exports.sceneAoScores =
    exports.imageDetailScores =
    exports.niagaraQualityScores =
    exports.shadowQualityScores =
    exports.mobileResolutionScores =
    exports.qualityLevelScores =
    exports.SEETING_LOAD_OVER_COLOR =
    exports.SEETING_LOAD_LAGGY_COLOR =
    exports.SEETING_LOAD_FLUID_COLOR =
    exports.SEETING_LOAD_OVER =
    exports.SEETING_LOAD_LAGGY =
    exports.SEETING_LOAD_FLUID =
    exports.functionMenuDataMapping =
    exports.gameQualityKeyToFunctionIdMap =
    exports.imageConfigSet =
      void 0);
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  HighestFpsMenuData_1 = require("./MenuData/HighestFpsMenuData"),
  ImageQualityMenuDatat_1 = require("./MenuData/ImageQualityMenuDatat"),
  MobileGamepadMenuData_1 = require("./MenuData/MobileGamepadMenuData"),
  NiagaraMenuData_1 = require("./MenuData/NiagaraMenuData"),
  NpcDensityMenuData_1 = require("./MenuData/NpcDensityMenuData"),
  ResolutionMenuData_1 = require("./MenuData/ResolutionMenuData");
(exports.imageConfigSet = new Set([
  10, 11, 54, 55, 56, 57, 58, 63, 64, 65, 66, 68, 79, 81, 82, 83, 84, 85, 87,
  125, 126, 127, 128, 132, 135, 145,
])),
  (exports.gameQualityKeyToFunctionIdMap = new Map([
    [LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality, 54],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality, 55],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail, 56],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing, 57],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo, 58],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog, 63],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight, 64],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur, 65],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync, 66],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution, 67],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution, 68],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode, 5],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness, 7],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity, 79],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable, 81],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .NvidiaSuperSamplingFrameGenerate,
      82,
    ],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingSharpness,
      84,
    ],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable, 87],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity, 89],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity, 90],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimHorizontalViewSensitivity,
      91,
    ],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
      92,
    ],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength, 93],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileHorizontalViewSensitivity,
      94,
    ],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileVerticalViewSensitivity,
      95,
    ],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimHorizontalViewSensitivity,
      96,
    ],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimVerticalViewSensitivity,
      97,
    ],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength, 98],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength, 99],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength, 100],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable, 101],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable, 102],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable, 103],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength, 104],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType, 105],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate, 106],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode, 108],
    [
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
      109,
    ],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable, 122],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode, 129],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert, 130],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert, 131],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode, 133],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode, 134],
    [LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode, 135],
  ])),
  (exports.functionMenuDataMapping = new Map([
    [6, ResolutionMenuData_1.ResolutionMenuData],
    [11, HighestFpsMenuData_1.HighestFpsMenuData],
    [55, NiagaraMenuData_1.NiagaraMenuData],
    [10, ImageQualityMenuDatat_1.ImageQualityMenuData],
    [137, MobileGamepadMenuData_1.MobileGamepadMenuData],
    [79, NpcDensityMenuData_1.NpcDensityMenuData],
  ])),
  (exports.SEETING_LOAD_FLUID = "Text_SettingLoadFluid_text"),
  (exports.SEETING_LOAD_LAGGY = "Text_SettingLoadLaggy_text"),
  (exports.SEETING_LOAD_OVER = "Text_SettingLoadOver_text"),
  (exports.SEETING_LOAD_FLUID_COLOR =
    "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarGreen.SP_BarGreen"),
  (exports.SEETING_LOAD_LAGGY_COLOR =
    "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarOrange.SP_BarOrange"),
  (exports.SEETING_LOAD_OVER_COLOR =
    "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarRed.SP_BarRed"),
  (exports.qualityLevelScores = [120, 135, 143, 150]),
  (exports.mobileResolutionScores = [0.49, 0.64, 0.7225, 1]),
  (exports.shadowQualityScores = [0, 6, 10, 12]),
  (exports.niagaraQualityScores = [0, 4, 6]),
  (exports.imageDetailScores = [0, 3, 6]),
  (exports.sceneAoScores = [0, 6]),
  (exports.antiAliasingScores = [0, 10]),
  (exports.volumeFogScores = [0, 10]),
  (exports.volumeLightScores = [0, 2]),
  (exports.motionBlurScores = [0, 6]),
  (exports.amdFsrScores = [0, 10]),
  (exports.metalFxScores = [0, 3]),
  (exports.bloomScores = [0, 3]),
  (exports.npcDensityScores = [0, 3, 6]);
//# sourceMappingURL=MenuDefine.js.map
