"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonRewardPopup = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  CommonItemSmallItemGrid_1 = require("./ItemGrid/CommonItemSmallItemGrid");
class CommonRewardPopup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.KTt = void 0),
      (this.QTt = void 0),
      (this.vot = new Map()),
      (this.rOe = () => {
        return new RewardPanelItem();
      }),
      (this.XTt = () => {
        this.SetActive(!1);
      }),
      this.CreateByResourceIdAsync("UiItem_RewardPopup", t);
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
  OnStart() {
    (this.KTt = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.rOe,
    )),
      this.SetActive(!1);
    for (const t of this.vot.values()) t();
  }
  OnBeforeDestroy() {
    this.KTt.ClearChildren(),
      (this.KTt = void 0),
      (this.QTt = void 0),
      this.vot.clear();
  }
  Refresh(t) {
    var e = () => {
      if (0 !== this.QTt.RewardLists.length) {
        let t = this.QTt.MountItem.GetLGUISpaceAbsolutePosition();
        void 0 !== this.QTt.PosBias && (t = t.op_Addition(this.QTt.PosBias)),
          this.GetItem(2).SetLGUISpaceAbsolutePosition(t),
          this.KTt.RefreshByDataAsync(this.QTt.RewardLists).then(() => {
            this.SetActive(!0);
          });
      }
    };
    (this.QTt = t), this.InAsyncLoading() ? this.vot.set("Refresh", e) : e();
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
    var t = this.GetItem(0).GetOwner();
    (this._Ne = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this._Ne.Initialize(t);
  }
  Refresh(t, e, i) {
    (this.$Tt = t),
      this._Ne.RefreshByConfigId(this.$Tt.Id, this.$Tt.Num),
      this._Ne.SetReceivedVisible(this.$Tt.Received);
  }
  OnBeforeDestroy() {
    this.$Tt = void 0;
  }
}
//# sourceMappingURL=CommonRewardPopup.js.map
