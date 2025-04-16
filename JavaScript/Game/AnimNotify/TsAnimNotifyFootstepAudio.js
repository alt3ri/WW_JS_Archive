"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyFootstepAudio extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.Variant = 0);
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    var r = e.GetEntityNoBlueprint()?.GetComponent(187),
      e = e.GetEntityNoBlueprint()?.GetComponent(56);
    if (!r || !e) return !1;
    r.ChangeFootstepVariant(this.Variant);
    (e = e.GetFootstepTexture()),
      r.ChangeFootstepTexture(e),
      (e = r.GetAkComponent()),
      (r = r.Config?.FootstepEvent);
    return e && r && AudioSystem_1.AudioSystem.PostEvent(r, e), !0;
  }
  GetNotifyName() {
    return "脚步音效";
  }
}
exports.default = TsAnimNotifyFootstepAudio;
//# sourceMappingURL=TsAnimNotifyFootstepAudio.js.map
