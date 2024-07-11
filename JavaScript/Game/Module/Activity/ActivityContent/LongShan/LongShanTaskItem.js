"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanTaskItem = void 0);
const UE = require("ue");
const LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityLongShanController_1 = require("./ActivityLongShanController");
class LongShanTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.BOe = 0),
      (this.bOe = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.IOe = () => {
        const i = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe);
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
    this.BOe = i.Ekn;
    const r = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe);
    const s = [];
    for (const n of r.TaskReward) {
      const o = [{ IncId: 0, ItemId: n[0] }, n[1]];
      s.push(o);
    }
    this.bOe.RefreshByData(s),
      this.GetButton(1).RootUIComp.SetUIActive(i.$0s && !i.H0s),
      this.GetItem(3).SetUIActive(i.H0s),
      this.GetItem(2).SetUIActive(!i.$0s && r.JumpId === 0),
      this.GetButton(0).RootUIComp.SetUIActive(!i.$0s && r.JumpId > 0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.TaskName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        "LongShanStage_Progress",
        i.k0s,
        i.s3n,
      );
  }
}
exports.LongShanTaskItem = LongShanTaskItem;
// # sourceMappingURL=LongShanTaskItem.js.map
