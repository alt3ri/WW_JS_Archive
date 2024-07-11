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
  NORMAL_SHOW = 1e3;
class BusinessTipsTravelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CharacterListModule = void 0),
      (this.RoleLayout = void 0),
      (this.RoleIdList = []),
      (this.ShowIndex = -1),
      (this.e2e = []),
      (this.ExpTweener = void 0),
      (this.Delegate = void 0),
      (this.ValueDelegate = void 0),
      (this.SkipAnimDelayTimerHandle = void 0),
      (this.RunTimerHandle = void 0),
      (this.IsLastFinishShow = !1),
      (this.TimerHandle = void 0),
      (this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd()),
      (this.nFe = () => new BusinessTravelRoleItem_1.BusinessTravelRoleItem()),
      (this.OAn = (i) => {
        for (const t of this.CharacterListModule.GetItemList())
          t.RefreshProgressAdd(i),
            1 === i && (t.RefreshProgress(i), t.SetLightProgressWidth());
      }),
      (this.Zga = (i) => {
        for (const t of this.CharacterListModule.GetItemList())
          t.RefreshCurrentValue(i);
      }),
      (this.wma = () => {
        (this.RunTimerHandle = void 0),
          this.p0a(),
          this.M0a(),
          (this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
            GlobalData_1.GlobalData.World,
            this.Delegate,
            0,
            1,
            TWEEN_TIME,
          )),
          this.ExpTweener?.OnCompleteCallBack.Bind(this.baa),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_1s");
      }),
      (this.baa = () => {
        this.S0a(),
          this.E0a(),
          this.GAn(),
          (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
            (this.TimerHandle = void 0),
              this.cNn()
                ? ((this.IsLastFinishShow = !0), this.y0a())
                : (this.I0a(), this.ShowAddCharacter());
          }, NORMAL_SHOW));
      }),
      (this.t2e = () => {
        this.IsLastFinishShow
          ? (this.GAn(), this.jra())
          : this.xma() && this.wma();
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
  async Faa() {
    var i = this.OpenParam.RoleList,
      t =
        ((this.RoleLayout = new GenericLayout_1.GenericLayout(
          this.GetLayoutBase(3),
          this.nFe,
          this.GetItem(4).GetOwner(),
        )),
        await this.RoleLayout.RefreshByDataAsync(i),
        []);
    for (const e of this.RoleLayout.GetLayoutItemList())
      t.push(e.RefreshAsync());
    await Promise.all(t);
  }
  async MXs() {
    await this.Faa();
  }
  async OnBeforeStartAsync() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      this.GetLayoutBase(3)?.RootUIComp.SetUIActive(!1),
      (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)),
      (this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.Zga)),
      await Promise.all([this.PAr(), this.MXs()]);
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
        ((0, puerts_1.releaseManualReleaseDelegate)(this.Zga),
        (this.ValueDelegate = void 0)),
      this.gzi(),
      this.bma(),
      this.xma();
  }
  ShowAddCharacter() {
    if (!this.cNn()) {
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
      this.T0a(), this.L0a(), this.Bma(), this.qma();
    }
  }
  async n2e() {
    this.e2e =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCharacterValueListByRoleIds(
        [],
        !0,
      );
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustScoreMax();
    for (const t of this.e2e) t.SetMaxValue(i);
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
  T0a() {
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.PlayStartAction();
  }
  L0a() {
    for (const i of this.CharacterListModule.GetItemList()) i.PlayStartAction();
  }
  p0a() {
    var i = this.RoleLayout.GetLayoutItemByKey(this.ShowIndex),
      t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      e = i.GetRoleId(),
      t = t.GetRoleResultDataById(e),
      e = this.OpenParam.LastLevelList;
    i?.PlayRunFinishAction(t.SuccessResult, e[this.ShowIndex]);
  }
  M0a() {
    for (const i of this.CharacterListModule.GetItemList())
      i.PlayAddAction(), i.RefreshAddText();
  }
  I0a() {
    this.RoleLayout.GetLayoutItemByKey(this.ShowIndex)?.PlayEndAction();
  }
  S0a() {
    for (const i of this.CharacterListModule.GetItemList()) i.PlayEndAction();
  }
  cNn() {
    var i =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().GetRoleIdList();
    return this.ShowIndex >= i.length - 1;
  }
  jra() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().SetResultCharacterList(
        this.e2e,
      ),
      ControllerHolder_1.ControllerHolder.MoonChasingController.TipsTravelSkipToNextStep();
  }
  Bma() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetSkipAnimDelayTime();
    this.SkipAnimDelayTimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.GetButton(2)?.RootUIComp.SetUIActive(!0),
        (this.SkipAnimDelayTimerHandle = void 0);
    }, i);
  }
  bma() {
    this.SkipAnimDelayTimerHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.SkipAnimDelayTimerHandle),
      (this.SkipAnimDelayTimerHandle = void 0));
  }
  qma() {
    this.RunTimerHandle = TimerSystem_1.TimerSystem.Delay(this.wma, RUN_TIME);
  }
  xma() {
    return !(
      !this.RunTimerHandle ||
      (TimerSystem_1.TimerSystem.Remove(this.RunTimerHandle),
      (this.RunTimerHandle = void 0))
    );
  }
  E0a() {
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
      GlobalData_1.GlobalData.World,
      this.ValueDelegate,
      0,
      1,
      VALUE_TIME,
    );
  }
  y0a() {
    this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
      (this.TimerHandle = void 0), this.jra();
    }, LAST_SHOW);
  }
  GAn() {
    this.TimerHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.TimerHandle),
      (this.TimerHandle = void 0));
  }
}
exports.BusinessTipsTravelView = BusinessTipsTravelView;
//# sourceMappingURL=BusinessTipsTravelView.js.map
