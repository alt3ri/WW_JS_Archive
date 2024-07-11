"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineFactory = void 0);
const AiStateMachineAction_1 = require("./Action/AiStateMachineAction");
const AiStateMachineActionActivateSkillGroup_1 = require("./Action/AiStateMachineActionActivateSkillGroup");
const AiStateMachineActionAddBuff_1 = require("./Action/AiStateMachineActionAddBuff");
const AiStateMachineActionChangeInstState_1 = require("./Action/AiStateMachineActionChangeInstState");
const AiStateMachineActionCue_1 = require("./Action/AiStateMachineActionCue");
const AiStateMachineActionEnterFight_1 = require("./Action/AiStateMachineActionEnterFight");
const AiStateMachineActionRemoveBuff_1 = require("./Action/AiStateMachineActionRemoveBuff");
const AiStateMachineActionResetPart_1 = require("./Action/AiStateMachineActionResetPart");
const AiStateMachineActionResetStatus_1 = require("./Action/AiStateMachineActionResetStatus");
const AiStateMachineActionStopMontage_1 = require("./Action/AiStateMachineActionStopMontage");
const AiStateMachineCondition_1 = require("./Condition/AiStateMachineCondition");
const AiStateMachineConditionAnd_1 = require("./Condition/AiStateMachineConditionAnd");
const AiStateMachineConditionAttribute_1 = require("./Condition/AiStateMachineConditionAttribute");
const AiStateMachineConditionAttributeRate_1 = require("./Condition/AiStateMachineConditionAttributeRate");
const AiStateMachineConditionBuffStack_1 = require("./Condition/AiStateMachineConditionBuffStack");
const AiStateMachineConditionCheckInstState_1 = require("./Condition/AiStateMachineConditionCheckInstState");
const AiStateMachineConditionCheckState_1 = require("./Condition/AiStateMachineConditionCheckState");
const AiStateMachineConditionHate_1 = require("./Condition/AiStateMachineConditionHate");
const AiStateMachineConditionLeaveFight_1 = require("./Condition/AiStateMachineConditionLeaveFight");
const AiStateMachineConditionListenBeHit_1 = require("./Condition/AiStateMachineConditionListenBeHit");
const AiStateMachineConditionMontageTimeRemaining_1 = require("./Condition/AiStateMachineConditionMontageTimeRemaining");
const AiStateMachineConditionOr_1 = require("./Condition/AiStateMachineConditionOr");
const AiStateMachineConditionPartLife_1 = require("./Condition/AiStateMachineConditionPartLife");
const AiStateMachineConditionTag_1 = require("./Condition/AiStateMachineConditionTag");
const AiStateMachineConditionTaskFinish_1 = require("./Condition/AiStateMachineConditionTaskFinish");
const AiStateMachineConditionTimer_1 = require("./Condition/AiStateMachineConditionTimer");
const AiStateMachineConditionTrue_1 = require("./Condition/AiStateMachineConditionTrue");
const AiStateMachineState_1 = require("./State/AiStateMachineState");
const AiStateMachineStateAiHateConfig_1 = require("./State/AiStateMachineStateAiHateConfig");
const AiStateMachineStateAiSenseEnable_1 = require("./State/AiStateMachineStateAiSenseEnable");
const AiStateMachineStateBoneCollision_1 = require("./State/AiStateMachineStateBoneCollision");
const AiStateMachineStateBoneVisible_1 = require("./State/AiStateMachineStateBoneVisible");
const AiStateMachineStateBuff_1 = require("./State/AiStateMachineStateBuff");
const AiStateMachineStateCollisionChannel_1 = require("./State/AiStateMachineStateCollisionChannel");
const AiStateMachineStateCue_1 = require("./State/AiStateMachineStateCue");
const AiStateMachineStateDeathMontage_1 = require("./State/AiStateMachineStateDeathMontage");
const AiStateMachineStateDisableActor_1 = require("./State/AiStateMachineStateDisableActor");
const AiStateMachineStateDisableCollision_1 = require("./State/AiStateMachineStateDisableCollision");
const AiStateMachineStateMeshVisible_1 = require("./State/AiStateMachineStateMeshVisible");
const AiStateMachineStatePalsy_1 = require("./State/AiStateMachineStatePalsy");
const AiStateMachineStatePartPanelVisible_1 = require("./State/AiStateMachineStatePartPanelVisible");
const AiStateMachineStateTag_1 = require("./State/AiStateMachineStateTag");
const AiStateMachineTask_1 = require("./Task/AiStateMachineTask");
const AiStateMachineTaskLeaveFight_1 = require("./Task/AiStateMachineTaskLeaveFight");
const AiStateMachineTaskMontage_1 = require("./Task/AiStateMachineTaskMontage");
const AiStateMachineTaskMoveToTarget_1 = require("./Task/AiStateMachineTaskMoveToTarget");
const AiStateMachineTaskPatrol_1 = require("./Task/AiStateMachineTaskPatrol");
const AiStateMachineTaskRandomMontage_1 = require("./Task/AiStateMachineTaskRandomMontage");
const AiStateMachineTaskSkill_1 = require("./Task/AiStateMachineTaskSkill");
class AiStateMachineFactory {
  CreateTask(i, e) {
    let t = void 0;
    try {
      switch (e.Type) {
        case 1:
        case 2:
          t = new AiStateMachineTaskSkill_1.AiStateMachineTaskSkill(i, e);
          break;
        case 101:
          t = new AiStateMachineTaskLeaveFight_1.AiStateMachineTaskLeaveFight(
            i,
            e,
          );
          break;
        case 102:
          t = new AiStateMachineTaskMontage_1.AiStateMachineTaskMontage(i, e);
          break;
        case 3:
          t =
            new AiStateMachineTaskRandomMontage_1.AiStateMachineTaskRandomMontage(
              i,
              e,
            );
          break;
        case 103:
          t =
            new AiStateMachineTaskMoveToTarget_1.AiStateMachineTaskMoveToTarget(
              i,
              e,
            );
          break;
        case 104:
          t = new AiStateMachineTaskPatrol_1.AiStateMachineTaskPatrol(i, e);
          break;
        default:
          t = new AiStateMachineTask_1.AiStateMachineTask(i, e);
      }
    } catch (e) {
      let t = "";
      e instanceof Error && (t = e.message),
        i.Owner.PushErrorMessage(
          `初始化主状态失败异常 [${i.Name}|${i.Uuid}]
error:` + t,
        );
    }
    return t?.Init(), t;
  }

  CreateState(i, e) {
    let t = void 0;
    try {
      switch (e.Type) {
        case 1:
          t = new AiStateMachineStateBuff_1.AiStateMachineStateBuff(i, e);
          break;
        case 3:
          t = new AiStateMachineStateTag_1.AiStateMachineStateTag(i, e);
          break;
        case 111:
          t =
            new AiStateMachineStatePartPanelVisible_1.AiStateMachineStatePartPanelVisible(
              i,
              e,
            );
          break;
        case 102:
          t =
            new AiStateMachineStateAiHateConfig_1.AiStateMachineStateAiHateConfig(
              i,
              e,
            );
          break;
        case 103:
          t =
            new AiStateMachineStateAiSenseEnable_1.AiStateMachineStateAiSenseEnable(
              i,
              e,
            );
          break;
        case 104:
          t = new AiStateMachineStateCue_1.AiStateMachineStateCue(i, e);
          break;
        case 105:
          t =
            new AiStateMachineStateDisableActor_1.AiStateMachineStateDisableActor(
              i,
              e,
            );
          break;
        case 108:
          t =
            new AiStateMachineStateBoneVisible_1.AiStateMachineStateBoneVisible(
              i,
              e,
            );
          break;
        case 109:
          t =
            new AiStateMachineStateMeshVisible_1.AiStateMachineStateMeshVisible(
              i,
              e,
            );
          break;
        case 110:
          t =
            new AiStateMachineStateBoneCollision_1.AiStateMachineStateBoneCollision(
              i,
              e,
            );
          break;
        case 112:
          t =
            new AiStateMachineStateDeathMontage_1.AiStateMachineStateDeathMontage(
              i,
              e,
            );
          break;
        case 113:
          t = new AiStateMachineStatePalsy_1.AiStateMachineStatePalsy(i, e);
          break;
        case 114:
          t =
            new AiStateMachineStateCollisionChannel_1.AiStateMachineStateCollisionChannel(
              i,
              e,
            );
          break;
        case 115:
          t =
            new AiStateMachineStateDisableCollision_1.AiStateMachineStateDisableCollision(
              i,
              e,
            );
          break;
        default:
          t = new AiStateMachineState_1.AiStateMachineState(i, e);
      }
    } catch (e) {
      let t = "";
      e instanceof Error && (t = e.message),
        i.Owner.PushErrorMessage(
          `初始化节点绑定状态异常 [${i.Name}|${i.Uuid}]
error:` + t,
        );
    }
    return t?.Init(), t;
  }

  CreateAction(i, e) {
    let t = void 0;
    try {
      switch (e.Type) {
        case 1:
          t = new AiStateMachineActionAddBuff_1.AiStateMachineActionAddBuff(
            i,
            e,
          );
          break;
        case 2:
          t =
            new AiStateMachineActionRemoveBuff_1.AiStateMachineActionRemoveBuff(
              i,
              e,
            );
          break;
        case 7:
          t =
            new AiStateMachineActionResetStatus_1.AiStateMachineActionResetStatus(
              i,
              e,
            );
          break;
        case 8:
          t =
            new AiStateMachineActionEnterFight_1.AiStateMachineActionEnterFight(
              i,
              e,
            );
          break;
        case 11:
          t =
            new AiStateMachineActionChangeInstState_1.AiStateMachineActionChangeInstState(
              i,
              e,
            );
          break;
        case 12:
          t = new AiStateMachineActionResetPart_1.AiStateMachineActionResetPart(
            i,
            e,
          );
          break;
        case 101:
          t = new AiStateMachineActionCue_1.AiStateMachineActionCue(i, e);
          break;
        case 14:
          t =
            new AiStateMachineActionActivateSkillGroup_1.AiStateMachineActionActivateSkillGroup(
              i,
              e,
            );
          break;
        case 102:
          t =
            new AiStateMachineActionStopMontage_1.AiStateMachineActionStopMontage(
              i,
              e,
            );
          break;
        default:
          t = new AiStateMachineAction_1.AiStateMachineAction(i, e);
      }
    } catch (e) {
      let t = "";
      e instanceof Error && (t = e.message),
        i.Owner.PushErrorMessage(
          `初始化节点Action失败，初始化异常，node[${i.Name}|${i.Uuid}]
error:` + t,
        );
    }
    return t?.Init(), t;
  }

  CreateCondition(i, a, e) {
    let t = void 0;
    try {
      switch (a.Type) {
        case 1:
          t = new AiStateMachineConditionAnd_1.AiStateMachineConditionAnd(
            i,
            a,
            e,
          );
          break;
        case 2:
          t = new AiStateMachineConditionOr_1.AiStateMachineConditionOr(
            i,
            a,
            e,
          );
          break;
        case 4:
          t = new AiStateMachineConditionTrue_1.AiStateMachineConditionTrue(
            i,
            a,
            e,
          );
          break;
        case 17:
          t =
            new AiStateMachineConditionAttribute_1.AiStateMachineConditionAttribute(
              i,
              a,
              e,
            );
          break;
        case 18:
          t =
            new AiStateMachineConditionAttributeRate_1.AiStateMachineConditionAttributeRate(
              i,
              a,
              e,
            );
          break;
        case 20:
          t = new AiStateMachineConditionHate_1.AiStateMachineConditionHate(
            i,
            a,
            e,
          );
          break;
        case 24:
        case 19:
          t =
            new AiStateMachineConditionCheckState_1.AiStateMachineConditionCheckState(
              i,
              a,
              e,
            );
          break;
        case 14:
          t = new AiStateMachineConditionTag_1.AiStateMachineConditionTag(
            i,
            a,
            e,
          );
          break;
        case 21:
          t =
            new AiStateMachineConditionLeaveFight_1.AiStateMachineConditionLeaveFight(
              i,
              a,
              e,
            );
          break;
        case 22:
          t = new AiStateMachineConditionTimer_1.AiStateMachineConditionTimer(
            i,
            a,
            e,
          );
          break;
        case 25:
          t =
            new AiStateMachineConditionCheckInstState_1.AiStateMachineConditionCheckInstState(
              i,
              a,
              e,
            );
          break;
        case 101:
          t =
            new AiStateMachineConditionTaskFinish_1.AiStateMachineConditionTaskFinish(
              i,
              a,
              e,
            );
          break;
        case 26:
          t =
            new AiStateMachineConditionBuffStack_1.AiStateMachineConditionBuffStack(
              i,
              a,
              e,
            );
          break;
        case 27:
          t =
            new AiStateMachineConditionPartLife_1.AiStateMachineConditionPartLife(
              i,
              a,
              e,
            );
          break;
        case 102:
          t =
            new AiStateMachineConditionMontageTimeRemaining_1.AiStateMachineConditionMontageTimeRemaining(
              i,
              a,
              e,
            );
          break;
        case 103:
          t =
            new AiStateMachineConditionListenBeHit_1.AiStateMachineConditionListenBeHit(
              i,
              a,
              e,
            );
          break;
        default:
          t = new AiStateMachineCondition_1.AiStateMachineCondition(i, a, e);
      }
    } catch (e) {
      let t = "";
      e instanceof Error && (t = e.message),
        i.Node.Owner.PushErrorMessage(
          `初始化节点条件失败，初始化异常，node[${i.Node.Name}|${i.Node.Uuid}]，name[${a.Name}]，type[${a.Type}]
error:` + t,
        );
    }
    return t?.Init(), t;
  }
}
exports.AiStateMachineFactory = AiStateMachineFactory;
// # sourceMappingURL=AiStateMachineFactory.js.map
