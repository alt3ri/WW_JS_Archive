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
class WeatherComponent {
  constructor() {
    (this.BlendWeightNonScale = 1), (this.Component = void 0);
  }
}
class WeatherActor {
  constructor() {
    (this.xko = void 0),
      (this.F5l = new WeatherComponent()),
      (this.N5l = new WeatherComponent()),
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
      (this.wta = 0),
      (this.V5l = !1),
      (this.j5l = 1),
      (this.J_ = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        var t = this.Uqe / (1e3 * this.Oko),
          t = MathUtils_1.MathUtils.Clamp(t, 0, 1),
          i = MathUtils_1.MathUtils.Lerp(this.bko, this.Gko, t),
          s = MathUtils_1.MathUtils.Lerp(this.qko, this.Nko, t),
          h = Time_1.Time.DeltaTimeSeconds;
        (this.j5l = this.V5l ? this.j5l - h : this.j5l + h),
          (this.j5l = MathUtils_1.MathUtils.Clamp(this.j5l, 0, 1)),
          this.Fko(i),
          this.Vko(s),
          1 <= t &&
            ((this.V5l && this.j5l <= 0) || (!this.V5l && 1 <= this.j5l)) &&
            this.jm();
      }),
      (this.Fko = (t) => {
        this.wko &&
          ((this.wko.BlendWeightNonScale = t),
          (this.wko.Component.BlendWeight = t * this.j5l));
      }),
      (this.Vko = (t) => {
        this.Bko &&
          ((this.Bko.BlendWeightNonScale = t),
          (this.Bko.Component.BlendWeight = t * this.j5l));
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
        MathUtils_1.MathUtils.DefaultTransformDouble,
        void 0,
      )),
      this.xko.OnDestroyed.Add(this.v9e),
      (this.F5l.Component = this.xko.KuroPostProcess_1),
      (this.F5l.Component.BlendWeight = this.F5l.BlendWeightNonScale = 1),
      (this.N5l.Component = this.xko.KuroPostProcess_2),
      (this.N5l.Component.BlendWeight = this.N5l.BlendWeightNonScale = 0));
  }
  BanWeather() {
    this.Destroy(), (this.kko = !this.kko);
  }
  SetActorState(t) {
    this.G2e !== t &&
      (this.xko?.IsValid() && this.xko.SetActorHiddenInGame(!t),
      (this.G2e = t));
  }
  Bta() {
    0 !== this.wta &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.wta),
      (this.wta = 0));
  }
  ChangeWeather(t, i) {
    this.jm(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Weather",
          27,
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
          this.F5l.BlendWeightNonScale >= this.N5l.BlendWeightNonScale
            ? ((this.wko = this.F5l), (this.Bko = this.N5l))
            : ((this.wko = this.N5l), (this.Bko = this.F5l)),
          this.Bta(),
          (this.wta = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.KuroWeatherDataAsset,
            (t) => {
              t?.IsValid() &&
                this.Bko &&
                this.Bko.Component &&
                ((this.wta = 0), (this.Bko.Component.WeatherDataAsset = t));
            },
          )),
          0 === i
            ? (this.Fko(0), this.Vko(1))
            : ((this.bko = this.wko.BlendWeightNonScale),
              (this.Gko = 0),
              (this.qko = this.Bko.BlendWeightNonScale),
              (this.Nko = 1),
              (this.Oko = i),
              (this.Uqe = 0),
              this.Rqe === TickSystem_1.TickSystem.InvalidId &&
                (this.Rqe = TickSystem_1.TickSystem.Add(
                  this.J_,
                  "WeatherActor",
                ).Id))));
  }
  SetWeatherForbidden(t) {
    (this.V5l = t),
      this.Rqe === TickSystem_1.TickSystem.InvalidId &&
        (this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "WeatherActor").Id);
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
