"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CUSTOM_TEXT_ID =
    exports.STOP_GUIDE_TAG =
    exports.npcDensityScores =
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
    exports.makeImageQualityCustomSetForMac =
    exports.makeImageQualityCustomSet =
    exports.noticeConfigSet =
    exports.cloudGameImageShowSettingsSet =
      void 0);
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
(exports.cloudGameImageShowSettingsSet = new Set([
  GameSettingsDefine_1.EFunction.BRIGHTNESS,
  GameSettingsDefine_1.EFunction.MOTIONBLUR,
  GameSettingsDefine_1.EFunction.EnemyHitDisplayMode,
  GameSettingsDefine_1.EFunction.ShowDamage,
  GameSettingsDefine_1.EFunction.DynamicBones,
  GameSettingsDefine_1.EFunction.FlowAdaptation,
  GameSettingsDefine_1.EFunction.TeammateFx,
  GameSettingsDefine_1.EFunction.Saturation,
  GameSettingsDefine_1.EFunction.Contrast,
  GameSettingsDefine_1.EFunction.SkinDamageMode,
])),
  (exports.noticeConfigSet = new Set([
    GameSettingsDefine_1.EFunction.IMAGEQUALITY,
    GameSettingsDefine_1.EFunction.MOBILERESOLUTION,
    GameSettingsDefine_1.EFunction.RESOLUTION,
    GameSettingsDefine_1.EFunction.HIGHESTFPS,
    GameSettingsDefine_1.EFunction.SHADOWQUALITY,
    GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
    GameSettingsDefine_1.EFunction.IMAGEDETAIL,
    GameSettingsDefine_1.EFunction.SCENEAO,
    GameSettingsDefine_1.EFunction.ANTIALISING,
    GameSettingsDefine_1.EFunction.VOLUMEFOG,
    GameSettingsDefine_1.EFunction.VOLUMELIGHT,
    GameSettingsDefine_1.EFunction.MOTIONBLUR,
    GameSettingsDefine_1.EFunction.FSR,
    GameSettingsDefine_1.EFunction.METALFX,
    GameSettingsDefine_1.EFunction.BLOOM,
    GameSettingsDefine_1.EFunction.NPCDENSITY,
  ])),
  (exports.makeImageQualityCustomSet = new Set([
    GameSettingsDefine_1.EFunction.HIGHESTFPS,
    GameSettingsDefine_1.EFunction.SHADOWQUALITY,
    GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
    GameSettingsDefine_1.EFunction.IMAGEDETAIL,
    GameSettingsDefine_1.EFunction.ANTIALISING,
    GameSettingsDefine_1.EFunction.SCENEAO,
    GameSettingsDefine_1.EFunction.VOLUMEFOG,
    GameSettingsDefine_1.EFunction.VOLUMELIGHT,
    GameSettingsDefine_1.EFunction.MOTIONBLUR,
    GameSettingsDefine_1.EFunction.PCVSYNC,
    GameSettingsDefine_1.EFunction.MOBILERESOLUTION,
    GameSettingsDefine_1.EFunction.NPCDENSITY,
    GameSettingsDefine_1.EFunction.BLOOM,
  ])),
  (exports.makeImageQualityCustomSetForMac = new Set([
    GameSettingsDefine_1.EFunction.HIGHESTFPS,
    GameSettingsDefine_1.EFunction.SHADOWQUALITY,
    GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
    GameSettingsDefine_1.EFunction.IMAGEDETAIL,
    GameSettingsDefine_1.EFunction.ANTIALISING,
    GameSettingsDefine_1.EFunction.SCENEAO,
    GameSettingsDefine_1.EFunction.VOLUMELIGHT,
    GameSettingsDefine_1.EFunction.MOTIONBLUR,
    GameSettingsDefine_1.EFunction.PCVSYNC,
    GameSettingsDefine_1.EFunction.MOBILERESOLUTION,
    GameSettingsDefine_1.EFunction.NPCDENSITY,
    GameSettingsDefine_1.EFunction.BLOOM,
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
  (exports.npcDensityScores = [0, 3, 6]),
  (exports.STOP_GUIDE_TAG = "MenuView"),
  (exports.CUSTOM_TEXT_ID = "MenuConfig_5_OptionsName_4");
//# sourceMappingURL=MenuDefine.js.map
