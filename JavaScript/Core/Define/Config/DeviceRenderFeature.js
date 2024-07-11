"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeviceRenderFeature = void 0);
class DeviceRenderFeature {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get DeviceId() {
    return this.deviceid();
  }
  get QualityType() {
    return this.qualitytype();
  }
  get DefaultQuality() {
    return this.defaultquality();
  }
  get FPS() {
    return this.fps();
  }
  get ShadowQuality() {
    return this.shadowquality();
  }
  get FxQuality() {
    return this.fxquality();
  }
  get ImageDetail() {
    return this.imagedetail();
  }
  get AntiAliasing() {
    return this.antialiasing();
  }
  get AO() {
    return this.ao();
  }
  get VolumeFog() {
    return this.volumefog();
  }
  get VolumeLight() {
    return this.volumelight();
  }
  get MotionBlur() {
    return this.motionblur();
  }
  get StreamLevel() {
    return this.streamlevel();
  }
  get VSync() {
    return this.vsync();
  }
  get ScreenPercentage() {
    return this.screenpercentage();
  }
  get SuperResolution() {
    return this.superresolution();
  }
  get NpcDensity() {
    return this.npcdensity();
  }
  get Bloom() {
    return this.bloom();
  }
  get OtherCommand() {
    return this.othercommand();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDeviceRenderFeature(t, i) {
    return (i || new DeviceRenderFeature()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  deviceid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  qualitytype() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  defaultquality() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  fps() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 30;
  }
  shadowquality() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  fxquality() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  imagedetail() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  antialiasing() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  ao() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  volumefog() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  volumelight() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  motionblur() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  streamlevel() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  vsync() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  screenpercentage() {
    const t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readInt32(this.z7 + t) : 3;
  }
  superresolution() {
    const t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  npcdensity() {
    const t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  bloom() {
    const t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  othercommand(t) {
    const i = this.J7.__offset(this.z7, 42);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.DeviceRenderFeature = DeviceRenderFeature;
// # sourceMappingURL=DeviceRenderFeature.js.map
