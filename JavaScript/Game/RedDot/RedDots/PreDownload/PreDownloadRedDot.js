"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotPreDownloadComplete = exports.RedDotPreDownload = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPreDownload extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PreDownloadStateUpdate];
  }
  OnCheck() {
    return (
      ModelManager_1.ModelManager.PreDownloadModel.HasClickBtnCheck() &&
      !ModelManager_1.ModelManager.PreDownloadModel.IsComplete()
    );
  }
}
exports.RedDotPreDownload = RedDotPreDownload;
class RedDotPreDownloadComplete extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PreDownloadStateUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
  }
}
exports.RedDotPreDownloadComplete = RedDotPreDownloadComplete;
//# sourceMappingURL=PreDownloadRedDot.js.map
