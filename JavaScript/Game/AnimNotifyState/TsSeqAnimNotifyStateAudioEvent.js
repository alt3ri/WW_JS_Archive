"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  Log_1 = require("../../Core/Common/Log"),
  ModelManager_1 = require("../Manager/ModelManager"),
  SequenceUtils_1 = require("../Module/Plot/Sequence/SequenceUtils"),
  DEFAULT_FADE_DURATION = 500;
class TsSeqAnimNotifyStateAudioEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.AudioEvent = void 0),
      (this.SocketName = void 0),
      (this.Follow = !0),
      (this.KeepAlive = !1),
      (this.FadeDuration = DEFAULT_FADE_DURATION),
      (this.FadeCurve = 4),
      (this.TrailingAudioEvent = void 0),
      (this.NotifyDuration = 0),
      (this.HandleMap = new UE.TMap());
  }
  Constructor() {
    this.NotifyDuration = 0;
  }
  GetNotifyName() {
    return this.AudioEvent
      ? "AudioEvent: " + (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent)
      : "AudioEvent";
  }
  K2_NotifyBegin(e, i, t) {
    if (!e)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 45, "不存在的MeshComp", [
            "AnimNotify",
            this.GetName(),
          ]),
        !1
      );
    let o = !1;
    var s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e.GetOwner());
    return (
      1 !== s && 3 !== s
        ? (s = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor()) &&
          ((o = s.GetAnimAudio()), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            45,
            "存在Seq",
            ["seq", s.GetName()],
            ["AnimAudio", o],
          )
        : (o =
            ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ??
            !1),
      !!o &&
        ((this.NotifyDuration = t),
        this.AudioEvent
          ? ((s =
              this.AudioEvent &&
              (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent)) &&
              this.PostAudioEvent(s, e, i),
            !0)
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Audio",
                45,
                "[Game.AnimNotifyState] 无效的 AudioEvent",
                ["AnimNotify", this.GetName()],
                ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
              ),
            !1))
    );
  }
  K2_NotifyEnd(e, i) {
    if (!e)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 45, "不存在的MeshComp", [
            "AnimNotify",
            this.GetName(),
          ]),
        !1
      );
    let t = !1;
    var o,
      s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e.GetOwner());
    return (
      1 !== s && 3 !== s
        ? (s = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor()) &&
          ((t = s.GetAnimAudio()), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            45,
            "存在Seq",
            ["seq", s.GetName()],
            ["AnimAudio", t],
          )
        : (t =
            ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ??
            !1),
      !!t &&
        !(
          (this.KeepAlive &&
            this.GetCurrentTriggerOffsetInThisNotifyTick() >
              this.NotifyDuration) ||
          ((o = (s = e.GetOwner()) && this.HandleMap.Get(s)) &&
            (AudioSystem_1.AudioSystem.ExecuteAction(o, 0, {
              TransitionDuration: this.FadeDuration,
              TransitionFadeCurve: this.FadeCurve,
            }),
            this.HandleMap.Remove(s),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                45,
                "[Game.AnimNotifyState] StopEvent",
                ["Handle", o],
                ["AnimNotify", this.GetName()],
                ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
                ["Owner", e.GetOwner()?.GetName()],
              ),
            (s =
              this.TrailingAudioEvent &&
              (0, AudioSystem_1.parseAudioEventPath)(
                this.TrailingAudioEvent,
              ))) &&
            this.PostAudioEvent(s, e, i),
          0)
        )
    );
  }
  PostAudioEvent(e, i, t) {
    var o,
      s = i.GetOwner();
    s?.IsValid() &&
      (this.Follow
        ? AudioSystem_1.AudioSystem.GetAkComponent(i, {
            SocketName: this.SocketName,
          })?.IsValid()
          ? ((o = AudioSystem_1.AudioSystem.PostEvent(e, i.GetOwner())),
            this.HandleMap.Set(s, o),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                45,
                "[Game.AnimNotifyState] PostEvent",
                ["EventName", e],
                ["Handle", o],
                ["AnimNotify", this.GetName()],
                ["AnimSequence", UE.KismetSystemLibrary.GetPathName(t)],
                ["Owner", i.GetOwner()?.GetName()],
              ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              45,
              "[Game.AnimNotify] 无效的 akComponent",
              ["EventName", e],
              ["AnimNotify", this.GetName()],
              ["AnimSequence", UE.KismetSystemLibrary.GetPathName(t)],
            )
        : ((o = i.D_GetSocketTransform(this.SocketName)),
          (o = AudioSystem_1.AudioSystem.PostEvent(e, o)),
          this.HandleMap.Set(s, o),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Audio",
              45,
              "[Game.AnimNotifyState] PostEvent",
              ["EventName", e],
              ["Handle", o],
              ["AnimNotify", this.GetName()],
              ["AnimSequence", UE.KismetSystemLibrary.GetPathName(t)],
              ["Owner", i.GetOwner()?.GetName()],
            )));
  }
}
exports.default = TsSeqAnimNotifyStateAudioEvent;
//# sourceMappingURL=TsSeqAnimNotifyStateAudioEvent.js.map
