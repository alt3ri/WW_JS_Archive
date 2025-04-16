"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.visionSkill1OnRelease = exports.visionSkill1OnPress = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../../../Core/Common/Info"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../../../../../Global"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiBlueprintFunctionLibrary_1 = require("../../../../../../Module/BpBridge/UiBlueprintFunctionLibrary"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  ScrollingTipsController_1 = require("../../../../../../Module/ScrollingTips/ScrollingTipsController"),
  WorldFunctionLibrary_1 = require("../../../../../../World/Bridge/WorldFunctionLibrary"),
  BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController"),
  CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes"),
  InputDefine_1 = require("./InputDefine"),
  InputFunctionCommon_1 = require("./InputFunctionCommon"),
  SOAR_HEIGHT_LIMIT = 650,
  soarLandDetectOffset = new UE.VectorDouble(1100, 0, -500),
  PROFILE_KEY = "SoarEnterDetect",
  tmpVector = Vector_1.Vector.Create();
function visionSkill1TraceDetectHasGround(e) {
  var r,
    e = e.GetComponent(3);
  return (
    !!e &&
    (((r =
      ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject =
      e.Actor),
    (r.Radius = e.ScaledRadius),
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(
      r,
      e.FloorLocation,
    ),
    tmpVector.FromUeVector(
      e.ActorTransform.TransformVectorNoScale(soarLandDetectOffset),
    ),
    tmpVector.AdditionEqual(e.FloorLocation),
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, tmpVector),
    r.ActorsToIgnore.Empty(),
    TraceElementCommon_1.TraceElementCommon.ShapeTrace(
      e.Actor.CapsuleComponent,
      r,
      PROFILE_KEY,
      PROFILE_KEY,
    ))
  );
}
function isFollowerDisable(e) {
  return e.HasAnyTag([
    1637209445, 1769145221, 525585922, -307714774, 1996624497, -1503953470,
  ]);
}
function visionSkill1Function(e) {
  var n = Global_1.Global.BaseCharacter;
  if (n) {
    var i = n.CharacterActorComponent?.Entity;
    if (i) {
      var o = i.GetComponent(203);
      if (o && o.Valid) {
        var t = (0, InputFunctionCommon_1.createInputCommandFromDataTable)(
          i.Id,
          7,
          1,
        );
        if (t) return t;
        if (o.HasTag(-376090703)) {
          if (i.GetComponent(176)?.IsOnGroundOrOnWater())
            return (0, InputFunctionCommon_1.createSkillCommand)(
              i,
              InputDefine_1.SKILL_ID_YUANNIAOZE_TORNADO,
            );
        } else {
          if (o.HasTag(-1652473093))
            return o.HasTag(2081853303)
              ? (0, InputFunctionCommon_1.createSkillCommand)(
                  i,
                  InputDefine_1.SKILL_ID_CHENGXIAOSHAN_TIMEDILATION_STOP,
                )
              : (0, InputFunctionCommon_1.createSkillCommand)(
                  i,
                  InputDefine_1.SKILL_ID_CHENGXIAOSHAN_TIMEDILATION,
                );
          if (o.HasTag(-648597304))
            return isFollowerDisable(o)
              ? void 0
              : (0, InputFunctionCommon_1.createSkillCommand)(
                  i,
                  InputDefine_1.SKILL_ID_FOLLOWSHOOTER_AIM_START,
                );
        }
        if (
          i.GetComponent(44)?.CanResponseInput() &&
          !o.HasTag(-2044964178) &&
          !o.HasTag(-2100129479)
        ) {
          let r = 0;
          var l = i.GetComponent(42)?.GetVisionIdList();
          if (l)
            for (let e = 0; e < l.Num(); e++) {
              var u = PhantomUtil_1.PhantomUtil.GetVisionData(l.Get(e));
              u &&
                (2 === u.类型
                  ? (r = u.技能ID)
                  : BlackboardController_1.BlackboardController.SetIntValueByEntity(
                      i.Id,
                      "VisionID",
                      u.Id,
                    ));
            }
          if (r === InputDefine_1.SKILL_ID_HOOK)
            if (o.HasTag(-1526637662)) r = InputDefine_1.SKILL_ID_XA_KITE;
            else if (o.HasTag(-1771378495))
              r = InputDefine_1.SKILL_ID_XA_MOVABLE;
            else if (i.GetComponent(97)?.CanActivateFixHook())
              r = o.HasTag(-1958756056)
                ? InputDefine_1.SKILL_ID_FIX_HOOK_2
                : InputDefine_1.SKILL_ID_FIX_HOOK_1;
            else {
              if (o.HasTag(-1009010563)) return;
              if (o.HasTag(-1002623896))
                return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "ExploreToolsDisable011007",
                );
              if (o.HasTag(-833935142)) return;
            }
          else if (r === InputDefine_1.SKILL_ID_SHOW_VISION) {
            t = WorldFunctionLibrary_1.default.GetVisionEntityId(i.Id);
            if (0 === t || WorldFunctionLibrary_1.default.GetEntityEnable(t))
              return;
            if (o.HasAnyTag([40422668, 855966206, 504239013, 761126017]))
              return;
          } else if (r === InputDefine_1.SKILL_ID_MANIPULATE) {
            if (o.HasTag(-611134292)) r = InputDefine_1.SKILL_ID_MANIPULATE_EX;
            else if (o.HasTag(-2047045017))
              r = InputDefine_1.SKILL_ID_STATUE_INTERACT;
            else if (o.HasTag(504239013) || !o.HasTag(1193763416)) return;
          } else if (r === InputDefine_1.SKILL_ID_FOLLOWSHOOTER_AIM_START) {
            if (!o.HasTag(-405107291)) {
              if (o.HasTag(-1488322179) || o.HasTag(-1036349300))
                return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "ExploreToolsShooterDisable",
                );
              if (isFollowerDisable(o)) return;
            }
          } else if (r === InputDefine_1.SKILL_ID_XA) {
            if (o.HasTag(-143158229)) return;
            if (o.HasTag(-2027866845))
              return void n.KuroSetMovementMode({
                Mode: 3,
                Context: "[visionSkill1Function]",
              });
            if (
              i.GetComponent(99)?.PositionState !==
                CharacterUnifiedStateTypes_1.ECharPositionState.Air ||
              !o.HasTag(1151923109) ||
              o.HasTag(1226693610)
            )
              return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Flying_Tip_002",
              );
            t = i.GetComponent(44)?.GetHeightAboveGround(SOAR_HEIGHT_LIMIT);
            if (
              (!t || t < SOAR_HEIGHT_LIMIT) &&
              visionSkill1TraceDetectHasGround(i)
            )
              return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Flying_Tip",
              );
            if (o.HasTag(1996802261))
              return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Flying_Tip_002",
              );
          }
          if (0 !== r) {
            if (
              ModelManager_1.ModelManager.ExploreSkillFlagModel.GetExploreSkillFlagEnable(
                r,
              )
            )
              return (0, InputFunctionCommon_1.createSkillCommand)(i, r);
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ExploreTeleporterBan",
            );
          }
        }
      }
    }
  }
}
function visionSkill1OnPress(e) {
  if (!Info_1.Info.IsInTouch()) return visionSkill1Function(e);
}
function visionSkill1OnRelease(e) {
  if (
    Info_1.Info.IsInTouch() &&
    !UiBlueprintFunctionLibrary_1.default.IsLongPressExploreButton()
  )
    return visionSkill1Function(e);
}
(exports.visionSkill1OnPress = visionSkill1OnPress),
  (exports.visionSkill1OnRelease = visionSkill1OnRelease);
//# sourceMappingURL=InputFunctionVisionSkill1.js.map
