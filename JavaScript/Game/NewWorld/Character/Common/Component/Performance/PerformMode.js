"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActionMode =
    exports.EcologyMode =
    exports.PlotMode =
    exports.PerformModeBase =
      void 0);
const Queue_1 = require("../../../../../../Core/Container/Queue");
class PerformModeBase {
  constructor(e, t, s) {
    (this.Mode = e),
      (this.PerformComp = t),
      (this.Machine = s),
      (this.CachePerformAction = new Queue_1.Queue());
  }
  PushAction(e) {
    this.CachePerformAction.Push(e);
  }
  PopAction() {
    if (!this.CachePerformAction.Empty) return this.CachePerformAction.Pop();
  }
  CheckEnter() {
    return !1;
  }
  CheckExit() {
    return !1;
  }
  Clear() {
    this.CachePerformAction.Clear();
  }
}
class PlotMode extends (exports.PerformModeBase = PerformModeBase) {
  CheckEnter() {
    return this.PerformComp.IsInPlot;
  }
  CheckExit() {
    return !this.PerformComp.IsInPlot && this.CachePerformAction.Empty;
  }
}
exports.PlotMode = PlotMode;
class EcologyMode extends PerformModeBase {
  CheckEnter() {
    return !this.CachePerformAction.Empty;
  }
  CheckExit() {
    return (
      this.Machine.Modes.get(1).CheckEnter() ||
      this.Machine.Modes.get(2).CheckEnter() ||
      this.CachePerformAction.Empty
    );
  }
}
exports.EcologyMode = EcologyMode;
class ActionMode extends PerformModeBase {
  CheckEnter() {
    return !this.CachePerformAction.Empty;
  }
  CheckExit() {
    return (
      this.Machine.Modes.get(1).CheckEnter() || !this.Machine.CurrentAction
    );
  }
}
exports.ActionMode = ActionMode;
//# sourceMappingURL=PerformMode.js.map
