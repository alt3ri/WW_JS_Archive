"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleWeaponTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonEquippedItem_1 = require("../../Common/CommonEquippedItem"),
  WeaponSkinDefine_1 = require("../../Skin/Tab/Weapon/WeaponSkinDefine"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeaponController_1 = require("../../Weapon/WeaponController"),
  WeaponDetailTipsComponent_1 = require("../../Weapon/WeaponDetailTipsComponent"),
  RoleController_1 = require("../RoleController"),
  SkinController_1 = require("../../Skin/SkinController");
class RoleWeaponTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.d1o = void 0),
      (this.ICo = void 0),
      (this.Mko = void 0),
      (this.dCo = () => {
        this.CCo = !1;
      }),
      (this.TCo = (e) => {
        e = { RoleId: this.d1o.GetCurSelectRoleId(), WeaponIncId: e };
        UiManager_1.UiManager.OpenView("WeaponReplaceView", e);
      }),
      (this.LCo = (e) => {
        var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e),
          e = {
            WeaponIncId: e,
            WeaponSkinId:
              ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(
                i.GetRoleId(),
              ),
            IsFromRoleRootView: !0,
          };
        UiManager_1.UiManager.OpenView("WeaponRootView", e),
          WeaponController_1.WeaponController.RoleFadeIn(
            UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
          );
      }),
      (this.DCo = (e, i) => {
        this.ICo.UpdateWeaponLock(i);
      }),
      (this.CCo = !1),
      (this.RCo = () => {
        (this.CCo = !0), this.PlayMontageStart(!0), this.UCo();
      }),
      (this.fil = () => {
        var e = this.d1o.GetCurSelectRoleId();
        SkinController_1.SkinController.SkipToSkinView(
          e,
          "WeaponSkinTabView",
          !1,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.fil]]);
  }
  async vil() {
    var e = this.GetItem(0);
    (this.ICo = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      await this.ICo.CreateThenShowByActorAsync(e.GetOwner());
  }
  async Mil() {
    (this.Mko = new CommonEquippedItem_1.CommonEquippedItem()),
      await this.Mko.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  async OnBeforeStartAsync() {
    (this.d1o = this.ExtraParams),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 58, "RoleViewAgent为空", [
            "界面名称",
            "RoleWeaponTabView",
          ])
        : await Promise.all([this.vil(), this.Mil()]);
  }
  OnStart() {
    this.ICo.SetCanShowEquip(!1),
      this.ICo.SetReplaceFunction(this.TCo),
      this.ICo.SetCultureFunction(this.LCo);
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
      i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
        e.GetDataId(),
      );
    void 0 === i
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 58, "RoleWeaponTabView获取不到武器数据", [
          "roleId",
          e.GetDataId(),
        ])
      : (this.ICo.UpdateComponent(i),
        (i =
          ModelManager_1.ModelManager.WeaponModel.RedDotWeaponBreachCondition(
            e.GetDataId(),
          )),
        this.ICo.UpdateWeaponBreachRedDot(i),
        this.Sil(),
        this.lpl(),
        this.BNe());
  }
  Sil() {
    var e;
    !this.d1o.GetRoleSystemUiParams().SwitchSkin ||
    ((e = this.d1o.GetCurSelectRoleData()),
    (e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(
      e.GetDataId(),
    )) === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID)
      ? this.Mko?.SetIconRootItemState(!1)
      : ((e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)),
        this.Mko?.SetEquipIcon(e.IconSmall),
        this.Mko.SetEquipText(
          "WeaponTipsRoleText",
          new LguiUtil_1.TableTextArgNew(e.Name),
        ),
        this.Mko?.SetIconRootItemState(!0));
  }
  lpl() {
    var e;
    !this.d1o.GetRoleSystemUiParams().SwitchSkin ||
    !(e = this.d1o.GetCurSelectRoleData()) ||
    e.IsTrialRole()
      ? this.GetButton(2)?.RootUIComp.SetUIActive(!1)
      : this.GetButton(2)?.RootUIComp.SetUIActive(!0);
  }
  BNe() {
    var e;
    this.d1o.GetRoleSystemUiParams().SwitchSkin
      ? ((e = this.d1o.GetCurSelectRoleData()),
        (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
          e.GetDataId(),
        ).GetWeaponConfig().WeaponType),
        (e =
          ModelManager_1.ModelManager.WeaponSkinModel.HasWeaponSkinRedDot(e)),
        this.GetItem(3)?.SetUIActive(e))
      : this.GetItem(3)?.SetUIActive(!1);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return this.ICo.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.RoleWeaponTabView = RoleWeaponTabView;
//# sourceMappingURL=RoleWeaponTabView.js.map
