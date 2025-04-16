"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkCommonGamePlayStateComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Base/MapComponent");
class MarkCommonGamePlayStateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.HasRequestGamePlay = !1),
      (this.OnLevelPlayStateUpdate = () => {
        this.dWl();
      }),
      (this.EventUpdateLevelPlayState = (e) => {
        var t = this.ParentEntity.GetComponent(15);
        t.MapMarkConfig.RelativeId === e &&
          ((e = t.MapMarkConfig),
          ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestSingleLevelPlayStateListAsync(
            e.RelativeDungeonId,
            e.RelativeId,
          ),
          this.dWl());
      });
  }
  get ComponentType() {
    return 14;
  }
  OnInit() {
    this.dWl();
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LevelPlayStateDetailUpdate,
      this.OnLevelPlayStateUpdate,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLevelPlayStateChange,
        this.EventUpdateLevelPlayState,
      );
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LevelPlayStateDetailUpdate,
      this.OnLevelPlayStateUpdate,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLevelPlayStateChange,
        this.EventUpdateLevelPlayState,
      );
  }
  dWl() {
    var e = this.ParentEntity.GetComponent(15).MapMarkConfig;
    let t = 0;
    ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayHide(
      e.RelativeDungeonId,
      e.RelativeId,
    )
      ? (t = 3)
      : ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayComplete(
          e.RelativeDungeonId,
          e.RelativeId,
        ) && (t = 2),
      (this.ParentEntity.GetComponent(10).GamePlayState = t);
  }
  NeedRequestGamePlayState() {
    return (
      !this.HasRequestGamePlay &&
      0 !== this.ParentEntity.GetComponent(15).MapMarkConfig.RelativeId
    );
  }
}
exports.MarkCommonGamePlayStateComponent = MarkCommonGamePlayStateComponent;
//# sourceMappingURL=MarkCommonGamePlayStateComponent.js.map
