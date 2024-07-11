"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemDigitalScreen = void 0);
const DigitalScreenController_1 = require("../../../LevelGamePlay/DigitalScreen/DigitalScreenController"),
  OpenSystemBase_1 = require("./OpenSystemBase"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class OpenSystemDigitalScreen extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (
      !(!e || !e.BoardId) &&
      (await DigitalScreenController_1.DigitalScreenController.OpenDigitalScreenById(
        e.BoardId,
      ))
    );
  }
  GetViewName(e) {
    e = ModelManager_1.ModelManager.DigitalScreenModel.GetDataConfig(e.BoardId);
    return 0 != e?.Prefab && 1 == e?.Prefab
      ? "DigitalScreenB"
      : "DigitalScreenA";
  }
}
exports.OpenSystemDigitalScreen = OpenSystemDigitalScreen;
//# sourceMappingURL=OpenSystemDigitalScreen.js.map
