"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepPlayerReChoosePanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalUtils_1 = require("../../CiacconaGalUtils");
class CiacconaGalReChoosePlainTextItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
class CiacconaGalReChooseChoiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.eTt = void 0),
      (this.mRo = !1),
      (this.LM1 = void 0),
      (this.ZDc = () => {
        this.eTt && this.mRo && this.eTt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIExtendToggleTextureTransition],
    ]),
      (this.BtnBindInfo = [[0, this.ZDc]]);
  }
  OnBeforeDestroy() {
    this.jb1();
  }
  Refresh(e) {
    this.Hb1(),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Text),
      this.GetExtendToggle(0)?.SetToggleState(e.TogState),
      (this.eTt = e.OnClick),
      this.ehi(e.IconResId);
  }
  Clear() {
    this.jb1();
  }
  SetInteractive(e) {
    this.GetExtendToggle(0)?.SetSelfInteractive(e);
  }
  Hb1() {
    this.mRo = !1;
    var e =
      CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() *
      TimeUtil_1.TimeUtil.InverseMillisecond;
    this.LM1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.mRo = !0;
    }, e);
  }
  jb1() {
    this.LM1 &&
      TimerSystem_1.TimerSystem.Has(this.LM1) &&
      (TimerSystem_1.TimerSystem.Remove(this.LM1), (this.LM1 = void 0));
  }
  async ehi(e) {
    var i = this.GetUiExtendToggleTextureTransition(2);
    await this.SetExtendToggleTextureTransitionByPath(
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e),
      i,
    );
  }
}
class CiacconaGalReChooseChoiceList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.bbc = () => new CiacconaGalReChooseChoiceItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.bbc,
    );
  }
  Refresh(e, i) {
    this.eGe.RefreshByData([
      {
        Text: CiacconaGalDefine_1.TEXT_CIACCONA_CHOICE_RESTART,
        TogState: 0,
        IconResId: "T_PlotReasoningIcon03",
        OnClick: e,
      },
      {
        Text: CiacconaGalDefine_1.TEXT_CIACCONA_CHOICE_RETURN,
        TogState: 0,
        IconResId: "T_PlotReasoningIcon05",
        OnClick: i,
      },
    ]);
  }
}
class CiacconaGalStepPlayerReChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eUc = void 0),
      (this.tUc = void 0),
      (this.iUc = void 0),
      (this.rUc = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [4, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.eUc = new CiacconaGalReChoosePlainTextItem()),
      (this.tUc = new CiacconaGalReChooseChoiceItem()),
      (this.iUc = new CiacconaGalReChoosePlainTextItem()),
      (this.rUc = new CiacconaGalReChooseChoiceList());
    var e = [
      this.eUc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      this.tUc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      this.iUc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      this.rUc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
    ];
    await Promise.all(e);
  }
  Refresh(e, i) {
    this.eUc.Refresh(e.Content),
      this.eUc.SetUiActive(!!e.Content),
      this.tUc.Refresh({
        Text: i.Content,
        TogState: 2,
        IconResId: "T_PlotReasoningIcon03",
      }),
      this.tUc.SetInteractive(!1),
      this.iUc.Refresh(CiacconaGalDefine_1.TEXT_CIACCONA_RECHOOSE_LABEL),
      this.rUc.Refresh(
        () => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCiacconaReChooseConfirm,
            e,
            i,
          );
        },
        () => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCiacconaReChooseCancel,
          );
        },
      );
  }
}
exports.CiacconaGalStepPlayerReChoosePanel = CiacconaGalStepPlayerReChoosePanel;
//# sourceMappingURL=CiacconaGalStepPlayerRechoosePanel.js.map
