"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaAtmosphere = exports.AreaAtmosphereActorInfo = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class AreaAtmosphereActorInfo {
  constructor() {
    (this.AreaAtmosphereInfo = void 0),
      (this.Actor = void 0),
      (this.KuroPostProcessComponent = void 0),
      (this.TargetBlendWeight = 0),
      (this.CurBlendWeight = 0),
      (this.ChangeSpeed = 0),
      (this.IsLoadCompleted = !1);
  }
  Clear() {
    (this.AreaAtmosphereInfo = void 0),
      this.Actor && ActorSystem_1.ActorSystem.Put(this.Actor),
      (this.Actor = void 0),
      (this.KuroPostProcessComponent = void 0);
  }
}
exports.AreaAtmosphereActorInfo = AreaAtmosphereActorInfo;
class AreaAtmosphere {
  constructor() {
    (this.kje = void 0),
      (this.Fje = void 0),
      (this.uMe = () => {
        this.Vje();
      }),
      (this.nye = () => {
        this.Hje();
      }),
      (this.Hje = () => {
        this.kje && (this.kje.TargetBlendWeight = 0);
        var e = ModelManager_1.ModelManager.AreaModel.AreaInfo;
        if (e) {
          let t = e.AtmosphereId;
          if (0 === t) {
            if (0 === e.Father) return;
            e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.Father);
            if (!e || 0 === e.AtmosphereId) return;
            t = e.AtmosphereId;
          }
          var i,
            e =
              ConfigManager_1.ConfigManager.AreaConfig.GetAreaAtmosphereInfo(t);
          e &&
            (this.kje
              ? this.kje.AreaAtmosphereInfo.Id === e.Id
                ? ((this.kje.TargetBlendWeight = 1),
                  this.Z0e(this.kje, 0),
                  this.jje())
                : this.Fje
                  ? ((i = this.Fje),
                    (this.Fje = this.kje),
                    (this.kje = i),
                    this.kje.AreaAtmosphereInfo.Id === e.Id
                      ? ((this.kje.TargetBlendWeight = 1),
                        this.Z0e(this.kje, 0),
                        this.jje())
                      : (this.Wje(e), this.Kje()))
                  : ((this.Fje = this.kje),
                    (this.kje = new AreaAtmosphereActorInfo()),
                    this.Wje(e),
                    this.Qje())
              : ((this.kje = new AreaAtmosphereActorInfo()),
                this.Wje(e),
                this.Qje()));
        }
      }),
      this.AU();
  }
  AU() {
    this.dde();
  }
  Destroy() {
    this.Cde(), this.Vje();
  }
  Vje() {
    this.kje && (this.kje.Clear(), (this.kje = void 0)),
      this.Fje && (this.Fje.Clear(), (this.Fje = void 0));
  }
  OnTick(t) {
    this.Z0e(this.kje, t), this.Z0e(this.Fje, t);
  }
  Z0e(t, e) {
    if (t && t.IsLoadCompleted && t.CurBlendWeight !== t.TargetBlendWeight) {
      var i = t.CurBlendWeight;
      if (0 === t.ChangeSpeed) t.CurBlendWeight = t.TargetBlendWeight;
      else {
        if (!(0 < e)) return;
        t.TargetBlendWeight > t.CurBlendWeight
          ? ((t.CurBlendWeight = t.CurBlendWeight + e * t.ChangeSpeed),
            (t.CurBlendWeight = Math.min(
              t.CurBlendWeight,
              t.TargetBlendWeight,
            )))
          : ((t.CurBlendWeight = t.CurBlendWeight - e * t.ChangeSpeed),
            (t.CurBlendWeight = Math.max(
              t.CurBlendWeight,
              t.TargetBlendWeight,
            )));
      }
      (t.KuroPostProcessComponent.BlendWeight = t.CurBlendWeight),
        0 === i &&
          0 < t.CurBlendWeight &&
          ((t.KuroPostProcessComponent.bEnabled = !0),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Area",
            18,
            "区域氛围开启",
            ["id", t.AreaAtmosphereInfo.Id],
            ["DA", t.AreaAtmosphereInfo.DAPath],
          ),
        0 < i &&
          0 === t.CurBlendWeight &&
          ((t.KuroPostProcessComponent.bEnabled = !1),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Area",
            18,
            "区域氛围关闭",
            ["id", t.AreaAtmosphereInfo.Id],
            ["DA", t.AreaAtmosphereInfo.DAPath],
          );
    }
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ClearWorld,
      this.uMe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeArea,
        this.Hje,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ClearWorld,
      this.uMe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeArea,
        this.Hje,
      );
  }
  Wje(t) {
    0 < (this.kje.AreaAtmosphereInfo = t).FadeTime
      ? (this.kje.ChangeSpeed =
          1 / (t.FadeTime * TimeUtil_1.TimeUtil.InverseMillisecond))
      : (this.kje.ChangeSpeed = 0);
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
  Qje() {
    let t = void 0;
    t = Global_1.Global.BaseCharacter
      ? Global_1.Global.BaseCharacter.GetTransform()
      : new UE.Transform();
    var e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t),
      i =
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          e.SetActorLabel("AreaAtmosphere"),
        e.AddComponentByClass(
          UE.KuroPostProcessComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ));
    (i.bUnbound = !0),
      (i.BlendWeight = 0),
      (i.bEnabled = !1),
      (this.kje.Actor = e),
      (this.kje.KuroPostProcessComponent = i),
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
    const e = this.kje.AreaAtmosphereInfo,
      i = this.kje.KuroPostProcessComponent;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Area",
        18,
        "开始加载区域氛围",
        ["id", e.Id],
        ["DA", e.DAPath],
      ),
      e.IsTOD
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            e.DAPath,
            UE.KuroTODData,
            (t) => {
              t?.IsValid() &&
                this.kje.AreaAtmosphereInfo.Id === e.Id &&
                ((this.kje.IsLoadCompleted = !0),
                (i.PPTODDataAsset = t),
                i.SetPriority(e.Priority),
                this.Z0e(this.kje, 0),
                Log_1.Log.CheckDebug()) &&
                Log_1.Log.Debug(
                  "Area",
                  18,
                  "加载氛围资源成功",
                  ["id", e.Id],
                  ["DA", e.DAPath],
                );
            },
          )
        : ResourceSystem_1.ResourceSystem.LoadAsync(
            e.DAPath,
            UE.KuroWeatherDataAsset,
            (t) => {
              t?.IsValid() &&
                this.kje.AreaAtmosphereInfo.Id === e.Id &&
                ((this.kje.IsLoadCompleted = !0),
                (i.WeatherDataAsset = t),
                i.SetPriority(e.Priority),
                this.Z0e(this.kje, 0),
                Log_1.Log.CheckDebug()) &&
                Log_1.Log.Debug(
                  "Area",
                  18,
                  "加载氛围资源成功",
                  ["id", e.Id],
                  ["DA", e.DAPath],
                );
            },
          );
  }
}
exports.AreaAtmosphere = AreaAtmosphere;
//# sourceMappingURL=AreaAtmosphere.js.map
