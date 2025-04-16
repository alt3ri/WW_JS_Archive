"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleFormationButton = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  BattleEntranceButton_1 = require("./BattleEntranceButton");
class BattleFormationButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments), (this.zBl = () => {}), (this.JBl = () => {});
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, UE.UISprite]);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnEnterVehicleRideSharing,
      this.zBl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveVehicleRideSharing,
        this.JBl,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnEnterVehicleRideSharing,
      this.zBl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveVehicleRideSharing,
        this.JBl,
      );
  }
  Initialize(e) {
    super.Initialize(e), this.AddEvents();
  }
  Reset() {
    this.RemoveEvents(), super.Reset();
  }
}
exports.BattleFormationButton = BattleFormationButton;
//# sourceMappingURL=BattleFormationButton.js.map
