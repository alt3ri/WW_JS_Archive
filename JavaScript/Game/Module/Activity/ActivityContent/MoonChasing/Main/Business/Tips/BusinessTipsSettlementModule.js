"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsSettlementModule = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  CharacterItemWithAdd_1 = require("../Common/Character/CharacterItemWithAdd"),
  CharacterListModule_1 = require("../Common/Character/CharacterListModule"),
  TWEEN_TIME = 1,
  VALUE_TIME = 0.5;
class BusinessTipsSettlementModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.CharacterListModule = void 0),
      (this.ExpTweener = void 0),
      (this.Delegate = void 0),
      (this.ValueDelegate = void 0),
      (this.Mke = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTipsFinishView();
      }),
      (this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd()),
      (this.OAn = (t) => {
        for (const e of this.CharacterListModule.GetItemList())
          e.RefreshProgressAdd(t),
            1 === t && (e.RefreshProgress(t), e.SetLightProgressWidth());
      }),
      (this.Zga = (t) => {
        for (const e of this.CharacterListModule.GetItemList())
          e.RefreshCurrentValue(t);
      }),
      (this.baa = () => {
        this.S0a(), this.E0a();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.Mke]]);
  }
  async PAr() {
    (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
      this.i2e,
    )),
      await this.CharacterListModule.CreateThenShowByActorAsync(
        this.GetItem(3).GetOwner(),
      );
    var t =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().GetResultCharacterList();
    await this.CharacterListModule.RefreshByDataAsync(t);
  }
  async OnBeforeStartAsync() {
    (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)),
      (this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.Zga)),
      await this.PAr();
  }
  OnBeforeShow() {
    var t =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    t.IsInvestSuccess
      ? (this.GetText(1)?.SetText(t.Ratio + "%"),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Moonfiesta_EventSuccess",
        ))
      : (this.GetText(1)?.SetText("100%"),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Moonfiesta_EventFail",
        ));
  }
  OnBeforeDestroy() {
    this.Delegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.OAn),
      (this.Delegate = void 0)),
      this.ValueDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.Zga),
        (this.ValueDelegate = void 0)),
      this.gzi();
  }
  gzi() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  M0a() {
    for (const t of this.CharacterListModule.GetItemList())
      t.SetLightProgressWidth(), t.PlayAddAction(), t.RefreshAddText();
    (this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
      GlobalData_1.GlobalData.World,
      this.Delegate,
      0,
      1,
      TWEEN_TIME,
    )),
      this.ExpTweener?.OnCompleteCallBack.Bind(this.baa),
      AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_1s");
  }
  S0a() {
    for (const t of this.CharacterListModule.GetItemList()) t.PlayEndAction();
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
  StartCharacterAnim() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData().UseInvestProperData(),
      this.M0a();
  }
}
exports.BusinessTipsSettlementModule = BusinessTipsSettlementModule;
//# sourceMappingURL=BusinessTipsSettlementModule.js.map
