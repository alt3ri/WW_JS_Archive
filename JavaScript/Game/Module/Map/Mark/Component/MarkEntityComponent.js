"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkEntityComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Base/MapComponent");
class MarkEntityComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.EntityId = void 0),
      (this.Od1 = (e) => {
        var t = this.ParentEntity.GetComponent(10);
        t.MarkId === e &&
          void 0 !== this.EntityId &&
          ((e = ModelManager_1.ModelManager.MapModel.IsMarkHideByServer(
            t.MapId,
            this.EntityId,
          )),
          (t.GamePlayState = e ? 3 : t.GamePlayState));
      });
  }
  get ComponentType() {
    return 18;
  }
  OnInit() {
    var e = this.ParentEntity.GetComponent(10).MarkId;
    this.Od1(e);
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MarkHideState,
      this.Od1,
    );
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MarkHideState,
      this.Od1,
    );
  }
}
exports.MarkEntityComponent = MarkEntityComponent;
//# sourceMappingURL=MarkEntityComponent.js.map
