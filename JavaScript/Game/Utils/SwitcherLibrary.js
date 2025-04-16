"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  SwitcherManager_1 = require("../Manager/SwitcherManager");
class SwitcherLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetAllSwitcher() {
    var r = SwitcherManager_1.SwitcherManager.AllSwitcher;
    const t = UE.NewArray(UE.BuiltinString);
    return (
      r.forEach((r, e) => {
        t.Add(e);
      }),
      t
    );
  }
  static SetSwitcher(r, e) {
    var t = SwitcherManager_1.SwitcherManager.AllSwitcher;
    t.has(r) && t.get(r)[1](e);
  }
  static GetSwitcher(r) {
    var e = SwitcherManager_1.SwitcherManager.AllSwitcher;
    return !!e.has(r) && e.get(r)[0]();
  }
}
exports.default = SwitcherLibrary;
//# sourceMappingURL=SwitcherLibrary.js.map
