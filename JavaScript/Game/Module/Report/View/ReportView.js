"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReportView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ReportController_1 = require("../ReportController"),
  ReportRowView_1 = require("./ReportRowView");
class ReportView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.tao = void 0),
      (this.iao = -1),
      (this.oao = void 0),
      (this.rao = void 0),
      (this.CreateGrid = () => {
        var i = new ReportRowView_1.ReportRowView();
        return i.SetToggleFunction(this.N8e), i;
      }),
      (this.uHe = () => {
        UiManager_1.UiManager.CloseView("ReportView");
      }),
      (this.L3e = () => {
        var i = this.GetInputText(2);
        -1 === this.iao
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "ReportReasonNotSelect",
            )
          : ReportController_1.ReportController.ReportPlayerRequest(
              this.tao,
              this.iao,
              i.GetText(),
            );
      }),
      (this.N8e = (i) => {
        this.iao = i;
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
        [0, this.uHe],
        [1, this.L3e],
      ]);
  }
  OnStart() {
    (this.tao = this.OpenParam),
      (this.rao =
        ConfigManager_1.ConfigManager.ReportConfig.GetReportConfigList()),
      void 0 === this.rao && (this.rao = []),
      (this.oao = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(4).GetOwner(),
        this.CreateGrid,
      )),
      0 < this.rao.length && (this.iao = this.rao[0].Id),
      this.oao.ReloadData(this.rao);
  }
  OnBeforeDestroy() {
    this.oao && this.oao.ClearGridProxies();
  }
}
exports.ReportView = ReportView;
//# sourceMappingURL=ReportView.js.map
