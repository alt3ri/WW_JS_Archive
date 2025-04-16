"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleElementPanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleElementTipPanel_1 = require("./RogueBattleElementTipPanel"),
  RogueBattleTokenElementWithCount_1 = require("./RogueBattleTokenElementWithCount");
class RogueBattleElementPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TipPanel = void 0),
      (this.ElementLayout = void 0),
      (this.fVc = (e) => {
        switch (e) {
          case 1:
            this.TipPanel?.SetActive(!0);
            break;
          case 0:
            this.TipPanel?.SetActive(!1);
        }
      }),
      (this.jli = () => {
        return new RogueBattleTokenElementWithCount_1.RogueBattleTokenElementWithCount();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [5, this.fVc],
        [0, this.fVc],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.TipPanel =
      new RogueBattleElementTipPanel_1.RogueBattleElementTipPanel()),
      (this.ElementLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.jli,
      ));
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetTotalElementInfo(),
      t = ModelManager_1.ModelManager.RogueBattleModel?.GetTotalElementCount();
    this.GetText(1).SetText("" + t),
      await Promise.all([
        this.ElementLayout.RefreshByDataAsync(e),
        this.TipPanel.CreateByActorAsync(this.GetItem(4).GetOwner()),
      ]);
  }
  UpdateElementLayout(e = []) {
    const t =
      ModelManager_1.ModelManager.RogueBattleModel.GetTotalElementInfo(e);
    var e = new UiAsyncTask_1.UiAsyncTask(
        "RogueBattleElementPanel.UpdateElementLayout",
        async () => {
          await this.ElementLayout.RefreshByDataAsync(t);
        },
      ),
      a = ModelManager_1.ModelManager.RogueBattleModel?.GetTotalElementCount();
    this.GetText(1).SetText("" + a), this.RunAsyncTask(e);
  }
}
exports.RogueBattleElementPanel = RogueBattleElementPanel;
//# sourceMappingURL=RogueBattleElementPanel.js.map
