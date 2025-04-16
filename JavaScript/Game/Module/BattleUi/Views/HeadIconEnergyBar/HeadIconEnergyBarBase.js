"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadIconEnergyBarBase = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisibleStateUtil_1 = require("../../VisibleStateUtil"),
  BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer"),
  SpecialEnergyBarPercentMachine_1 = require("../SpecialEnergy/SpecialEnergyBarPercentMachine");
class HeadIconEnergyBarBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RoleData = void 0),
      (this.Config = void 0),
      (this.VisibleState = 0),
      (this.PercentMachine =
        new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine()),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
      (this.AttributeComponent = void 0),
      (this.TweenAnimPlayer = void 0),
      (this.GYe = new Map()),
      (this.pdt = (t, i, e) => {
        this.OnAttributeChanged();
      }),
      (this.vdt = (t, i, e) => {
        this.OnMaxAttributeChanged();
      });
  }
  SetVisible(t, i = 0) {
    var e = this.GetVisible(),
      i =
        ((this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
          this.VisibleState,
          t,
          i,
        )),
        this.GetVisible());
    (e === i && this.GetActive() === i) || this.SetActive(t);
  }
  GetVisible() {
    return VisibleStateUtil_1.VisibleStateUtil.GetVisible(this.VisibleState);
  }
  InitData(t, i) {
    (this.RoleData = t),
      (this.Config = i),
      (this.AttributeComponent = this.RoleData.AttributeComponent),
      (this.AttributeId = i.AttributeId),
      (this.MaxAttributeId =
        CharacterAttributeTypes_1.attributeIdsWithMax.get(this.AttributeId) ??
        0);
  }
  InitByPath(t, i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "加载头像能量条", ["path", i]),
      this.CreateByPathAsync(i, t);
  }
  ChangeParent(t) {
    this.ParentUiItem !== t &&
      ((this.ParentUiItem = t), this.GetOriginalItem().SetUIParent(t, !0));
  }
  Tick(t) {
    this.IsShowOrShowing &&
      this.PercentMachine.Update(t) &&
      this.OnBarPercentChanged();
  }
  OnBeforeShow() {
    this.AddEvents(),
      this.PercentMachine.Init(this.GetTargetAttributePercent());
  }
  OnBeforeHide() {
    this.RemoveEvents();
  }
  OnBeforeDestroy() {
    this.kYe(), this.ClearAllTweenAnim();
  }
  AddEvents() {
    this.ListenForAttributeChanged(this.AttributeId, this.pdt),
      this.ListenForAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  RemoveEvents() {
    this.RemoveListenAttributeChanged(this.AttributeId, this.pdt),
      this.RemoveListenAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  OnAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent()),
      this.OnBarPercentChanged();
  }
  OnMaxAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent()),
      this.OnBarPercentChanged();
  }
  OnBarPercentChanged() {}
  GetTargetAttributePercent() {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId),
      i = this.AttributeComponent.GetCurrentValue(this.MaxAttributeId);
    let e = 0 < i ? t / i : 0;
    return e;
  }
  ListenForAttributeChanged(t, i) {
    var e = this.RoleData?.AttributeComponent;
    e && (e.AddListener(t, i), this.GYe.set(t, i));
  }
  RemoveListenAttributeChanged(t, i) {
    var e = this.AttributeComponent;
    e && (e.RemoveListener(t, i), this.GYe.delete(t));
  }
  kYe() {
    var t = this.AttributeComponent;
    if (t) {
      for (var [i, e] of this.GYe) t.RemoveListener(i, e);
      this.GYe.clear();
    }
  }
  InitTweenAnim(t) {
    this.TweenAnimPlayer ||
      (this.TweenAnimPlayer =
        new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer()),
      this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.TweenAnimPlayer?.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer?.StopTweenAnim(t);
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear();
  }
}
exports.HeadIconEnergyBarBase = HeadIconEnergyBarBase;
//# sourceMappingURL=HeadIconEnergyBarBase.js.map
