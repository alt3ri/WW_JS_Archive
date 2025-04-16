"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarKanTeLeiLa = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarKanTeLeiLaSlot_1 = require("./SpecialEnergyBarKanTeLeiLaSlot"),
  NORMAL_CONFIG_ID = 160701,
  PINK_CONFIG_ID = 160702,
  COLORFUL_CONFIG_ID = 160703,
  POINT_NUM = 3;
class SpecialEnergyBarKanTeLeiLa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Rdc = void 0),
      (this.Adc = void 0),
      (this.Pdc = void 0),
      (this.xdc = void 0),
      (this.Udc = void 0),
      (this.Ddc = void 0),
      (this.Bdc = []),
      (this.kdc = []),
      (this.Odc = 0),
      (this._ii = 0),
      (this.bst = void 0),
      (this.p2a = 0),
      (this.Nml = !1),
      (this.Vdc = !1),
      (this.zR1 = !1),
      (this.qdc = (i, t) => {
        this.zR1 = !0;
      }),
      (this.Gdc = (i, t) => {
        this.zR1 = !0;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
    ];
  }
  OnInitData() {
    (this.Rdc =
      ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
        NORMAL_CONFIG_ID,
      )),
      (this.Adc =
        ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
          PINK_CONFIG_ID,
        )),
      (this.Pdc =
        ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
          COLORFUL_CONFIG_ID,
        ));
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagAddOrRemoveChanged(-1737183401, this.qdc),
      this.ListenForTagAddOrRemoveChanged(-8248787, this.Gdc);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()), await Promise.all(i);
  }
  async InitBarItem() {
    (this.xdc =
      new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot()),
      this.xdc.InitData(this.RoleData, this.Rdc),
      (this.xdc.FullEffectForceDisable = !0),
      (this.xdc.ForceHideBottomLine = !0),
      await this.xdc.InitByActorAsync(this.GetItem(10).GetOwner()),
      (this.Udc =
        new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot()),
      this.Udc.InitData(this.RoleData, this.Adc),
      (this.Udc.ForceHideBottomLine = !0),
      await this.Udc.InitByActorAsync(this.GetItem(11).GetOwner()),
      (this.Ddc =
        new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot()),
      this.Ddc.InitData(this.RoleData, this.Pdc),
      (this.Ddc.ForceHideBottomLine = !0),
      await this.Ddc.InitByActorAsync(this.GetItem(12).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(13),
      this.InitTweenAnim(14),
      this.InitTweenAnim(15),
      this.InitTweenAnim(16),
      this.InitTweenAnim(17),
      this.InitTweenAnim(18),
      this.InitTweenAnim(19),
      this.InitTweenAnim(20),
      this.InitTweenAnim(21),
      this.InitTweenAnim(22),
      this.InitTweenAnim(24),
      this.Bdc.push(this.GetItem(0)),
      this.Bdc.push(this.GetItem(1)),
      this.Bdc.push(this.GetItem(2)),
      this.kdc.push(this.GetItem(3)),
      this.kdc.push(this.GetItem(4)),
      this.kdc.push(this.GetItem(5)),
      this.GetItem(7)?.SetAlpha(1),
      this._Oe(!0),
      this.Fdc(!0);
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(18), super.ClearAllTweenAnim();
  }
  OnAttributeChanged() {
    this.Fdc();
  }
  OnMaxAttributeChanged() {}
  _Oe(i = !1) {
    var t = this.TagComponent?.HasTag(-8248787) ?? !1;
    this.TagComponent?.HasTag(-1737183401)
      ? t
        ? this.Owt(1, i)
        : this.Owt(2, i)
      : this.Owt(0, i),
      (this.Vdc === t && !i) || ((this.Vdc = t), this.Jwc(i));
  }
  Jwc(i = !1) {
    var t = !this.Vdc;
    i || 0 !== this._ii
      ? (this.GetItem(23)?.SetUIActive(t),
        this.GetItem(23)?.SetAlpha(t ? 1 : 0))
      : t && this.PlayTweenAnim(24);
  }
  Owt(i, t = !1) {
    if (i !== this._ii || t) {
      var s = this._ii;
      switch (
        ((this._ii = i),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 17, "坎特雷拉能量条改变状态", ["强化", i]),
        this._ii)
      ) {
        case 0:
          t
            ? (this.GetItem(6)?.SetUIActive(!0),
              this.GetItem(7)?.SetUIActive(!1))
            : (this.StopTweenAnim(13),
              this.PlayTweenAnim(14),
              2 === s && (this.StopTweenAnim(15), this.PlayTweenAnim(16)));
          break;
        case 1:
          this.GetItem(9)?.SetUIActive(!1),
            this.GetItem(8)?.SetUIActive(!0),
            this.GetItem(8)?.SetAlpha(1),
            t
              ? (this.GetItem(6)?.SetUIActive(!1),
                this.GetItem(7)?.SetUIActive(!0))
              : 0 === s
                ? (this.StopTweenAnim(14),
                  this.PlayTweenAnim(13),
                  this.GetItem(9)?.SetUIActive(!1),
                  this.GetItem(8)?.SetUIActive(!0))
                : (this.StopTweenAnim(15), this.PlayTweenAnim(16));
          break;
        case 2:
          t
            ? (this.GetItem(6)?.SetUIActive(!1),
              this.GetItem(7)?.SetUIActive(!0),
              this.GetItem(9)?.SetUIActive(!0),
              this.GetItem(8)?.SetUIActive(!1))
            : (0 === s &&
                (this.StopTweenAnim(14),
                this.PlayTweenAnim(13),
                this.GetItem(9)?.SetUIActive(!0),
                this.GetItem(8)?.SetUIActive(!1)),
              this.StopTweenAnim(16),
              this.PlayTweenAnim(15));
      }
      t ||
        (2 !== s && 2 !== this._ii) ||
        (this.Fdc(!0), 2 === this._ii && this.PlayTweenAnim(19));
    }
  }
  Fdc(i = !1) {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    if (i || this.Odc !== t) {
      for (let i = 0; i < POINT_NUM; i++) {
        var s = t > i,
          h = 2 === this._ii && t === POINT_NUM;
        this.Bdc[i].SetUIActive(s && !h),
          this.kdc[i].SetUIActive(s && h),
          s && this.Odc <= i && this.PlayTweenAnim(20 + i);
      }
      t < this.Odc && this.PlayTweenAnim(17), (this.Odc = t);
    }
  }
  Tick(i) {
    super.Tick(i),
      this.xdc?.Tick(i),
      this.Udc?.Tick(i),
      this.Ddc?.Tick(i),
      this.zR1 && (this._Oe(), (this.zR1 = !1)),
      0 === this._ii
        ? this.Ndc(!1)
        : ((this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a)) ||
            this.tst(),
          this.bst &&
            this.Ndc(
              this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0],
            ));
  }
  tst() {
    this.Config?.BuffId
      ? ((this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId)),
        (this.p2a = this.bst?.Handle ?? 0))
      : ((this.bst = void 0), (this.p2a = 0));
  }
  Ndc(i) {
    this.Nml !== i &&
      ((this.Nml = i)
        ? this.PlayTweenAnim(18)
        : (this.StopTweenAnim(18), this.GetItem(7)?.SetAlpha(1)));
  }
}
exports.SpecialEnergyBarKanTeLeiLa = SpecialEnergyBarKanTeLeiLa;
//# sourceMappingURL=SpecialEnergyBarKanTeLeiLa.js.map
