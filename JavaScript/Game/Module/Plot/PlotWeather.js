"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotWeather = exports.PlotWeatherActorInfo = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  WeatherController_1 = require("../Weather/WeatherController"),
  PLOT_WEATHER_PRIORITY = 100;
class PlotWeatherActorInfo {
  constructor() {
    (this.WeatherConfig = void 0),
      (this.Actor = void 0),
      (this.KuroPostProcessComponent = void 0),
      (this.TargetBlendWeight = 0),
      (this.CurBlendWeight = 0),
      (this.ChangeSpeed = 0),
      (this.Priority = 0),
      (this.IsLoadCompleted = !1);
  }
  Disable() {
    this.WeatherConfig &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Plot",
          18,
          "停止剧情天气",
          ["id", this.WeatherConfig.Id],
          ["DA", this.WeatherConfig.DAPath],
        ),
      (this.WeatherConfig = void 0),
      this.KuroPostProcessComponent?.IsValid() &&
        (this.KuroPostProcessComponent.bEnabled = !1),
      (this.IsLoadCompleted = !1),
      (this.CurBlendWeight = 0),
      (this.IsLoadCompleted = !1));
  }
  Destroy() {
    (this.WeatherConfig = void 0),
      this.Actor?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.Actor), (this.Actor = void 0)),
      (this.KuroPostProcessComponent = void 0);
  }
}
exports.PlotWeatherActorInfo = PlotWeatherActorInfo;
class PlotWeather {
  constructor() {
    (this.Heo = 0), (this.Uk = !1), (this.RHe = void 0), (this.UHe = void 0);
  }
  Init() {
    (this.Heo = 0), (this.Uk = !1);
  }
  Clear() {
    (this.Heo = 0), (this.Uk = !1), this.jeo();
  }
  OnPlotEnd() {
    this.Uk &&
      ((this.Uk = !1),
      WeatherController_1.WeatherController.RequestChangeWeather(this.Heo)),
      this.jeo();
  }
  StopAllWeather() {
    this.Uk && (this.RHe?.Disable(), this.UHe?.Disable());
  }
  jeo() {
    this.RHe?.Destroy(),
      (this.RHe = void 0),
      this.UHe?.Destroy(),
      (this.UHe = void 0);
  }
  OnTick(t) {
    this.Z0e(this.UHe, t), this.Z0e(this.RHe, t);
  }
  Z0e(t, i) {
    if (t && t.IsLoadCompleted && t.CurBlendWeight !== t.TargetBlendWeight) {
      var s = t.CurBlendWeight;
      if (0 === t.ChangeSpeed) t.CurBlendWeight = t.TargetBlendWeight;
      else {
        if (!(0 < i)) return;
        t.TargetBlendWeight > t.CurBlendWeight
          ? ((t.CurBlendWeight = t.CurBlendWeight + i * t.ChangeSpeed),
            (t.CurBlendWeight = Math.min(
              t.CurBlendWeight,
              t.TargetBlendWeight,
            )))
          : ((t.CurBlendWeight = t.CurBlendWeight - i * t.ChangeSpeed),
            (t.CurBlendWeight = Math.max(
              t.CurBlendWeight,
              t.TargetBlendWeight,
            )));
      }
      (t.KuroPostProcessComponent.BlendWeight = t.CurBlendWeight),
        0 === s &&
          0 < t.CurBlendWeight &&
          ((t.KuroPostProcessComponent.bEnabled = !0),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Plot",
            18,
            "剧情天气开始",
            ["id", t.WeatherConfig.Id],
            ["DA", t.WeatherConfig.DAPath],
          ),
        0 < s &&
          0 === t.CurBlendWeight &&
          ((t.KuroPostProcessComponent.bEnabled = !1),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Plot",
            18,
            "剧情天气结束",
            ["id", t.WeatherConfig.Id],
            ["DA", t.WeatherConfig.DAPath],
          );
    }
  }
  ChangeWeather(t, i, s, h = PLOT_WEATHER_PRIORITY) {
    (this.Heo = t), (this.Uk = i), this.RHe && (this.RHe.TargetBlendWeight = 0);
    i = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(t);
    i &&
      (this.RHe
        ? this.RHe.WeatherConfig?.Id === i.Id
          ? ((this.RHe.TargetBlendWeight = 1),
            this.Z0e(this.RHe, 0),
            this.xHe(),
            this.Weo(i, s),
            this.Keo(h))
          : this.UHe
            ? ((t = this.UHe),
              (this.UHe = this.RHe),
              (this.RHe = t),
              this.RHe.WeatherConfig?.Id === i.Id
                ? ((this.RHe.TargetBlendWeight = 1),
                  this.Z0e(this.RHe, 0),
                  this.xHe(),
                  this.Weo(i, s))
                : (this.Weo(i, s), this.BHe()),
              this.Keo(h))
            : ((this.UHe = this.RHe),
              (this.RHe = new PlotWeatherActorInfo()),
              this.Weo(i, s),
              this.Keo(h),
              this.Qeo())
        : ((this.RHe = new PlotWeatherActorInfo()),
          this.Weo(i, s),
          this.Keo(h),
          this.Qeo()));
  }
  Weo(t, i) {
    (this.RHe.WeatherConfig = t),
      (this.RHe.ChangeSpeed =
        0 < i ? 1 / (i * TimeUtil_1.TimeUtil.InverseMillisecond) : 0),
      this.UHe && (this.UHe.ChangeSpeed = this.RHe.ChangeSpeed);
  }
  xHe() {
    this.RHe &&
      this.RHe.Actor?.IsValid() &&
      Global_1.Global.BaseCharacter &&
      this.RHe.Actor.K2_SetActorLocation(
        Global_1.Global.BaseCharacter.K2_GetActorLocation(),
        !1,
        void 0,
        !0,
      );
  }
  Qeo() {
    let t = void 0;
    t = Global_1.Global.BaseCharacter
      ? Global_1.Global.BaseCharacter.GetTransform()
      : new UE.Transform();
    var i = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t),
      s = i.AddComponentByClass(
        UE.KuroPostProcessComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      );
    GlobalData_1.GlobalData.IsPlayInEditor &&
      i.SetActorLabel("PlotWeatherActor"),
      (s.bUnbound = !0),
      (s.BlendWeight = 0),
      (s.bEnabled = !1),
      (this.RHe.Actor = i),
      (this.RHe.KuroPostProcessComponent = s),
      (this.RHe.TargetBlendWeight = 1),
      (this.RHe.CurBlendWeight = 0),
      (this.RHe.IsLoadCompleted = !1),
      this.qHe();
  }
  BHe() {
    var t = this.RHe.KuroPostProcessComponent;
    (this.RHe.TargetBlendWeight = 1),
      (this.RHe.CurBlendWeight = 0),
      (this.RHe.IsLoadCompleted = !1),
      (t.PPTODDataAsset = void 0),
      (t.WeatherDataAsset = void 0),
      (t.BlendWeight = 0),
      (t.bEnabled = !1),
      this.xHe(),
      this.qHe();
  }
  qHe() {
    const i = this.RHe.WeatherConfig,
      s =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            18,
            "加载剧情天气",
            ["id", i.Id],
            ["DA", i.DAPath],
          ),
        this.RHe.KuroPostProcessComponent);
    ResourceSystem_1.ResourceSystem.LoadAsync(
      i.DAPath,
      UE.KuroWeatherDataAsset,
      (t) => {
        t?.IsValid() &&
          this.RHe.WeatherConfig?.Id === i.Id &&
          ((s.WeatherDataAsset = t),
          s.SetPriority(this.RHe.Priority),
          (this.RHe.IsLoadCompleted = !0),
          this.Z0e(this.RHe, 0));
      },
    );
  }
  Keo(t) {
    this.RHe &&
      this.RHe.Priority !== t &&
      ((this.RHe.Priority = t), this.RHe.IsLoadCompleted) &&
      this.RHe.KuroPostProcessComponent?.IsValid() &&
      this.RHe.KuroPostProcessComponent.SetPriority(t);
  }
}
exports.PlotWeather = PlotWeather;
//# sourceMappingURL=PlotWeather.js.map
