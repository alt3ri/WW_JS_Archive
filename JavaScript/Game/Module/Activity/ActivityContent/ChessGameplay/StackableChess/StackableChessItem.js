"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StackableChessItem = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  ChessItem_1 = require("../ChessBase/ChessItem");
class StackableChessItem extends ChessItem_1.ChessItem {
  constructor() {
    super(...arguments), (this.Agent = void 0), (this.z1c = void 0);
  }
  OnClear() {
    this.SetNextItem(void 0);
  }
  SetNextItem(t) {
    this.z1c !== t &&
      this.Agent &&
      this.z1c?.Agent?.DetachFromTarget(this.Agent),
      this.Agent && t?.Agent?.AttachToTarget(this.Agent),
      (this.z1c = t);
  }
  GetNextItem() {
    return this.z1c;
  }
  GetStackableLocation() {
    return this.Agent?.GetStackableLocation();
  }
  async MoveAsync(t, s) {
    var e = this.Agent;
    if (0 === this.CurrentState && e) {
      const i = new CustomPromise_1.CustomPromise();
      (this.CurrentState = 1),
        e.Move(t, s, () => {
          i.SetResult();
        }),
        this.J1c(e, !0),
        await i.Promise,
        (this.CurrentState = 0),
        this.J1c(e, !1);
    }
  }
  async PerformAsync(t) {
    var s = this.Agent;
    if (0 === this.CurrentState && s) {
      var e = s.IsPerformRecursion(t);
      const i = new CustomPromise_1.CustomPromise();
      (this.CurrentState = 2),
        s.Perform(t, this.CurrentPoint?.GetPointLocation(), () => {
          i.SetResult();
        }),
        e && this.po1(s, t, !0),
        await i.Promise,
        (this.CurrentState = 0),
        e && this.po1(s, t, !1);
    }
  }
  J1c(t, s) {
    var e = new Set();
    let i = this.z1c;
    for (; i && !e.has(i.GetId()); )
      e.add(i.GetId()), i?.Agent?.OnPreviousMoveStateChange(t, s), (i = i.z1c);
  }
  po1(t, s, e) {
    var i = new Set();
    let h = this.z1c;
    for (; h && !i.has(h.GetId()); )
      i.add(h.GetId()),
        h?.Agent?.OnPreviousPerformStateChange(t, s, e),
        (h = h.z1c);
  }
}
exports.StackableChessItem = StackableChessItem;
//# sourceMappingURL=StackableChessItem.js.map
