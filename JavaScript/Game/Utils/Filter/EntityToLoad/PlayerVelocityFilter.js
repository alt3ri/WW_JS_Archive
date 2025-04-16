"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerVelocityFilter = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Criteria_1 = require("../Core/Criteria"),
  EntityToLoadFilter_1 = require("./EntityToLoadFilter"),
  HIGH_SPEED_MAX_LOADING_ENTITY_COUNT = 1,
  HIGH_SPEED_LOADING_INTERVAL = 10;
class PlayerVelocityFilter extends EntityToLoadFilter_1.EntityToLoadFilter {
  constructor() {
    super(...arguments),
      (this.TargetCriteriaInternal = Criteria_1.alwaysTrueCriteria),
      (this.rya = (e) => {
        (this.MaxLoadingCount = e
          ? HIGH_SPEED_MAX_LOADING_ENTITY_COUNT
          : EntityToLoadFilter_1.MAX_LOADING_ENTITY_COUNT),
          (this.LoadingInterval = e
            ? HIGH_SPEED_LOADING_INTERVAL
            : EntityToLoadFilter_1.LOADING_INTERVAL);
      });
  }
  get DebugName() {
    return "PlayerVelocityFilter";
  }
  Init() {
    super.Init(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHighSpeedModeChanged,
        this.rya,
      );
  }
  Cleanup() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHighSpeedModeChanged,
      this.rya,
    ),
      super.Cleanup();
  }
}
exports.PlayerVelocityFilter = PlayerVelocityFilter;
//# sourceMappingURL=PlayerVelocityFilter.js.map
