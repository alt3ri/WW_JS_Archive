"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
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
      this.JFa &&
        TimerSystem_1.TimerSystem.Has(this.JFa) &&
        (TimerSystem_1.TimerSystem.Remove(this.JFa), (this.JFa = void 0)),
      this.u3a(),
      !0
    );
  }
  static u3a() {
    this.c3a &&
      TimerSystem_1.TimerSystem.Has(this.c3a) &&
      (TimerSystem_1.TimerSystem.Remove(this.c3a), (this.c3a = void 0));
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
    Net_1.Net.Register(22071, this.PEt),
      Net_1.Net.Register(28363, this.xEt),
      Net_1.Net.Register(24204, this.wEt),
      Net_1.Net.Register(18087, this.BEt),
      Net_1.Net.Register(15364, this.bEt),
      Net_1.Net.Register(16029, this.qEt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22071),
      Net_1.Net.UnRegister(28363),
      Net_1.Net.UnRegister(24204),
      Net_1.Net.UnRegister(18087),
      Net_1.Net.UnRegister(15364),
      Net_1.Net.UnRegister(16029);
  }
  static PrivateChatRequest(s, t, a) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      (e) => {
        1 === e
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "CommunicationRectricted",
              ),
            ),
            this.bNa(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 28, "PrivateChatRequest 通信受限"))
          : (a ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Chat",
                  8,
                  "PrivateChatRequest 私聊对象玩家Id不存在",
                  ["targetPlayerId", a],
                )),
            ((e = new Protocol_1.Aki.Protocol.$zn()).p8n = s),
            (e.P8n = t),
            (e.B8n = a),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Chat",
                8,
                "PrivateChatRequest 客户端请求私聊聊天",
                ["request", e],
              ),
            Net_1.Net.Call(
              25220,
              Protocol_1.Aki.Protocol.$zn.create(e),
              (e) => {
                var t,
                  a,
                  o,
                  r,
                  n = ModelManager_1.ModelManager.ChatModel,
                  i = e.B8n,
                  _ = e.Q4n;
                _ !== Protocol_1.Aki.Protocol.Q4n.KRs
                  ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      _,
                      27775,
                    )
                  : ((_ = e.O8n),
                    (t = e.ALs),
                    (a = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
                    (o = TimeUtil_1.TimeUtil.GetServerTime()),
                    (r = (i = n.GetPrivateChatRoom(i)).GetLastTimeStamp()),
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
                      a,
                      t,
                      s,
                      Protocol_1.Aki.Protocol.GFs.Proto_None,
                      !1,
                      o,
                      r,
                    ),
                    (e =
                      ModelManager_1.ModelManager.FriendModel?.GetFriendById(
                        a,
                      )) &&
                      n.RefreshChatPlayerData(
                        a,
                        e.PlayerHeadPhoto,
                        e.PlayerName,
                      ),
                    ChatController.PrivateChatOperateRequest(
                      Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg,
                      0,
                    ),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.OnRefreshChatRowData,
                      !1,
                    ));
              },
            ));
      },
    );
  }
  static async bNa() {
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      6,
    )) &&
      (this.u3a(),
      (this.c3a = TimerSystem_1.TimerSystem.Forever(() => {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetMessageBoxCurrentState(
          (e) => {
            3 === e &&
              (this.u3a(),
              PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().TerminateMessageBox());
          },
        );
      }, 500)));
  }
  static ChannelChatRequest(t, a, o) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      (e) => {
        1 === e
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "CommunicationRectricted",
              ),
            ),
            this.bNa(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 28, "PrivateChatRequest 通信受限"))
          : (((e = new Protocol_1.Aki.Protocol.iZn()).w8n =
              Protocol_1.Aki.Protocol.bFs.Proto_Team),
            (e.b8n = o),
            (e.p8n = t),
            (e.P8n = a),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Chat",
                8,
                "ChannelChatRequest 客户端请求队伍聊天",
                ["request", e],
              ),
            Net_1.Net.Call(
              19345,
              Protocol_1.Aki.Protocol.iZn.create(e),
              (e) => {
                e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                  ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      e.Q4n,
                      18010,
                    )
                  : Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Chat",
                      8,
                      "ChannelChatRequest 队伍聊天服务端回应",
                      ["response", e],
                    );
              },
            ));
      },
    );
  }
  static async Y$a(a) {
    var o =
      await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetTargetRelation(
        [a.qLs.Wih],
      );
    if (5 !== o.get(a.qLs.Wih)) {
      var r,
        n,
        i,
        _,
        s,
        l,
        h,
        C,
        g,
        o = ModelManager_1.ModelManager.ChatModel;
      let e = void 0,
        t = void 0;
      (t =
        a.b8n === Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam
          ? ((e = o.GetTeamChatRoom()), "TeamMatch")
          : ((e = o.GetWorldChatRoom()), "TeamWorld")),
        e &&
          ((r = TimeUtil_1.TimeUtil.GetServerTime()),
          (n = (a = a.qLs).GLs),
          (i = a.P8n),
          (_ = a.p8n),
          (s = a.NLs),
          (l = e.GetLastTimeStamp()),
          (h = a.kLs),
          (C = a.OLs),
          (g = a.Kih),
          (a = a.Wih),
          o.AddChatContent(e, t, n, i, _, s, !0, r, l, h, C, g, a),
          o.RefreshChatPlayerData(n, C, h),
          s !== Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam) &&
          s !== Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshChatRowData,
            !1,
          );
    }
  }
  static PrivateChatHistoryRequest(o) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      (e) => {
        1 === e
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Chat", 28, "PrivateChatHistoryRequest 通信受限")
          : (((e = new Protocol_1.Aki.Protocol.Wzn()).B8n = o),
            (this.IsInRequestHistory = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Chat",
                8,
                "PrivateChatHistoryRequest 客户端请求最近的私聊记录",
                ["request", e],
              ),
            Net_1.Net.Call(
              27759,
              Protocol_1.Aki.Protocol.Wzn.create(e),
              (e) => {
                var t, a;
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Chat",
                    8,
                    "PrivateChatHistoryResponse 私聊聊天历史服务端回应",
                    ["response", e],
                  ),
                  e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
                    ((ChatController.IsInRequestHistory = !1),
                    (t = ModelManager_1.ModelManager.ChatModel),
                    (a = (e = e.R5n).B8n)) &&
                    (t = t.GetPrivateChatRoom(a)) &&
                    (a = e.ULs) &&
                    !(a.length <= 0) &&
                    this.E$a(t, e.ULs, o);
              },
            ));
      },
    );
  }
  static async E$a(e, t, a) {
    var o =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser(),
      r = [];
    for (const n of t) (o && o.get(n.Wih)) || r.push(n);
    ModelManager_1.ModelManager.ChatModel.AddPrivateHistoryChatContent(e, r),
      ChatController.PrivateChatOperateRequest(
        Protocol_1.Aki.Protocol.xFs.Proto_OpenChat,
        a,
      );
  }
  static async I$a(e) {
    var t =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser(),
      a = ModelManager_1.ModelManager.ChatModel,
      o = (a.RemoveChatRowDataByChatRoomType(1), []);
    for (const C of e.bLs) {
      var r = C.B8n,
        n = a.TryGetPrivateChatRoom(r),
        o = [];
      for (const g of C.ULs) (t && t.get(g.Wih)) || o.push(g);
      n.Reset(), a.AddPrivateHistoryChatContent(n, o);
      for (const v of o) {
        var i = v.N8n,
          _ = v.P8n,
          s = v.p8n,
          l = v.F8n,
          h = Number(MathUtils_1.MathUtils.LongToBigInt(v.k8n));
        l && n && a.SetChatRoomRedDot(n, !0),
          a.AddChatRowData(i, _, s, l, 1, h, r, void 0, void 0, !1);
      }
    }
    a.SortChatRowData(), a.ClampChatRowDataListLength();
    for (const M of a.GetChatRowDataList())
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "[ChatDebug]PrivateChatHistoryNotify---打印最终聊天数据",
          ["Content", M.Content],
          ["TimeStamp", M.TimeStamp],
          ["IsOfflineMassage", M.IsOfflineMassage],
        );
    ChatController.PrivateChatOperateRequest(
      Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg,
      0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !0,
      );
  }
  static async Kza(e) {
    var t = new Array();
    for (const v of e.VLs) "" === v.Wih || t.includes(v.Wih) || t.push(v.Wih);
    let a = new Map();
    0 < t.length &&
      (a =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetTargetRelation(
          t,
        ));
    var o = ModelManager_1.ModelManager.ChatModel;
    let r = void 0,
      n = void 0;
    if (
      (o.RemoveChatRowDataByChatRoomType(2, 3),
      (r =
        e.b8n === Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam
          ? ((n = 2), o.GetTeamChatRoom())
          : ((n = 3), o.GetWorldChatRoom())))
    ) {
      var i,
        _,
        s,
        l,
        h,
        C,
        g,
        e = e.VLs;
      o.AddTeamHistoryChatContent(r, e);
      for (const M of e)
        5 === a.get(M.Wih) ||
          ((i = M.GLs),
          (_ = M.P8n),
          (s = M.p8n),
          (l = M.NLs),
          (h = M.kLs),
          (C = M.OLs),
          (g = Number(MathUtils_1.MathUtils.LongToBigInt(M.FLs))),
          o.RefreshChatPlayerData(i, C, h),
          l === Protocol_1.Aki.Protocol.GFs.Proto_None &&
            o.AddChatRowData(i, _, s, !0, n, g, 0, h, C));
      o.SortChatRowData(), o.ClampChatRowDataListLength();
      for (const m of o.GetChatRowDataList())
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            8,
            "[ChatDebug]ChannelChatHistoryNotify---打印最终聊天数据",
            ["Content", m.Content],
            ["TimeStamp", m.TimeStamp],
            ["IsOfflineMassage", m.IsOfflineMassage],
          );
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !0,
      );
    }
  }
  static ChatMutePlayerRequest(e, t) {
    var a = new Protocol_1.Aki.Protocol.Jzn();
    (a.B8n = e),
      (a.q8n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "ChatMutePlayerRequest 客户端请求屏蔽", [
          "request",
          a,
        ]),
      Net_1.Net.Call(26215, Protocol_1.Aki.Protocol.Jzn.create(a), this.NEt),
      t
        ? ModelManager_1.ModelManager.ChatModel.AddMutePlayer(e)
        : ModelManager_1.ModelManager.ChatModel.RemoveMutePlayer(e);
  }
  static ChatReportPush(e) {}
  static PrivateChatOperateRequest(e, t) {
    var a = new Protocol_1.Aki.Protocol.Zzn();
    (a.Q5n = e),
      (a.G8n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatOperateRequest 客户端请求聊天操作",
          ["request", a],
        ),
      Net_1.Net.Call(25241, Protocol_1.Aki.Protocol.Zzn.create(a), this.OEt),
      e === Protocol_1.Aki.Protocol.xFs.Proto_CloseChat &&
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
  static ZFa() {
    var e = new Protocol_1.Aki.Protocol.Xzn();
    Net_1.Net.Call(29777, e, (e) => {
      e.Qih ||
        (this.JFa && TimerSystem_1.TimerSystem.Has(this.JFa)) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            8,
            "PrivateChatDataResponse 服务端加载聊天数据失败，等待一段时间后重新请求",
            ["DelayTime", ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME],
          ),
        (this.JFa = TimerSystem_1.TimerSystem.Delay(
          this.e3a,
          ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME,
        )));
    });
  }
}
(exports.ChatController = ChatController),
  ((_a = ChatController).IsInRequestHistory = !1),
  (ChatController.JFa = void 0),
  (ChatController.c3a = void 0),
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
  (ChatController.PEt = (l) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateMessageNotify 私聊聊天服务端通知", [
        "notify",
        l,
      ]),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          var t, a, o, r, n, i, _, s;
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 28, "PrivateChatRequest 通信受限")
            : ((e = ModelManager_1.ModelManager.ChatModel),
              (t = (s = l.PLs).N8n),
              (a = e.TryGetPrivateChatRoom(t)),
              (o = s.O8n),
              (r = Number(MathUtils_1.MathUtils.LongToBigInt(s.k8n))),
              (r = Number(r)),
              (n = s.P8n),
              (i = s.p8n),
              (_ = ModelManager_1.ModelManager.FriendModel?.GetFriendById(t)) &&
                e.RefreshChatPlayerData(t, _.PlayerHeadPhoto, _.PlayerName),
              a.GetIsOpen()
                ? ((_ = s.F8n),
                  (s = a.GetLastTimeStamp()),
                  e.AddChatContent(
                    a,
                    o,
                    t,
                    n,
                    i,
                    Protocol_1.Aki.Protocol.GFs.Proto_None,
                    _,
                    r,
                    s,
                  ))
                : (e.RequestOpenPrivateChatRoom(a),
                  e.AddChatRowData(t, n, i, !1, 1, r, t)),
              ChatController.PrivateChatOperateRequest(
                Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg,
                0,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRefreshChatRowData,
                !1,
              ));
        },
      );
  }),
  (ChatController.xEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChannelChatMessageNotify 队伍聊天服务端通知", [
        "notify",
        t,
      ]),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 28, "PrivateChatRequest 通信受限")
            : _a.Y$a(t);
        },
      );
  }),
  (ChatController.wEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "PrivateChatHistoryNotify 服务端推送最近的私人聊天历史记录",
      ),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 28, "PrivateChatHistoryRequest 通信受限")
            : _a.I$a(t);
        },
      );
  }),
  (ChatController.BEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "ChannelChatHistoryNotify 服务端推送最近的队伍聊天历史记录",
      ),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 28, "PrivateChatHistoryRequest 通信受限")
            : _a.Kza(t);
        },
      );
  }),
  (ChatController.bEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChatMutePlayerListNotify 服务端通知屏蔽列表", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.ChatModel;
    t.ClearAllMutePlayer();
    for (const a of e.W5n) t.AddMutePlayer(a);
  }),
  (ChatController.NEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChatMutePlayerResponse 服务端屏蔽回应", [
        "response",
        e,
      ]);
    e = e.BLs;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.ChatModel;
      for (const a of e) t.RemoveMutePlayer(a);
    }
  }),
  (ChatController.qEt = (e) => {
    var t = MathUtils_1.MathUtils.LongToBigInt(e.xSs),
      t = TimeUtil_1.TimeUtil.GetCountDownData(
        Number(t) - TimeUtil_1.TimeUtil.GetServerTime(),
      );
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "BanChatText" + e.bSs,
      t.CountDownText,
    );
  }),
  (ChatController.OEt = (e) => {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrBanChatDefault &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateChatOperateResponse 聊天操作回应", [
        "response",
        e,
      ]);
  }),
  (ChatController.UEt = () => {
    _a.ZFa();
  }),
  (ChatController.e3a = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateChatDataResponse 开始重新请求"),
      _a.ZFa(),
      (_a.JFa = void 0);
  }),
  (ChatController.AEt = (e) => {
    var t = e.W5n,
      a = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t);
    if (a) {
      switch (e.JDs) {
        case Protocol_1.Aki.Protocol.i7s.Proto_Head:
          a.SetPlayerIcon(e.V8n);
          break;
        case Protocol_1.Aki.Protocol.i7s.H8n:
          a.SetPlayerName(e.j8n);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        t,
      );
    }
  });
//# sourceMappingURL=ChatController.js.map
