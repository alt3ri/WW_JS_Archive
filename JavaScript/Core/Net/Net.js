"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Net = exports.CallbackStatus = void 0);
const UE = require("ue"),
  Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  Time_1 = require("../Common/Time"),
  List_1 = require("../Container/List"),
  Long = require("../Define/Net/long"),
  NetDefine_1 = require("../Define/Net/NetDefine"),
  GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController"),
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
class CallbackStatus {
  constructor(e) {
    (this.UserData = void 0),
      (this.IsFinished = !0),
      (this.t6 = 0),
      (this.fE1 = 0),
      (this.fE1 = e);
  }
  get MessageId() {
    return this.fE1;
  }
  get IsJobFinished() {
    return this.IsFinished;
  }
  get CallbackCount() {
    return this.t6;
  }
  IncrementCount() {
    this.t6++;
  }
}
exports.CallbackStatus = CallbackStatus;
class CallbackQueueItem {
  constructor(e, t, N) {
    (this.B7 = void 0),
      (this.DIe = void 0),
      (this.dJ = !1),
      (this.B7 = e),
      (this.DIe = new CallbackStatus(t)),
      (this.dJ = N);
  }
  DoCallback() {
    return this.B7?.(this.DIe), this.DIe.IsJobFinished;
  }
  IsPaused() {
    return this.dJ;
  }
}
class SendMessageCache {
  constructor(e, t, N, i, a) {
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
      (this.Handle = a),
      (this.SendTimeMs = Date.now()),
      (this.TimeoutHandle = void 0);
  }
  ClearHandle() {
    this.Handle = void 0;
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
  static StartReconnecting() {
    Net.nha = !0;
  }
  static sha() {
    Net.nha = !1;
  }
  static IsServerConnected() {
    return Net.nha || 4 === Net.aha;
  }
  static IsFinishLogin() {
    return 4 === Net.aha;
  }
  static ChangeState1() {
    Net.aha = 1;
  }
  static hha() {
    1 !== Net.aha && Net.lha(2), (Net.aha = 2);
  }
  static DX() {
    return 2 <= Net.aha && Net.aha <= 4;
  }
  static ChangeStateEnterGame() {
    2 !== Net.aha && 3 !== Net.aha && Net.lha(3), (Net.aha = 3);
  }
  static gXa() {
    3 !== Net.aha && Net.lha(4), (Net.aha = 4), Net.sha();
  }
  static IsNotifyCallbackPaused() {
    return Net.hul;
  }
  static PauseAllNotifyCallback() {
    (Net.hul = !0),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Net", 30, "暂停消息处理");
  }
  static ResumeAllNotifyCallback() {
    (Net.hul = !1),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Net", 30, "恢复消息处理");
  }
  static lha(e) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Net",
        30,
        "状态切换错误",
        ["Current", Net.aha],
        ["Dest", e],
      );
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
  static Initialize() {
    Net._X(0);
    var e = new UE.KuroKcpClient();
    1 === Info_1.Info.PlatformType && (e.UseNewResolveIp = !1),
      (e.IsTickDrivenOutside = !0),
      e.OnConnectSuccess.Add(Net.voa),
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
      Info_1.Info.IsBuildShipping ||
        ((Net.uX = ENABLE_NET_LOG),
        (Net.cX = ENABLE_NET_STAT),
        (Net.mX = ENABLE_HEARTBEAT_LOG),
        (Net.dX = ENABLE_SYNC_LOG),
        (e.OpenSendVerify = !0)),
      Net.CX(NetDefine_1.PushMessageIds, "Net.Push", !0),
      Net.CX(NetDefine_1.RequestMessageIds, "Net.Request", !1),
      Net.CX(NetDefine_1.ResponseMessageIds, "Net.Response", !0),
      Net.CX(NetDefine_1.NotifyMessageIds, "Net.Notify", !0);
    let t = 1e3;
    var N = 127 * ((t = 0 < e.RemoteMtu ? e.RemoteMtu : t) - 24),
      N =
        (e.SetKcpMtu(t),
        e.SetKcpSegmentSize(N),
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
      N,
    );
  }
  static Tick(e) {
    Net.gX && Net.gX.TickOutside(e);
  }
  static InitCanTimerOutMessage(e) {
    Net.MX.clear();
    for (const t of e) Net.MX.add(t);
  }
  static ipa() {
    return !!Net.rpa && (Net.rpa.DoCallback() && (Net.rpa = void 0), !0);
  }
  static Connect(e, t, N, i, a) {
    Net.EX()
      ? ((Net.Moa = N),
        (Net.Soa = a),
        (Net.Eoa = 0),
        (Net.yoa = e),
        (Net.Ioa = t),
        (Net.Toa = i),
        Net.Loa())
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 8, "已经连接或者正在连接中."),
        N(3));
  }
  static async ConnectAsync(e, N, i, a) {
    return new Promise((t) => {
      Net.Connect(
        e,
        N,
        (e) => {
          t(e);
        },
        i,
        a,
      );
    });
  }
  static Disconnect(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 30, "断开连接", ["Reason", e]),
      Net._X(0),
      Net.Moa && Net.Doa(2),
      (Net.aha = 0 === e ? 5 : 0),
      1 !== e && (Net.LX(), (Net.aX = 0), (Net.hX = 0), Net.sha());
  }
  static SetDynamicProtoKey(e, t) {
    e = s2cEncryptType[e];
    Net.hha();
    Net.gX.SetK(e, t) ||
      (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Net", 21, "网络 key 设置失败"));
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
    var i, a, s;
    return N
      ? (([i, a, , s] = Net.gX
          .GetDebugString(N.EncodeMessage, ";", N.MessageId, N.SeqNo)
          .split(";")),
        [N.MessageId, Number(i), a, s])
      : [0, 0, "", ""];
  }
  static GetUnVerifiedMessageCount() {
    return Net.RX.Count;
  }
  static ReconnectSuccessAndReSend(N) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 30, "重连流程,", ["lastReceived", N]);
    var i = Net.RX.Count;
    if (0 < i) {
      let e = Net.RX.GetHeadNextNode(),
        t = !1;
      for (; e; ) {
        var a = e.Element.SeqNo;
        if (N <= a) {
          t = a === N;
          break;
        }
        e = e.Next;
      }
      e &&
        (Net.RX.RemoveNodesBeforeThis(e, t), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Net",
          30,
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
        var s,
          r,
          o = i.Element,
          n = o.MessageId;
        0 == (3 & NetDefine_1.protoConfig[n]) ||
          (4 != (r = void 0 !== (s = o.RpcId) ? 1 : 4) && !o.Handle) ||
          (e++,
          (t = o.SeqNo),
          (N = n),
          Net.UX(r, o.SeqNo, s, n, o.EncodeMessage)),
          (i = i.Next);
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Net",
          30,
          "重连流程, 重发未被服务器确认的消息",
          ["Count", e],
          ["lastSeqNo", t],
          ["lastMsgId", N],
        );
    }
    Net.gXa();
  }
  static Register(e, N) {
    return Net.sX.has(e)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 1, "网络消息重复注册", ["id", e]),
        !1)
      : (Net.sX.set(e, (e, t) => {
          N(e, t);
        }),
        !0);
  }
  static UnRegister(e) {
    return (
      !!Net.sX.delete(e) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 1, "Notify消息未注册", ["id", e]),
      !1)
    );
  }
  static Send(e, t) {
    Net.AX(e) && Net.PX(4, e, t, void 0, void 0);
  }
  static Call(e, t, N, i = 0) {
    var a;
    !Net.xX(e) && Net.AX(e)
      ? (Net.wX.Start(),
        (a = Net.BX()),
        (t = Net.PX(1, e, t, a, N)),
        Net.bX(e, t),
        0 < i && Net.qX(i, t.Element),
        4 == (4 & NetDefine_1.protoConfig[e]) &&
          (Net.npa.Start(), Net.JK?.(a), Net.npa.Stop()),
        Net.wX.Stop())
      : N(void 0, void 0);
  }
  static async CallAsync(e, t, i = 0) {
    return new Promise((N) => {
      Net.Call(
        e,
        t,
        (e, t) => {
          N(e);
        },
        i,
      );
    });
  }
  static PX(e, t, N, i, a) {
    Net.NX.Start();
    var s = Net.OX(),
      r = (Net.kX.Start(), NetDefine_1.messageDefine[t].encode(N).finish()),
      a =
        (Net.kX.Stop(),
        30720 < r.length &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Net",
            30,
            "消息过大",
            ["message", t],
            ["length", r.length],
          ),
        new SendMessageCache(i, s, t, r, a)),
      a = Net.FX(a);
    return Net.VX(t) || Net.UX(e, s, i, t, r, N), Net.NX.Stop(), a;
  }
  static qX(e, N) {
    const i = N.MessageId;
    var t;
    Net.MX.has(i)
      ? ((t = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Net",
              30,
              "协议超时",
              ["message", i],
              ["timeout", e],
            );
          var t = N.Handle;
          if ((N.ClearHandle(), (N.TimeoutHandle = void 0), t)) {
            let e = void 0;
            try {
              Net.cX && (e = Net.HX.get(i))?.Start(), t(void 0, void 0);
            } catch (e) {
              e instanceof Error
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.ErrorWithStack(
                    "Net",
                    30,
                    "callback执行异常",
                    e,
                    ["requestId", i],
                    ["error", e.message],
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Net",
                    30,
                    "callback执行异常",
                    ["requestId", i],
                    ["error", e],
                  );
            } finally {
              e?.Stop();
            }
          }
        }, e)),
        (N.TimeoutHandle = t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 30, "该协议未配置可超时", ["message", i]);
  }
  static CX(e, t, N) {
    if (Net.uX || Net.cX)
      for (const s of e) {
        var i = s,
          a = t + `.(${i})`;
        Net.uX && Net.jX.set(i, a),
          N &&
            Net.cX &&
            ((a = Stats_1.Stat.CreateNoFlameGraph(a)), Net.HX.set(i, a));
      }
  }
  static xX(e) {
    return (
      !!Net.WX.has(e) &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 30, "Request重复发送。", ["message", e]),
      !0)
    );
  }
  static _X(e) {
    Net.KX !== e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Net",
          8,
          "连接状态变化",
          ["Before", Net.KX],
          ["After", e],
        ),
      0 === (Net.KX = e)) &&
      Net.gX &&
      Net.gX.Disconnect();
  }
  static EX() {
    return 0 === Net.KX;
  }
  static Loa() {
    (Net.IX = TimerSystem_1.TimerSystem.Delay((e) => {
      Net.Doa(1);
    }, Net.Toa)),
      Net._X(1),
      Net.gX.Connect(Net.yoa, Net.Ioa);
  }
  static _ha(e) {
    return 111 === e || 107 === e;
  }
  static VX(e) {
    return !!Net.nha && !Net._ha(e);
  }
  static AX(e) {
    if (5 === Net.aha) return !1;
    if (Net.nha)
      return !(
        107 === e &&
        !Net.DX() &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 30, "上行协议时机不对，未发送", [
            "messageId",
            e,
          ]),
        1)
      );
    if (!Net.YX(e) && !Net.DX())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 21, "上行协议时机不对，未发送", [
            "messageId",
            e,
          ]),
        !1
      );
    if (4 !== Net.aha && !(0 == (3 & NetDefine_1.protoConfig[e])))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Net",
            8,
            "尚未完成登录流程, 登录流程以外的协议会被丢弃",
            ["state", Net.aha],
            ["messageId", e],
          ),
        !1
      );
    return !0;
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
    return (
      (Net.lX = e) === (N = t === MathUtils_1.MathUtils.Int32Max ? 1 : N) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 30, "下行包序号不对", ["old", t], ["new", e]),
      !1)
    );
  }
  static FX(e) {
    return (
      Net.uX &&
        ENABLE_MESSAGE_LOG &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Net",
          8,
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
  static spa(e) {
    var t = e.Element,
      N = t.MessageId;
    Net.XX.delete(t.RpcId),
      8 == (8 & NetDefine_1.protoConfig[N]) && Net.WX.delete(N),
      105 === N && Net.gXa(),
      Net._ha(N) ||
        (Net.RX.RemoveNodesBeforeThis(e, !0),
        Net.uX &&
          ENABLE_MESSAGE_LOG &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Net",
            30,
            "DeleteMessage",
            ["RpcId", t.RpcId],
            ["SeqNo", t.SeqNo],
            ["MsgName", Net.jX.get(N)],
          ));
  }
  static YX(e) {
    return 111 === e;
  }
  static JX(e, t, N, i, a = void 0) {
    var s,
      r,
      i = new Uint8Array(i),
      i = new Uint8Array(i);
    Net.QX(t);
    let o = void 0,
      n = void 0,
      _ = void 0;
    const c = N;
    let g = void 0,
      d = !1;
    const l = Date.now();
    if (
      ((Net.QK = l),
      a
        ? (o = Net.XX.get(a))
          ? (Net.spa(o),
            (s = o.Element),
            (r = l - s.SendTimeMs),
            (g = s.MessageId),
            NetInfo_1.NetInfo.SetRttMs(r),
            300 < r &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Net",
                30,
                "RTT过高",
                ["requestId", g],
                ["rpcId", a],
                ["seqNo", s.SeqNo],
                ["serverSeqNo", t],
                ["rtt", r],
                ["deltaTime", Time_1.Time.DeltaTime],
              ),
            (_ = s.Handle),
            s.TimeoutHandle &&
              TimerSystem_1.TimerSystem.Remove(s.TimeoutHandle))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Net",
              1,
              "网络 rpc 响应不存在",
              ["rpcId", a],
              ["messageId", N],
            )
        : ((_ = Net.sX.get(c)) ||
            (Net.uX &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Net",
                1,
                "网络 notify 响应不存在",
                ["Id", c],
                ["Name", Net.jX.get(c)],
              )),
          (d = !0)),
      3 === e)
    ) {
      const L = `[异常信息:${StringUtils_1.StringUtils.Uint8ArrayToString(i)}]`,
        S = _;
      _ = () => {
        Net.YK?.(
          a,
          N,
          g,
          o
            ? NetDefine_1.messageDefine[g].decode(o.Element.EncodeMessage)
            : void 0,
          L,
        ),
          S?.(void 0, void 0);
      };
    } else
      (n = NetDefine_1.messageDefine[c].decode(i)) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 1, "协议解析异常", ["messageId", c]));
    n && Net.uX && Net.ZX(c, t, a, n);
    var u = (e) => {
      let t = void 0;
      var N;
      Net.cX && (t = Net.HX.get(c))?.Start(),
        Net.uX &&
          0 === e.CallbackCount &&
          67 < (N = Date.now() - l) &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Net",
            30,
            "callback exceeds limit",
            ["delay", N],
            ["msg", Net.jX.get(c)],
          );
      try {
        0 === e.CallbackCount &&
          g &&
          4 == (4 & NetDefine_1.protoConfig[g]) &&
          (Net.apa.Start(), Net.zK?.(a), Net.apa.Stop()),
          _?.(n, e);
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Net",
              30,
              "callback执行异常",
              e,
              ["messageId", c],
              ["error", e.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Net",
              30,
              "callback执行异常",
              ["messageId", c],
              ["error", e],
            );
      } finally {
        e.IncrementCount(), t?.Stop();
      }
    };
    if (Net.UseBudget)
      this.fIo.AddTail(new CallbackQueueItem(u, c, d)), (this._ul += d ? 0 : 1);
    else for (var v = new CallbackStatus(c); u(v), !v.IsJobFinished; );
    return !0;
  }
  static UX(e, t, N, i, a, s = void 0) {
    return (
      Net.uX &&
        ((s = s || NetDefine_1.messageDefine[i].decode(a)), Net.ZX(i, t, N, s)),
      Net.gX.SendM(e, t, N, i, a, 0 == (32 & NetDefine_1.protoConfig[i]))
    );
  }
  static LX() {
    Net.WX.clear(), Net.XX.clear(), Net.RX.RemoveAllNodeWithoutHead();
  }
  static ZX(e, t, N, i) {
    var a;
    (Net.mX || (1650 !== e && 1651 !== e && 22769 !== e)) &&
      16361 !== e &&
      18749 !== e &&
      16378 !== e &&
      27334 !== e &&
      16752 !== e &&
      15019 !== e &&
      23152 !== e &&
      28933 !== e &&
      22633 !== e &&
      (Net.dX ||
        (29955 !== e &&
          25443 !== e &&
          23372 !== e &&
          21086 !== e &&
          17927 !== e &&
          25089 !== e &&
          19097 !== e &&
          23872 !== e &&
          18779 !== e)) &&
      ((a = 0 < Object.keys(i).length), Net.uX) &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Net",
        22,
        Net.jX.get(e),
        ["SeqNo", t],
        ["RpcId", N],
        ["UpStreamSeqNo", Net.hX],
        ["DownStream", Net.lX],
        ["msg", a ? this.tY(i) : ""],
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
  (Net.Moa = void 0),
  (Net.yoa = ""),
  (Net.Ioa = 0),
  (Net.Toa = 0),
  (Net.IX = void 0),
  (Net.Eoa = 0),
  (Net.Soa = 0),
  (Net.sX = new Map()),
  (Net.WX = new Set()),
  (Net.RX = new List_1.default(SendMessageCache.NullMessageCache)),
  (Net.XX = new Map()),
  (Net.jX = new Map()),
  (Net.HX = new Map()),
  (Net.wX = Stats_1.Stat.Create("Net.Call")),
  (Net.NX = Stats_1.Stat.Create("Net.SendInternal")),
  (Net.MX = new Set()),
  (Net.aX = 0),
  (Net.hX = 0),
  (Net.lX = 0),
  (Net.KX = 0),
  (Net.aha = 0),
  (Net.nha = !1),
  (Net.uX = !1),
  (Net.cX = !1),
  (Net.mX = !1),
  (Net.dX = !1),
  (Net.YK = void 0),
  (Net.JK = void 0),
  (Net.zK = void 0),
  (Net.$K = void 0),
  (Net.rpa = void 0),
  (Net.fIo = new List_1.default(new CallbackQueueItem(() => {}, 103, !0))),
  (Net._ul = 0),
  (Net.hul = !1),
  (Net.fX = () => 0 === _a.fIo.Count || !(!_a.hul || 0 !== _a._ul)),
  (Net.pX = () => {
    if (!Net.ipa()) {
      let e = _a.fIo.GetHeadNextNode();
      for (; e; ) {
        if (!_a.hul || !e.Element?.IsPaused())
          return (
            (Net.rpa = e.Element),
            _a.fIo.RemoveNode(e),
            (_a._ul -= e.Element?.IsPaused() ? 0 : 1),
            void Net.ipa()
          );
        e = e.Next;
      }
    }
  }),
  (Net.npa = Stats_1.Stat.Create("Net.AddRequestMask")),
  (Net.apa = Stats_1.Stat.Create("Net.RemoveRequestMask")),
  (Net.kX = Stats_1.Stat.Create("Net.Encode")),
  (Net.voa = () => {
    Net.gX?.SetKcpStream(!0), _a.Doa(0);
  }),
  (Net.Doa = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 30, "Kcp连接结果:", ["result", e]),
      TimerSystem_1.TimerSystem.Remove(Net.IX),
      (Net.IX = void 0),
      1 === e && Net.Eoa < Net.Soa
        ? (Net.Eoa++, Net._X(0), Net.Loa())
        : (Net.Moa && (Net.Moa(e), (Net.Moa = void 0)),
          Net._X(0 === e ? 2 : 0));
  }),
  (Net.nX = (e, t, N, i, a) => {
    switch (e) {
      case 1:
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Net",
            30,
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
            30,
            "DecryptError",
            ["Result", t],
            ["Type", N],
            ["RpcId", i],
            ["MessageId", a],
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
