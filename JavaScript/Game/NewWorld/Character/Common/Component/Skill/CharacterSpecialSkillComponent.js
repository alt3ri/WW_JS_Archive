"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      r = arguments.length,
      l =
        r < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, i, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (l = (r < 3 ? o(l) : 3 < r ? o(t, i, l) : o(t, i)) || l);
    return 3 < r && l && Object.defineProperty(t, i, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSpecialSkillComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  RoleDefine_1 = require("../../../../../Module/RoleUi/RoleDefine"),
  SpecialSkillZheZhi_1 = require("./SpecialSkill/SpecialSkillZheZhi"),
  specialSkillTypes = new Map([
    [1105, SpecialSkillZheZhi_1.SpecialSkillZheZhi],
  ]);
let CharacterSpecialSkillComponent = class CharacterSpecialSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.Qwa = void 0);
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    let t = e.GetPbDataId();
    e?.IsRole() &&
      t &&
      t > RoleDefine_1.ROBOT_DATA_MIN_ID &&
      ConfigManager_1.ConfigManager.RoleConfig &&
      ((e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t))
        ? (t = e.ParentId)
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 4, "无法找到试用角色数据", ["roleId", t]));
    e = specialSkillTypes.get(t);
    return e && ((this.Qwa = e.Spawn(this)), this.Qwa.OnStart()), !0;
  }
  OnEnd() {
    return this.Qwa?.OnEnd(), !0;
  }
  OnTick(e) {
    this.Qwa?.OnTick(e);
  }
  OnEnable() {
    this.Qwa?.OnEnable();
  }
  OnDisable() {
    this.Qwa?.OnDisable();
  }
};
(CharacterSpecialSkillComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(214)],
  CharacterSpecialSkillComponent,
)),
  (exports.CharacterSpecialSkillComponent = CharacterSpecialSkillComponent);
//# sourceMappingURL=CharacterSpecialSkillComponent.js.map
