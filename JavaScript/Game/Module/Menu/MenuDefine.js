"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.functionIdToGameQualityKeyMap =
    exports.SLIDER_LOCK_ENEMY =
    exports.CLICK_LOCK_ENEMY =
    exports.WINDOWS_RESOLUTION_INDEX =
    exports.EImageConfig =
    exports.needRestart =
    exports.BASEVALUE =
      void 0);
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
var EImageConfig;
(exports.BASEVALUE = 100),
  (exports.needRestart = new Array()),
  (function (e) {
    (e[(e.IMAGEQUALITY = 10)] = "IMAGEQUALITY"),
      (e[(e.HIGHESTFPS = 11)] = "HIGHESTFPS"),
      (e[(e.SHADOWQUALITY = 54)] = "SHADOWQUALITY"),
      (e[(e.NIAGARAQUALITY = 55)] = "NIAGARAQUALITY"),
      (e[(e.IMAGEDETAIL = 56)] = "IMAGEDETAIL"),
      (e[(e.ANTIALISING = 57)] = "ANTIALISING"),
      (e[(e.SCENEAO = 58)] = "SCENEAO"),
      (e[(e.VOLUMEFOG = 63)] = "VOLUMEFOG"),
      (e[(e.VOLUMELIGHT = 64)] = "VOLUMELIGHT"),
      (e[(e.MOTIONBLUR = 65)] = "MOTIONBLUR"),
      (e[(e.PCVSYNC = 66)] = "PCVSYNC"),
      (e[(e.MOBILERESOLUTION = 67)] = "MOBILERESOLUTION"),
      (e[(e.SUPERRESOLUTION = 68)] = "SUPERRESOLUTION"),
      (e[(e.RESOLUTION = 6)] = "RESOLUTION"),
      (e[(e.DISPLAYMODE = 5)] = "DISPLAYMODE"),
      (e[(e.NPCDENSITY = 79)] = "NPCDENSITY"),
      (e[(e.NVIDIADLSS = 81)] = "NVIDIADLSS"),
      (e[(e.NVIDIADLSSFG = 82)] = "NVIDIADLSSFG"),
      (e[(e.NVIDIADLSSMODE = 83)] = "NVIDIADLSSMODE"),
      (e[(e.NVIDIADLSSSHARPNESS = 84)] = "NVIDIADLSSSHARPNESS"),
      (e[(e.NVIDIAREFLEX = 85)] = "NVIDIAREFLEX"),
      (e[(e.FSR = 87)] = "FSR"),
      (e[(e.XESS = 125)] = "XESS"),
      (e[(e.XESS_QUALITY = 126)] = "XESS_QUALITY"),
      (e[(e.METALFX = 127)] = "METALFX"),
      (e[(e.IRX = 128)] = "IRX"),
      (e[(e.BLOOM = 132)] = "BLOOM");
  })((EImageConfig = exports.EImageConfig || (exports.EImageConfig = {}))),
  (exports.WINDOWS_RESOLUTION_INDEX = 3),
  (exports.CLICK_LOCK_ENEMY = "ClickLockEnemy"),
  (exports.SLIDER_LOCK_ENEMY = "SliderLockEnemy"),
  (exports.functionIdToGameQualityKeyMap = new Map([
    [54, LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality],
    [55, LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality],
    [56, LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail],
    [57, LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing],
    [58, LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo],
    [63, LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog],
    [64, LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight],
    [65, LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur],
    [66, LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync],
    [67, LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution],
    [68, LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution],
    [5, LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode],
    [7, LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness],
    [79, LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity],
    [81, LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable],
    [
      82,
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .NvidiaSuperSamplingFrameGenerate,
    ],
    [
      84,
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingSharpness,
    ],
    [87, LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable],
  ]));
//# sourceMappingURL=MenuDefine.js.map
