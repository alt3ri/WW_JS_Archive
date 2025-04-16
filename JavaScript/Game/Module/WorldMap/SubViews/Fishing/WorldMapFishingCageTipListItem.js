"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapFishingCageTipListItem = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryTipListItem_1 = require("../Common/TipList/WorldMapSecondaryTipListItem");
class WorldMapFishingCageTipListItem extends WorldMapSecondaryTipListItem_1.WorldMapSecondaryTipListItem {
  constructor() {
    super(...arguments), (this.TDe = void 0), (this.Cfe = 0);
  }
  Refresh(i, e, t) {
    0 === i.TipItemType ? this.xn_(i) : 1 === i.TipItemType && this.Rn_(i);
  }
  OnBeforeHide() {
    this.cG();
  }
  xn_(i) {
    var e = i.RelativeId,
      t =
        ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
          "Fishing_MarkText5",
        );
    this.GetNameTxt().SetText(t),
      (this.Cfe =
        ModelManager_1.ModelManager.FishingModel.GetShipCageNextHarvestTimeStamp(
          e,
        ) * TimeUtil_1.TimeUtil.Millisecond),
      this.Pn_(i),
      this.wn_(i);
  }
  Rn_(i) {
    var i = i.RelativeId,
      i =
        ModelManager_1.ModelManager.FishingModel.GetShipCageCapacityInfoTuple(
          i,
        ),
      e =
        ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
          "Fishing_MarkText1",
        ),
      i = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        "Fishing_QTE_Count",
        i[0].toString(),
        i[1].toString(),
      );
    this.GetNameTxt().SetText(e), this.GetDescTxt().SetText(i);
  }
  wn_(i) {
    this.cG();
    var e = TimeUtil_1.TimeUtil.InverseMillisecond;
    this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(() => {
      this.Un_(i);
    }, e);
  }
  Un_(i) {
    this.Pn_(i);
  }
  Pn_(i) {
    var e,
      i = i.RelativeId,
      i =
        ModelManager_1.ModelManager.FishingModel.GetShipCageCapacityInfoTuple(
          i,
        );
    i[0] >= i[1]
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetDescTxt(),
          "Fishing_MarkText6",
        )
      : ((i = this.Cfe - TimeUtil_1.TimeUtil.GetServerTime()),
        (e =
          ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
            "Fishing_MarkText6",
          )),
        (i =
          TimeUtil_1.TimeUtil.GetRemainTimeDataFormat4(i).CountDownText ?? e),
        this.GetDescTxt().SetText(i));
  }
  cG() {
    this.TDe &&
      TimerSystem_1.RealTimeTimerSystem.Has(this.TDe) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.WorldMapFishingCageTipListItem = WorldMapFishingCageTipListItem;
//# sourceMappingURL=WorldMapFishingCageTipListItem.js.map
