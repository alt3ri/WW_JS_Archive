"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemFragmentMemory = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFragmentMemory extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) return !1;
    const s = new CustomPromise_1.CustomPromise();
    return (
      UiManager_1.UiManager.OpenView("MemoryDetailView", e.BoardId, () => {
        s.SetResult(!0);
      }),
      s.Promise
    );
  }
  GetViewName(e) {
    return "MemoryDetailView";
  }
}
exports.OpenSystemFragmentMemory = OpenSystemFragmentMemory;
//# sourceMappingURL=OpenSystemFragmentMemory.js.map
