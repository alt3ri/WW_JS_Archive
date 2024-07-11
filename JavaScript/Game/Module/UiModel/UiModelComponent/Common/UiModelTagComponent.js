"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    let o;
    const s = arguments.length;
    let r =
      s < 3 ? t : i === null ? (i = Object.getOwnPropertyDescriptor(t, n)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, n, i);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (o = e[h]) && (r = (s < 3 ? o(r) : s > 3 ? o(t, n, r) : o(t, n)) || r);
    return s > 3 && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelTagComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiTagComponent_1 = require("../../../UiComponent/UiTagComponent");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelTagComponent = class UiModelTagComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Xte = new UiTagComponent_1.UiTagComponent()),
      (this.SBr = void 0),
      (this.OnAnsBegin = (e) => {
        this.AddTagById(e.TagId);
      }),
      (this.OnAnsEnd = (e) => {
        this.ReduceTagById(e.TagId);
      }),
      (this.xBr = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
          t,
        );
      }),
      (this.wBr = (e, t) => {
        const n = this.Owner.CheckGetComponent(17);
        t ? n?.PlayLightSequence() : n?.StopLightSequence();
      });
  }
  OnInit() {
    this.SBr = this.Owner.CheckGetComponent(6);
  }
  OnStart() {
    this.SBr?.RegisterAnsTrigger(
      "UiTagAnsContext",
      this.OnAnsBegin,
      this.OnAnsEnd,
    ),
      this.Xte.AddListener(348713373, this.xBr),
      this.Xte.AddListener(-1371920538, this.wBr);
  }
  OnEnd() {
    this.Xte.RemoveListener(348713373, this.xBr),
      this.Xte.RemoveListener(-1371920538, this.wBr);
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
// # sourceMappingURL=UiModelTagComponent.js.map
