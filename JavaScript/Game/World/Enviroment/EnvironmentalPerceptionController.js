"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnvironmentalPerceptionController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Pool_1 = require("../../../Core/Container/Pool"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController"),
  PerceptionRange_1 = require("../../NewWorld/Common/Perception/PerceptionRange"),
  PlayerPerceptionEvent_1 = require("../../NewWorld/Common/Perception/PlayerPerceptionEvent"),
  TICK_INTERNVAL = 8e3,
  TICK_DAMPING_RATIO = 80,
  TICK_DAMPING_RATIO_INFIGHT = 16,
  FORCE_UPDATE_SPEED = 850,
  PERCEPTION_EVENT_POOL_CAPACITY = 32;
class EnvironmentalPerceptionController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      !(this.evr = void 0)
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      this.Lie && this.Lie.RemoveTagAddOrRemoveListener(1996802261, this.n9e),
      (this.Lie = void 0),
      !(this.Gce = void 0)
    );
  }
  static OnLeaveLevel() {
    return !0;
  }
  static OnTick(e) {
    (this.tvr -= e),
      Global_1.Global.BaseCharacter &&
        this.Gce &&
        this.Gce.CharacterMovement &&
        (this.Gce.IsMoving &&
          (this.ivr
            ? (this.tvr -= e * TICK_DAMPING_RATIO_INFIGHT)
            : (this.tvr -= e * TICK_DAMPING_RATIO)),
        this.Gce.GetLastUpdateVelocity().Size() > FORCE_UPDATE_SPEED &&
          (this.tvr = -1),
        this.tvr < 0) &&
        ((this.tvr = TICK_INTERNVAL),
        SimpleNpcController_1.SimpleNpcController.UpdateDistanceLogic(),
        this.ovr());
  }
  static ovr() {
    var e = Global_1.Global.BaseCharacter;
    e &&
      (e = e.CharacterActorComponent) &&
      (ModelManager_1.ModelManager.MapModel.IsInMapPolygon(e.ActorLocationProxy)
        ? UnopenedAreaController_1.UnopenedAreaController.OnExitUnopenedArea()
        : UnopenedAreaController_1.UnopenedAreaController.OnEnterUnopenedArea());
  }
  static InitializeEnvironment() {
    var e = UE.NewMap(UE.BuiltinName, UE.BuiltinInt);
    e.Add(new UE.FName("NormalEntity"), 1),
      e.Add(new UE.FName("CharacterEntity"), 2),
      e.Add(new UE.FName("PlayerAlwaysTickGroup"), 4),
      cpp_1.FKuroPerceptionInterface.InitializeEnvironment(3e3, 3e3, e, !0);
  }
  static CreatePlayerPerceptionEvent() {
    var e = this.rvr.Get();
    return e || this.rvr.Create();
  }
  static DestroyPlayerPerceptionEvent(e) {
    e && (e.Clear(), this.rvr.Put(e));
  }
  static CreatePerceptionRange() {
    var e = this.nvr.Get();
    return e || this.nvr.Create();
  }
  static DestroyPerceptionRange(e) {
    e && (e.Clear(), this.nvr.Put(e));
  }
}
(exports.EnvironmentalPerceptionController = EnvironmentalPerceptionController),
  ((_a = EnvironmentalPerceptionController).tvr = TICK_INTERNVAL),
  (EnvironmentalPerceptionController.Gce = void 0),
  (EnvironmentalPerceptionController.Lie = void 0),
  (EnvironmentalPerceptionController.evr = void 0),
  (EnvironmentalPerceptionController.xie = (e, t) => {
    _a.Lie && _a.Lie.RemoveTagAddOrRemoveListener(1996802261, _a.n9e),
      (_a.Gce = EntitySystem_1.EntitySystem.GetComponent(e.Id, 161)),
      (_a.Lie = EntitySystem_1.EntitySystem.GetComponent(e.Id, 185)),
      _a.Lie?.AddTagAddOrRemoveListener(1996802261, _a.n9e);
  }),
  (EnvironmentalPerceptionController.ivr = !1),
  (EnvironmentalPerceptionController.n9e = (e, t) => {
    _a.ivr = t;
  }),
  (EnvironmentalPerceptionController.svr = () =>
    new PlayerPerceptionEvent_1.PlayerPerceptionEvent()),
  (EnvironmentalPerceptionController.rvr = new Pool_1.Pool(
    PERCEPTION_EVENT_POOL_CAPACITY,
    _a.svr,
  )),
  (EnvironmentalPerceptionController.avr = () =>
    new PerceptionRange_1.PerceptionRange()),
  (EnvironmentalPerceptionController.nvr = new Pool_1.Pool(
    PERCEPTION_EVENT_POOL_CAPACITY,
    _a.avr,
  ));
//# sourceMappingURL=EnvironmentalPerceptionController.js.map
