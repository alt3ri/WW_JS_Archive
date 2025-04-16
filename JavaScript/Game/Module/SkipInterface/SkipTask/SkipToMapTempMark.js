"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToMapTempMark = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  SkipTask_1 = require("./SkipTask");
class SkipToMapTempMark extends SkipTask_1.SkipTask {
  OnRun(e) {
    var e = Number(e),
      r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    void 0 === r
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("SkipInterface", 63, "跳转失败，静态标记配置不存在", [
          "mapMarkId",
          e,
        ])
      : (ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e),
        (e = { MarkId: e, MarkType: r.ObjectType }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, e)),
      this.Finish();
  }
}
exports.SkipToMapTempMark = SkipToMapTempMark;
//# sourceMappingURL=SkipToMapTempMark.js.map
