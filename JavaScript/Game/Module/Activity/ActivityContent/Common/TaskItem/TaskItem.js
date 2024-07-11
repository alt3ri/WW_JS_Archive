"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
class TaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.JGn = void 0),
      (this.bOe = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.IOe = () => {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.JGn.JumpId);
      }),
      (this.qOe = () => {
        this.JGn.ReceiveDelegate?.(this.JGn.TaskId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.IOe],
        [1, this.qOe],
      ]);
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(5),
      this.JGe,
    );
  }
  Refresh(i, t, e) {
    (this.JGn = i),
      this.bOe.RefreshByData(i.RewardList),
      this.GetButton(1).RootUIComp.SetUIActive(i.IsFinished && !i.IsTaken),
      this.GetItem(2).SetUIActive(i.IsTaken),
      this.GetText(6).SetUIActive(
        !i.IsTaken && !i.IsFinished && 0 === i.JumpId,
      ),
      StringUtils_1.StringUtils.IsEmpty(i.DoingTextId)
        ? this.GetText(6).ShowTextNew("Moonfiesta_TargetOn")
        : this.GetText(6).ShowTextNew("Moonfiesta_TargetDone"),
      this.GetButton(0).RootUIComp.SetUIActive(
        !i.IsFinished && !i.IsTaken && 0 < i.JumpId,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.TitleTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "LongShanStage_Progress",
        i.Current,
        i.Target,
      );
  }
}
exports.TaskItem = TaskItem;
//# sourceMappingURL=TaskItem.js.map
