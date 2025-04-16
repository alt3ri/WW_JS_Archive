"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StackableChessManager = void 0);
const StackableChessboradPoint_1 = require("./StackableChessboradPoint"),
  StackableChessItem_1 = require("./StackableChessItem");
class StackableChessManager {
  CreateChessboardPoint() {
    return new StackableChessboradPoint_1.StackableChessboardPoint();
  }
  CreateChessItem() {
    return new StackableChessItem_1.StackableChessItem();
  }
  GetChessAgent(e, s) {
    if (0 === e) {
      e = s?.Entity;
      if (e?.Valid) return e.GetComponent(279);
    }
  }
}
exports.StackableChessManager = StackableChessManager;
//# sourceMappingURL=StackableChessManager.js.map
