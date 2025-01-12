"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonResultView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CommonItemSimpleGrid_1 = require("../ItemGrid/CommonItemSimpleGrid"),
  CommonResultButton_1 = require("./CommonResultButton"),
  TIMERGAP = 1e3;
class CommonResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ButtonMap = void 0),
      (this.ButtonItemMap = void 0),
      (this._bt = new Array()),
      (this.RewardLayout = void 0),
      (this.ubt = void 0),
      (this.cbt = 0),
      (this.mbt = (t, e, i) => {
        e = new CommonItemSimpleGrid_1.CommonItemSimpleGrid(e.GetOwner());
        return e.RefreshItem(t[0].ItemId, t[1]), { Key: i, Value: e };
      }),
      (this.j3 = () => {
        this._bt.forEach((t) => {
          t.DoTimerCallBack(this.cbt);
        }),
          this.cbt++,
          this.OnTimer();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetText(2).SetUIActive(!1),
      this.SetResultText("ChallengeGetReward"),
      this.GetItem(3).SetUIActive(!1),
      (this.ButtonMap = new Map()),
      (this.ButtonItemMap = new Map()),
      this.SetupButtonFormat(),
      (this.RewardLayout = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(0),
        this.mbt,
      )),
      this.P3e();
  }
  OnBeforeDestroy() {
    this.jm(),
      this.dbt(),
      this.RewardLayout.ClearChildren(),
      (this.RewardLayout = void 0);
  }
  SetupButtonFormat() {}
  Cbt(t) {
    var e = this.GetItem(3),
      i = this.GetItem(4),
      e = LguiUtil_1.LguiUtil.CopyItem(e, i),
      i = new CommonResultButton_1.CommonResultButton(e);
    return i.SetData(t), i;
  }
  dbt() {
    for (const t of this.ButtonMap.values()) t.Destroy();
    this.ButtonMap.clear(), this.ButtonItemMap.clear();
  }
  RefreshButtonList(e) {
    this._bt.forEach((t, e) => {
      t.ResetData(), t.SetActive(!1);
    });
    var i,
      s = e.length,
      r = this._bt,
      o = r.length;
    for (let t = 0; t < s; t++)
      (t < o
        ? ((i = r[t]).SetData(e[t]), i)
        : ((i = this.Cbt(e[t])), this._bt.push(i), i)
      ).SetActive(!0);
    this._bt.forEach((t) => {
      t.DoRefreshCallBack();
    });
  }
  SetResultText(t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
  }
  SetTipsText(t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t),
      this.GetText(2).SetUIActive(!0);
  }
  P3e() {
    this.ubt = TimerSystem_1.TimerSystem.Forever(this.j3, TIMERGAP);
  }
  OnTimer() {}
  jm() {
    TimerSystem_1.TimerSystem.Has(this.ubt) &&
      TimerSystem_1.TimerSystem.Remove(this.ubt),
      (this.ubt = void 0);
  }
}
exports.CommonResultView = CommonResultView;
//# sourceMappingURL=CommonResultView.js.map
