"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowNetworks = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowNetworks {
  static Register() {
    Net_1.Net.Register(19253, this.m$i),
      Net_1.Net.Register(21357, this.d$i),
      Net_1.Net.Register(26750, this.C$i);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(19253),
      Net_1.Net.UnRegister(21357),
      Net_1.Net.UnRegister(26750);
  }
  static RequestGmFinish() {
    var o = Protocol_1.Aki.Protocol.Gzn.create();
    (o.VVn = 0),
      (o.P8n = "@skipflow"),
      Net_1.Net.Call(24668, Protocol_1.Aki.Protocol.Gzn.create(o), (o) => {});
  }
  static RequestAction(o, t, e) {
    var r = Protocol_1.Aki.Protocol.trs.create();
    (r._Hn = o),
      (r.uHn = t),
      Net_1.Net.Call(26891, r, (o) => {
        e && e(), FlowNetworks.g$i(o.Cvs, 20186);
      });
  }
  static RequestFlowEnd(t, o, e, r) {
    var l = new Protocol_1.Aki.Protocol.Yis(),
      _ = ((l._Hn = t), (l.cHn = o), {});
    for (const i of e) {
      var s = i[0];
      const e = i[1];
      var n = [];
      for (const d of e) {
        var c = { mHn: d[0], z5n: d[1] };
        n.push(c);
      }
      _[s] = { dHn: n };
    }
    (l.CHn = _),
      Net_1.Net.Call(26119, l, (o) => {
        o
          ? (FlowNetworks.g$i(o.Cvs, 20186), r?.(t, o.Cvs))
          : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "请求完成剧情时网络错误",
            ),
            r?.(t, void 0));
      });
  }
  static RequestFlowRestart(t) {
    var o = new Protocol_1.Aki.Protocol.Zis();
    (o._Hn = t),
      Net_1.Net.Call(25706, o, (o) => {
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
  static RequestSeqEndPosition(o, t, e) {
    var r = Protocol_1.Aki.Protocol.m0_.create();
    (r._Hn = o.FlowIncId),
      (r.fql = o.CurShowTalkActionId),
      (r.mHn = o.CurTalkId),
      (r.iPs = t.X),
      (r.rPs = t.Y),
      (r.gqs = t.Z),
      (r.fqs = e.Yaw);
    const l = o.FlowIncId;
    Net_1.Net.Call(20735, r, (o) => {
      o
        ? o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "请求Seq最终位置失败",
            ["flowIncId", l],
          )
        : ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "请求Seq最终位置时网络错误",
            ["flowIncId", l],
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
      Net_1.Net.Call(28534, e, (o) => {
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
