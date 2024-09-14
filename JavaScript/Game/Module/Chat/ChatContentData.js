"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatContentData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class ChatContentData {
  constructor(t, s, e, i, a, h, r, n, o, M, c, d, l) {
    (this.ContentUniqueId = t),
      (this.SenderPlayerId = s),
      (this.Content = e),
      (this.ContentType = i),
      (this.NoticeType = a),
      (this.IsOfflineMassage = h),
      (this.TimeStamp = r),
      (this.LastTimeStamp = n),
      (this.ChatRoomType = o),
      (this.SenderPlayerName = M),
      (this.SenderPlayerIcon = c),
      (this.PsOnlineId = d),
      (this.PsAccountId = l);
  }
  IsOwnSend() {
    return (
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
      this.SenderPlayerId
    );
  }
}
exports.ChatContentData = ChatContentData;
//# sourceMappingURL=ChatContentData.js.map
