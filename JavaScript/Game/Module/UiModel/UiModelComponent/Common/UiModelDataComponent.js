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
      for (var h = e.length - 1; 0 <= h; h--)
        (n = e[h]) && (r = (s < 3 ? n(r) : 3 < s ? n(t, i, r) : n(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelDataComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
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
      (this.mjs = !1),
      (this.Qfa = void 0),
      (this.djs = !1),
      (this.$wr = 1),
      (this.vjs = !1);
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
    return this.Qfa;
  }
  ClearLoadingVisible() {
    this.Qfa = void 0;
  }
  SetVisible(e, t = !1) {
    if (1 === this.Xwr) this.Qfa = e;
    else {
      if (this.yne === e) return this.Cjs(), !1;
      if (t) return (this.mjs = !0), (this.djs = e), (this.NeedTick = !0);
      this.Cjs(),
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
        );
    }
    return !0;
  }
  Cjs() {
    (this.mjs = !1), (this.djs = !1);
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
    return this.vjs;
  }
  SetLoadingIconFollowState(e) {
    this.vjs = e;
  }
  OnTick(e) {
    this.mjs && this.SetVisible(this.djs), (this.NeedTick = !1);
  }
};
(UiModelDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(0)],
  UiModelDataComponent,
)),
  (exports.UiModelDataComponent = UiModelDataComponent);
//# sourceMappingURL=UiModelDataComponent.js.map
