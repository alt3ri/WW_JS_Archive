"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  Global_1 = require("../Global"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputFunctionAttack_1 = require("../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionAttack"),
  InputFunctionCommon_1 = require("../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionCommon"),
  InputFunctionFishingBoat_1 = require("../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionFishingBoat"),
  InputFunctionVisionSkill1_1 = require("../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionVisionSkill1"),
  InputFunctionVisionSkill2_1 = require("../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionVisionSkill2"),
  InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine"),
  InputEnums_1 = require("./InputEnums");
class InputBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static PreProcessInput(t, n) {
    ControllerHolder_1.ControllerHolder.InputController.PreProcessInput(t, n);
  }
  static PostProcessInput(t, n) {
    ControllerHolder_1.ControllerHolder.InputController.PostProcessInput(t, n);
  }
  static IsKeyDown(t) {
    return ControllerHolder_1.ControllerHolder.InputController.IsKeyDown(t);
  }
  static GetKeyDownTime(t) {
    return ControllerHolder_1.ControllerHolder.InputController.GetKeyDownTime(
      t,
    );
  }
  static GetCommandInterval(t, n = 1) {
    return (
      Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()
        ?.GetComponent(61)
        ?.GetCommandInterval(t) ?? n
    );
  }
  static SetTimeDilation(t) {
    ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(t);
  }
  static GetActionInputDistributeTag(t) {
    return InputDistributeDefine_1.actionTagMap.get(t);
  }
  static GetAxisInputDistributeTag(t) {
    return InputDistributeDefine_1.axisTagMap.get(t);
  }
  static GetAllInputDistributeTag() {
    var t = UE.NewArray(UE.BuiltinString);
    for (const n of InputDistributeDefine_1.initializeInputDistributeTagDefine)
      t.Add(n.Tag);
    return t;
  }
  static HasMoveAxisInput() {
    var t, n;
    return (
      !(
        1 !== Info_1.Info.OperationType ||
        !ModelManager_1.ModelManager.BattleUiModel?.IsPressJoyStick
      ) ||
      !!(
        (t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()) &&
        ((n = t.get(InputEnums_1.EInputAxis.MoveForward)) ||
          (t = t.get(InputEnums_1.EInputAxis.MoveRight)) ||
          (0 !== n &&
            0 !== t &&
            (n =
              Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                61,
              )) &&
            (n.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ||
              n.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight))))
      )
    );
  }
  static CreateSkillCommand(t, n) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) return (0, InputFunctionCommon_1.createSkillCommand)(t, n);
  }
  static CanResponseInput(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t?.Valid && (0, InputFunctionCommon_1.canResponseInput)(t);
  }
  static CharacterAttackOnPress(t, n, e) {
    t = (0, InputFunctionAttack_1.attackOnPress)(t, e);
    return t || n;
  }
  static CharacterAttackOnRelease(t, n, e) {
    t = (0, InputFunctionAttack_1.attackOnRelease)(t, e);
    return t || n;
  }
  static CharacterVisionSkill1OnPress(t, n) {
    t = (0, InputFunctionVisionSkill1_1.visionSkill1OnPress)(t);
    return t || n;
  }
  static CharacterVisionSkill1OnRelease(t, n) {
    t = (0, InputFunctionVisionSkill1_1.visionSkill1OnRelease)(t);
    return t || n;
  }
  static CharacterVisionSkill2OnPress(t, n) {
    t = (0, InputFunctionVisionSkill2_1.visionSkill2OnPress)(t);
    return t || n;
  }
  static CharacterVisionSkill2OnRelease(t, n) {
    t = (0, InputFunctionVisionSkill2_1.visionSkill2OnRelease)(t);
    return t || n;
  }
  static FishingBoatVisionSkill1OnPress(t, n) {
    t = (0, InputFunctionFishingBoat_1.fishingBoatVisionSkill1OnPress)(t);
    return t || n;
  }
  static FishingBoatVisionSkill1OnRelease(t, n) {
    t = (0, InputFunctionFishingBoat_1.fishingBoatVisionSkill1OnRelease)(t);
    return t || n;
  }
  static CreateFishingBoatSprintCommand(t) {
    return (0, InputFunctionFishingBoat_1.createFishingBoatSprintCommand)(t);
  }
}
exports.default = InputBlueprintFunctionLibrary;
//# sourceMappingURL=InputBlueprintFunctionLibrary.js.map
