"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemDreamLinkLevel = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemDreamLinkLevel extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    e = this.GetViewName(e);
    return await UiManager_1.UiManager.OpenViewAsync(e), !0;
  }
  GetViewName(e) {
    switch (e.BoardId) {
      case 0:
        return "DreamLinkMainView";
      case 1:
        return "DreamLinkDungeonView";
      case 2:
        return "DreamLinkWhiteCatView";
      case 3:
        return "DreamLinkWorldRunView";
    }
    return "DreamLinkMainView";
  }
}
exports.OpenSystemDreamLinkLevel = OpenSystemDreamLinkLevel;
//# sourceMappingURL=OpenSystemDreamLinkLevel.js.map
