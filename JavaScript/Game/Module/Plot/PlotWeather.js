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
    (this.Oto = 0), (this.Uk = !1), (this.kje = void 0), (this.Fje = void 0);
  }
  Init() {
    (this.Oto = 0), (this.Uk = !1);
  }
  Clear() {
    (this.Oto = 0), (this.Uk = !1), this.kto();
  }
  OnPlotEnd() {
    this.Uk &&
      ((this.Uk = !1),
      WeatherController_1.WeatherController.RequestChangeWeather(this.Oto)),
      this.kto();
  }
  StopAllWeather() {
    this.Uk && (this.kje?.Disable(), this.Fje?.Disable());
  }
  kto() {
    this.kje?.Destroy(),
      (this.kje = void 0),
      this.Fje?.Destroy(),
      (this.Fje = void 0);
  }
  OnTick(t) {
    this.Z0e(this.Fje, t), this.Z0e(this.kje, t);
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
    (this.Oto = t), (this.Uk = i), this.kje && (this.kje.TargetBlendWeight = 0);
    i = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(t);
    i &&
      (this.kje
        ? this.kje.WeatherConfig?.Id === i.Id
          ? ((this.kje.TargetBlendWeight = 1),
            this.Z0e(this.kje, 0),
            this.jje(),
            this.Fto(i, s),
            this.Vto(h))
          : this.Fje
            ? ((t = this.Fje),
              (this.Fje = this.kje),
              (this.kje = t),
              this.kje.WeatherConfig?.Id === i.Id
                ? ((this.kje.TargetBlendWeight = 1),
                  this.Z0e(this.kje, 0),
                  this.jje(),
                  this.Fto(i, s))
                : (this.Fto(i, s), this.Kje()),
              this.Vto(h))
            : ((this.Fje = this.kje),
              (this.kje = new PlotWeatherActorInfo()),
              this.Fto(i, s),
              this.Vto(h),
              this.Hto())
        : ((this.kje = new PlotWeatherActorInfo()),
          this.Fto(i, s),
          this.Vto(h),
          this.Hto()));
  }
  Fto(t, i) {
    (this.kje.WeatherConfig = t),
      (this.kje.ChangeSpeed =
        0 < i ? 1 / (i * TimeUtil_1.TimeUtil.InverseMillisecond) : 0),
      this.Fje && (this.Fje.ChangeSpeed = this.kje.ChangeSpeed);
  }
  jje() {
    this.kje &&
      this.kje.Actor?.IsValid() &&
      Global_1.Global.BaseCharacter &&
      this.kje.Actor.K2_SetActorLocation(
        Global_1.Global.BaseCharacter.K2_GetActorLocation(),
        !1,
        void 0,
        !0,
      );
  }
  Hto() {
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
      (this.kje.Actor = i),
      (this.kje.KuroPostProcessComponent = s),
      (this.kje.TargetBlendWeight = 1),
      (this.kje.CurBlendWeight = 0),
      (this.kje.IsLoadCompleted = !1),
      this.Xje();
  }
  Kje() {
    var t = this.kje.KuroPostProcessComponent;
    (this.kje.TargetBlendWeight = 1),
      (this.kje.CurBlendWeight = 0),
      (this.kje.IsLoadCompleted = !1),
      (t.PPTODDataAsset = void 0),
      (t.WeatherDataAsset = void 0),
      (t.BlendWeight = 0),
      (t.bEnabled = !1),
      this.jje(),
      this.Xje();
  }
  Xje() {
    const i = this.kje.WeatherConfig,
      s =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            18,
            "加载剧情天气",
            ["id", i.Id],
            ["DA", i.DAPath],
          ),
        this.kje.KuroPostProcessComponent);
    ResourceSystem_1.ResourceSystem.LoadAsync(
      i.DAPath,
      UE.KuroWeatherDataAsset,
      (t) => {
        t?.IsValid() &&
          this.kje.WeatherConfig?.Id === i.Id &&
          ((s.WeatherDataAsset = t),
          s.SetPriority(this.kje.Priority),
          (this.kje.IsLoadCompleted = !0),
          this.Z0e(this.kje, 0));
      },
    );
  }
  Vto(t) {
    this.kje &&
      this.kje.Priority !== t &&
      ((this.kje.Priority = t), this.kje.IsLoadCompleted) &&
      this.kje.KuroPostProcessComponent?.IsValid() &&
      this.kje.KuroPostProcessComponent.SetPriority(t);
  }
}
exports.PlotWeather = PlotWeather;
//# sourceMappingURL=PlotWeather.js.map
