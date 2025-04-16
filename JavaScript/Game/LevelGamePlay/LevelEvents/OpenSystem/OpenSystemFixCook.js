"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemFixCook = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFixCook extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return e.BoardId
      ? (ControllerHolder_1.ControllerHolder.CookController.SetCurrentFixId(
          e.BoardId,
        ),
        1 === t.Type &&
          ((t = EntitySystem_1.EntitySystem.Get(t.EntityId)),
          (t = MathUtils_1.MathUtils.NumberToLong(
            t?.GetComponent(0).GetCreatureDataId(),
          )),
          ControllerHolder_1.ControllerHolder.CookController.SetCurrentEntityId(
            t,
          )),
        ControllerHolder_1.ControllerHolder.CookController.ShowFixCookView())
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Level", 64, "打开厨具修复参数有误", [
            "BoardId",
            e.BoardId,
          ]),
        !1);
  }
  GetViewName(e) {
    return "CookPopFixView";
  }
}
exports.OpenSystemFixCook = OpenSystemFixCook;
//# sourceMappingURL=OpenSystemFixCook.js.map
