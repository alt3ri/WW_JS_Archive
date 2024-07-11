"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowNetworks = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowNetworks {
  static Register() {
    Net_1.Net.Register(5917, this.m$i),
      Net_1.Net.Register(24295, this.d$i),
      Net_1.Net.Register(7272, this.C$i);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(5917),
      Net_1.Net.UnRegister(24295),
      Net_1.Net.UnRegister(7272);
  }
  static RequestGmFinish() {
    var o = Protocol_1.Aki.Protocol.Pzn.create();
    (o.BVn = 0),
      (o.y8n = "@skipflow"),
      Net_1.Net.Call(29711, Protocol_1.Aki.Protocol.Pzn.create(o), (o) => {});
  }
  static RequestAction(o, t, e) {
    var r = Protocol_1.Aki.Protocol.Qis.create();
    (r.tHn = o),
      (r.iHn = t),
      Net_1.Net.Call(1478, r, (o) => {
        e && e(), FlowNetworks.g$i(o.hvs, 14125);
      });
  }
  static RequestFlowEnd(o, t, e, r) {
    var l = new Protocol_1.Aki.Protocol.$is(),
      _ = ((l.tHn = o), (l.rHn = t), {});
    for (const i of e) {
      var s = i[0];
      const e = i[1];
      var n = [];
      for (const a of e) {
        var c = { oHn: a[0], H5n: a[1] };
        n.push(c);
      }
      _[s] = { nHn: n };
    }
    (l.sHn = _),
      Net_1.Net.Call(20919, l, (o) => {
        o
          ? (FlowNetworks.g$i(o.hvs, 14125),
            r?.(o.hvs === Protocol_1.Aki.Protocol.O4n.NRs))
          : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求完成剧情时网络错误",
            ),
            r?.(!1));
      });
  }
  static RequestFlowRestart(t) {
    var o = new Protocol_1.Aki.Protocol.Wis();
    (o.tHn = t),
      Net_1.Net.Call(9536, o, (o) => {
        o
          ? o.hvs !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求重启剧情失败",
              ["flowIncId", t],
            )
          : ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求重启剧情时网络错误",
              ["flowIncId", t],
            );
      });
  }
  static g$i(o, t) {
    o === Protocol_1.Aki.Protocol.O4n.Proto_ErrFinishFlowFail
      ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "请求服务器完成剧情失败",
        )
      : o === Protocol_1.Aki.Protocol.O4n.Proto_ErrFlowActionFail &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "请求服务器剧情行为失败",
        ),
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o,
          t,
        ));
  }
  static RequestSafeTeleport(o, t) {
    var e = new Protocol_1.Aki.Protocol.d7s();
    (e.tHn = o),
      Net_1.Net.Call(3141, e, (o) => {
        o && o.hvs === Protocol_1.Aki.Protocol.O4n.NRs
          ? t(!0)
          : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求服务器传送到剧情起始点失败",
            ),
            t(!1));
      });
  }
}
((exports.FlowNetworks = FlowNetworks).m$i = (o) => {
  ControllerHolder_1.ControllerHolder.FlowController.StartNotify(o);
}),
  (FlowNetworks.d$i = (o) => {
    ControllerHolder_1.ControllerHolder.FlowController.EndNotify(o);
  }),
  (FlowNetworks.C$i = (o) => {
    ControllerHolder_1.ControllerHolder.FlowController.SkipBlackScreenNotify(o);
  });
//# sourceMappingURL=FlowNetworks.js.map
