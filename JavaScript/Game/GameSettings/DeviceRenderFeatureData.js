"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeviceRenderFeatureData = void 0);
class DeviceRenderFeatureData {
  constructor(t) {
    (this.DeviceId = 0),
      (this.QualityType = 3),
      (this.DefaultQuality = 0),
      (this.FPS = 0),
      (this.ShadowQuality = 0),
      (this.FxQuality = 0),
      (this.ImageDetail = 0),
      (this.AntiAliasing = 0),
      (this.AO = 0),
      (this.VolumeFog = 0),
      (this.VolumeLight = 0),
      (this.MotionBlur = 0),
      (this.StreamLevel = 0),
      (this.VSync = 0),
      (this.ScreenPercentage = 0),
      (this.SuperResolution = 0),
      (this.NpcDensity = 0),
      (this.Bloom = 0),
      (this.OtherCommand = ""),
      (this.DeviceId = t.DeviceId),
      (this.QualityType = t.QualityType),
      (this.DefaultQuality = t.DefaultQuality),
      (this.FPS = t.FPS),
      (this.ShadowQuality = t.ShadowQuality),
      (this.FxQuality = t.FxQuality),
      (this.ImageDetail = t.ImageDetail),
      (this.AntiAliasing = t.AntiAliasing),
      (this.AO = t.AO),
      (this.VolumeFog = t.VolumeFog),
      (this.VolumeLight = t.VolumeLight),
      (this.MotionBlur = t.MotionBlur),
      (this.StreamLevel = t.StreamLevel),
      (this.VSync = t.VSync),
      (this.ScreenPercentage = t.ScreenPercentage),
      (this.SuperResolution = t.SuperResolution),
      (this.NpcDensity = t.NpcDensity),
      (this.Bloom = t.Bloom),
      (this.OtherCommand = t.OtherCommand);
  }
  IsDefault() {
    return 1 === this.DefaultQuality;
  }
}
exports.DeviceRenderFeatureData = DeviceRenderFeatureData;
//# sourceMappingURL=DeviceRenderFeatureData.js.map
