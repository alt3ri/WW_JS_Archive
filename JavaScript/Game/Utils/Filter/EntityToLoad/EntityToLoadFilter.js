"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityToLoadFilter =
    exports.LOADING_INTERVAL =
    exports.MAX_LOADING_ENTITY_COUNT =
      void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Filter_1 = require("../Core/Filter");
(exports.MAX_LOADING_ENTITY_COUNT = 4), (exports.LOADING_INTERVAL = 0);
class EntityToLoadFilter extends Filter_1.Filter {
  constructor() {
    super(...arguments),
      (this.Lkc = exports.MAX_LOADING_ENTITY_COUNT),
      (this.wkc = exports.LOADING_INTERVAL),
      (this.MaxLoadingDebugName = this.DebugName),
      (this.LoadingIntervalDebugName = this.DebugName);
  }
  get DebugName() {
    return "EntityToLoadFilter";
  }
  get MaxLoadingCount() {
    return this.Lkc;
  }
  set MaxLoadingCount(t) {
    this.Lkc !== t &&
      ((this.Lkc = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.EntityToLoadParamUpdated,
        this,
      ));
  }
  get LoadingInterval() {
    return this.wkc;
  }
  set LoadingInterval(t) {
    this.wkc !== t &&
      ((this.wkc = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.EntityToLoadParamUpdated,
        this,
      ));
  }
  OnInit() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.EntityToLoadFilterCreated,
      this,
    );
  }
  OnCleanup() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.EntityToLoadFilterDestroyed,
      this,
    );
  }
  static Create() {
    var t = new EntityToLoadFilter();
    return t.Init(), t;
  }
}
exports.EntityToLoadFilter = EntityToLoadFilter;
//# sourceMappingURL=EntityToLoadFilter.js.map
