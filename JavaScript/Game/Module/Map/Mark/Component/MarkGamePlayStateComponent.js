"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkGamePlayStateComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Base/MapComponent");
class MarkGamePlayStateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.EventUpdateLevelPlayState = (e) => {
        this.ParentEntity.GetComponent(15).MapMarkConfig.RelativeId === e &&
          this.UpdateLevelPlayState();
      });
  }
  get ComponentType() {
    return 13;
  }
  OnInit() {
    this.UpdateLevelPlayState();
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLevelPlayStateChange,
      this.EventUpdateLevelPlayState,
    );
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLevelPlayStateChange,
      this.EventUpdateLevelPlayState,
    );
  }
  UpdateLevelPlayState() {
    var t = this.ParentEntity.GetComponent(15).MapMarkConfig.RelativeId,
      t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t);
    if (t) {
      let e = 0;
      switch (t.PlayState) {
        case 3:
        case 4:
          e = 2;
          break;
        case 1:
        case 0:
          e = 0;
          break;
        case 2:
          e = 1;
      }
      this.ParentEntity.GetComponent(10).GamePlayState = e;
    }
  }
}
exports.MarkGamePlayStateComponent = MarkGamePlayStateComponent;
//# sourceMappingURL=MarkGamePlayStateComponent.js.map
