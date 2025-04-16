"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapSummaryGridEffectTabView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  HelpController_1 = require("../../Help/HelpController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleMapGridEffectItem_1 = require("../Component/RogueBattleMapGridEffectItem"),
  MORE_HELPID = 260;
class RogueBattleMapSummaryGridEffectTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.tS1 = () => {
        this.GetItem(2)?.SetUIActive(!0),
          this.GetItem(5)?.SetUIActive(!1),
          this.GetExtendToggle(1)?.SetToggleState(0, !1);
        var e = ModelManager_1.ModelManager.RogueBattleModel.GetEffectList(),
          e =
            (this.eGe?.RefreshByData(e, void 0, !0),
            ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv),
          e = 10 < e ? e.toString() : "0" + e;
        this.GetArtText(3).SetText(e);
      }),
      (this.iS1 = () => {
        HelpController_1.HelpController.OpenHelpById(MORE_HELPID);
      }),
      (this.sGe = () =>
        new RogueBattleMapGridEffectItem_1.RogueBattleMapGridEffectTabItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIArtText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIArtText],
      [7, UE.UIVerticalLayout],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.tS1],
        [4, this.iS1],
      ]);
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(7),
      this.sGe,
    )),
      this.GetExtendToggle(1)?.RootUIComp.SetUIActive(!1);
  }
  OnBeforeShow() {
    this.GetExtendToggle(0)?.SetToggleState(1, !0), this.tS1();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  OnBeforeDestroy() {
    this.eGe = void 0;
  }
}
exports.RogueBattleMapSummaryGridEffectTabView =
  RogueBattleMapSummaryGridEffectTabView;
//# sourceMappingURL=RogueBattleMapSummaryGridEffectTabView.js.map
