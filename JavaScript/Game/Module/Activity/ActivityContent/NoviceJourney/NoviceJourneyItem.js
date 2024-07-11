"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoviceJourneyItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ActivityManager_1 = require("../../ActivityManager");
class NoviceJourneyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.kh = new Map()),
      (this.Mke = 0),
      (this.sOe = []),
      (this.Lo = void 0),
      (this.CNe = void 0),
      (this.hOe = () => {
        if (this.Mke === 1)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "NewbieCourse_LevelTips",
          );
        else if (this.Mke === 2) {
          ActivityManager_1.ActivityManager.GetActivityController(
            this.CNe.Type,
          ).RequestReward(this.Lo.Id);
          for (const t of this.sOe) t.SetReceivableVisible(!1);
        }
      }),
      (this.aOe = (t) => {
        this.Mke !== 2
          ? ((t = t.Data),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t.ItemId,
            ))
          : ActivityManager_1.ActivityManager.GetActivityController(
              this.CNe.Type,
            ).RequestReward(this.Lo.Id);
      }),
      (this.Ske = () => {
        this.GetItem(5).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(4).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!1);
        for (const t of this.sOe) t.SetLockVisible(!0);
      }),
      (this.Eke = () => {
        this.GetItem(5).SetUIActive(!0),
          this.GetItem(7).SetUIActive(!0),
          this.GetItem(4).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!1),
          this.GetText(6).SetText(this.Lo.Id.toString());
        for (const t of this.sOe) t.SetReceivableVisible(!0);
      }),
      (this.yke = () => {
        this.GetItem(5).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(4).SetUIActive(!0),
          this.GetItem(8).SetUIActive(!0);
        for (const t of this.sOe) t.SetReceivedVisible(!0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.hOe]]);
  }
  async rOe(t) {
    const i = new RewardGridItem();
    i.BindOnExtendToggleClicked(this.aOe),
      await i.CreateThenShowByActorAsync(t),
      this.sOe.push(i);
  }
  async OnBeforeStartAsync() {
    const e = [this.GetItem(1), this.GetItem(2)];
    const s = [];
    for (let t = 0, i = e.length; t < i; ++t) s.push(this.rOe(e[t].GetOwner()));
    await Promise.all(s);
  }
  OnStart() {
    this.kh.set(1, this.Ske),
      this.kh.set(2, this.Eke),
      this.kh.set(3, this.yke);
  }
  OnBeforeDestroy() {
    for (const t of this.sOe) this.AddChild(t);
  }
  SetActivityData(t) {
    this.CNe = t;
  }
  Refresh(t, i, e) {
    (this.Lo = t), this.GetText(0).SetText(t.Id.toString());
    const s =
      ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetRewardList(
        this.Lo.Reward,
      );
    for (let t = 0, i = this.sOe.length; t < i; ++t) {
      const r = this.sOe[t];
      t < s.length ? r.RefreshByData(s[t]) : r.SetActive(!1);
    }
    this.RefreshCurrentState();
  }
  RefreshCurrentState() {
    (this.Mke = this.CNe.GetRewardStateByLevel(this.Lo.Id)),
      this.kh.get(this.Mke)();
  }
  GetKey(t, i) {
    return this.Lo.Id;
  }
}
exports.NoviceJourneyItem = NoviceJourneyItem;
class RewardGridItem extends SmallItemGrid_1.SmallItemGrid {
  OnCanExecuteChange() {
    return !1;
  }
  RefreshByData(t) {
    t = {
      Type: 4,
      Data: t,
      ItemConfigId: t.ItemId,
      BottomText: t.Count.toString(),
      IsReceivedVisible: !1,
    };
    this.Apply(t);
  }
}
// # sourceMappingURL=NoviceJourneyItem.js.map
