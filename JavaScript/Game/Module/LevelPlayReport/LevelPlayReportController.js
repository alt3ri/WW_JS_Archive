"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayReportController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class LevelPlayReportController extends UiControllerBase_1.UiControllerBase {
  static async RequestSimpleTrackReportAsync() {
    var e = Protocol_1.Aki.Protocol.Lp_.create(),
      e = await Net_1.Net.CallAsync(24428, e);
    e &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            29329,
          )
        : ModelManager_1.ModelManager.LevelPlayReportModel.UpdateSimpleReportMsg(
            e.Gb_,
          ));
  }
  static async CheckAndRequestLevelPlayVarAsync(e, o) {
    ModelManager_1.ModelManager.LevelPlayReportModel.HasRequestDetail(e, o) ||
      (await LevelPlayReportController.RequestLevelPlayVarAsync(e, o));
  }
  static async RequestLevelPlayVarAsync(e, o) {
    var t = Protocol_1.Aki.Protocol.Gp_.create(),
      t = ((t.r6n = e), (t._ps = o), await Net_1.Net.CallAsync(16413, t));
    t &&
      (ModelManager_1.ModelManager.LevelPlayReportModel.SetRequestDetailFlag(
        e,
        o,
      ),
      t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            28113,
          )
        : ModelManager_1.ModelManager.LevelPlayReportModel.UpdateDetailReportMsg(
            e,
            o,
            t.hEs,
          ));
  }
  static async RequestPlayPointStateAsync(e, o) {
    var t = Protocol_1.Aki.Protocol.y0_.create(),
      o =
        ((t.xNl = e),
        (t.r6n = o),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Map",
            69,
            "LevelPlayReportController.RequestPlayPointStateAsync",
          ),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 69, "y0_", ["", t]),
        await Net_1.Net.CallAsync(20356, t));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 69, "S0_", ["", o]),
      o &&
        (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.Q4n,
              23834,
            )
          : ModelManager_1.ModelManager.ExploreProgressModel.UpdatePlayPointState(
              e,
              o.qb_,
            ));
  }
  static async RequestSingleLevelPlayStateListAsync(e, o) {
    var t = new Protocol_1.Aki.Protocol.xR_();
    (t.r6n = e), (t.Uxs = [o]), await this.RequestLevelPlayStateListAsync([t]);
  }
  static async RequestLevelPlayStateListAsync(e) {
    var o = Protocol_1.Aki.Protocol.Av_.create(),
      o = ((o._Wl = e), await Net_1.Net.CallAsync(26012, o));
    o &&
      (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelPlayReport", 63, "请求玩法点状态返回失败:", [
            "ErrorCode:",
            o.Q4n,
          ])
        : ModelManager_1.ModelManager.LevelPlayReportModel.UpdateLevelPlayStateMsg(
            e,
            o.kb_,
          ));
  }
}
exports.LevelPlayReportController = LevelPlayReportController;
//# sourceMappingURL=LevelPlayReportController.js.map
