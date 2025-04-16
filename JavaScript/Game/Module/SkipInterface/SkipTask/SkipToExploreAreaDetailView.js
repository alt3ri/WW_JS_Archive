"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToExploreAreaDetailView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  SkipTask_1 = require("./SkipTask");
class SkipToExploreAreaDetailView extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var e = Number(e),
      o = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
    o <= 0
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SkipInterface",
          69,
          "SkipToExploreAreaDetailView 区域Id错误",
          ["配置区域id", e],
          ["一级区域id", o],
        )
      : ((e = r ? Number(r) : void 0),
        WorldMapController_1.WorldMapController.SkipToExploreAreaDetailView(
          o,
          e,
        )),
      this.Finish();
  }
}
exports.SkipToExploreAreaDetailView = SkipToExploreAreaDetailView;
//# sourceMappingURL=SkipToExploreAreaDetailView.js.map
