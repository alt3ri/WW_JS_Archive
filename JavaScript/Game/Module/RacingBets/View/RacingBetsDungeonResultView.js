"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDungeonResultView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsLegMatchResultItem_1 = require("./Item/RacingBetsLegMatchResultItem");
class RacingBetsDungeonResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.wvc = void 0),
      (this.uat = void 0),
      (this.Rvc = () =>
        new RacingBetsLegMatchResultItem_1.RacingBetsLegMatchResultItem()),
      (this.lyt = (e) => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.lyt]]);
  }
  async OnBeforeStartAsync() {
    var [e, t] = this.OpenParam,
      t =
        ((this.uat = t),
        (this.wvc = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.Rvc,
        )),
        e.GetLegMatchResultList());
    this.GetText(0).ShowTextNew(e.Name), await this.wvc.RefreshByDataAsync(t);
  }
  OnStart() {
    this.GetVerticalLayout(1)
      .GetOwner()
      .GetComponentByClass(UE.UIInturnAnimController.StaticClass())
      ?.Play();
  }
  OnBeforeDestroy() {
    this.uat.SetResult(void 0);
  }
}
exports.RacingBetsDungeonResultView = RacingBetsDungeonResultView;
//# sourceMappingURL=RacingBetsDungeonResultView.js.map
