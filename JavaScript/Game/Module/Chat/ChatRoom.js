"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatRoom = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ChatContentData_1 = require("./ChatContentData");
class ChatRoom {
  constructor(t, e) {
    (this.ChatRoomType = 0),
      (this.ChatContentList = []),
      (this.eSt = -1),
      (this.tSt = !1),
      (this.Mne = 0),
      (this.EarliestHistoryContentUniqueId = ""),
      (this.jFe = !1),
      (this.LocalSaveMsgLimit = 0),
      (this.ChatCd = 0),
      (this.ChatRoomType = t),
      (this.Mne = e),
      (this.jFe = !1);
    t = ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne);
    t &&
      ((this.LocalSaveMsgLimit = t.LocalSaveMsgLimit),
      (this.ChatCd = t.ChatCd));
  }
  Reset() {
    (this.ChatContentList.length = 0), (this.eSt = -1), (this.jFe = !1);
  }
  Open() {
    this.jFe ||
      ((this.eSt = TimeUtil_1.TimeUtil.GetServerTime()),
      (this.jFe = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 打开聊天室", [
          "uniqueId",
          this.GetUniqueId(),
        ]));
  }
  Close() {
    this.jFe &&
      ((this.ChatContentList.length = 0),
      (this.eSt = -1),
      (this.jFe = !1),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Chat", 8, " 关闭聊天室", [
        "uniqueId",
        this.GetUniqueId(),
      ]);
  }
  GetIsOpen() {
    return this.jFe;
  }
  SetIsShowRedDot(t) {
    this.tSt = t;
  }
  GetIsShowRedDot() {
    return this.tSt;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetUniqueId() {
    return -1;
  }
  GetChatConfig() {
    return ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne);
  }
  GetChatContentList() {
    return this.ChatContentList;
  }
  GetEarliestHistoryContentUniqueId() {
    return this.EarliestHistoryContentUniqueId;
  }
  GetCreateTimeStamp() {
    return this.eSt;
  }
  ClearCreateTime() {
    this.eSt = -1;
  }
  GetLastTimeStamp() {
    var t = this.ChatContentList.length - 1;
    return t < 0 ? 0 : this.ChatContentList[t].TimeStamp;
  }
  AddChatContent(t, e, i, s, r, h, o, n, a, C, u, _) {
    t = new ChatContentData_1.ChatContentData(
      t,
      e,
      i,
      s,
      r,
      h,
      o,
      n,
      this.ChatRoomType,
      a,
      C,
      u,
      _,
    );
    return this.ChatContentList.push(t), t;
  }
  GetLastChatContentData(t = 1) {
    t = this.ChatContentList.length - t;
    if (!(t < 0)) return this.ChatContentList[t];
  }
  AddHistoryChatContent(t) {
    t.sort((t, e) => {
      var i = t.UtcTime,
        s = e.UtcTime;
      return i && s
        ? "number" == typeof i && "number" == typeof s
          ? i - s
          : Number(MathUtils_1.MathUtils.LongToBigInt(i)) -
            Number(MathUtils_1.MathUtils.LongToBigInt(s))
        : t.SenderUid - e.SenderUid;
    }),
      (this.EarliestHistoryContentUniqueId = t[0].MsgId);
    var i = [];
    let s = void 0;
    for (const u of t) {
      var r = u.SenderUid,
        h = u.Content,
        o = u.ChatContentType,
        n = u.OfflineMsg,
        a = u.MsgId,
        C = u.UtcTime;
      let t = 0,
        e =
          ((t =
            "number" == typeof C
              ? C
              : C
                ? Number(MathUtils_1.MathUtils.LongToBigInt(u.UtcTime))
                : TimeUtil_1.TimeUtil.GetServerTime()),
          0);
      s && (e = s.TimeStamp);
      C = new ChatContentData_1.ChatContentData(
        a,
        r,
        h,
        o,
        Protocol_1.Aki.Protocol.GFs.Proto_None,
        n,
        t,
        e,
        this.ChatRoomType,
        void 0,
        void 0,
      );
      (s = C), i.push(C);
    }
    this.ChatContentList = i.concat(this.ChatContentList);
  }
}
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map
