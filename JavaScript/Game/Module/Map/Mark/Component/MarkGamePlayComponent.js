"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkGamePlayComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Base/MapComponent");
class MarkGamePlayComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.MarkId = 0),
      (this.MarkType = 0),
      (this.MapId = 0),
      (this.Gravity = 0);
  }
  get ComponentType() {
    return 10;
  }
  set GamePlayState(e) {
    this.PropertyMap.set(0, e);
  }
  get GamePlayState() {
    return this.PropertyMap.tryGet(0, 0);
  }
  get IsFinish() {
    return 2 === this.GamePlayState;
  }
  get IsHide() {
    return 3 === this.GamePlayState;
  }
  get IsDisable() {
    return (
      ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.MarkId)
        .ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable ||
      this.IsHide
    );
  }
  get IsTeleportLocked() {
    return (
      ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.MarkId)
        .ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable ||
      !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(this.MarkId)
    );
  }
  get InGravityLayer() {
    return (
      0 === this.Gravity ||
      this.Gravity === ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity
    );
  }
  get CanShowGravityChildIcon() {
    return 0 !== this.Gravity && !this.InGravityLayer;
  }
}
exports.MarkGamePlayComponent = MarkGamePlayComponent;
//# sourceMappingURL=MarkGamePlayComponent.js.map
