"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkWorldRunTaskItem = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ActivitySmallItemGrid_1 = require("../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  DreamLinkController_1 = require("../DreamLinkController");
class DreamLinkWorldRunTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.bOe = void 0),
      (this.j0l = void 0),
      (this._fe = !1),
      (this.W2e = () => {
        return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
      }),
      (this.IOe = () => {
        DreamLinkController_1.DreamLinkController.GetCurrentActivityData()?.SaveFirstCheckRedDotState(
          1,
          this.Data.Id,
        ),
          this.BNe(),
          this.Data.JumpDelegate();
      }),
      (this.qOe = () => {
        this.Data.ReceiveDelegate();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.qOe]]);
  }
  OnStart() {
    (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(6),
      this.W2e,
    )),
      this.GetItem(2).SetUIActive(!1),
      (this.j0l = new ButtonItem_1.ButtonItem(this.GetItem(0))),
      this.j0l.SetFunction(this.IOe);
  }
  Refresh(t, i, e) {
    (this.Data = t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TitleTextId),
      this.bOe.RefreshByData(t.GetRewardData());
    var r = 0 === t.Status,
      s = 1 === t.Status,
      h = 3 === t.Status,
      o = 2 === t.Status;
    this.GetItem(4).SetUIActive(r),
      r && this.GetText(5).SetText(t.GetLockTxt()),
      this.GetItem(8).SetUIActive(h || o),
      (h || o) &&
        this.GetText(9).SetText(
          TimeUtil_1.TimeUtil.GetTimeString(Math.max(t.PlayTime, 0)),
        ),
      s
        ? this.j0l.SetLocalTextNew("WorldRun_Button_State1")
        : h && this.j0l.SetLocalTextNew("WorldRun_Button_State2"),
      (this._fe = t.IsTimeLock()),
      this.j0l.SetActive(s || h),
      this.GetButton(1).RootUIComp.SetUIActive(o),
      this.BNe();
  }
  RefreshLockText() {
    this.Data &&
      0 === this.Data.Status &&
      this._fe &&
      this.GetText(5).SetText(this.Data.GetLockTxt());
  }
  BNe() {
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData(),
      i = 1 === this.Data.Status,
      t = t.GetRunRedDotState(this.Data.Id);
    i && this.j0l.SetRedDotVisible(t);
  }
}
exports.DreamLinkWorldRunTaskItem = DreamLinkWorldRunTaskItem;
//# sourceMappingURL=DreamLinkWorldRunTaskItem.js.map
