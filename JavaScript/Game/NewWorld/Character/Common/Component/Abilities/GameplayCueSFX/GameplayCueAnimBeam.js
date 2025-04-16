"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueAnimBeam = void 0);
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueBeamCommonItem_1 = require("./CommonItem/GameplayCueBeamCommonItem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueAnimBeam extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments), (this.v$o = void 0), (this.p$o = void 0);
  }
  OnInit() {
    this.p$o = new Array();
    var a = this.CueConfig.Socket.split("#");
    for (let e = 0, t = a?.length; e < t; e++)
      this.p$o.push(FNameUtil_1.FNameUtil.GetDynamicFName(a[e]));
  }
  OnTick(e) {
    var t = this.p$o.map((e) => this.ActorInternal.Mesh.D_GetSocketLocation(e));
    this.v$o.Tick(t, e);
  }
  OnCreate() {
    this.v$o = GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(
      this.ActorInternal,
      this.CueConfig.Path,
    );
  }
  OnDestroy() {
    this.v$o.Destroy();
  }
  OnEnable() {
    this.v$o.GetOwner().SetActorHiddenInGame(!1);
  }
  OnDisable() {
    this.v$o.GetOwner().SetActorHiddenInGame(!0);
  }
}
exports.GameplayCueAnimBeam = GameplayCueAnimBeam;
//# sourceMappingURL=GameplayCueAnimBeam.js.map
