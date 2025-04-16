"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCallFunction = void 0);
class FbCallFunction {
  constructor(t) {
    (this.FbDataInternal = t), (this.x_h = !1), (this.FGi = void 0);
  }
  static Create(t) {
    if (t) return new FbCallFunction(t);
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
}
exports.FbCallFunction = FbCallFunction;
//# sourceMappingURL=FbCallFunction.js.map
