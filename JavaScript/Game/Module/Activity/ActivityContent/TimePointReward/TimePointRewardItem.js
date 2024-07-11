"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimePointRewardItem = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class TimePointRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.gOe = void 0),
      (this.qsi = void 0),
      (this.OnClickToGet = void 0),
      (this.UFe = () => {
        1 === this.Pe?.RewardState && this.OnClickToGet?.(this.Pe.Id);
      }),
      (this.CXs = () => {
        1 === this.Pe?.RewardState
          ? this.OnClickToGet?.(this.Pe.Id)
          : this.qsi &&
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              this.qsi[0].ItemId,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  OnStart() {
    (this.gOe = new SmallItemGrid_1.SmallItemGrid()),
      this.gOe.Initialize(this.GetItem(1).GetOwner()),
      this.gOe.BindOnCanExecuteChange(() => !1),
      this.gOe.BindOnExtendToggleClicked(this.CXs);
  }
  Refresh(i, t, e) {
    this.Pe = i;
    var r =
      ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetTimePointRewardById(
        this.Pe.Id,
      );
    if (r) {
      var s,
        h,
        a = [];
      for ([s, h] of r.RewardItem) {
        var o = [{ IncId: 0, ItemId: s }, h];
        a.push(o);
      }
      this.qsi = a[0];
      var n = this.GetItem(3),
        d = this.GetText(4);
      switch (i.RewardState) {
        case 0:
          n.SetUIActive(!1),
            d.ShowTextNew("TimePointRewardActivity_RewardDesc01"),
            this.gXs(!1);
          break;
        case 1:
          n.SetUIActive(!0),
            d.ShowTextNew("TimePointRewardActivity_RewardDesc02"),
            this.gXs(!1);
          break;
        case 2:
          n.SetUIActive(!1),
            d.ShowTextNew("TimePointRewardActivity_RewardDesc03"),
            this.gXs(!0);
      }
      this.fXs(e + 1), this.pXs(this.Pe.RewardTime), this.cNe();
    }
  }
  cNe() {
    var i = {
      Data: this.Pe,
      Type: 4,
      ItemConfigId: this.qsi[0].ItemId,
      BottomText: this.qsi[1].toString(),
    };
    this.gOe.Apply(i),
      this.gOe.SetReceivableVisible(1 === this.Pe?.RewardState),
      this.gOe.SetLockVisible(0 === this.Pe?.RewardState),
      this.gOe.SetReceivedVisible(2 === this.Pe?.RewardState);
  }
  pXs(i) {
    i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(
      i * TimeUtil_1.TimeUtil.Millisecond,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "TimePointRewardActivity_TimeDesc01",
      i.Month,
      i.Day,
    );
  }
  fXs(i) {
    const t = this.GetSprite(5);
    t.SetUIActive(!1);
    (i = "SP_TimePointReward_Index0" + i),
      (i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i));
    this.SetSpriteByPath(i, t, !1, void 0, () => {
      t.SetUIActive(!0);
    });
  }
  gXs(i) {
    this.GetText(4).SetChangeColor(i, this.GetText(4).changeColor);
  }
}
exports.TimePointRewardItem = TimePointRewardItem;
//# sourceMappingURL=TimePointRewardItem.js.map
