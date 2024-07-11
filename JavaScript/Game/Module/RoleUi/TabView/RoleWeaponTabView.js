"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleWeaponTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  WeaponController_1 = require("../../Weapon/WeaponController"),
  WeaponDetailTipsComponent_1 = require("../../Weapon/WeaponDetailTipsComponent"),
  RoleController_1 = require("../RoleController");
class RoleWeaponTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.d1o = void 0),
      (this.ICo = void 0),
      (this.dCo = () => {
        this.CCo = !1;
      }),
      (this.TCo = (e) => {
        e = { RoleId: this.d1o.GetCurSelectRoleId(), WeaponIncId: e };
        UiManager_1.UiManager.OpenView("WeaponReplaceView", e);
      }),
      (this.LCo = (e) => {
        e = { WeaponIncId: e, IsFromRoleRootView: !0 };
        UiManager_1.UiManager.OpenView("WeaponRootView", e),
          WeaponController_1.WeaponController.RoleFadeIn(
            UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
          );
      }),
      (this.DCo = (e, t) => {
        this.ICo.UpdateWeaponLock(t);
      }),
      (this.CCo = !1),
      (this.RCo = () => {
        (this.CCo = !0), this.PlayMontageStart(!0), this.UCo();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    (this.ICo = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      await this.ICo.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    (this.d1o = this.ExtraParams),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleWeaponTabView",
          ])
        : (this.ICo.SetCanShowEquip(!1),
          this.ICo.SetReplaceFunction(this.TCo),
          this.ICo.SetCultureFunction(this.LCo));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemLock,
      this.DCo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.RCo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetRoleFlag,
        this.dCo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemLock,
      this.DCo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.RCo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetRoleFlag,
        this.dCo,
      );
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1),
      this.CCo
        ? (this.PlayMontageStart(!0), (this.CCo = !1))
        : this.PlayMontageStart(!1),
      this.UCo();
  }
  OnBeforeDestroy() {
    this.ICo && (this.ICo.Destroy(), (this.ICo = void 0));
  }
  PlayMontageStart(e = !1) {
    RoleController_1.RoleController.PlayRoleMontage(6, e);
  }
  UCo() {
    var e = this.d1o.GetCurSelectRoleData(),
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
        e.GetDataId(),
      );
    void 0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 59, "RoleWeaponTabView获取不到武器数据", [
          "roleId",
          e.GetDataId(),
        ])
      : this.ICo.UpdateComponent(t);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return this.ICo.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.RoleWeaponTabView = RoleWeaponTabView;
//# sourceMappingURL=RoleWeaponTabView.js.map
