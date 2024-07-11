"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowServerNotifyCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  FlowController_1 = require("./FlowController");
class FlowServerNotifyCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  OnDestroy() {}
  HandleFlowStartNotify(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.tHn),
      r =
        LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
          e.nvs,
        );
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Plot",
        27,
        "服务器下发剧情",
        ["Type", r?.Type],
        ["FlowIncID", o],
        ["isAsync", e.dUs],
        ["isSkip", e.rHn],
      ),
      e.nvs?._vs === Protocol_1.Aki.Protocol.vOs.Proto_GmPlayFlow &&
        (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsGmPlayPlotOnce =
          !0);
    let l = void 0;
    e.z$s &&
      (e.Z$s
        ? (l = Vector_1.Vector.Create(e.Z$s.X, e.Z$s.Y, e.Z$s.Z))
        : FlowController_1.FlowController.LogError("未配置剧情坐标点", [
            "incId",
            o,
          ])),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
        e._5n,
        e.u5n,
        e.c5n,
        r,
        o,
        !0,
        e.dUs,
        e.rHn,
        l,
      );
  }
  HandleFlowEndNotify(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.tHn);
    ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
      "服务器剧情通知打断剧情",
      e,
      !0,
    );
  }
  HandleFlowSkipBlackScreenNotify(e) {
    e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Plot",
          46,
          "服务器跳过剧情，检查是否有黑幕",
          ["FlowListName", e._5n],
          ["FlowId", e.u5n],
          ["StateId", e.c5n],
          ["FadeOutScreen", e.CUs],
        ),
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0));
  }
}
exports.FlowServerNotifyCenter = FlowServerNotifyCenter;
//# sourceMappingURL=FlowServerNotifyCenter.js.map
