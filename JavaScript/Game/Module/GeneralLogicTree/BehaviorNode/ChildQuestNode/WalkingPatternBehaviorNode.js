"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WalkingPatternBehaviorNode = void 0);
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  GlobalConfigFromCsvByName_1 = require("../../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GameSplineUtils_1 = require("../../../../LevelGamePlay/Common/GameSplineUtils"),
  TsGameSplineActor_1 = require("../../../../LevelGamePlay/Common/TsGameSplineActor"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TimeOfDayController_1 = require("../../../TimeOfDay/TimeOfDayController"),
  GeneralLogicTreeDefine_1 = require("../../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  TickBehaviorNode_1 = require("./TickBehaviorNode");
class WalkingPatternBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.Hnr = void 0),
      (this.zie = void 0),
      (this.qsh = void 0),
      (this.ksh = 0),
      (this.Nsh = 0),
      (this.u$t = !1),
      (this.r$t = !1),
      (this.Fsh = 0),
      (this.Hln = 0),
      (this.Wlh = 0),
      (this.Vsh = 0),
      (this.wdt = -1),
      (this.Qlh = -1),
      (this.Nme = Vector_1.Vector.Create()),
      (this.Hsh = Vector_1.Vector.Create()),
      (this.OnAfterSubmit = (e) => {
        this.u$t = !1;
      }),
      (this.Etn = (e) => {
        var t;
        e &&
          !this.r$t &&
          ((this.r$t = !0),
          (t = this.Nsh / this.ksh),
          (this.Vsh = 0),
          t >= this.Fsh && t <= this.Hln
            ? (this.Vsh = 100 - ((t - this.Fsh) / (this.Hln - this.Fsh)) * 100)
            : t < this.Fsh
              ? (this.Vsh = 100)
              : (this.Vsh = 0),
          (this.Vsh = Math.min(this.Vsh, (this.Qlh / this.wdt) * 100)),
          e) &&
          this.SubmitNode();
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.WalkingPattern) return !1;
    (this.Hnr = ActorSystem_1.ActorSystem.Get(
      TsGameSplineActor_1.default.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransformDouble,
    )),
      (this.zie =
        GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(
          e.SplineEntityId,
          this.Hnr,
        ));
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
      e.SplineEntityId,
    );
    if (void 0 === t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            31,
            "[WalkingPatternBehaviorNode]找不到entityData",
            ["SplineEntityId", e.SplineEntityId],
          ),
        !1
      );
    if (
      void 0 ===
      (0, IComponent_1.getComponent)(t.ComponentsData, "SplineComponent")
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            31,
            "[WalkingPatternBehaviorNode]找不到SplineComponent",
            ["SplineEntityId", e.SplineEntityId],
          ),
        !1
      );
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      e.EndEntityId,
    );
    if (!t?.Valid || !t.Entity?.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            31,
            "[WalkingPatternBehaviorNode]找不到EndEntity",
            ["EndEntityId", e.EndEntityId],
          ),
        !1
      );
    this.qsh = t.Entity;
    e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
      "WalkingPattern.MinDist",
    );
    return (
      e && (this.Fsh = parseInt(e.Value)),
      (e =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "WalkingPattern.MaxDist",
        )) && (this.Hln = parseInt(e.Value)),
      (e =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "WalkingPattern.CheckPointDist",
        )) && (this.Wlh = parseInt(e.Value)),
      !0
    );
  }
  OnStart(e) {
    super.OnStart(e),
      void 0 !== this.qsh &&
        EventSystem_1.EventSystem.AddWithTarget(
          this.qsh,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Etn,
        ),
      (this.ksh = 0),
      (this.Nsh = 0),
      (this.r$t = !1),
      (this.wdt = this.zie?.GetNumberOfSplinePoints() ?? -1),
      (this.Qlh = 0);
  }
  OnTick(e) {
    var t;
    this.u$t ||
      (void 0 !== (t = Global_1.Global.BaseCharacter) &&
        (this.Nme.FromUeVector(t.D_K2_GetActorLocation()),
        this.Klh(),
        this.Wsh()));
  }
  OnEnd(e) {
    void 0 !== this.Hnr &&
      (ActorSystem_1.ActorSystem.Put(
        "WalkingPatternBehaviorNode.OnEnd",
        this.Hnr,
      ),
      (this.Hnr = void 0)),
      void 0 !== this.qsh &&
        EventSystem_1.EventSystem.HasWithTarget(
          this.qsh,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Etn,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.qsh,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Etn,
        );
  }
  Klh() {
    var e, t;
    void 0 === this.zie ||
      this.Qlh >= this.wdt ||
      ((e = MathUtils_1.MathUtils.Clamp(this.Qlh, 0, this.wdt - 1)),
      (t = Vector_1.Vector.Create(this.zie?.D_GetLocationAtSplinePoint(e, 1))),
      Vector_1.Vector.Dist2D(this.Nme, t) < this.Wlh && (this.Qlh = e + 1));
  }
  Wsh() {
    var e;
    void 0 !== this.zie &&
      (this.Hsh.FromUeVector(
        this.zie.D_FindLocationClosestToWorldLocation(this.Nme.ToUeVector(), 1),
      ),
      (e = Vector_1.Vector.Dist2D(this.Nme, this.Hsh)),
      (this.Nsh += e),
      this.ksh++);
  }
  OnBeforeSubmit() {
    this.u$t = !0;
  }
  SubmitNode() {
    var e, t;
    this.Blackboard.ContainTag(7) ||
      this.Blackboard.IsSuspend() ||
      (this.OnBeforeSubmit(),
      (e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(
        this.Context.BtType,
        this.Context.TreeConfigId,
        this.Context.NodeId,
      ))
        ? "ChildQuest" !== e.Type
          ? this.OnAfterSubmit(!1)
          : ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                e.Condition.PreConditions,
                void 0,
              )
            ? (TimeOfDayController_1.TimeOfDayController.SyncServerGameTime(
                ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
              ),
              (e =
                ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
                  this.Context.TreeIncId,
                )),
              ((t = Protocol_1.Aki.Protocol.aC_.create()).d9n = e ?? 0),
              (t.C9n = MathUtils_1.MathUtils.BigIntToLong(
                this.Context.TreeIncId,
              )),
              (t.b5n = this.Context.NodeId),
              (t.Eps = this.Vsh),
              Net_1.Net.Call(20573, t, (e) => {
                this.OnAfterSubmit(e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs),
                  e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
                    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      e.Q4n,
                      29058,
                    );
              }))
            : ((e =
                ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                  Protocol_1.Aki.Protocol.Q4n.Proto_ErrPreCondition,
                )),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("GeneralLogicTree", 31, e),
              this.OnAfterSubmit(!1))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              31,
              "提交节点失败，找不到节点配置",
              [
                "TreeType",
                GeneralLogicTreeDefine_1.btTypeLogString[this.Context.BtType],
              ],
              ["TreeId", this.Context.TreeConfigId],
              ["NodeId", this.Context.NodeId],
            ),
          this.OnAfterSubmit(!1)));
  }
}
exports.WalkingPatternBehaviorNode = WalkingPatternBehaviorNode;
//# sourceMappingURL=WalkingPatternBehaviorNode.js.map
