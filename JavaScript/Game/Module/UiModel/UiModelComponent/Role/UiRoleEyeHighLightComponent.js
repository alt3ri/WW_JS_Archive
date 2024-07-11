"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    let o;
    const s = arguments.length;
    let r =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, i, n);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (o = e[h]) && (r = (s < 3 ? o(r) : s > 3 ? o(t, i, r) : o(t, i)) || r);
    return s > 3 && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleEyeHighLightComponent = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleEyeHighLightComponent = class UiRoleEyeHighLightComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.OnRoleMeshLoadComplete = () => {
        this.DisableEyeHighLight();
      });
  }
  OnInit() {
    this.nXt = this.Owner.CheckGetComponent(1);
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
  DisableEyeHighLight() {
    const e = [new UE.FName("MI_Eyes"), new UE.FName("MI_Eye")];
    const t = new UE.FName("LightDisableSwitch");
    const i = this.nXt.MainMeshComponent;
    this.qBr(i, e, t);
  }
  qBr(e, t, i) {
    for (const s of t) {
      var n;
      const o = e.GetMaterialIndex(s);
      o < 0 ||
        ((n = e.GetMaterial(o)),
        e.CreateDynamicMaterialInstance(o, n)?.SetScalarParameterValue(i, 0));
    }
  }
};
(UiRoleEyeHighLightComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(16)],
  UiRoleEyeHighLightComponent,
)),
  (exports.UiRoleEyeHighLightComponent = UiRoleEyeHighLightComponent);
// # sourceMappingURL=UiRoleEyeHighLightComponent.js.map
