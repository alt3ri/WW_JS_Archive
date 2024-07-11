"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioSystem =
    exports.parseAudioEventPath =
    exports.parseAudioEventPathInConfig =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log"),
  AudioEventPool_1 = require("./AudioEventPool"),
  ExecutionQueue_1 = require("./ExecutionQueue"),
  INVALID_PLAYING_ID = 0;
function instanceOf(t, e) {
  return t.IsValid() && t.IsA(e.StaticClass());
}
function parseAudioEventPathInConfig(t) {
  var e = /^\/Game\/Aki\/WwiseAudio\/Events\/(?<name>\w+)/.exec(t);
  return (
    e ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Audio",
          57,
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
(exports.parseAudioEventPathInConfig = parseAudioEventPathInConfig),
  (exports.parseAudioEventPath = parseAudioEventPath);
class AudioSystem {
  static Tick(t) {
    this.a8.Tick(t);
  }
  static PostEvent(i, o, n) {
    return this.h8.Enqueue(async (t) => {
      var e = await this.l8(i, o, n);
      e && (this._8.set(t, e), this.u8.set(e, t));
    });
  }
  static async l8(e, i, o = {}) {
    var n = await this.a8.GetAudioEvent(e);
    if (n) {
      var { ExternalSourceName: s, ExternalSourceMediaName: r } = o,
        { CallbackMask: s = 1, CallbackHandler: r } =
          (s &&
            r &&
            UE.WwiseExternalSourceStatics.SetExternalSourceMediaByName(s, r),
          o),
        s = 1 | s,
        r = this.c8(r);
      let t = void 0;
      if (void 0 === i) t = n.PostOnActor(void 0, r, s, !1);
      else if (i instanceof UE.Transform) {
        var a = i.GetLocation(),
          u = i.GetRotation().Rotator();
        t = n.PostAtLocation(a, u, r, s, Info_1.Info.World);
      } else if (instanceOf(i, UE.Actor)) {
        var { StopWhenOwnerDestroyed: a = !1 } = o;
        t = n.PostOnActor(i, r, s, a);
      } else {
        if (!instanceOf(i, UE.AkComponent))
          return void (
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              57,
              "[Core.AudioSystem] PostEvent 执行失败",
              ["Event", e],
              ["Args", o],
              ["Reason", "目标对象无效"],
            )
          );
        var { StopWhenOwnerDestroyed: u = !1 } = o;
        t = n.PostOnComponent(i, r, s, u);
      }
      if (t !== INVALID_PLAYING_ID) return t;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          57,
          "[Core.AudioSystem] PostEvent 执行失败",
          ["Event", e],
          [
            "Target",
            void 0 === i
              ? "Global"
              : i instanceof UE.Transform
                ? i.ToString()
                : i.GetName(),
          ],
          ["Args", o],
          ["Reason", "SoundEngine 内部异常"],
        );
    }
  }
  static c8(i) {
    const o = (t, e) => {
      i?.(t, e),
        0 === t &&
          ((0, puerts_1.releaseManualReleaseDelegate)(o),
          (t = e.PlayingID),
          (e = this.u8.get(t))) &&
          (this.u8.delete(t), this._8.delete(e));
    };
    return (0, puerts_1.toManualReleaseDelegate)(o);
  }
  static ExecuteAction(...t) {
    if ("string" == typeof t[0]) {
      const [o, n, s = {}] = t;
      this.h8.Enqueue(() => {
        var { Actor: t, TransitionDuration: e, TransitionFadeCurve: i } = s;
        UE.KuroAudioStatics.ExecuteActionOnEventName(o, n, t, e, i);
      });
    } else {
      const [r, a, u = {}] = t;
      (0 === a && this.h8.Cancel(r)) ||
        this.h8.Enqueue(() => {
          var t,
            e,
            i = this._8.get(r);
          i &&
            (({ TransitionDuration: t, TransitionFadeCurve: e } = u),
            UE.KuroAudioStatics.ExecuteActionOnPlayingId(i, a, t, e));
        });
    }
  }
  static SeekOnEvent(t, e, i = {}) {
    var o;
    void 0 === i.Handle
      ? UE.KuroAudioStatics.SeekOnEventName(
          t,
          e,
          i.Actor,
          void 0,
          i.SnapToMarker,
        )
      : (o = this._8.get(i.Handle)) &&
        UE.KuroAudioStatics.SeekOnEventName(t, e, i.Actor, o, i.SnapToMarker);
  }
  static GetSourcePlayPosition(t) {
    var t = this._8.get(t);
    return !t || -1 === (t = UE.KuroAudioStatics.GetSourcePlayPosition(t))
      ? void 0
      : t;
  }
  static SetSwitch(t, e, i) {
    UE.KuroAudioStatics.SetSwitch(t, e, i);
  }
  static SetState(t, e) {
    UE.KuroAudioStatics.SetState(t, e);
  }
  static SetRtpcValue(t, e, i = {}) {
    var { Actor: i, TransitionDuration: o, TransitionFadeCurve: n } = i;
    UE.KuroAudioStatics.SetRtpcValue(t, e, i, o, n);
  }
  static StopAll(t) {
    UE.KuroAudioStatics.StopAll(t);
  }
  static GetAkComponent(t, e = {}) {
    var { SocketName: e, OnCreated: i } = e,
      e = "string" == typeof e ? new UE.FName(e) : e,
      o = (0, puerts_1.$ref)(!1);
    let n = void 0;
    return (
      instanceOf(t, UE.Actor)
        ? (n = UE.KuroAudioStatics.GetAkComponent(t.RootComponent, e, o))
        : instanceOf(t, UE.SceneComponent) &&
          (n = UE.KuroAudioStatics.GetAkComponent(t, e, o)),
      (0, puerts_1.$unref)(o) && ((t = n?.GetOwner()), i) && t && n && i(t, n),
      n
    );
  }
}
((exports.AudioSystem = AudioSystem).a8 =
  new AudioEventPool_1.AudioEventPool()),
  (AudioSystem.h8 = new ExecutionQueue_1.ExecutionQueue()),
  (AudioSystem._8 = new Map()),
  (AudioSystem.u8 = new Map());
//# sourceMappingURL=AudioSystem.js.map
