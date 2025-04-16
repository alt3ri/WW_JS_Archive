"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PickInteractionView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class PickInteractionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Pl = () => {
        this.GetButton(0).RootUIComp.SetUIActive(!1),
          this.GetButton(1).RootUIComp.SetUIActive(!1),
          this.GetButton(2).RootUIComp.SetUIActive(!1);
      }),
      (this.WPl = !1),
      (this.XPl = () => {
        this.WPl = !0;
      }),
      (this.YPl = () => {
        this.WPl = !1;
      }),
      (this.ODo = () => {
        ControllerHolder_1.ControllerHolder.LevelPickInteractController.ResetPickInteractGame();
      }),
      (this.Awe = () => {
        this.$Pl(),
          ControllerHolder_1.ControllerHolder.LevelPickInteractController.ExitPickInteractModel();
      }),
      (this.lRl = () => {
        var e;
        this.WPl ||
          ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
            "PickInteractionViewTutorialId",
          )) &&
            ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.ODo],
        [1, this.Awe],
        [2, this.lRl],
      ]);
  }
  OnStart() {
    (ControllerHolder_1.ControllerHolder.LevelPickInteractController.OnClosingView =
      this.$Pl),
      (ControllerHolder_1.ControllerHolder.LevelPickInteractController.OnViewPiecePostMoveEventStart =
        this.XPl),
      (ControllerHolder_1.ControllerHolder.LevelPickInteractController.OnViewPiecePostMoveEventEnd =
        this.YPl),
      (this.WPl = !1);
  }
}
exports.PickInteractionView = PickInteractionView;
//# sourceMappingURL=PickInteractionView.js.map
