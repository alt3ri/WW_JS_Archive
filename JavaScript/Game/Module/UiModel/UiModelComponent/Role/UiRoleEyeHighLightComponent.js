"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, n);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (o = e[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleEyeHighLightComponent = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleEyeHighLightComponent = class UiRoleEyeHighLightComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.OnRoleMeshLoadComplete = () => {
        this.DisableEyeHighLight();
      });
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
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
    var e = [new UE.FName("MI_Eyes"), new UE.FName("MI_Eye")],
      t = new UE.FName("LightDisableSwitch"),
      i = this.n$t.MainMeshComponent;
    this.cBr(i, e, t);
  }
  cBr(e, t, i) {
    for (const s of t) {
      var n,
        o = e.GetMaterialIndex(s);
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
//# sourceMappingURL=UiRoleEyeHighLightComponent.js.map
