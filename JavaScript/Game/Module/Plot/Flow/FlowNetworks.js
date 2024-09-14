"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowNetworks = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowNetworks {
  static Register() {
    Net_1.Net.Register(22922, this.m$i),
      Net_1.Net.Register(22001, this.d$i),
      Net_1.Net.Register(26969, this.C$i);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(22922),
      Net_1.Net.UnRegister(22001),
      Net_1.Net.UnRegister(26969);
  }
  static RequestGmFinish() {
    var o = Protocol_1.Aki.Protocol.Gzn.create();
    (o.VVn = 0),
      (o.P8n = "@skipflow"),
      Net_1.Net.Call(29319, Protocol_1.Aki.Protocol.Gzn.create(o), (o) => {});
  }
  static RequestAction(o, t, e) {
    var r = Protocol_1.Aki.Protocol.trs.create();
    (r._Hn = o),
      (r.uHn = t),
      Net_1.Net.Call(24656, r, (o) => {
        e && e(), FlowNetworks.g$i(o.Cvs, 17565);
      });
  }
  static RequestFlowEnd(t, o, e, r) {
    var l = new Protocol_1.Aki.Protocol.Yis(),
      _ = ((l._Hn = t), (l.cHn = o), {});
    for (const i of e) {
      var s = i[0];
      const e = i[1];
      var n = [];
      for (const a of e) {
        var c = { mHn: a[0], z5n: a[1] };
        n.push(c);
      }
      _[s] = { dHn: n };
    }
    (l.CHn = _),
      Net_1.Net.Call(21897, l, (o) => {
        o
          ? (FlowNetworks.g$i(o.Cvs, 17565),
            r?.(t, o.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs))
          : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求完成剧情时网络错误",
            ),
            r?.(t, !1));
      });
  }
  static RequestFlowRestart(t) {
    var o = new Protocol_1.Aki.Protocol.Zis();
    (o._Hn = t),
      Net_1.Net.Call(27420, o, (o) => {
        o
          ? o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
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
    o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFinishFlowFail
      ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "请求服务器完成剧情失败",
        )
      : o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFlowActionFail &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "请求服务器剧情行为失败",
        ),
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o,
          t,
        ));
  }
  static RequestSafeTeleport(o, t) {
    var e = new Protocol_1.Aki.Protocol.G7s();
    (e._Hn = o),
      Net_1.Net.Call(19583, e, (o) => {
        o && o.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
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
