"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var i,
      r = arguments.length,
      a =
        r < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, n, o);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (i = e[s]) && (a = (r < 3 ? i(a) : 3 < r ? i(t, n, a) : i(t, n)) || a);
    return 3 < r && a && Object.defineProperty(t, n, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleDataComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleDataComponent = class UiRoleDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments), (this.Qwr = void 0), (this.BBr = 0), (this.bBr = 0);
  }
  get RoleDataId() {
    return this.BBr;
  }
  get RoleConfigId() {
    return this.bBr;
  }
  OnInit() {
    this.Qwr = this.Owner.CheckGetComponent(0);
  }
  SetRoleConfigId(e) {
    this.bBr = e;
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    (this.Qwr.ModelConfigId = e.UiMeshId),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleConfigIdChange,
      );
  }
  SetRoleDataId(e) {
    this.BBr = e;
    e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    e &&
      (this.SetRoleConfigId(e.GetRoleId()),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleDataIdChange,
      ));
  }
};
(UiRoleDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(11)],
  UiRoleDataComponent,
)),
  (exports.UiRoleDataComponent = UiRoleDataComponent);
//# sourceMappingURL=UiRoleDataComponent.js.map
