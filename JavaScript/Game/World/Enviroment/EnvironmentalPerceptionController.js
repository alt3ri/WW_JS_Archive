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
  CreatureModel_1 = require("../Model/CreatureModel"),
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
      (this.Jvr = Stats_1.Stat.Create("CheckIsPlayerInMapPolygon")),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      this.Lie && this.Lie.RemoveTagAddOrRemoveListener(1996802261, this.v7e),
      (this.Lie = void 0),
      !(this.Gce = void 0)
    );
  }
  static OnLeaveLevel() {
    return !0;
  }
  static OnTick(e) {
    (this.zvr -= e),
      Global_1.Global.BaseCharacter &&
        this.Gce &&
        this.Gce.CharacterMovement &&
        (this.Gce.IsMoving &&
          (this.Zvr
            ? (this.zvr -= e * TICK_DAMPING_RATIO_INFIGHT)
            : (this.zvr -= e * TICK_DAMPING_RATIO)),
        this.Gce.GetLastUpdateVelocity().Size() > FORCE_UPDATE_SPEED &&
          (this.zvr = -1),
        this.zvr < 0) &&
        ((this.zvr = TICK_INTERNVAL),
        SimpleNpcController_1.SimpleNpcController.UpdateDistanceLogic(),
        this.eMr());
  }
  static eMr() {
    var e = Global_1.Global.BaseCharacter;
    e &&
      (e = e.CharacterActorComponent) &&
      (this.Jvr.Start(),
      (e = ModelManager_1.ModelManager.MapModel.IsInMapPolygon(
        e.ActorLocationProxy,
      )),
      this.Jvr.Stop(),
      e
        ? UnopenedAreaController_1.UnopenedAreaController.OnExitUnopenedArea()
        : UnopenedAreaController_1.UnopenedAreaController.OnEnterUnopenedArea());
  }
  static InitializeEnvironment() {
    var t = UE.NewMap(UE.BuiltinName, UE.BuiltinInt);
    for (
      let e = 0;
      e < CreatureModel_1.globalEntityTypePerceptionType.length;
      e++
    )
      t.Add(
        new UE.FName(CreatureModel_1.globalEntityTypeQueryName[e]),
        CreatureModel_1.globalEntityTypePerceptionType[e],
      );
    t.Add(new UE.FName("CustomStabilizeLow"), 2),
      t.Add(new UE.FName("AlwaysTickHotFix"), 7),
      cpp_1.FKuroPerceptionInterface.InitializeEnvironment(3e3, 3e3, t, !0);
  }
  static CreatePlayerPerceptionEvent() {
    var e = this.tMr.Get();
    return e || this.tMr.Create();
  }
  static DestroyPlayerPerceptionEvent(e) {
    e && (e.Clear(), this.tMr.Put(e));
  }
  static CreatePerceptionRange() {
    var e = this.iMr.Get();
    return e || this.iMr.Create();
  }
  static DestroyPerceptionRange(e) {
    e && (e.Clear(), this.iMr.Put(e));
  }
}
(exports.EnvironmentalPerceptionController = EnvironmentalPerceptionController),
  ((_a = EnvironmentalPerceptionController).zvr = TICK_INTERNVAL),
  (EnvironmentalPerceptionController.Gce = void 0),
  (EnvironmentalPerceptionController.Lie = void 0),
  (EnvironmentalPerceptionController.Jvr = void 0),
  (EnvironmentalPerceptionController.xie = (e, t) => {
    _a.Lie && _a.Lie.RemoveTagAddOrRemoveListener(1996802261, _a.v7e),
      (_a.Gce = EntitySystem_1.EntitySystem.GetComponent(e.Id, 164)),
      (_a.Lie = EntitySystem_1.EntitySystem.GetComponent(e.Id, 190)),
      _a.Lie?.AddTagAddOrRemoveListener(1996802261, _a.v7e);
  }),
  (EnvironmentalPerceptionController.Zvr = !1),
  (EnvironmentalPerceptionController.v7e = (e, t) => {
    _a.Zvr = t;
  }),
  (EnvironmentalPerceptionController.oMr = () =>
    new PlayerPerceptionEvent_1.PlayerPerceptionEvent()),
  (EnvironmentalPerceptionController.tMr = new Pool_1.Pool(
    PERCEPTION_EVENT_POOL_CAPACITY,
    _a.oMr,
  )),
  (EnvironmentalPerceptionController.rMr = () =>
    new PerceptionRange_1.PerceptionRange()),
  (EnvironmentalPerceptionController.iMr = new Pool_1.Pool(
    PERCEPTION_EVENT_POOL_CAPACITY,
    _a.rMr,
  ));
//# sourceMappingURL=EnvironmentalPerceptionController.js.map
