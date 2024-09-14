"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsTravelView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  BusinessDefine_1 = require("../BusinessDefine"),
  CharacterItemWithAdd_1 = require("../Common/Character/CharacterItemWithAdd"),
  CharacterListModule_1 = require("../Common/Character/CharacterListModule"),
  BusinessTravelRoleItem_1 = require("./BusinessTravelRoleItem"),
  TWEEN_TIME = 1,
  VALUE_TIME = 0.5,
  RUN_TIME = 2e3,
  LAST_SHOW = 2e3,
  NORMAL_SHOW = 1e3,
  SKIP_RESULT_DELAY = 800;
class BusinessTipsTravelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CharacterListModule = void 0),
      (this.RoleLayout = void 0),
      (this.RoleIdList = []),
      (this.DelegateId = 0),
      (this.ShowIndex = -1),
      (this.e2e = []),
      (this.ExpTweener = void 0),
      (this.Delegate = void 0),
      (this.ValueDelegate = void 0),
      (this.SkipAnimDelayTimerHandle = void 0),
      (this.RunTimerHandle = void 0),
      (this.IsLastFinishShow = !1),
      (this.IsInResult = !1),
      (this.SkipResultTimeHandle = void 0),
      (this.TimerHandle = void 0),
      (this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd()),
      (this.nFe = () => new BusinessTravelRoleItem_1.BusinessTravelRoleItem()),
      (this.OAn = (i) => {
        for (const t of this.CharacterListModule.GetItemList())
          t.RefreshProgressAdd(i),
            1 === i && (t.RefreshProgress(i), t.SetLightProgressWidth());
      }),
      (this.Kpa = (i) => {
        for (const t of this.CharacterListModule.GetItemList())
          t.RefreshCurrentValue(i);
      }),
      (this.ufa = () => {
        (this.RunTimerHandle = void 0),
          this.$pa(),
          this.Xpa(),
          (this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
            GlobalData_1.GlobalData.World,
            this.Delegate,
            0,
            1,
            TWEEN_TIME,
          )),
          this.ExpTweener?.OnCompleteCallBack.Bind(this.Fwa),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_1s");
      }),
      (this.Fwa = () => {
        this.q1a(!1);
      }),
      (this.t2e = () => {
        if (this.IsLastFinishShow) this.GAn(), this.Dsa();
        else if (this.IsInResult) {
          this.Vwa();
          const i = this.GAn();
          if (i) {
            if (this.SNn()) return void this.zpa();
            this.Zpa(), this.ShowAddCharacter();
          } else this.ExpTweener?.Kill(), this.q1a(!0);
        } else {
          const i = this.vfa();
          i && this.ufa();
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UILayoutBase],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.t2e]]);
  }
  async PAr() {
    (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
      this.i2e,
    )),
      await this.CharacterListModule.CreateByActorAsync(
        this.GetItem(1).GetOwner(),
      );
  }
  async V1a() {
    var i = this.OpenParam,
      t = i.RoleList,
      e =
        ((this.DelegateId = i.DelegateId),
        (this.RoleLayout = new GenericLayout_1.GenericLayout(
          this.GetLayoutBase(3),
          this.nFe,
          this.GetItem(4).GetOwner(),
        )),
        await this.RoleLayout.RefreshByDataAsync(t),
        []);
    for (const s of this.RoleLayout.GetLayoutItemList())
      e.push(s.RefreshAsync());
    await Promise.all(e);
  }
  async mJs() {
    await this.V1a();
  }
  async OnBeforeStartAsync() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      this.GetLayoutBase(3)?.RootUIComp.SetUIActive(!1),
      (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)),
      (this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.Kpa)),
      await Promise.all([this.PAr(), this.mJs()]);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.n2e();
  }
  OnAfterPlayStartSequence() {
    this.ShowAddCharacter();
  }
  OnBeforeDestroy() {
    this.GAn(),
      this.Delegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.OAn),
        (this.Delegate = void 0)),
      this.ValueDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.Kpa),
        (this.ValueDelegate = void 0)),
      this.gzi(),
      this.pfa(),
      this.vfa(),
      this.Hwa();
  }
  ShowAddCharacter() {
    if (!this.SNn()) {
      this.ShowIndex++;
      var i =
          ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
        t =
          ((this.RoleIdList = i.GetRoleIdList()),
          this.RoleIdList[this.ShowIndex]),
        e = i.GetRoleResultDataById(t);
      for (let i = 0; i < BusinessDefine_1.CHARACTER_MAX; ++i) {
        var s = this.e2e[i].CurrentValue + e.CharacterValueList[i];
        this.e2e[i].SetCurrentValue(s);
      }
      this.Kva(), this.Xva(), this.Mfa(), this.Sfa();
    }
  }
  async n2e() {
    this.e2e =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCharacterValueListByRoleIds(
        [],
        !0,
      );
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.DelegateId,
    );
    for (const t of this.e2e) t.SetMaxValue(i.AttributeMaxValue);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "Moonfiesta_PartnerTip3",
    ),
      this.GetLayoutBase(3)?.RootUIComp.SetUIActive(!0),
      await this.CharacterListModule.RefreshByDataAsync(this.e2e),
      this.CharacterListModule?.SetActive(!0);
  }
  gzi() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  Kva() {
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.PlayStartAction();
  }
  Xva() {
    for (const i of this.CharacterListModule.GetItemList()) i.PlayStartAction();
  }
  $pa() {
    var i = this.RoleLayout.GetLayoutItemByKey(this.ShowIndex),
      t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      e = i.GetRoleId(),
      t = t.GetRoleResultDataById(e),
      e = this.OpenParam.LastLevelList;
    i?.PlayRunFinishAction(t.SuccessResult, e[this.ShowIndex]), this.jwa();
  }
  Vwa() {
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.StopRunToLastFrame();
  }
  Xpa() {
    for (const i of this.CharacterListModule.GetItemList())
      i.PlayAddAction(), i.RefreshAddText();
  }
  Zpa() {
    (this.IsInResult = !1),
      this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.PlayEndAction();
  }
  Ypa() {
    for (const i of this.CharacterListModule.GetItemList()) i.PlayEndAction();
  }
  SNn() {
    var i =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().GetRoleIdList();
    return this.ShowIndex >= i.length - 1;
  }
  Dsa() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().SetResultCharacterList(
        this.e2e,
      ),
      ControllerHolder_1.ControllerHolder.MoonChasingController.TipsTravelSkipToNextStep();
  }
  Mfa() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetSkipAnimDelayTime();
    this.SkipAnimDelayTimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.GetButton(2)?.RootUIComp.SetUIActive(!0),
        (this.SkipAnimDelayTimerHandle = void 0);
    }, i);
  }
  pfa() {
    this.SkipAnimDelayTimerHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.SkipAnimDelayTimerHandle),
      (this.SkipAnimDelayTimerHandle = void 0));
  }
  Sfa() {
    this.RunTimerHandle = TimerSystem_1.TimerSystem.Delay(this.ufa, RUN_TIME);
  }
  vfa() {
    return !(
      !this.RunTimerHandle ||
      (TimerSystem_1.TimerSystem.Remove(this.RunTimerHandle),
      (this.RunTimerHandle = void 0))
    );
  }
  jwa() {
    this.SkipResultTimeHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.Hwa(), (this.IsInResult = !0);
    }, SKIP_RESULT_DELAY);
  }
  Hwa() {
    return !(
      !this.SkipResultTimeHandle ||
      (TimerSystem_1.TimerSystem.Remove(this.SkipResultTimeHandle),
      (this.SkipResultTimeHandle = void 0))
    );
  }
  Jpa() {
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
      GlobalData_1.GlobalData.World,
      this.ValueDelegate,
      0,
      1,
      VALUE_TIME,
    );
  }
  q1a(i) {
    this.Ypa(),
      this.Jpa(),
      this.GAn(),
      i
        ? this.SNn()
          ? this.zpa()
          : (this.Zpa(), this.ShowAddCharacter())
        : (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
            (this.TimerHandle = void 0),
              this.SNn() ? this.zpa() : (this.Zpa(), this.ShowAddCharacter());
          }, NORMAL_SHOW));
  }
  zpa() {
    (this.IsLastFinishShow = !0),
      (this.IsInResult = !1),
      (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
        (this.TimerHandle = void 0), this.Dsa();
      }, LAST_SHOW));
  }
  GAn() {
    return !(
      !this.TimerHandle ||
      (TimerSystem_1.TimerSystem.Remove(this.TimerHandle),
      (this.TimerHandle = void 0))
    );
  }
}
exports.BusinessTipsTravelView = BusinessTipsTravelView;
//# sourceMappingURL=BusinessTipsTravelView.js.map
