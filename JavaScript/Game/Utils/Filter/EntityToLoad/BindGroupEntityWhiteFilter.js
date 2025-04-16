"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BindGroupEntityWhiteFilter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  EntityToLoadFilter_1 = require("./EntityToLoadFilter");
class BindGroupEntityWhiteFilter extends EntityToLoadFilter_1.EntityToLoadFilter {
  constructor() {
    super(...arguments),
      (this.v2_ = new Set()),
      (this.FilterType = 1),
      (this.TargetCriteriaInternal = (e) => {
        var t =
          ControllerHolder_1.ControllerHolder.CreatureGroupController.GetBindGroup(
            e.CreatureDataId,
          );
        if (!t) return !1;
        for (const r of t) this.v2_.add(r);
        return (
          ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              60,
              "预加载实体:加入实体组白名单",
              ["creatureDataId", e.CreatureDataId],
              ["group", t.join(",")],
              ["whiteList", this.v2_],
            ),
          this.v2_.has(e.CreatureDataId)
        );
      }),
      (this.y2_ = (e) => {
        if ("number" == typeof e) this.S2_(e);
        else for (const t of e) this.S2_(t);
      });
  }
  get DebugName() {
    return "BindGroupEntityWhiteFilter";
  }
  Init() {
    super.Init(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntityFromBindGroup,
        this.y2_,
      );
  }
  Cleanup() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RemoveEntityFromBindGroup,
      this.y2_,
    ),
      super.Cleanup();
  }
  S2_(e) {
    this.v2_.delete(e) &&
      (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          60,
          "预加载实体:清除实体组白名单",
          ["creatureDataId", e],
          ["whiteList", this.v2_],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FilterCriteriaChanged,
        this,
      ));
  }
}
exports.BindGroupEntityWhiteFilter = BindGroupEntityWhiteFilter;
//# sourceMappingURL=BindGroupEntityWhiteFilter.js.map
