"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CampUtils_1 = require("../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
class TsAnimNotifyStateCleanBurstCamera extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this["隐藏敌对目标Mesh"] = !0),
      (this["隐藏敌对目标特效"] = !0),
      (this["不接受命中特效"] = !0),
      (this.TsHideMesh = !1),
      (this.TsHideEffect = !1),
      (this.TsHiddenMap = void 0),
      (this.TsNoHitEffect = !1);
  }
  Constructor() {
    (this.TsHideMesh = !1),
      (this.TsHideEffect = !1),
      (this.TsHiddenMap = void 0),
      (this.TsNoHitEffect = !1);
  }
  K2_NotifyBegin(t, s, e) {
    var i,
      r,
      a = t.GetOwner();
    if (!(a instanceof TsBaseCharacter_1.default)) return !1;
    if (!a.CharacterActorComponent.IsAutonomousProxy) return !1;
    (this.TsHideMesh = this.隐藏敌对目标Mesh),
      (this.TsHideEffect = this.隐藏敌对目标特效),
      (this.TsNoHitEffect = this.不接受命中特效);
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o.IsInit &&
        o.Entity.Active &&
        (r = (i = o.Entity.GetComponent(3))?.Actor) &&
        r !== a &&
        1 !== CampUtils_1.CampUtils.GetCampRelationship(r.Camp, a.Camp) &&
        (this.TsHiddenMap || (this.TsHiddenMap = new Map()),
        this.TsHideEffect &&
          (this.HideEffect(o, !0), this.TsHiddenMap.set(o, -1)),
        this.TsHideMesh) &&
        ((r = i.DisableActor(
          "[TsAnimNotifyStateCleanBurstCamera] 大招镜头帧事件隐藏Mesh",
        )),
        this.TsHiddenMap.set(o, r));
    return (
      this.TsNoHitEffect &&
        ((t = a.GetEntityNoBlueprint())
          ? (t = t.GetComponent(203)) &&
            t.TagContainer.UpdateExactTag(2, -1728163740, 1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Test",
              20,
              "No Entity for TsBaseCharacter ANS CleanBurstCamera Begin",
              ["Name", a.GetName()],
            )),
      !0
    );
  }
  K2_NotifyTick(t, s, e) {
    if (this.TsHideEffect && this.TsHiddenMap)
      for (const i of this.TsHiddenMap.keys())
        i.Valid && this.HideEffect(i, !0);
    return !0;
  }
  K2_NotifyEnd(t, s) {
    var e;
    if (
      (this.TsNoHitEffect &&
        (t = t.GetOwner()) instanceof TsBaseCharacter_1.default &&
        ((e = t.GetEntityNoBlueprint())
          ? (e = e.GetComponent(203)) &&
            e.TagContainer.UpdateExactTag(2, -1728163740, -1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Test",
              20,
              "No Entity for TsBaseCharacter ANS CleanBurstCamera End",
              ["Name", t.GetName()],
            )),
      this.TsHiddenMap)
    ) {
      for (var [i, r] of this.TsHiddenMap)
        i.Valid &&
          (this.TsHideMesh && i.Entity.GetComponent(3).EnableActor(r),
          this.TsHideEffect) &&
          this.HideEffect(i, !1);
      this.TsHiddenMap = void 0;
    }
    return !0;
  }
  GetNotifyName() {
    return "大招时显隐Mesh和特效";
  }
  HideEffect(t, s) {
    t.Entity.GetComponent(39)?.CurrentSkill?.SetEffectHidden(s),
      t.Entity.GetComponent(21)?.SetHidden(s);
  }
}
exports.default = TsAnimNotifyStateCleanBurstCamera;
//# sourceMappingURL=TsAnimNotifyStateCleanBurstCamera.js.map
