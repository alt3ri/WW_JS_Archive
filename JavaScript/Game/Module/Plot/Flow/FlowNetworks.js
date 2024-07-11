"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowNetworks = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowNetworks {
  static Register() {
    Net_1.Net.Register(13967, this.CXi),
      Net_1.Net.Register(9916, this.gXi),
      Net_1.Net.Register(7476, this.fXi);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(13967),
      Net_1.Net.UnRegister(9916),
      Net_1.Net.UnRegister(7476);
  }
  static RequestGmFinish() {
    const o = Protocol_1.Aki.Protocol.qQn.create();
    (o.Z4n = 0),
      (o.H3n = "@skipflow"),
      Net_1.Net.Call(28935, Protocol_1.Aki.Protocol.qQn.create(o), (o) => {});
  }
  static RequestAction(o, t, e) {
    const r = Protocol_1.Aki.Protocol.eZn.create();
    (r.E8n = o),
      (r.y8n = t),
      Net_1.Net.Call(27547, r, (o) => {
        e && e(), FlowNetworks.pXi(o.Kms, 20061);
      });
  }
  static RequestFlowEnd(o, t, e, r) {
    const l = new Protocol_1.Aki.Protocol.Xzn();
    const _ = ((l.E8n = o), (l.I8n = t), {});
    for (const i of e) {
      const s = i[0];
      const e = i[1];
      const n = [];
      for (const a of e) {
        const c = { T8n: a[0], dFn: a[1] };
        n.push(c);
      }
      _[s] = { L8n: n };
    }
    (l.D8n = _),
      Net_1.Net.Call(17995, l, (o) => {
        o
          ? (FlowNetworks.pXi(o.Kms, 20061),
            r?.(o.Kms === Protocol_1.Aki.Protocol.lkn.Sys))
          : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求完成剧情时网络错误",
            ),
            r?.(!1));
      });
  }
  static RequestFlowRestart(t) {
    const o = new Protocol_1.Aki.Protocol.zzn();
    (o.E8n = t),
      Net_1.Net.Call(2177, o, (o) => {
        o
          ? o.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
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
  static pXi(o, t) {
    o === Protocol_1.Aki.Protocol.lkn.Proto_ErrFinishFlowFail
      ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "请求服务器完成剧情失败",
        )
      : o === Protocol_1.Aki.Protocol.lkn.Proto_ErrFlowActionFail &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "请求服务器剧情行为失败",
        ),
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o,
          t,
        ));
  }
  static RequestSafeTeleport(o, t) {
    const e = new Protocol_1.Aki.Protocol.g4s();
    (e.E8n = o),
      Net_1.Net.Call(5649, e, (o) => {
        o && o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
          ? t(!0)
          : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求服务器传送到剧情起始点失败",
            ),
            t(!1));
      });
  }
}
((exports.FlowNetworks = FlowNetworks).CXi = (o) => {
  ControllerHolder_1.ControllerHolder.FlowController.StartNotify(o);
}),
  (FlowNetworks.gXi = (o) => {
    ControllerHolder_1.ControllerHolder.FlowController.EndNotify(o);
  }),
  (FlowNetworks.fXi = (o) => {
    ControllerHolder_1.ControllerHolder.FlowController.SkipBlackScreenNotify(o);
  });
// # sourceMappingURL=FlowNetworks.js.map
