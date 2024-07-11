"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    let n;
    const s = arguments.length;
    let r =
      s < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, i, o);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (n = e[h]) && (r = (s < 3 ? n(r) : s > 3 ? n(t, i, r) : n(t, i)) || r);
    return s > 3 && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelDataComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelDataComponent = class UiModelDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ModelConfigId = 0),
      (this.ModelActorType = void 0),
      (this.ModelUseWay = void 0),
      (this.ModelType = void 0),
      (this.pBr = 0),
      (this.yne = !1),
      (this.o5s = !1),
      (this.n5s = !1),
      (this.vBr = 1);
  }
  GetModelLoadState() {
    return this.pBr;
  }
  SetModelLoadState(e) {
    (this.pBr = e) === 1
      ? EventSystem_1.EventSystem.EmitWithTarget(
          this.Owner,
          EventDefine_1.EEventName.BeforeUiModelLoadStart,
        )
      : e === 2 &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Owner,
          EventDefine_1.EEventName.OnUiModelLoadComplete,
        );
  }
  GetVisible() {
    return this.yne;
  }
  SetVisible(e, t = !1) {
    return this.yne === e
      ? (this.s5s(), !1)
      : t
        ? ((this.o5s = !0), (this.n5s = e), (this.NeedTick = !0))
        : (this.s5s(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              59,
              "UiModelDataComponent_SetVisible",
              ["visible", e],
              ["ModelType", this.ModelType],
            ),
          (this.yne = e),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Owner,
            EventDefine_1.EEventName.OnUiModelVisibleChange,
            e,
          ),
          !0);
  }
  s5s() {
    (this.o5s = !1), (this.n5s = !1);
  }
  GetDitherEffectValue() {
    return this.vBr;
  }
  SetDitherEffect(e) {
    (this.vBr = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          59,
          "UiModelDataComponent_SetDither",
          ["value", e],
          ["ModelType", this.ModelType],
        ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        e,
      );
  }
  OnTick(e) {
    this.o5s && this.SetVisible(this.n5s), (this.NeedTick = !1);
  }
};
(UiModelDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(0)],
  UiModelDataComponent,
)),
  (exports.UiModelDataComponent = UiModelDataComponent);
// # sourceMappingURL=UiModelDataComponent.js.map
