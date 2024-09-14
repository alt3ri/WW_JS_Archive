"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastTaskItem = void 0);
const UE = require("ue"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class BlackCoastTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.bOe = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.IOe = () => {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.JumpId);
      }),
      (this.qOe = () => {
        this.Pe.ReceiveDelegate?.(this.Pe.TaskId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.IOe],
        [1, this.qOe],
      ]);
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(6),
      this.JGe,
    );
  }
  Refresh(i, t, e) {
    (this.Pe = i), this.bOe.RefreshByData(i.RewardList);
    var s = 2 === i.Status,
      r = 0 === i.Status,
      o = 1 === i.Status;
    this.GetButton(1).RootUIComp.SetUIActive(r),
      this.GetItem(3).SetUIActive(s),
      this.GetItem(2).SetUIActive(o && 0 === i.JumpId),
      this.GetButton(0).RootUIComp.SetUIActive(o && 0 < i.JumpId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TitleTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        "BlackCoastTheme_TaskProgress",
        i.Current,
        i.Target,
      );
  }
}
exports.BlackCoastTaskItem = BlackCoastTaskItem;
//# sourceMappingURL=BlackCoastTaskItem.js.map
