"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportMarkItemView = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class PunishReportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e),
      (this.ihh = void 0),
      (this.Y7a = () => {
        this.ihh.UpdateIconPath(), this.OnIconPathChanged(this.Holder.IconPath);
      }),
      (this.ihh = e);
  }
  OnInitialize() {
    super.OnInitialize(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPunishMarkStateChanged,
        this.Y7a,
      );
  }
  OnAfterShow() {
    this.ihh.UpdateIconPath(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, t, i) {
    this.ihh.UpdateIconPath(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnIconPathChanged(e) {
    super.OnIconPathChanged(this.Holder.IconPath);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPunishMarkStateChanged,
      this.Y7a,
    );
  }
}
exports.PunishReportMarkItemView = PunishReportMarkItemView;
//# sourceMappingURL=PunishReportMarkItemView.js.map
