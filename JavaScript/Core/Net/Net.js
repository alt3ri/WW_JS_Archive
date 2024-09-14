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
  Queue_1 = require("../Container/Queue"),
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
      (this.Zqi = 0),
      (this.Zqi = e);
  }
  get IsJobFinished() {
    return this.t6 >= CallbackStatus.MaxCallbackCount
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 31, "分帧回调次数超过最大值", [
            "MessageId",
            this.Zqi,
          ]),
        !0)
      : this.IsFinished;
  }
  get CallbackCount() {
    return this.t6;
  }
  IncrementCount() {
    this.t6++;
  }
}
(exports.CallbackStatus = CallbackStatus).MaxCallbackCount = 180;
class CallbackQueueItem {
  constructor(e, t) {
    (this.Callback = void 0),
      (this.Status = void 0),
      (this.Callback = e),
      (this.Status = new CallbackStatus(t));
  }
  DoCallback() {
    return this.Callback?.(this.Status), this.Status.IsJobFinished;
  }
}
class SendMessageCache {
  constructor(e, t, N, a, i) {
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
      (this.EncodeMessage = a),
      (this.Handle = i),
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
  static WWa() {
    3 !== Net.aha && Net.lha(4), (Net.aha = 4), Net.sha();
  }
  static IsCallbackPaused() {
    return Net.epa;
  }
  static PauseAllCallback() {
    (Net.epa = !0),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Net", 31, "暂停消息处理");
  }
  static ResumeAllCallback() {
    (Net.epa = !1),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Net", 31, "恢复消息处理");
  }
  static lha(e) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Net",
        31,
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
    var e = new UE.KuroKcpClient(),
      e =
        (1 === Info_1.Info.PlatformType && (e.UseNewResolveIp = !1),
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
  static InitCanTimerOutMessage(e) {
    Net.MX.clear();
    for (const t of e) Net.MX.add(t);
  }
  static AddNotPauseMessage(e) {
    Net.S$a.add(e);
  }
  static ipa() {
    return !!Net.rpa && (Net.rpa.DoCallback() && (Net.rpa = void 0), !0);
  }
  static opa(e) {
    return 0 !== e.Size && ((Net.rpa = e.Pop()), Net.ipa());
  }
  static Connect(e, t, N, a, i) {
    Net.EX()
      ? ((Net.Moa = N),
        (Net.Soa = i),
        (Net.Eoa = 0),
        (Net.yoa = e),
        (Net.Ioa = t),
        (Net.Toa = a),
        Net.Loa())
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 9, "已经连接或者正在连接中."),
        N(3));
  }
  static async ConnectAsync(e, N, a, i) {
    return new Promise((t) => {
      Net.Connect(
        e,
        N,
        (e) => {
          t(e);
        },
        a,
        i,
      );
    });
  }
  static Disconnect(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 31, "断开连接", ["Reason", e]),
      Net._X(0),
      Net.Moa && Net.Doa(2),
      (Net.aha = 0 === e ? 5 : 0),
      1 !== e && (Net.LX(), (Net.aX = 0), (Net.hX = 0), Net.sha());
  }
  static SetDynamicProtoKey(e, t) {
    e = s2cEncryptType[e];
    Net.hha();
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
    var a, i, s;
    return N
      ? (([a, i, , s] = Net.gX
          .GetDebugString(N.EncodeMessage, ";", N.MessageId, N.SeqNo)
          .split(";")),
        [N.MessageId, Number(a), i, s])
      : [0, 0, "", ""];
  }
  static GetUnVerifiedMessageCount() {
    return Net.RX.Count;
  }
  static ReconnectSuccessAndReSend(N) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 31, "重连流程,", ["lastReceived", N]);
    var a = Net.RX.Count;
    if (0 < a) {
      let e = Net.RX.GetHeadNextNode(),
        t = !1;
      for (; e; ) {
        var i = e.Element.SeqNo;
        if (N <= i) {
          t = i === N;
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
          ["beforeCount", a],
          ["afterCount", Net.RX.Count],
          ["find SeqNo", e.Element.SeqNo],
        );
    }
    if (0 < Net.RX.Count) {
      let e = 0,
        t = 0,
        N = 0,
        a = Net.RX.GetHeadNextNode();
      for (; a; ) {
        var s,
          r,
          o = a.Element,
          n = o.MessageId;
        0 == (3 & NetDefine_1.protoConfig[n]) ||
          (4 != (r = void 0 !== (s = o.RpcId) ? 1 : 4) && !o.Handle) ||
          (e++,
          (t = o.SeqNo),
          (N = n),
          Net.UX(r, o.SeqNo, s, n, o.EncodeMessage)),
          (a = a.Next);
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
    Net.WWa();
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
  static Call(e, t, N, a = 0) {
    var i;
    !Net.xX(e) && Net.AX(e)
      ? (Net.wX.Start(),
        (i = Net.BX()),
        (t = Net.PX(1, e, t, i, N)),
        Net.bX(e, t),
        0 < a && Net.qX(a, t.Element),
        4 == (4 & NetDefine_1.protoConfig[e]) &&
          (Net.npa.Start(), Net.JK?.(i), Net.npa.Stop()),
        Net.wX.Stop())
      : N(void 0, void 0);
  }
  static async CallAsync(e, t, a = 0) {
    return new Promise((N) => {
      Net.Call(
        e,
        t,
        (e, t) => {
          N(e);
        },
        a,
      );
    });
  }
  static PX(e, t, N, a, i) {
    Net.NX.Start();
    var s = Net.OX(),
      r = (Net.kX.Start(), NetDefine_1.messageDefine[t].encode(N).finish()),
      i =
        (Net.kX.Stop(),
        30720 < r.length &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Net",
            31,
            "消息过大",
            ["message", t],
            ["length", r.length],
          ),
        new SendMessageCache(a, s, t, r, i)),
      i = Net.FX(i);
    return Net.VX(t) || Net.UX(e, s, a, t, r, N), Net.NX.Stop(), i;
  }
  static qX(e, N) {
    const a = N.MessageId;
    var t;
    Net.MX.has(a)
      ? ((t = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Net",
              31,
              "协议超时",
              ["message", a],
              ["timeout", e],
            );
          var t = N.Handle;
          if ((N.ClearHandle(), (N.TimeoutHandle = void 0), t)) {
            let e = void 0;
            try {
              Net.cX && (e = Net.HX.get(a))?.Start(), t(void 0, void 0);
            } catch (e) {
              e instanceof Error
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.ErrorWithStack(
                    "Net",
                    31,
                    "callback执行异常",
                    e,
                    ["requestId", a],
                    ["error", e.message],
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Net",
                    31,
                    "callback执行异常",
                    ["requestId", a],
                    ["error", e],
                  );
            } finally {
              e?.Stop();
            }
          }
        }, e)),
        (N.TimeoutHandle = t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 31, "该协议未配置可超时", ["message", a]);
  }
  static CX(e, t, N) {
    if (Net.uX || Net.cX)
      for (const s of e) {
        var a = s,
          i = t + `.(${a})`;
        Net.uX && Net.jX.set(a, i),
          N && Net.cX && ((i = Stats_1.Stat.Create(i)), Net.HX.set(a, i));
      }
  }
  static xX(e) {
    return (
      !!Net.WX.has(e) &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 31, "Request重复发送。", ["message", e]),
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
          Log_1.Log.Error("Net", 31, "上行协议时机不对，未发送", [
            "messageId",
            e,
          ]),
        1)
      );
    if (!Net.YX(e) && !Net.DX())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 22, "上行协议时机不对，未发送", [
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
            9,
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
        Log_1.Log.Warn("Net", 31, "下行包序号不对", ["old", t], ["new", e]),
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
  static spa(e) {
    var t = e.Element,
      N = t.MessageId;
    Net.XX.delete(t.RpcId),
      8 == (8 & NetDefine_1.protoConfig[N]) && Net.WX.delete(N),
      105 === N && Net.WWa(),
      Net._ha(N) ||
        (Net.RX.RemoveNodesBeforeThis(e, !0),
        Net.uX &&
          ENABLE_MESSAGE_LOG &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Net",
            31,
            "DeleteMessage",
            ["RpcId", t.RpcId],
            ["SeqNo", t.SeqNo],
            ["MsgName", Net.jX.get(N)],
          ));
  }
  static YX(e) {
    return 111 === e;
  }
  static JX(e, t, N, a, i = void 0) {
    var s,
      r,
      a = new Uint8Array(a),
      a = new Uint8Array(a);
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
      i
        ? (o = Net.XX.get(i))
          ? (Net.spa(o),
            (s = o.Element),
            (r = l - s.SendTimeMs),
            (g = s.MessageId),
            NetInfo_1.NetInfo.SetRttMs(r),
            300 < r &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Net",
                31,
                "RTT过高",
                ["requestId", g],
                ["rpcId", i],
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
              ["rpcId", i],
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
          (d = !this.S$a.has(c))),
      3 === e)
    ) {
      const v = `[异常信息:${StringUtils_1.StringUtils.Uint8ArrayToString(a)}]`,
        S = _;
      _ = () => {
        Net.YK?.(
          i,
          N,
          g,
          o
            ? NetDefine_1.messageDefine[g].decode(o.Element.EncodeMessage)
            : void 0,
          v,
        ),
          S?.(void 0, void 0);
      };
    } else
      (n = NetDefine_1.messageDefine[c].decode(a)) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 1, "协议解析异常", ["messageId", c]));
    n && Net.uX && Net.ZX(c, t, i, n);
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
            31,
            "callback exceeds limit",
            ["delay", N],
            ["msg", Net.jX.get(c)],
          );
      try {
        0 === e.CallbackCount &&
          g &&
          4 == (4 & NetDefine_1.protoConfig[g]) &&
          (Net.apa.Start(), Net.zK?.(i), Net.apa.Stop()),
          _?.(n, e);
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Net",
              31,
              "callback执行异常",
              e,
              ["messageId", c],
              ["error", e.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Net",
              31,
              "callback执行异常",
              ["messageId", c],
              ["error", e],
            );
      } finally {
        e.IncrementCount(), t?.Stop();
      }
    };
    if (Net.UseBudget)
      (!d && this.epa ? this.hpa : this.lpa).Push(new CallbackQueueItem(u, c));
    else for (var L = new CallbackStatus(c); u(L), !L.IsJobFinished; );
    return !0;
  }
  static UX(e, t, N, a, i, s = void 0) {
    return (
      Net.uX &&
        ((s = s || NetDefine_1.messageDefine[a].decode(i)), Net.ZX(a, t, N, s)),
      Net.gX.SendM(e, t, N, a, i, 0 == (32 & NetDefine_1.protoConfig[a]))
    );
  }
  static LX() {
    Net.WX.clear(), Net.XX.clear(), Net.RX.RemoveAllNodeWithoutHead();
  }
  static ZX(e, t, N, a) {
    var i;
    (Net.mX || (1650 !== e && 1651 !== e && 21495 !== e)) &&
      28450 !== e &&
      19482 !== e &&
      17865 !== e &&
      26301 !== e &&
      26563 !== e &&
      22636 !== e &&
      22047 !== e &&
      18582 !== e &&
      24114 !== e &&
      (Net.dX ||
        (26617 !== e &&
          16764 !== e &&
          23407 !== e &&
          23144 !== e &&
          16540 !== e &&
          29891 !== e &&
          15879 !== e &&
          15830 !== e &&
          16028 !== e)) &&
      ((i = 0 < Object.keys(a).length), Net.uX) &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Net",
        23,
        Net.jX.get(e),
        ["SeqNo", t],
        ["RpcId", N],
        ["UpStreamSeqNo", Net.hX],
        ["DownStream", Net.lX],
        ["msg", i ? this.tY(a) : ""],
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
  (Net.lpa = new Queue_1.Queue(256)),
  (Net.hpa = new Queue_1.Queue(32)),
  (Net.epa = !1),
  (Net.S$a = new Set()),
  (Net.fX = () =>
    void 0 === Net.rpa && 0 === _a.hpa.Size && (_a.epa || 0 === _a.lpa.Size)),
  (Net.pX = () => {
    Net.ipa() || Net.opa(Net.hpa) || Net.epa || Net.opa(Net.lpa);
  }),
  (Net.npa = Stats_1.Stat.Create("Net.AddRequestMask")),
  (Net.apa = Stats_1.Stat.Create("Net.RemoveRequestMask")),
  (Net.kX = Stats_1.Stat.Create("Net.Encode")),
  (Net.voa = () => {
    Net.gX?.SetKcpStream(!0), _a.Doa(0);
  }),
  (Net.Doa = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Net", 31, "Kcp连接结果:", ["result", e]),
      TimerSystem_1.TimerSystem.Remove(Net.IX),
      (Net.IX = void 0),
      1 === e && Net.Eoa < Net.Soa
        ? (Net.Eoa++, Net._X(0), Net.Loa())
        : (Net.Moa && (Net.Moa(e), (Net.Moa = void 0)),
          Net._X(0 === e ? 2 : 0));
  }),
  (Net.nX = (e, t, N, a, i) => {
    switch (e) {
      case 1:
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Net",
            31,
            "SocketError",
            ["errorCode", t],
            ["Size", N],
            ["Read", a],
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
            ["RpcId", a],
            ["MessageId", i],
          );
    }
  }),
  (Net.iX = (e, t, N, a) => {
    Net.JX(2, e, N, a, t);
  }),
  (Net.oX = (e, t, N, a) => {
    Net.JX(3, e, N, a, t);
  }),
  (Net.rX = (e, t, N) => {
    Net.JX(4, e, t, N);
  });
//# sourceMappingURL=Net.js.map
