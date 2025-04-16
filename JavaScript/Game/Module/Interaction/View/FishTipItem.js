"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishTipItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DYNAMIC_FISHING_POINT_NAME = "Fishing_TemporaryPoint";
class FishTipItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos.push(
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    );
  }
  RefreshByFishingPoint(e) {
    var i,
      a,
      r,
      n =
        ConfigManager_1.ConfigManager.FishingConfig?.GetFishingPointConfigByEntityId(
          e,
        );
    n
      ? ((i =
          ModelManager_1.ModelManager.FishingModel.GetFishingPointDataByPbEntityId(
            e,
          )),
        (r = n.ShowItem),
        (a =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
            r,
          )?.Name),
        (r =
          ModelManager_1.ModelManager.FishingQuestModel.IsAcceptedEntrustItem(
            r,
          )),
        this.Og(a, r, n.UnlockTech, i?.CurrentCount, i?.MaxCount))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Interaction", 18, "找不到捕捞点配置", [
          "实体配置Id",
          e,
        ]);
  }
  RefreshByDynamicFishingPoint(e) {
    var i =
      ModelManager_1.ModelManager.FishingModel.GetTempFishingPointDataByCreatureDataId(
        e,
      );
    i
      ? this.Og(DYNAMIC_FISHING_POINT_NAME, !1, -1, i.CurrentCount, i.MaxCount)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Interaction", 48, "找不到临时捕捞点配置", [
          "CreatureDataId",
          e,
        ]);
  }
  Og(e, i, a, r = 0, n = 0) {
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e),
      this.GetItem(3)?.SetUIActive(i);
    (e = this.GetItem(2)), (i = this.GetText(1));
    let o = !0;
    0 < a &&
      ((a = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(a)),
      (o = ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(
        a.Id,
      ))),
      o
        ? (e?.SetUIActive(!1),
          i?.SetUIActive(!0),
          i?.SetText(`<color=#ffe65a>${r}</color>/` + n))
        : (e?.SetUIActive(!0), i?.SetUIActive(!1));
  }
}
exports.FishTipItem = FishTipItem;
//# sourceMappingURL=FishTipItem.js.map
