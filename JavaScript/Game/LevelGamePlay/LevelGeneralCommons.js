"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralCommons = void 0);
const Log_1 = require("../../Core/Common/Log"),
  ConditionGroupById_1 = require("../../Core/Define/ConfigQuery/ConditionGroupById"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  IAction_1 = require("../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterController_1 = require("../NewWorld/Character/CharacterController");
class LevelGeneralCommons {
  static Init() {
    (this.IUe = new Array()), (this.TUe = new Array());
  }
  static Clear() {
    (this.IUe.length = 0), (this.TUe.length = 0);
  }
  static AddPublicTag(e, t) {
    this.IUe.splice(0, this.IUe.length),
      this.IUe.push(e),
      ControllerHolder_1.ControllerHolder.CreatureController.AddPublicTags(
        t.GetEntityId(),
        this.IUe,
      );
  }
  static RemovePublicTag(e, t) {
    this.IUe.splice(0, this.IUe.length),
      this.IUe.push(e),
      ControllerHolder_1.ControllerHolder.CreatureController.RemovePublicTags(
        t.GetEntityId(),
        this.IUe,
      );
  }
  static FindTargetWithTag(e) {
    if (
      (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(
        e,
        this.TUe,
      ),
      this.TUe && this.TUe.length)
    )
      return CharacterController_1.CharacterController.GetActor(this.TUe[0]);
  }
  static FindTargetsWithTag(e, t) {
    if (
      ((t.length = 0),
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(e, this.TUe),
      this.TUe && this.TUe.length)
    )
      for (const r of this.TUe)
        CharacterController_1.CharacterController.GetActor(r) &&
          t.push(CharacterController_1.CharacterController.GetActor(r));
  }
  static UpdateEntityTag(e, t, r) {
    var a,
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    o
      ? ((o = CharacterController_1.CharacterController.GetActor(o)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              7,
              "[LevelGeneralController.UpdateEntityTag] 无法找到对应表现Actor 修改tag",
              ["EntityId", e],
              ["Tag", t],
            )),
        (a = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
        r
          ? (o.Tags.Add(a), this.AddPublicTag(t, o))
          : -1 !== (r = o.Tags.FindIndex(a)) &&
            (o.Tags.RemoveAt(r), this.RemovePublicTag(t, o)))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Level",
          7,
          "[LevelGeneralController.UpdateEntityTag] 无法找到对应entity 修改tag",
          ["EntityId", e],
          ["Tag", t],
        );
  }
  static GetConditionGroupHintText(e) {
    e = ConditionGroupById_1.configConditionGroupById.GetConfig(e);
    if (e) return e.HintText;
  }
  static PrechangeStateTag(e, t, r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Entity",
        32,
        "尝试通过ChangePerformanceTag方法更改服务器Tag",
        ["原因", r],
      );
    r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    r
      ? r.IsInit
        ? this.LUe(e, r, t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            32,
            "[ChangePerformanceTag] 对应的Entity并未初始化完成",
            ["pbDataId", e],
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "[ChangePerformanceTag] 找不到对应的Entity",
          ["pbDataId", e],
        );
  }
  static LUe(e, t, r) {
    var a = t?.Entity?.GetComponent(181);
    if (a) {
      var o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(r),
        n = t.Entity.GetComponent(0)?.GetPbEntityInitData(),
        i = (0, IComponent_1.getComponent)(
          n.ComponentsData,
          "EntityStateComponent",
        );
      if ((0, IAction_1.isStateTypeContainsState)(i.Type, o)) {
        for (const g of (0, IAction_1.getStatesByType)(i.Type)) {
          var l = (0, IAction_1.getEntityStateTag)(i.Type, g),
            l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(l);
          a.RemoveServerTagByIdLocal(l, "ChangePerformanceTag");
        }
        a.AddServerTagByIdLocal(r, "ChangePerformanceTag"),
          EventSystem_1.EventSystem.EmitWithTarget(
            t.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
            r,
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            32,
            "[ChangePerformanceTag] 传入的Tag与Entity设定的状态类型不匹配",
            ["configComp", i.Type],
            ["TagName", o],
            ["pbDataId", e],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          32,
          "[ChangePerformanceTag] 找不到对应的LevelTagComponent",
          ["pbDataId", e],
        );
  }
}
((exports.LevelGeneralCommons = LevelGeneralCommons).IUe = void 0),
  (LevelGeneralCommons.TUe = void 0);
//# sourceMappingURL=LevelGeneralCommons.js.map
