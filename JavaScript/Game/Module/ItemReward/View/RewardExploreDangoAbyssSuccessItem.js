"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreDangoAbyssSuccessItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class RewardExploreDangoAbyssSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OFt = void 0),
      (this.kGe = void 0),
      (this.d2t = () => {
        return this.Pfi();
      }),
      (this.wYt = (e) => {
        this.OFt?.SetSelected(!1, !0), (this.OFt = e.MediumItemGrid);
        var e = e.Data,
          r = e.ConfigId,
          e = e.UniqueId;
        void 0 !== e && 0 < e
          ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
              e,
              r,
            )
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              r,
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIGridLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    this.kGe = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(2),
      this.d2t,
    );
  }
  Refresh(e) {
    this.jqe(e.RewardItemData), this.Nqe(e.Progress);
  }
  Nqe(e) {
    e = Math.floor(100 * e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "AbyssLevelProgress",
      e.toString(),
    );
  }
  jqe(e) {
    e.sort((e, r) => {
      var t = e.GetDropItemType(),
        s = r.GetDropItemType();
      return t !== s
        ? s - t
        : (s = e.GetTypeSortIndex()) !== (t = r.GetTypeSortIndex())
          ? t - s
          : (t = e.GetQualityId()) !== (s = r.GetQualityId())
            ? s - t
            : e.ConfigId - r.ConfigId;
    }),
      this.kGe.RefreshByData(e);
  }
  Pfi() {
    var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
    return (
      e.BindOnCanExecuteChange(() => !1),
      e.BindOnExtendToggleClicked(this.wYt),
      e
    );
  }
}
exports.RewardExploreDangoAbyssSuccessItem = RewardExploreDangoAbyssSuccessItem;
//# sourceMappingURL=RewardExploreDangoAbyssSuccessItem.js.map
