"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerCurrencyItem = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines");
class PowerCurrencyItem extends CommonCurrencyItem_1.CommonCurrencyItem {
  constructor() {
    super(...arguments),
      (this.wQs = 0),
      (this.BQs = (e) => {
        var t, r, n;
        this.wQs === e &&
          ((t = (e =
            ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
              e,
            )).GetCurrentPower()),
          (r = e.GetPowerLimit()),
          (n = e.GetPowerCurrencyShowTextId()),
          this.SetCountTextNew(n, t, r),
          (n = e.IfNeedShowMax() && r <= t),
          this.RefreshMaxItem(n));
      });
  }
  OnStart() {
    super.OnStart(), this.AddOverPowerEventListener();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.RemoveOverPowerEventListener();
  }
  AddOverPowerEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPowerChangedWithId,
      this.BQs,
    );
  }
  RemoveOverPowerEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPowerChangedWithId,
      this.BQs,
    );
  }
  RefreshTemp(e, t) {
    this.ShowWithoutText(e);
  }
  ShowWithoutText(e) {
    (this.wQs = e), super.ShowWithoutText(e), this.BQs(e);
  }
  RefreshAddButtonActive() {
    this.SetButtonActive(
      this.wQs === ItemDefines_1.EItemId.Power &&
        !UiManager_1.UiManager.IsViewOpen("PowerView"),
    );
  }
}
exports.PowerCurrencyItem = PowerCurrencyItem;
//# sourceMappingURL=PowerCurrencyItem.js.map
