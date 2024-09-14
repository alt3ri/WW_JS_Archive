"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastRewardPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivityBlackCoastController_1 = require("./ActivityBlackCoastController"),
  BlackCoastRewardItem_1 = require("./BlackCoastRewardItem"),
  REWARD_WIDTH = 120;
class BlackCoastRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ActivityBaseData = void 0),
      (this.H3e = void 0),
      (this.t2t = void 0),
      (this.qte = 0),
      (this.BY = 0),
      (this.h2t = 0),
      (this.l2t = 0),
      (this._2t = REWARD_WIDTH),
      (this.u2t = 0),
      (this.c2t = 0),
      (this.d2t = () => {
        var t = this.GetItem(1),
          i = this.GetSprite(2),
          i =
            (LguiUtil_1.LguiUtil.CopyItem(i, t).SetUIActive(!0),
            this.GetItem(5)),
          t = this.GetSprite(6),
          t =
            (LguiUtil_1.LguiUtil.CopyItem(t, i).SetUIActive(!0),
            new BlackCoastRewardItem_1.BlackCoastRewardItem());
        return (
          (t.RequestGetAllAvailableReward = () => {
            var t = this.ActivityBaseData.GetAllAvailableProgressRewardIds();
            0 < t.length &&
              ActivityBlackCoastController_1.ActivityBlackCoastController.RequestDataProgressReward(
                this.ActivityBaseData.Id,
                t,
              );
          }),
          t
        );
      }),
      (this.ActivityBaseData = t);
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
      this.GetSprite(2).SetUIActive(!1),
      this.GetSprite(6).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.t2t = void 0;
  }
  Refresh() {
    (this.qte = this.ActivityBaseData.GetProgressItemCount()), (this.h2t = 0);
    var t = this.ActivityBaseData.GetAllProgressRewardData();
    for (const i of t)
      1 !== i.GetState() && this.h2t++, (this.BY = Math.max(i.Goal, this.BY));
    (this.c2t = t.length),
      this.c2t <= 0 ||
        (this.H3e.RefreshByData(t),
        (this.u2t = (this.l2t - this._2t * (this.c2t - 1)) / this.c2t),
        this.C2t(this.qte / this.BY));
  }
  RefreshLayout() {
    this.H3e.RefreshByData(this.ActivityBaseData.GetAllProgressRewardData());
  }
  C2t(t) {
    var i = Math.min(this.h2t, this.c2t - 1) * this._2t,
      t = this.u2t * this.c2t * Math.min(t, 1),
      i = this.l2t - i - t;
    this.t2t.SetStretchRight(i);
  }
}
exports.BlackCoastRewardPanel = BlackCoastRewardPanel;
//# sourceMappingURL=BlackCoastRewardPanel.js.map
