"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TsAiController_1 = require("../../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskFindNearestInteractiveTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.SearchRange = 0),
      (this.SaveTargetBlackboardKey = ""),
      (this.NowLocation = void 0),
      (this.TmpHandles = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsSearchRange = 0),
      (this.TsSaveTargetBlackboardKey = "");
  }
  Constructor() {
    super.Constructor(),
      (this.NowLocation = void 0),
      (this.TmpHandles = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsSearchRange = 0),
      (this.TsSaveTargetBlackboardKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsSearchRange = this.SearchRange),
      (this.TsSaveTargetBlackboardKey = this.SaveTargetBlackboardKey));
  }
  ReceiveExecuteAI(t, e) {
    var r;
    this.InitTsVariables(),
      t instanceof TsAiController_1.default &&
      (this.TmpHandles || (this.TmpHandles = []),
      (t = t.AiController.CharActorComp),
      (this.NowLocation = t.ActorLocationProxy),
      (r = t.Entity.Id),
      (t = this.GetNearestInteractiveEntity(t, this.TsSearchRange)))
        ? (ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(
            r,
            this.TsSaveTargetBlackboardKey,
            t,
          ),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
  }
  GetNearestInteractiveEntity(e, t) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
      this.NowLocation,
      this.TsSearchRange,
      63,
      this.TmpHandles,
    );
    let r = Number.MAX_VALUE,
      s = void 0;
    for (const o of this.TmpHandles)
      if (o.Entity?.Active && o.Entity !== e.Entity) {
        var i = o.Entity.GetComponent(1);
        let t = !1;
        switch (i.CreatureData.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            t = !0;
            break;
          default:
            t = !1;
        }
        t &&
          i.Entity.GetComponent(101)?.IsInit &&
          (i = Vector_1.Vector.Dist(
            e.ActorLocationProxy,
            i.ActorLocationProxy,
          )) < r &&
          ((r = i), (s = o.Id));
      }
    return s;
  }
}
exports.default = TsTaskFindNearestInteractiveTarget;
//# sourceMappingURL=TsTaskFindNearestInteractiveTarget.js.map
