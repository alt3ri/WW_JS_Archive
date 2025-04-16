"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoSkillView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsDangoSkillItem_1 = require("./Item/RacingBetsDangoSkillItem");
class RacingBetsDangoSkillView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.uFc = void 0),
      (this.lyt = () => {
        this.CloseMe();
      }),
      (this.dFc = () =>
        new RacingBetsDangoSkillItem_1.RacingBetsDangoSkillItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.lyt],
        [3, this.lyt],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    void 0 !== e &&
      ((this.uFc = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.dFc,
      )),
      await this.uFc.RefreshByDataAsync(e));
  }
}
exports.RacingBetsDangoSkillView = RacingBetsDangoSkillView;
//# sourceMappingURL=RacingBetsDangoSkillView.js.map
