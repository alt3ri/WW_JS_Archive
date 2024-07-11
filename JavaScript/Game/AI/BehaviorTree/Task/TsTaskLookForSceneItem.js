"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
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
  ReceiveTickAI(s, t, e) {
    this.InitTsVariables();
    let r = s.AiController;
    if (r)
      if (this.TsOutBlackboardKey) {
        const o = r.CharActorComp.ActorLocationProxy;
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
          o,
          this.TsDetectDistance,
          1,
          this.TmpHandles,
        );
        let e = MathUtils_1.MathUtils.Square(this.DetectDistance);
        let i = void 0;
        for (const _ of this.TmpHandles)
          if (_.Entity?.Active) {
            const a = _.Entity.GetComponent(1).ActorLocationProxy;
            const l = Vector_1.Vector.DistSquared(o, a);
            if (!(l > e)) {
              var h = _.Entity.GetComponent(0);
              const n = h.GetBaseInfo()?.Category?.CollectType;
              var h = h.GetBaseInfo()?.Category?.MainType;
              let t = !1;
              !(t =
                !(t =
                  !(t =
                    this.TsBotanyItem &&
                    n === "Botany" &&
                    _.Entity.GetComponent(178)?.IsOnlyCollectOption()
                      ? !0
                      : t) &&
                  this.TsMineralItem &&
                  n === "Mineral"
                    ? !0
                    : t) &&
                this.TsDropItem &&
                h === "Drop"
                  ? !0
                  : t) ||
                (this.TsNavigationOn &&
                  !AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                    s,
                    o.ToUeVector(),
                    a.ToUeVector(),
                  )) ||
                ((e = l), (i = _));
            }
          }
        r = r.CharActorComp.Entity.Id;
        i
          ? (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
              r,
              this.TsOutBlackboardKey,
              i.Id,
            ),
            this.FinishExecute(!0))
          : (BlackboardController_1.BlackboardController.RemoveValueByEntity(
              r,
              this.TsOutBlackboardKey,
            ),
            this.FinishExecute(!1));
      } else this.FinishExecute(!1);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          s.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskLookForSceneItem;
// # sourceMappingURL=TsTaskLookForSceneItem.js.map
