"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassExtraRewardView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class BattlePassExtraRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.eZs = void 0),
      (this.R11 = void 0),
      (this.L11 = void 0),
      (this.OFt = void 0),
      (this.w11 = (e, i) => {
        var t = e.GetDropItemType(),
          r = i.GetDropItemType();
        return t !== r
          ? r - t
          : (r = e.GetTypeSortIndex()) !== (t = i.GetTypeSortIndex())
            ? t - r
            : (t = e.GetQualityId()) !== (r = i.GetQualityId())
              ? r - t
              : e.ConfigId - i.ConfigId;
      }),
      (this.d2t = () => {
        var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
        return (
          e.BindOnCanExecuteChange(() => !1),
          e.BindOnExtendToggleClicked(this.wYt),
          e
        );
      }),
      (this.wYt = (e) => {
        this.OFt?.SetSelected(!1, !0), (this.OFt = e.MediumItemGrid);
        var e = e.Data,
          i = e.ConfigId,
          e = e.UniqueId;
        void 0 !== e && 0 < e
          ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
              e,
              i,
            )
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              i,
            );
      }),
      (this.GLn = () => {
        this.CloseMe(), this.eZs?.GetRewardInfo().RightAction();
      }),
      (this.qLn = () => {
        this.CloseMe(), this.eZs?.GetRewardInfo().LeftAction();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.GLn],
        [1, this.qLn],
      ]);
  }
  async OnBeforeStartAsync() {
    return (this.eZs = this.OpenParam), Promise.resolve();
  }
  OnStart() {
    (this.R11 = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.d2t,
    )),
      (this.L11 = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(4),
        this.d2t,
      )),
      this.bl();
  }
  OnBeforeDestroy() {
    (this.OFt = void 0), (this.R11 = void 0), (this.L11 = void 0);
  }
  bl() {
    var e = this.eZs?.GetRewardInfo().CommonItems,
      e =
        (void 0 !== e && (e.sort(this.w11), this.R11?.RefreshByData(e)),
        this.eZs?.GetRewardInfo().ExtraItems);
    void 0 !== e && (e.sort(this.w11), this.L11?.RefreshByData(e));
  }
}
exports.BattlePassExtraRewardView = BattlePassExtraRewardView;
//# sourceMappingURL=BattlePassExtraRewardView.js.map
