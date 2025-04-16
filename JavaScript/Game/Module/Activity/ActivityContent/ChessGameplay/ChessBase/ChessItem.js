"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChessItem = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class ChessItem {
  constructor() {
    (this.xe = 0),
      (this.CurrentState = 0),
      (this.CurrentPoint = void 0),
      (this.Agent = void 0),
      (this.okc = 0);
  }
  Init(t, s) {
    (this.xe = t), (this.Agent = s);
  }
  OnClear() {}
  GetId() {
    return this.xe;
  }
  SetCurrentPoint(t) {
    var s,
      e = this.CurrentPoint;
    (this.CurrentPoint = t),
      e &&
        (s = ModelManager_1.ModelManager.ChessModel.GetTerminalPoint()) &&
        (s.GetId() === t.GetId() ||
          ((s = s.GetSortIndex()),
          (t = t.GetSortIndex()),
          e.GetSortIndex() < s && s < t)) &&
        this.okc++;
  }
  GetCurrentPoint() {
    return this.CurrentPoint;
  }
  GetReachTerminalTimes() {
    return this.okc;
  }
  GetLocation() {
    return this.Agent?.GetLocation();
  }
  async MoveAsync(t, s) {
    if (0 === this.CurrentState && this.Agent) {
      this.CurrentState = 1;
      const e = new CustomPromise_1.CustomPromise();
      this.Agent.Move(t, s, () => {
        e.SetResult();
      }),
        await e.Promise,
        (this.CurrentState = 0);
    }
  }
  Teleport(t, s) {
    0 === this.CurrentState && this.Agent && this.Agent.Teleport(t, s);
  }
  async PerformAsync(t) {
    if (0 === this.CurrentState && this.Agent) {
      const s = new CustomPromise_1.CustomPromise();
      (this.CurrentState = 2),
        this.Agent.Perform(t, this.CurrentPoint?.GetPointLocation(), () => {
          s.SetResult();
        }),
        await s.Promise,
        (this.CurrentState = 0);
    }
  }
}
exports.ChessItem = ChessItem;
//# sourceMappingURL=ChessItem.js.map
