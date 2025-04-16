"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerDescLeftPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerScoreInfoItem_1 = require("./ShipTowerScoreInfoItem");
class ShipTowerDescLeftPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Ns_ = void 0),
      (this.Ps_ = void 0),
      (this.H3e = void 0),
      (this.t8_ = () => {
        var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
        return (e.ShowReceivedCallBack = () => this.Ns_.IsPassed()), e;
      }),
      (this.ws_ = () => {
        this.Ns_?.OpenViewPassBuffShow();
      });
  }
  async Init(e, i) {
    (this.Ns_ = i), await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIVerticalLayout],
      [7, UE.UIMultiTemplateLayout],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[9, this.ws_]]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.Ps_ = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(6),
        () => new ShipTowerScoreInfoItem_1.ShipTowerScoreInfoItem(),
      ));
    var e = this.GetMultiTemplateLayout(7);
    this.H3e = new GenericLayout_1.GenericLayout(e, this.t8_);
  }
  OnBeforeShow() {
    this.Slo(this.Ns_);
  }
  UpdateViewAndShow(e) {
    (this.Ns_ = e), this.GetActive() ? this.Slo(this.Ns_) : this.SetActive(!0);
  }
  Slo(e) {
    (this.Ns_ = e), this.Hgi(), this.GetText(3).ShowTextNew(this.Ns_.TitleKey);
    var e = ShipTowerDefine_1.shipTowerTextKey.ScorePoint,
      i = this.GetText(4),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          i,
          e,
          this.Ns_.CurrentScore.toString(),
        ),
        this.GetText(5).ShowTextNew(this.Ns_.DescKey),
        this.oCo(),
        this.Ps_?.RefreshByData(this.Ns_.GetTargetScoreInfoList()),
        this.Ns_.GetPassUnlockBuffList());
    this.GetItem(10)?.SetUIActive(!!i.length),
      i.length && this.H3e?.RefreshByData(i);
  }
  Hgi() {
    var e = this.Ns_.IsEndLess;
    this.GetTexture(2).SetUIActive(e),
      this.GetTexture(0).SetUIActive(!e),
      e || this.GetText(1).SetText(this.Ns_.OrderIndex.toString());
  }
  oCo() {}
}
exports.ShipTowerDescLeftPanel = ShipTowerDescLeftPanel;
//# sourceMappingURL=ShipTowerDescLeftPanel.js.map
