"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
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
  Constructor() {
    super.Constructor(),
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
    var i = e.AiController;
    if (i) {
      this.InitTsVariables();
      var i = i.CharActorComp,
        s =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
            i.Entity.Id,
            this.TsItemBlackboardKey,
          ),
        s = EntitySystem_1.EntitySystem.Get(s),
        o = s.GetComponent(0);
      if (o)
        if (
          void 0 === s ||
          o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem
        )
          this.FinishExecute(!1);
        else {
          (o = s.GetComponent(200).ActorLocation),
            (s =
              (void 0 === this.VectorArray && (this.VectorArray = new Array()),
              r.D_K2_GetActorLocation()));
          let t = 0;
          (t = this.TsUseNavigation
            ? (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                e,
                s,
                o,
                this.VectorArray,
              ),
              AiContollerLibrary_1.AiControllerLibrary.GetPathLength(
                s,
                this.VectorArray,
              ))
            : ((r = Vector_1.Vector.Create(o)),
              (s = Vector_1.Vector.Create(s)),
              r.SubtractionEqual(s).Size())),
            ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(
              i.Entity.Id,
              this.TsItemDistanceBlackboardKey,
              t,
            ),
            ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
              i.Entity.Id,
              this.TsItemLocationBlackboardKey,
              o.X,
              o.Y,
              o.Z,
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
