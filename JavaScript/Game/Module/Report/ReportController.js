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
    var l = new Protocol_1.Aki.Protocol.nYn(),
      r =
        ((l.MHn = e.GetPlayerId()),
        (l.SHn = r),
        (l.EHn = o),
        (l.yHn = e.GetSourceType()),
        (l.IHn = t ?? { THn: "" }),
        new Protocol_1.Aki.Protocol.gNs());
    (r.H8n = e.GetName()),
      (r.zVn = e.GetSignature()),
      (l.LHn = r),
      Net_1.Net.Call(
        25215,
        Protocol_1.Aki.Protocol.nYn.create(l),
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
  e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
    ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        15740,
      )
    : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "ReportSuccess",
      ),
      UiManager_1.UiManager.IsViewShow("ReportView") &&
        UiManager_1.UiManager.CloseView("ReportView"));
};
//# sourceMappingURL=ReportController.js.map
