"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadAsyncPromise = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class LoadAsyncPromise {
  constructor(e, s, t = 100) {
    (this.ZAo = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.ePo = new CustomPromise_1.CustomPromise()),
      this.tPo(e, s, t);
  }
  get CustomPromise() {
    return this.ePo;
  }
  get Promise() {
    return this.CustomPromise?.Promise;
  }
  get HandleId() {
    return this.ZAo;
  }
  tPo(e, s, t = 100) {
    this.ZAo = ResourceSystem_1.ResourceSystem.LoadAsync(
      e,
      s,
      (e, s) => {
        this.CustomPromise.SetResult(e);
      },
      t,
    );
  }
  CancelAsyncLoad() {
    this.HandleId !== ResourceSystem_1.ResourceSystem.InvalidId &&
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.HandleId);
  }
}
exports.LoadAsyncPromise = LoadAsyncPromise;
//# sourceMappingURL=LoadAsyncPromise.js.map
