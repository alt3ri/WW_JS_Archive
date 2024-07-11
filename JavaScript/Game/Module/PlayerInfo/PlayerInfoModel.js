"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerInfoModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  RandomSystem_1 = require("../../../Core/Random/RandomSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines");
class PlayerInfoModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.RandomSeed = 0);
  }
  GetId() {
    return this.xe;
  }
  SetId(e) {
    (this.xe = e),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID,
        e,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Log", 38, "设置当前UID", ["UID", e]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ChangePlayerInfoId,
        e,
      );
  }
  GetIconList() {
    return this.fXi;
  }
  SetIconList(e) {
    this.fXi = e;
  }
  GetFrameList() {
    return this.pXi;
  }
  SetFrameList(e) {
    this.pXi = e;
  }
  GetNumberProp() {
    return this.vXi;
  }
  SetNumberProp(e) {
    this.vXi = e;
  }
  GetStringProp() {
    return this.MXi;
  }
  SetStringProp(e) {
    this.MXi = e;
  }
  ChangeNumberProp(e, t) {
    void 0 !== this.vXi && this.vXi.set(e, t),
      (13 !== e && 2 !== e && 3 !== e) ||
        ((t = this.GetPlayerMoneyItemId(e)),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerCurrencyChange,
          t,
        ));
  }
  ChangeStringProp(e, t) {
    this.MXi && this.MXi.set(e, t);
  }
  GetNumberPropById(e) {
    if (void 0 !== this.vXi) return this.vXi.get(e);
  }
  GetPlayerGender() {
    var e = this.GetNumberPropById(9);
    return void 0 === e ? 2 : e;
  }
  GetPlayerMoney(e) {
    return e === ItemDefines_1.EItemId.Gold
      ? this.GetNumberPropById(2) ?? 0
      : e === ItemDefines_1.EItemId.BlackCard
        ? this.GetNumberPropById(3) ?? 0
        : e === ItemDefines_1.EItemId.PayGold
          ? this.GetNumberPropById(13) ?? 0
          : e === ItemDefines_1.EItemId.Power
            ? ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
                ItemDefines_1.EItemId.Power,
              ).GetCurrentPower()
            : e === ItemDefines_1.EItemId.OverPower
              ? ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
                  ItemDefines_1.EItemId.OverPower,
                ).GetCurrentPower()
              : 0;
  }
  GetPlayerMoneyItemId(e) {
    return 2 === e
      ? ItemDefines_1.EItemId.Gold
      : 3 === e
        ? ItemDefines_1.EItemId.BlackCard
        : 13 === e
          ? ItemDefines_1.EItemId.PayGold
          : void 0;
  }
  GetAccountName(e = !0) {
    if (this.MXi)
      return !e ||
        ConfigManager_1.ConfigManager.PlayerInfoConfig.GetIsUseAccountName()
        ? this.MXi.get(7)
        : ((e = this.GetPlayerRoleId()),
          ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            e,
          ).GetRoleRealName());
  }
  IsPlayerId(e, t = void 0) {
    var t = t ?? this.GetId(),
      r = this.GetPlayerRoleId();
    return t === this.GetId() && e === r;
  }
  GetPlayerRoleId() {
    return ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
  }
  GetPlayerHeadIconBig() {
    var e = this.GetNumberPropById(4);
    if (e) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) return e.RoleHeadIconBig;
    }
    return "";
  }
  GetPlayerHeadIconLarge() {
    var e = this.GetNumberPropById(4);
    if (e) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) return e.RoleHeadIconLarge;
    }
    return "";
  }
  GetHeadIconId() {
    var e = this.GetNumberPropById(4);
    return e || 0;
  }
  GetPlayerStand() {
    var e = this.GetPlayerGender();
    return 1 === e
      ? ConfigManager_1.ConfigManager.PlayerInfoConfig.GetMaleStandPath()
      : 0 === e
        ? ConfigManager_1.ConfigManager.PlayerInfoConfig.GetFemaleStandPath()
        : void 0;
  }
  GetPlayerLevel() {
    return this.GetNumberPropById(0);
  }
  GetRandomSeed() {
    return this.RandomSeed;
  }
  AdvanceRandomSeed(e) {
    var t = this.RandomSeed;
    return (
      (this.RandomSeed = RandomSystem_1.default.IterateRandomSeed(t, e)), t
    );
  }
}
exports.PlayerInfoModel = PlayerInfoModel;
//# sourceMappingURL=PlayerInfoModel.js.map
