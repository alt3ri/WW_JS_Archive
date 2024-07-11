"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourController = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const GeneralLogicTreeController_1 = require("../../Module/GeneralLogicTree/GeneralLogicTreeController");
const SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController");
const ParkourModel_1 = require("./ParkourModel");
class ParkourController extends ControllerBase_1.ControllerBase {
  static StartParkour(e, r, o) {
    ModelManager_1.ModelManager.ParkourModel.AddParkour(e, r, o) && this.yAe(e);
  }
  static EndParkour(e) {
    ModelManager_1.ModelManager.ParkourModel.RemoveParkour(e);
  }
  static HandleParkourPoint(e, r, o) {
    const t = ModelManager_1.ModelManager.ParkourModel.GetParkour(e);
    if (t) {
      let a = t.ParkourInfo;
      if (a)
        if (r === a.Points.length - 1)
          t.CurCheckPointCount <= 0 &&
            (this.EndParkour(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ParkourFinished,
              e.toString(),
              t.TotalScore,
            ));
        else {
          var l = t.ParkourActorList[r];
          if (
            (l?.length > o &&
              ((o = (l = l[o]).Point), !l.IsRecycled) &&
              o?.IsValid() &&
              (o.ReceiveEndPlay(0),
              ActorSystem_1.ActorSystem.Put(o),
              (l.IsRecycled = !0)),
            r !== 0)
          ) {
            t.CurCheckPointCount--;
            var o = t.TotalScore;
            var l = o.get(1);
            var l = (l ? o.set(1, ++l) : o.set(1, 1), a.Points[r]);
            if (l?.ModifiedTime && t.ParkourContext) {
              let e = Protocol_1.Aki.Protocol.uqs.Proto_Add;
              l.ModifiedTime < 0 && (e = Protocol_1.Aki.Protocol.uqs.Proto_Sub),
                GeneralLogicTreeController_1.GeneralLogicTreeController.RequestSetTimerInfo(
                  t.ParkourContext.TreeIncId,
                  t.ParkourContext.NodeId,
                  "CountDownChallenge",
                  e,
                  l.ModifiedTime,
                );
            }
            !a.IsRequireToEnd &&
              t.CurCheckPointCount <= 0 &&
              (this.EndParkour(e),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ParkourFinished,
                e.toString(),
                t.TotalScore,
              )),
              l?.BuffId &&
                (o = Global_1.Global.BaseCharacter)?.IsValid() &&
                (r = o?.CharacterActorComponent.Entity)?.Valid &&
                ((a = r.GetComponent(157))
                  ? a.AddBuff(BigInt(l.BuffId), {
                      InstigatorId: a.CreatureDataId,
                      Reason: "Parkour",
                    })
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Level",
                      7,
                      "AddBuffToPlayer 获取当前角色没有AbilityComponent",
                    ));
          }
        }
    }
  }
  static yAe(r) {
    const e = ModelManager_1.ModelManager.ParkourModel.GetParkour(r);
    e.ClearTotalScore(),
      e.ParkourActorList || (e.ParkourActorList = new Array());
    let o = 0;
    const t = e.ParkourInfo;
    for (const i of t.Points) {
      const a = new Array();
      if (i.PointGroup) {
        let e = 0;
        for (const s of i.PointGroup.Points) {
          var l = Vector_1.Vector.Create(s.X ?? 0, s.Y ?? 0, s.Z ?? 0);
          var l = UE.KismetMathLibrary.MakeTransform(
            l.ToUeVector(),
            MathUtils_1.MathUtils.DefaultTransform.Rotator(),
            MathUtils_1.MathUtils.DefaultTransform.GetScale3D(),
          );
          var l = this.IAe(l, r, o, e++, i, t);
          a.push(new ParkourModel_1.ParkourPointInfo(l));
        }
      } else {
        var n = Vector_1.Vector.Create(
          i.Position.X ?? 0,
          i.Position.Y ?? 0,
          i.Position.Z ?? 0,
        );
        var n =
          (e.OriginRotation && e.OriginRotation.Quaternion().RotateVector(n, n),
          e.OriginLocation && n.Addition(e.OriginLocation, n),
          UE.KismetMathLibrary.MakeTransform(
            n.ToUeVector(),
            MathUtils_1.MathUtils.DefaultTransform.Rotator(),
            MathUtils_1.MathUtils.DefaultTransform.GetScale3D(),
          ));
        var n = this.IAe(n, r, o, 0, i, t);
        a.push(new ParkourModel_1.ParkourPointInfo(n));
      }
      e.ParkourActorList.push(a), o++;
    }
  }
  static IAe(e, r, o, t, a, l) {
    const n = ActorSystem_1.ActorSystem.Get(
      UE.TsParkourCheckPoint_C.StaticClass(),
      e,
      void 0,
    );
    if ((n.ReceiveBeginPlay(), n.IsValid())) {
      (n.CheckPointIndex = o.valueOf()),
        (n.IndexInGroup = t),
        (n.CheckTag = a.PlayerTag ?? ""),
        (n.ParkourId = r),
        n.SetDetectSphere(a.Radius);
      let e = void 0;
      switch (o) {
        case 0:
          e = l.StartResource;
          break;
        case l.Points.length - 1:
          e = l.EndResource;
          break;
        default:
          (e = l.CheckPointResource),
            (n.DestroyEffectModelBasePath = l.CheckPointsDestroyRes ?? "");
      }
      return (
        e && !StringUtils_1.StringUtils.IsEmpty(e) && n.GenerateFxByPath(e), n
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Level", 32, "[GenerateParkPointActor] 生成Actor失败");
  }
  static MatchParkourRoleConfig(e) {
    e = ModelManager_1.ModelManager.ParkourModel.GetParkour(e);
    return (
      !!e &&
      (!e.MatchRoleOption || e.MatchRoleOption?.length <= 0
        ? !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
        : SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
            e.MatchRoleOption,
          ))
    );
  }
}
exports.ParkourController = ParkourController;
// # sourceMappingURL=ParkourController.js.map
