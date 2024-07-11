"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamChatRoomBase = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ChatContentData_1 = require("./ChatContentData"),
  ChatRoom_1 = require("./ChatRoom");
class TeamChatRoomBase extends ChatRoom_1.ChatRoom {
  AddHistoryChatContent(t) {
    this.EarliestHistoryContentUniqueId = "";
    var o = [];
    let a = void 0;
    for (const n of t) {
      var i = n.SenderPlayerId,
        s = n.Content,
        r = n.ChatContentType,
        h = n.NoticeType,
        C = n.UtcTime;
      let t = 0,
        e =
          ((t =
            "number" == typeof C
              ? C
              : C
                ? Number(MathUtils_1.MathUtils.LongToBigInt(n.UtcTime))
                : TimeUtil_1.TimeUtil.GetServerTime()),
          0);
      a && (e = a.TimeStamp);
      var C = n.SenderPlayerName,
        m = n.SenderIcon,
        i = new ChatContentData_1.ChatContentData(
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
//# sourceMappingURL=TeamChatRoomBase.js.map
