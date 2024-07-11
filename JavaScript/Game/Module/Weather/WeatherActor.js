"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeatherActor = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class WeatherActor {
  constructor() {
    (this.xko = void 0),
      (this.wko = void 0),
      (this.Bko = void 0),
      (this.bko = 0),
      (this.qko = 0),
      (this.Gko = 0),
      (this.Nko = 0),
      (this.Uqe = -0),
      (this.Oko = -0),
      (this.kko = !1),
      (this.Rqe = TickSystem_1.TickSystem.InvalidId),
      (this.G2e = !1),
      (this.SZs = 0),
      (this.J_ = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        var t = this.Uqe / (1e3 * this.Oko),
          i = MathUtils_1.MathUtils.Lerp(this.bko, this.Gko, t),
          s = MathUtils_1.MathUtils.Lerp(this.qko, this.Nko, t);
        this.Fko(i), this.Vko(s), 1 <= t && this.jm();
      }),
      (this.Fko = (t) => {
        this.wko?.IsValid() && (this.wko.BlendWeight = t);
      }),
      (this.Vko = (t) => {
        this.Bko?.IsValid() && (this.Bko.BlendWeight = t);
      }),
      (this.v9e = () => {
        this.jm(),
          (this.wko = void 0),
          (this.Bko = void 0),
          (this.xko = void 0);
      });
  }
  Hko() {
    this.xko?.IsValid() ||
      ((this.xko = ActorSystem_1.ActorSystem.Get(
        UE.BP_Weather_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
        void 0,
      )),
      this.xko.OnDestroyed.Add(this.v9e));
  }
  BanWeather() {
    this.Destroy(), (this.kko = !this.kko);
  }
  SetActorState(t) {
    this.G2e !== t &&
      (this.xko?.IsValid() && this.xko.SetActorHiddenInGame(!t),
      (this.G2e = t));
  }
  EZs() {
    0 !== this.SZs &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SZs),
      (this.SZs = 0));
  }
  ChangeWeather(t, i) {
    var s;
    this.jm(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Weather",
          28,
          "改变天气",
          ["targetId", t],
          ["tweentime", i],
        ),
      this.kko ||
        ((t =
          ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(
            t,
          )) &&
          ((t = t.DAPath),
          this.Hko(),
          (s = this.xko).KuroPostProcess_1.BlendWeight >=
          s.KuroPostProcess_2.BlendWeight
            ? ((this.wko = s.KuroPostProcess_1),
              (this.Bko = s.KuroPostProcess_2))
            : ((this.wko = s.KuroPostProcess_2),
              (this.Bko = s.KuroPostProcess_1)),
          this.EZs(),
          (this.SZs = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.KuroWeatherDataAsset,
            (t) => {
              t?.IsValid() &&
                this.Bko?.IsValid() &&
                ((this.SZs = 0), (this.Bko.WeatherDataAsset = t));
            },
          )),
          0 === i
            ? (this.Fko(0), this.Vko(1))
            : ((this.bko = this.wko.BlendWeight),
              (this.Gko = 0),
              (this.qko = this.Bko.BlendWeight),
              (this.Nko = 1),
              (this.Oko = i),
              (this.Uqe = 0),
              (this.Rqe = TickSystem_1.TickSystem.Add(
                this.J_,
                "WeatherActor",
              ).Id))));
  }
  jm() {
    this.Rqe !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.Rqe),
      (this.Rqe = TickSystem_1.TickSystem.InvalidId));
  }
  Destroy() {
    this.xko?.IsValid() && this.xko.K2_DestroyActor(),
      (this.G2e = !1),
      (this.xko = void 0);
  }
}
exports.WeatherActor = WeatherActor;
//# sourceMappingURL=WeatherActor.js.map
