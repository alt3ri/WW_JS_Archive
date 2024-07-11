"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../../GlobalData");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const PROFILE_KEY = "TsTaskNpcFindFleePosition_GetNoTargetDirectionList";
const CHECK_DEGREE_ADDITION = 15;
class TsTaskNpcFindFleePosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.SearchRange = 0),
      (this.BlackboardKey = ""),
      (this.TempEnemyList = void 0),
      (this.TraceElement = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsSearchRange = 0),
      (this.TsBlackboardKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsSearchRange = this.SearchRange),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  ReceiveExecuteAI(t, e) {
    if ((this.InitTsVariables(), t instanceof TsAiController_1.default)) {
      this.TempEnemyList || (this.TempEnemyList = new Array()),
        (this.TempEnemyList.length = 0);
      t = t.AiController;
      const o = t.CharActorComp;
      const i = o.Entity.Id;
      const r = o.ActorLocationProxy;
      var t =
        (this.InitTraceElement(),
        t.AiPerception && this.FindEnemies(t.AiPerception),
        MathUtils_1.MathUtils.GetRandomFloatNumber(
          this.TsSearchRange / 2,
          this.TsSearchRange,
        ));
      let s = this.GetNoTargetDirectionList(r, o);
      if (s.length > 0) {
        s = this.GetOptimalDirection(r, s).MultiplyEqual(t).AdditionEqual(r);
        BlackboardController_1.BlackboardController.SetVectorValueByEntity(
          i,
          this.TsBlackboardKey,
          s.X,
          s.Y,
          s.Z,
        );
      } else {
        s = this.TempEnemyList.length;
        if (!(s > 0)) return void this.FinishExecute(!1);
        {
          s = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, s));
          const o = this.TempEnemyList[s]?.GetComponent(1);
          (s = Vector_1.Vector.Create(r).SubtractionEqual(
            o.ActorLocationProxy,
          )),
            (s = (s.Normalize(), s.MultiplyEqual(t).AdditionEqual(r)));
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            i,
            this.TsBlackboardKey,
            s.X,
            s.Y,
            s.Z,
          );
        }
      }
      this.FinishExecute(!0);
    } else this.FinishExecute(!1);
  }
  InitTraceElement() {
    this.TraceElement ||
      ((this.TraceElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.TraceElement.bIsSingle = !0),
      (this.TraceElement.bIgnoreSelf = !0),
      this.TraceElement.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
      )),
      (this.TraceElement.WorldContextObject = this.GetWorld());
  }
  FindEnemies(t) {
    for (const i of t.AllEnemies) {
      const e = EntitySystem_1.EntitySystem.Get(i);
      e && this.TempEnemyList.push(e);
    }
  }
  GetNoTargetDirectionList(e, t) {
    const i = new Array();
    const r = t.ActorForwardProxy;
    const s =
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.TraceElement,
        e,
      ),
      MathUtils_1.PI_DEG_DOUBLE / CHECK_DEGREE_ADDITION);
    for (let t = 0; t < s; t++) {
      var o = t * CHECK_DEGREE_ADDITION;
      const l = Vector_1.Vector.Create();
      var o =
        (r.RotateAngleAxis(o, Vector_1.Vector.UpVectorProxy, l),
        Vector_1.Vector.Create());
      var o =
        (l.Multiply(this.TsSearchRange, o),
        o.AdditionEqual(e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.TraceElement,
          o,
        ),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.TraceElement,
          PROFILE_KEY,
        ));
      (o && this.TraceElement.HitResult.bBlockingHit) || i.push(l);
    }
    return i;
  }
  GetOptimalDirection(i, r) {
    const s = this.TempEnemyList.length;
    if (s === 0) {
      const o = Math.floor(
        MathUtils_1.MathUtils.GetRandomFloatNumber(0, r.length),
      );
      return r[o];
    }
    let o = 0;
    let l = 0;
    for (let t = 0, e = r.length; t < e; t++) {
      const a = Vector_1.Vector.Create(r[t]).MultiplyEqual(this.TsSearchRange);
      a.AdditionEqual(i);
      let e = 0;
      for (let t = 0; t < s; t++) {
        var n = this.TempEnemyList[t]?.GetComponent(1);
        var n = Vector_1.Vector.Dist(n.ActorLocationProxy, a);
        e < n && (e = n);
      }
      e > l && ((l = e), (o = t));
    }
    return r[o];
  }
}
exports.default = TsTaskNpcFindFleePosition;
// # sourceMappingURL=TsTaskNpcFindFleePosition.js.map
