"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var i,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (i = e[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
    return 3 < r && s && Object.defineProperty(t, n, s), s;
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
    super(...arguments),
      (this.ywr = void 0),
      (this._Br = 0),
      (this.uBr = 0),
      (this.aTl = 0);
  }
  get RoleDataId() {
    return this._Br;
  }
  get RoleConfigId() {
    return this.uBr;
  }
  get RoleSkinId() {
    return this.aTl;
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
  }
  SetRoleConfigId(e, t = -1) {
    this.uBr = e;
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    (this.aTl = -1 === t ? e.SkinId : t),
      this.aTl <= 0
        ? (this.ywr.ModelConfigId = e.UiMeshId)
        : ((t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
            this.aTl,
          )),
          (this.ywr.ModelConfigId = t.GetUiMeshId())),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleConfigIdChange,
      );
  }
  SetRoleDataId(e, t = -1) {
    this._Br = e;
    e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    e &&
      (this.SetRoleConfigId(e.GetRoleId(), t),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleDataIdChange,
      ));
  }
};
(UiRoleDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(12)],
  UiRoleDataComponent,
)),
  (exports.UiRoleDataComponent = UiRoleDataComponent);
//# sourceMappingURL=UiRoleDataComponent.js.map
