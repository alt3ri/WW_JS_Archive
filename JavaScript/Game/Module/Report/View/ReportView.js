"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReportView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ReportController_1 = require("../ReportController");
const ReportRowView_1 = require("./ReportRowView");
class ReportView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.nso = void 0),
      (this.sso = -1),
      (this.aso = void 0),
      (this.hso = void 0),
      (this.CreateGrid = () => {
        const i = new ReportRowView_1.ReportRowView();
        return i.SetToggleFunction(this.I6e), i;
      }),
      (this.J9e = () => {
        UiManager_1.UiManager.CloseView("ReportView");
      }),
      (this._Fe = () => {
        const i = this.GetInputText(2);
        this.sso === -1
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "ReportReasonNotSelect",
            )
          : ReportController_1.ReportController.ReportPlayerRequest(
              this.nso,
              this.sso,
              i.GetText(),
            );
      }),
      (this.I6e = (i) => {
        this.sso = i;
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      (this.ComponentRegisterInfos = [
        [0, UE.UIButtonComponent],
        [1, UE.UIButtonComponent],
        [2, UE.UITextInputComponent],
        [3, UE.UILoopScrollViewComponent],
        [4, UE.UIItem],
      ]),
      (this.BtnBindInfo = [
        [0, this.J9e],
        [1, this._Fe],
      ]);
  }
  OnStart() {
    (this.nso = this.OpenParam),
      (this.hso =
        ConfigManager_1.ConfigManager.ReportConfig.GetReportConfigList()),
      void 0 === this.hso && (this.hso = []),
      (this.aso = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(4).GetOwner(),
        this.CreateGrid,
      )),
      this.hso.length > 0 && (this.sso = this.hso[0].Id),
      this.aso.ReloadData(this.hso);
  }
  OnBeforeDestroy() {
    this.aso && this.aso.ClearGridProxies();
  }
}
exports.ReportView = ReportView;
// # sourceMappingURL=ReportView.js.map
