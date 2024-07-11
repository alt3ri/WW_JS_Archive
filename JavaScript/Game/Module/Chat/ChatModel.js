"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const ChatController_1 = require("./ChatController");
const ChatDefine_1 = require("./ChatDefine");
const ChatPlayerData_1 = require("./ChatPlayerData");
const ChatRowData_1 = require("./ChatRowData");
const PrivateChatRoom_1 = require("./PrivateChatRoom");
const TeamChatRoom_1 = require("./TeamChatRoom");
const WorldTeamChatRoom_1 = require("./WorldTeamChatRoom");
class ChatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.RMt = new Map()),
      (this.AMt = []),
      (this.PMt = 0),
      (this.xMt = new Map()),
      (this.wMt = void 0),
      (this.BMt = void 0),
      (this.bMt = void 0),
      (this.qMt = []),
      (this.IsOpenedChatView = !1),
      (this.GMt = new Map()),
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
    this.SaveChatSaveContent();
    for (const t of this.xMt.values()) t.Reset();
    return (
      this.xMt.clear(),
      (this.AMt.length = 0),
      (this.qMt.length = 0),
      (this.bMt = void 0),
      this.ClearChatPlayerData(),
      !0
    );
  }
  OnLeaveLevel() {
    return this.SaveChatSaveContent(), !0;
  }
  AddChatPlayerData(t) {
    const e = new ChatPlayerData_1.ChatPlayerData(t);
    return this.RMt.set(t, e), e;
  }
  GetChatPlayerData(t) {
    return this.RMt.get(t);
  }
  RefreshChatPlayerData(t, e, o) {
    let a = this.GetChatPlayerData(t);
    const i = (a = a || this.AddChatPlayerData(t)).GetPlayerIcon();
    const r = a.GetPlayerName();
    const n = ModelManager_1.ModelManager.PersonalModel;
    const h = n.GetPersonalInfoData();
    h && h.PlayerId === t
      ? (a.SetPlayerIcon(n.GetHeadPhotoId()), a.SetPlayerName(h.Name))
      : (a.SetPlayerIcon(e), a.SetPlayerName(o)),
      (i === e && r === o) ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChatPlayerInfoChanged,
          t,
        );
  }
  ClearChatPlayerData() {
    this.RMt.clear();
  }
  AddChatContent(t, e, o, a, i, r, n, h, s, C, _) {
    n = t.AddChatContent(e, o, a, i, r, n, h, s, C, _);
    let v = 0;
    let m = 0;
    t instanceof PrivateChatRoom_1.PrivateChatRoom
      ? ((v = t.GetTargetPlayerId()),
        this.AddAndSavePrivateChatContent(t, i, a, e, !1, o, h),
        (m = 1))
      : t instanceof TeamChatRoom_1.TeamChatRoom
        ? (m = 2)
        : t instanceof WorldTeamChatRoom_1.WorldChatRoom && (m = 3),
      o !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        this.SetChatRoomRedDot(t, !0),
      r === Protocol_1.Aki.Protocol.FGs.Proto_None &&
        this.AddChatRowData(o, a, i, !1, m, h, v, C, _),
      this.NMt(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddChatContent,
        t,
        n,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshChatRedDot,
      );
  }
  NMt() {
    for (const t of this.xMt.values()) t.ClearCreateTime();
  }
  LoadAllChatSaveContent() {
    const t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Chat,
    );
    if (t) {
      let e;
      let o;
      const a = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsErrorChatReplace,
        !1,
      );
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "加载所有聊天室本地聊天记录时，判断是否已将错误的聊天记录替换",
          ["isErrorChatReplace", a],
        );
      for ([e, o] of t) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Chat",
            8,
            "加载所有聊天室本地聊天记录",
            ["ChatUniqueId", e],
            ["SaveNum", o.ChatRows.length],
          );
        for (const r of o.ChatRows)
          if (
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Chat",
                8,
                "加载所有聊天室本地聊天记录",
                ["ChatUniqueId", e],
                ["Content", r.Content],
              ),
            !a)
          )
            for (const n of o.ChatRows)
              n.Content = n.Content.replace(/'/g, "''");
        const i = Number(e);
        this.GMt.set(i, o);
      }
      a ||
        (LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.Chat,
          this.GMt,
        ) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Chat", 8, "已替换所有错误的聊天信息"),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.IsErrorChatReplace,
            !0,
          )));
    } else
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsErrorChatReplace,
        !0,
      );
  }
  AddAndSavePrivateChatContent(t, e, o, a, i, r, n) {
    (e = {
      ChatContentType: e,
      Content: o,
      MsgId: a,
      OfflineMsg: i,
      SenderUid: r,
      UtcTime: n,
    }),
      (o = t.LocalSaveMsgLimit);
    this.AddChatSaveContent(t.GetUniqueId(), e, o), this.SaveChatSaveContent();
  }
  AddChatSaveContent(t, e, o) {
    let a = this.GMt.get(t);
    let i;
    a
      ? ((i = a.ChatRows).length >= o && i.shift(),
        (e.Content = e.Content.replace(/'/g, "''")),
        i.push(e))
      : ((e.Content = e.Content.replace(/'/g, "''")),
        (a = { ChatRows: [e] }),
        this.GMt.set(t, a)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "添加本地缓存的聊天记录",
          ["chatRoomUniqueId", t],
          ["length", a.ChatRows.length],
          ["content", e.Content],
        );
  }
  RemoveChatSaveContent(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "删除本地缓存的聊天记录", [
        "chatRoomUniqueId",
        t,
      ]),
      this.GMt.delete(t),
      this.SaveChatSaveContent();
  }
  SaveChatSaveContent() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "------保存本地缓存的聊天记录-----");
    for (const [t, e] of this.GMt) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "保存的聊天室唯一Id",
          ["chatRoomUniqueId", t],
          ["length", e.ChatRows.length],
        );
      for (const a of e.ChatRows)
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Chat",
            8,
            "保存的聊天室本地聊天记录",
            ["content", a.Content],
            ["uniqueId", a.MsgId],
          );
    }
    const o = LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Chat,
      this.GMt,
    );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Chat", 8, "------保存本地缓存的聊天记录结束-----", [
        "bSuccess",
        o,
      ]);
  }
  GetChatRoomSaveInfo(t, o, a) {
    t = this.GMt.get(t);
    if (t) {
      const i = t.ChatRows;
      let e = -1;
      for (let t = i.length - 1; t > 0; t--) {
        const r = i[t];
        if (r) {
          if (r.MsgId === o) {
            e = t;
            break;
          }
          r.Content = r.Content.replace(/''/g, "'");
        }
      }
      if (!(e < 0)) return (t = Math.max(0, e - a)), i.slice(t, e);
    }
  }
  RequestPrivateRoomLocalHistory(t) {
    let e = t.GetUniqueId();
    const o = t.GetEarliestHistoryContentUniqueId();
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "===开始请求私人本地历史聊天记录===",
          ["chatUniqueId", e],
          ["fromContentUniqueId", o],
        ),
      !StringUtils_1.StringUtils.IsEmpty(o))
    ) {
      e = this.GetChatRoomSaveInfo(e, o, ChatDefine_1.READ_HISTORY_COUNT);
      if (e) {
        const a = [];
        for (const r of e) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Chat", 8, "读取本地聊天记录:", [
              "content",
              r.Content,
            ]);
          const i = new Protocol_1.Aki.Protocol.BGs();
          (i.U3n = r.ChatContentType),
            (i.H3n = r.Content),
            (i.X3n = r.MsgId),
            (i.z3n = r.OfflineMsg),
            (i.Y3n = r.SenderUid),
            (i.J3n = r.UtcTime),
            a.push(i);
        }
        this.AddPrivateHistoryChatContent(t, a);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Chat", 8, "本地记录读取已读取结束");
    }
  }
  AddChatRowData(t, e, o, a, i, r, n, h, s, C = !0) {
    this.OMt(t, e, o, a, i, r, n, h, s),
      C && this.AMt.length > ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE && this.kMt();
  }
  SortChatRowData() {
    this.AMt.sort((t, e) => t.TimeStamp - e.TimeStamp);
  }
  ClampChatRowDataListLength() {
    const t = this.AMt.length;
    t <= ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE ||
      (this.AMt = this.AMt.slice(
        Math.max(t - ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE, 0),
      ));
  }
  SetTeamChatRowDataVisible(t) {
    for (const o of this.AMt) {
      const e = o.ContentChatRoomType;
      (e !== 2 && e !== 3) || (o.IsVisible = t);
    }
  }
  OMt(t, e, o, a, i, r, n, h, s) {
    t = new ChatRowData_1.ChatRowData(this.PMt++, t, e, o, a, i, r, n, h, s);
    this.AMt.push(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPushChatRowData,
        t,
      );
  }
  ClearChatRowData() {
    this.AMt.length = 0;
  }
  RemoveChatRowDataByChatRoomType(...e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "[ChatDebug]删除主界面聊天数据---开始",
        ["chatRoomType", e],
        ["chatRowDataListLength", this.AMt.length],
      );
    const o = [];
    for (let t = 0; t < this.AMt.length; t++) {
      const a = this.AMt[t];
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Chat",
          8,
          "[ChatDebug]删除主界面聊天数据---打印当前聊天记录",
          ["Content", a.Content],
          ["TimeStamp", a.TimeStamp],
        ),
        e.includes(a.ContentChatRoomType) && o.push(t);
    }
    for (const t of o) this.AMt.splice(t, 1);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Chat",
        8,
        "[ChatDebug]删除主界面聊天数据---结束",
        ["removeIndexList", o],
        ["chatRowDataListLength", this.AMt.length],
      );
  }
  kMt() {
    const t = this.AMt.shift();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPopChatRowData,
      t,
    );
  }
  GetChatRowDataList() {
    return this.AMt;
  }
  HasOfflineMassage() {
    for (const t of this.AMt) if (t.IsOfflineMassage) return !0;
    return !1;
  }
  AddPrivateHistoryChatContent(t, e) {
    const o = [];
    for (const r of e) {
      const a = r.Y3n;
      var i = {
        UtcTime: r.J3n,
        MsgId: r.X3n,
        SenderUid: a,
        Content: r.H3n,
        ChatContentType: r.U3n,
        OfflineMsg: r.z3n,
      };
      var i =
        (o.push(i), ModelManager_1.ModelManager.FriendModel?.GetFriendById(a));
      i && this.RefreshChatPlayerData(a, i.PlayerHeadPhoto, i.PlayerName);
    }
    t.AddHistoryChatContent(o),
      t.Open(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        t,
      );
  }
  AddTeamHistoryChatContent(t, e) {
    const o = [];
    for (const i of e) {
      const a = {
        SenderPlayerId: i.uEs,
        SenderPlayerName: i.dEs,
        UtcTime: i.CEs,
        SenderIcon: i.cEs,
        Content: i.H3n,
        ChatContentType: i.U3n,
        NoticeType: i.mEs,
      };
      o.push(a);
    }
    t.AddHistoryChatContent(o),
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
      (this.bMt = t),
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
      (this.bMt = t), this.RequestOpenPrivateChatRoom(t);
    } else (this.bMt = t), this.RequestOpenChatRoom(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshChatRedDot,
    );
  }
  LeaveCurrentChatRoom() {
    this.bMt = void 0;
  }
  RemovePrivateChatRoom(t) {
    this.bMt instanceof PrivateChatRoom_1.PrivateChatRoom &&
      this.bMt.GetTargetPlayerId() === t &&
      this.LeaveCurrentChatRoom();
    const e = this.GetPrivateChatRoom(t);
    e &&
      (e.Reset(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 删除私人聊天室", ["PlayerId", t]),
      this.xMt.delete(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemovePrivateChatRoom,
        t,
      ));
  }
  ClosePrivateChatRoom(t) {
    this.bMt instanceof PrivateChatRoom_1.PrivateChatRoom &&
      this.bMt.GetTargetPlayerId() === t &&
      (this.bMt = void 0);
    const e = this.GetPrivateChatRoom(t);
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
    let e;
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
    return this.bMt;
  }
  HasRedDot() {
    for (const t of this.xMt.values()) if (t.GetIsShowRedDot()) return !0;
    return !!this.wMt?.GetIsShowRedDot() || !!this.BMt?.GetIsShowRedDot();
  }
  TryGetPrivateChatRoom(t) {
    let e = this.GetPrivateChatRoom(t);
    return (e = e || this.NewPrivateChatRoom(t));
  }
  NewPrivateChatRoom(t) {
    const e = new PrivateChatRoom_1.PrivateChatRoom(t, 1);
    return (
      this.xMt.set(t, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCreatePrivateChatRoom,
        t,
      ),
      e
    );
  }
  NewTeamChatRoom() {
    return (this.wMt = new TeamChatRoom_1.TeamChatRoom(2)), this.wMt;
  }
  NewWorldChatRoom() {
    return (this.BMt = new WorldTeamChatRoom_1.WorldChatRoom(2)), this.BMt;
  }
  SelectedPrivateChatFriend(t) {
    t = this.TryGetPrivateChatRoom(t);
    t.CanChat() && this.JoinChatRoom(t);
  }
  GetPrivateChatRoom(t) {
    return this.xMt.get(t);
  }
  GetTeamChatRoom() {
    return this.wMt;
  }
  SetTeamChatRoom(t) {
    this.wMt = t;
  }
  GetWorldChatRoom() {
    return this.BMt;
  }
  SetWorldChatRoom(t) {
    this.BMt = t;
  }
  GetAllSortedChatRoom() {
    const t = [];
    for (const o of this.xMt.values())
      o.GetIsOpen() && o.CanChat() && t.push(o);
    t.sort((t, e) => {
      let o = t.GetIsShowRedDot() ? 1 : 0;
      let a = e.GetIsShowRedDot() ? 1 : 0;
      return o != a
        ? a - o
        : (a = t.IsOnline() ? 1 : 0) != (o = e.IsOnline() ? 1 : 0)
          ? o - a
          : ((o = t.GetLastTimeStamp()),
            (a = e.GetLastTimeStamp()),
            o === 0
              ? -1
              : a === 0
                ? 1
                : o !== a
                  ? a - o
                  : e.GetCreateTimeStamp() - t.GetCreateTimeStamp());
    });
    let e = this.GetTeamChatRoom();
    return e ? t.unshift(e) : (e = this.GetWorldChatRoom()) && t.unshift(e), t;
  }
  IsInPrivateChatRoom(t) {
    t = this.GetPrivateChatRoom(t);
    return !!t && t.GetIsOpen();
  }
  AddMutePlayer(t) {
    this.qMt.push(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddMutePlayer,
        t,
      );
  }
  RemoveMutePlayer(t) {
    const e = this.qMt.indexOf(t);
    e < 0 ||
      (this.qMt.splice(e, 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        t,
      ));
  }
  ClearAllMutePlayer() {
    this.qMt.length = 0;
  }
  IsInMute(t) {
    return this.qMt.indexOf(t) >= 0;
  }
}
exports.ChatModel = ChatModel;
// # sourceMappingURL=ChatModel.js.map
