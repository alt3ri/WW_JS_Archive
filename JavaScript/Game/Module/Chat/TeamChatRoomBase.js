"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamChatRoomBase = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ChatContentData_1 = require("./ChatContentData");
const ChatRoom_1 = require("./ChatRoom");
class TeamChatRoomBase extends ChatRoom_1.ChatRoom {
  AddHistoryChatContent(t) {
    this.EarliestHistoryContentUniqueId = "";
    const o = [];
    let a = void 0;
    for (const n of t) {
      var i = n.SenderPlayerId;
      const s = n.Content;
      const r = n.ChatContentType;
      const h = n.NoticeType;
      var C = n.UtcTime;
      let t = 0;
      let e =
        ((t =
          typeof C === "number"
            ? C
            : C
              ? Number(MathUtils_1.MathUtils.LongToBigInt(n.UtcTime))
              : TimeUtil_1.TimeUtil.GetServerTime()),
        0);
      a && (e = a.TimeStamp);
      var C = n.SenderPlayerName;
      const m = n.SenderIcon;
      var i = new ChatContentData_1.ChatContentData(
        "",
        i,
        s,
        r,
        h,
        !0,
        t,
        e,
        this.ChatRoomType,
        C,
        m,
      );
      (a = i), o.push(i);
    }
    this.ChatContentList = o.concat(this.ChatContentList);
  }
}
exports.TeamChatRoomBase = TeamChatRoomBase;
// # sourceMappingURL=TeamChatRoomBase.js.map
