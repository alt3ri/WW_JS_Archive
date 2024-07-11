"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharRenderBase = void 0);
class CharRenderBase {
  constructor() {
    (this.RenderComponent = void 0), (this.jlr = !1);
  }
  GetIsInitSuc() {
    return this.jlr;
  }
  GetRenderingComponent() {
    return this.RenderComponent;
  }
  OnInitSuccess() {
    this.jlr = !0;
  }
  Awake(e) {
    this.RenderComponent = e;
  }
  Start() {}
  Update() {}
  LateUpdate() {}
  Destroy() {}
  GetDeltaTime() {
    return this.RenderComponent.GetDeltaTime();
  }
}
exports.CharRenderBase = CharRenderBase;
//# sourceMappingURL=CharRenderBase.js.map
