"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonTimeAndCountItem = void 0);
const ue_1 = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonTimeAndCountItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIItem],
      [1, ue_1.UIItem],
      [2, ue_1.UIText],
      [3, ue_1.UIText],
    ];
  }
  RefreshItem(e) {
    var i =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          e,
        ).RewardId,
      i =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          i,
        )?.SharedId;
    if (i) {
      var t =
          ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
            i,
          ),
        i =
          (this.GetItem(0).SetUIActive(!0),
          this.GetText(2).SetUIActive(!0),
          ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
            i,
          )),
        t = t.MaxCount;
      const a = t - i;
      if (
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "InstanceCanRewardTimes",
          (0 <= a ? a : 0) + "/" + t,
        ),
        a === t)
      )
        return void this.GetItem(1).SetUIActive(!1);
    } else {
      (i =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          e,
        ).EnterControlId),
        (t =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(
            i,
          ));
      if (t?.LimitChallengedTimes) {
        this.GetItem(0).SetUIActive(!0), this.GetText(2).SetUIActive(!0);
        const a = 0 <= t.LeftChallengedTimes ? t.LeftChallengedTimes : 0;
        if (
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "InstanceCanRewardTimes",
            a + "/" + t.LimitChallengedTimes,
          ),
          a === t.LimitChallengedTimes)
        )
          return void this.GetItem(1).SetUIActive(!1);
      } else this.GetItem(0).SetUIActive(!1), this.GetText(2).SetUIActive(!1);
    }
    i =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceResetTime(
        e,
      );
    let n = MathUtils_1.MathUtils.LongToBigInt(i ?? 0);
    n <= 0 &&
      (n = MathUtils_1.MathUtils.LongToBigInt(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EntranceEndTime,
      ));
    const a = Number(n) - TimeUtil_1.TimeUtil.GetServerTime();
    0 < n && 0 < a
      ? (this.GetItem(1).SetUIActive(!0),
        (t = TimeUtil_1.TimeUtil.CalculateRemainingTime(a)),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(3),
          t.TextId,
          0 < t.TimeValue ? t.TimeValue : 1,
        ))
      : this.GetItem(1).SetUIActive(!1);
  }
}
exports.InstanceDungeonTimeAndCountItem = InstanceDungeonTimeAndCountItem;
//# sourceMappingURL=InstanceDungeonTimeAndCountItem.js.map
