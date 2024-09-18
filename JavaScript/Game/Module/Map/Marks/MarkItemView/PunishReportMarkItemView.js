"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportMarkItemView = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class PunishReportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e),
      (this.OZa = void 0),
      (this._Va = () => {
        this.OZa.UpdateIconPath(), this.OnIconPathChanged(this.Holder.IconPath);
      }),
      (this.OZa = e);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.OnIconPathChanged(this.Holder.IconPath),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPunishMarkStateChanged,
        this._Va,
      );
  }
  OnAfterShow() {
    this.OZa.UpdateIconPath(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, t, i) {
    this.OZa.UpdateIconPath(), this.OnIconPathChanged(this.Holder.IconPath);
    var s,
      n = this.OZa.IsPunishReportFinish();
    n &&
      ((s =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_ComIconFinish",
        )),
      this.SetSpriteByPath(s, this.GetSprite(4), !1)),
      this.GetSprite(4).SetUIActive(n);
  }
  OnIconPathChanged(e) {
    super.OnIconPathChanged(this.Holder.IconPath);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPunishMarkStateChanged,
      this._Va,
    );
  }
}
exports.PunishReportMarkItemView = PunishReportMarkItemView;
//# sourceMappingURL=PunishReportMarkItemView.js.map
