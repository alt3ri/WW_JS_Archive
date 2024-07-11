"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotMontage = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  MONTAGE_BLEND_OUT_TIME = 0.5;
class PlotMontage {
  constructor() {
    (this.tYi = new Map()), (this.iYi = new Map());
  }
  StartPlayMontage(e) {
    var t;
    e &&
      e.ActionMontage.Path &&
      "Empty" !== e.ActionMontage.Path &&
      (t =
        0 === e.EntityId
          ? ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity
          : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
              e.EntityId,
            ))?.IsInit &&
      this.oYi(t, e.ActionMontage.Path);
  }
  oYi(t, r, a = !1) {
    var e;
    t &&
      !StringUtils_1.StringUtils.IsEmpty(r) &&
      ((e = this.tYi.get(r))
        ? this.Fc(t, e, a)
        : ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimMontage, (e) => {
            ObjectUtils_1.ObjectUtils.IsValid(e) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Plot", 27, "播放失败, 检查动画资产", [
                  "path",
                  r,
                ])),
              this.tYi.set(r, e),
              this.Fc(t, e, a);
          }));
  }
  Fc(e, t, r) {
    var a,
      s,
      i = e.Entity.GetComponent(160)?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      ((s = this.iYi.get(e)),
      (a =
        ObjectUtils_1.ObjectUtils.IsValid(s) && i.Montage_IsPlaying(s)
          ? i.Montage_GetCurrentSection(s)
          : CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION),
      (s === t &&
        a !== CharacterNameDefines_1.CharacterNameDefines.END_SECTION) ||
        i.Montage_Play(t),
      (s = r
        ? CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION
        : CharacterNameDefines_1.CharacterNameDefines.END_SECTION),
      i.Montage_SetNextSection(
        CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        t,
      ),
      i.Montage_SetNextSection(
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        s,
        t,
      ),
      this.iYi.set(e, t),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Plot",
        27,
        "NPC播放蒙太奇",
        ["Id", e.Id],
        ["Montage", t.GetName()],
      );
  }
  StopAllMontage(e = !0) {
    for (var [t, r] of this.iYi) {
      var a = t?.Entity?.GetComponent(160)?.MainAnimInstance;
      ObjectUtils_1.ObjectUtils.IsValid(a) &&
      ObjectUtils_1.ObjectUtils.IsValid(r) &&
      a.Montage_IsPlaying(r)
        ? e
          ? a.Montage_Stop(MONTAGE_BLEND_OUT_TIME, r)
          : a.Montage_SetNextSection(
              CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
              CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              r,
            )
        : this.iYi.delete(t);
    }
    e && (this.iYi.clear(), this.tYi.clear());
  }
}
exports.PlotMontage = PlotMontage;
//# sourceMappingURL=PlotMontage.js.map
