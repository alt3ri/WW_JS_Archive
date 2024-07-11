"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelAudioSpec = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EffectAudioContext_1 = require("../EffectContext/EffectAudioContext");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelAudioSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.ege = void 0),
      (this.zge = void 0),
      (this.Zge = void 0);
  }
  OnInit() {
    return (
      (this.ege = this.Handle?.GetSureEffectActor()),
      this.ege &&
        ((this.zge = AudioSystem_1.AudioSystem.GetAkComponent(this.ege, {
          OnCreated: (t) => {
            const e = this.Handle?.GetContext();
            e instanceof EffectAudioContext_1.EffectAudioContext &&
              AudioSystem_1.AudioSystem.SetSwitch(
                "char_p1orp3",
                e.FromPrimaryRole ? "p1" : "p3",
                t,
              );
          },
        })),
        this.EffectModel?.LocationOffsets) &&
        this.EffectModel.LocationOffsets.Num() > 0 &&
        this.zge?.SetLocationOffsets(this.EffectModel.LocationOffsets),
      !0
    );
  }
  OnPlay() {
    const t = this.EffectModel?.AudioEvent;
    t?.IsValid()
      ? this.e0e(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          57,
          "[Game.Effect] 无效的 AudioEvent",
          ["EffectModel", this.EffectModel?.GetName()],
          ["EffectActor", this.ege?.GetName()],
        );
  }
  OnClear() {
    return this.zge?.K2_DestroyComponent(this.ege), !0;
  }
  OnStop() {
    let t;
    this.EffectModel?.IsValid() &&
      (this.Zge &&
        !this.EffectModel.KeepAlive &&
        (AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0, {
          TransitionDuration: this.EffectModel.FadeOutTime,
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Audio",
            57,
            "[Game.Effect] StopEvent",
            ["Handle", this.Zge],
            ["EffectModel", this.EffectModel?.GetName()],
            ["EffectActor", this.ege?.GetName()],
          ),
        (this.Zge = void 0)),
      (t = this.EffectModel?.TrailingAudioEvent)?.IsValid()) &&
      this.e0e(t);
  }
  e0e(t) {
    t = t.GetName();
    this.zge &&
      ((this.Zge = AudioSystem_1.AudioSystem.PostEvent(t, this.zge, {
        StopWhenOwnerDestroyed: !Info_1.Info.IsGameRunning(),
      })),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Audio",
        57,
        "[Game.Effect] PostEvent",
        ["EventName", t],
        ["Handle", this.Zge],
        ["EffectModel", this.EffectModel?.GetName()],
        ["EffectActor", this.ege?.GetName()],
      );
  }
}
exports.EffectModelAudioSpec = EffectModelAudioSpec;
// # sourceMappingURL=EffectModelAudioSpec.js.map
