"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiWeaponAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiWeaponAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
  constructor(t, s, e, n = void 0) {
    super(),
      (this.Index = t),
      (this.ShowMaterialController = s),
      (this.HideEffect = e),
      (this.Transform = n);
  }
  IsEqual(t) {
    return t instanceof UiWeaponAnsContext && this.Index === t.Index;
  }
}
exports.UiWeaponAnsContext = UiWeaponAnsContext;
// # sourceMappingURL=UiWeaponAnsContext.js.map
