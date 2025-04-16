"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemDigitalScreen = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  DigitalScreenController_1 = require("../../DigitalScreen/DigitalScreenController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemDigitalScreen extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var t;
    return (
      !(!e || !e.BoardId) &&
      ((t = { FadeBeforeHide: e.FadeInScreenWhenClose ?? !1 }),
      await DigitalScreenController_1.DigitalScreenController.OpenDigitalScreenById(
        e.BoardId,
        t,
        9 === r?.Type,
      ))
    );
  }
  GetViewName(e) {
    e = ModelManager_1.ModelManager.DigitalScreenModel.GetDataConfig(e.BoardId);
    return 0 !== e?.Prefab && 1 === e?.Prefab
      ? "DigitalScreenB"
      : "DigitalScreenA";
  }
}
exports.OpenSystemDigitalScreen = OpenSystemDigitalScreen;
//# sourceMappingURL=OpenSystemDigitalScreen.js.map
