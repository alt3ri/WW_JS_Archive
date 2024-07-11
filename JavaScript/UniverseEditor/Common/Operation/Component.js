"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.componentConfig =
    exports.getActionsByComponentType =
    exports.getBlueprintComponents =
    exports.getBaseActions =
      void 0);
const Init_1 = require("../../Interface/Init"),
  Action_1 = require("./Action"),
  actionsByComponentAki = {
    TriggerComponent: [
      "FireBulletEffect",
      "AddBuffToTriggeredEntity",
      "RemoveBuffToTriggeredEntity",
      "DetectTrigger",
    ],
    ItemFoundation: ["ItemFoundationMatch"],
    SceneActorRefComponent: [
      "EnableActor",
      "PlayLevelSequence",
      "ModifyActorMaterial",
      "ToggleAirWall",
    ],
  },
  actionsByComponentUe5 = {
    TriggerComponent: [
      "FireBulletEffect",
      "AddBuffToTriggeredEntity",
      "RemoveBuffToTriggeredEntity",
      "DetectTrigger",
    ],
    ItemFoundation: ["ItemFoundationMatch"],
    ActorStateComponent: ["ChangeActorState"],
    BehaviorFlowComponent: ["ChangeBehaviorState", "SetBehaviorIsPaused"],
    CalculateComponent: [
      "SetNumberVar",
      "SyncVarToActorState",
      "DoCalculate",
      "CallFunction",
      "CallByCondition",
    ],
    EntitySpawnerComponent: ["SpawnChild", "Destroy", "DestroyAllChild"],
    EventComponent: ["Activate"],
    FlowComponent: ["ChangeState"],
    InteractiveComponent: [],
    MoveComponent: ["MoveToPos", "SetPos", "FaceToPos", "SetMoveSpeed"],
    SimpleComponent: ["SimpleMove"],
  },
  bpComponentsUe5 = [
    "ActorStateComponent",
    "BehaviorFlowComponent",
    "CalculateComponent",
    "EntitySpawnerComponent",
    "EventComponent",
    "FlowComponent",
    "GrabComponent",
    "InteractiveComponent",
    "LampComponent",
    "MoveComponent",
    "NpcComponent",
    "RefreshEntityComponent",
    "RefreshSingleComponent",
    "RotatorComponent",
    "SimpleComponent",
    "SphereComponent",
    "SphereFactoryComponent",
    "SpringBoardComponent",
    "SpringComponent",
    "StateComponent",
    "SwitcherComponent",
    "TalkComponent",
    "TrampleUe5Component",
    "TriggerUe5Component",
    "UndergroundComponent",
    "TreasureBoxComponent",
  ],
  bpComponentsAki = [
    "AiComponent",
    "VarComponent",
    "InteractComponent",
    "AttributeComponent",
    "RewardComponent",
    "BaseInfoComponent",
    "TreasureBoxComponent",
    "TriggerComponent",
    "EntityStateComponent",
  ];
function getBaseActions() {
  return (0, Action_1.getActions)(
    (0, Init_1.isUe5)() ? "ue5" : "aki",
    "entity",
    !0,
  );
}
function getBlueprintComponents() {
  return (0, Init_1.isUe5)() ? bpComponentsUe5 : bpComponentsAki;
}
function getActionsByComponentType(e) {
  return actionsByComponentUe5[e] ?? [];
}
(exports.getBaseActions = getBaseActions),
  (exports.getBlueprintComponents = getBlueprintComponents),
  (exports.getActionsByComponentType = getActionsByComponentType),
  (exports.componentConfig = {
    BaseActions: getBaseActions(),
    ActionsByComponent: (0, Init_1.isUe5)()
      ? actionsByComponentUe5
      : actionsByComponentAki,
  });
//# sourceMappingURL=Component.js.map
