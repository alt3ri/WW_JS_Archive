"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDirectTrain = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ActivityDirectTrainHelper_1 = require("../../../../Module/Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotDirectTrain extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate];
  }
  OnCheck(e) {
    var t =
      ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetActivityData();
    return void 0 !== t && t.IsShowRedDot();
  }
}
exports.RedDotDirectTrain = RedDotDirectTrain;
//# sourceMappingURL=RedDotDirectTrain.js.map
