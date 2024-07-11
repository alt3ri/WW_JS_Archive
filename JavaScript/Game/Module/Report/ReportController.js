"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReportController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ReportDefine_1 = require("./ReportDefine");
class ReportController extends UiControllerBase_1.UiControllerBase {
  static ReportPlayerRequest(e, r, o, t = void 0) {
    var l = new Protocol_1.Aki.Protocol.oWn(),
      r =
        ((l.P8n = e.GetPlayerId()),
        (l.B8n = r),
        (l.w8n = o),
        (l.b8n = e.GetSourceType()),
        (l.q8n = t ?? { G8n: "" }),
        new Protocol_1.Aki.Protocol.S2s());
    (r.e4n = e.GetName()),
      (r.l5n = e.GetSignature()),
      (l.O8n = r),
      Net_1.Net.Call(
        23930,
        Protocol_1.Aki.Protocol.oWn.create(l),
        this.ReportPlayerResponse,
      );
  }
  static OpenReportView(e, r) {
    e = new ReportDefine_1.ReportPersonInfo(
      e.PlayerId,
      e.PlayerName,
      e.Signature,
      r,
    );
    UiManager_1.UiManager.OpenView("ReportView", e);
  }
}
(exports.ReportController = ReportController).ReportPlayerResponse = (e) => {
  e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
    ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.lkn,
        10274,
      )
    : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "ReportSuccess",
      ),
      UiManager_1.UiManager.IsViewShow("ReportView") &&
        UiManager_1.UiManager.CloseView("ReportView"));
};
//# sourceMappingURL=ReportController.js.map
