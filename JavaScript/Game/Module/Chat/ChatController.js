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
      this.M5a &&
        TimerSystem_1.TimerSystem.Has(this.M5a) &&
        (TimerSystem_1.TimerSystem.Remove(this.M5a), (this.M5a = void 0)),
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
    Net_1.Net.Register(19177, this.PEt),
      Net_1.Net.Register(15124, this.xEt),
      Net_1.Net.Register(16326, this.wEt),
      Net_1.Net.Register(22223, this.BEt),
      Net_1.Net.Register(21522, this.bEt),
      Net_1.Net.Register(21843, this.qEt),
      Net_1.Net.Register(24319, this.Dhl);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19177),
      Net_1.Net.UnRegister(15124),
      Net_1.Net.UnRegister(16326),
      Net_1.Net.UnRegister(22223),
      Net_1.Net.UnRegister(21522),
      Net_1.Net.UnRegister(21843),
      Net_1.Net.UnRegister(24319);
  }
  static PrivateChatRequest(l, t, a) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      (e) => {
        1 === e
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "CommunicationRectricted",
              ),
            ),
            this.O3a(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限"))
          : (a ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Chat",
                  5,
                  "PrivateChatRequest 私聊对象玩家Id不存在",
                  ["targetPlayerId", a],
                )),
            ((e = new Protocol_1.Aki.Protocol.$zn()).p8n = l),
            (e.P8n = t),
            (e.B8n = a),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Chat",
                5,
                "PrivateChatRequest 客户端请求私聊聊天",
                ["request", e],
              ),
            Net_1.Net.Call(
              22687,
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
                      21120,
                    )
                  : ((_ = e.O8n),
                    (t = e.ALs),
                    (a = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
                    (o = TimeUtil_1.TimeUtil.GetServerTime()),
                    (r = (i = n.GetPrivateChatRoom(i)).GetLastTimeStamp()),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Chat",
                        5,
                        "PrivateChatResponse 私聊聊天服务端回应",
                        ["response", e],
                      ),
                    n.AddChatContent(
                      i,
                      _,
                      a,
                      t,
                      l,
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
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      6,
    );
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
            this.O3a(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限"))
          : (((e = new Protocol_1.Aki.Protocol.iZn()).w8n =
              Protocol_1.Aki.Protocol.bFs.Proto_Team),
            (e.b8n = o),
            (e.p8n = t),
            (e.P8n = a),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Chat",
                5,
                "ChannelChatRequest 客户端请求队伍聊天",
                ["request", e],
              ),
            Net_1.Net.Call(
              29109,
              Protocol_1.Aki.Protocol.iZn.create(e),
              (e) => {
                e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                  ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      e.Q4n,
                      18290,
                    )
                  : Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Chat",
                      5,
                      "ChannelChatRequest 队伍聊天服务端回应",
                      ["response", e],
                    );
              },
            ));
      },
    );
  }
  static async hSl(e) {
    var t,
      a,
      o,
      r,
      n,
      i,
      e = e.PLs,
      _ = e.N8n,
      l =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    (l && l.get(e.KI_)) ||
      ((t = (l = ModelManager_1.ModelManager.ChatModel).TryGetPrivateChatRoom(
        _,
      )),
      (a = e.O8n),
      (o = Number(MathUtils_1.MathUtils.LongToBigInt(e.k8n))),
      (o = Number(o)),
      (r = e.P8n),
      (n = e.p8n),
      (i = ModelManager_1.ModelManager.FriendModel?.GetFriendById(_)) &&
        l.RefreshChatPlayerData(_, i.PlayerHeadPhoto, i.PlayerName),
      t.GetIsOpen()
        ? ((i = e.F8n),
          (e = t.GetLastTimeStamp()),
          l.AddChatContent(
            t,
            a,
            _,
            r,
            n,
            Protocol_1.Aki.Protocol.GFs.Proto_None,
            i,
            o,
            e,
          ))
        : (l.RequestOpenPrivateChatRoom(t),
          l.AddChatRowData(_, r, n, !1, 1, o, _)),
      ChatController.PrivateChatOperateRequest(
        Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg,
        0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !1,
      ));
  }
  static async RJa(e) {
    var t,
      a,
      o,
      r,
      n,
      i,
      _,
      l,
      s,
      C = ModelManager_1.ModelManager.ChatModel;
    let h = void 0,
      g = void 0;
    (g =
      e.b8n === Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam
        ? ((h = C.GetTeamChatRoom()), "TeamMatch")
        : ((h = C.GetWorldChatRoom()), "TeamWorld")),
      h &&
        (e.qLs?.NLs === Protocol_1.Aki.Protocol.GFs.Proto_ClearMessages
          ? (h.Reset(),
            C.DeleteTeamChat(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshChatRowData,
              !1,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnOpenChatRoom,
              h,
            ))
          : 5 !==
              (
                await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetTargetRelation(
                  [e.qLs.KI_],
                )
              ).get(e.qLs.KI_) &&
            ((t = TimeUtil_1.TimeUtil.GetServerTime()),
            (a = (e = e.qLs).GLs),
            (o = e.P8n),
            (r = e.p8n),
            (n = e.NLs),
            (i = h.GetLastTimeStamp()),
            (_ = e.kLs),
            (l = e.OLs),
            (s = e.YI_),
            (e = e.KI_),
            C.AddChatContent(h, g, a, o, r, n, !0, t, i, _, l, s, e),
            C.RefreshChatPlayerData(a, l, _),
            n !== Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam) &&
            n !== Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshChatRowData,
              !1,
            ));
  }
  static PrivateChatHistoryRequest(o) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      (e) => {
        1 === e
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Chat", 27, "PrivateChatHistoryRequest 通信受限")
          : (((e = new Protocol_1.Aki.Protocol.Wzn()).B8n = o),
            (this.IsInRequestHistory = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Chat",
                5,
                "PrivateChatHistoryRequest 客户端请求最近的私聊记录",
                ["request", e],
              ),
            Net_1.Net.Call(
              17010,
              Protocol_1.Aki.Protocol.Wzn.create(e),
              (e) => {
                var t, a;
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Chat",
                    5,
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
                    this.$za(t, e.ULs, o);
              },
            ));
      },
    );
  }
  static async $za(e, t, a) {
    var o =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser(),
      r = [];
    for (const n of t) (o && o.get(n.KI_)) || r.push(n);
    ModelManager_1.ModelManager.ChatModel.AddPrivateHistoryChatContent(e, r),
      ChatController.PrivateChatOperateRequest(
        Protocol_1.Aki.Protocol.xFs.Proto_OpenChat,
        a,
      );
  }
  static async Xza(e) {
    var t =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser(),
      a = ModelManager_1.ModelManager.ChatModel,
      o = (a.RemoveChatRowDataByChatRoomType(1), []);
    for (const h of e.bLs) {
      var r = h.B8n,
        o = [];
      let e = !1;
      for (const g of h.ULs) t && t.get(g.KI_) ? (e = !0) : o.push(g);
      if (!e) {
        var n = a.TryGetPrivateChatRoom(r);
        n.Reset(), a.AddPrivateHistoryChatContent(n, o);
        for (const v of o) {
          var i = v.N8n,
            _ = v.P8n,
            l = v.p8n,
            s = v.F8n,
            C = Number(MathUtils_1.MathUtils.LongToBigInt(v.k8n));
          s && n && a.SetChatRoomRedDot(n, !0),
            a.AddChatRowData(i, _, l, s, 1, C, r, void 0, void 0, !1);
        }
      }
    }
    a.SortChatRowData(), a.ClampChatRowDataListLength();
    for (const M of a.GetChatRowDataList())
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          5,
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
  static async Nrh(e) {
    var t = new Array();
    for (const v of e.VLs) "" === v.KI_ || t.includes(v.KI_) || t.push(v.KI_);
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
        l,
        s,
        C,
        h,
        g,
        e = e.VLs;
      o.AddTeamHistoryChatContent(r, e);
      for (const M of e)
        5 === a.get(M.KI_) ||
          ((i = M.GLs),
          (_ = M.P8n),
          (l = M.p8n),
          (s = M.NLs),
          (C = M.kLs),
          (h = M.OLs),
          (g = Number(MathUtils_1.MathUtils.LongToBigInt(M.FLs))),
          o.RefreshChatPlayerData(i, h, C),
          s === Protocol_1.Aki.Protocol.GFs.Proto_None &&
            o.AddChatRowData(i, _, l, !0, n, g, 0, C, h));
      o.SortChatRowData(), o.ClampChatRowDataListLength();
      for (const f of o.GetChatRowDataList())
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            5,
            "[ChatDebug]ChannelChatHistoryNotify---打印最终聊天数据",
            ["Content", f.Content],
            ["TimeStamp", f.TimeStamp],
            ["IsOfflineMassage", f.IsOfflineMassage],
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
        Log_1.Log.Info("Chat", 5, "ChatMutePlayerRequest 客户端请求屏蔽", [
          "request",
          a,
        ]),
      Net_1.Net.Call(24932, Protocol_1.Aki.Protocol.Jzn.create(a), this.NEt),
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
          5,
          "PrivateChatOperateRequest 客户端请求聊天操作",
          ["request", a],
        ),
      Net_1.Net.Call(20748, Protocol_1.Aki.Protocol.Zzn.create(a), this.OEt),
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
  static S5a() {
    var e = new Protocol_1.Aki.Protocol.Xzn();
    Net_1.Net.Call(16333, e, (e) => {
      e.XI_ ||
        (this.M5a && TimerSystem_1.TimerSystem.Has(this.M5a)) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            5,
            "PrivateChatDataResponse 服务端加载聊天数据失败，等待一段时间后重新请求",
            ["DelayTime", ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME],
          ),
        (this.M5a = TimerSystem_1.TimerSystem.Delay(
          this.E5a,
          ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME,
        )));
    });
  }
}
(exports.ChatController = ChatController),
  ((_a = ChatController).IsInRequestHistory = !1),
  (ChatController.M5a = void 0),
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
  (ChatController.PEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 5, "PrivateMessageNotify 私聊聊天服务端通知", [
        "notify",
        t,
      ]),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限")
            : _a.hSl(t);
        },
      );
  }),
  (ChatController.xEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 5, "ChannelChatMessageNotify 队伍聊天服务端通知", [
        "notify",
        t,
      ]),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限")
            : _a.RJa(t);
        },
      );
  }),
  (ChatController.wEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        5,
        "PrivateChatHistoryNotify 服务端推送最近的私人聊天历史记录",
      ),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 27, "PrivateChatHistoryRequest 通信受限")
            : _a.Xza(t);
        },
      );
  }),
  (ChatController.BEt = (t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        5,
        "ChannelChatHistoryNotify 服务端推送最近的队伍聊天历史记录",
      ),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
        (e) => {
          1 === e
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Chat", 27, "PrivateChatHistoryRequest 通信受限")
            : _a.Nrh(t);
        },
      );
  }),
  (ChatController.bEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 5, "ChatMutePlayerListNotify 服务端通知屏蔽列表", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.ChatModel;
    t.ClearAllMutePlayer();
    for (const a of e.W5n) t.AddMutePlayer(a);
  }),
  (ChatController.NEt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 5, "ChatMutePlayerResponse 服务端屏蔽回应", [
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
  (ChatController.Dhl = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        5,
        "PrivateMessageNotify 私聊聊天服务端通知删除信息",
        ["notify", e],
      );
    for (const t of e.W5n)
      ModelManager_1.ModelManager.ChatModel.DeletePrivateChat(t),
        ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t)?.Close(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnClosePrivateChatRoom,
          t,
        );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshChatRowData,
      !1,
    );
  }),
  (ChatController.OEt = (e) => {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrBanChatDefault &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 5, "PrivateChatOperateResponse 聊天操作回应", [
        "response",
        e,
      ]);
  }),
  (ChatController.UEt = () => {
    _a.S5a();
  }),
  (ChatController.E5a = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 5, "PrivateChatDataResponse 开始重新请求"),
      _a.S5a(),
      (_a.M5a = void 0);
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
          break;
        case Protocol_1.Aki.Protocol.i7s.Proto_PlayerTitle:
          a.SetPlayerTitle(e.j8n);
          break;
        case Protocol_1.Aki.Protocol.i7s.v7n:
          a.SetSex(e.V8n);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        t,
      );
    }
  });
//# sourceMappingURL=ChatController.js.map
