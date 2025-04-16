"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkinModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WeaponSkinDefine_1 = require("./WeaponSkinDefine");
class WeaponSkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Kil = new Map()), (this.$il = new Map());
  }
  OnClear() {
    return (
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot,
      ),
      !0
    );
  }
  Xil(e) {
    return (
      !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot,
        e,
      ) &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot,
        e,
      ),
      !0)
    );
  }
  Yil(e, n) {
    var o;
    n === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID
      ? ((o =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
            e,
          ).GetItemConfig().ModelId),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FightWeaponSkinChange,
          e,
          o,
        ))
      : ((o =
          ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(
            n,
          ).ModelId),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FightWeaponSkinChange,
          e,
          o,
        ));
  }
  tal(e) {
    for (const n of e) this.$il.set(n.mjn, n.Zsl), this.Yil(n.mjn, n.Zsl);
  }
  UpdateWeaponSkinData(e, n) {
    this.$il.set(e, n), this.Yil(e, n);
  }
  NotifyWeaponSkinData(e) {
    e && this.tal(e);
  }
  EquipWeaponSkinData(e) {
    e &&
      (this.tal(e),
      (e = e[0]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.EquipWeaponSkin,
        e.mjn,
        e.Zsl,
      ));
  }
  DeleteWeaponSkinData(e) {
    this.$il.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UninstallWeaponSkin,
        e,
      ),
      this.Yil(e, WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("WeaponSkin,", 10, "武器皮肤卸载", ["roleId", e]);
  }
  GetSkinIdByRoleId(e) {
    var n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    return n && n.IsTrialRole()
      ? (n.GetWeaponData()?.GetSkinId() ??
          WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID)
      : this.$il.get(e) || WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
  }
  GetRoleIdBySkinId(e) {
    for (const n of this.$il) if (n[1] === e) return n[0];
  }
  NotifyAllUnlockSkinData(e) {
    for (const n of e) this.Kil.set(n, 1);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("WeaponSkin,", 10, "武器皮肤登录推送", ["skinIdList", e]);
  }
  SetUnlockSkinData(e) {
    for (const n of e) this.Kil.set(n, 1), this.Xil(n);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("WeaponSkin,", 10, "武器皮肤添加", ["skinIdList", e]);
  }
  GetSkinCountById(e) {
    return this.Kil.get(e) ?? 0;
  }
  HasWeaponSkinRedDot(e) {
    for (const n of ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfigListByType(
      e,
    ))
      if (
        this.Kil.has(n.Id) &&
        !n.HideInSkinView &&
        ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot,
          n.Id,
        )
      )
        return !0;
    return !1;
  }
  RedDotWeaponSkinCondition(e) {
    var e =
      ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(e);
    return (
      void 0 !== e &&
      ((e = e.GetWeaponConfig().WeaponType), this.HasWeaponSkinRedDot(e))
    );
  }
}
exports.WeaponSkinModel = WeaponSkinModel;
//# sourceMappingURL=WeaponSkinModel.js.map
