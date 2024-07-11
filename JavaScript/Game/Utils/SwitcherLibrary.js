"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const SwitcherManager_1 = require("../Manager/SwitcherManager");
class SwitcherLibrary extends UE.BlueprintFunctionLibrary {
  static GetAllSwitcher() {
    const e = SwitcherManager_1.SwitcherManager.AllSwitcher;
    const t = UE.NewArray(UE.BuiltinString);
    return (
      e.forEach((e, r) => {
        t.Add(r);
      }),
      t
    );
  }
  static SetSwitcher(e, r) {
    const t = SwitcherManager_1.SwitcherManager.AllSwitcher;
    t.has(e) && t.get(e)[1](r);
  }
  static GetSwitcher(e) {
    const r = SwitcherManager_1.SwitcherManager.AllSwitcher;
    return !!r.has(e) && r.get(e)[0]();
  }
}
exports.default = SwitcherLibrary;
// # sourceMappingURL=SwitcherLibrary.js.map
