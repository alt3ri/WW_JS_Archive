"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatPlayerData = void 0);
class ChatPlayerData {
  constructor(t) {
    (this.j8 = 0),
      (this.ZEt = 0),
      (this.B9e = ""),
      (this.Nmc = 0),
      (this.Vmc = void 0),
      (this.eEi = 0),
      (this.j8 = t);
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
  SetPlayerTitle(t) {
    0 !== t.length &&
      ((t = t.split("_")),
      (this.Nmc = parseInt(t[0])),
      (t = 2 === t.length ? parseInt(t[1]) : void 0),
      (this.Vmc = t));
  }
  GetPlayerTitleId() {
    return this.Nmc;
  }
  GetPlayerTitleStarLevel() {
    return this.Vmc;
  }
  SetSex(t) {
    this.eEi = t;
  }
  GetSex() {
    return this.eEi;
  }
}
exports.ChatPlayerData = ChatPlayerData;
//# sourceMappingURL=ChatPlayerData.js.map
