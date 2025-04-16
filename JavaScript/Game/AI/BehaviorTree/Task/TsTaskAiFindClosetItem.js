"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  AiInteractionItemQueryManager_1 = require("../../../NewWorld/SceneItem/AiInteraction/AiInteractionItemQueryManager"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiFindClosetItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Range = 0),
      (this.ItemBlackboardKey = ""),
      (this.ItemDistanceBlackboardKey = ""),
      (this.ItemLocationBlackboardKey = ""),
      (this.SearchFilterIsMarkByAi = !1),
      (this.Tag = void 0),
      (this.UseNavigation = !1),
      (this.IsInitTsVariables = !1),
      (this.TsRange = 0),
      (this.TsItemBlackboardKey = ""),
      (this.TsItemDistanceBlackboardKey = ""),
      (this.TsItemLocationBlackboardKey = ""),
      (this.TsSearchFilterIsMarkByAi = !1),
      (this.TsFilter = void 0),
      (this.TsUseNavigation = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsRange = 0),
      (this.TsItemBlackboardKey = ""),
      (this.TsItemDistanceBlackboardKey = ""),
      (this.TsItemLocationBlackboardKey = ""),
      (this.TsSearchFilterIsMarkByAi = !1),
      (this.TsFilter = void 0);
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        ((this.IsInitTsVariables = !0),
        (this.TsRange = this.Range),
        (this.TsItemBlackboardKey = this.ItemBlackboardKey),
        (this.TsItemDistanceBlackboardKey = this.ItemDistanceBlackboardKey),
        (this.TsItemLocationBlackboardKey = this.ItemLocationBlackboardKey),
        (this.TsSearchFilterIsMarkByAi = this.SearchFilterIsMarkByAi),
        (this.TsFilter =
          new AiInteractionItemQueryManager_1.AiInteractionSearchFilter()),
        0 === this.Tag?.Num())
      )
        this.TsFilter.Tag = void 0;
      else
        for (let t = 0; t < this.Tag.Num(); ++t)
          (this.TsFilter.Tag = new Array()),
            this.TsFilter.Tag.push(this.Tag.Get(t));
      this.TsUseNavigation = this.UseNavigation;
    }
  }
  ReceiveExecuteAI(t, i) {
    var e,
      s = t.AiController;
    s
      ? (this.InitTsVariables(),
        (s = s.CharActorComp),
        (i = i.D_K2_GetActorLocation()),
        (this.TsFilter.IsSearchedMarkByAi = this.TsSearchFilterIsMarkByAi),
        (this.TsFilter.Entity = s.Entity),
        !(i =
          AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().GetCloseActor(
            i,
            this.TsUseNavigation ? 1 : 0,
            this.TsFilter,
            t,
          )) || i.Length > this.TsRange
          ? this.FinishExecute(!1)
          : (ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
              s.Entity.Id,
              this.TsItemBlackboardKey,
              i.Entity.Id,
            ),
            ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(
              s.Entity.Id,
              this.TsItemDistanceBlackboardKey,
              i.Length,
            ),
            (e = i.Entity.GetComponent(0)) &&
              (e.GetEntityType() ===
                Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
                ((e = i.Entity.GetComponent(200).ActorLocation),
                ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
                  s.Entity.Id,
                  this.TsItemLocationBlackboardKey,
                  e.X,
                  e.Y,
                  e.Z,
                )),
              this.FinishExecute(!0))))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]);
  }
}
exports.default = TsTaskAiFindClosetItem;
//# sourceMappingURL=TsTaskAiFindClosetItem.js.map
