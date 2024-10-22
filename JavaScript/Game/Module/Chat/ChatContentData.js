"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatContentData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class ChatContentData {
  constructor(t, s, e, a, i, h, r, n, o, M, c) {
    (this.ContentUniqueId = t),
      (this.SenderPlayerId = s),
      (this.Content = e),
      (this.ContentType = a),
      (this.NoticeType = i),
      (this.IsOfflineMassage = h),
      (this.TimeStamp = r),
      (this.LastTimeStamp = n),
      (this.ChatRoomType = o),
      (this.SenderPlayerName = M),
      (this.SenderPlayerIcon = c);
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
