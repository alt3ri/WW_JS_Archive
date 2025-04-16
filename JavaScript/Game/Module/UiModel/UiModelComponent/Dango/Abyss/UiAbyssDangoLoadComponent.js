"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var i,
      s = arguments.length,
      d =
        s < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      d = Reflect.decorate(e, o, t, n);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (i = e[r]) && (d = (s < 3 ? i(d) : 3 < s ? i(o, t, d) : i(o, t)) || d);
    return 3 < s && d && Object.defineProperty(o, t, d), d;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiAbyssDangoLoadComponent = void 0);
const UiModelComponentDefine_1 = require("../../../Define/UiModelComponentDefine"),
  UiModelLoadComponent_1 = require("../../Common/UiModelLoadComponent");
let UiAbyssDangoLoadComponent = class UiAbyssDangoLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments), (this.dSc = void 0);
  }
  OnInit() {
    super.OnInit(), (this.dSc = this.Owner.CheckGetComponent(23));
  }
  OnEnd() {
    super.OnEnd(), (this.dSc = void 0);
  }
  LoadModelByDangoId(e, o, t, n) {
    (this.dSc.DangoId = e),
      (this.UiModelDataComponent.ModelConfigId = o),
      (this.LoadFinishCallBack = n),
      this.LoadModel(t, void 0, 1);
  }
};
(UiAbyssDangoLoadComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(26)],
  UiAbyssDangoLoadComponent,
)),
  (exports.UiAbyssDangoLoadComponent = UiAbyssDangoLoadComponent);
//# sourceMappingURL=UiAbyssDangoLoadComponent.js.map
