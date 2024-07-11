"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridCoolDownComponent = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCoolDownComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  OnRefresh(e) {
    var i,
      t = e.CoolDown,
      e = e.TotalCdTime;
    t && e
      ? (this.GetSprite(0).SetFillAmount(t / e),
        this.SetActive(!0),
        (e = this.GetText(1)),
        t <
        ModelManager_1.ModelManager.MediumItemGridModel.ItemGridCoolDownSecond
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              e,
              "ItemCdTime_Second",
              t.toFixed(1),
            )
          : ((i = TimeUtil_1.TimeUtil.CalculateRemainingTime(t).TimeValue),
            t < TimeUtil_1.TimeUtil.Hour
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Minute", i)
              : t < TimeUtil_1.TimeUtil.OneDaySeconds
                ? LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Hour", i)
                : LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Day", i)))
      : this.SetActive(!1);
  }
  GetResourceId() {
    return "UiItem_ItemCD";
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.MediumItemGridCoolDownComponent = MediumItemGridCoolDownComponent;
//# sourceMappingURL=MediumItemGridCoolDownComponent.js.map
