"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQtePauseView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class FishingQtePauseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.St_ = () => {
        ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(
          (e) => {
            e && this.CloseMe();
          },
        );
      }),
      (this.Mt_ = () => {
        ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardWareHouseView(
          !0,
        ),
          this.CloseMe();
      }),
      (this.Et_ = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.St_],
        [1, this.Mt_],
        [2, this.Et_],
      ]);
  }
  OnStart() {}
}
exports.FishingQtePauseView = FishingQtePauseView;
//# sourceMappingURL=FishingQtePauseView.js.map
