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
  EffectUtil_1 = require("../Utils/EffectUtil"),
  DEFAULT_FADE_DURATION = 500;
class TsAnimNotifyStateAudioEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.AudioEvent = void 0),
      (this.SocketName = void 0),
      (this.Follow = !0),
      (this.KeepAlive = !1),
      (this.FadeDuration = DEFAULT_FADE_DURATION),
      (this.FadeCurve = 4),
      (this.TrailingAudioEvent = void 0),
      (this.TagProbabilityInfo = void 0),
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
  K2_NotifyBegin(e, i, o) {
    if (((this.NotifyDuration = o), !this.AudioEvent))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            56,
            "[Game.AnimNotifyState] 无效的 AudioEvent",
            ["AnimNotify", this.GetName()],
            ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
          ),
        !1
      );
    let t = this.AudioEvent.ToAssetPathName();
    var s,
      o = e.GetOuter(),
      o =
        (Info_1.Info.IsGameRunning()
          ? o instanceof TsBaseCharacter_1.default &&
            ((o = o.CharacterActorComponent?.GetReplaceEffect(t)), (t = o ?? t))
          : (t = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(t)),
        this.AudioEvent && (0, AudioSystem_1.parseAudioEventPath)(t));
    if (o) {
      let t = !0;
      if (
        !(t =
          e.GetOwner()?.IsA(UE.TsBaseCharacter_C.StaticClass()) &&
          (s = e.GetOwner().CharacterActorComponent?.Entity)
            ? (ModelManager_1.ModelManager.GameAudioModel?.CheckAudioProbabilityInfo(
                s.Id,
                o,
                this.TagProbabilityInfo,
              ) ?? !1)
            : t)
      )
        return !0;
      this.PostAudioEvent(o, e, i);
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    var i, o;
    return !(
      (this.KeepAlive &&
        this.GetCurrentTriggerOffsetInThisNotifyTick() > this.NotifyDuration) ||
      ((i = (o = t.GetOwner()) && this.HandleMap.Get(o)) &&
        (AudioSystem_1.AudioSystem.ExecuteAction(i, 0, {
          TransitionDuration: this.FadeDuration,
          TransitionFadeCurve: this.FadeCurve,
        }),
        this.HandleMap.Remove(o),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            56,
            "[Game.AnimNotifyState] StopEvent",
            ["Handle", i],
            ["AnimNotify", this.GetName()],
            ["AnimSequence", UE.KismetSystemLibrary.GetPathName(e)],
            ["Owner", t.GetOwner()?.GetName()],
          ),
        (o =
          this.TrailingAudioEvent &&
          (0, AudioSystem_1.parseAudioEventPath)(this.TrailingAudioEvent))) &&
        this.PostAudioEvent(o, t, e),
      0)
    );
  }
  PostAudioEvent(t, e, i) {
    var o,
      s = e.GetOwner();
    if (s?.IsValid())
      return GlobalData_1.GlobalData.GameInstance
        ? void (this.Follow
            ? (o =
                ControllerHolder_1.ControllerHolder.GameAudioController.GetAkComponent(
                  s,
                  this.SocketName,
                ))?.IsValid() &&
              ((o = AudioSystem_1.AudioSystem.PostEvent(t, o)),
              this.HandleMap.Set(s, o),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "Audio",
                56,
                "[Game.AnimNotifyState] PostEvent",
                ["EventName", t],
                ["Handle", o],
                ["AnimNotify", this.GetName()],
                ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
                ["Owner", e.GetOwner()?.GetName()],
              )
            : ((o = e.D_GetSocketTransform(this.SocketName)),
              (o = AudioSystem_1.AudioSystem.PostEvent(t, o)),
              this.HandleMap.Set(s, o),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  56,
                  "[Game.AnimNotifyState] PostEvent",
                  ["EventName", t],
                  ["Handle", o],
                  ["AnimNotify", this.GetName()],
                  ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)],
                  ["Owner", e.GetOwner()?.GetName()],
                )))
        : (o = AudioSystem_1.AudioSystem.GetAkComponent(s, {
              SocketName: this.SocketName,
            }))?.IsValid()
          ? ((i = AudioSystem_1.AudioSystem.PostEvent(t, o)),
            void this.HandleMap.Set(s, i))
          : void 0;
  }
}
exports.default = TsAnimNotifyStateAudioEvent;
//# sourceMappingURL=TsAnimNotifyStateAudioEvent.js.map
