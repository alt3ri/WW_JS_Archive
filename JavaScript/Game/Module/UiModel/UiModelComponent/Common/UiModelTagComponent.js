"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, i);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (o = e[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, n, r) : o(t, n)) || r);
    return 3 < s && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelTagComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiTagComponent_1 = require("../../../UiComponent/UiTagComponent"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelTagComponent = class UiModelTagComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Xte = new UiTagComponent_1.UiTagComponent()),
      (this.Jwr = void 0),
      (this.OnAnsBegin = (e) => {
        this.AddTagById(e.TagId);
      }),
      (this.OnAnsEnd = (e) => {
        this.ReduceTagById(e.TagId);
      }),
      (this.hBr = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
          t,
        );
      }),
      (this.lBr = (e, t) => {
        var n = this.Owner.CheckGetComponent(17);
        t ? n?.PlayLightSequence() : n?.StopLightSequence();
      });
  }
  OnInit() {
    this.Jwr = this.Owner.CheckGetComponent(6);
  }
  OnStart() {
    this.Jwr?.RegisterAnsTrigger(
      "UiTagAnsContext",
      this.OnAnsBegin,
      this.OnAnsEnd,
    ),
      this.Xte.AddListener(348713373, this.hBr),
      this.Xte.AddListener(-1371920538, this.lBr);
  }
  OnEnd() {
    this.Xte.RemoveListener(348713373, this.hBr),
      this.Xte.RemoveListener(-1371920538, this.lBr);
  }
  OnClear() {
    this.Xte.RemoveAllTag();
  }
  AddTagById(e, ...t) {
    this.Xte.AddTagById(e, ...t);
  }
  ReduceTagById(e, ...t) {
    this.Xte.ReduceTagById(e, ...t);
  }
  ContainsTagById(e) {
    return this.Xte.ContainsTagById(e);
  }
};
(UiModelTagComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(7)],
  UiModelTagComponent,
)),
  (exports.UiModelTagComponent = UiModelTagComponent);
//# sourceMappingURL=UiModelTagComponent.js.map
