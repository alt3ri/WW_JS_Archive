"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  DEFAULT_FADE_DURATION = 500;
class FoleyEventHandle {
  constructor(t, e) {
    (this.Id = 0), (this.EventName = ""), (this.Id = t), (this.EventName = e);
  }
}
class TsAnimNotifyStateFoleyAudioEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Variant = 0),
      (this.FadeDuration = DEFAULT_FADE_DURATION),
      (this.FadeCurve = 4),
      (this.InitVariables = !1),
      (this.HandleMap = void 0);
  }
  Constructor() {
    (this.InitVariables = !1), (this.HandleMap = void 0);
  }
  K2_NotifyBegin(t, e, s) {
    this.InitVariables ||
      ((this.InitVariables = !0), (this.HandleMap = new Map()));
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var i = t.CharacterActorComponent,
      t = t.GetEntityNoBlueprint()?.GetComponent(187);
    if (!i || !t) return !1;
    t.ChangeFoleyVariant(this.Variant);
    var r = t?.GetAkComponent(),
      t = t.Config?.FoleyEvent;
    return (
      r &&
        t &&
        ((r = AudioSystem_1.AudioSystem.PostEvent(t, r)),
        this.HandleMap.set(i.Entity.Id, new FoleyEventHandle(r, t))),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    var s,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.CharacterActorComponent) &&
      ((s = this.HandleMap?.get(t.Entity.Id)) &&
        (AudioSystem_1.AudioSystem.ExecuteAction(s.Id, 0, {
          TransitionDuration: this.FadeDuration,
          TransitionFadeCurve: this.FadeCurve,
        }),
        this.HandleMap.delete(t.Entity.Id)),
      !0)
    );
  }
}
exports.default = TsAnimNotifyStateFoleyAudioEvent;
//# sourceMappingURL=TsAnimNotifyStateFoleyAudioEvent.js.map
