"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputFilter = void 0);
const SetUtility_1 = require("../../Core/Container/SetUtility");
class InputFilter {
  constructor(t, i, e, s) {
    (this.Actions = new Set(t)),
      (this.BlockActions = new Set(i)),
      (this.Axes = new Set(e)),
      (this.BlockAxes = new Set(s));
  }
  ListenToAction(t) {
    return this.Actions?.has(t);
  }
  ListenToAxis(t) {
    return this.Axes?.has(t);
  }
  BlockAction(t) {
    return this.BlockActions?.has(t);
  }
  BlockAxis(t) {
    return this.BlockAxes?.has(t);
  }
  Union(t) {
    var i = new InputFilter(
      this.Actions,
      this.BlockActions,
      this.Axes,
      this.BlockAxes,
    );
    return (
      SetUtility_1.SetUtility.AddToSet(i.Actions, t.Actions),
      SetUtility_1.SetUtility.AddToSet(i.BlockActions, t.BlockActions),
      SetUtility_1.SetUtility.AddToSet(i.Axes, t.Axes),
      SetUtility_1.SetUtility.AddToSet(i.BlockAxes, t.BlockAxes),
      i
    );
  }
}
exports.InputFilter = InputFilter;
//# sourceMappingURL=InputFilter.js.map
