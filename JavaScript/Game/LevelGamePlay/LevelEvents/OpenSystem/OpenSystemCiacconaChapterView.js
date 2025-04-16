"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemCiacconaChapterView = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemCiacconaChapterView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, r) {
    return "CiacconaGalChapterView";
  }
  async ExecuteOpenView(e, r) {
    return (
      !!e.BoardId &&
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenChapterViewAsync(
        e.BoardId,
      )
    );
  }
}
exports.OpenSystemCiacconaChapterView = OpenSystemCiacconaChapterView;
//# sourceMappingURL=OpenSystemCiacconaChapterView.js.map
