"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcMontageController = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
class NpcMontageController {
  constructor(e) {
    (this.Jh = void 0),
      (this.oRe = void 0),
      (this.Jh = e),
      (this.oRe = this.Jh.GetComponent(35));
  }
  LoadAsync(e, t) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, t);
  }
  Play(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e),
      t && this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
  }
  PlayOnce(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e),
      this.oRe.MainAnimInstance.Montage_SetNextSection(
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        e,
      ),
      t && this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
  }
  PlayFromLoop(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e),
      this.oRe.MainAnimInstance.Montage_JumpToSection(
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        e,
      ),
      t && this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
  }
  PlayFromEnd(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e),
      this.oRe.MainAnimInstance.Montage_JumpToSection(
        CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        e,
      ),
      t && this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
  }
  Stop(e = !1, t) {
    e
      ? this.oRe.MainAnimInstance.Montage_JumpToSection(
          CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          t,
        )
      : this.oRe.MainAnimInstance.Montage_SetNextSection(
          CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
          CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          t,
        );
  }
  ForceStop(e, t) {
    this.oRe.MainAnimInstance.Montage_Stop(e ?? 0, t);
  }
  ForceStopWithBlendOut(e, t) {
    let s, r;
    t
      ? ((s = this.oRe.MainAnimInstance.Montage_GetPosition(t)),
        (r = 1e3 * e) < (s = t.SequenceLength - s) &&
          this.oRe.MainAnimInstance.Montage_SetPlayRate(t, s / r),
        this.oRe.MainAnimInstance.Montage_SetNextSection(
          CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
          CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          t,
        ))
      : this.oRe.MainAnimInstance.Montage_Stop(e ?? 0);
  }
  AddOnMontageEnded(e) {
    e && this.oRe.MainAnimInstance?.OnMontageEnded.Add(e);
  }
  RemoveOnMontageEnded(e) {
    e && this.oRe.MainAnimInstance?.OnMontageEnded.Remove(e);
  }
}
exports.NpcMontageController = NpcMontageController;
// # sourceMappingURL=NpcMontageController.js.map
