"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaSelectionItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
class GachaSelectionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$be = void 0),
      (this.Pe = void 0),
      (this.TDe = void 0),
      (this.Qjt = void 0),
      (this.Xjt = !1),
      (this.ToggleCallBack = void 0),
      (this.CanToggleChange = void 0),
      (this.N8e = () => {
        this.ToggleCallBack?.(this.GridIndex);
      }),
      (this.Ijt = () => {
        var i,
          e = this.Qjt.ShowIdList[0],
          e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
        this.Xjt
          ? ((i = [e.TrialId]),
            RoleController_1.RoleController.OpenRoleMainView(1, 0, i))
          : ((i = new WeaponTrialData_1.WeaponTrialData()).SetTrialId(
              e.TrialId,
            ),
            (e = { WeaponDataList: [i], SelectedIndex: 0 }),
            UiManager_1.UiManager.OpenView("WeaponPreviewView", e));
      }),
      (this.RefreshLeftTime = () => {
        this.TDe &&
          (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe),
          (this.TDe = void 0));
        var i = this.GetText(6),
          e = this.Pe.GachaInfo,
          t = this.Pe.PoolInfo.Id,
          e = e.GetPoolEndTimeByPoolId(t);
        0 === e || (t = e - TimeUtil_1.TimeUtil.GetServerTime()) <= 0
          ? i.SetUIActive(!1)
          : (i.SetUIActive(!0),
            (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t)),
            i.SetText(e.CountDownText),
            0 < (t = e.RemainingTime) &&
              ((i = t),
              (this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(
                this.RefreshLeftTime,
                1e3 * i,
              ))));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [8, this.Ijt],
        [0, this.N8e],
      ]);
  }
  OnStart() {
    (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
      this.GetHorizontalLayout(4),
    )),
      this.GetExtendToggle(0)?.CanExecuteChange.Bind(
        () => !this.CanToggleChange || this.CanToggleChange(this.GridIndex),
      );
  }
  Refresh(i, e, t) {
    var r = (this.Pe = i).GachaInfo,
      s = i.PoolInfo.Id,
      r =
        (this.GetItem(9)?.SetUIActive(r.UsePoolId === s),
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(s)),
      a = (this.Qjt = r).Type,
      a =
        ((this.Xjt = ModelManager_1.ModelManager.GachaModel.IsRolePool(a)),
        r.ShowIdList[0]),
      r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(a);
    this.SetTextureByPath(r.GachaResultViewTexture, this.GetTexture(1)),
      this.GetText(5)?.SetText(i.GachaInfo.GetPoolInfo(s).Title),
      this.RefreshLeftTime(),
      this.Xjt ? this.$jt() : this.Yjt(),
      e
        ? this.GetExtendToggle(0)?.SetToggleState(1)
        : this.GetExtendToggle(0)?.SetToggleState(0);
  }
  OnSelected(i) {
    this.GetExtendToggle(0)?.SetToggleState(1);
  }
  OnDeselected(i) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  $jt() {
    var i = this.Qjt.ShowIdList[0],
      i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i),
      e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.Name),
        this.GetItem(2)?.SetUIActive(!0),
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaElementTexturePath(
          i.ElementId,
        )),
      e =
        (this.SetElementIcon(e, this.GetTexture(3), i.ElementId), i.QualityId);
    this.$be?.RebuildLayout(e);
  }
  Yjt() {
    var i,
      e,
      t = this.Qjt,
      t = (this.GetItem(2)?.SetUIActive(!0), t.ShowIdList[0]),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t);
    t &&
      ((i =
        ConfigManager_1.ConfigManager.GachaConfig?.GetGachaWeaponTransformConfig(
          t.WeaponType,
        )),
      (e = new UE.Vector(0.6, 0.6, 0.6)),
      this.GetTexture(3).SetUIItemScale(e),
      this.SetTextureByPath(i.WeaponTypeTexture, this.GetTexture(3)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.WeaponName),
      (e = t.QualityId),
      this.$be?.RebuildLayout(e));
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.GachaSelectionItem = GachaSelectionItem;
//# sourceMappingURL=GachaSelectionItem.js.map
