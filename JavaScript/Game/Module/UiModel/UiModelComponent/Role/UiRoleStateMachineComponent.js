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
      for (var r = e.length - 1; 0 <= r; r--)
        (o = e[r]) && (h = (s < 3 ? o(h) : 3 < s ? o(t, i, h) : o(t, i)) || h);
    return 3 < s && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleStateMachineComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleStateMachineComponent = class UiRoleStateMachineComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ywr = void 0),
      (this.n$t = void 0),
      (this.Ndo = 0),
      (this.vBr = !1),
      (this.MBr = !1),
      (this.EBr = !1),
      (this.OnRoleMeshLoadComplete = () => {
        this.SBr(), this.m8();
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
      this.OnRoleMeshLoadComplete,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnRoleMeshLoadComplete,
    );
  }
  SetState(e, t = !1, i = !1, n = !1) {
    (this.Ndo = e), (this.vBr = t), (this.EBr = i), (this.MBr = n), this.m8();
  }
  m8() {
    var e;
    2 === this.ywr.GetModelLoadState() &&
      ((e = this.n$t.MainMeshComponent),
      this.n$t
        .GetAnimInstanceFromSkeletalMesh(e)
        ?.SetState(this.Ndo, this.vBr, this.EBr, this.MBr));
  }
  SBr() {
    var e = this.n$t.MainMeshComponent,
      e = this.n$t.GetAnimInstanceFromSkeletalMesh(e),
      t =
        ConfigManager_1.ConfigManager.RoleConfig.GetRolePerformanceDelayTime();
    e?.SetPerformDelay(t);
  }
};
(UiRoleStateMachineComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(13)],
  UiRoleStateMachineComponent,
)),
  (exports.UiRoleStateMachineComponent = UiRoleStateMachineComponent);
//# sourceMappingURL=UiRoleStateMachineComponent.js.map
