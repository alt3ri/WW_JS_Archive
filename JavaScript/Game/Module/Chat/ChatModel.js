"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ChatController_1 = require("./ChatController"),
  ChatDefine_1 = require("./ChatDefine"),
  ChatPlayerData_1 = require("./ChatPlayerData"),
  ChatRowData_1 = require("./ChatRowData"),
  PrivateChatRoom_1 = require("./PrivateChatRoom"),
  TeamChatRoom_1 = require("./TeamChatRoom"),
  WorldTeamChatRoom_1 = require("./WorldTeamChatRoom");
class ChatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kEt = new Map()),
      (this.VEt = []),
      (this.HEt = 0),
      (this.jEt = new Map()),
      (this.WEt = void 0),
      (this.KEt = void 0),
      (this.QEt = void 0),
      (this.XEt = []),
      (this.IsOpenedChatView = !1),
      (this.ShowTimeDifferent = 0);
  }
  OnInit() {
    return (
      (this.ShowTimeDifferent =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ShowTimeDifferent",
        )),
      !0
    );
  }
  OnClear() {
    for (const t of this.jEt.values()) t.Reset();
    return (
      this.jEt.clear(),
      (this.VEt.length = 0),
      (this.XEt.length = 0),
      (this.QEt = void 0),
      this.ClearChatPlayerData(),
      !0
    );
  }
  AddChatPlayerData(t) {
    var e = new ChatPlayerData_1.ChatPlayerData(t);
    return this.kEt.set(t, e), e;
  }
  GetChatPlayerData(t) {
    return this.kEt.get(t);
  }
  RefreshChatPlayerData(t, e, a) {
    let o = this.GetChatPlayerData(t);
    var i = (o = o || this.AddChatPlayerData(t)).GetPlayerIcon(),
      r = o.GetPlayerName(),
      n = ModelManager_1.ModelManager.PersonalModel,
      h = n.GetPersonalInfoData();
    h && h.PlayerId === t
      ? (o.SetPlayerIcon(n.GetHeadPhotoId()), o.SetPlayerName(h.Name))
      : (o.SetPlayerIcon(e), o.SetPlayerName(a)),
      (i === e && r === a) ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChatPlayerInfoChanged,
          t,
        );
  }
  ClearChatPlayerData() {
    this.kEt.clear();
  }
  AddChatContent(t, e, a, o, i, r, n, h, s, C, m, _, v) {
    e = t.AddChatContent(e, a, o, i, r, n, h, s, C, m, _, v);
    let f = 0,
      l = 0;
    t instanceof PrivateChatRoom_1.PrivateChatRoom
      ? ((f = t.GetTargetPlayerId()), (l = 1))
      : t instanceof TeamChatRoom_1.TeamChatRoom
        ? (l = 2)
        : t instanceof WorldTeamChatRoom_1.WorldChatRoom && (l = 3),
      a !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        this.SetChatRoomRedDot(t, !0),
      r === Protocol_1.Aki.Protocol.GFs.Proto_None &&
        this.AddChatRowData(a, o, i, !1, l, h, f, C, m),
      this.YEt(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddChatContent,
        t,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRedDot,
      );
  }
  YEt() {
    for (const t of this.jEt.values()) t.ClearCreateTime();
  }
  RequestPrivateRoomLocalHistory(t) {
    var e = t.GetUniqueId(),
      t = t.GetEarliestHistoryContentUniqueId();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "===目前暂时屏蔽聊天本地缓存的请求===",
        ["chatUniqueId", e],
        ["fromContentUniqueId", t],
      );
  }
  AddChatRowData(t, e, a, o, i, r, n, h, s, C = !0) {
    this.JEt(t, e, a, o, i, r, n, h, s),
      C && this.VEt.length > ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE && this.zEt();
  }
  SortChatRowData() {
    this.VEt.sort((t, e) => t.TimeStamp - e.TimeStamp);
  }
  ClampChatRowDataListLength() {
    var t = this.VEt.length;
    t <= ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE ||
      (this.VEt = this.VEt.slice(
        Math.max(t - ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE, 0),
      ));
  }
  SetTeamChatRowDataVisible(t) {
    for (const a of this.VEt) {
      var e = a.ContentChatRoomType;
      (2 !== e && 3 !== e) || (a.IsVisible = t);
    }
  }
  JEt(t, e, a, o, i, r, n, h, s) {
    t = new ChatRowData_1.ChatRowData(this.HEt++, t, e, a, o, i, r, n, h, s);
    this.VEt.push(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPushChatRowData,
        t,
      );
  }
  ClearChatRowData() {
    this.VEt.length = 0;
  }
  RemoveChatRowDataByChatRoomType(...e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "[ChatDebug]删除主界面聊天数据---开始",
        ["chatRoomType", e],
        ["chatRowDataListLength", this.VEt.length],
      );
    var a = [];
    for (let t = 0; t < this.VEt.length; t++) {
      var o = this.VEt[t];
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "[ChatDebug]删除主界面聊天数据---打印当前聊天记录",
          ["Content", o.Content],
          ["TimeStamp", o.TimeStamp],
        ),
        e.includes(o.ContentChatRoomType) && a.push(t);
    }
    for (const t of a) this.VEt.splice(t, 1);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "[ChatDebug]删除主界面聊天数据---结束",
        ["removeIndexList", a],
        ["chatRowDataListLength", this.VEt.length],
      );
  }
  zEt() {
    var t = this.VEt.shift();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPopChatRowData,
      t,
    );
  }
  GetChatRowDataList() {
    return this.VEt;
  }
  HasOfflineMassage() {
    for (const t of this.VEt) if (t.IsOfflineMassage) return !0;
    return !1;
  }
  AddPrivateHistoryChatContent(t, e) {
    var a = [];
    for (const r of e) {
      var o = r.N8n,
        i = {
          UtcTime: r.k8n,
          MsgId: r.O8n,
          SenderUid: o,
          Content: r.P8n,
          ChatContentType: r.p8n,
          OfflineMsg: r.F8n,
        },
        i =
          (a.push(i),
          ModelManager_1.ModelManager.FriendModel?.GetFriendById(o));
      i && this.RefreshChatPlayerData(o, i.PlayerHeadPhoto, i.PlayerName);
    }
    t.AddHistoryChatContent(a),
      t.Open(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        t,
      );
  }
  AddTeamHistoryChatContent(t, e) {
    var a = [];
    for (const i of e) {
      var o = {
        SenderPlayerId: i.GLs,
        SenderPlayerName: i.kLs,
        UtcTime: i.FLs,
        SenderIcon: i.OLs,
        Content: i.P8n,
        ChatContentType: i.p8n,
        NoticeType: i.NLs,
      };
      a.push(o);
    }
    t.AddHistoryChatContent(a),
      t.Open(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        t,
      );
  }
  JoinChatRoom(t) {
    if (
      (this.SetChatRoomRedDot(t, !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 加入聊天室", ["UniqueId", t.GetUniqueId()]),
      t.GetIsOpen())
    )
      (this.QEt = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnJoinChatRoom,
          t,
        );
    else if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
      if (!t.CanChat())
        return void (
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            8,
            " 加入私人聊天室时，对应好友在黑名单或不在好友列表中，无法加入聊天室",
            ["UniqueId", t.GetUniqueId()],
          )
        );
      (this.QEt = t), this.RequestOpenPrivateChatRoom(t);
    } else (this.QEt = t), this.RequestOpenChatRoom(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshChatRedDot,
    );
  }
  LeaveCurrentChatRoom() {
    this.QEt = void 0;
  }
  RemovePrivateChatRoom(t) {
    this.QEt instanceof PrivateChatRoom_1.PrivateChatRoom &&
      this.QEt.GetTargetPlayerId() === t &&
      this.LeaveCurrentChatRoom();
    var e = this.GetPrivateChatRoom(t);
    e &&
      (e.Reset(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 删除私人聊天室", ["PlayerId", t]),
      this.jEt.delete(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemovePrivateChatRoom,
        t,
      ));
  }
  ClosePrivateChatRoom(t) {
    this.QEt instanceof PrivateChatRoom_1.PrivateChatRoom &&
      this.QEt.GetTargetPlayerId() === t &&
      (this.QEt = void 0);
    var e = this.GetPrivateChatRoom(t);
    e &&
      (e.Close(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 关闭私人聊天室", ["PlayerId", t]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnClosePrivateChatRoom,
        t,
      ));
  }
  RequestOpenPrivateChatRoom(t) {
    var e;
    t.GetIsOpen() ||
      ((e = t.GetTargetPlayerId()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 请求打开私人聊天室", ["PlayerId", e]),
      t.Open(),
      ChatController_1.ChatController.PrivateChatHistoryRequest(e),
      this.SetChatRoomRedDot(t, !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnOpenChatRoom,
        t,
      ));
  }
  RequestOpenChatRoom(t) {
    t.GetIsOpen() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 请求打开队伍/联机聊天室 "),
      t.Open(),
      this.SetChatRoomRedDot(t, !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnOpenChatRoom,
        t,
      ));
  }
  SetChatRoomRedDot(t, e) {
    t &&
      t.GetIsShowRedDot() !== e &&
      this.GetJoinedChatRoom()?.GetUniqueId() !== t.GetUniqueId() &&
      (t.SetIsShowRedDot(e),
      t instanceof PrivateChatRoom_1.PrivateChatRoom
        ? ((e = t.GetTargetPlayerId()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshChatRoomRedDot,
            e,
          ))
        : t instanceof TeamChatRoom_1.TeamChatRoom
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshChatRoomRedDot,
              2,
            )
          : t instanceof WorldTeamChatRoom_1.WorldChatRoom &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshChatRoomRedDot,
              3,
            ));
  }
  GetJoinedChatRoom() {
    return this.QEt;
  }
  HasRedDot() {
    for (const t of this.jEt.values()) if (t.GetIsShowRedDot()) return !0;
    return !!this.WEt?.GetIsShowRedDot() || !!this.KEt?.GetIsShowRedDot();
  }
  TryGetPrivateChatRoom(t) {
    let e = this.GetPrivateChatRoom(t);
    return (e = e || this.NewPrivateChatRoom(t));
  }
  NewPrivateChatRoom(t) {
    var e = new PrivateChatRoom_1.PrivateChatRoom(t, 1);
    return (
      this.jEt.set(t, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCreatePrivateChatRoom,
        t,
      ),
      e
    );
  }
  NewTeamChatRoom() {
    return (this.WEt = new TeamChatRoom_1.TeamChatRoom(2)), this.WEt;
  }
  NewWorldChatRoom() {
    return (this.KEt = new WorldTeamChatRoom_1.WorldChatRoom(2)), this.KEt;
  }
  SelectedPrivateChatFriend(t) {
    t = this.TryGetPrivateChatRoom(t);
    t.CanChat() && this.JoinChatRoom(t);
  }
  GetPrivateChatRoom(t) {
    return this.jEt.get(t);
  }
  GetTeamChatRoom() {
    return this.WEt;
  }
  SetTeamChatRoom(t) {
    this.WEt = t;
  }
  GetWorldChatRoom() {
    return this.KEt;
  }
  SetWorldChatRoom(t) {
    this.KEt = t;
  }
  GetAllSortedChatRoom() {
    var t = [];
    for (const a of this.jEt.values())
      a.GetIsOpen() && a.CanChat() && t.push(a);
    t.sort((t, e) => {
      var a = t.GetLastTimeStamp(),
        o = e.GetLastTimeStamp();
      return 0 === a
        ? -1
        : 0 === o
          ? 1
          : a !== o
            ? o - a
            : e.GetCreateTimeStamp() - t.GetCreateTimeStamp();
    });
    var e = this.GetTeamChatRoom();
    return e ? t.unshift(e) : (e = this.GetWorldChatRoom()) && t.unshift(e), t;
  }
  IsInPrivateChatRoom(t) {
    t = this.GetPrivateChatRoom(t);
    return !!t && t.GetIsOpen();
  }
  AddMutePlayer(t) {
    this.XEt.push(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddMutePlayer,
        t,
      );
  }
  RemoveMutePlayer(t) {
    var e = this.XEt.indexOf(t);
    e < 0 ||
      (this.XEt.splice(e, 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        t,
      ));
  }
  ClearAllMutePlayer() {
    this.XEt.length = 0;
  }
  IsInMute(t) {
    return 0 <= this.XEt.indexOf(t);
  }
}
exports.ChatModel = ChatModel;
//# sourceMappingURL=ChatModel.js.map
