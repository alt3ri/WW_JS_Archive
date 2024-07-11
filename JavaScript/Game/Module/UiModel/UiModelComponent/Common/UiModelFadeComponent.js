"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var d = t.length - 1; 0 <= d; d--)
        (o = t[d]) && (n = (h < 3 ? o(n) : 3 < h ? o(e, i, n) : o(e, i)) || n);
    return 3 < h && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelFadeComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelFadeComponent = class UiModelFadeComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ywr = void 0),
      (this.FHt = 0),
      (this.zwr = 0),
      (this.gle = 0),
      (this.r1t = 0),
      (this.kJo = void 0),
      (this.LPn = !1);
  }
  OnCreate() {
    this.LPn = !1;
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
  }
  OnEnd() {
    this.NeedTick && this.ywr?.SetDitherEffect(this.zwr),
      (this.LPn = !0),
      this.av();
  }
  Fade(t, e, i, s) {
    this.LPn ||
      ((this.FHt = t),
      (this.zwr = e),
      (this.r1t = i),
      (this.kJo = s),
      (this.gle = 0),
      (this.NeedTick = !0),
      this.ywr?.SetDitherEffect(t));
  }
  Tick(t) {
    this.gle += 1e3 * t;
    t =
      this.kJo.GetFloatValue(this.gle / this.r1t) * (this.zwr - this.FHt) +
      this.FHt;
    this.ywr?.SetDitherEffect(t),
      this.gle >= this.r1t && ((this.NeedTick = !1), this.av());
  }
  av() {
    (this.FHt = 0),
      (this.zwr = 0),
      (this.r1t = 0),
      (this.kJo = void 0),
      (this.gle = 0);
  }
};
(UiModelFadeComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(8)],
  UiModelFadeComponent,
)),
  (exports.UiModelFadeComponent = UiModelFadeComponent);
//# sourceMappingURL=UiModelFadeComponent.js.map
