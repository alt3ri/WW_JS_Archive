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
      (this.QHt = void 0),
      (this.XHt = !1),
      (this.ToggleCallBack = void 0),
      (this.CanToggleChange = void 0),
      (this.I6e = () => {
        this.ToggleCallBack?.(this.GridIndex);
      }),
      (this.IHt = () => {
        var i,
          e = this.QHt.ShowIdList[0],
          e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
        this.XHt
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
        [8, this.IHt],
        [0, this.I6e],
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
      i = i.PoolInfo.Id,
      r =
        (this.GetItem(9)?.SetUIActive(r.UsePoolId === i),
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(i)),
      i = (this.QHt = r).Type,
      i =
        ((this.XHt = ModelManager_1.ModelManager.GachaModel.IsRolePool(i)),
        r.ShowIdList[0]),
      i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(i);
    this.SetTextureByPath(i.GachaResultViewTexture, this.GetTexture(1)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), r.SummaryTitle),
      this.RefreshLeftTime(),
      this.XHt ? this.$Ht() : this.YHt(),
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
  $Ht() {
    var i = this.QHt.ShowIdList[0],
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
  YHt() {
    var i = this.QHt,
      i = (this.GetItem(2)?.SetUIActive(!1), i.ShowIdList[0]),
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(i);
    i &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.WeaponName),
      (i = i.QualityId),
      this.$be?.RebuildLayout(i));
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.GachaSelectionItem = GachaSelectionItem;
//# sourceMappingURL=GachaSelectionItem.js.map
