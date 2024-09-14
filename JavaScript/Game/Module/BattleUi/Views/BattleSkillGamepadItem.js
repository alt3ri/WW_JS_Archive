"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillGamepadItem = void 0);
const UE = require("ue"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  BattleSkillItem_1 = require("./BattleSkillItem"),
  BattleSkillSecondCdItem_1 = require("./BattleSkillSecondCdItem");
class BattleSkillGamepadItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments),
      (this.GamepadData = void 0),
      (this.ButtonAreaType = 0),
      (this.IsSecondButton = !1),
      (this.HEe = ""),
      (this.eit = !1),
      (this.tit = void 0),
      (this.SPe = void 0),
      (this.iit = !1),
      (this.oit = void 0);
  }
  get IsMainButton() {
    return 0 === this.ButtonAreaType;
  }
  get IsSubButton() {
    return 2 === this.ButtonAreaType;
  }
  get IsLeftButton() {
    return 1 === this.ButtonAreaType;
  }
  Initialize(t) {
    super.Initialize(t),
      t < 4
        ? (this.ButtonAreaType = 0)
        : t < 8
          ? ((this.ButtonAreaType = 0),
            (this.IsSecondButton = !0),
            (this.CdFixedPoint = 0),
            this.CoolDownUiText?.SetUIItemScale(new UE.Vector(1.667, 1.667, 1)),
            (this.IsHideNumComp = !0))
          : t < 12
            ? ((this.ButtonAreaType = 1),
              (this.CdFixedPoint = 0),
              this.CoolDownUiText?.SetUIItemScale(
                new UE.Vector(1.667, 1.667, 1),
              ),
              (this.IsHideNumComp = !0))
            : ((this.ButtonAreaType = 2), (this.CdFixedPoint = 1));
  }
  async InitializeAsync() {
    await super.InitializeAsync(),
      this.IsMainButton &&
        ((this.oit = new BattleSkillSecondCdItem_1.BattleSkillSecondCdItem()),
        this.oit.SetIndex(this.GetInputIndex()),
        await this.oit.CreateByResourceIdAsync(
          "UiItem_BattleSkillSecondCdItem",
          this.GetExtraContainer(),
        ));
  }
  SetKeyName(t) {
    (this.HEe = t),
      this.IsMainButton || this.IsLeftButton
        ? this.KeyItem.SetActive(!1)
        : ((t = { KeyName: this.HEe }),
          this.KeyItem.RefreshByKeyList(t),
          this.KeyItem.SetActive(!0));
  }
  Tick(t) {
    super.Tick(t), this.oit?.Tick(t);
  }
  Refresh(t) {
    var i;
    !t && this.IsSecondButton
      ? this.Deactivate()
      : ((i = void 0 !== this.SkillButtonData || void 0 !== this.tit),
        (this.tit = void 0),
        t
          ? (this.SkillButtonData !== t &&
              (this.OnCoolDownFinishedCallback = void 0),
            super.Refresh(t))
          : (!i && this.eit) || ((this.eit = !0), this.rit()));
  }
  rit() {
    this.IsMainButton
      ? ((this.SkillButtonData = void 0),
        this.SetSkillIcon(this.GamepadData.NoneIcon),
        this.RefreshSkillName(),
        this.ResetSkillCoolDown(),
        (this.SetTextureHandleId = 0),
        (this.OnCoolDownFinishedCallback = void 0),
        (this.KeyActionName = void 0),
        (this.KeyOperationType = void 0),
        (this.PressActionType = InputEnums_1.EInputAction.None),
        this.RefreshDynamicEffect(),
        this.CancelLoadDynamicEffectNiagara(),
        this.CancelLoadCdCompletedNiagara(),
        this.UltraComponent && this.UltraComponent.SetComponentActive(!1),
        this.NumComponent && this.NumComponent.SetComponentActive(!1),
        this.SwitchComponent && this.SwitchComponent.SetComponentActive(!1),
        this.IsShowOrShowing || this.Show())
      : this.Deactivate();
  }
  RefreshVisible() {
    this.IsMainButton
      ? this.IsVisible()
        ? this.IsShowOrShowing || this.Show()
        : this.rit()
      : super.RefreshVisible();
  }
  RefreshEnable(t = !1) {
    this.tit
      ? this.SetSkillItemEnable(this.tit.IsEnable, t)
      : super.RefreshEnable(t);
  }
  RefreshSkillCoolDown() {
    this.SkillButtonData
      ? super.RefreshSkillCoolDown()
      : this.FinishSkillCoolDown();
  }
  RefreshByBehaviorButtonData(t) {
    (this.SkillButtonData = void 0),
      (this.tit = t),
      this.ResetSkillCoolDown(),
      (this.SetTextureHandleId = 0),
      (this.OnCoolDownFinishedCallback = void 0),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      this.RefreshDynamicEffect(),
      this.CancelLoadDynamicEffectNiagara(),
      this.CancelLoadCdCompletedNiagara(),
      this.UltraComponent && this.UltraComponent.SetComponentActive(!1),
      this.NumComponent && this.NumComponent.SetComponentActive(!1),
      this.SwitchComponent && this.SwitchComponent.SetComponentActive(!1),
      this.RefreshVisible(),
      this.RefreshSkillIcon(),
      this.RefreshSkillName(),
      this.RefreshKey(),
      this.RefreshEnable();
  }
  CheckSkillIconIsTexture(t) {
    return !!this.SkillButtonData && super.CheckSkillIconIsTexture(t);
  }
  RefreshSkillIcon() {
    this.tit
      ? this.SetSkillIcon(this.tit.SkillIconPathList[this.tit.State])
      : this.GamepadData.InWater && 5 === this.SkillButtonData?.GetButtonType()
        ? this.SetSkillIcon(this.GamepadData.SwimIcon)
        : super.RefreshSkillIcon();
  }
  IsVisible() {
    return (
      (!this.GamepadData.GetIsPressCombineButton() ||
        ("Gamepad_LeftTrigger" !== this.HEe &&
          "Gamepad_RightTrigger" !== this.HEe)) &&
      (this.tit
        ? this.tit.IsVisible
        : !(
            11 !== this.SkillButtonData?.GetButtonType() ||
            !this.GamepadData.IsAim()
          ) || super.IsVisible())
    );
  }
  Deactivate() {
    super.Deactivate(), (this.eit = !1);
  }
  Reset() {
    this.SPe?.Clear(), (this.SPe = void 0), super.Reset();
  }
  RefreshKey() {
    this.IsMainButton || this.IsLeftButton
      ? this.KeyItem.SetActive(!1)
      : this.KeyItem.SetActive(!0);
  }
  OnInputAction(t = !1) {
    this.tit
      ? this.tit.IsEnable && this.tit.IsVisible && this.ClickEffect?.Play()
      : super.OnInputAction(t);
  }
  PlayPressCombineButtonSeq() {
    this.nit(),
      this.SPe.StopCurrentSequence(),
      this.SPe.PlaySequencePurely("ClickLbIn"),
      this.CombinePressTipSprite.SetUIActive(!0),
      (this.iit = !0),
      this.ClickEffect?.Stop();
  }
  PlayReleaseCombineButtonSeq() {
    this.iit &&
      ((this.iit = !1),
      this.nit(),
      this.SPe.StopCurrentSequence(),
      this.SPe.PlaySequencePurely("ClickLbOut"),
      this.CombinePressTipSprite.SetUIActive(!1),
      this.ClickEffect?.Stop());
  }
  nit() {
    this.SPe ||
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
}
exports.BattleSkillGamepadItem = BattleSkillGamepadItem;
//# sourceMappingURL=BattleSkillGamepadItem.js.map
