"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var i,
      a = arguments.length,
      r =
        a < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, o, t, n);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (i = e[s]) && (r = (a < 3 ? i(r) : 3 < a ? i(o, t, r) : i(o, t)) || r);
    return 3 < a && r && Object.defineProperty(o, t, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleLoadComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiRoleLoadComponent = class UiRoleLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments), (this.pBr = void 0);
  }
  OnInit() {
    super.OnInit(), (this.pBr = this.Owner.CheckGetComponent(12));
  }
  OnEnd() {
    super.OnEnd();
  }
  LoadModelByRoleDataId(e, o, t = !1, n) {
    e === this.pBr.RoleDataId && o === this.pBr?.RoleSkinId
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          43,
          "重复加载角色",
          ["RoleDataId", e],
          ["RoleSkinId", o],
        )
      : (this.pBr.SetRoleDataId(e, o),
        (this.LoadFinishCallBack = n),
        this.LoadModel(t));
  }
  LoadModelByRoleConfigId(e, o, t = !1, n) {
    e === this.pBr.RoleConfigId
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 43, "重复加载角色", ["RoleConfigId", e])
      : (this.pBr.SetRoleConfigId(e, o),
        (this.LoadFinishCallBack = n),
        this.LoadModel(t));
  }
  GetAnimClassPath() {
    return (
      this.pBr.RoleSkinId <= 0
        ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            this.pBr.RoleConfigId,
          )
        : ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
            this.pBr.RoleSkinId,
          ).GetRoleSkinConfig()
    ).UiScenePerformanceABP;
  }
};
(UiRoleLoadComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(13)],
  UiRoleLoadComponent,
)),
  (exports.UiRoleLoadComponent = UiRoleLoadComponent);
//# sourceMappingURL=UiRoleLoadComponent.js.map
