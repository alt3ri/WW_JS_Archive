"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorBaseProxy = void 0);
const ComponentAction_1 = require("./ComponentAction");
class UiBehaviorBaseProxy extends ComponentAction_1.ComponentAction {
  constructor(e) {
    super(), (this.U_r = e);
  }
  async OnCreateAsyncImplement() {
    return await this.U_r.OnUiCreateAsync?.(), !0;
  }
  async OnStartAsyncImplement() {
    return this.U_r.OnAfterUiStart?.(), Promise.resolve();
  }
  async OnShowAsyncImplement() {
    return this.U_r.OnAfterUiShow?.(), Promise.resolve();
  }
  async OnHideAsyncImplement() {
    return this.U_r.OnBeforeUiHide?.(), Promise.resolve();
  }
  async OnDestroyAsyncImplement() {
    return this.U_r.OnBeforeDestroy?.(), (this.U_r = void 0), Promise.resolve();
  }
  OnDestroyImplementCompatible() {
    this.U_r.OnBeforeDestroy?.(), (this.U_r = void 0);
  }
}
exports.UiBehaviorBaseProxy = UiBehaviorBaseProxy;
//# sourceMappingURL=UiBehaviorBase.js.map
