"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.createFishingBoatSprintCommand =
    exports.fishingBoatVisionSkill1OnRelease =
    exports.fishingBoatVisionSkill1OnPress =
      void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiBlueprintFunctionLibrary_1 = require("../../../../../../Module/BpBridge/UiBlueprintFunctionLibrary"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  InputFunctionCommon_1 = require("./InputFunctionCommon"),
  needConfirmSkillMap = new Map([
    [0, 259],
    [2, 257],
  ]);
function getFishingSkillType(n) {
  switch (n) {
    case 1018:
      return 2;
    case 1019:
      return 0;
    case 1020:
      return 3;
    case 1021:
      return 1;
    default:
      return;
  }
}
function visionSkill1Function(n) {
  var e =
    ModelManager_1.ModelManager.FishingModel.GetShipData().GetEntityHandle()
      ?.Entity;
  if (e?.Valid && (0, InputFunctionCommon_1.canVehicleResponseInput)(e)) {
    var o = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    if (o) {
      let n = 0;
      var i = PhantomUtil_1.PhantomUtil.GetVisionData(o);
      if (0 !== (n = i && 2 === i.类型 ? i.技能ID : n)) {
        i = getFishingSkillType(o);
        if (void 0 === i)
          return (0, InputFunctionCommon_1.createSkillCommand)(e, n);
        o = e.GetComponent(205);
        if (o && o.Valid && o.IsSkillInCd(n))
          ControllerHolder_1.ControllerHolder.FishingController.ShowFishingSkillTips(
            i,
            2,
          );
        else {
          o =
            ControllerHolder_1.ControllerHolder.FishingController.CheckFishingSkillCanBegin(
              i,
            );
          if (0 !== o && 3 !== o)
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Fishing", 48, "捕鱼技能不满足使用条件", [
                "checkResult",
                o,
              ]),
              ControllerHolder_1.ControllerHolder.FishingController.ShowFishingSkillTips(
                i,
                o,
              );
          else {
            var r = (0, InputFunctionCommon_1.createSkillCommand)(e, n);
            if (r) {
              e = e.GetComponent(244);
              if (3 === o)
                e?.ExecuteSkillWithConfirmBox(
                  n,
                  258,
                  ControllerHolder_1.ControllerHolder.FishingController.GetFishingSkillCostId(),
                );
              else {
                o = needConfirmSkillMap.get(i);
                if (!o) return r;
                e?.ExecuteSkillWithConfirmBox(
                  n,
                  o,
                  ControllerHolder_1.ControllerHolder.FishingController.GetFishingSkillCostId(),
                );
              }
            }
          }
        }
      }
    }
  }
}
function fishingBoatVisionSkill1OnPress(n) {
  if (!Info_1.Info.IsInTouch()) return visionSkill1Function(n);
}
function fishingBoatVisionSkill1OnRelease(n) {
  if (
    Info_1.Info.IsInTouch() &&
    !UiBlueprintFunctionLibrary_1.default.IsLongPressExploreButton()
  )
    return visionSkill1Function(n);
}
function createFishingBoatSprintCommand(n) {
  var e,
    o =
      ModelManager_1.ModelManager.FishingModel.GetShipData().GetEntityHandle()
        ?.Entity;
  return o?.Valid
    ? (e = o.GetComponent(271)) && e.CheckCanSprint()
      ? (0, InputFunctionCommon_1.createSkillCommand)(o, n)
      : void 0
    : new UE.SInputCommand(1, n, void 0);
}
(exports.fishingBoatVisionSkill1OnPress = fishingBoatVisionSkill1OnPress),
  (exports.fishingBoatVisionSkill1OnRelease = fishingBoatVisionSkill1OnRelease),
  (exports.createFishingBoatSprintCommand = createFishingBoatSprintCommand);
//# sourceMappingURL=InputFunctionFishingBoat.js.map
