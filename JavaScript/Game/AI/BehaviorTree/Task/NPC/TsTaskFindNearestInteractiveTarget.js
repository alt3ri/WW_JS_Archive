"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
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
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsSearchRange = this.SearchRange),
      (this.TsSaveTargetBlackboardKey = this.SaveTargetBlackboardKey));
  }
  ReceiveExecuteAI(e, t) {
    var r;
    this.InitTsVariables(),
      e instanceof TsAiController_1.default &&
      (this.TmpHandles || (this.TmpHandles = []),
      (e = e.AiController.CharActorComp),
      (this.NowLocation = e.ActorLocationProxy),
      (r = e.Entity.Id),
      (e = this.GetNearestInteractiveEntity(e, this.TsSearchRange)))
        ? (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
            r,
            this.TsSaveTargetBlackboardKey,
            e,
          ),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
  }
  GetNearestInteractiveEntity(t, e) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
      this.NowLocation,
      this.TsSearchRange,
      3,
      this.TmpHandles,
    );
    let r = Number.MAX_VALUE,
      s = void 0;
    for (const i of this.TmpHandles)
      if (i.Entity?.Active && i.Entity !== t.Entity) {
        var o = i.Entity.GetComponent(1);
        let e = !1;
        switch (o.CreatureData.GetEntityType()) {
          case Protocol_1.Aki.Protocol.wks.Proto_Npc:
          case Protocol_1.Aki.Protocol.wks.Proto_SceneItem:
            e = !0;
            break;
          default:
            e = !1;
        }
        e &&
          o.Entity.GetComponent(93)?.IsInit &&
          (o = Vector_1.Vector.Dist(
            t.ActorLocationProxy,
            o.ActorLocationProxy,
          )) < r &&
          ((r = o), (s = i.Id));
      }
    return s;
  }
}
exports.default = TsTaskFindNearestInteractiveTarget;
//# sourceMappingURL=TsTaskFindNearestInteractiveTarget.js.map
