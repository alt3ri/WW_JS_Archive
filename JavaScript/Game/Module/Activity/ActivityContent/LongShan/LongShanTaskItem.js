"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanTaskItem = void 0);
const UE = require("ue"),
  LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityLongShanController_1 = require("./ActivityLongShanController");
class LongShanTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.BOe = 0),
      (this.bOe = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.IOe = () => {
        var i = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe);
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(i.JumpId);
      }),
      (this.qOe = () => {
        ActivityLongShanController_1.ActivityLongShanController.TakeTaskReward(
          this.BOe,
        );
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
  Refresh(i, e, t) {
    this.BOe = i.s5n;
    var r = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe),
      s = [];
    for (const n of r.TaskReward) {
      var o = [{ IncId: 0, ItemId: n[0] }, n[1]];
      s.push(o);
    }
    this.bOe.RefreshByData(s),
      this.GetButton(1).RootUIComp.SetUIActive(i.dMs && !i.mMs),
      this.GetItem(3).SetUIActive(i.mMs),
      this.GetItem(2).SetUIActive(!i.dMs && 0 === r.JumpId),
      this.GetButton(0).RootUIComp.SetUIActive(!i.dMs && 0 < r.JumpId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.TaskName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        "LongShanStage_Progress",
        i.lMs,
        i.j6n,
      );
  }
}
exports.LongShanTaskItem = LongShanTaskItem;
//# sourceMappingURL=LongShanTaskItem.js.map
