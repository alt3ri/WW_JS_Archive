"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  Log_1 = require("../../Core/Common/Log"),
  ModelManager_1 = require("../Manager/ModelManager"),
  SequenceUtils_1 = require("../Module/Plot/Sequence/SequenceUtils");
class TsSeqAnimNotifyAudioEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.AudioEvent = void 0),
      (this.SocketName = void 0),
      (this.Follow = !0);
  }
  Constructor() {}
  GetNotifyName() {
    return this.AudioEvent
      ? "AudioEvent: " + (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent)
      : "AudioEvent";
  }
  K2_Notify(e, i) {
    if (!e)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Audio", 45, "不存在的MeshComp", [
            "AnimNotify",
            this.GetName(),
          ]),
        !1
      );
    let t = !1;
    var o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e.GetOwner());
    if (
      (1 !== o && 3 !== o
        ? (o = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor()) &&
          ((t = o.GetAnimAudio()), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            45,
            "存在Seq",
            ["seq", o.GetName()],
            ["AnimAudio", t],
          )
        : (t =
            ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ??
            !1),
      !t)
    )
      return !1;
    if (!this.AudioEvent)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            45,
            "[Game.AnimNotify] 无效的 AudioEvent",
            ["AnimNotify", this.GetName()],
            ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
          ),
        !1
      );
    o = (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent);
    if (!o)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            45,
            "[Game.AnimNotify] eventName为空",
            ["EventName", o],
            ["AnimNotify", this.GetName()],
            ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
          ),
        !1
      );
    if (this.Follow) {
      var n = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: this.SocketName,
      });
      if (!n?.IsValid())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              45,
              "[Game.AnimNotify] 无效的 akComponent",
              ["EventName", o],
              ["AnimNotify", this.GetName()],
              ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
            ),
          !1
        );
      n = AudioSystem_1.AudioSystem.PostEvent(o, n);
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          45,
          "[Game.AnimNotify] PostEvent",
          ["EventName", o],
          ["Handle", n],
          ["AnimNotify", this.GetName()],
          ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
        );
    } else {
      (n = e.D_GetSocketTransform(this.SocketName)),
        (e = AudioSystem_1.AudioSystem.PostEvent(o, n));
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          45,
          "[Game.AnimNotify] PostEvent",
          ["EventName", o],
          ["Handle", e],
          ["AnimNotify", this.GetName()],
          ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
        );
    }
    return !0;
  }
}
exports.default = TsSeqAnimNotifyAudioEvent;
//# sourceMappingURL=TsSeqAnimNotifyAudioEvent.js.map
