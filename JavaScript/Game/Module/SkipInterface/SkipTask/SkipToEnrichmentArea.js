"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToEnrichmentArea = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MapController_1 = require("../../Map/Controller/MapController"),
  SkipTask_1 = require("./SkipTask");
class SkipToEnrichmentArea extends SkipTask_1.SkipTask {
  OnRun(e, o, r, t) {
    void 0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("SkipInterface", 64, "跳转富集区失败,道具Id为空->", [
          "itemId:",
          t,
        ])
      : MapController_1.MapController.RequestTrackEnrichmentArea(t);
  }
}
exports.SkipToEnrichmentArea = SkipToEnrichmentArea;
//# sourceMappingURL=SkipToEnrichmentArea.js.map
