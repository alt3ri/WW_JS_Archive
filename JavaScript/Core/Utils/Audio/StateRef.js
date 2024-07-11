"use strict";
let _StateRef_Group;
let _StateRef_State;
const __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (t, e, a, r, i) {
    if (r === "m") throw new TypeError("Private method is not writable");
    if (r === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e === "function" ? t === e && i : e.has(t))
      return r === "a" ? i.call(t, a) : i ? (i.value = a) : e.set(t, a), a;
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  };
const __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (t, e, a, r) {
    if (a === "a" && !r)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e === "function" ? t === e && r : e.has(t))
      return a === "m" ? r : a === "a" ? r.call(t) : r ? r.value : e.get(t);
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StateRef = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
class StateRef {
  constructor(t, e) {
    _StateRef_Group.set(this, void 0),
      _StateRef_State.set(this, void 0),
      __classPrivateFieldSet(this, _StateRef_Group, t, "f"),
      __classPrivateFieldSet(this, _StateRef_State, e, "f");
  }
  get State() {
    return __classPrivateFieldGet(this, _StateRef_State, "f");
  }
  set State(t) {
    __classPrivateFieldGet(this, _StateRef_State, "f") !== t &&
      (__classPrivateFieldSet(this, _StateRef_State, t, "f"),
      AudioSystem_1.AudioSystem.SetState(
        __classPrivateFieldGet(this, _StateRef_Group, "f"),
        __classPrivateFieldGet(this, _StateRef_State, "f"),
      ));
  }
  ClearObject() {
    return !0;
  }
}
(exports.StateRef = StateRef),
  (_StateRef_Group = new WeakMap()),
  (_StateRef_State = new WeakMap());
// # sourceMappingURL=StateRef.js.map
