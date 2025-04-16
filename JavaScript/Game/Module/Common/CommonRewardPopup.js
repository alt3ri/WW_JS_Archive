"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonRewardPopup = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../Ui/Base/UiViewSequence"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  CommonItemSmallItemGrid_1 = require("./ItemGrid/CommonItemSmallItemGrid");
class CommonRewardPopup extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.KTt = void 0),
      (this.QTt = void 0),
      (this.vot = new Map()),
      (this.Cxo = void 0),
      (this.rOe = () => {
        return new RewardPanelItem();
      }),
      (this.XTt = () => {
        this.SetActive(!1);
      }),
      this.CreateByResourceIdAsync("UiItem_RewardPopup", e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.XTt]]);
  }
  OnBeforeCreateImplement() {
    (this.Cxo = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.Cxo);
  }
  OnStart() {
    (this.KTt = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.rOe,
    )),
      this.SetActive(!1);
    for (const e of this.vot.values()) e();
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Cxo?.PlaySequenceAsync("Show", e);
  }
  async OnHideAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Cxo?.PlaySequenceAsync("Hide", e);
  }
  OnBeforeDestroy() {
    this.KTt.ClearChildren(),
      (this.KTt = void 0),
      (this.QTt = void 0),
      this.vot.clear();
  }
  Refresh(e) {
    var t = () => {
      if (0 !== this.QTt.RewardLists.length) {
        let e = this.QTt.MountItem.GetLGUISpaceAbsolutePosition();
        void 0 !== this.QTt.PosBias && (e = e.op_Addition(this.QTt.PosBias)),
          this.GetItem(2).SetLGUISpaceAbsolutePosition(e),
          this.KTt.RefreshByDataAsync(this.QTt.RewardLists).then(() => {
            this.SetActive(!0);
          });
      }
    };
    (this.QTt = e), this.InAsyncLoading() ? this.vot.set("Refresh", t) : t();
  }
}
exports.CommonRewardPopup = CommonRewardPopup;
class RewardPanelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.$Tt = void 0), (this._Ne = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(0).GetOwner();
    (this._Ne = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this._Ne.Initialize(e);
  }
  Refresh(e, t, i) {
    (this.$Tt = e),
      this._Ne.RefreshByConfigId(this.$Tt.Id, this.$Tt.Num),
      this._Ne.SetReceivedVisible(this.$Tt.Received);
  }
  OnBeforeDestroy() {
    this.$Tt = void 0;
  }
}
//# sourceMappingURL=CommonRewardPopup.js.map
