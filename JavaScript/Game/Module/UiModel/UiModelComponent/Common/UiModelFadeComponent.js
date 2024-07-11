"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let o;
    const h = arguments.length;
    let n =
      h < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, s);
    else
      for (let d = t.length - 1; d >= 0; d--)
        (o = t[d]) && (n = (h < 3 ? o(n) : h > 3 ? o(e, i, n) : o(e, i)) || n);
    return h > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelFadeComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelFadeComponent = class UiModelFadeComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Qwr = void 0),
      (this.F7t = 0),
      (this.EBr = 0),
      (this.gle = 0),
      (this.Wht = 0),
      (this.HYo = void 0),
      (this.eAn = !1);
  }
  OnCreate() {
    this.eAn = !1;
  }
  OnInit() {
    this.Qwr = this.Owner.CheckGetComponent(0);
  }
  OnEnd() {
    this.NeedTick && this.Qwr?.SetDitherEffect(this.EBr),
      (this.eAn = !0),
      this.av();
  }
  Fade(t, e, i, s) {
    this.eAn ||
      ((this.F7t = t),
      (this.EBr = e),
      (this.Wht = i),
      (this.HYo = s),
      (this.gle = 0),
      (this.NeedTick = !0),
      this.Qwr?.SetDitherEffect(t));
  }
  Tick(t) {
    this.gle += 1e3 * t;
    t =
      this.HYo.GetFloatValue(this.gle / this.Wht) * (this.EBr - this.F7t) +
      this.F7t;
    this.Qwr?.SetDitherEffect(t),
      this.gle >= this.Wht && ((this.NeedTick = !1), this.av());
  }
  av() {
    (this.F7t = 0),
      (this.EBr = 0),
      (this.Wht = 0),
      (this.HYo = void 0),
      (this.gle = 0);
  }
};
(UiModelFadeComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(8)],
  UiModelFadeComponent,
)),
  (exports.UiModelFadeComponent = UiModelFadeComponent);
// # sourceMappingURL=UiModelFadeComponent.js.map
