"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeatherActor = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class WeatherActor {
  constructor() {
    (this.bOo = void 0),
      (this.qOo = void 0),
      (this.GOo = void 0),
      (this.NOo = 0),
      (this.OOo = 0),
      (this.kOo = 0),
      (this.FOo = 0),
      (this.Uqe = -0),
      (this.VOo = -0),
      (this.HOo = !1),
      (this.Rqe = TickSystem_1.TickSystem.InvalidId),
      (this.Mke = !1),
      (this.LVs = 0),
      (this.J_ = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        const t = this.Uqe / (1e3 * this.VOo);
        const i = MathUtils_1.MathUtils.Lerp(this.NOo, this.kOo, t);
        const s = MathUtils_1.MathUtils.Lerp(this.OOo, this.FOo, t);
        this.jOo(i), this.WOo(s), t >= 1 && this.jm();
      }),
      (this.jOo = (t) => {
        this.qOo?.IsValid() && (this.qOo.BlendWeight = t);
      }),
      (this.WOo = (t) => {
        this.GOo?.IsValid() && (this.GOo.BlendWeight = t);
      }),
      (this.n8e = () => {
        this.jm(),
          (this.qOo = void 0),
          (this.GOo = void 0),
          (this.bOo = void 0);
      });
  }
  KOo() {
    this.bOo?.IsValid() ||
      ((this.bOo = ActorSystem_1.ActorSystem.Get(
        UE.BP_Weather_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
        void 0,
      )),
      this.bOo.OnDestroyed.Add(this.n8e));
  }
  BanWeather() {
    this.Destroy(), (this.HOo = !this.HOo);
  }
  SetActorState(t) {
    this.Mke !== t &&
      (this.bOo?.IsValid() && this.bOo.SetActorHiddenInGame(!t),
      (this.Mke = t));
  }
  DVs() {
    this.LVs !== 0 &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.LVs),
      (this.LVs = 0));
  }
  ChangeWeather(t, i) {
    let s;
    this.jm(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Weather",
          28,
          "改变天气",
          ["targetId", t],
          ["tweentime", i],
        ),
      this.HOo ||
        ((t =
          ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(
            t,
          )) &&
          ((t = t.DAPath),
          this.KOo(),
          (s = this.bOo).KuroPostProcess_1.BlendWeight >=
          s.KuroPostProcess_2.BlendWeight
            ? ((this.qOo = s.KuroPostProcess_1),
              (this.GOo = s.KuroPostProcess_2))
            : ((this.qOo = s.KuroPostProcess_2),
              (this.GOo = s.KuroPostProcess_1)),
          this.DVs(),
          (this.LVs = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.KuroWeatherDataAsset,
            (t) => {
              t?.IsValid() &&
                this.GOo?.IsValid() &&
                ((this.LVs = 0), (this.GOo.WeatherDataAsset = t));
            },
          )),
          i === 0
            ? (this.jOo(0), this.WOo(1))
            : ((this.NOo = this.qOo.BlendWeight),
              (this.kOo = 0),
              (this.OOo = this.GOo.BlendWeight),
              (this.FOo = 1),
              (this.VOo = i),
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
    this.bOo?.IsValid() && this.bOo.K2_DestroyActor(),
      (this.Mke = !1),
      (this.bOo = void 0);
  }
}
exports.WeatherActor = WeatherActor;
// # sourceMappingURL=WeatherActor.js.map
