"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(t, i, s) : o(t, i)) || s);
    return 3 < r && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiWeaponBreachDaComponent = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiWeaponBreachDaComponent = class UiWeaponBreachDaComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Qwr = void 0),
      (this.nXt = void 0),
      (this.ZBr = void 0),
      (this.KY = () => {
        var e = this.ZBr?.WeaponData?.GetBreachLevel() ?? 0;
        this.RefreshWeaponBreachDa(e);
      });
  }
  OnInit() {
    (this.Qwr = this.Owner.CheckGetComponent(0)),
      (this.nXt = this.Owner.CheckGetComponent(1)),
      (this.ZBr = this.Owner.CheckGetComponent(18));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.KY,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.KY,
    );
  }
  RefreshWeaponBreachDa(i) {
    ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponBreachLevel = i;
    var e = ModelUtil_1.ModelUtil.GetModelConfig(
      this.Qwr.ModelConfigId,
    )?.DA?.AssetPathName.toString();
    e &&
      !StringUtils_1.StringUtils.IsBlank(e) &&
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Object, (e) => {
        var t;
        e &&
          ((t = this.nXt?.MainMeshComponent),
          e instanceof UE.PD_WeaponLevelMaterialDatas_C) &&
          UE.BP_CharacterRenderingFunctionLibrary_C.ApplyWeaponLevelMaterial(
            t,
            e,
            i,
            t,
          );
      });
  }
};
(UiWeaponBreachDaComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(19)],
  UiWeaponBreachDaComponent,
)),
  (exports.UiWeaponBreachDaComponent = UiWeaponBreachDaComponent);
//# sourceMappingURL=UiWeaponBreachDaComponent.js.map
