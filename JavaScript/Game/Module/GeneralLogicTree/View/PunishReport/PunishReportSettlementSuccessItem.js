"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportSettlementSuccessItem = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class PunishReportSettlementSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.Lqi = new CustomPromise_1.CustomPromise()),
      (this.yct = (e) => {
        "Start" === e && this.Lqi.SetResult(!0);
      });
  }
  OnStart() {
    super.OnStart(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), (this.SPe = void 0);
  }
  async ShowTip() {
    await this.ShowAsync(),
      this.SPe.PlayLevelSequenceByName("Start"),
      await this.Lqi.Promise;
  }
}
exports.PunishReportSettlementSuccessItem = PunishReportSettlementSuccessItem;
//# sourceMappingURL=PunishReportSettlementSuccessItem.js.map
