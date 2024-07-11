"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityRewardPanel = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DailyActivityRewardItem_1 = require("./DailyActivityRewardItem"),
  PROGRESS_ANIMATE_TIME = 0.5,
  REWARD_WIDTH = 120;
class DailyActivityRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.H3e = void 0),
      (this.t2t = void 0),
      (this.qte = 0),
      (this.BY = 0),
      (this.i2t = 0),
      (this.o2t = 0),
      (this.r2t = !1),
      (this.n2t = -0),
      (this.s2t = []),
      (this.a2t = []),
      (this.h2t = 0),
      (this.l2t = 0),
      (this._2t = 0),
      (this.u2t = 0),
      (this.c2t = 0),
      (this.m2t = (t) => {
        for (const i of t) this.sqe(i);
      }),
      (this.d2t = () => {
        var t = this.GetSprite(2),
          i = this.GetItem(1),
          s = this.GetItem(5),
          e = this.GetSprite(6);
        return (
          LguiUtil_1.LguiUtil.CopyItem(e, s),
          LguiUtil_1.LguiUtil.CopyItem(t, i),
          new DailyActivityRewardItem_1.DailyActivityRewardItem()
        );
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
    ];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.d2t,
    );
    var t = this.GetItem(0);
    (this.l2t = t.GetWidth()),
      (this.t2t = this.GetItem(0)),
      this.AddEventListener();
  }
  OnBeforeDestroy() {
    (this.t2t = void 0), (this.s2t = void 0), this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DailyActivityRewardTake,
      this.m2t,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DailyActivityRewardTake,
      this.m2t,
    );
  }
  Init() {
    var t = ModelManager_1.ModelManager.DailyActivityModel,
      i = t.DailyActivityGoalMap,
      s = ((this.qte = t.ActivityValue), (this.BY = t.ActivityMaxValue), []);
    this.h2t = 0;
    for (const e of i.values()) 2 !== e.State && this.h2t++, s.push(e.Id);
    (this.c2t = s.length),
      this.c2t <= 0 ||
        ((this.a2t = s),
        this.H3e.RefreshByData(s),
        this.GetSprite(2).SetUIActive(!1),
        this.GetSprite(6).SetUIActive(!1),
        (this._2t = REWARD_WIDTH),
        (this.u2t = (this.l2t - this._2t * (this.c2t - 1)) / this.c2t),
        this.C2t(this.qte / this.BY));
  }
  GetRewardItemByIndex(t) {
    return this.H3e.GetItemByIndex(t);
  }
  g2t() {
    let t = 0;
    for (const i of this.H3e.GetLayoutItemList())
      i.RefreshSelf(), 2 !== i.DailyActiveState && t++;
    this.h2t = t;
  }
  sqe(t) {
    t = this.a2t.indexOf(t);
    t < 0 || this.H3e.GetLayoutItemList()[t].RefreshSelf();
  }
  f2t(t) {
    var i;
    0 !== this.s2t.length &&
      (i = this.s2t[0])[0] <= t &&
      (this.sqe(i[1]), this.s2t.shift(), this.h2t++);
  }
  OnTickRefresh(t) {
    this.r2t &&
      ((this.n2t += t * TimeUtil_1.TimeUtil.Millisecond),
      (t = MathUtils_1.MathUtils.Clamp(this.n2t / PROGRESS_ANIMATE_TIME, 0, 1)),
      (this.qte = MathUtils_1.MathUtils.Lerp(this.o2t, this.i2t, t)),
      (t = MathUtils_1.MathUtils.Clamp(this.qte / this.BY, 0, 1)),
      this.f2t(this.qte),
      this.C2t(t),
      this.qte === this.i2t) &&
      this.p2t();
  }
  C2t(t) {
    var i = Math.min(this.h2t, this.c2t - 1) * this._2t,
      t = this.u2t * this.c2t * Math.min(t, 1),
      i = this.l2t - i - t;
    this.t2t.SetStretchRight(i);
  }
  v2t(t) {
    (this.i2t = t), (this.o2t = this.qte), (this.n2t = 0), (this.r2t = !0);
  }
  p2t() {
    (this.r2t = !1), (this.qte = this.i2t);
    var t = MathUtils_1.MathUtils.Clamp(this.i2t / this.BY, 0, 1);
    this.g2t(), this.C2t(t);
  }
  RefreshProgressBarDynamic(s) {
    var t;
    s <= this.qte ||
      (this.r2t && this.p2t(),
      (t = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap),
      (this.s2t = []),
      t.forEach((t, i) => {
        this.qte < t.Goal && t.Goal <= s && this.s2t.push([t.Goal, i]);
      }),
      this.v2t(s));
  }
}
exports.DailyActivityRewardPanel = DailyActivityRewardPanel;
//# sourceMappingURL=DailyActivityRewardPanel.js.map
