"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  EffectUtil_1 = require("../Utils/EffectUtil");
class TsAnimNotifyAudioEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.AudioEvent = void 0),
      (this.SocketName = void 0),
      (this.Follow = !0),
      (this.TagProbabilityInfo = void 0);
  }
  Constructor() {}
  GetNotifyName() {
    return this.AudioEvent
      ? "AudioEvent: " + (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent)
      : "AudioEvent";
  }
  K2_Notify(t, i) {
    if (!this.AudioEvent)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            56,
            "[Game.AnimNotify] 无效的 AudioEvent",
            ["AnimNotify", this.GetName()],
            ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
          ),
        !1
      );
    let e = this.AudioEvent.ToAssetPathName();
    var o,
      r = t.GetOuter(),
      r =
        (Info_1.Info.IsGameRunning()
          ? r instanceof TsBaseCharacter_1.default &&
            ((r = r.CharacterActorComponent?.GetReplaceEffect(e)), (e = r ?? e))
          : (e = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(e)),
        (0, AudioSystem_1.parseAudioEventPath)(e));
    if (r) {
      let e = !0;
      if (
        !(e =
          t.GetOwner()?.IsA(UE.TsBaseCharacter_C.StaticClass()) &&
          (o = t.GetOwner().CharacterActorComponent?.Entity)
            ? (ModelManager_1.ModelManager.GameAudioModel?.CheckAudioProbabilityInfo(
                o.Id,
                r,
                this.TagProbabilityInfo,
              ) ?? !1)
            : e)
      )
        return !0;
      this.PostAudioEvent(r, t, i);
    }
    return !0;
  }
  PostAudioEvent(e, t, i) {
    var o,
      r = t.GetOwner();
    if (r?.IsValid())
      return GlobalData_1.GlobalData.GameInstance
        ? void (this.Follow
            ? (o =
                ControllerHolder_1.ControllerHolder.GameAudioController.GetAkComponent(
                  r,
                  this.SocketName,
                ))?.IsValid() &&
              ((o = AudioSystem_1.AudioSystem.PostEvent(e, o)),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "Audio",
                56,
                "[Game.AnimNotify] PostEvent",
                ["EventName", e],
                ["Handle", o],
                ["AnimNotify", this.GetName()],
                ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
              )
            : ((o = t.D_GetSocketTransform(this.SocketName)),
              (t = AudioSystem_1.AudioSystem.PostEvent(e, o)),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  56,
                  "[Game.AnimNotify] PostEvent",
                  ["EventName", e],
                  ["Handle", t],
                  ["AnimNotify", this.GetName()],
                  ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
                )))
        : (o = AudioSystem_1.AudioSystem.GetAkComponent(r, {
              SocketName: this.SocketName,
            }))?.IsValid()
          ? void AudioSystem_1.AudioSystem.PostEvent(e, o)
          : void 0;
  }
}
exports.default = TsAnimNotifyAudioEvent;
//# sourceMappingURL=TsAnimNotifyAudioEvent.js.map
