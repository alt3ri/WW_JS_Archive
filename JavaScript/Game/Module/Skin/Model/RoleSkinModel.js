"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RoleSkinData_1 = require("../Data/RoleSkinData");
class RoleSkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.tMl = new Map());
  }
  UpdateUnlockRoleSkin(e) {
    for (const r of e) {
      var o = this.GetRoleSkinData(r);
      void 0 !== o && o.UnlockSkin();
    }
  }
  UpdateWeaponSkinFirstWearRecord(e) {
    for (const r of e) {
      var o = this.GetRoleSkinData(r);
      void 0 !== o &&
        0 < (o = o.GetRoleSkinConfig().SuitWeaponSkinId) &&
        this.RecordSuitWeaponFirstWear(o, !0);
    }
  }
  AddRoleSkinNewFlag(e) {
    for (const r of e) {
      var o = this.GetRoleSkinData(r);
      void 0 === o ||
        o.IsOriginalSkin() ||
        (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot,
          r,
        ),
        ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoleSkinRedDotRefresh,
          o.GetRoleId(),
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.MainViewRoleButtonRefreshByRoleSkin,
        ));
    }
  }
  GetRoleSkinData(e) {
    var o = this.tMl.get(e);
    return (
      o ||
      (11 ===
      ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(
        e,
      )
        ? ((o = new RoleSkinData_1.RoleSkinData(e)), this.tMl.set(e, o), o)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("RoleSkin", 58, "无效的皮肤道具id", ["itemId", e])
          ))
    );
  }
  GetRoleSkinDataByRoleId(e) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (void 0 !== e) return (e = e.GetRoleSkinId()), this.GetRoleSkinData(e);
  }
  GetRoleOriginalSkinData(e, o = !0) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e, o);
    if (void 0 !== e)
      return (o = e.GetRoleConfig().SkinId), this.GetRoleSkinData(o);
  }
  GetRoleSkinIdByRoleId(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    return void 0 === e ? -1 : e.GetRoleSkinId();
  }
  CheckHasRoleSkin(e) {
    e = this.GetRoleSkinData(e);
    return void 0 !== e && e.IsLocked();
  }
  UnlockSkin(e) {
    e = this.GetRoleSkinData(e);
    void 0 !== e && e.UnlockSkin();
  }
  GetSkinCountById(e) {
    e = this.GetRoleSkinData(e);
    return void 0 === e ? -1 : e.GetItemCount();
  }
  GetSkinTabList() {
    var o =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "SkinRootView",
        ),
      r = o.length,
      a = [];
    for (let e = 0; e < r; e++) {
      var n = o[e];
      ModelManager_1.ModelManager.FunctionModel.IsOpen(n.FunctionId) &&
        a.push(n);
    }
    return a;
  }
  GetRoleSkinDataList(e) {
    e = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfigList(e);
    if (void 0 === e) return [];
    var o = [];
    for (const a of e) {
      var r = this.GetRoleSkinData(a.Id);
      void 0 !== r && o.push(r);
    }
    return (
      o.sort((e, o) => {
        return (
          e.GetRoleSkinConfig().SortIndex - o.GetRoleSkinConfig().SortIndex
        );
      }),
      o
    );
  }
  CheckSuitWeaponFirstWear(e) {
    var o = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.SuitWeaponFirstWearRecord,
    );
    return !(!o || !o.has(e)) && o.get(e);
  }
  HasRoleSkinRedDotByRoleId(e) {
    for (const r of this.GetRoleSkinDataList(e)) {
      var o = this.GetRoleSkinData(r.GetItemId());
      if (
        void 0 !== o &&
        !o.IsLocked() &&
        ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot,
          r.GetItemId(),
        )
      )
        return !0;
    }
    return !1;
  }
  RecordSuitWeaponFirstWear(e, o) {
    var r =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.SuitWeaponFirstWearRecord,
      ) ?? new Map();
    r.set(e, o),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.SuitWeaponFirstWearRecord,
        r,
      );
  }
}
exports.RoleSkinModel = RoleSkinModel;
//# sourceMappingURL=RoleSkinModel.js.map
