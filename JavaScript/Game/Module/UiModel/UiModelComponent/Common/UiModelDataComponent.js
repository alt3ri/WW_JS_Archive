"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var n,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (n = e[l]) && (r = (s < 3 ? n(r) : 3 < s ? n(t, i, r) : n(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelDataComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelDataComponent = class UiModelDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ModelConfigId = 0),
      (this.ModelActorType = void 0),
      (this.ModelUseWay = void 0),
      (this.ModelType = void 0),
      (this.Xwr = 0),
      (this.yne = !1),
      (this.uSa = void 0),
      (this.$wr = 1),
      (this.kjs = !1);
  }
  GetModelLoadState() {
    return this.Xwr;
  }
  SetModelLoadState(e) {
    1 === (this.Xwr = e)
      ? EventSystem_1.EventSystem.EmitWithTarget(
          this.Owner,
          EventDefine_1.EEventName.BeforeUiModelLoadStart,
        )
      : 2 === e &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Owner,
          EventDefine_1.EEventName.OnUiModelLoadComplete,
        );
  }
  GetVisible() {
    return this.yne;
  }
  GetLoadingVisible() {
    return this.uSa;
  }
  ClearLoadingVisible() {
    this.uSa = void 0;
  }
  SetVisible(e) {
    if (1 === this.Xwr) this.uSa = e;
    else {
      if (this.yne === e) return !1;
      (this.yne = e),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Owner,
          EventDefine_1.EEventName.OnUiModelVisibleChange,
          e,
        );
    }
    return !0;
  }
  GetDitherEffectValue() {
    return this.$wr;
  }
  SetDitherEffect(e) {
    (this.$wr = e),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        e,
      );
  }
  GetLoadingIconFollowState() {
    return this.kjs;
  }
  SetLoadingIconFollowState(e) {
    this.kjs = e;
  }
};
(UiModelDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(0)],
  UiModelDataComponent,
)),
  (exports.UiModelDataComponent = UiModelDataComponent);
//# sourceMappingURL=UiModelDataComponent.js.map
