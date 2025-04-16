"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattlePhantomSelectView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleElementPanel_1 = require("../Component/RogueBattleElementPanel"),
  RogueBattlePhantomItem_1 = require("../Component/RogueBattlePhantomItem"),
  RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattlePhantomSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.PhantomLayout = void 0),
      (this.ElementInfoPanel = void 0),
      (this.CaptionItem = void 0),
      (this.ilo = () => {
        var e = this.PhantomLayout?.GetSelectedGridIndex();
        (e && 0 < e) ||
          ControllerHolder_1.ControllerHolder.RogueBattleController.SelectTokenRequest(
            e,
          ).then(() => {
            this.CloseMe();
          });
      }),
      (this.CVc = () => {
        var e = new RogueBattlePhantomItem_1.RogueBattlePhantomItem();
        return (e.SelectCallBack = this.pVc), e;
      }),
      (this.pVc = (e) => {
        void 0 === e
          ? (this.PhantomLayout?.DeselectCurrentGridProxy(),
            this.GetButton(2).SetSelfInteractive(!1))
          : (this.GetButton(2).SetSelfInteractive(!0),
            this.PhantomLayout?.SelectGridProxy(e));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.ilo]]);
  }
  async OnBeforeStartAsync() {
    (this.PhantomLayout = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(1),
      this.CVc,
    )),
      (this.ElementInfoPanel =
        new RogueBattleElementPanel_1.RogueBattleElementPanel()),
      (this.CaptionItem = new RogueBattleTopPanel_1.RogueBattleTopPanel()),
      (this.CaptionItem.CloseCallback = () => {
        this.CloseMe();
      });
    var e = ModelManager_1.ModelManager.RogueBattleModel?.GetOptionDataById(
      this.OpenParam,
    );
    await Promise.all([
      this.PhantomLayout.RefreshByDataAsync(e.Dac),
      this.ElementInfoPanel.CreateThenShowByActorAsync(
        this.GetItem(3).GetOwner(),
      ),
      this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
    ]);
  }
}
exports.RogueBattlePhantomSelectView = RogueBattlePhantomSelectView;
//# sourceMappingURL=RogueBattlePhantomSelectView.js.map
