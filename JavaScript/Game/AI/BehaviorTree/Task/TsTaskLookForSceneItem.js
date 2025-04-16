"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskLookForSceneItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.OutBlackboardKey = "LookForSceneItem"),
      (this.DetectDistance = 0),
      (this.NavigationOn = !0),
      (this.BotanyItem = !1),
      (this.MineralItem = !0),
      (this.DropItem = !0),
      (this.IsInitTsVariables = !1),
      (this.TsOutBlackboardKey = ""),
      (this.TsDetectDistance = 0),
      (this.TsNavigationOn = !1),
      (this.TsBotanyItem = !1),
      (this.TsMineralItem = !1),
      (this.TsDropItem = !1),
      (this.TmpHandles = []);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsOutBlackboardKey = ""),
      (this.TsDetectDistance = 0),
      (this.TsNavigationOn = !1),
      (this.TsBotanyItem = !1),
      (this.TsMineralItem = !1),
      (this.TsDropItem = !1),
      (this.TmpHandles = []);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsOutBlackboardKey = this.OutBlackboardKey),
      (this.TsDetectDistance = this.DetectDistance),
      (this.TsNavigationOn = this.NavigationOn),
      (this.TsBotanyItem = this.BotanyItem),
      (this.TsMineralItem = this.MineralItem),
      (this.TsDropItem = this.DropItem),
      (this.TmpHandles = []));
  }
  ReceiveTickAI(i, t, s) {
    this.InitTsVariables();
    var r = i.AiController;
    if (r)
      if (this.TsOutBlackboardKey) {
        var o = r.CharActorComp.ActorLocationProxy;
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
          o,
          this.TsDetectDistance,
          1,
          this.TmpHandles,
        );
        let s = MathUtils_1.MathUtils.Square(this.DetectDistance),
          e = void 0;
        for (const _ of this.TmpHandles)
          if (_.Entity?.Active) {
            var h = _.Entity.GetComponent(1).ActorLocationProxy,
              a = Vector_1.Vector.DistSquared(o, h);
            if (!(a > s)) {
              var l = _.Entity.GetComponent(0),
                n = l.GetBaseInfo()?.Category?.CollectType,
                l = l.GetBaseInfo()?.Category?.MainType;
              let t = !1;
              !(t =
                !(t =
                  !(t =
                    this.TsBotanyItem &&
                    "Botany" === n &&
                    _.Entity.GetComponent(195)?.IsOnlyCollectOption()
                      ? !0
                      : t) &&
                  this.TsMineralItem &&
                  "Mineral" === n
                    ? !0
                    : t) &&
                this.TsDropItem &&
                "Drop" === l
                  ? !0
                  : t) ||
                (this.TsNavigationOn &&
                  !AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                    i,
                    o.ToUeVector(),
                    h.ToUeVector(),
                  )) ||
                ((s = a), (e = _));
            }
          }
        r = r.CharActorComp.Entity.Id;
        e
          ? (ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(
              r,
              this.TsOutBlackboardKey,
              e.Id,
            ),
            this.FinishExecute(!0))
          : (ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
              r,
              this.TsOutBlackboardKey,
            ),
            this.FinishExecute(!1));
      } else this.FinishExecute(!1);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          i.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskLookForSceneItem;
//# sourceMappingURL=TsTaskLookForSceneItem.js.map
