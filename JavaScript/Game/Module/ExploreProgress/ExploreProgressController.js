"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreProgressController extends UiControllerBase_1.UiControllerBase {
  static async AllExploreProgressAsyncRequest() {
    var e = ModelManager_1.ModelManager.ExploreProgressModel;
    const r =
      (e.InitializeExploreAreaData(),
      e.InitializeCurrentCountryIdAndAreaId(),
      new Protocol_1.Aki.Protocol.oJn());
    var e =
      ((r.i5n = e.GetAllAreaIdList()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreProgress",
          8,
          "客户端请求区域探索度ExploreProgressRequest",
          ["request", r],
        ),
      await Net_1.Net.CallAsync(12864, r));
    this.$5t(e);
  }
}
(exports.ExploreProgressController = ExploreProgressController).$5t = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info(
      "ExploreProgress",
      8,
      "服务端返回区域探索度ExploreProgressResponse",
      ["response", e],
    );
  const r = ModelManager_1.ModelManager.ExploreProgressModel;
  for (const o of e.uLs) r.RefreshExploreAreaData(o);
  EventSystem_1.EventSystem.Emit(
    EventDefine_1.EEventName.OnExploreProgressResponse,
  );
};
// # sourceMappingURL=ExploreProgressController.js.map
