"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapPlayerComponent = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Map/Base/MapComponent"),
  MapUtil_1 = require("../../Map/MapUtil");
class WorldMapPlayerComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.PlayerUiPosition = Vector2D_1.Vector2D.Create(0, 0)),
      (this.PlayerWorldPosition = void 0),
      (this.PlayerRotation = -0),
      (this.PlayerOutOfBound = !1);
  }
  get ComponentType() {
    return 5;
  }
  UpdatePlayerPosition() {
    var e,
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t &&
      (t = t.Entity.GetComponent(3)) &&
      ((e = MapUtil_1.MapUtil.GetCurrentBigMapId()),
      MapUtil_1.MapUtil.IsInBigWorld(e)
        ? (this.PlayerWorldPosition = t.ActorLocationProxy)
        : ((e =
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
              .RecoverWorldLocation),
          (this.PlayerWorldPosition = Vector_1.Vector.Create(
            e[1] ?? 0,
            e[2] ?? 0,
            e[3] ?? 0,
          ))),
      (e = Vector2D_1.Vector2D.Create(
        this.PlayerWorldPosition.X,
        this.PlayerWorldPosition.Y,
      )),
      (this.PlayerUiPosition = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(
        e,
        e,
      )),
      (this.PlayerRotation = -(t.ActorRotation.Yaw + 90)));
  }
}
exports.WorldMapPlayerComponent = WorldMapPlayerComponent;
//# sourceMappingURL=WorldMapPlayerComponent.js.map
