"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventLockInputState = void 0);
const InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine");
class LevelEventLockInputState {
  static Lock(t) {
    (this.CLe = !0), (this.InputTagNames = t);
  }
  static Unlock() {
    (this.CLe = !1), (this.InputLimitEsc = !1);
  }
  static IsLockInput() {
    return !this.GmViewOpening && this.CLe;
  }
  static get IsInputTagHasUiInputRoot() {
    return (
      !!LevelEventLockInputState.InputTagNames &&
      LevelEventLockInputState.InputTagNames.includes(
        InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
      )
    );
  }
}
((exports.LevelEventLockInputState = LevelEventLockInputState).InputLimitView =
  []),
  (LevelEventLockInputState.InputLimitEsc = !1);
//# sourceMappingURL=LevelEventLockInputState.js.map
