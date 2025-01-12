"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreProgressController extends UiControllerBase_1.UiControllerBase {
  static async AllExploreProgressAsyncRequest() {
    var e = ModelManager_1.ModelManager.ExploreProgressModel,
      r =
        (e.InitializeExploreAreaData(),
        e.InitializeCurrentCountryIdAndAreaId(),
        new Protocol_1.Aki.Protocol.zes()),
      e =
        ((r.qVn = e.GetAllAreaIdList()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "ExploreProgress",
            8,
            "客户端请求区域探索度ExploreProgressRequest",
            ["request", r],
          ),
        await Net_1.Net.CallAsync(21059, r));
    this.$Vt(e);
  }
}
(exports.ExploreProgressController = ExploreProgressController).$Vt = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info(
      "ExploreProgress",
      8,
      "服务端返回区域探索度ExploreProgressResponse",
      ["response", e],
    );
  var r = ModelManager_1.ModelManager.ExploreProgressModel;
  for (const o of e.PPs) r.RefreshExploreAreaData(o);
  EventSystem_1.EventSystem.Emit(
    EventDefine_1.EEventName.OnExploreProgressResponse,
  );
};
//# sourceMappingURL=ExploreProgressController.js.map
