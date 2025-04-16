"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailUnderComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionDetailUnderComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.M9i = void 0),
      (this.E9i = void 0),
      (this.S9i = void 0),
      (this.iNe = void 0),
      (this.tNe = void 0),
      (this.y9i = () => {
        this.iNe?.();
      }),
      (this.I9i = () => {
        this.tNe?.();
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.E9i = new ButtonItem_1.ButtonItem(this.GetItem(0))),
      this.E9i.SetFunction(this.y9i),
      (this.S9i = new ButtonItem_1.ButtonItem(this.GetItem(1))),
      this.S9i.SetFunction(this.I9i),
      (this.M9i = new EquipRoleAttribute(this.GetItem(2)));
  }
  RefreshRightButtonText(e) {
    this.E9i.SetLocalText(e);
  }
  RefreshLeftButtonText(e) {
    this.S9i.SetLocalText(e);
  }
  SetRightButtonClick(e) {
    this.iNe = e;
  }
  SetLeftButtonClick(e) {
    this.tNe = e;
  }
  RefreshViewByCompareState(e) {
    this.S9i.SetActive(!e), this.E9i.SetActive(!e);
  }
  Update(e) {
    this.M9i.SetActive(
      ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
        e.GetUniqueId(),
      ),
    ),
      this.M9i.Update(e);
  }
}
exports.VisionDetailUnderComponent = VisionDetailUnderComponent;
class EquipRoleAttribute extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  Update(i) {
    if (
      ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
        i.GetUniqueId(),
      )
    ) {
      var o =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
            i.GetUniqueId(),
          ),
        i =
          ModelManager_1.ModelManager.RoleSkinModel?.GetRoleSkinDataByRoleId(
            o,
          ).GetRoleSkinConfig(),
        r =
          ConfigManager_1.ConfigManager.ComponentConfig.GetRoleSkinConfigParam(
            "RoleIcon1",
          );
      this.SetTextureByPath(i[r], this.GetTexture(0));
      let e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name);
      var s = ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig();
      let t = !1;
      var n = s.length;
      for (let e = 0; e < n; e++)
        if (s[e].Id === o) {
          t = !0;
          break;
        }
      t && (e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName()),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "VisionEquipping", e);
    }
  }
}
//# sourceMappingURL=VisionDetailUnderComponent.js.map
