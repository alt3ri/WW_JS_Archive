"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarChun = void 0);
const UE = require("ue"),
  BattleUiTweenAnimPlayer_1 = require("../../BattleUiTweenAnimPlayer"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarPointItem_1 = require("../SpecialEnergyBarPointItem"),
  POINT_NUM = 41,
  POINT_WIDTH = 9,
  tagEvil = -1911483701,
  tagStrength = 1939202521;
class SpecialEnergyBarChun extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.qml = !1),
      (this.Gml = !1),
      (this.kml = !1),
      (this.edt = void 0),
      (this.Oml = void 0),
      (this.bst = void 0),
      (this.p2a = 0),
      (this.Nml = !1),
      (this.Fml = (t, i) => {
        i !== this.qml && ((this.qml = i), this.Vml(!0));
      }),
      (this.Hml = (t, i) => {
        i !== this.Gml && ((this.Gml = i), this.jml(), this.Wml(!0));
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
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitPointItem(this.GetItem(0))),
      t.push(this.LoadEffects()),
      t.push(this.InitKeyItem(this.GetItem(1))),
      await Promise.all(t);
  }
  async InitPointItem(t) {
    (this.edt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.edt.InitPrefabInfo(POINT_NUM, POINT_WIDTH),
      await this.edt.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnInitData() {
    super.OnInitData(),
      (this.qml = this.TagComponent.HasTag(tagEvil)),
      (this.Gml = this.TagComponent.HasTag(tagStrength)),
      (this.kml = this.GetKeyEnable());
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagAddOrRemoveChanged(tagEvil, this.Fml),
      this.ListenForTagAddOrRemoveChanged(tagStrength, this.Hml);
  }
  OnStart() {
    super.OnStart(),
      this.Qnt(),
      this.jml(),
      this.Vml(),
      this.Wml(),
      this.RefreshBarPercent(!0);
  }
  Qnt() {
    (this.Oml = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer()),
      this.Oml.InitTweenAnim(17, this.GetItem(17)),
      this.Oml.InitTweenAnim(18, this.GetItem(18)),
      this.Oml.InitTweenAnim(19, this.GetItem(19)),
      this.Oml.InitTweenAnim(20, this.GetItem(20)),
      this.Oml.InitTweenAnim(21, this.GetItem(21)),
      this.Oml.InitTweenAnim(22, this.GetItem(22)),
      this.Oml.InitTweenAnim(23, this.GetItem(23));
  }
  jml() {
    var t;
    this.Gml
      ? (t = this.NiagaraList[0]) && this.edt && this.edt.ReplaceFullEffect(t)
      : (this.edt.ResetFullEffect(),
        (t = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.edt.SetFullEffectColor(t));
  }
  Vml(t = !1) {
    this.qml
      ? (this.GetItem(8).SetUIActive(!0),
        this.GetItem(10).SetUIActive(this.kml),
        this.GetItem(11).SetUIActive(!this.kml),
        this.GetItem(12).SetUIActive(this.kml),
        this.GetItem(2).SetUIActive(!1),
        t
          ? (this.Oml?.StopTweenAnim(17), this.Oml?.PlayTweenAnim(18))
          : (this.GetItem(3).SetAlpha(1),
            this.GetItem(4).SetAlpha(1),
            this.GetItem(9).SetAlpha(1),
            this.GetItem(10).SetAlpha(1),
            this.GetItem(13).SetUIActive(!1)))
      : (this.GetItem(2).SetUIActive(!0),
        this.GetItem(4).SetUIActive(this.kml),
        this.GetItem(5).SetUIActive(!this.kml),
        this.GetItem(6).SetUIActive(this.kml),
        this.GetItem(8).SetUIActive(!1),
        t
          ? (this.Oml?.StopTweenAnim(18), this.Oml?.PlayTweenAnim(17))
          : (this.GetItem(3).SetAlpha(1),
            this.GetItem(4).SetAlpha(1),
            this.GetItem(9).SetAlpha(1),
            this.GetItem(10).SetAlpha(1),
            this.GetItem(7).SetUIActive(!1)));
  }
  Wml(t = !1) {
    this.Gml
      ? t
        ? (this.Oml?.StopTweenAnim(20), this.Oml?.PlayTweenAnim(19))
        : (this.GetItem(3).SetUIActive(!1),
          this.GetItem(9).SetUIActive(!1),
          this.GetItem(14).SetUIActive(!0),
          this.GetItem(15).SetUIActive(!0),
          this.GetItem(16).SetUIActive(!1))
      : (this.GetItem(3).SetUIActive(!0),
        this.GetItem(9).SetUIActive(!0),
        t
          ? (this.Oml?.StopTweenAnim(19), this.Oml?.PlayTweenAnim(20))
          : this.GetItem(14).SetUIActive(!1));
  }
  Qml() {
    this.kml
      ? (this.GetItem(4).SetUIActive(!0),
        this.GetItem(10).SetUIActive(!0),
        this.Oml?.StopTweenAnim(23),
        this.Oml?.PlayTweenAnim(22))
      : (this.Oml?.StopTweenAnim(22), this.Oml?.PlayTweenAnim(23));
  }
  RefreshBarPercent(t = !1) {
    var i = this.PercentMachine.GetCurPercent(),
      i = (this.edt.UpdatePercent(i), 0 < i);
    i !== this.kml && ((this.kml = i), this.Qml()),
      this.KeyItem?.RefreshKeyEnable(i, t);
  }
  RefreshBuff() {
    this.Config?.BuffId
      ? ((this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId)),
        (this.p2a = this.bst?.Handle ?? 0))
      : ((this.bst = void 0), (this.p2a = 0));
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(t) {
    super.Tick(t),
      this.edt?.Tick(t),
      (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a)) ||
        this.RefreshBuff();
    t =
      void 0 !== this.bst &&
      this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0];
    this.Nml !== t &&
      ((this.Nml = t)
        ? this.Oml?.PlayTweenAnim(21)
        : (this.Oml?.StopTweenAnim(21),
          this.GetItem(2)?.SetAlpha(1),
          this.GetItem(8)?.SetAlpha(1),
          this.GetItem(14)?.SetAlpha(1)));
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      this.Nml &&
        ((this.Nml = !1),
        this.Oml?.StopTweenAnim(21),
        this.GetItem(2)?.SetAlpha(1),
        this.GetItem(8)?.SetAlpha(1),
        this.GetItem(14)?.SetAlpha(1)),
      this.Oml?.Clear();
  }
}
exports.SpecialEnergyBarChun = SpecialEnergyBarChun;
//# sourceMappingURL=SpecialEnergyBarChun.js.map
