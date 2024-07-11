"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenEffectController = void 0);
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  FullScreenEffectView_1 = require("./FullScreenEffectView");
class FullScreenEffectController extends UiControllerBase_1.UiControllerBase {
  static async BeginEffect(t, e) {
    var i;
    this.b9t.has(t) ||
      (await (i = new FullScreenEffectView_1.FullScreenEffectView()).Init(t, e),
      this.b9t.add(t),
      this.q9t
        ? e >= this.q9t.Priority
          ? (this.q9t.SetEffectVisibility(!1, !0),
            this.G9t.Push(this.q9t),
            (this.q9t = i).SetEffectVisibility(!0, !0))
          : (i.SetEffectVisibility(!1, !1), this.G9t.Push(i))
        : ((this.q9t = i), this.q9t.SetEffectVisibility(!0, !0)));
  }
  static EndEffect(t) {
    t === this.q9t.Path
      ? this.q9t.DeActive()
      : this.b9t.has(t) && this.b9t.delete(t);
  }
  static EndCurView() {
    var t;
    this.q9t &&
      (this.b9t.delete(this.q9t.Path),
      this.q9t.SetEffectVisibility(!1, !0),
      this.q9t.Destroy(),
      (this.q9t = void 0),
      (t = this.N9t())) &&
      ((this.q9t = t), this.q9t.SetEffectVisibility(!0, !0));
  }
  static OnClear() {
    for (
      this.b9t.clear(),
        this.q9t && (this.q9t.SetEffectVisibility(!1, !0), this.q9t.Destroy());
      !this.G9t.Empty;

    )
      this.G9t.Pop().Destroy();
    return !0;
  }
  static N9t() {
    for (; !this.G9t.Empty; ) {
      var t = this.G9t.Pop();
      if (this.b9t.has(t.Path) && (this.b9t.delete(t.Path), t.IsEffectPlay()))
        return t;
      t.Destroy();
    }
  }
}
((exports.FullScreenEffectController = FullScreenEffectController).q9t =
  void 0),
  (FullScreenEffectController.b9t = new Set()),
  (FullScreenEffectController.G9t = new PriorityQueue_1.PriorityQueue(
    FullScreenEffectView_1.FullScreenEffectView.Compare,
  ));
//# sourceMappingURL=FullScreenEffectController.js.map
