"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsCharacterEntityBase = void 0);
const ue_1 = require("ue");
class TsCharacterEntityBase extends ue_1.KuroEffectActor {
  constructor() {
    super(...arguments),
      (this.bEditorTickBySelected = !1),
      (this.bSetActorComponentTickEnabledByFocus = !1),
      (this.Id = 0);
  }
  EditorFocusIn() {}
  EditorFocusOut() {}
  EditorInit() {}
  EditorSetActorComponentsTickEnabled(t) {}
  EditorTick(t) {}
}
(exports.TsCharacterEntityBase = TsCharacterEntityBase),
  (exports.default = TsCharacterEntityBase);
// # sourceMappingURL=TsCharacterEntityBase.js.map
