"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioSystem =
    exports.parseAudioEventPath =
    exports.parseAudioEventPathInConfig =
    exports.INVALID_AUDIO_EVENT_VALUE =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log"),
  FNameUtil_1 = require("../Utils/FNameUtil"),
  AudioEventPool_1 = require("./AudioEventPool"),
  ExecutionQueue_1 = require("./ExecutionQueue"),
  INVALID_PLAYING_ID = 0;
function instanceOf(t, e) {
  return (
    t.IsValid() &&
      "function" != typeof t.IsA &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Audio",
        56,
        "[Core.AudioSystem] 排查 Object.IsA 失效问题",
        ["object", t],
      ),
    t.IsValid() && t.IsA(e.StaticClass()) && t.GetWorld()?.IsValid()
  );
}
function parseAudioEventPathInConfig(t) {
  var e = /^\/Game\/Aki\/WwiseAudio\/Events\/(?<name>\w+)/.exec(t);
  return (
    e ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Audio",
          56,
          "[Core.AudioSystem] 非法的 AudioEvent 路径",
          ["path", t],
          [
            "reason",
            "未在 /Game/Aki/WwiseAudio/Events/ 路径下或命名不符合规范",
          ],
        )),
    e?.groups?.name
  );
}
function parseAudioEventPath(t) {
  t = "string" == typeof t ? t : t.ToAssetPathName();
  return t ? t.split(".").at(-1)?.toLowerCase() : void 0;
}
(exports.INVALID_AUDIO_EVENT_VALUE = 0),
  (exports.parseAudioEventPathInConfig = parseAudioEventPathInConfig),
  (exports.parseAudioEventPath = parseAudioEventPath);
class AudioSystem {
  static Tick(t) {
    this.a8.Tick(t);
  }
  static PostEvent(o, i, s) {
    return !o || o.length < 1
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            42,
            "[Core.AudioSystem] 空的音频事件event参数",
          ),
        exports.INVALID_AUDIO_EVENT_VALUE)
      : i instanceof UE.Object && i.IsValid() && "function" != typeof i.IsA
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Audio",
              56,
              "[Core.AudioSystem] 排查 Object.IsA 失效问题",
              Error(
                'target instanceof UE.Object && target.IsValid() && typeof target.IsA !== "function"',
              ),
              ["target", i],
            ),
          exports.INVALID_AUDIO_EVENT_VALUE)
        : this.h8.Enqueue(async (t) => {
            var e = await this.l8(o, i, s);
            e && (this._8.set(t, e), this.u8.set(e, t));
          });
  }
  static async l8(e, o, i = {}) {
    if (!e || e.length < 1)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          42,
          "[Core.AudioSystem] 空的音频事件event参数",
        );
    else {
      var s = await this.a8.GetAudioEvent(e);
      if (s) {
        var { ExternalSourceName: n, ExternalSourceMediaName: r } = i,
          { CallbackMask: n = 1, CallbackHandler: r } =
            (n &&
              r &&
              UE.WwiseExternalSourceStatics.SetExternalSourceMediaByName(n, r),
            i),
          n = 1 | n,
          r = this.c8(r);
        let t = void 0;
        if (void 0 === o) t = s.PostOnActor(void 0, r, n, !1);
        else if (o instanceof UE.TransformDouble) {
          var a = o.GetLocation(),
            u = o.GetRotation().Rotator();
          t = s.D_PostAtLocation(a, u, r, n, Info_1.Info.World);
        } else if (instanceOf(o, UE.Actor)) {
          var { StopWhenOwnerDestroyed: a = !1 } = i;
          t = s.PostOnActor(o, r, n, a);
        } else {
          if (!instanceOf(o, UE.AkComponent))
            return void (
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Audio",
                56,
                "[Core.AudioSystem] PostEvent 执行失败",
                ["Event", e],
                ["Args", i],
                ["Reason", "目标对象无效"],
              )
            );
          var { StopWhenOwnerDestroyed: u = !1 } = i;
          t = s.PostOnComponent(o, r, n, u);
        }
        if (t !== INVALID_PLAYING_ID) return t;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            56,
            "[Core.AudioSystem] PostEvent 执行失败",
            ["Event", e],
            [
              "Target",
              void 0 === o
                ? "Global"
                : o instanceof UE.TransformDouble
                  ? o.ToString()
                  : o.GetName(),
            ],
            ["Args", i],
            ["Reason", "SoundEngine 内部异常"],
          );
      }
    }
  }
  static c8(o) {
    const i = (t, e) => {
      o?.(t, e),
        0 === t &&
          ((0, puerts_1.releaseManualReleaseDelegate)(i),
          (t = e.PlayingID),
          (e = this.u8.get(t))) &&
          (this.u8.delete(t), this._8.delete(e));
    };
    return (0, puerts_1.toManualReleaseDelegate)(i);
  }
  static ExecuteAction(...t) {
    if ("string" == typeof t[0]) {
      const [i, s, n = {}] = t;
      !i || i.length < 1
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            42,
            "[Core.AudioSystem] 空的音频事件event参数",
          )
        : this.h8.Enqueue(() => {
            var { Actor: t, TransitionDuration: e, TransitionFadeCurve: o } = n;
            UE.KuroAudioStatics.ExecuteActionOnEventName(i, s, t, e, o);
          });
    } else {
      const [r, a, u = {}] = t;
      (0 === a && this.h8.Cancel(r)) ||
        this.h8.Enqueue(() => {
          var t,
            e,
            o = this._8.get(r);
          o &&
            (({ TransitionDuration: t, TransitionFadeCurve: e } = u),
            UE.KuroAudioStatics.ExecuteActionOnPlayingId(o, a, t, e));
        });
    }
  }
  static SeekOnEvent(e, o, i = {}) {
    !e || e.length < 1
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Audio", 42, "[Core.AudioSystem] 空的音频事件event参数")
      : this.h8.Enqueue(() => {
          var t;
          void 0 === i.Handle
            ? UE.KuroAudioStatics.SeekOnEventName(
                e,
                o,
                i.Actor,
                void 0,
                i.SnapToMarker,
              )
            : (t = this._8.get(i.Handle)) &&
              UE.KuroAudioStatics.SeekOnEventName(
                e,
                o,
                i.Actor,
                t,
                i.SnapToMarker,
              );
        });
  }
  static GetSourcePlayPosition(t) {
    var t = this._8.get(t);
    return !t || -1 === (t = UE.KuroAudioStatics.GetSourcePlayPosition(t))
      ? void 0
      : t;
  }
  static SetSwitch(t, e, o) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.SetSwitch(t, e, o);
    });
  }
  static SetState(t, e) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.SetState(t, e);
    });
  }
  static SetRtpcValue(i, s, n = {}) {
    this.h8.Enqueue(() => {
      var { Actor: t, TransitionDuration: e, TransitionFadeCurve: o } = n;
      UE.KuroAudioStatics.SetRtpcValue(i, s, t, e, o);
    });
  }
  static StopAll(t) {
    this.h8.Enqueue(() => {
      UE.KuroAudioStatics.StopAll(t);
    });
  }
  static GetAkComponent(t, e = {}) {
    var { SocketName: e, OnCreated: o } = e;
    let i = void 0;
    i =
      "string" == typeof e
        ? FNameUtil_1.FNameUtil.GetDynamicFName(0 < e.length ? e : "None")
        : e && 0 < e.toString().length
          ? e
          : FNameUtil_1.FNameUtil.GetDynamicFName("None");
    e = (0, puerts_1.$ref)(!1);
    let s = void 0;
    return (
      instanceOf(t, UE.Actor)
        ? (s = UE.KuroAudioStatics.GetAkComponent(t.RootComponent, i, e))
        : instanceOf(t, UE.SceneComponent) &&
          (s = UE.KuroAudioStatics.GetAkComponent(t, i, e)),
      (0, puerts_1.$unref)(e) && ((t = s?.GetOwner()), o) && t && s && o(t, s),
      s
    );
  }
  static PreloadAudioEvent(t) {
    this.a8.PreloadAudioEvent(t);
  }
  static ReleaseAudioEvent(t) {
    this.a8.ReleaseAudioEvent(t);
  }
}
((exports.AudioSystem = AudioSystem).a8 =
  new AudioEventPool_1.AudioEventPool()),
  (AudioSystem.h8 = new ExecutionQueue_1.ExecutionQueue()),
  (AudioSystem._8 = new Map()),
  (AudioSystem.u8 = new Map());
//# sourceMappingURL=AudioSystem.js.map
