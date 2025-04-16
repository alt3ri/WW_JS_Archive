"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayReportMarkItemView = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class LevelPlayReportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e),
      (this.it_ = () => {
        this.MarkItemTopRightIconHandle.Update();
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LevelPlayStateDetailUpdate,
        this.it_,
      );
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LevelPlayStateDetailUpdate,
      this.it_,
    );
  }
  OnAfterShow() {
    this.UpdateIcon();
  }
  UpdateIcon() {
    this.OnIconPathChanged(this.Holder.IconPath),
      this.MarkItemTopRightIconHandle.Update();
  }
}
exports.LevelPlayReportMarkItemView = LevelPlayReportMarkItemView;
//# sourceMappingURL=LevelPlayReportMarkItemView.js.map
