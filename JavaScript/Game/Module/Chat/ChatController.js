"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ChatDefine_1 = require("./ChatDefine"),
  PrivateChatRoom_1 = require("./PrivateChatRoom");
class ChatController extends UiControllerBase_1.UiControllerBase {
  static OnClear() {
    return (
      this.Lda &&
        TimerSystem_1.TimerSystem.Has(this.Lda) &&
        (TimerSystem_1.TimerSystem.Remove(this.Lda), (this.Lda = void 0)),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectChatFriend,
      this.LEt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterTeam,
        this.Cze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveTeam,
        this.vze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.pze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.Mze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveFriend,
        this.DEt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.REt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetFriendInitData,
        this.UEt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
        this.AEt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectChatFriend,
      this.LEt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterTeam,
        this.Cze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveTeam,
        this.vze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.pze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.Mze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveFriend,
        this.DEt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.REt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetFriendInitData,
        this.UEt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
        this.AEt,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(14304, this.PEt),
      Net_1.Net.Register(27828, this.xEt),
      Net_1.Net.Register(22394, this.wEt),
      Net_1.Net.Register(5138, this.BEt),
      Net_1.Net.Register(14312, this.bEt),
      Net_1.Net.Register(16575, this.qEt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(14304),
      Net_1.Net.UnRegister(27828),
      Net_1.Net.UnRegister(22394),
      Net_1.Net.UnRegister(5138),
      Net_1.Net.UnRegister(14312),
      Net_1.Net.UnRegister(16575);
  }
  static PrivateChatRequest(l, e, t) {
    t ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Chat", 8, "PrivateChatRequest 私聊对象玩家Id不存在", [
          "targetPlayerId",
          t,
        ]));
    var o = new Protocol_1.Aki.Protocol.qzn();
    (o.l8n = l),
      (o.y8n = e),
      (o.I8n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "PrivateChatRequest 客户端请求私聊聊天", [
          "request",
          o,
        ]);
    Net_1.Net.Call(6382, Protocol_1.Aki.Protocol.qzn.create(o), (e) => {
      var t,
        o,
        r,
        a,
        n = ModelManager_1.ModelManager.ChatModel,
        i = e.I8n,
        _ = e.O4n;
      _ !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            _,
            8608,
          )
        : ((_ = e.U8n),
          (t = e.ELs),
          (o = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
          (r = TimeUtil_1.TimeUtil.GetServerTime()),
          (a = (i = n.GetPrivateChatRoom(i)).GetLastTimeStamp()),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Chat",
              8,
              "PrivateChatResponse 私聊聊天服务端回应",
              ["response", e],
            ),
          n.AddChatContent(
            i,
            _,
            o,
            t,
            l,
            Protocol_1.Aki.Protocol.PFs.Proto_None,
            !1,
            r,
            a,
          ),
          (e = ModelManager_1.ModelManager.FriendModel?.GetFriendById(o)) &&
            n.RefreshChatPlayerData(o, e.PlayerHeadPhoto, e.PlayerName),
          ChatController.PrivateChatOperateRequest(
            Protocol_1.Aki.Protocol.LFs.Proto_ReadMsg,
            0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshChatRowData,
            !1,
          ));
    });
  }
  static ChannelChatRequest(e, t, o) {
    var r = new Protocol_1.Aki.Protocol.Xzn();
    (r.T8n = Protocol_1.Aki.Protocol.RFs.Proto_Team),
      (r.L8n = o),
      (r.l8n = e),
      (r.y8n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "ChannelChatRequest 客户端请求队伍聊天", [
          "request",
          r,
        ]);
    Net_1.Net.Call(6896, Protocol_1.Aki.Protocol.Xzn.create(r), (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            8198,
          )
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Chat", 8, "ChannelChatRequest 队伍聊天服务端回应", [
            "response",
            e,
          ]);
    });
  }
  static PrivateChatHistoryRequest(a) {
    var e = new Protocol_1.Aki.Protocol.kzn();
    (e.I8n = a),
      (this.IsInRequestHistory = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatHistoryRequest 客户端请求最近的私聊记录",
          ["request", e],
        );
    Net_1.Net.Call(25605, Protocol_1.Aki.Protocol.kzn.create(e), (e) => {
      var t, o, r;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatHistoryResponse 私聊聊天历史服务端回应",
          ["response", e],
        ),
        e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
          ((ChatController.IsInRequestHistory = !1),
          (t = ModelManager_1.ModelManager.ChatModel),
          (o = (e = e.S5n).I8n)) &&
          (o = t.GetPrivateChatRoom(o)) &&
          (r = e.ILs) &&
          !(r.length <= 0) &&
          (t.AddPrivateHistoryChatContent(o, e.ILs),
          ChatController.PrivateChatOperateRequest(
            Protocol_1.Aki.Protocol.LFs.Proto_OpenChat,
            a,
          ));
    });
  }
  static ChatMutePlayerRequest(e, t) {
    var o = new Protocol_1.Aki.Protocol.Hzn();
    (o.I8n = e),
      (o.D8n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "ChatMutePlayerRequest 客户端请求屏蔽", [
          "request",
          o,
        ]),
      Net_1.Net.Call(1648, Protocol_1.Aki.Protocol.Hzn.create(o), this.NEt),
      t
        ? ModelManager_1.ModelManager.ChatModel.AddMutePlayer(e)
        : ModelManager_1.ModelManager.ChatModel.RemoveMutePlayer(e);
  }
  static ChatReportPush(e) {}
  static PrivateChatOperateRequest(e, t) {
    var o = new Protocol_1.Aki.Protocol.Wzn();
    (o.O5n = e),
      (o.A8n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatOperateRequest 客户端请求聊天操作",
          ["request", o],
        ),
      Net_1.Net.Call(25996, Protocol_1.Aki.Protocol.Wzn.create(o), this.OEt),
      e === Protocol_1.Aki.Protocol.LFs.Proto_CloseChat &&
        ModelManager_1.ModelManager.ChatModel.ClosePrivateChatRoom(t);
  }
  static OpenFriendChat(e) {
    ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e),
      UiManager_1.UiManager.OpenView("ChatView");
  }
  static TryActiveDeleteFriendTips(e) {
    var t;
    UiManager_1.UiManager.IsViewShow("ChatView") &&
      (t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom()) &&
      t instanceof PrivateChatRoom_1.PrivateChatRoom &&
      t.GetTargetPlayerId() === e &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "DeleteFriendText",
      );
  }
  static Rda() {
    var e = new Protocol_1.Aki.Protocol.Vzn();
    Net_1.Net.Call(6805, e, (e) => {
      e.Tda ||
        (this.Lda && TimerSystem_1.TimerSystem.Has(this.Lda)) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            8,
            "PrivateChatDataResponse 服务端加载聊天数据失败，等待一段时间后重新请求",
            ["DelayTime", ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME],
          ),
        (this.Lda = TimerSystem_1.TimerSystem.Delay(
          this.Dda,
          ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME,
        )));
    });
  }
}
(exports.ChatController = ChatController),
  ((_a = ChatController).IsInRequestHistory = !1),
  (ChatController.Lda = void 0),
  (ChatController.REt = () => {
    UiManager_1.UiManager.IsViewShow("ChatView") &&
      UiManager_1.UiManager.CloseView("ChatView");
  }),
  (ChatController.LEt = (e) => {
    ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e);
  }),
  (ChatController.FQe = (e) => {
    "ChatView" === e &&
      (ModelManager_1.ModelManager.ChatModel.IsOpenedChatView = !0);
  }),
  (ChatController.pze = () => {
    ModelManager_1.ModelManager.ChatModel.GetWorldChatRoom() ||
      ModelManager_1.ModelManager.ChatModel.SetWorldChatRoom(
        ModelManager_1.ModelManager.ChatModel.NewWorldChatRoom(),
      );
  }),
  (ChatController.Mze = () => {
    var e = ModelManager_1.ModelManager.ChatModel,
      t =
        (e.SetWorldChatRoom(void 0),
        e.SetTeamChatRowDataVisible(!1),
        e.GetWorldChatRoom());
    t && e.SetChatRoomRedDot(t, !1),
      UiManager_1.UiManager.IsViewShow("ChatView") &&
        UiManager_1.UiManager.CloseView("ChatView");
  }),
  (ChatController.Cze = () => {
    var e = ModelManager_1.ModelManager.ChatModel;
    e.SetTeamChatRoom(e.NewTeamChatRoom());
  }),
  (ChatController.vze = () => {
    var e = ModelManager_1.ModelManager.ChatModel,
      t =
        (e.SetTeamChatRoom(void 0),
        e.SetTeamChatRowDataVisible(!1),
        e.GetTeamChatRoom());
    t && e.SetChatRoomRedDot(t, !1),
      UiManager_1.UiManager.IsViewShow("ChatView") &&
        UiManager_1.UiManager.CloseView("ChatView");
  }),
  (ChatController.DEt = (e) => {
    ModelManager_1.ModelManager.ChatModel.RemovePrivateChatRoom(e);
  }),
  (ChatController.PEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateMessageNotify 私聊聊天服务端通知", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.ChatModel,
      e = e.yLs,
      o = e.R8n,
      r = t.TryGetPrivateChatRoom(o),
      a = e.U8n,
      n = Number(MathUtils_1.MathUtils.LongToBigInt(e.x8n)),
      n = Number(n),
      i = e.y8n,
      _ = e.l8n,
      l = ModelManager_1.ModelManager.FriendModel?.GetFriendById(o);
    l && t.RefreshChatPlayerData(o, l.PlayerHeadPhoto, l.PlayerName),
      r.GetIsOpen()
        ? ((l = e.P8n),
          (e = r.GetLastTimeStamp()),
          t.AddChatContent(
            r,
            a,
            o,
            i,
            _,
            Protocol_1.Aki.Protocol.PFs.Proto_None,
            l,
            n,
            e,
          ))
        : (t.RequestOpenPrivateChatRoom(r),
          t.AddChatRowData(o, i, _, !1, 1, n, o)),
      ChatController.PrivateChatOperateRequest(
        Protocol_1.Aki.Protocol.LFs.Proto_ReadMsg,
        0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !1,
      );
  }),
  (ChatController.xEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChannelChatMessageNotify 队伍聊天服务端通知", [
        "notify",
        e,
      ]);
    var t,
      o,
      r,
      a,
      n,
      i,
      _,
      l = ModelManager_1.ModelManager.ChatModel;
    let s = void 0,
      C = void 0;
    (C =
      e.L8n === Protocol_1.Aki.Protocol.DFs.Proto_MatchTeam
        ? ((s = l.GetTeamChatRoom()), "TeamMatch")
        : ((s = l.GetWorldChatRoom()), "TeamWorld")),
      s &&
        ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        (o = (e = e.ALs).PLs),
        (r = e.y8n),
        (a = e.l8n),
        (n = e.xLs),
        (i = s.GetLastTimeStamp()),
        (_ = e.wLs),
        (e = e.ULs),
        l.AddChatContent(s, C, o, r, a, n, !0, t, i, _, e),
        l.RefreshChatPlayerData(o, e, _),
        n !== Protocol_1.Aki.Protocol.PFs.Proto_EnterTeam) &&
        n !== Protocol_1.Aki.Protocol.PFs.Proto_ExitTeam &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshChatRowData,
          !1,
        );
  }),
  (ChatController.wEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "PrivateChatHistoryNotify 服务端推送最近的私人聊天历史记录",
      );
    var t = ModelManager_1.ModelManager.ChatModel;
    t.RemoveChatRowDataByChatRoomType(1);
    for (const C of e.RLs) {
      var o = C.I8n,
        r = t.TryGetPrivateChatRoom(o),
        a = C.ILs;
      r.Reset(), t.AddPrivateHistoryChatContent(r, a);
      for (const h of a) {
        var n = h.R8n,
          i = h.y8n,
          _ = h.l8n,
          l = h.P8n,
          s = Number(MathUtils_1.MathUtils.LongToBigInt(h.x8n));
        l && r && t.SetChatRoomRedDot(r, !0),
          t.AddChatRowData(n, i, _, l, 1, s, o, void 0, void 0, !1);
      }
    }
    t.SortChatRowData(), t.ClampChatRowDataListLength();
    for (const v of t.GetChatRowDataList())
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "[ChatDebug]PrivateChatHistoryNotify---打印最终聊天数据",
          ["Content", v.Content],
          ["TimeStamp", v.TimeStamp],
          ["IsOfflineMassage", v.IsOfflineMassage],
        );
    ChatController.PrivateChatOperateRequest(
      Protocol_1.Aki.Protocol.LFs.Proto_ReadMsg,
      0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !0,
      );
  }),
  (ChatController.BEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "ChannelChatHistoryNotify 服务端推送最近的队伍聊天历史记录",
      );
    var t = ModelManager_1.ModelManager.ChatModel;
    let o = void 0,
      r = void 0;
    if (
      (t.RemoveChatRowDataByChatRoomType(2, 3),
      (o =
        e.L8n === Protocol_1.Aki.Protocol.DFs.Proto_MatchTeam
          ? ((r = 2), t.GetTeamChatRoom())
          : ((r = 3), t.GetWorldChatRoom())))
    ) {
      e = e.BLs;
      t.AddTeamHistoryChatContent(o, e);
      for (const h of e) {
        var a = h.PLs,
          n = h.y8n,
          i = h.l8n,
          _ = h.xLs,
          l = h.wLs,
          s = h.ULs,
          C = Number(MathUtils_1.MathUtils.LongToBigInt(h.bLs));
        t.RefreshChatPlayerData(a, s, l),
          _ === Protocol_1.Aki.Protocol.PFs.Proto_None &&
            t.AddChatRowData(a, n, i, !0, r, C, 0, l, s);
      }
      t.SortChatRowData(), t.ClampChatRowDataListLength();
      for (const v of t.GetChatRowDataList())
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            8,
            "[ChatDebug]ChannelChatHistoryNotify---打印最终聊天数据",
            ["Content", v.Content],
            ["TimeStamp", v.TimeStamp],
            ["IsOfflineMassage", v.IsOfflineMassage],
          );
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !0,
      );
    }
  }),
  (ChatController.bEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChatMutePlayerListNotify 服务端通知屏蔽列表", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.ChatModel;
    t.ClearAllMutePlayer();
    for (const o of e.q5n) t.AddMutePlayer(o);
  }),
  (ChatController.NEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChatMutePlayerResponse 服务端屏蔽回应", [
        "response",
        e,
      ]);
    e = e.DLs;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.ChatModel;
      for (const o of e) t.RemoveMutePlayer(o);
    }
  }),
  (ChatController.qEt = (e) => {
    var t = MathUtils_1.MathUtils.LongToBigInt(e.LSs),
      t = TimeUtil_1.TimeUtil.GetCountDownData(
        Number(t) - TimeUtil_1.TimeUtil.GetServerTime(),
      );
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "BanChatText" + e.RSs,
      t.CountDownText,
    );
  }),
  (ChatController.OEt = (e) => {
    e.O4n !== Protocol_1.Aki.Protocol.O4n.Proto_ErrBanChatDefault &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateChatOperateResponse 聊天操作回应", [
        "response",
        e,
      ]);
  }),
  (ChatController.UEt = () => {
    _a.Rda();
  }),
  (ChatController.Dda = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateChatDataResponse 开始重新请求"),
      _a.Rda(),
      (_a.Lda = void 0);
  }),
  (ChatController.AEt = (e) => {
    var t = e.q5n,
      o = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t);
    if (o) {
      switch (e.HDs) {
        case Protocol_1.Aki.Protocol.X8s.Proto_Head:
          o.SetPlayerIcon(e.B8n);
          break;
        case Protocol_1.Aki.Protocol.X8s.w8n:
          o.SetPlayerName(e.b8n);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        t,
      );
    }
  });
//# sourceMappingURL=ChatController.js.map
