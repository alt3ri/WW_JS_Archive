"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEntityCommonTagBySelf =
    exports.ConditionExParamsCheckEntityCommonTagBySelf =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelConditionCenter_1 = require("./LevelConditionCenter");
class ConditionExParamsCheckEntityCommonTagBySelf extends LevelGeneralBase_1.LevelConditionExParams {
  constructor() {
    super(...arguments), (this.TagIds = void 0);
  }
}
exports.ConditionExParamsCheckEntityCommonTagBySelf =
  ConditionExParamsCheckEntityCommonTagBySelf;
class LevelConditionCheckEntityCommonTagBySelf extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t) {
    let n = LevelConditionCenter_1.LevelConditionCenter.GetConditionExParams(
      e.Id,
    );
    if (!n) {
      if (!e.LimitParams) return !1;
      var o = e.LimitParams.get("EntityCommonTag");
      if (!o) return !1;
      o = o.split("-");
      (n = new ConditionExParamsCheckEntityCommonTagBySelf()).TagIds =
        new Array();
      for (const a of o) {
        var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
        void 0 === r
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              18,
              "不存在Tag,请检查条件配置",
              ["tag", a],
              ["条件Id", e.Id],
            )
          : n.TagIds.push(r);
      }
      LevelConditionCenter_1.LevelConditionCenter.SetConditionExParams(e.Id, n);
    }
    if (n.TagIds && 0 < n.TagIds.length) {
      if (
        !UE.KuroStaticLibrary.IsImplementInterface(
          t.GetClass(),
          UE.BPI_CreatureInterface_C.StaticClass(),
        )
      )
        return !1;
      (o = t), (t = EntitySystem_1.EntitySystem.Get(o.GetEntityId()));
      if (!t) return !1;
      var i = t.GetComponent(180);
      if (!i) return !1;
      for (const s of n.TagIds) if (!i.HasTag(s)) return !1;
    }
    return !0;
  }
}
exports.LevelConditionCheckEntityCommonTagBySelf =
  LevelConditionCheckEntityCommonTagBySelf;
//# sourceMappingURL=LevelConditionCheckEntityCommonTagByself.js.map
