"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymActivityData = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  LORD_GYM_RED_DOT_CACHE_KEY = 100;
class LordGymActivityData extends ActivityData_1.ActivityBaseData {
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  ReadRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      LORD_GYM_RED_DOT_CACHE_KEY,
      0,
      0,
      1,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  CheckRedDot() {
    return (
      0 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        LORD_GYM_RED_DOT_CACHE_KEY,
        0,
        0,
      )
    );
  }
  GetExDataRedPointShowState() {
    return this.CheckRedDot();
  }
}
exports.LordGymActivityData = LordGymActivityData;
//# sourceMappingURL=LordGymActivityData.js.map
