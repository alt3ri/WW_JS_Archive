"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToExploreAreaPlayPoint = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  SkipTask_1 = require("./SkipTask");
class SkipToExploreAreaPlayPoint extends SkipTask_1.SkipTask {
  OnRun(o, r) {
    var o = Number(o),
      e = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(o);
    e <= 0
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SkipInterface",
          69,
          "SkipToExploreAreaPlayPoint 区域Id错误",
          ["配置区域id", o],
          ["一级区域id", e],
        )
      : (o = Number(r))
        ? ((r = { MarkId: void 0, MarkType: 0, FocusExplorePlayPoint: [e, o] }),
          WorldMapController_1.WorldMapController.OpenView(2, !1, r))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SkipInterface",
            69,
            "SkipToExploreAreaPlayPoint 探索类型错误",
            ["探索类型", o],
          ),
      this.Finish();
  }
}
exports.SkipToExploreAreaPlayPoint = SkipToExploreAreaPlayPoint;
//# sourceMappingURL=SkipToExploreAreaPlayPoint.js.map
