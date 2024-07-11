"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Net = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  Time_1 = require("../Common/Time"),
  List_1 = require("../Container/List"),
  Queue_1 = require("../Container/Queue"),
  Long = require("../Define/Net/long"),
  NetDefine_1 = require("../Define/Net/NetDefine"),
  GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController"),
  Http_1 = require("../Http/Http"),
  TimerSystem_1 = require("../Timer/TimerSystem"),
  MathUtils_1 = require("../Utils/MathUtils"),
  StringUtils_1 = require("../Utils/StringUtils"),
  NetInfo_1 = require("./NetInfo"),
  ENABLE_NET_STAT = !0,
  ENABLE_NET_LOG = !0,
  ENABLE_HEARTBEAT_LOG = !0,
  ENABLE_SYNC_LOG = !0,
  ENABLE_MESSAGE_LOG = !1,
  s2cEncryptType = { [0]: 1, 2: 0 };
class SendMessageCache {
  constructor(e, t, N, i, s) {
    (this.RpcId = 0),
      (this.SeqNo = 0),
      (this.MessageId = void 0),
      (this.EncodeMessage = void 0),
      (this.Handle = void 0),
      (this.SendTimeMs = 0),
      (this.TimeoutHandle = void 0),
      (this.RpcId = e),
      (this.SeqNo = t),
      (this.MessageId = N),
      (this.EncodeMessage = i),
      (this.Handle = s),
      (this.SendTimeMs = Date.now()),
      (this.TimeoutHandle = void 0);
  }
  ResetHandle(e) {
    this.Handle = e;
  }
}
SendMessageCache.NullMessageCache = new SendMessageCache(
  void 0,
  void 0,
  void 0,
  void 0,
  void 0,
);
class Net {
  static get RttMs() {
    return NetInfo_1.NetInfo.RttMs;
  }
  static get LastReceiveTimeMs() {
    return Net.QK;
  }
  static IsServerConnected() {
    return 2 === Net.XK || 3 === Net.XK;
  }
  static IsFinishLogin() {
    return 2 === Net.XK;
  }
  static SetDoingLogin() {
    Net.XK = 1;
  }
  static SetFinishLogin() {
    Net.XK = 2;
  }
  static SetNetworkErrorHandle(e) {
    Net.$K = e;
  }
  static SetExceptionHandle(e) {
    Net.YK = e;
  }
  static SetAddRequestMaskHandle(e) {
    Net.JK = e;
  }
  static SetRemoveRequestMaskHandle(e) {
    Net.zK = e;
  }
  static SetReceivedMessageHandle(e) {
    Net.ZK = e;
  }
  static SetProtocolMonitorHandle(e) {
    Net.eX = e;
  }
  static Initialize() {
    Net._X(0);
    var e = new UE.KuroKcpClient(),
      e =
        ((e.IsTickDrivenOutside = !0),
        e.OnConnectSuccess.Add(Net.M9s),
        e.OnRecResp.Bind(Net.iX),
        e.OnRecException.Bind(Net.oX),
        e.OnRecPush.Bind(Net.rX),
        e.OnError.Bind(Net.nX),
        e.SetEnType(2, 111),
        e.SetEnType(2, 112),
        Net.sX.clear(),
        (Net.aX = 0),
        (Net.hX = 0),
        (Net.lX = 0),
        UE.KuroStaticLibrary.IsBuildShipping() ||
          ((Net.uX = ENABLE_NET_LOG),
          (Net.cX = ENABLE_NET_STAT),
          (Net.mX = ENABLE_HEARTBEAT_LOG),
          (Net.dX = ENABLE_SYNC_LOG)),
        Net.CX(NetDefine_1.PushMessageIds, "Net.Push", !0),
        Net.CX(NetDefine_1.RequestMessageIds, "Net.Request", !1),
        Net.CX(NetDefine_1.ResponseMessageIds, "Net.Response", !0),
        Net.CX(NetDefine_1.NotifyMessageIds, "Net.Notify", !0),
        e.SetKcpMtu(1e3),
        e.SetKcpSegmentSize(123952),
        e.SetKcpWndSize(256, 256),
        e.SetKcpNoDelay(1, 10, 2, 1),
        e.SetKcpStream(!0),
        (Net.gX = e),
        {
          GroupId: new UE.FName("NetOnceTaskGroup"),
          Priority: 100,
          IsEmpty: this.fX,
          Consume: this.pX,
        });
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterOnceTaskCustomGroup(
      e,
    );
  }
  static Tick(e) {
    Net.gX && Net.gX.TickOutside(e);
  }
  static InitReConnectMessage(e) {
    Net.vX.clear();
    for (const t of e) Net.vX.add(t);
  }
  static InitCanTimerOutMessage(e) {
    Net.MX.clear();
    for (const t of e) Net.MX.add(t);
  }
  static Connect(e, t, N, i, s) {
    Net.SX()
      ? ((Net.S9s = N),
        (Net.E9s = s),
        (Net.y9s = 0),
        (Net.I9s = e),
        (Net.T9s = t),
        (Net.L9s = i),
        Net.D9s())
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 9, "已经连接或者正在连接中."),
        N(3));
  }
  static async ConnectAsync(e, N, i, s) {
    return new Promise((t) => {
      Net.Connect(
        e,
        N,
        (e) => {
          t(e);
        },
        i,
        s,
      );
    });
  }
  static Disconnect(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 31, "断开连接", ["Reason", e]),
      Net._X(0),
      Net.S9s && Net.A9s(2),
      1 !== e
        ? ((Net.XK = 0 === e ? 4 : 0), Net.LX(), (Net.aX = 0), (Net.hX = 0))
        : (Net.XK = 3);
  }
  static ResetProtoKey() {
    Net.DX = !1;
  }
  static SetDynamicProtoKey(e, t) {
    e = s2cEncryptType[e];
    Net.DX = !0;
    Net.gX.SetK(e, t) ||
      (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Net", 22, "网络 key 设置失败"));
  }
  static GetDownStreamSeqNo() {
    return Net.lX;
  }
  static GetCachedMessageData(e) {
    let t = Net.RX.GetHeadNextNode(),
      N = void 0;
    for (; t; ) {
      if (t.Element?.SeqNo === e) {
        N = t.Element;
        break;
      }
      t = t.Next;
    }
    var i, s, o;
    return N
      ? (([i, s, , o] = Net.gX
          .GetDebugString(N.EncodeMessage, ";", N.MessageId, N.SeqNo)
          .split(";")),
        [N.MessageId, Number(i), s, o])
      : [0, 0, "", ""];
  }
  static get MessageCacheSize() {
    return Net.RX.Count;
  }
  static ReconnectSuccessAndReSend(N) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 31, "重连流程,", ["lastReceived", N]);
    var i = Net.RX.Count;
    if (0 < i) {
      let e = Net.RX.GetHeadNextNode(),
        t = !1;
      for (; e; ) {
        var s = e.Element.SeqNo;
        if (N <= s) {
          t = s === N;
          break;
        }
        e = e.Next;
      }
      e &&
        (Net.RX.RemoveNodesBeforeThis(e, t), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Net",
          31,
          "重连流程, 清理掉已经被服务器收到的缓存消息",
          ["beforeCount", i],
          ["afterCount", Net.RX.Count],
          ["find SeqNo", e.Element.SeqNo],
        );
    }
    if (0 < Net.RX.Count) {
      let e = 0,
        t = 0,
        N = 0,
        i = Net.RX.GetHeadNextNode();
      for (; i; ) {
        var o,
          r,
          a = i.Element,
          n = a.MessageId;
        0 == (3 & NetDefine_1.protoConfig[n]) ||
          (4 != (r = void 0 !== (o = a.RpcId) ? 1 : 4) && !a.Handle) ||
          (e++,
          (t = a.SeqNo),
          (N = n),
          Net.UX(r, a.SeqNo, o, n, a.EncodeMessage)),
          (i = i.Next);
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Net",
          31,
          "重连流程, 重发未被服务器确认的消息",
          ["Count", e],
          ["lastSeqNo", t],
          ["lastMsgId", N],
        );
    }
    Net.SetFinishLogin();
  }
  static Register(e, t) {
    return Net.sX.has(e)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 1, "网络消息重复注册", ["id", e]),
        !1)
      : (Net.sX.set(e, (e) => {
          t(e);
        }),
        !0);
  }
  static UnRegister(e) {
    return (
      !!Net.sX.delete(e) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 1, "网络消息未注册", ["id", e]),
      !1)
    );
  }
  static Send(e, t) {
    Net.AX(e) && Net.PX(4, e, t, void 0, void 0);
  }
  static Call(e, t, N, i = 0) {
    var s;
    !Net.xX(e) && Net.AX(e)
      ? ((s = Net.BX()),
        (t = Net.PX(1, e, t, s, N)),
        Net.bX(e, t),
        0 < i && Net.qX(i, t.Element),
        4 == (4 & NetDefine_1.protoConfig[e]) && Net.JK?.(s))
      : N(void 0);
  }
  static async CallAsync(e, N, i = 0) {
    return new Promise((t) => {
      Net.Call(
        e,
        N,
        (e) => {
          t(e);
        },
        i,
      );
    });
  }
  static PX(e, t, N, i, s) {
    var o = Net.OX(),
      r = NetDefine_1.messageDefine[t].encode(N).finish(),
      s = new SendMessageCache(i, o, t, r, s),
      s = Net.FX(s);
    return Net.VX(t) || Net.UX(e, o, i, t, r, N), s;
  }
  static qX(t, N) {
    const i = N.MessageId;
    var e;
    Net.MX.has(i)
      ? ((e = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Net",
              31,
              "协议超时",
              ["message", i],
              ["timeout", t],
            );
          var e = N.Handle;
          N.ResetHandle(void 0),
            (N.TimeoutHandle = void 0),
            e && (Net.cX && Net.HX.get(i), e(void 0));
        }, t)),
        (N.TimeoutHandle = e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 31, "该协议未配置可超时", ["message", i]);
  }
  static CX(e, t, N) {
    if (Net.uX || Net.cX)
      for (const o of e) {
        var i = o,
          s = t + `.(${i})`;
        Net.uX && Net.jX.set(i, s), N && Net.cX && Net.HX.set(i, void 0);
      }
  }
  static xX(e) {
    return (
      !!Net.WX.has(e) &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 31, "Request重复发送。", ["message", e]),
      !0)
    );
  }
  static _X(e) {
    Net.KX !== e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Net",
          9,
          "连接状态变化",
          ["Before", Net.KX],
          ["After", e],
        ),
      0 === (Net.KX = e)) &&
      Net.gX &&
      Net.gX.Disconnect();
  }
  static SX() {
    return 0 === Net.KX;
  }
  static D9s() {
    (Net.IX = TimerSystem_1.TimerSystem.Delay((e) => {
      Net.A9s(1);
    }, Net.L9s)),
      Net._X(1),
      Net.gX.Connect(Net.I9s, Net.T9s);
  }
  static VX(e) {
    return 3 === Net.XK && !Net.vX.has(e);
  }
  static AX(e) {
    if (4 === Net.XK) return !1;
    if (0 === Net.XK && !(0 == (3 & NetDefine_1.protoConfig[e])))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Net",
            9,
            "尚未完成登录流程, 无法发送登录流程以外的协议",
            ["messageId", e],
          ),
        !1
      );
    return (
      2 !== Net.XK &&
        2 == (3 & NetDefine_1.protoConfig[e]) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          31,
          "尚未完成登录流程, 无法发送 GameServer 协议",
          ["messageId", e],
          ["LoginStatus", Net.XK],
        ),
      !0
    );
  }
  static BX() {
    return Net.aX < MathUtils_1.MathUtils.Int16Max
      ? ++Net.aX
      : ((Net.aX = 1), Net.aX);
  }
  static OX() {
    return Net.hX < MathUtils_1.MathUtils.Int32Max
      ? ++Net.hX
      : ((Net.hX = 1), Net.hX);
  }
  static QX(e) {
    if (0 === e) return !0;
    var t = Net.lX;
    let N = t + 1;
    if ((Net.lX = e) === (N = t === MathUtils_1.MathUtils.Int32Max ? 1 : N))
      return !0;
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString)),
      s =
        (UE.KuroStaticLibrary.GetLocalHostAddresses(i),
        (0, puerts_1.$unref)(i)),
      o = new Array();
    for (let e = 0; e < s.Num(); e++) {
      var r = s.Get(e);
      o.push(r);
    }
    return (
      Http_1.Http.Post(
        "https://open.feishu.cn/open-apis/bot/v2/hook/011aff5d-dc62-464c-9b22-c911d78c08f1",
        `{"msg_type":"text","content":{"text":"客户端收到的下行包不连续(屏蔽重连), 本地:${t}, 收到:${e}, 服务器信息, IP:${Net.I9s}, Port:${Net.T9s}, 本地Ip地址:${o.join(",")}"}}`,
        new Map([["Content-Type", "application/json"]]),
        () => {},
      ),
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 31, "下行包序号不对", ["old", t], ["new", e]),
      !1
    );
  }
  static FX(e) {
    return (
      Net.uX &&
        ENABLE_MESSAGE_LOG &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Net",
          9,
          "AddMessage",
          ["SeqNo", e.SeqNo],
          ["MsgName", Net.jX.get(e.MessageId)],
        ),
      Net.RX.AddTail(e)
    );
  }
  static bX(e, t) {
    Net.XX.set(t.Element.RpcId, t),
      8 == (8 & NetDefine_1.protoConfig[e]) && Net.WX.add(e);
  }
  static $X(e) {
    var t = e.Element,
      N = t.MessageId;
    Net.XX.delete(t.RpcId),
      8 == (8 & NetDefine_1.protoConfig[N]) && Net.WX.delete(N),
      111 !== N &&
        107 !== N &&
        (Net.RX.RemoveNodesBeforeThis(e, !0), Net.uX) &&
        ENABLE_MESSAGE_LOG &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Net",
          31,
          "DeleteMessage",
          ["RpcId", t.RpcId],
          ["SeqNo", t.SeqNo],
          ["MsgName", Net.jX.get(N)],
        );
  }
  static YX(e) {
    return 111 === e || 112 === e;
  }
  static JX(e, t, N, i, s = void 0) {
    var o,
      i = new Uint8Array(i),
      i = new Uint8Array(i);
    Net.QX(t), Net.ZK?.();
    let r = void 0,
      a = void 0,
      n = void 0;
    const _ = N;
    let c = void 0,
      g = !1;
    const d = Date.now();
    if (
      ((Net.QK = d),
      s
        ? (r = Net.XX.get(s))
          ? ((o = r.Element),
            (v = d - o.SendTimeMs),
            (c = o.MessageId),
            NetInfo_1.NetInfo.SetRttMs(v),
            300 < v &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Net",
                31,
                "RTT过高",
                ["requestId", c],
                ["rpcId", s],
                ["seqNo", o.SeqNo],
                ["serverSeqNo", t],
                ["rtt", v],
                ["deltaTime", Time_1.Time.DeltaTime],
              ),
            (n = o.Handle),
            (g = this.zX.has(c)),
            o.TimeoutHandle &&
              TimerSystem_1.TimerSystem.Remove(o.TimeoutHandle))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Net",
              1,
              "网络 rpc 响应不存在",
              ["rpcId", s],
              ["messageId", N],
            )
        : ((n = Net.sX.get(_)) ||
            (Net.uX &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Net",
                1,
                "网络 notify 响应不存在",
                ["Id", _],
                ["Name", Net.jX.get(_)],
              )),
          (g = this.zX.has(_))),
      3 === e)
    ) {
      const u = `[异常信息:${StringUtils_1.StringUtils.Uint8ArrayToString(i)}]`,
        L = n;
      n = () => {
        Net.YK?.(
          s,
          N,
          c,
          r
            ? NetDefine_1.messageDefine[c].decode(r.Element.EncodeMessage)
            : void 0,
          u,
        ),
          L?.(a);
      };
    } else
      (a = NetDefine_1.messageDefine[_].decode(i)) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 1, "协议解析异常", ["messageId", _]));
    a && Net.uX && Net.ZX(_, t, s, a);
    var v = () => {
      var e;
      Net.cX && Net.HX.get(_),
        Net.uX &&
          67 < (e = Date.now() - d) &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Net",
            31,
            "callback exceeds limit",
            ["delay", e],
            ["messageId", _],
            ["msg", Net.jX.get(_)],
          ),
        s && c && 4 == (4 & NetDefine_1.protoConfig[c]) && Net.zK?.(s),
        n?.(a),
        r && Net.$X(r),
        a && Net.eX?.(_, a);
    };
    return !Net.UseBudget || g ? v() : this.eY.Push(v), !0;
  }
  static UX(e, t, N, i, s, o = void 0) {
    return Net.DX || Net.YX(i)
      ? (Net.uX &&
          ((o = o || NetDefine_1.messageDefine[i].decode(s)),
          Net.ZX(i, t, N, o)),
        Net.gX.SendM(e, t, N, i, s, 0 == (32 & NetDefine_1.protoConfig[i])))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 22, "上行协议时机不对", ["messageId", i]),
        !1);
  }
  static LX() {
    Net.WX.clear(), Net.XX.clear(), Net.RX.RemoveAllNodeWithoutHead();
  }
  static ZX(e, t, N, i) {
    var s;
    (Net.mX || (21988 !== e && 20387 !== e && 4988 !== e)) &&
      29494 !== e &&
      3991 !== e &&
      17208 !== e &&
      6482 !== e &&
      27795 !== e &&
      12552 !== e &&
      21928 !== e &&
      15985 !== e &&
      7876 !== e &&
      (Net.dX ||
        (26094 !== e &&
          18388 !== e &&
          10387 !== e &&
          9469 !== e &&
          12325 !== e &&
          10026 !== e &&
          27030 !== e &&
          14957 !== e &&
          21012 !== e)) &&
      ((s = 0 < Object.keys(i).length), Net.uX) &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Net",
        23,
        Net.jX.get(e),
        ["SeqNo", t],
        ["RpcId", N],
        ["UpStreamSeqNo", Net.hX],
        ["DownStream", Net.lX],
        ["msg", s ? this.tY(i) : ""],
      );
  }
  static tY(e) {
    return JSON.stringify(e, (e, t) =>
      t instanceof Long ? MathUtils_1.MathUtils.LongToBigInt(t).toString() : t,
    );
  }
}
(exports.Net = Net),
  ((_a = Net).QK = 0),
  (Net.UseBudget = !0),
  (Net.gX = void 0),
  (Net.DX = !1),
  (Net.S9s = void 0),
  (Net.I9s = ""),
  (Net.T9s = 0),
  (Net.L9s = 0),
  (Net.IX = void 0),
  (Net.y9s = 0),
  (Net.E9s = 0),
  (Net.sX = new Map()),
  (Net.WX = new Set()),
  (Net.RX = new List_1.default(SendMessageCache.NullMessageCache)),
  (Net.XX = new Map()),
  (Net.jX = new Map()),
  (Net.HX = new Map()),
  (Net.wX = void 0),
  (Net.NX = void 0),
  (Net.vX = new Set()),
  (Net.MX = new Set()),
  (Net.aX = 0),
  (Net.hX = 0),
  (Net.lX = 0),
  (Net.KX = 0),
  (Net.XK = 0),
  (Net.uX = !1),
  (Net.cX = !1),
  (Net.mX = !1),
  (Net.dX = !1),
  (Net.YK = void 0),
  (Net.JK = void 0),
  (Net.zK = void 0),
  (Net.ZK = void 0),
  (Net.$K = void 0),
  (Net.eX = void 0),
  (Net.eY = new Queue_1.Queue(256)),
  (Net.IsConsumeNotifyPaused = !1),
  (Net.zX = new Set([21988, 12864, 9653])),
  (Net.fX = () => _a.IsConsumeNotifyPaused || 0 === _a.eY.Size),
  (Net.pX = () => {
    Net.eY.Pop()();
  }),
  (Net.GX = void 0),
  (Net.kX = void 0),
  (Net.M9s = () => {
    Net.gX?.SetKcpStream(!0), _a.A9s(0);
  }),
  (Net.A9s = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 31, "Kcp连接结果:", ["result", e]),
      TimerSystem_1.TimerSystem.Remove(Net.IX),
      (Net.IX = void 0),
      1 === e && Net.y9s < Net.E9s
        ? (Net.y9s++, Net._X(0), Net.D9s())
        : (Net.S9s && (Net.S9s(e), (Net.S9s = void 0)),
          Net._X(0 === e ? 2 : 0));
  }),
  (Net.nX = (e, t, N, i, s) => {
    switch (e) {
      case 1:
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Net",
            31,
            "SocketError",
            ["errorCode", t],
            ["Size", N],
            ["Read", i],
          ),
          0 !== t && Net.$K?.(t);
        break;
      case 3:
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Net",
            31,
            "DecryptError",
            ["Result", t],
            ["Type", N],
            ["RpcId", i],
            ["MessageId", s],
          );
    }
  }),
  (Net.iX = (e, t, N, i) => {
    Net.JX(2, e, N, i, t);
  }),
  (Net.oX = (e, t, N, i) => {
    Net.JX(3, e, N, i, t);
  }),
  (Net.rX = (e, t, N) => {
    Net.JX(4, e, t, N);
  });
//# sourceMappingURL=Net.js.map
