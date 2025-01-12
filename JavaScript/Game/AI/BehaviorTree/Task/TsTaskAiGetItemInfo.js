"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiGetItemInfo extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.ItemBlackboardKey = ""),
      (this.ItemDistanceBlackboardKey = ""),
      (this.ItemLocationBlackboardKey = ""),
      (this.UseNavigation = !1),
      (this.VectorArray = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsItemBlackboardKey = ""),
      (this.TsItemDistanceBlackboardKey = ""),
      (this.TsItemLocationBlackboardKey = ""),
      (this.TsUseNavigation = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsItemBlackboardKey = this.ItemBlackboardKey),
      (this.TsItemDistanceBlackboardKey = this.ItemDistanceBlackboardKey),
      (this.TsItemLocationBlackboardKey = this.ItemLocationBlackboardKey),
      (this.TsUseNavigation = this.UseNavigation));
  }
  ReceiveExecuteAI(e, r) {
    var o = e.AiController;
    if (o) {
      this.InitTsVariables();
      var o = o.CharActorComp,
        i = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          o.Entity.Id,
          this.TsItemBlackboardKey,
        ),
        i = EntitySystem_1.EntitySystem.Get(i),
        s = i.GetComponent(0);
      if (s)
        if (
          void 0 === i ||
          s.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_SceneItem
        )
          this.FinishExecute(!1);
        else {
          (s = i.GetComponent(185).ActorLocation),
            (i =
              (void 0 === this.VectorArray && (this.VectorArray = new Array()),
              r.K2_GetActorLocation()));
          let t = 0;
          (t = this.TsUseNavigation
            ? (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                e,
                i,
                s,
                this.VectorArray,
              ),
              AiContollerLibrary_1.AiControllerLibrary.GetPathLength(
                i,
                this.VectorArray,
              ))
            : ((r = Vector_1.Vector.Create(s)),
              (i = Vector_1.Vector.Create(i)),
              r.SubtractionEqual(i).Size())),
            BlackboardController_1.BlackboardController.SetFloatValueByEntity(
              o.Entity.Id,
              this.TsItemDistanceBlackboardKey,
              t,
            ),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              o.Entity.Id,
              this.TsItemLocationBlackboardKey,
              s.X,
              s.Y,
              s.Z,
            ),
            this.FinishExecute(!0);
        }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskAiGetItemInfo;
//# sourceMappingURL=TsTaskAiGetItemInfo.js.map
