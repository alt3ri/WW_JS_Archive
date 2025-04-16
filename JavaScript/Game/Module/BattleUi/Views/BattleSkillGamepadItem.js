"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillGamepadItem = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  BattleSkillItem_1 = require("./BattleSkillItem"),
  BattleSkillSwitchInteractItem_1 = require("./BattleSkillSwitchInteractItem");
class BattleSkillGamepadItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments),
      (this.GamepadData = void 0),
      (this.ButtonAreaType = 0),
      (this.IsSecondButton = !1),
      (this.HEe = ""),
      (this.eit = !1),
      (this.BehaviorButtonData = void 0),
      (this.SrcBehaviorButtonData = void 0),
      (this.SPe = void 0),
      (this.iit = !1),
      (this.Dah = void 0);
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
  SetKeyName(t) {
    (this.HEe = t),
      this.IsMainButton || this.IsLeftButton
        ? this.KeyItem.SetActive(!1)
        : ((t = { KeyName: this.HEe }),
          this.KeyItem.RefreshByKeyList(t),
          this.KeyItem.SetActive(!0));
  }
  Tick(t) {
    super.Tick(t);
  }
  Refresh(t) {
    var i;
    (!t && this.IsSecondButton) ||
    (this.IsSecondButton &&
      void 0 === this.SrcBehaviorButtonData &&
      7 === t?.GetButtonType() &&
      this.GamepadData?.SwitchInteractData.IsSwitchInteractOpen &&
      2 === this.GamepadData.SwitchInteractData.State)
      ? this.Deactivate()
      : ((i =
          void 0 !== this.SkillButtonData ||
          void 0 !== this.BehaviorButtonData),
        (this.BehaviorButtonData = void 0),
        t
          ? (this.SkillButtonData !== t &&
              (this.OnCoolDownFinishedCallback = void 0),
            super.Refresh(t),
            this.SrcBehaviorButtonData && this.SwitchInteract(!1))
          : (!i && this.eit) || ((this.eit = !0), this.rit()));
  }
  SwitchInteract(t, i) {
    t
      ? ((this.SrcBehaviorButtonData = this.BehaviorButtonData),
        (this.BehaviorButtonData = void 0),
        (this.OnCoolDownFinishedCallback = void 0),
        super.Refresh(i))
      : (this.SrcBehaviorButtonData = void 0),
      this.Dah
        ? this.Dah.RefreshEnable(t)
        : t &&
          ((this.Dah =
            new BattleSkillSwitchInteractItem_1.BattleSkillSwitchInteractItem()),
          this.Dah.Init(this.GetExtraContainer()),
          this.Dah.RefreshEnable(!0));
  }
  rit() {
    this.SrcBehaviorButtonData && this.SwitchInteract(!1),
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
          this.ConfigLongPressComponent &&
            this.ConfigLongPressComponent.SetComponentActive(!1),
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
    this.BehaviorButtonData
      ? this.SetSkillItemEnable(this.BehaviorButtonData.IsEnable, t)
      : super.RefreshEnable(t);
  }
  RefreshSkillCoolDown() {
    this.SkillButtonData
      ? super.RefreshSkillCoolDown()
      : this.FinishSkillCoolDown();
  }
  PlaySwitchCd() {
    this.HideCdText = !0;
    var t =
      (this.GamepadData?.SwitchInteractData.SwitchTime ?? 0) *
      TimeUtil_1.TimeUtil.Millisecond;
    this.PlaySkillTimeDown(t, t, void 0);
  }
  RefreshByBehaviorButtonData(t) {
    if (
      ((this.SkillButtonData = void 0),
      104 === (this.BehaviorButtonData = t).ButtonType &&
        this.GamepadData?.SwitchInteractData.IsSwitchInteractOpen) &&
      2 === this.GamepadData.SwitchInteractData.State
    ) {
      t =
        ModelManager_1.ModelManager.SkillButtonUiModel?.GetSkillButtonDataByButton(
          7,
        );
      if (t?.IsVisible() && t.GetSkillId())
        return void this.SwitchInteract(!0, t);
    }
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
      this.RefreshEnable(),
      this.SrcBehaviorButtonData && this.SwitchInteract(!1);
  }
  CheckSkillIconIsTexture(t) {
    return !!this.SkillButtonData && super.CheckSkillIconIsTexture(t);
  }
  RefreshSkillIcon() {
    this.BehaviorButtonData
      ? this.SetSkillIcon(
          this.BehaviorButtonData.SkillIconPathList[
            this.BehaviorButtonData.State
          ],
        )
      : super.RefreshSkillIcon();
  }
  IsVisible() {
    return (
      (!this.GamepadData.GetIsPressCombineButton() ||
        ("Gamepad_LeftTrigger" !== this.HEe &&
          "Gamepad_RightTrigger" !== this.HEe)) &&
      (this.BehaviorButtonData
        ? this.BehaviorButtonData.IsVisible
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
    this.BehaviorButtonData
      ? this.BehaviorButtonData.IsEnable &&
        this.BehaviorButtonData.IsVisible &&
        this.ClickEffect?.Play()
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
