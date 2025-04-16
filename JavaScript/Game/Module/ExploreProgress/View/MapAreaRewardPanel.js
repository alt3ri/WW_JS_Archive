"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapAreaRewardPanel = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  CommonRewardPopup_1 = require("../../Common/CommonRewardPopup"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MapAreaRewardItem_1 = require("./MapAreaRewardItem"),
  PROGRESS_ANIMATE_TIME = 0.5,
  REWARD_WIDTH = 120;
class MapAreaRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.bOl = void 0),
      (this.H3e = void 0),
      (this.t2t = void 0),
      (this.qte = 0),
      (this.i2t = 0),
      (this.o2t = 0),
      (this.r2t = !1),
      (this.n2t = -0),
      (this.s2t = []),
      (this.qOl = new Map()),
      (this.h2t = 0),
      (this.l2t = 0),
      (this._2t = 0),
      (this.u2t = 0),
      (this.S2t = void 0),
      (this.d2t = () => {
        var t = this.GetSprite(2),
          i = this.GetItem(1),
          s = this.GetItem(5),
          h = this.GetSprite(6);
        return (
          LguiUtil_1.LguiUtil.CopyItem(h, s),
          LguiUtil_1.LguiUtil.CopyItem(t, i),
          new MapAreaRewardItem_1.MapAreaRewardItem(
            this.bOl.GetRewardCallback,
            this.BOl,
          )
        );
      }),
      (this.BOl = (t) => {
        this.S2t.Refresh(t);
      });
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
    (this.l2t = t.GetWidth()), (this.t2t = this.GetItem(0));
  }
  OnBeforeDestroy() {
    (this.t2t = void 0), (this.s2t = void 0), (this.S2t = void 0);
  }
  Init(t) {
    this.ChangeParamData(t);
  }
  InitCommonRewardPopup(t) {
    this.S2t = new CommonRewardPopup_1.CommonRewardPopup(t);
  }
  ChangeParamData(i) {
    (this.bOl = i), (this.qte = i.InitValue), (this.h2t = 0), this.qOl.clear();
    for (let t = 0; t < i.RewardDataList.length; t++) {
      var s = i.RewardDataList[t];
      2 !== s.State && this.h2t++, this.qOl.set(s.Id, t);
    }
    this.H3e.RefreshByData(i.RewardDataList),
      this.GetSprite(2).SetUIActive(!1),
      this.GetSprite(6).SetUIActive(!1),
      0 === i.RewardDataList.length
        ? this.RootItem?.SetUIActive(!1)
        : ((this._2t = REWARD_WIDTH),
          (this.u2t =
            (this.l2t - this._2t * (i.RewardDataList.length - 1)) /
            i.RewardDataList.length),
          this.C2t(this.qte / i.MaxValue));
  }
  OnTickRefresh(t) {
    this.r2t &&
      ((this.n2t += t * TimeUtil_1.TimeUtil.Millisecond),
      (t = MathUtils_1.MathUtils.Clamp(this.n2t / PROGRESS_ANIMATE_TIME, 0, 1)),
      (this.qte = MathUtils_1.MathUtils.Lerp(this.o2t, this.i2t, t)),
      (t = MathUtils_1.MathUtils.Clamp(this.qte / this.bOl.MaxValue, 0, 1)),
      this.f2t(this.qte),
      this.C2t(t),
      this.qte === this.i2t) &&
      this.p2t();
  }
  RefreshProgressBarDynamic(i) {
    i <= this.qte ||
      (this.r2t && this.p2t(),
      (this.s2t = []),
      this.bOl.RewardDataList.forEach((t) => {
        this.qte < t.Goal && t.Goal <= i && this.s2t?.push([t.Goal, t.Id]);
      }),
      this.v2t(i));
  }
  UpdateRewardIds(t) {
    for (const i of t) this.sqe(i);
  }
  OnBeforeHide() {
    this.S2t?.SetActive(!1);
  }
  g2t() {
    let t = 0;
    for (const i of this.H3e.GetLayoutItemList())
      i.RefreshSelf(), 2 !== i.DailyActiveState && t++;
    this.h2t = t;
  }
  sqe(t) {
    t = this.qOl.get(t);
    void 0 !== t && this.H3e.GetLayoutItemByIndex(t)?.RefreshSelf();
  }
  f2t(t) {
    var i;
    0 !== this.s2t.length &&
      (i = this.s2t[0])[0] <= t &&
      (this.sqe(i[1]), this.s2t.shift(), this.h2t++);
  }
  C2t(t) {
    var i = this.bOl.RewardDataList.length,
      s = Math.min(this.h2t, i - 1) * this._2t,
      i = this.u2t * i * Math.min(t, 1),
      t = this.l2t - s - i;
    this.t2t.SetStretchRight(t);
  }
  v2t(t) {
    (this.i2t = t), (this.o2t = this.qte), (this.n2t = 0), (this.r2t = !0);
  }
  p2t() {
    (this.r2t = !1), (this.qte = this.i2t);
    var t = MathUtils_1.MathUtils.Clamp(this.i2t / this.bOl.MaxValue, 0, 1);
    this.g2t(), this.C2t(t);
  }
}
exports.MapAreaRewardPanel = MapAreaRewardPanel;
//# sourceMappingURL=MapAreaRewardPanel.js.map
