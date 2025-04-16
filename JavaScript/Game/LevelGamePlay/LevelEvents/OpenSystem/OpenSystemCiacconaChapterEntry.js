"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemCiacconaChapterEntry = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemCiacconaChapterEntry extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, r) {
    return "CiacconaGalChapterEntryView";
  }
  async ExecuteOpenView(e, r) {
    return (
      !!e.BoardId &&
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenChapterEntryViewAsync(
        e.BoardId,
        2,
      )
    );
  }
}
exports.OpenSystemCiacconaChapterEntry = OpenSystemCiacconaChapterEntry;
//# sourceMappingURL=OpenSystemCiacconaChapterEntry.js.map
