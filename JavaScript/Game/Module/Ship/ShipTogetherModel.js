"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTogetherModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ShipTogetherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.$Bl = !1),
      (this.CurrentSelectTogetherRoleId = 0),
      (this.ShipTogetherRoleId = 0),
      (this.M6l = (e) => {
        ("Gongduola" !== e.VehicleType &&
          "AutoMoveGongduola" !== e.VehicleType) ||
          !e.IsRolePassenger(!0) ||
          ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1009, 1) ||
          ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(
            1009,
            void 0,
            !0,
          );
      }),
      (this.E6l = (e) => {
        ("Gongduola" !== e.VehicleType &&
          "AutoMoveGongduola" !== e.VehicleType) ||
          (e.IsRolePassenger(!0) &&
            (ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1),
            (e =
              ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId()),
            ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(
              e,
              void 0,
              !0,
            )));
      }),
      (this.XBl = (e) => {
        (this.ShipTogetherRoleId = e), this.$bl();
      }),
      (this.YBl = () => {
        (this.ShipTogetherRoleId = 0), this.zbl();
      }),
      (this.zBl = () => {
        this.$Bl = !0;
      }),
      (this.JBl = () => {
        (this.$Bl = !1), (this.ShipTogetherRoleId = 0);
      });
  }
  get IsShipTogether() {
    return this.$Bl;
  }
  OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse,
        this.XBl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse,
        this.YBl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterVehicleRideSharing,
        this.zBl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveVehicleRideSharing,
        this.JBl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.M6l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.E6l,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse,
        this.XBl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse,
        this.YBl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterVehicleRideSharing,
        this.zBl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveVehicleRideSharing,
        this.JBl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.M6l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.E6l,
      ),
      !0
    );
  }
  $bl() {
    var e =
        ModelManager_1.ModelManager.VehicleModel?.RideSharingInfo?.RoleId ?? 0,
      t =
        ModelManager_1.ModelManager.VehicleModel?.RideSharingInfo
          ?.RoleCreatureId ?? 0;
    t &&
      e &&
      ModelManager_1.ModelManager.GameAudioModel.RegisterDriveAudioEvent(e, t);
  }
  zbl() {
    ModelManager_1.ModelManager.GameAudioModel.RemoveDriveAudioEvent();
  }
}
exports.ShipTogetherModel = ShipTogetherModel;
//# sourceMappingURL=ShipTogetherModel.js.map
