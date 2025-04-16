"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarFeibi = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarFeibiSlot_1 = require("./SpecialEnergyBarFeibiSlot"),
  YELLOW_CONFIG_ID = 150602,
  BLUE_CONFIG_ID = 150603;
class SpecialEnergyBarFeibi extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Yj_ = void 0),
      (this.zj_ = void 0),
      (this.Jj_ = void 0),
      (this.Zj_ = void 0),
      (this._ii = 0),
      (this.lne = (i, t) => {
        this._Oe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UITexture],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [12, UE.UIItem],
    ];
  }
  OnInitData() {
    (this.Yj_ =
      ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
        YELLOW_CONFIG_ID,
      )),
      (this.zj_ =
        ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
          BLUE_CONFIG_ID,
        ));
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagAddOrRemoveChanged(-1970535311, this.lne),
      this.ListenForTagAddOrRemoveChanged(-1593146607, this.lne);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()),
      i.push(this.InitKeyItem(this.GetItem(12))),
      await Promise.all(i);
  }
  async InitBarItem() {
    (this.Jj_ = new SpecialEnergyBarFeibiSlot_1.SpecialEnergyBarFeibiSlot()),
      this.Jj_.InitData(this.RoleData, this.Yj_),
      await this.Jj_.InitByActorAsync(this.GetItem(3).GetOwner()),
      (this.Zj_ = new SpecialEnergyBarFeibiSlot_1.SpecialEnergyBarFeibiSlot()),
      this.Zj_.InitData(this.RoleData, this.zj_),
      await this.Zj_.InitByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(13), this.InitTweenAnim(14), this._Oe(!0), this.Gdl(!0);
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Gdl(i = !1) {
    var t = this.PercentMachine.GetCurPercent();
    switch (this._ii) {
      case 0:
        this.GetTexture(11)?.SetFillAmount(t), this.Odl(i);
        break;
      case 1:
        this.GetTexture(5)?.SetFillAmount(t);
        break;
      case 2:
        this.GetTexture(4)?.SetFillAmount(t);
    }
  }
  OnKeyEnableChanged() {
    this.Odl();
  }
  Odl(i = !1) {
    var t = this.GetKeyEnable();
    this.KeyItem?.RefreshKeyEnable(t, i);
  }
  _Oe(i = !1) {
    this.TagComponent?.HasTag(-1970535311)
      ? this.Owt(1, i)
      : this.TagComponent?.HasTag(-1593146607)
        ? this.Owt(2, i)
        : this.Owt(0, i),
      i || this.Gdl();
  }
  Owt(i, t = !1) {
    if (i !== this._ii || t)
      switch (
        ((this._ii = i),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 17, "菲比能量条改变状态", ["觉醒", i]),
        this._ii)
      ) {
        case 0:
          this.GetItem(10)?.SetUIActive(!0),
            this.GetItem(1)?.SetUIActive(!1),
            this.GetItem(0)?.SetUIActive(!1),
            this.GetItem(12)?.SetUIActive(!0),
            t || this.PlayTweenAnim(14);
          break;
        case 1:
          this.GetItem(10)?.SetUIActive(!1),
            this.GetItem(1)?.SetUIActive(!0),
            this.GetItem(0)?.SetUIActive(!1),
            this.GetItem(12)?.SetUIActive(!1),
            t || this.PlayTweenAnim(13);
          break;
        case 2:
          this.GetItem(10)?.SetUIActive(!1),
            this.GetItem(1)?.SetUIActive(!1),
            this.GetItem(0)?.SetUIActive(!0),
            this.GetItem(12)?.SetUIActive(!1),
            t || this.PlayTweenAnim(13);
      }
  }
  Tick(i) {
    super.Tick(i), this.Jj_?.Tick(i), this.Zj_?.Tick(i);
  }
}
exports.SpecialEnergyBarFeibi = SpecialEnergyBarFeibi;
//# sourceMappingURL=SpecialEnergyBarFeibi.js.map
