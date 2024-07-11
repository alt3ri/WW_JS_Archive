"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
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
      (this.sit = void 0),
      (this.DraggableComponent = void 0),
      (this.SkillButtonData = void 0),
      (this.ait = void 0),
      (this.hit = void 0),
      (this.lit = void 0),
      (this._it = void 0),
      (this.uit = void 0),
      (this.cit = -0),
      (this.mit = -0),
      (this.dit = -0),
      (this.OnCoolDownFinishedCallback = void 0),
      (this.Cit = !1),
      (this.git = void 0),
      (this.IsLongPress = !1),
      (this.fit = !1),
      (this.pit = ""),
      (this.jtt = void 0),
      (this.vit = 0),
      (this.Wtt = void 0),
      (this.Mit = void 0),
      (this.Eit = 0),
      (this.yit = void 0),
      (this.Iit = void 0),
      (this.KeyItem = void 0),
      (this.SetTextureHandleId = 0),
      (this.Ktt = 0),
      (this.Tit = 0),
      (this.KeyActionName = void 0),
      (this.KeyOperationType = void 0),
      (this.ClickEffect = void 0),
      (this.CombinePressTipSprite = void 0),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      (this.Lit = void 0),
      (this.Dit = void 0),
      (this.Rit = void 0),
      (this.Uit = void 0),
      (this.Ait = void 0),
      (this.Pit = void 0),
      (this.xit = !1),
      (this.wit = !1),
      (this.Bit = !1),
      (this.bit = !1),
      (this.qit = 1),
      (this.Git = 1),
      (this.Nit = void 0),
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
          s.GetOwner() === this.ait.GetOwner() &&
          ControlScreenController_1.ControlScreenController.ExecuteCameraRotation(
            t,
          );
      }),
      (this.Oit = () => {
        (this.IsLongPress = !0), this.OnLongPressButton();
      }),
      (this.kit = (t) => {
        (this.cit -= BattleUiDefine_1.SKILL_COOLDOWN_LOOP_INTERVAL),
          (this.cit = Math.round(10 * this.cit) / 10),
          0 < this.cit
            ? this.bit || this._it.SetText(this.cit.toFixed(1))
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
    return this.ait;
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
      Info_1.Info.IsInTouch() ||
        (this.ComponentRegisterInfos.push([12, UE.UISprite]),
        this.ComponentRegisterInfos.push([13, UE.UIItem]));
  }
  Initialize(t) {
    super.Initialize(),
      (this.Eit = t),
      (this.ait = this.GetButton(5)),
      (this.lit = this.GetItem(0)),
      (this._it = this.GetText(2)),
      (this.uit = this.GetSprite(1)),
      (this.Lit = this.GetTexture(4)),
      (this.Dit = this.GetSprite(3)),
      (this.Rit = this.Lit.GetOwner().GetComponentByClass(
        UE.UITextureTransitionComponent.StaticClass(),
      )),
      (this.Uit = this.Dit.GetOwner().GetComponentByClass(
        UE.UISpriteTransition.StaticClass(),
      )),
      (this.Ait = this.Lit.GetTexture()),
      (this.Pit = this.Dit.GetSprite()),
      (this.xit = !0),
      (this.wit = !0),
      (this.Nit = this.GetText(11)),
      (this.ClickEffect = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(
        this.GetUiNiagara(10),
      )),
      this.GetUiNiagara(6).SetNiagaraUIActive(!1, !1),
      this.GetUiNiagara(7).SetNiagaraUIActive(!1, !1),
      this.Ore();
  }
  async InitializeAsync() {
    var t;
    Info_1.Info.IsInTouch() ||
      ((this.CombinePressTipSprite = this.GetSprite(12)),
      (t = this.GetItem(13)),
      (this.KeyItem = new InputMultiKeyItem_1.InputMultiKeyItem()),
      (this.sit = this.RootItem.GetParentAsUIItem()),
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
        this.Fit()) &&
        this.RefreshEquipExplore();
  }
  Deactivate() {
    this.TryReleaseButton(),
      this.ResetSkillCoolDown(),
      this.Vit(),
      this.jit(),
      (this.SkillButtonData = void 0),
      (this.SetTextureHandleId = 0),
      (this.OnCoolDownFinishedCallback = void 0),
      this.KeyItem?.SetActive(!1),
      this.KeyItem?.ResetLongPress(),
      (this.KeyActionName = void 0),
      (this.KeyOperationType = void 0),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      this.ClickEffect.Stop(),
      this.CancelLoadDynamicEffectNiagara(),
      this.CancelLoadCdCompletedNiagara(),
      this.HideAndClearSkillSprite(),
      this.HideAndClearSkillTexture(),
      (this.Mit = void 0),
      this.UltraComponent &&
        (this.UltraComponent.Destroy(), (this.UltraComponent = void 0)),
      this.NumComponent &&
        (this.NumComponent.Destroy(), (this.NumComponent = void 0)),
      this.SwitchComponent &&
        (this.SwitchComponent.Destroy(), (this.SwitchComponent = void 0)),
      this.OnRefreshVisible(!1);
  }
  OnShowBattleChildView() {
    this.sit?.SetUIActive(!0);
  }
  OnHideBattleChildView() {
    this.sit?.SetUIActive(!1);
  }
  UpdateAlpha() {
    (this.Git = this.RootItem.GetAlpha()),
      this.Git > this.qit
        ? this.RootItem.SetAlpha(this.qit)
        : (this.qit = this.Git);
  }
  Reset() {
    this.kre(),
      this.Deactivate(),
      (this.ait = void 0),
      (this.KeyItem = void 0),
      (this.ClickEffect = void 0),
      (this.Mit = void 0),
      (this.AlphaTweenComp = void 0),
      (this.Lit = void 0),
      (this.Dit = void 0),
      (this.Rit = void 0),
      (this.Uit = void 0),
      (this.Ait = void 0),
      (this.Pit = void 0),
      super.Reset();
  }
  Tick(t) {
    this.Wit(t);
  }
  Ore() {
    this.fit ||
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
      (this.fit = !0));
  }
  kre() {
    this.fit &&
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
      (this.fit = !1));
  }
  OnSkillButtonPressed() {
    var t, i;
    if (
      this.SkillButtonData &&
      (this.SkillButtonData.IsEnable() &&
        0 !== this.qit &&
        ((i = t = this.SkillButtonData.GetActionType()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "[SkillButton]当技能按钮按下时", [
            "inputActionType",
            t,
          ]),
        this.OnInputAction(),
        (this.PressActionType = t),
        1 === Info_1.Info.OperationType
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
          (this.git = TimerSystem_1.TimerSystem.Delay(
            this.Oit,
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
            1 === Info_1.Info.OperationType
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
            1 === Info_1.Info.OperationType
              ? InputDistributeController_1.InputDistributeController.InputAction(
                  InputEnums_1.EInputAction[this.PressActionType],
                  !1,
                )
              : InputController_1.InputController.InputAction(
                  this.PressActionType,
                  2,
                ))),
      (this.PressActionType = InputEnums_1.EInputAction.None),
      this.Vit(),
      (this.IsLongPress = !1));
  }
  OnSkillButtonCancel() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        18,
        "[SkillButton]当技能按钮取消时,执行抬起流程",
        ["inputActionType", this.SkillButtonData?.GetActionType()],
      ),
      this.OnSkillButtonReleased();
  }
  TryReleaseButton() {
    this.PressActionType !== InputEnums_1.EInputAction.None &&
      this.OnSkillButtonReleased();
  }
  OnLongPressButton() {}
  SetSkillIcon(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i) && this.Mit !== i) {
      0 !== this.SetTextureHandleId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
          this.SetTextureHandleId,
        ),
        (this.Bit = !0);
      const s = this.Lit,
        e = this.Dit;
      (this.Mit = i),
        this.CheckSkillIconIsTexture(i)
          ? (e && this.HideAndClearSkillSprite(),
            (this.SetTextureHandleId =
              ResourceSystem_1.ResourceSystem.LoadAsync(
                i,
                UE.Texture,
                (t) => {
                  (this.Bit = !1),
                    s &&
                      this.Mit === i &&
                      (t
                        ? this.ShowAndSetSkillTexture(t)
                        : this.HideAndClearSkillTexture());
                },
                103,
              )),
            (this.Mit = i),
            this.Bit && s.SetUIActive(!1))
          : (this.HideAndClearSkillTexture(),
            (this.SetTextureHandleId =
              ResourceSystem_1.ResourceSystem.LoadAsync(
                i,
                UE.LGUISpriteData_BaseObject,
                (t) => {
                  (this.Bit = !1),
                    e &&
                      this.Mit === i &&
                      (t
                        ? this.ShowAndSetSkillSprite(t)
                        : this.HideAndClearSkillSprite());
                },
                103,
              )),
            this.Bit && e.SetUIActive(!1));
    }
  }
  CheckSkillIconIsTexture(t) {
    return 0 < t.search("Image/");
  }
  HideAndClearSkillTexture() {
    this.Lit &&
      (this.xit ||
        (this.Lit.SetTexture(this.Ait),
        this.Rit?.SetAllStateTexture(this.Ait),
        (this.xit = !0)),
      this.Lit.SetUIActive(!1));
  }
  ShowAndSetSkillTexture(t) {
    this.Lit.SetTexture(t),
      this.Rit?.SetAllStateTexture(t),
      (this.xit = !1),
      this.Lit.SetUIActive(!0);
  }
  HideAndClearSkillSprite() {
    this.Dit &&
      (this.wit ||
        (this.Dit.SetSprite(this.Pit),
        this.Uit?.SetAllTransitionSprite(this.Pit),
        (this.wit = !0)),
      this.Dit.SetUIActive(!1));
  }
  ShowAndSetSkillSprite(t) {
    this.Dit.SetSprite(t),
      this.Uit?.SetAllTransitionSprite(t),
      (this.wit = !1),
      this.Dit.SetUIActive(!0);
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
            ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.Nit, i),
              this.Nit.SetUIActive(!0))
            : this.Nit.SetUIActive(!1)
          : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.Nit, t),
            this.Nit.SetUIActive(!0)))
      : this.Nit.SetUIActive(!1);
  }
  SetSkillItemEnable(t, i = !1) {
    this.ait &&
      (i || this.ait.GetSelfInteractive() !== t) &&
      this.ait.SetSelfInteractive(t);
  }
  RefreshKey() {
    var t,
      i = Info_1.Info.OperationType;
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
      ? (TimerSystem_1.TimerSystem.Has(this.hit) &&
          !TimerSystem_1.TimerSystem.IsPause(this.hit) &&
          TimerSystem_1.TimerSystem.Pause(this.hit),
        TimerSystem_1.TimerSystem.Has(this.yit) &&
          !TimerSystem_1.TimerSystem.IsPause(this.yit) &&
          TimerSystem_1.TimerSystem.Pause(this.yit))
      : 0 === t &&
        (TimerSystem_1.TimerSystem.Has(this.hit) &&
          TimerSystem_1.TimerSystem.IsPause(this.hit) &&
          TimerSystem_1.TimerSystem.Resume(this.hit),
        TimerSystem_1.TimerSystem.Has(this.yit)) &&
        TimerSystem_1.TimerSystem.IsPause(this.yit) &&
        TimerSystem_1.TimerSystem.Resume(this.yit);
  }
  RefreshSkillCoolDownOnShow() {
    this.cit <= 0 || this.mit <= 0 || !this.uit || this.RefreshSkillCoolDown();
  }
  RefreshSkillCoolDown() {
    this.SkillButtonData &&
      ((this.Kit() && this.Qit()) ||
        (this.Xit() && this.$it()) ||
        (this.SkillButtonData.IsMultiStageSkill() &&
          this.TryRefreshMultiSkillCoolDown()) ||
        (this.RefreshLimitCount(), this.Yit()),
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
        ? this.Jit(t, i)
        : this.Jit(s.RemainingStopTime, s.StopTime - i, !0),
      0)
    );
  }
  Yit() {
    var t,
      i = this.SkillButtonData.GetGroupSkillCdInfo();
    i && ((t = i.CurRemainingCd), (i = i.CurMaxCd), this.Jit(t, i));
  }
  Jit(t, i, s = !1) {
    (this.bit = s),
      0 < t && 0 < i
        ? this.SkillButtonData.IsCdVisible()
          ? this.Zit(t, i)
          : this.eot(t)
        : this.FinishSkillCoolDown();
  }
  Zit(t, i, s) {
    const e = this.SkillButtonData?.GetSkillId();
    this.HasListenAttribute() && this.tot(!0, void 0, !0),
      this.iot(t, i, () => {
        this.SkillButtonData.IsMultiStageSkill() &&
          this.TryRefreshMultiSkillCoolDown();
        var t = e === this.SkillButtonData?.GetSkillId();
        this.SkillButtonData.RefreshIsEnable(),
          this.HasListenAttribute()
            ? (this.oot(!1), this.tot(t, void 0, !1))
            : t && this.rot(),
          s?.();
      });
  }
  eot(t) {
    this.ResetSkillCoolDown();
    (this.yit = TimerSystem_1.TimerSystem.Delay(() => {
      this.SkillButtonData.RefreshIsEnable(), this.FinishSkillCoolDown();
    }, t * TimeUtil_1.TimeUtil.InverseMillisecond)),
      this.not(this.yit);
  }
  rot() {
    var t;
    !this.SkillButtonData ||
      this.SkillButtonData.GetCdCompletedEffectId() < 0 ||
      (0 !== this.qit &&
        ((t = this.GetUiNiagara(6)).bIsUIActive || t.SetUIActive(!0),
        t.ActivateSystem(!0)));
  }
  iot(t, i, s) {
    this.sot(),
      t <= (this.cit = 0)
        ? this.lit.SetUIActive(!1)
        : ((this.cit = t),
          (this.mit = i),
          (this.dit = Time_1.Time.WorldTimeSeconds - (i - t)),
          (this.OnCoolDownFinishedCallback = s),
          this.bit
            ? this._it.SetText("")
            : this._it.SetText(this.cit.toFixed(1)),
          (this.hit = TimerSystem_1.TimerSystem.Forever(
            this.kit,
            BattleUiDefine_1.SKILL_COOLDOWN_INTERVAL,
          )),
          this.not(this.hit),
          this.lit.SetUIActive(!0));
  }
  FinishSkillCoolDown() {
    var t;
    this.ResetSkillCoolDown(),
      this.OnCoolDownFinishedCallback &&
        ((t = this.OnCoolDownFinishedCallback),
        (this.OnCoolDownFinishedCallback = void 0),
        t());
  }
  Wit(t) {
    this.cit <= 0 ||
      this.mit <= 0 ||
      !this.uit ||
      (SkillCdController_1.SkillCdController.IsPause()
        ? (this.dit +=
            t * Time_1.Time.TimeDilation * TimeUtil_1.TimeUtil.Millisecond)
        : ((t = (Time_1.Time.WorldTimeSeconds - this.dit) / this.mit),
          this.uit.SetFillAmount(t)));
  }
  ResetSkillCoolDown() {
    this.lit.SetUIActive(!1), this.sot(), (this.cit = 0);
  }
  sot() {
    this.SkillButtonData &&
      (TimerSystem_1.TimerSystem.Has(this.hit) &&
        TimerSystem_1.TimerSystem.Remove(this.hit),
      TimerSystem_1.TimerSystem.Has(this.yit)) &&
      TimerSystem_1.TimerSystem.Remove(this.yit);
  }
  RefreshEnable(t = !1) {
    var i;
    this.SkillButtonData && ((i = this.aot()), this.SetSkillItemEnable(i, t));
  }
  DisableButton() {
    this.SetSkillItemEnable(!1, !0);
  }
  RefreshVisible() {
    var t;
    this.RootItem?.IsValid() &&
      ((t = this.IsVisible()) !== this.RootItem.bIsUIActive ||
        (this.sit && t !== this.sit.bIsUIActive)) &&
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
          (!StringUtils_1.StringUtils.IsEmpty(this.pit) && this.pit === t) ||
          (this.CancelLoadCdCompletedNiagara(),
          (this.Tit = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.NiagaraSystem,
            (t) => {
              t?.IsValid() && this.GetUiNiagara(6)?.SetNiagaraSystem(t);
            },
          )),
          (this.pit = t))));
  }
  CancelLoadCdCompletedNiagara() {
    this.Tit &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Tit),
      (this.Tit = void 0));
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
    this.Ktt &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ktt),
      (this.Ktt = void 0));
  }
  RefreshDynamicEffect() {
    var t = this.GetDynamicEffectConfig();
    let i = void 0,
      s = 0;
    t && ((i = this.GetDynamicEffectPath(t)), (s = t.ElementId)),
      this.jtt === i
        ? this.vit !== s &&
          ((this.vit = s), 0 < this.vit) &&
          ((t = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
            this.vit,
          )),
          (t = new UE.LinearColor(UE.Color.FromHex(t.SkillEffectColor))),
          this.GetUiNiagara(7).SetNiagaraVarLinearColor("Color", t))
        : ((this.jtt = i),
          this.jtt
            ? this.jtt === this.Wtt && this.vit === s
              ? this.SetDynamicEffectVisible(!0)
              : ((this.Wtt = this.jtt),
                (this.vit = s),
                this.CancelLoadDynamicEffectNiagara(),
                (this.Ktt = ResourceSystem_1.ResourceSystem.LoadAsync(
                  this.Wtt,
                  UE.NiagaraSystem,
                  (t) => {
                    var i;
                    t?.IsValid() &&
                      (i = this.GetUiNiagara(7)) &&
                      (i.SetNiagaraSystem(t),
                      0 < this.vit &&
                        ((t =
                          ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
                            this.vit,
                          )),
                        (t = new UE.LinearColor(
                          UE.Color.FromHex(t.SkillEffectColor),
                        )),
                        i.SetNiagaraVarLinearColor("Color", t)),
                      this.Wtt === this.jtt) &&
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
    this.hot(this.lot());
  }
  lot() {
    return SkillCdController_1.SkillCdController.IsPause()
      ? 0
      : Time_1.Time.TimeDilation;
  }
  not(t) {
    var i = this.lot();
    1 !== i &&
      (0 < i
        ? TimerSystem_1.TimerSystem.ChangeDilation(t, i)
        : TimerSystem_1.TimerSystem.Pause(t));
  }
  hot(t) {
    TimerSystem_1.TimerSystem.Has(this.hit) &&
      (0 < t
        ? (TimerSystem_1.TimerSystem.IsPause(this.hit) &&
            TimerSystem_1.TimerSystem.Resume(this.hit),
          TimerSystem_1.TimerSystem.ChangeDilation(this.hit, t))
        : TimerSystem_1.TimerSystem.IsPause(this.hit) ||
          TimerSystem_1.TimerSystem.Pause(this.hit)),
      TimerSystem_1.TimerSystem.Has(this.yit) &&
        (0 < t
          ? (TimerSystem_1.TimerSystem.IsPause(this.yit) &&
              TimerSystem_1.TimerSystem.Resume(this.yit),
            TimerSystem_1.TimerSystem.ChangeDilation(this.yit, t))
          : TimerSystem_1.TimerSystem.IsPause(this.yit) ||
            TimerSystem_1.TimerSystem.Pause(this.yit));
  }
  Vit() {
    this.git &&
      TimerSystem_1.TimerSystem.Has(this.git) &&
      (TimerSystem_1.TimerSystem.Remove(this.git), (this.git = void 0));
  }
  Fit() {
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
    s !== i && (this._ot(i), s) && this.uot(),
      i && (this.RefreshFrameSprite(), this.cot(), this.mot(), this.oot(t)),
      this.RefreshEnable();
  }
  _ot(t) {
    (this.UltraComponent || t) && this.GetUltraComponent.SetComponentActive(t);
  }
  RefreshFrameSprite() {
    var t;
    this.HasListenAttribute() &&
      ((t = this.SkillButtonData.GetFrameSpriteColor()),
      this.GetUltraComponent.SetFrameSprite(t));
  }
  oot(t = !0) {
    var i = this.SkillButtonData.GetAttribute(),
      s = this.SkillButtonData.GetMaxAttribute();
    0 === s
      ? (this.SetEnergyPercent(1, t), this.tot(t, !1, void 0))
      : (this.SetEnergyPercent(i / s, t), this.tot(t, i < s, void 0));
  }
  tot(t, i, s) {
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
    this.SetMaxEnergyEffectEnable(s), t && this.dot(s);
  }
  Kit() {
    return (
      7 === this.SkillButtonData?.GetButtonType() &&
      this.SkillButtonData.IsSkillInItemUseBuffCd()
    );
  }
  Qit() {
    var [t, i] = this.SkillButtonData.GetEquippedItemUsingBuffCd();
    return (
      0 < t &&
      (this.Zit(t, i, () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
        ),
          this.RefreshEnable();
      }),
      !0)
    );
  }
  Xit() {
    return (
      7 === this.SkillButtonData?.GetButtonType() &&
      this.SkillButtonData.IsSkillInItemUseSkillCd()
    );
  }
  $it() {
    var [t, i] = this.SkillButtonData.GetEquippedItemUsingSkillCd();
    return (
      0 < t &&
      (this.Zit(t, i, () => {
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
        this.jit(),
        (this.Iit = TimerSystem_1.TimerSystem.Delay(() => {
          (this.Iit = void 0), t.SetUIActive(!1);
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
  jit() {
    this.Iit &&
      (TimerSystem_1.TimerSystem.Remove(this.Iit), (this.Iit = void 0));
  }
  SetMaxEnergyEffectEnable(t) {
    this.GetUltraComponent.SetUltraEffectEnable(t);
  }
  Cot(t) {}
  got(t) {
    this.GetUltraComponent.SetUltraUpEffectEnable(t);
  }
  SetEnergyPercent(t, i) {
    this.GetUltraComponent.SetBarPercent(t, i);
  }
  dot(t) {
    this.Cit !== t && ((this.Cit = t) ? this.fot() : this.uot());
  }
  fot() {
    this.Cot(!0);
  }
  uot() {
    this.UltraComponent &&
      (this.Cot(!1), this.SetMaxEnergyEffectEnable(!1), this.got(!1));
  }
  cot() {
    var t;
    this.HasListenAttribute() &&
      ((t = this.SkillButtonData.GetMaxAttributeEffectPath()),
      StringUtils_1.StringUtils.IsEmpty(t) ||
        this.GetUltraComponent.RefreshUltraEffect(
          t,
          this.SkillButtonData.GetMaxAttributeColor(),
        ));
  }
  mot() {
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
  aot() {
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
    return this.Eit;
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
    t ? ((this.qit = this.Git), (s = !0)) : (this.qit = 0),
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
            (t.to = this.qit),
            this.AlphaTweenComp.Play())
          : (this.AlphaTweenComp && this.AlphaTweenComp.Stop(),
            this.RootItem.SetAlpha(this.qit)));
  }
}
(exports.BattleSkillItem = BattleSkillItem).zit = void 0;
//# sourceMappingURL=BattleSkillItem.js.map
