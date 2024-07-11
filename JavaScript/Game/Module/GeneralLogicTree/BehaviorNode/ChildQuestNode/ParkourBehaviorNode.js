"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ParkourController_1 = require("../../../../LevelGamePlay/Parkour/ParkourController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeNodeExtraInfo_1 = require("../../GeneralLogicTreeNodeExtraInfo");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ParkourBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.sXt = 0),
      (this.aXt = []),
      (this.hXt = (e, r) => {
        if (e) {
          let e = void 0;
          if (r) {
            e = new GeneralLogicTreeNodeExtraInfo_1.ParkourExtraInfo();
            const t = {};
            r.forEach((e, r) => {
              t[r] = e;
            }),
              (e.TotalScore = t);
          }
          this.SubmitNode(e);
        }
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      ((e = e.Condition),
      (this.TrackTextRuleInner = 2),
      e.Type === "Parkour") &&
      ((this.sXt = e.SplineEntityId), (this.aXt = e.MatchRoleOption), !0)
    );
  }
  OnStart(e) {
    super.OnStart(e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ParkourFinished,
        this.hXt,
      ),
      this.sXt &&
        ParkourController_1.ParkourController.StartParkour(
          this.sXt,
          this.Context,
          this.aXt,
        );
  }
  OnEnd(e) {
    super.OnEnd(e),
      this.sXt && ParkourController_1.ParkourController.EndParkour(this.sXt),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ParkourFinished,
        this.hXt,
      );
  }
  OnDestroy() {
    super.OnDestroy();
  }
  GetCustomTrackText(e) {
    let r = 0;
    let t = 0;
    if (this.sXt) {
      const o = ModelManager_1.ModelManager.ParkourModel.GetParkour(this.sXt);
      if (!o?.ParkourInfo) return e;
      if (e.search("{show_only}") !== -1)
        return (
          (r = o.ParkourInfo.CheckPointsRequire - o.CurCheckPointCount),
          e.replace("{show_only}", " " + r.toString())
        );
      (t = o.ParkourInfo.CheckPointsRequire),
        (r = Math.min(
          o.ParkourInfo.CheckPointsRequire - o.CurCheckPointCount,
          o.ParkourInfo.CheckPointsRequire,
        ));
    }
    return t === 0 ? e : `${e}(${r}/${t})`;
  }
}
exports.ParkourBehaviorNode = ParkourBehaviorNode;
// # sourceMappingURL=ParkourBehaviorNode.js.map
