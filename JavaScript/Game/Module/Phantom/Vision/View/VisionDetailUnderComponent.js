"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailUnderComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class VisionDetailUnderComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.S8i = void 0),
      (this.E8i = void 0),
      (this.y8i = void 0),
      (this.iNe = void 0),
      (this.tNe = void 0),
      (this.I8i = () => {
        this.iNe?.();
      }),
      (this.T8i = () => {
        this.tNe?.();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.E8i = new ButtonItem_1.ButtonItem(this.GetItem(0))),
      this.E8i.SetFunction(this.I8i),
      (this.y8i = new ButtonItem_1.ButtonItem(this.GetItem(1))),
      this.y8i.SetFunction(this.T8i),
      (this.S8i = new EquipRoleAttribute(this.GetItem(2)));
  }
  RefreshRightButtonText(t) {
    this.E8i.SetLocalText(t);
  }
  RefreshLeftButtonText(t) {
    this.y8i.SetLocalText(t);
  }
  SetRightButtonClick(t) {
    this.iNe = t;
  }
  SetLeftButtonClick(t) {
    this.tNe = t;
  }
  RefreshViewByCompareState(t) {
    this.y8i.SetActive(!t), this.E8i.SetActive(!t);
  }
  Update(t) {
    this.S8i.SetActive(
      ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
        t.GetUniqueId(),
      ),
    ),
      this.S8i.Update(t);
  }
}
exports.VisionDetailUnderComponent = VisionDetailUnderComponent;
class EquipRoleAttribute extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
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
        i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o),
        r =
          ConfigManager_1.ConfigManager.ComponentConfig.GetRoleConfigParam(
            "RoleIcon1",
          );
      this.SetTextureByPath(i[r], this.GetTexture(0));
      let t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name);
      var s = ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig();
      let e = !1;
      var n = s.length;
      for (let t = 0; t < n; t++)
        if (s[t].Id === o) {
          e = !0;
          break;
        }
      e && (t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName()),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "VisionEquipping", t);
    }
  }
}
//# sourceMappingURL=VisionDetailUnderComponent.js.map
