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
  GameAudioModel_1 = require("./GameAudioModel");
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
    this.Nme = e;
    e = this.Nme.ToUeVector();
    this.xin(e), this.$Tn(e), this.kWe(e);
  }
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterLoadMap,
        this.k2a,
      ),
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
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeArea,
        this.Hje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInstanceChange,
        this.KDc,
      ),
      Net_1.Net.Register(21732, GameAudioController.UUn),
      !0
    );
  }
  static OnTick(e) {
    (this.mie += e),
      this.mie > GameAudioModel_1.CHECK_TIME_OUT_COOLDOWN_RECORD &&
        ((this.mie = 0),
        ModelManager_1.ModelManager.GameAudioModel?.CheckTimeOutCooldownRecords());
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterLoadMap,
        this.k2a,
      ),
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
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeArea,
        this.Hje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInstanceChange,
        this.KDc,
      ),
      Net_1.Net.UnRegister(21732),
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
    var o = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    o?.IsValid()
      ? (o = o.GetEnvironmentInfo(e.op_ToVector())).StateEvent !==
          this.YTn.StateEvent &&
        ((this.YTn.StateEvent = o.StateEvent),
        (e = o.StateEvent || this.HWe?.ResetEvent)
          ? (AudioSystem_1.AudioSystem.PostEvent(e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 56, "[Game.Environment] PostEvent", [
                "Event",
                e,
              ]))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              56,
              "[Game.Environment] 当前地图未配置重置音频事件",
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          56,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }
  static $Tn(e) {
    var o = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    o?.IsValid()
      ? (o = o.GetEnvironmentInfo_MusicCompatible(e.op_ToVector()))
          .StateEvent !== this.YTn.StateEvent_MusicCompatible &&
        ((this.YTn.StateEvent_MusicCompatible = o.StateEvent),
        (e = o.StateEvent || this.HWe?.MusicResetEvent)
          ? (AudioSystem_1.AudioSystem.PostEvent(e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 56, "[Game.Environment] PostEvent", [
                "Event",
                e,
              ]))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              56,
              "[Game.Environment] 当前地图未配置重置音频事件",
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          56,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }
  static kWe(e) {
    var o = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    if (o?.IsValid()) {
      var t,
        i,
        n,
        a,
        r = o.GetEnvironmentStates(e.op_ToVector());
      for ([t, i] of this.VWe.entries()) {
        var _ = r.Get(t);
        _
          ? (r.Remove(t),
            _ !== i &&
              (this.VWe.set(t, _),
              UE.KuroAudioStatics.SetState(t, _),
              Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[Game.Environment] SetState",
                ["Group", t],
                ["State", _],
              ))
          : (this.VWe.delete(t),
            UE.KuroAudioStatics.SetState(t, "none"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[Game.Environment] SetState",
                ["Group", t],
                ["State", "none"],
              ));
      }
      for (let e = 0; e < r.GetMaxIndex(); e++)
        r.IsValidIndex(e) &&
          ((n = r.GetKey(e)), (a = r.Get(n))) &&
          (this.VWe.set(n, a),
          UE.KuroAudioStatics.SetState(n, a),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Audio",
            56,
            "[Game.Environment] SetState",
            ["Group", n],
            ["State", a],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          56,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }
  static UpdateAudioState(e) {
    for (const o of e)
      o.Y4n
        ? UE.KuroAudioStatics.SetState(o.USs, o.Y4n)
        : UE.KuroAudioStatics.SetState(o.USs, "none");
  }
  static UpdateAudioStatebyClient(e) {
    e.Group && UE.KuroAudioStatics.SetState(e.Group, e.State);
  }
  static UpdateLoadingType(e) {
    if (this.Ltl !== e)
      if (
        ((this.Ltl = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Audio", 42, "[Game.Audio] UpdateLoadingType", [
            "type",
            e,
          ]),
        void 0 !== e)
      )
        switch (e) {
          case 1:
            AudioSystem_1.AudioSystem.SetState("loading", "default");
            break;
          case 2:
            AudioSystem_1.AudioSystem.SetState("loading", "fade");
            break;
          case 4:
            AudioSystem_1.AudioSystem.SetState("loading", "seamless");
            break;
          default:
            AudioSystem_1.AudioSystem.SetState("loading", "others");
        }
      else AudioSystem_1.AudioSystem.SetState("loading", "none");
  }
  static GetAkComponent(e, o) {
    if (e.IsA(UE.TsBaseCharacter_C.StaticClass())) {
      var t = e.CharacterActorComponent?.Entity?.GetComponent(50);
      if (t?.Valid) return t.GetAkComponent(o);
    }
    if (e.IsA(UE.TsUiSceneRoleActor_C.StaticClass())) {
      t = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: o,
        OnCreated: (e) => {
          AudioSystem_1.AudioSystem.SetSwitch("actor_ui_switch", "sys_ui", e);
        },
      });
      if (t) return t;
    }
    if (e.IsA(UE.Actor.StaticClass())) {
      t = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: o,
        OnCreated: (e) => {
          this.SetRolePriority(0, e);
        },
      });
      if (t) return t;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Audio",
        42,
        "[Game.Audio] GetAkComponent 失败",
        ["Owner", e.GetName()],
        ["Socket", o],
        ["Class", e.GetClass().GetName()],
      );
  }
  static SetRolePriority(e, o) {
    let t = 0,
      i = "p1",
      n = "";
    switch (e) {
      case 0:
        (t = 1), (i = "p1"), (n = "当前控制");
        break;
      case 1:
        (t = 0.5), (i = "p3"), (n = "后台控制");
        break;
      case 2:
        (t = 0), (i = "p3"), (n = "其他归属");
    }
    AudioSystem_1.AudioSystem.SetSwitch("char_p1orp3", i, o),
      AudioSystem_1.AudioSystem.SetRtpcValue("role_priority", t, { Actor: o }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[char_p1orp3] 实体声音模式设置P1/P3优先级和RTPC(role_priority)",
          ["char_p1orp3", i],
          ["RolePriority", n],
          ["actor", o.GetName()],
        );
  }
  static AddRolePrioritySummon(e, o, t) {
    GameAudioController.rQl.has(e) || GameAudioController.rQl.set(e, []),
      GameAudioController.rQl.get(e).push({ Id: o, Actor: t }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[char_p1orp3] 角色语音优先级记录召唤物",
          ["召唤师ID", e],
          ["召唤物ID", o],
          ["actor", t.GetName()],
        );
  }
  static RemoveRolePrioritySummon(e, o) {
    GameAudioController.rQl.has(e) &&
      GameAudioController.rQl.get(e).filter((e) => e.Id !== o),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[char_p1orp3] 角色语音优先级移除记录的召唤物",
          ["召唤师ID", e],
          ["召唤物ID", o],
        );
  }
  static RoleChangeController(e, o) {
    if (GameAudioController.rQl.has(e))
      for (const t of GameAudioController.rQl.get(e))
        GameAudioController.SetRolePriority(o ? 0 : 1, t.Actor);
  }
  static AddPostAkEventHandle(e) {
    this.XDc.add(e);
  }
  static RemovePostAkEventHandle(e) {
    this.XDc.has(e) && this.XDc.delete(e);
  }
}
(exports.GameAudioController = GameAudioController),
  ((_a = GameAudioController).HWe = void 0),
  (GameAudioController.Nme = void 0),
  (GameAudioController.Ltl = void 0),
  (GameAudioController.YTn = new EnvironmentCache()),
  (GameAudioController.VWe = new Map()),
  (GameAudioController.ZUn = new StateRef_1.StateRef("weather_type", "none")),
  (GameAudioController.bPl = new StateRef_1.StateRef("country", "none")),
  (GameAudioController.mie = 0),
  (GameAudioController.k2a = () => {
    var e = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
    e?.IsValid()
      ? e.EnvironmentUpdatedDelegate.Add(() => {
          var e;
          _a.Nme &&
            ((e = _a.Nme.ToUeVector()),
            _a.xin(e),
            _a.$Tn(e),
            _a.kWe(e),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Audio",
              56,
              "[Game.Environment] EnvironmentUpdatedDelegate",
            );
        })
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          56,
          "[Game.Controller] AudioEnvironmentSubsystem 无效",
        );
  }),
  (GameAudioController.nye = () => {
    _a.zUn(), AudioSystem_1.AudioSystem.PostEvent("on_world_done");
  }),
  (GameAudioController.FWe = () => {
    var e = ModelManager_1.ModelManager.GameModeModel?.MapConfig.MapId;
    (_a.HWe = e
      ? ConfigManager_1.ConfigManager.AudioConfig?.GetMapConfig(e)
      : void 0),
      _a.HWe?.EnterEvent &&
        (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.EnterEvent),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Audio", 56, "[Game.World] PostEvent", [
          "Event",
          _a.HWe.EnterEvent,
        ]),
      _a.HWe?.Event &&
        (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.Event),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Audio", 56, "[Game.World] PostEvent", [
          "Event",
          _a.HWe.Event,
        ]);
  }),
  (GameAudioController.uMe = () => {
    _a.HWe?.Event &&
      (AudioSystem_1.AudioSystem.ExecuteAction(_a.HWe.Event, 0),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Audio", 56, "[Game.World] StopEvent", [
        "Event",
        _a.HWe.Event,
      ]),
      _a.HWe?.ExitEvent &&
        (AudioSystem_1.AudioSystem.PostEvent(_a.HWe.ExitEvent),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Audio", 56, "[Game.World] PostEvent", [
          "Event",
          _a.HWe.ExitEvent,
        ]),
      (_a.HWe = void 0),
      (_a.Nme = void 0),
      AudioSystem_1.AudioSystem.PostEvent("on_world_cleanup");
  }),
  (GameAudioController.Ilt = () => {
    _a.zUn();
  }),
  (GameAudioController.dIe = () => {
    _a.zUn();
  }),
  (GameAudioController.Hje = () => {
    var e;
    ModelManager_1.ModelManager.AreaModel?.AreaInfo &&
      ConfigManager_1.ConfigManager.InfluenceConfig &&
      ((e =
        ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
          ModelManager_1.ModelManager.AreaModel.AreaInfo.CountryId,
        )?.AudioName ?? "none"),
      (_a.bPl.State = e),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Game.World] Change area, update country audio",
        ["AudioName", e],
      );
  }),
  (GameAudioController.UUn = (e) => {
    _a.UpdateAudioState(e.wSs);
  }),
  (GameAudioController.rQl = new Map()),
  (GameAudioController.XDc = new Set()),
  (GameAudioController.KDc = (e, o) => {
    if (e !== o || 0 !== _a.XDc.size) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[PostAkEventAudio] 地图变更",
            ["Old", e],
            ["New", o],
          ),
        ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(o) &&
          !ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(e))
      )
        for (const t of _a.XDc)
          AudioSystem_1.AudioSystem.ExecuteAction(t, 0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[PostAkEventAudio] 全局音频事件Handle移除",
                ["Handle", t],
              );
      _a.XDc.clear();
    }
  });
//# sourceMappingURL=GameAudioController.js.map
