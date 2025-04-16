"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemCook = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemCook extends OpenSystemBase_1.OpenSystemBase {
  constructor() {
    super(...arguments),
      (this.F0l = new Map([
        [0, "CookRootView"],
        [1, "CookMechanismRootView"],
      ]));
  }
  async ExecuteOpenView(e, o) {
    e = this.F0l.get(e.BoardId);
    return (
      void 0 !== e && void 0 !== (await UiManager_1.UiManager.OpenViewAsync(e))
    );
  }
  GetViewName(e) {
    return this.F0l.get(e.BoardId) ?? "CookRootView";
  }
}
exports.OpenSystemCook = OpenSystemCook;
//# sourceMappingURL=OpenSystemCook.js.map
