"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  TsAiController_1 = require("../../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
  PROFILE_KEY = "TsTaskNpcFindFleePosition_GetNoTargetDirectionList",
  CHECK_DEGREE_ADDITION = 15;
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
  Constructor() {
    super.Constructor(),
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
      var i = o.Entity.Id,
        s = o.ActorLocationProxy,
        t =
          (this.InitTraceElement(),
          t.AiPerception && this.FindEnemies(t.AiPerception),
          MathUtils_1.MathUtils.GetRandomFloatNumber(
            this.TsSearchRange / 2,
            this.TsSearchRange,
          )),
        r = this.GetNoTargetDirectionList(s, o);
      if (0 < r.length) {
        r = this.GetOptimalDirection(s, r).MultiplyEqual(t).AdditionEqual(s);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
          i,
          this.TsBlackboardKey,
          r.X,
          r.Y,
          r.Z,
        );
      } else {
        r = this.TempEnemyList.length;
        if (!(0 < r)) return void this.FinishExecute(!1);
        {
          r = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, r));
          const o = this.TempEnemyList[r]?.GetComponent(1);
          (r = Vector_1.Vector.Create(s).SubtractionEqual(
            o.ActorLocationProxy,
          )),
            (r = (r.Normalize(), r.MultiplyEqual(t).AdditionEqual(s)));
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
            i,
            this.TsBlackboardKey,
            r.X,
            r.Y,
            r.Z,
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
      var e = EntitySystem_1.EntitySystem.Get(i);
      e && this.TempEnemyList.push(e);
    }
  }
  GetNoTargetDirectionList(e, t) {
    var i = new Array(),
      s = t.ActorForwardProxy,
      r =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.TraceElement,
          e,
        ),
        MathUtils_1.PI_DEG_DOUBLE / CHECK_DEGREE_ADDITION);
    for (let t = 0; t < r; t++) {
      var o = t * CHECK_DEGREE_ADDITION,
        h = Vector_1.Vector.Create(),
        o =
          (s.RotateAngleAxis(o, Vector_1.Vector.UpVectorProxy, h),
          Vector_1.Vector.Create()),
        o =
          (h.Multiply(this.TsSearchRange, o),
          o.AdditionEqual(e),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.TraceElement,
            o,
          ),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.TraceElement,
            PROFILE_KEY,
          ));
      (o && this.TraceElement.HitResult.bBlockingHit) || i.push(h);
    }
    return i;
  }
  GetOptimalDirection(i, s) {
    var r = this.TempEnemyList.length;
    if (0 === r) {
      const o = Math.floor(
        MathUtils_1.MathUtils.GetRandomFloatNumber(0, s.length),
      );
      return s[o];
    }
    let o = 0,
      h = 0;
    for (let t = 0, e = s.length; t < e; t++) {
      var l = Vector_1.Vector.Create(s[t]).MultiplyEqual(this.TsSearchRange);
      l.AdditionEqual(i);
      let e = 0;
      for (let t = 0; t < r; t++) {
        var n = this.TempEnemyList[t]?.GetComponent(1),
          n = Vector_1.Vector.Dist(n.ActorLocationProxy, l);
        e < n && (e = n);
      }
      e > h && ((h = e), (o = t));
    }
    return s[o];
  }
}
exports.default = TsTaskNpcFindFleePosition;
//# sourceMappingURL=TsTaskNpcFindFleePosition.js.map
