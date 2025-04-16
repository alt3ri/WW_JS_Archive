"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      s = arguments.length,
      h =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(e, t, i, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (h = (s < 3 ? o(h) : 3 < s ? o(t, i, h) : o(t, i)) || h);
    return 3 < s && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiDangoStateMachineComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDangoStateMachineComponent = class UiDangoStateMachineComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.tf1 = 0),
      (this.i01 = 0),
      (this.AE1 = 0),
      (this.ywr = void 0),
      (this.n$t = void 0),
      (this.OnDangoMeshLoadComplete = () => {
        this.m8();
      });
  }
  OnInit() {
    (this.ywr = this.Owner.CheckGetComponent(0)),
      (this.n$t = this.Owner.CheckGetComponent(1));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnDangoMeshLoadComplete,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnDangoMeshLoadComplete,
    );
  }
  SetState(e, t = 0, i = 0) {
    (this.tf1 = e), (this.i01 = t), (this.AE1 = i), this.m8();
  }
  m8() {
    if (2 === this.ywr.GetModelLoadState()) {
      var e = this.GetDangoBp();
      switch (this.tf1) {
        case 1:
          e?.StartActionPerform(this.i01);
          break;
        case 2:
          e?.StartJumpWithParams(this.i01, this.AE1);
      }
    }
  }
  GetDangoBp() {
    var e = this.n$t?.MainMeshComponent;
    if (e) return this.n$t?.GetDangoAnimInstanceFromSkeletalMesh(e);
  }
};
(UiDangoStateMachineComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(25)],
  UiDangoStateMachineComponent,
)),
  (exports.UiDangoStateMachineComponent = UiDangoStateMachineComponent);
//# sourceMappingURL=UiDangoStateMachineComponent.js.map
