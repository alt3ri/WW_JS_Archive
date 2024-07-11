"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskWorldMap = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SkipTaskWorldMap extends SkipTask_1.SkipTask {
  OnRun(r, e) {
    let a;
    var r = Number(r);
    var e = Number(e);
    UiManager_1.UiManager.IsViewShow("WorldMapView") &&
    (a = ModelManager_1.ModelManager.WorldMapModel).CurrentFocalMarkType ===
      r &&
    a.CurrentFocalMarkId === e
      ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "IsInView",
        )
      : WorldMapController_1.WorldMapController.FocalMarkItem(r, e),
      this.Finish();
  }
}
exports.SkipTaskWorldMap = SkipTaskWorldMap;
// # sourceMappingURL=SkipTaskWorldMap.js.map
