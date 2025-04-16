"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionInitState =
    exports.unionToUnionInitState =
    exports.UnionInitState =
      void 0);
const init_state_barrier_lock_js_1 = require("../fb-component/init-state-barrier-lock.js"),
  init_state_birth_js_1 = require("../fb-component/init-state-birth.js"),
  init_state_digital_js_1 = require("../fb-component/init-state-digital.js"),
  init_state_standby_js_1 = require("../fb-component/init-state-standby.js"),
  init_state_wu_yin_qu_js_1 = require("../fb-component/init-state-wu-yin-qu.js");
var UnionInitState;
function unionToUnionInitState(t, i) {
  switch (UnionInitState[t]) {
    case "NONE":
      return;
    case "InitStateBarrierLock":
      return i(new init_state_barrier_lock_js_1.InitStateBarrierLock());
    case "InitStateBirth":
      return i(new init_state_birth_js_1.InitStateBirth());
    case "InitStateDigital":
      return i(new init_state_digital_js_1.InitStateDigital());
    case "InitStateStandby":
      return i(new init_state_standby_js_1.InitStateStandby());
    case "InitStateWuYinQu":
      return i(new init_state_wu_yin_qu_js_1.InitStateWuYinQu());
    default:
      return;
  }
}
function unionListToUnionInitState(t, i, n) {
  switch (UnionInitState[t]) {
    case "NONE":
      return;
    case "InitStateBarrierLock":
      return i(n, new init_state_barrier_lock_js_1.InitStateBarrierLock());
    case "InitStateBirth":
      return i(n, new init_state_birth_js_1.InitStateBirth());
    case "InitStateDigital":
      return i(n, new init_state_digital_js_1.InitStateDigital());
    case "InitStateStandby":
      return i(n, new init_state_standby_js_1.InitStateStandby());
    case "InitStateWuYinQu":
      return i(n, new init_state_wu_yin_qu_js_1.InitStateWuYinQu());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.InitStateBarrierLock = 1)] = "InitStateBarrierLock"),
    (t[(t.InitStateBirth = 2)] = "InitStateBirth"),
    (t[(t.InitStateDigital = 3)] = "InitStateDigital"),
    (t[(t.InitStateStandby = 4)] = "InitStateStandby"),
    (t[(t.InitStateWuYinQu = 5)] = "InitStateWuYinQu");
})((UnionInitState = exports.UnionInitState || (exports.UnionInitState = {}))),
  (exports.unionToUnionInitState = unionToUnionInitState),
  (exports.unionListToUnionInitState = unionListToUnionInitState);
//# sourceMappingURL=union-init-state.js.map
