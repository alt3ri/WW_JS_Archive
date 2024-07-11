"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameAudioController = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  StateRef_1 = require("../../../Core/Utils/Audio/StateRef"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TOLERANCE = 0.01,
  DYNAMIC_REVERB_RTPC_1 = "reverb_azi_count",
  DYNAMIC_REVERB_RTPC_2 = "reverb_eleva_distance";
class EnvironmentCache {
  constructor() {
    (this.StateEvent = ""),
      (this.StateEvent_MusicCompatible = ""),
      (this.DynamicReverbRtpc1 = 0),
      (this.DynamicReverbRtpc2 = 0),
      (this.DynamicReverbEnabled = !1);
  }
}
class GameAudioController extends ControllerBase_1.ControllerBase {
  static UpdatePlayerLocation(e) {
    this.xin(e), this.$Tn(e), this.kWe(e);
  }
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.FWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WeatherChange,
        this.dIe,
      ),
      Net_1.Net.Register(27998, GameAudioController.UUn),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.FWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WeatherChange,
        this.dIe,
      ),
      Net_1.Net.UnRegister(27998),
      !0
    );
  }
  static zUn() {
    switch (ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType()) {
      case 1:
        this.ZUn.State = "sunny";
        break;
      case 2:
        this.ZUn.State = "cloudy";
        break;
      case 3:
        this.ZUn.State = "rainy";
        break;
      case 4:
        this.ZUn.State = "thunder_rain";
        break;
      case 5:
        this.ZUn.State = "snowy";
        break;
      default:
        this.ZUn.State = "none";
    }
  }
  static xin(e) {
    var t,
      o,
      n = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    n?.IsValid()
      ? ((t = n.GetEnvironmentInfo(e)).StateEvent !== this.YTn.StateEvent &&
          ((this.YTn.StateEvent = t.StateEvent),
          (o = t.StateEvent || this.HWe?.ResetEvent)
            ? (AudioSystem_1.AudioSystem.PostEvent(o),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Audio", 57, "[Game.Environment] PostEvent", [
                  "Event",
                  o,
                ]))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Audio",
                57,
                "[Game.Environment] 当前地图未配置重置音频事件",
              )),
        t.bEnableDynamicReverb
          ? ((this.YTn.DynamicReverbEnabled = !0),
            (o = n.CalculateDynamicReverbParam(e)),
            this.JTn(o))
          : this.YTn.DynamicReverbEnabled &&
            ((this.YTn.DynamicReverbEnabled = !1), this.JTn(void 0)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          57,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }
  static $Tn(e) {
    var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    t?.IsValid()
      ? (t = t.GetEnvironmentInfo_MusicCompatible(e)).StateEvent !==
          this.YTn.StateEvent_MusicCompatible &&
        ((this.YTn.StateEvent_MusicCompatible = t.StateEvent),
        (e = t.StateEvent || this.HWe?.MusicResetEvent)
          ? (AudioSystem_1.AudioSystem.PostEvent(e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 57, "[Game.Environment] PostEvent", [
                "Event",
                e,
              ]))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              57,
              "[Game.Environment] 当前地图未配置重置音频事件",
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          57,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }
  static JTn(e) {
    var t;
    e
      ? ((t = Math.trunc((e.HorizontalHitCount - 1) / 2)),
        Math.abs(this.YTn.DynamicReverbRtpc1 - t) > TOLERANCE &&
          ((this.YTn.DynamicReverbRtpc1 = t),
          AudioSystem_1.AudioSystem.SetRtpcValue(DYNAMIC_REVERB_RTPC_1, t)),
        (t = e.VerticalHitDistance),
        Math.abs(this.YTn.DynamicReverbRtpc2 - t) > TOLERANCE &&
          ((this.YTn.DynamicReverbRtpc2 = t),
          AudioSystem_1.AudioSystem.SetRtpcValue(DYNAMIC_REVERB_RTPC_2, t)))
      : ((this.YTn.DynamicReverbRtpc1 = 0),
        (this.YTn.DynamicReverbRtpc2 = 0),
        AudioSystem_1.AudioSystem.SetRtpcValue(DYNAMIC_REVERB_RTPC_1, 0),
        AudioSystem_1.AudioSystem.SetRtpcValue(DYNAMIC_REVERB_RTPC_2, 0));
  }
  static kWe(e) {
    var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (t?.IsValid()) {
      var o,
        n,
        i = t.GetEnvironmentStates(e);
      for ([o, n] of this.VWe.entries()) {
        var r = i.Get(o);
        r
          ? (i.Remove(o),
            r !== n &&
              (this.VWe.set(o, r),
              UE.KuroAudioStatics.SetState(o, r),
              Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info(
                "Audio",
                57,
                "[Game.Environment] SetState",
                ["Group", o],
                ["State", r],
              ))
          : (this.VWe.delete(o),
            UE.KuroAudioStatics.SetState(o, "none"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                57,
                "[Game.Environment] SetState",
                ["Group", o],
                ["State", "none"],
              ));
      }
      for (let e = 0; e < i.Num(); e++) {
        var a = i.GetKey(e),
          _ = i.Get(a);
        _ &&
          (this.VWe.set(a, _),
          UE.KuroAudioStatics.SetState(a, _),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Audio",
            57,
            "[Game.Environment] SetState",
            ["Group", a],
            ["State", _],
          );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          57,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }
  static UpdateAudioState(e) {
    for (const t of e)
      t.F4n
        ? UE.KuroAudioStatics.SetState(t.ISs, t.F4n)
        : UE.KuroAudioStatics.SetState(t.ISs, "none");
  }
}
(exports.GameAudioController = GameAudioController),
  ((_a = GameAudioController).HWe = void 0),
  (GameAudioController.YTn = new EnvironmentCache()),
  (GameAudioController.VWe = new Map()),
  (GameAudioController.ZUn = new StateRef_1.StateRef("weather_type", "none")),
  (GameAudioController.nye = () => {
    _a.zUn();
  }),
  (GameAudioController.FWe = () => {
    var e = ModelManager_1.ModelManager.GameModeModel?.MapConfig.MapId;
    (_a.HWe = e
      ? ConfigManager_1.ConfigManager.AudioConfig?.GetMapConfig(e)
      : void 0),
      _a.HWe?.EnterEvent &&
        (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.EnterEvent),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Audio", 57, "[Game.World] PostEvent", [
          "Event",
          _a.HWe.EnterEvent,
        ]),
      _a.HWe?.Event &&
        (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.Event),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Audio", 57, "[Game.World] PostEvent", [
          "Event",
          _a.HWe.Event,
        ]);
  }),
  (GameAudioController.uMe = () => {
    _a.HWe?.Event &&
      (AudioSystem_1.AudioSystem.ExecuteAction(_a.HWe.Event, 0),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Audio", 57, "[Game.World] StopEvent", [
        "Event",
        _a.HWe.Event,
      ]),
      _a.HWe?.ExitEvent &&
        (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.ExitEvent),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Audio", 57, "[Game.World] PostEvent", [
          "Event",
          _a.HWe.ExitEvent,
        ]),
      (_a.HWe = void 0),
      AudioSystem_1.AudioSystem.PostEvent("on_world_cleanup");
  }),
  (GameAudioController.Ilt = () => {
    _a.zUn();
  }),
  (GameAudioController.dIe = () => {
    _a.zUn();
  }),
  (GameAudioController.UUn = (e) => {
    _a.UpdateAudioState(e.TSs);
  });
//# sourceMappingURL=GameAudioController.js.map
