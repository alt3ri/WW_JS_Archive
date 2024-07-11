"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    let i;
    const r = arguments.length;
    let a =
      r < 3 ? o : n === null ? (n = Object.getOwnPropertyDescriptor(o, t)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(e, o, t, n);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(o, t, a) : i(o, t)) || a);
    return r > 3 && a && Object.defineProperty(o, t, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleLoadComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiRoleLoadComponent = class UiRoleLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments), (this.VBr = void 0);
  }
  OnInit() {
    super.OnInit(), (this.VBr = this.Owner.CheckGetComponent(11));
  }
  OnEnd() {
    super.OnEnd();
  }
  LoadModelByRoleDataId(e, o = !1, t) {
    e === this.VBr.RoleDataId
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "重复加载角色", ["RoleDataId", e])
      : (this.VBr.SetRoleDataId(e),
        (this.LoadFinishCallBack = t),
        this.LoadModel(o));
  }
  LoadModelByRoleConfigId(e, o = !1, t) {
    e === this.VBr.RoleConfigId
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "重复加载角色", ["RoleConfigId", e])
      : (this.VBr.SetRoleConfigId(e),
        (this.LoadFinishCallBack = t),
        this.LoadModel(o));
  }
  GetAnimClassPath() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
      this.VBr.RoleConfigId,
    ).UiScenePerformanceABP;
  }
};
(UiRoleLoadComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(12)],
  UiRoleLoadComponent,
)),
  (exports.UiRoleLoadComponent = UiRoleLoadComponent);
// # sourceMappingURL=UiRoleLoadComponent.js.map
