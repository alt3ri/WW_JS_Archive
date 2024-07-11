"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatRoom = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ChatContentData_1 = require("./ChatContentData");
class ChatRoom {
  constructor(t, e) {
    (this.ChatRoomType = 0),
      (this.ChatContentList = []),
      (this.VMt = -1),
      (this.HMt = !1),
      (this.Mne = 0),
      (this.EarliestHistoryContentUniqueId = ""),
      (this.R2e = !1),
      (this.LocalSaveMsgLimit = 0),
      (this.ChatCd = 0),
      (this.ChatRoomType = t),
      (this.Mne = e),
      (this.R2e = !1);
    t = ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne);
    t &&
      ((this.LocalSaveMsgLimit = t.LocalSaveMsgLimit),
      (this.ChatCd = t.ChatCd));
  }
  Reset() {
    (this.ChatContentList.length = 0), (this.VMt = -1), (this.R2e = !1);
  }
  Open() {
    this.R2e ||
      ((this.VMt = TimeUtil_1.TimeUtil.GetServerTime()),
      (this.R2e = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Chat", 8, " 打开聊天室", [
          "uniqueId",
          this.GetUniqueId(),
        ]));
  }
  Close() {
    this.R2e &&
      ((this.ChatContentList.length = 0),
      (this.VMt = -1),
      (this.R2e = !1),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Chat", 8, " 关闭聊天室", [
        "uniqueId",
        this.GetUniqueId(),
      ]);
  }
  GetIsOpen() {
    return this.R2e;
  }
  SetIsShowRedDot(t) {
    this.HMt = t;
  }
  GetIsShowRedDot() {
    return this.HMt;
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
    return this.VMt;
  }
  ClearCreateTime() {
    this.VMt = -1;
  }
  GetLastTimeStamp() {
    const t = this.ChatContentList.length - 1;
    return t < 0 ? 0 : this.ChatContentList[t].TimeStamp;
  }
  AddChatContent(t, e, i, s, r, h, o, n, a, C) {
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
    );
    return this.ChatContentList.push(t), t;
  }
  GetLastChatContentData(t = 1) {
    t = this.ChatContentList.length - t;
    if (!(t < 0)) return this.ChatContentList[t];
  }
  AddHistoryChatContent(t) {
    t.sort((t, e) => {
      const i = t.UtcTime;
      const s = e.UtcTime;
      return i && s
        ? typeof i === "number" && typeof s === "number"
          ? i - s
          : Number(MathUtils_1.MathUtils.LongToBigInt(i)) -
            Number(MathUtils_1.MathUtils.LongToBigInt(s))
        : t.SenderUid - e.SenderUid;
    }),
      (this.EarliestHistoryContentUniqueId = t[0].MsgId);
    const i = [];
    let s = void 0;
    for (const u of t) {
      const r = u.SenderUid;
      const h = u.Content;
      const o = u.ChatContentType;
      const n = u.OfflineMsg;
      const a = u.MsgId;
      let C = u.UtcTime;
      let t = 0;
      let e =
        ((t =
          typeof C === "number"
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
        Protocol_1.Aki.Protocol.FGs.Proto_None,
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
// # sourceMappingURL=ChatRoom.js.map
