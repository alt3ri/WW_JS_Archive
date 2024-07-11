"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureRewardItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ActivityDailyAdventureController_1 = require("./ActivityDailyAdventureController");
const DailyAdventureSmallGridItem_1 = require("./DailyAdventureSmallGridItem");
class DailyAdventureRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.sOe = []),
      (this.aOe = (e) => {
        this.Data &&
          (this.Data.RewardState !== 0
            ? ((e = e.Data),
              ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                e.Item[0].ItemId,
              ))
            : ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestPointReward(
                this.Data.RewardId,
              ));
      }),
      (this.hOe = () => {
        this.Data &&
          this.Data.RewardState === 0 &&
          ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestPointReward(
            this.Data.RewardId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.hOe]]);
  }
  async OnBeforeStartAsync() {
    const e = [];
    for (const t of [3, 4]) e.push(this.rOe(this.GetItem(t).GetOwner()));
    await Promise.all(e);
  }
  OnBeforeDestroy() {
    this.sOe.length = 0;
  }
  async rOe(e) {
    const t = new DailyAdventureSmallGridItem_1.DailyAdventureSmallGridItem();
    t.BindOnExtendToggleClicked(this.aOe),
      await t.CreateByActorAsync(e),
      this.sOe.push(t);
  }
  Refresh(e) {
    this.Data = e;
    const t =
      ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventurePointConfig(
        e.RewardId,
      );
    if (t) {
      const i = this.lOe(t.Drop);
      for (let e = 0; e < this.sOe.length; e++) {
        var r;
        const s = i.length > e;
        const a = this.sOe[e];
        s &&
          ((r = { Item: i[e], HasClaimed: this.Data.RewardState === 2 }),
          a.Refresh(r)),
          a.SetActive(s),
          a.SetReceivableVisible(this.Data.RewardState === 0),
          a.SetLockVisible(this.Data.RewardState === 1);
      }
      this.GetText(2).SetText(t.NeedPt.toString()), this._Oe(e.RewardState);
    }
  }
  _Oe(e) {
    switch (e) {
      case 1:
        this.uOe(!1),
          this.GetText(5).ShowTextNew("Text_ActivityTaskOngoing_Text"),
          this.GetItem(1).SetUIActive(!0),
          this.GetItem(6).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!1);
        break;
      case 0:
        this.uOe(!0),
          this.GetText(5).ShowTextNew("Text_ActivityTaskReceive_Text"),
          this.GetItem(1).SetUIActive(!1),
          this.GetItem(6).SetUIActive(!0),
          this.GetItem(7).SetUIActive(!0),
          this.GetItem(8).SetUIActive(!1);
        break;
      case 2:
        this.uOe(!1),
          this.GetText(5).ShowTextNew("Text_ActivityTaskClaimed_Text"),
          this.GetItem(1).SetUIActive(!0),
          this.GetItem(6).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!0);
    }
  }
  uOe(e) {
    this.GetText(5).SetChangeColor(e, this.GetText(5).changeColor);
  }
  lOe(e) {
    var e =
      ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
    const t = [];
    if (e)
      for (let [i, r] of e) {
        i = [{ IncId: 0, ItemId: i }, r];
        t.push(i);
      }
    return t;
  }
}
exports.DailyAdventureRewardItem = DailyAdventureRewardItem;
// # sourceMappingURL=DailyAdventureRewardItem.js.map
