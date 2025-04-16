"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportSettlementConditionItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class PunishReportSettlementConditionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.Lqi = new CustomPromise_1.CustomPromise()),
      (this.IGl = !1),
      (this.yct = (e) => {
        "Finish" === e && this.Lqi.SetResult(!0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    super.OnStart(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.yct);
  }
  Init(e, i, t) {
    var s = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, e),
      this.GetSprite(0)?.SetUIActive(1 === i),
      (this.IGl = i !== t && 1 === t);
  }
  async PlaySequence() {
    this.IGl &&
      (this.GetSprite(0)?.SetUIActive(!0),
      this.SPe?.PlayLevelSequenceByName("Finish"),
      await this.Lqi.Promise);
  }
}
exports.PunishReportSettlementConditionItem =
  PunishReportSettlementConditionItem;
//# sourceMappingURL=PunishReportSettlementConditionItem.js.map
