"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelegationNonDetailsModule = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil");
class CostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ETt = 0), (this.t6 = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
    ];
  }
  UpdateItem(t, i) {
    (this.ETt = t),
      (this.t6 = i),
      this.SetItemIcon(this.GetTexture(1), t),
      this.GetText(0).SetText(i.toString()),
      this.RefreshCountEnableState();
  }
  RefreshCountEnableState() {
    var t = this.GetText(0);
    t.SetChangeColor(!this.IsEnough, t.changeColor);
  }
  get IsEnough() {
    return (
      0 !== this.ETt &&
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.ETt,
      ) >= this.t6
    );
  }
}
class StarItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(t, i, e) {}
}
class DelegationNonDetailsModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.FirstCost = void 0),
      (this.SecondCurrency = void 0),
      (this.Data = void 0),
      (this.StarLayout = void 0),
      (this.aOn = void 0),
      (this.xke = () => {
        var t, i, e;
        this.Data.IsVisible
          ? (t = this.Data.GetNotEnoughConsumeItemId()) <= 0
            ? this.aOn?.SwitchToState(1, this.Data.Id)
            : ((i =
                ConfigManager_1.ConfigManager.BusinessConfig.GetPowerItemId()),
              (e =
                ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId()),
              t === i
                ? this.aOn?.JumpEnergyNotEnough()
                : t === e && this.aOn?.JumpMoneyNotEnough())
          : this.aOn?.JumpByConfigCondition(this.Data.Id);
      }),
      (this.vke = () => new StarItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UILayoutBase],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UITexture],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.xke]]);
  }
  async OnBeforeStartAsync() {
    (this.FirstCost = new CostItem()),
      (this.SecondCurrency = new CostItem()),
      (this.StarLayout = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(5),
        this.vke,
        this.GetItem(6).GetOwner(),
      )),
      await Promise.all([
        this.FirstCost.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()),
        this.SecondCurrency.CreateThenShowByActorAsync(
          this.GetItem(10).GetOwner(),
        ),
      ]);
  }
  wke() {
    var t = this.Data.IsVisible;
    this.GetItem(1)?.SetUIActive(!t), this.GetItem(3)?.SetUIActive(t);
  }
  LAn() {
    this.GetText(2)?.SetText(this.Data.GetLockText());
  }
  Ewa() {
    var t = this.Data.GetConsumeList(),
      i = t[0],
      i = (this.FirstCost.UpdateItem(i.ItemId, i.Count), t[1]);
    this.SecondCurrency.UpdateItem(i.ItemId, i.Count);
  }
  mGe() {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Title);
  }
  aqe() {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Data.Id,
    );
    this.StarLayout.RefreshByDataAsync([], !1, t.Star);
  }
  Rke() {
    var t;
    this.GetItem(7).SetUIActive(this.Data.HasBestEvaluate()),
      this.Data.HasBestEvaluate() &&
        ((t = ConfigManager_1.ConfigManager.BusinessConfig.GetEvaluateByLevel(
          this.Data.BestEvaluateLevel,
        )),
        this.SetTextureByPath(t.Icon, this.GetTexture(8)));
  }
  Kbe() {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
        this.Data.Id,
      ),
      t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustTypeById(
        t.EntrustType,
      ),
      i = this.GetTexture(11);
    this.SetTextureByPath(t.Icon, i),
      i.SetChangeColor(!this.Data.IsVisible, i.changeColor);
  }
  KPa() {
    this.GetItem(12)?.SetUIActive(!this.Data.HasBestEvaluate());
  }
  Refresh(t) {
    (this.Data = t),
      this.Data.IsVisible
        ? (this.wke(),
          this.Ewa(),
          this.mGe(),
          this.aqe(),
          this.Rke(),
          this.Kbe(),
          this.KPa())
        : (this.wke(), this.LAn(), this.Kbe());
  }
  RefreshConsume() {
    this.Data.IsVisible && this.Ewa();
  }
  RegisterViewController(t) {
    this.aOn = t;
  }
}
exports.DelegationNonDetailsModule = DelegationNonDetailsModule;
//# sourceMappingURL=DelegationNonDetailsModule.js.map
