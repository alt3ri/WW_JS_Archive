"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatPlayerData = void 0);
class ChatPlayerData {
  constructor(t) {
    (this.j8 = 0), (this.ZEt = 0), (this.B9e = ""), (this.j8 = t);
  }
  SetPlayerId(t) {
    this.j8 = t;
  }
  GetPlayerId() {
    return this.j8;
  }
  SetPlayerIcon(t) {
    this.ZEt = t ?? 0;
  }
  GetPlayerIcon() {
    return this.ZEt;
  }
  SetPlayerName(t) {
    this.B9e = t ?? "";
  }
  GetPlayerName() {
    return this.B9e;
  }
}
exports.ChatPlayerData = ChatPlayerData;
//# sourceMappingURL=ChatPlayerData.js.map
