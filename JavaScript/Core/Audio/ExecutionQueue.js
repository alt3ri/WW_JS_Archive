"use strict";
let _ExecutionQueue_Handle;
let _ExecutionQueue_Executing;
let _ExecutionQueue_Pending;
let _ExecutionQueue_TaskQueue;
const __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (e, t, i, u) {
    if (i === "a" && !u)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t === "function" ? e === t && u : t.has(e))
      return i === "m" ? u : i === "a" ? u.call(e) : u ? u.value : t.get(e);
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  };
const __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (e, t, i, u, n) {
    if (u === "m") throw new TypeError("Private method is not writable");
    if (u === "a" && !n)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t === "function" ? e === t && n : t.has(e))
      return u === "a" ? n.call(e, i) : n ? (n.value = i) : t.set(e, i), i;
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  };
Object.defineProperty(exports, "__esModule", { value: !0 });
const EXECUTION_QUEUE_ENABLE = !(exports.ExecutionQueue = void 0);
class ExecutionQueue {
  constructor() {
    _ExecutionQueue_Handle.set(this, 0),
      _ExecutionQueue_Executing.set(this, !1),
      _ExecutionQueue_Pending.set(this, new Set()),
      _ExecutionQueue_TaskQueue.set(this, []);
  }
  Enqueue(e) {
    let t, i;
    __classPrivateFieldSet(
      this,
      _ExecutionQueue_Handle,
      ((i = __classPrivateFieldGet(this, _ExecutionQueue_Handle, "f")),
      (t = i++),
      i),
      "f",
    );
    const u = t;
    return (
      EXECUTION_QUEUE_ENABLE
        ? (__classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").add(u),
          __classPrivateFieldGet(this, _ExecutionQueue_TaskQueue, "f").push(
            async () => {
              __classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").delete(
                u,
              ) && (await e(u));
            },
          ),
          __classPrivateFieldGet(this, _ExecutionQueue_Executing, "f") ||
            this.m8())
        : e(u),
      u
    );
  }
  Cancel(e) {
    return (
      !!EXECUTION_QUEUE_ENABLE &&
      __classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").delete(e)
    );
  }
  async m8() {
    for (__classPrivateFieldSet(this, _ExecutionQueue_Executing, !0, "f"); ; ) {
      const e = __classPrivateFieldGet(
        this,
        _ExecutionQueue_TaskQueue,
        "f",
      ).shift();
      if (!e)
        return void __classPrivateFieldSet(
          this,
          _ExecutionQueue_Executing,
          !1,
          "f",
        );
      await e();
    }
  }
}
(exports.ExecutionQueue = ExecutionQueue),
  (_ExecutionQueue_Handle = new WeakMap()),
  (_ExecutionQueue_Executing = new WeakMap()),
  (_ExecutionQueue_Pending = new WeakMap()),
  (_ExecutionQueue_TaskQueue = new WeakMap());
// # sourceMappingURL=ExecutionQueue.js.map
