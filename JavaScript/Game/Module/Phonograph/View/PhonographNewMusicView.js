"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographNewMusicView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  PhonographNewMusicItem_1 = require("../Component/PhonographNewMusicItem");
class PhonographNewMusicView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.GenericLayout = void 0),
      (this.OnCreateItem = () =>
        new PhonographNewMusicItem_1.PhonographNewMusicItem()),
      (this.OnBtnMask = () => {
        UiManager_1.UiManager.OpenView("PhonographView", void 0, () => {
          this.CloseMe();
        });
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnBtnMask]]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    (this.GenericLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.OnCreateItem,
    )),
      await this.GenericLayout.RefreshByDataAsync(e, !0);
  }
}
exports.PhonographNewMusicView = PhonographNewMusicView;
//# sourceMappingURL=PhonographNewMusicView.js.map
