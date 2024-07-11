"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowServerNotifyCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const FlowController_1 = require("./FlowController");
const FlowNetworks_1 = require("./FlowNetworks");
class FlowServerNotifyCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  OnDestroy() {}
  HandleFlowStartNotify(l) {
    if (
      ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() &&
      ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Plot",
          40,
          "GM模式下预处理Flow相关Notify: 快速推进模式下收到FlowStartNotify直接强跳剧情",
          ["FlowId", l.qkn],
          ["FlowIncId", l.E8n],
          ["FlowListName", l.bkn],
          ["ContextType", l.Hms?.Xms],
        ),
        FlowNetworks_1.FlowNetworks.RequestGmFinish();
    else {
      const r = MathUtils_1.MathUtils.LongToNumber(l.E8n);
      let e =
        LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
          l.Hms,
        );
      let o =
        ((e = e || LevelGeneralContextDefine_1.QuestContext.Create()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "服务器下发剧情",
            ["Type", e.Type],
            ["FlowIncID", r],
            ["isAsync", l.QLs],
            ["isSkip", l.I8n],
          ),
        l.Hms?.Xms === Protocol_1.Aki.Protocol.Pbs.Proto_GmPlayFlow &&
          (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsGmPlayPlotOnce =
            !0),
        void 0);
      l.E6s &&
        (l.y6s
          ? (o = Vector_1.Vector.Create(l.y6s.X, l.y6s.Y, l.y6s.Z))
          : FlowController_1.FlowController.LogError("未配置剧情坐标点", [
              "incId",
              r,
            ])),
        ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
          l.bkn,
          l.qkn,
          l.Gkn,
          e,
          r,
          !0,
          l.QLs,
          l.I8n,
          o,
        );
    }
  }
  HandleFlowEndNotify(e) {
    const o = MathUtils_1.MathUtils.LongToNumber(e.E8n);
    e.$0s
      ? ModelManager_1.ModelManager.PlotModel.SetPendingPlotState(
          o,
          !1,
          !0,
          !0,
        ) ||
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "服务器通知跳过剧情",
          !0,
          !0,
        )
      : ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
          "服务器剧情通知打断剧情",
          o,
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
          ["FlowListName", e.bkn],
          ["FlowId", e.qkn],
          ["StateId", e.Gkn],
          ["FadeOutScreen", e.YLs],
        ),
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0));
  }
}
exports.FlowServerNotifyCenter = FlowServerNotifyCenter;
// # sourceMappingURL=FlowServerNotifyCenter.js.map
