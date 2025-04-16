"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionActorLookAtDataHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActorLookAtEmptyData_1 = require("./FbActorLookAtEmptyData"),
  FbActorLookAtEntityData_1 = require("./FbActorLookAtEntityData"),
  FbActorLookAtOtherActor_1 = require("./FbActorLookAtOtherActor"),
  FbActorLookAtPlayerData_1 = require("./FbActorLookAtPlayerData"),
  FbActorLookAtPositionData_1 = require("./FbActorLookAtPositionData"),
  FbActorLookAtTalkerData_1 = require("./FbActorLookAtTalkerData"),
  FbActorLookAtUnLock_1 = require("./FbActorLookAtUnLock");
class UnionActorLookAtDataHelper {
  static GetUnionActorLookAtDataObject(t) {
    switch (t) {
      case fb_action_1.UnionActorLookAtData.ActorLookAtEmptyData:
        return new fb_action_1.ActorLookAtEmptyData();
      case fb_action_1.UnionActorLookAtData.ActorLookAtEntityData:
        return new fb_action_1.ActorLookAtEntityData();
      case fb_action_1.UnionActorLookAtData.ActorLookAtOtherActor:
        return new fb_action_1.ActorLookAtOtherActor();
      case fb_action_1.UnionActorLookAtData.ActorLookAtPlayerData:
        return new fb_action_1.ActorLookAtPlayerData();
      case fb_action_1.UnionActorLookAtData.ActorLookAtPositionData:
        return new fb_action_1.ActorLookAtPositionData();
      case fb_action_1.UnionActorLookAtData.ActorLookAtTalkerData:
        return new fb_action_1.ActorLookAtTalkerData();
      case fb_action_1.UnionActorLookAtData.ActorLookAtUnLock:
        return new fb_action_1.ActorLookAtUnLock();
      default:
        return;
    }
  }
  static ReadUnionActorLookAtData(t, o) {
    if (void 0 !== o)
      switch (t) {
        case fb_action_1.UnionActorLookAtData.ActorLookAtEmptyData:
          return FbActorLookAtEmptyData_1.FbActorLookAtEmptyData.Create(o);
        case fb_action_1.UnionActorLookAtData.ActorLookAtEntityData:
          return FbActorLookAtEntityData_1.FbActorLookAtEntityData.Create(o);
        case fb_action_1.UnionActorLookAtData.ActorLookAtOtherActor:
          return FbActorLookAtOtherActor_1.FbActorLookAtOtherActor.Create(o);
        case fb_action_1.UnionActorLookAtData.ActorLookAtPlayerData:
          return FbActorLookAtPlayerData_1.FbActorLookAtPlayerData.Create(o);
        case fb_action_1.UnionActorLookAtData.ActorLookAtPositionData:
          return FbActorLookAtPositionData_1.FbActorLookAtPositionData.Create(
            o,
          );
        case fb_action_1.UnionActorLookAtData.ActorLookAtTalkerData:
          return FbActorLookAtTalkerData_1.FbActorLookAtTalkerData.Create(o);
        case fb_action_1.UnionActorLookAtData.ActorLookAtUnLock:
          return FbActorLookAtUnLock_1.FbActorLookAtUnLock.Create(o);
        default:
          return;
      }
  }
}
exports.UnionActorLookAtDataHelper = UnionActorLookAtDataHelper;
//# sourceMappingURL=UnionActorLookAtDataHelper.js.map
