"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    let o;
    const s = arguments.length;
    let h =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(e, t, i, n);
    else
      for (let r = e.length - 1; r >= 0; r--)
        (o = e[r]) && (h = (s < 3 ? o(h) : s > 3 ? o(t, i, h) : o(t, i)) || h);
    return s > 3 && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleStateMachineComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleStateMachineComponent = class UiRoleStateMachineComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Qwr = void 0),
      (this.nXt = void 0),
      (this.Fmo = 0),
      (this.HBr = !1),
      (this.jBr = !1),
      (this.WBr = !1),
      (this.OnRoleMeshLoadComplete = () => {
        this.KBr(), this.m8();
      });
  }
  OnInit() {
    (this.Qwr = this.Owner.CheckGetComponent(0)),
      (this.nXt = this.Owner.CheckGetComponent(1));
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
    (this.Fmo = e), (this.HBr = t), (this.WBr = i), (this.jBr = n), this.m8();
  }
  m8() {
    let e;
    this.Qwr.GetModelLoadState() === 2 &&
      ((e = this.nXt.MainMeshComponent),
      this.nXt
        .GetAnimInstanceFromSkeletalMesh(e)
        ?.SetState(this.Fmo, this.HBr, this.WBr, this.jBr));
  }
  KBr() {
    var e = this.nXt.MainMeshComponent;
    var e = this.nXt.GetAnimInstanceFromSkeletalMesh(e);
    const t =
      ConfigManager_1.ConfigManager.RoleConfig.GetRolePerformanceDelayTime();
    e?.SetPerformDelay(t);
  }
};
(UiRoleStateMachineComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(13)],
  UiRoleStateMachineComponent,
)),
  (exports.UiRoleStateMachineComponent = UiRoleStateMachineComponent);
// # sourceMappingURL=UiRoleStateMachineComponent.js.map
