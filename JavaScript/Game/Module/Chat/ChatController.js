"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const PrivateChatRoom_1 = require("./PrivateChatRoom");
class ChatController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      this.mMt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectChatFriend,
        this.dMt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.UKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterTeam,
        this.oJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveTeam,
        this.aJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.sJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.hJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveFriend,
        this.CMt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.gMt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetFriendInitData,
        this.fMt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
        this.pMt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      this.mMt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectChatFriend,
        this.dMt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.UKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterTeam,
        this.oJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveTeam,
        this.aJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.sJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.hJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveFriend,
        this.CMt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.gMt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetFriendInitData,
        this.fMt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
        this.pMt,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(8381, this.vMt),
      Net_1.Net.Register(5934, this.MMt),
      Net_1.Net.Register(29682, this.SMt),
      Net_1.Net.Register(26239, this.EMt),
      Net_1.Net.Register(25651, this.yMt),
      Net_1.Net.Register(15658, this.IMt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(8381),
      Net_1.Net.UnRegister(5934),
      Net_1.Net.UnRegister(29682),
      Net_1.Net.UnRegister(26239),
      Net_1.Net.UnRegister(25651),
      Net_1.Net.UnRegister(15658);
  }
  static PrivateChatRequest(l, e, t) {
    t ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Chat", 8, "PrivateChatRequest 私聊对象玩家Id不存在", [
          "targetPlayerId",
          t,
        ]));
    const o = new Protocol_1.Aki.Protocol.VQn();
    (o.U3n = l),
      (o.H3n = e),
      (o.j3n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "PrivateChatRequest 客户端请求私聊聊天", [
          "request",
          o,
        ]);
    Net_1.Net.Call(9288, Protocol_1.Aki.Protocol.VQn.create(o), (e) => {
      let t;
      let o;
      let r;
      let a;
      const n = ModelManager_1.ModelManager.ChatModel;
      let _ = e.j3n;
      let i = e.lkn;
      i !== Protocol_1.Aki.Protocol.lkn.Sys
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            i,
            26040,
          )
        : ((i = e.X3n),
          (t = e.rEs),
          (o = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
          (r = TimeUtil_1.TimeUtil.GetServerTime()),
          (a = (_ = n.GetPrivateChatRoom(_)).GetLastTimeStamp()),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Chat",
              8,
              "PrivateChatResponse 私聊聊天服务端回应",
              ["response", e],
            ),
          n.AddChatContent(
            _,
            i,
            o,
            t,
            l,
            Protocol_1.Aki.Protocol.FGs.Proto_None,
            !1,
            r,
            a,
          ),
          (e = ModelManager_1.ModelManager.FriendModel?.GetFriendById(o)) &&
            n.RefreshChatPlayerData(o, e.PlayerHeadPhoto, e.PlayerName),
          ChatController.PrivateChatOperateRequest(
            Protocol_1.Aki.Protocol.GGs.Proto_ReadMsg,
            0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshChatRowData,
            !1,
          ));
    });
  }
  static ChannelChatRequest(e, t, o) {
    const r = new Protocol_1.Aki.Protocol.tXn();
    (r.W3n = Protocol_1.Aki.Protocol.OGs.Proto_Team),
      (r.K3n = o),
      (r.U3n = e),
      (r.H3n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "ChannelChatRequest 客户端请求队伍聊天", [
          "request",
          r,
        ]);
    Net_1.Net.Call(1422, Protocol_1.Aki.Protocol.tXn.create(r), (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            12381,
          )
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Chat", 8, "ChannelChatRequest 队伍聊天服务端回应", [
            "response",
            e,
          ]);
    });
  }
  static PrivateChatHistoryRequest(a) {
    const e = new Protocol_1.Aki.Protocol.jQn();
    (e.j3n = a),
      (this.IsInRequestHistory = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatHistoryRequest 客户端请求最近的私聊记录",
          ["request", e],
        );
    Net_1.Net.Call(21736, Protocol_1.Aki.Protocol.jQn.create(e), (e) => {
      let t, o, r;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatHistoryResponse 私聊聊天历史服务端回应",
          ["response", e],
        ),
        e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
          ((ChatController.IsInRequestHistory = !1),
          (t = ModelManager_1.ModelManager.ChatModel),
          (o = (e = e.Kkn).j3n)) &&
          (o = t.GetPrivateChatRoom(o)) &&
          (r = e.nEs) &&
          !(r.length <= 0) &&
          (t.AddPrivateHistoryChatContent(o, e.nEs),
          ChatController.PrivateChatOperateRequest(
            Protocol_1.Aki.Protocol.GGs.Proto_OpenChat,
            a,
          ));
    });
  }
  static ChatMutePlayerRequest(e, t) {
    const o = new Protocol_1.Aki.Protocol.YQn();
    (o.j3n = e),
      (o.Q3n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, "ChatMutePlayerRequest 客户端请求屏蔽", [
          "request",
          o,
        ]),
      Net_1.Net.Call(4045, Protocol_1.Aki.Protocol.YQn.create(o), this.LMt),
      t
        ? ModelManager_1.ModelManager.ChatModel.AddMutePlayer(e)
        : ModelManager_1.ModelManager.ChatModel.RemoveMutePlayer(e);
  }
  static ChatReportPush(e) {}
  static PrivateChatOperateRequest(e, t) {
    const o = new Protocol_1.Aki.Protocol.zQn();
    (o.lFn = e),
      (o.$3n = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "PrivateChatOperateRequest 客户端请求聊天操作",
          ["request", o],
        ),
      Net_1.Net.Call(10862, Protocol_1.Aki.Protocol.zQn.create(o), this.DMt),
      e === Protocol_1.Aki.Protocol.GGs.Proto_CloseChat &&
        ModelManager_1.ModelManager.ChatModel.ClosePrivateChatRoom(t);
  }
  static OpenFriendChat(e) {
    ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e),
      UiManager_1.UiManager.OpenView("ChatView");
  }
  static TryActiveDeleteFriendTips(e) {
    let t;
    UiManager_1.UiManager.IsViewShow("ChatView") &&
      (t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom()) &&
      t instanceof PrivateChatRoom_1.PrivateChatRoom &&
      t.GetTargetPlayerId() === e &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "DeleteFriendText",
      );
  }
}
((exports.ChatController = ChatController).IsInRequestHistory = !1),
  (ChatController.gMt = () => {
    UiManager_1.UiManager.IsViewShow("ChatView") &&
      UiManager_1.UiManager.CloseView("ChatView");
  }),
  (ChatController.mMt = () => {
    ModelManager_1.ModelManager.ChatModel.LoadAllChatSaveContent();
  }),
  (ChatController.dMt = (e) => {
    ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e);
  }),
  (ChatController.UKe = (e) => {
    e === "ChatView" &&
      (ModelManager_1.ModelManager.ChatModel.IsOpenedChatView = !0);
  }),
  (ChatController.$Ge = (e) => {
    e === "ChatView" &&
      ModelManager_1.ModelManager.ChatModel.SaveChatSaveContent();
  }),
  (ChatController.sJe = () => {
    ModelManager_1.ModelManager.ChatModel.GetWorldChatRoom() ||
      ModelManager_1.ModelManager.ChatModel.SetWorldChatRoom(
        ModelManager_1.ModelManager.ChatModel.NewWorldChatRoom(),
      );
  }),
  (ChatController.hJe = () => {
    const e = ModelManager_1.ModelManager.ChatModel;
    const t =
      (e.SetWorldChatRoom(void 0),
      e.SetTeamChatRowDataVisible(!1),
      e.GetWorldChatRoom());
    t && e.SetChatRoomRedDot(t, !1),
      UiManager_1.UiManager.IsViewShow("ChatView") &&
        UiManager_1.UiManager.CloseView("ChatView");
  }),
  (ChatController.oJe = () => {
    const e = ModelManager_1.ModelManager.ChatModel;
    e.SetTeamChatRoom(e.NewTeamChatRoom());
  }),
  (ChatController.aJe = () => {
    const e = ModelManager_1.ModelManager.ChatModel;
    const t =
      (e.SetTeamChatRoom(void 0),
      e.SetTeamChatRowDataVisible(!1),
      e.GetTeamChatRoom());
    t && e.SetChatRoomRedDot(t, !1),
      UiManager_1.UiManager.IsViewShow("ChatView") &&
        UiManager_1.UiManager.CloseView("ChatView");
  }),
  (ChatController.CMt = (e) => {
    const t = ModelManager_1.ModelManager.ChatModel;
    t.RemovePrivateChatRoom(e), t.RemoveChatSaveContent(e);
  }),
  (ChatController.vMt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateMessageNotify 私聊聊天服务端通知", [
        "notify",
        e,
      ]);
    const t = ModelManager_1.ModelManager.ChatModel;
    var e = e.oEs;
    const o = e.Y3n;
    const r = t.TryGetPrivateChatRoom(o);
    const a = e.X3n;
    var n = Number(MathUtils_1.MathUtils.LongToBigInt(e.J3n));
    var n = Number(n);
    const _ = e.H3n;
    const i = e.U3n;
    let l = ModelManager_1.ModelManager.FriendModel?.GetFriendById(o);
    l && t.RefreshChatPlayerData(o, l.PlayerHeadPhoto, l.PlayerName),
      r.GetIsOpen()
        ? ((l = e.z3n),
          (e = r.GetLastTimeStamp()),
          t.AddChatContent(
            r,
            a,
            o,
            _,
            i,
            Protocol_1.Aki.Protocol.FGs.Proto_None,
            l,
            n,
            e,
          ))
        : (t.RequestOpenPrivateChatRoom(r),
          t.AddChatRowData(o, _, i, !1, 1, n, o),
          t.AddAndSavePrivateChatContent(r, i, _, a, !1, o, n)),
      ChatController.PrivateChatOperateRequest(
        Protocol_1.Aki.Protocol.GGs.Proto_ReadMsg,
        0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !1,
      );
  }),
  (ChatController.MMt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChannelChatMessageNotify 队伍聊天服务端通知", [
        "notify",
        e,
      ]);
    let t;
    let o;
    let r;
    let a;
    let n;
    let _;
    let i;
    const l = ModelManager_1.ModelManager.ChatModel;
    let s = void 0;
    let C = void 0;
    (C =
      e.K3n === Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam
        ? ((s = l.GetTeamChatRoom()), "TeamMatch")
        : ((s = l.GetWorldChatRoom()), "TeamWorld")),
      s &&
        ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        (o = (e = e._Es).uEs),
        (r = e.H3n),
        (a = e.U3n),
        (n = e.mEs),
        (_ = s.GetLastTimeStamp()),
        (i = e.dEs),
        (e = e.cEs),
        l.AddChatContent(s, C, o, r, a, n, !0, t, _, i, e),
        l.RefreshChatPlayerData(o, e, i),
        n !== Protocol_1.Aki.Protocol.FGs.Proto_EnterTeam) &&
        n !== Protocol_1.Aki.Protocol.FGs.Proto_ExitTeam &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshChatRowData,
          !1,
        );
  }),
  (ChatController.SMt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "PrivateChatHistoryNotify 服务端推送最近的私人聊天历史记录",
      );
    const t = ModelManager_1.ModelManager.ChatModel;
    t.RemoveChatRowDataByChatRoomType(1);
    for (const C of e.hEs) {
      const o = C.j3n;
      const r = t.TryGetPrivateChatRoom(o);
      const a = C.nEs;
      r.Reset(), t.AddPrivateHistoryChatContent(r, a);
      for (const h of a) {
        const n = h.Y3n;
        const _ = h.H3n;
        const i = h.U3n;
        const l = h.z3n;
        const s = Number(MathUtils_1.MathUtils.LongToBigInt(h.J3n));
        l && r && t.SetChatRoomRedDot(r, !0),
          t.AddChatRowData(n, _, i, l, 1, s, o, void 0, void 0, !1);
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
      Protocol_1.Aki.Protocol.GGs.Proto_ReadMsg,
      0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        !0,
      );
  }),
  (ChatController.EMt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "ChannelChatHistoryNotify 服务端推送最近的队伍聊天历史记录",
      );
    const t = ModelManager_1.ModelManager.ChatModel;
    let o = void 0;
    let r = void 0;
    if (
      (t.RemoveChatRowDataByChatRoomType(2, 3),
      (o =
        e.K3n === Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam
          ? ((r = 2), t.GetTeamChatRoom())
          : ((r = 3), t.GetWorldChatRoom())))
    ) {
      e = e.gEs;
      t.AddTeamHistoryChatContent(o, e);
      for (const h of e) {
        const a = h.uEs;
        const n = h.H3n;
        const _ = h.U3n;
        const i = h.mEs;
        const l = h.dEs;
        const s = h.cEs;
        const C = Number(MathUtils_1.MathUtils.LongToBigInt(h.CEs));
        t.RefreshChatPlayerData(a, s, l),
          i === Protocol_1.Aki.Protocol.FGs.Proto_None &&
            t.AddChatRowData(a, n, _, !0, r, C, 0, l, s);
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
  (ChatController.yMt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChatMutePlayerListNotify 服务端通知屏蔽列表", [
        "notify",
        e,
      ]);
    const t = ModelManager_1.ModelManager.ChatModel;
    t.ClearAllMutePlayer();
    for (const o of e.aFn) t.AddMutePlayer(o);
  }),
  (ChatController.LMt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "ChatMutePlayerResponse 服务端屏蔽回应", [
        "response",
        e,
      ]);
    e = e.lEs;
    if (e && e.length !== 0) {
      const t = ModelManager_1.ModelManager.ChatModel;
      for (const o of e) t.RemoveMutePlayer(o);
    }
  }),
  (ChatController.IMt = (e) => {
    var t = MathUtils_1.MathUtils.LongToBigInt(e.lfs);
    var t = TimeUtil_1.TimeUtil.GetCountDownData(
      Number(t) - TimeUtil_1.TimeUtil.GetServerTime(),
    );
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "BanChatText" + e._fs,
      t.CountDownText,
    );
  }),
  (ChatController.DMt = (e) => {
    e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrBanChatDefault &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "PrivateChatOperateResponse 聊天操作回应", [
        "response",
        e,
      ]);
  }),
  (ChatController.fMt = () => {
    const e = new Protocol_1.Aki.Protocol.QQn();
    Net_1.Net.Call(26302, e, (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          26302,
        );
    });
  }),
  (ChatController.pMt = (e) => {
    const t = e.aFn;
    const o = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t);
    if (o) {
      switch (e.TIs) {
        case Protocol_1.Aki.Protocol.rFs.Proto_Head:
          o.SetPlayerIcon(e.Z3n);
          break;
        case Protocol_1.Aki.Protocol.rFs.e4n:
          o.SetPlayerName(e.t4n);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        t,
      );
    }
  });
// # sourceMappingURL=ChatController.js.map
