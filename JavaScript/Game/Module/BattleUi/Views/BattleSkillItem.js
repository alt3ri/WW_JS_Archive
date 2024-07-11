"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  SkillCdController_1 = require("../../Battle/SkillCdController"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
  ControlScreenController_1 = require("../../ControlScreen/ControlScreenController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BattleUiDefine_1 = require("../BattleUiDefine"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  BattleSkillNumItem_1 = require("./BattleSkillNumItem"),
  BattleSkillSwitchComponent_1 = require("./BattleSkillSwitchComponent"),
  BattleSkillUltraItem_1 = require("./BattleSkillUltraItem"),
  BattleUiNiagaraItem_1 = require("./BattleUiNiagaraItem"),
  EQUIP_EFFECT_TIME = 500;
class BattleSkillItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Qet = void 0),
      (this.DraggableComponent = void 0),
      (this.SkillButtonData = void 0),
      (this.Xet = void 0),
      (this.$et = void 0),
      (this.Yet = void 0),
      (this.Jet = void 0),
      (this.zet = void 0),
      (this.Zet = -0),
      (this.ett = -0),
      (this.ttt = -0),
      (this.OnCoolDownFinishedCallback = void 0),
      (this.itt = !1),
      (this.ott = void 0),
      (this.IsLongPress = !1),
      (this.ntt = !1),
      (this.stt = ""),
      (this.Uet = void 0),
      (this.att = 0),
      (this.Aet = void 0),
      (this.htt = void 0),
      (this.ltt = 0),
      (this._tt = void 0),
      (this.utt = void 0),
      (this.KeyItem = void 0),
      (this.SetTextureHandleId = 0),
      (this.Pet = 0),
      (this.ctt = 0),
      (this.KeyActionName = void 0),
      (this.KeyOperationType = void 0),
      (this.ClickEffect = void 0),
      (this.CombinePressTipSprite = void 0),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      (this.mtt = void 0),
      (this.dtt = void 0),
      (this.Ctt = void 0),
      (this.gtt = void 0),
      (this.ftt = void 0),
      (this.ptt = void 0),
      (this.vtt = !1),
      (this.Mtt = !1),
      (this.Stt = !1),
      (this.Ett = !1),
      (this.ytt = 1),
      (this.Itt = 1),
      (this.Ttt = void 0),
      (this.UltraComponent = void 0),
      (this.NumComponent = void 0),
      (this.SwitchComponent = void 0),
      (this.AlphaTweenComp = void 0),
      (this.OnTouch = (t, i) => {
        var s;
        this.IsLongPress &&
          ((i = i.TouchType),
          (t = Number(t)),
          (s =
            TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
              t,
            )?.GetPointerEventData()?.pressComponent)) &&
          2 === i &&
          s.GetOwner() === this.Xet.GetOwner() &&
          ControlScreenController_1.ControlScreenController.ExecuteCameraRotation(
            t,
          );
      }),
      (this.Ltt = () => {
        (this.IsLongPress = !0), this.OnLongPressButton();
      }),
      (this.Dtt = (t) => {
        (this.Zet -= BattleUiDefine_1.SKILL_COOLDOWN_LOOP_INTERVAL),
          (this.Zet = Math.round(10 * this.Zet) / 10),
          0 < this.Zet
            ? this.Ett || this.Jet.SetText(this.Zet.toFixed(1))
            : this.FinishSkillCoolDown();
      });
  }
  get GetUltraComponent() {
    var t;
    return (
      this.UltraComponent ||
        ((t = this.GetItem(8)),
        (this.UltraComponent = new BattleSkillUltraItem_1.BattleSkillUltraItem(
          t,
        ))),
      this.UltraComponent
    );
  }
  get GetNumComponent() {
    var t;
    return (
      this.NumComponent ||
        ((t = this.GetItem(8)),
        (this.NumComponent = new BattleSkillNumItem_1.BattleSkillNumItem(t))),
      this.NumComponent
    );
  }
  get GetSwitchComponent() {
    var t;
    return (
      this.SwitchComponent ||
        ((t = this.GetItem(8)),
        (this.SwitchComponent =
          new BattleSkillSwitchComponent_1.BattleSkillSwitchComponent()),
        this.SwitchComponent.CreateByResourceIdAsync(
          "UiItem_BattleSkillSwitchItem",
          t,
        )),
      this.SwitchComponent
    );
  }
  GetExtraContainer() {
    return this.GetItem(8);
  }
  GetPointEventButton() {
    return this.Xet;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UITexture],
      [5, UE.UIButtonComponent],
      [6, UE.UINiagara],
      [7, UE.UINiagara],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UINiagara],
      [11, UE.UIText],
    ]),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        (this.ComponentRegisterInfos.push([12, UE.UISprite]),
        this.ComponentRegisterInfos.push([13, UE.UIItem]));
  }
  Initialize(t) {
    super.Initialize(),
      (this.ltt = t),
      (this.Xet = this.GetButton(5)),
      (this.Yet = this.GetItem(0)),
      (this.Jet = this.GetText(2)),
      (this.zet = this.GetSprite(1)),
      (this.mtt = this.GetTexture(4)),
      (this.dtt = this.GetSprite(3)),
      (this.Ctt = this.mtt
        .GetOwner()
        .GetComponentByClass(UE.UITextureTransitionComponent.StaticClass())),
      (this.gtt = this.dtt
        .GetOwner()
        .GetComponentByClass(UE.UISpriteTransition.StaticClass())),
      (this.ftt = this.mtt.GetTexture()),
      (this.ptt = this.dtt.GetSprite()),
      (this.vtt = !0),
      (this.Mtt = !0),
      (this.Ttt = this.GetText(11)),
      (this.ClickEffect = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(
        this.GetUiNiagara(10),
      )),
      this.GetUiNiagara(6).SetNiagaraUIActive(!1, !1),
      this.GetUiNiagara(7).SetNiagaraUIActive(!1, !1),
      this.Ore();
  }
  async InitializeAsync() {
    var t;
    ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
      ((this.CombinePressTipSprite = this.GetSprite(12)),
      (t = this.GetItem(13)),
      (this.KeyItem = new InputMultiKeyItem_1.InputMultiKeyItem()),
      (this.Qet = this.RootItem.GetParentAsUIItem()),
      await this.KeyItem.CreateByActorAsync(t.GetOwner()));
  }
  Refresh(t) {
    this.SkillButtonData !== t && this.TryReleaseButton(),
      t &&
        ((this.SkillButtonData = t),
        this.RefreshVisible(),
        this.RefreshSkillIcon(),
        this.RefreshSkillName(),
        this.RefreshCdCompletedEffect(),
        this.RefreshDynamicEffect(),
        this.RefreshKey(),
        this.RefreshTimeDilation(),
        this.RefreshSkillCoolDown(),
        this.RefreshLimitCount(!0),
        this.RefreshAttribute(!1),
        this.Rtt()) &&
        this.RefreshEquipExplore();
  }
  Deactivate() {
    this.TryReleaseButton(),
      this.ResetSkillCoolDown(),
      this.Utt(),
      this.Att(),
      (this.SkillButtonData = void 0),
      (this.SetTextureHandleId = 0),
      (this.OnCoolDownFinishedCallback = void 0),
      this.KeyItem?.SetActive(!1),
      this.KeyItem?.Reset(),
      (this.KeyActionName = void 0),
      (this.KeyOperationType = void 0),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      this.ClickEffect.Stop(),
      this.CancelLoadDynamicEffectNiagara(),
      this.CancelLoadCdCompletedNiagara(),
      this.HideAndClearSkillSprite(),
      this.HideAndClearSkillTexture(),
      (this.htt = void 0),
      this.UltraComponent &&
        (this.UltraComponent.Destroy(), (this.UltraComponent = void 0)),
      this.NumComponent &&
        (this.NumComponent.Destroy(), (this.NumComponent = void 0)),
      this.SwitchComponent &&
        (this.SwitchComponent.Destroy(), (this.SwitchComponent = void 0)),
      this.OnRefreshVisible(!1);
  }
  OnShowBattleChildView() {
    this.Qet?.SetUIActive(!0);
  }
  OnHideBattleChildView() {
    this.Qet?.SetUIActive(!1);
  }
  UpdateAlpha() {
    (this.Itt = this.RootItem.GetAlpha()),
      this.Itt > this.ytt
        ? this.RootItem.SetAlpha(this.ytt)
        : (this.ytt = this.Itt);
  }
  Reset() {
    this.kre(),
      this.Deactivate(),
      (this.Xet = void 0),
      (this.KeyItem = void 0),
      (this.ClickEffect = void 0),
      (this.htt = void 0),
      (this.AlphaTweenComp = void 0),
      (this.mtt = void 0),
      (this.dtt = void 0),
      (this.Ctt = void 0),
      (this.gtt = void 0),
      (this.ftt = void 0),
      (this.ptt = void 0),
      super.Reset();
  }
  Tick(t) {
    this.Ptt(t);
  }
  Ore() {
    this.ntt ||
      (this.GetPointEventButton().OnPointDownCallBack.Bind(() => {
        this.OnSkillButtonPressed();
      }),
      this.GetPointEventButton().OnPointUpCallBack.Bind(() => {
        this.OnSkillButtonReleased();
      }),
      this.GetPointEventButton().OnPointCancelCallBack.Bind(() => {
        this.OnSkillButtonCancel();
      }),
      (this.DraggableComponent = this.GetPointEventButton()
        .GetOwner()
        .GetComponentByClass(UE.UIDraggableComponent.StaticClass())),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.OnTouch,
      ),
      (this.ntt = !0));
  }
  kre() {
    this.ntt &&
      (this.GetPointEventButton() &&
        (this.GetPointEventButton().OnPointDownCallBack.Unbind(),
        this.GetPointEventButton().OnPointUpCallBack.Unbind(),
        this.GetPointEventButton().OnPointCancelCallBack.Unbind()),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.OnTouch,
      ),
      (this.ntt = !1));
  }
  OnSkillButtonPressed() {
    var t, i;
    if (
      this.SkillButtonData &&
      (this.SkillButtonData.IsEnable() &&
        0 !== this.ytt &&
        ((i = t = this.SkillButtonData.GetActionType()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "[SkillButton]当技能按钮按下时", [
            "inputActionType",
            t,
          ]),
        this.OnInputAction(),
        (this.PressActionType = t),
        1 === ModelManager_1.ModelManager.PlatformModel.OperationType
          ? InputDistributeController_1.InputDistributeController.InputAction(
              InputEnums_1.EInputAction[i],
              !0,
            )
          : InputController_1.InputController.InputAction(i, 1)),
      this.IsNeedLongPress())
    ) {
      let t = this.SkillButtonData.GetLongPressTime();
      t <= 0 &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "重新获取技能按钮长按时长", [
            "inputActionType",
            this.SkillButtonData.GetActionType(),
          ]),
        this.SkillButtonData.RefreshLongPressTime(),
        (t = this.SkillButtonData.GetLongPressTime())),
        t <= 0 ||
          (this.ott = TimerSystem_1.TimerSystem.Delay(
            this.Ltt,
            t * TimeUtil_1.TimeUtil.InverseMillisecond,
          ));
    }
  }
  IsNeedLongPress() {
    return this.SkillButtonData.GetIsLongPressControlCamera();
  }
  OnSkillButtonReleased() {
    var t;
    this.SkillButtonData &&
      (this.PressActionType !== InputEnums_1.EInputAction.None &&
        ((t = this.SkillButtonData.GetActionType()),
        this.PressActionType === t
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 18, "[SkillButton]当技能按钮抬起时", [
                "inputActionType",
                t,
              ]),
            1 === ModelManager_1.ModelManager.PlatformModel.OperationType
              ? InputDistributeController_1.InputDistributeController.InputAction(
                  InputEnums_1.EInputAction[t],
                  !1,
                )
              : InputController_1.InputController.InputAction(t, 2))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                18,
                "[SkillButton]当技能按钮抬起时,技能按钮对应的ActionType已经变化，会执行按下时候的Action抬起",
                ["inputActionType", t],
                ["PressActionType", this.PressActionType],
              ),
            1 === ModelManager_1.ModelManager.PlatformModel.OperationType
              ? InputDistributeController_1.InputDistributeController.InputAction(
                  InputEnums_1.EInputAction[this.PressActionType],
                  !1,
                )
              : InputController_1.InputController.InputAction(
                  this.PressActionType,
                  2,
                ))),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      this.Utt(),
      (this.IsLongPress = !1));
  }
  OnSkillButtonCancel() {
    4 === this.SkillButtonData?.GetButtonType() && this.OnSkillButtonReleased();
  }
  TryReleaseButton() {
    this.PressActionType !== InputEnums_1.EInputAction.None &&
      this.OnSkillButtonReleased();
  }
  OnLongPressButton() {}
  SetSkillIcon(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i) && this.htt !== i) {
      0 !== this.SetTextureHandleId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
          this.SetTextureHandleId,
        ),
        (this.Stt = !0);
      const s = this.mtt,
        e = this.dtt;
      (this.htt = i),
        this.CheckSkillIconIsTexture(i)
          ? (e && this.HideAndClearSkillSprite(),
            (this.SetTextureHandleId =
              ResourceSystem_1.ResourceSystem.LoadAsync(
                i,
                UE.Texture,
                (t) => {
                  (this.Stt = !1),
                    s &&
                      this.htt === i &&
                      (t
                        ? this.ShowAndSetSkillTexture(t)
                        : this.HideAndClearSkillTexture());
                },
                103,
              )),
            (this.htt = i),
            this.Stt && s.SetUIActive(!1))
          : (this.HideAndClearSkillTexture(),
            (this.SetTextureHandleId =
              ResourceSystem_1.ResourceSystem.LoadAsync(
                i,
                UE.LGUISpriteData_BaseObject,
                (t) => {
                  (this.Stt = !1),
                    e &&
                      this.htt === i &&
                      (t
                        ? this.ShowAndSetSkillSprite(t)
                        : this.HideAndClearSkillSprite());
                },
                103,
              )),
            this.Stt && e.SetUIActive(!1));
    }
  }
  CheckSkillIconIsTexture(t) {
    return 0 < t.search("Image/");
  }
  HideAndClearSkillTexture() {
    this.mtt &&
      (this.vtt ||
        (this.mtt.SetTexture(this.ftt),
        this.Ctt?.SetAllStateTexture(this.ftt),
        (this.vtt = !0)),
      this.mtt.SetUIActive(!1));
  }
  ShowAndSetSkillTexture(t) {
    this.mtt.SetTexture(t),
      this.Ctt?.SetAllStateTexture(t),
      (this.vtt = !1),
      this.mtt.SetUIActive(!0);
  }
  HideAndClearSkillSprite() {
    this.dtt &&
      (this.Mtt ||
        (this.dtt.SetSprite(this.ptt),
        this.gtt?.SetAllTransitionSprite(this.ptt),
        (this.Mtt = !0)),
      this.dtt.SetUIActive(!1));
  }
  ShowAndSetSkillSprite(t) {
    this.dtt.SetSprite(t),
      this.gtt?.SetAllTransitionSprite(t),
      (this.Mtt = !1),
      this.dtt.SetUIActive(!0);
  }
  RefreshSkillIcon() {
    if (this.SkillButtonData)
      if (this.SkillButtonData.IsMultiStageSkill()) {
        const t = this.SkillButtonData.GetMultiSkillTexturePath();
        void this.SetSkillIcon(t);
      } else {
        const t = this.SkillButtonData.GetSkillTexturePath();
        this.SetSkillIcon(t);
      }
  }
  RefreshSkillName() {
    var t,
      i = this.SkillButtonData?.GetSkillId();
    i
      ? ((t = this.SkillButtonData.SkillIconName),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? (i =
              ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillNameBySkillId(
                i,
              ))
            ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.Ttt, i),
              this.Ttt.SetUIActive(!0))
            : this.Ttt.SetUIActive(!1)
          : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.Ttt, t),
            this.Ttt.SetUIActive(!0)))
      : this.Ttt.SetUIActive(!1);
  }
  SetSkillItemEnable(t, i = !1) {
    this.Xet &&
      (i || this.Xet.GetSelfInteractive() !== t) &&
      this.Xet.SetSelfInteractive(t);
  }
  RefreshKey() {
    var t,
      i = ModelManager_1.ModelManager.PlatformModel.OperationType;
    2 === i &&
      ((t = this.SkillButtonData.GetActionName()),
      this.KeyActionName === t && this.KeyOperationType === i
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            18,
            "[KeyItem]刷新技能按钮按键图标时，平台和行为名称与上一次刷新一致，因此不刷新",
            ["actionName", t],
            ["operationType", i],
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 18, "[KeyItem]刷新技能按钮按键图标", [
              "actionName",
              t,
            ]),
          this.KeyItem &&
            (this.KeyItem.RefreshByActionOrAxis({ ActionOrAxisName: t }),
            this.KeyItem.SetActive(!0)),
          (this.KeyOperationType = i),
          (this.KeyActionName = t)));
  }
  PauseGame(t) {
    1 === t
      ? (TimerSystem_1.TimerSystem.Has(this.$et) &&
          !TimerSystem_1.TimerSystem.IsPause(this.$et) &&
          TimerSystem_1.TimerSystem.Pause(this.$et),
        TimerSystem_1.TimerSystem.Has(this._tt) &&
          !TimerSystem_1.TimerSystem.IsPause(this._tt) &&
          TimerSystem_1.TimerSystem.Pause(this._tt))
      : 0 === t &&
        (TimerSystem_1.TimerSystem.Has(this.$et) &&
          TimerSystem_1.TimerSystem.IsPause(this.$et) &&
          TimerSystem_1.TimerSystem.Resume(this.$et),
        TimerSystem_1.TimerSystem.Has(this._tt)) &&
        TimerSystem_1.TimerSystem.IsPause(this._tt) &&
        TimerSystem_1.TimerSystem.Resume(this._tt);
  }
  RefreshSkillCoolDownOnShow() {
    this.Zet <= 0 || this.ett <= 0 || !this.zet || this.RefreshSkillCoolDown();
  }
  RefreshSkillCoolDown() {
    this.SkillButtonData &&
      ((this.xtt() && this.wtt()) ||
        (this.Btt() && this.btt()) ||
        (this.SkillButtonData.IsMultiStageSkill() &&
          this.TryRefreshMultiSkillCoolDown()) ||
        (this.RefreshLimitCount(), this.qtt()),
      this.RefreshEnable());
  }
  TryRefreshMultiSkillCoolDown() {
    var t,
      i,
      s = this.SkillButtonData.GetMultiSkillInfo();
    return !(
      !s ||
      0 === s.NextSkillId ||
      ((t = s.RemainingStartTime),
      (i = s.StartTime),
      0 < t
        ? this.Gtt(t, i)
        : this.Gtt(s.RemainingStopTime, s.StopTime - i, !0),
      0)
    );
  }
  qtt() {
    var t,
      i = this.SkillButtonData.GetGroupSkillCdInfo();
    i && ((t = i.CurRemainingCd), (i = i.CurMaxCd), this.Gtt(t, i));
  }
  Gtt(t, i, s = !1) {
    (this.Ett = s),
      0 < t && 0 < i
        ? this.SkillButtonData.IsCdVisible()
          ? this.Ott(t, i)
          : this.ktt(t)
        : this.FinishSkillCoolDown();
  }
  Ott(t, i, s) {
    const e = this.SkillButtonData?.GetSkillId();
    this.HasListenAttribute() && this.Ftt(!0, void 0, !0),
      this.Vtt(t, i, () => {
        this.SkillButtonData.IsMultiStageSkill() &&
          this.TryRefreshMultiSkillCoolDown();
        var t = e === this.SkillButtonData?.GetSkillId();
        this.SkillButtonData.RefreshIsEnable(),
          this.HasListenAttribute()
            ? (this.Htt(!1), this.Ftt(t, void 0, !1))
            : t && this.jtt(),
          s?.();
      });
  }
  ktt(t) {
    this.ResetSkillCoolDown();
    (this._tt = TimerSystem_1.TimerSystem.Delay(() => {
      this.SkillButtonData.RefreshIsEnable(), this.FinishSkillCoolDown();
    }, t * TimeUtil_1.TimeUtil.InverseMillisecond)),
      this.Wtt(this._tt);
  }
  jtt() {
    var t;
    !this.SkillButtonData ||
      this.SkillButtonData.GetCdCompletedEffectId() < 0 ||
      (0 !== this.ytt &&
        ((t = this.GetUiNiagara(6)).bIsUIActive || t.SetUIActive(!0),
        t.ActivateSystem(!0)));
  }
  Vtt(t, i, s) {
    this.Ktt(),
      t <= (this.Zet = 0)
        ? this.Yet.SetUIActive(!1)
        : ((this.Zet = t),
          (this.ett = i),
          (this.ttt = Time_1.Time.WorldTimeSeconds - (i - t)),
          (this.OnCoolDownFinishedCallback = s),
          this.Ett
            ? this.Jet.SetText("")
            : this.Jet.SetText(this.Zet.toFixed(1)),
          (this.$et = TimerSystem_1.TimerSystem.Forever(
            this.Dtt,
            BattleUiDefine_1.SKILL_COOLDOWN_INTERVAL,
          )),
          this.Wtt(this.$et),
          this.Yet.SetUIActive(!0));
  }
  FinishSkillCoolDown() {
    var t;
    this.ResetSkillCoolDown(),
      this.OnCoolDownFinishedCallback &&
        ((t = this.OnCoolDownFinishedCallback),
        (this.OnCoolDownFinishedCallback = void 0),
        t());
  }
  Ptt(t) {
    this.Zet <= 0 ||
      this.ett <= 0 ||
      !this.zet ||
      (SkillCdController_1.SkillCdController.IsPause()
        ? (this.ttt +=
            t * Time_1.Time.TimeDilation * TimeUtil_1.TimeUtil.Millisecond)
        : ((t = (Time_1.Time.WorldTimeSeconds - this.ttt) / this.ett),
          this.zet.SetFillAmount(t)));
  }
  ResetSkillCoolDown() {
    this.Yet.SetUIActive(!1), this.Ktt(), (this.Zet = 0);
  }
  Ktt() {
    this.SkillButtonData &&
      (TimerSystem_1.TimerSystem.Has(this.$et) &&
        TimerSystem_1.TimerSystem.Remove(this.$et),
      TimerSystem_1.TimerSystem.Has(this._tt)) &&
      TimerSystem_1.TimerSystem.Remove(this._tt);
  }
  RefreshEnable(t = !1) {
    var i;
    this.SkillButtonData && ((i = this.Qtt()), this.SetSkillItemEnable(i, t));
  }
  DisableButton() {
    this.SetSkillItemEnable(!1, !0);
  }
  RefreshVisible() {
    var t;
    this.RootItem?.IsValid() &&
      ((t = this.IsVisible()) !== this.RootItem.bIsUIActive ||
        (this.Qet && t !== this.Qet.bIsUIActive)) &&
      this.OnRefreshVisible(t);
  }
  OnRefreshVisible(t) {
    t
      ? this.IsShowOrShowing || (this.Show(), this.RefreshEnable(!0))
      : this.IsHideOrHiding || (this.TryReleaseButton(), this.Hide());
  }
  GetGuideItem() {
    if (!this.IsCreateOrCreating) return [this.RootItem, this.GetTexture(4)];
  }
  RefreshCdCompletedEffect() {
    var t;
    !this.SkillButtonData ||
      this.SkillButtonData.GetCdCompletedEffectId() <= 0 ||
      0 < this.SkillButtonData.AttributeId ||
      ((t = this.SkillButtonData.GetCdCompletedEffectConfig()) &&
        ((t = t.NiagaraPath),
        StringUtils_1.StringUtils.IsEmpty(t) ||
          (!StringUtils_1.StringUtils.IsEmpty(this.stt) && this.stt === t) ||
          (this.CancelLoadCdCompletedNiagara(),
          (this.ctt = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.NiagaraSystem,
            (t) => {
              t?.IsValid() && this.GetUiNiagara(6)?.SetNiagaraSystem(t);
            },
          )),
          (this.stt = t))));
  }
  CancelLoadCdCompletedNiagara() {
    this.ctt &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ctt),
      (this.ctt = void 0));
  }
  GetDynamicEffectConfig() {
    if (this.SkillButtonData)
      return this.SkillButtonData.GetDynamicEffectConfig();
  }
  GetDynamicEffectPath(t) {
    t = t.NiagaraPath;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) return t;
  }
  CancelLoadDynamicEffectNiagara() {
    this.Pet &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Pet),
      (this.Pet = void 0));
  }
  RefreshDynamicEffect() {
    var t = this.GetDynamicEffectConfig();
    let i = void 0,
      s = 0;
    t && ((i = this.GetDynamicEffectPath(t)), (s = t.ElementId)),
      this.Uet !== i &&
        ((this.Uet = i),
        this.Uet
          ? this.Uet === this.Aet && this.att === s
            ? this.SetDynamicEffectVisible(!0)
            : ((this.Aet = this.Uet),
              (this.att = s),
              this.CancelLoadDynamicEffectNiagara(),
              (this.Pet = ResourceSystem_1.ResourceSystem.LoadAsync(
                this.Aet,
                UE.NiagaraSystem,
                (t) => {
                  var i;
                  t?.IsValid() &&
                    (i = this.GetUiNiagara(7)) &&
                    (i.SetNiagaraSystem(t),
                    0 < this.att &&
                      ((t =
                        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
                          this.att,
                        )),
                      (t = new UE.LinearColor(
                        UE.Color.FromHex(t.SkillEffectColor),
                      )),
                      i.SetNiagaraVarLinearColor("Color", t)),
                    this.Aet === this.Uet) &&
                    this.SetDynamicEffectVisible(!0);
                },
              )))
          : this.SetDynamicEffectVisible(!1));
  }
  SetDynamicEffectVisible(t) {
    var i = this.GetUiNiagara(7);
    i &&
      (t
        ? (i.bIsUIActive || i.SetUIActive(!0), i.ActivateSystem(!0))
        : i.bIsUIActive && i.SetUIActive(!1));
  }
  RefreshTimeDilation() {
    this.Xtt(this.$tt());
  }
  $tt() {
    return SkillCdController_1.SkillCdController.IsPause()
      ? 0
      : Time_1.Time.TimeDilation;
  }
  Wtt(t) {
    var i = this.$tt();
    1 !== i &&
      (0 < i
        ? TimerSystem_1.TimerSystem.ChangeDilation(t, i)
        : TimerSystem_1.TimerSystem.Pause(t));
  }
  Xtt(t) {
    TimerSystem_1.TimerSystem.Has(this.$et) &&
      (0 < t
        ? (TimerSystem_1.TimerSystem.IsPause(this.$et) &&
            TimerSystem_1.TimerSystem.Resume(this.$et),
          TimerSystem_1.TimerSystem.ChangeDilation(this.$et, t))
        : TimerSystem_1.TimerSystem.IsPause(this.$et) ||
          TimerSystem_1.TimerSystem.Pause(this.$et)),
      TimerSystem_1.TimerSystem.Has(this._tt) &&
        (0 < t
          ? (TimerSystem_1.TimerSystem.IsPause(this._tt) &&
              TimerSystem_1.TimerSystem.Resume(this._tt),
            TimerSystem_1.TimerSystem.ChangeDilation(this._tt, t))
          : TimerSystem_1.TimerSystem.IsPause(this._tt) ||
            TimerSystem_1.TimerSystem.Pause(this._tt));
  }
  Utt() {
    this.ott &&
      TimerSystem_1.TimerSystem.Has(this.ott) &&
      (TimerSystem_1.TimerSystem.Remove(this.ott), (this.ott = void 0));
  }
  Rtt() {
    var t = 7 === this.SkillButtonData?.GetButtonType();
    return (
      (this.SwitchComponent || t) &&
        this.GetSwitchComponent.SetComponentActive(t),
      t
    );
  }
  RefreshAttribute(t = !0) {
    var i = this.HasListenAttribute(),
      s = this.UltraComponent?.Visible;
    s !== i && (this.Ytt(i), s) && this.Jtt(),
      i && (this.RefreshFrameSprite(), this.ztt(), this.Ztt(), this.Htt(t)),
      this.RefreshEnable();
  }
  Ytt(t) {
    (this.UltraComponent || t) && this.GetUltraComponent.SetComponentActive(t);
  }
  RefreshFrameSprite() {
    var t;
    this.HasListenAttribute() &&
      ((t = this.SkillButtonData.GetFrameSpriteColor()),
      this.GetUltraComponent.SetFrameSprite(t));
  }
  Htt(t = !0) {
    var i = this.SkillButtonData.GetAttribute(),
      s = this.SkillButtonData.GetMaxAttribute();
    0 === s
      ? (this.SetEnergyPercent(1, t), this.Ftt(t, !1, void 0))
      : (this.SetEnergyPercent(i / s, t), this.Ftt(t, i < s, void 0));
  }
  Ftt(t, i, s) {
    let e = i,
      h = s;
    e ||
      h ||
      (void 0 === i &&
        ((s = this.SkillButtonData.GetAttribute()),
        (i = this.SkillButtonData.GetMaxAttribute()),
        (e = s < i)),
      void 0 === h &&
        (h = 0 < this.SkillButtonData.GetSkillRemainingCoolDown()));
    s = !e && !h;
    this.SetMaxEnergyEffectEnable(s), t && this.eit(s);
  }
  xtt() {
    return (
      7 === this.SkillButtonData?.GetButtonType() &&
      this.SkillButtonData.IsSkillInItemUseBuffCd()
    );
  }
  wtt() {
    var [t, i] = this.SkillButtonData.GetEquippedItemUsingBuffCd();
    return (
      0 < t &&
      (this.Ott(t, i, () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
        ),
          this.RefreshEnable();
      }),
      !0)
    );
  }
  Btt() {
    return (
      7 === this.SkillButtonData?.GetButtonType() &&
      this.SkillButtonData.IsSkillInItemUseSkillCd()
    );
  }
  btt() {
    var [t, i] = this.SkillButtonData.GetEquippedItemUsingSkillCd();
    return (
      0 < t &&
      (this.Ott(t, i, () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
        ),
          this.RefreshEnable();
      }),
      !0)
    );
  }
  RefreshEquipExplore() {
    const t = this.GetItem(9);
    t.IsUIActiveSelf() && t.SetUIActive(!1),
      this.SkillButtonData.GetExploreSkillChange() &&
        (t.SetUIActive(!0),
        this.SkillButtonData.SetExploreSkillChange(!1),
        this.Att(),
        (this.utt = TimerSystem_1.TimerSystem.Delay(() => {
          (this.utt = void 0), t.SetUIActive(!1);
        }, EQUIP_EFFECT_TIME))),
      this.GetSwitchComponent.RefreshSwitch();
    var i,
      s = ModelManager_1.ModelManager.RouletteModel.IsExploreSkillHasNum(),
      e =
        (s
          ? ((e =
              ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowNum()),
            this.GetSwitchComponent.UpdateNumPanel(s, e))
          : this.GetSwitchComponent.UpdateNumPanel(s),
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId),
      s = ModelManager_1.ModelManager.RouletteModel.IsExploreSkillHasSetNum(e);
    s
      ? (([e, i] =
          ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowSetNumById(
            e,
          )),
        this.GetSwitchComponent.UpdatePointPanel(s, i, e))
      : this.GetSwitchComponent.UpdatePointPanel(s);
  }
  Att() {
    this.utt &&
      (TimerSystem_1.TimerSystem.Remove(this.utt), (this.utt = void 0));
  }
  SetMaxEnergyEffectEnable(t) {
    this.GetUltraComponent.SetUltraEffectEnable(t);
  }
  tit(t) {}
  iit(t) {
    this.GetUltraComponent.SetUltraUpEffectEnable(t);
  }
  SetEnergyPercent(t, i) {
    this.GetUltraComponent.SetBarPercent(t, i);
  }
  eit(t) {
    this.itt !== t && ((this.itt = t) ? this.oit() : this.Jtt());
  }
  oit() {
    this.tit(!0);
  }
  Jtt() {
    this.UltraComponent &&
      (this.tit(!1), this.SetMaxEnergyEffectEnable(!1), this.iit(!1));
  }
  ztt() {
    var t;
    this.HasListenAttribute() &&
      ((t = this.SkillButtonData.GetMaxAttributeEffectPath()),
      StringUtils_1.StringUtils.IsEmpty(t) ||
        this.GetUltraComponent.RefreshUltraEffect(
          t,
          this.SkillButtonData.GetMaxAttributeColor(),
        ));
  }
  Ztt() {
    var t;
    !this.SkillButtonData ||
      this.SkillButtonData.GetMaxAttributeBurstEffectId() <= 0 ||
      ((t = this.SkillButtonData.GetMaxAttributeBurstEffectConfig()) &&
        ((t = t.NiagaraPath),
        StringUtils_1.StringUtils.IsEmpty(t) ||
          this.GetUltraComponent.RefreshUltraTipsEffect(t)));
  }
  SetLimitUseSkillCount(t) {
    this.GetNumComponent.SetRemainingCount(t);
  }
  RefreshLimitCount(t = !1) {
    var i, s;
    this.SkillButtonData &&
      ((s =
        void 0 !== (i = this.SkillButtonData.GetGroupSkillCdInfo()) &&
        1 < i.LimitCount),
      t &&
        (this.NumComponent || s) &&
        this.GetNumComponent.SetComponentActive(s),
      s) &&
      this.SetLimitUseSkillCount(i.RemainingCount);
  }
  Qtt() {
    return !!this.SkillButtonData && this.SkillButtonData.IsEnable();
  }
  IsVisible() {
    return !!this.SkillButtonData && this.SkillButtonData.IsVisible();
  }
  GetAttributeId() {
    return this.SkillButtonData.AttributeId;
  }
  HasListenAttribute() {
    return !!this.SkillButtonData && this.SkillButtonData.HasAttribute();
  }
  GetSkillButtonData() {
    return this.SkillButtonData;
  }
  GetInputIndex() {
    return this.ltt;
  }
  OnInputAction(t = !1) {
    (t ||
      (this.SkillButtonData &&
        this.SkillButtonData.IsEnable() &&
        this.SkillButtonData.IsVisible())) &&
      this.ClickEffect?.Play();
  }
  SetVisibleByExploreMode(t, i = !1) {
    let s = !1;
    t ? ((this.ytt = this.Itt), (s = !0)) : (this.ytt = 0),
      this.RootItem &&
        (this.RootItem.SetRaycastTarget(s),
        this.GetItem(8).SetUIActive(t),
        i
          ? (this.AlphaTweenComp
              ? this.AlphaTweenComp.Stop()
              : (this.AlphaTweenComp = this.RootActor.GetComponentByClass(
                  UE.LGUIPlayTweenComponent.StaticClass(),
                )),
            ((t = this.AlphaTweenComp.GetPlayTween()).from =
              this.RootItem.GetAlpha()),
            (t.to = this.ytt),
            this.AlphaTweenComp.Play())
          : (this.AlphaTweenComp && this.AlphaTweenComp.Stop(),
            this.RootItem.SetAlpha(this.ytt)));
  }
}
(exports.BattleSkillItem = BattleSkillItem).Ntt = void 0;
//# sourceMappingURL=BattleSkillItem.js.map
