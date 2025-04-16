"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemActivitySubView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ActivityViewNameById_1 = require("../../../../Core/Define/ConfigQuery/ActivityViewNameById"),
  ActivityManager_1 = require("../../../Module/Activity/ActivityManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemActivitySubView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    var t, r;
    return (
      !e ||
      ((t = ActivityViewNameById_1.configActivityViewNameById.GetConfig(
        e.BoardId,
      ))
        ? ((r = t.Type),
          !!(r = ActivityManager_1.ActivityManager.GetActivityController(r)) &&
            (await r.OpenViewByViewName(t.ViewName)))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 75, "OpenSystemActivitySubView Error", [
              "id",
              e.BoardId,
            ]),
          !1))
    );
  }
  GetViewName(e, i) {
    e = ActivityViewNameById_1.configActivityViewNameById.GetConfig(e.BoardId);
    if (e) return e.ViewName;
  }
}
exports.OpenSystemActivitySubView = OpenSystemActivitySubView;
//# sourceMappingURL=OpenSystemActivitySubView.js.map
