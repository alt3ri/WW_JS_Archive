"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor");
const UiWeaponAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiWeaponAnsContext");
class TsAnimNotifyStateShowUiWeapon extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.WeaponIndex = 0),
      (this.ShowMaterialController = !0),
      (this.HideEffect = !0),
      (this.Transform = void 0),
      (this.UiWeaponAnsContext = void 0);
  }
  K2_NotifyBegin(e, t, o) {
    e = e.GetOwner();
    return (
      e instanceof TsUiSceneRoleActor_1.default &&
        (this.WeaponIndex >= 0
          ? ((this.UiWeaponAnsContext =
              new UiWeaponAnsContext_1.UiWeaponAnsContext(
                this.WeaponIndex,
                this.ShowMaterialController,
                this.HideEffect,
                this.Transform,
              )),
            e.Model?.CheckGetComponent(6).AddAns(
              "UiWeaponAnsContext",
              this.UiWeaponAnsContext,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 44, "UI武器显隐配置的索引不合法", [
              "index",
              this.WeaponIndex,
            ])),
      !1
    );
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e instanceof TsUiSceneRoleActor_1.default)
      if (this.WeaponIndex >= 0) {
        if (!this.UiWeaponAnsContext)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Weapon",
                44,
                "TsAnimNotifyStateShowUiWeapon未成对，UiWeaponAnsContext为空",
              ),
            !1
          );
        e.Model?.CheckGetComponent(6).ReduceAns(
          "UiWeaponAnsContext",
          this.UiWeaponAnsContext,
        );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 44, "UI武器显隐配置的索引不合法", [
            "index",
            this.WeaponIndex,
          ]);
    return !1;
  }
  GetNotifyName() {
    return "Ui界面武器显示";
  }
}
exports.default = TsAnimNotifyStateShowUiWeapon;
// # sourceMappingURL=TsAnimNotifyStateShowUiWeapon.js.map
