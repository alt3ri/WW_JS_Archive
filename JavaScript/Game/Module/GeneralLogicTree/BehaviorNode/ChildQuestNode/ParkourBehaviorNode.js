"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourBehaviorNode = void 0);
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ParkourController_1 = require("../../../../LevelGamePlay/Parkour/ParkourController"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeNodeExtraInfo_1 = require("../../GeneralLogicTreeNodeExtraInfo"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ParkourBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.s$t = 0),
      (this.a$t = []),
      (this.h$t = (e, r) => {
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
      e.Type === IQuest_1.EChildQuest.Parkour) &&
      ((this.s$t = e.SplineEntityId), (this.a$t = e.MatchRoleOption), !0)
    );
  }
  OnStart(e) {
    super.OnStart(e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ParkourFinished,
        this.h$t,
      ),
      this.s$t &&
        ParkourController_1.ParkourController.StartParkour(
          this.s$t,
          this.Context,
          this.a$t,
        );
  }
  OnEnd(e) {
    super.OnEnd(e),
      this.s$t && ParkourController_1.ParkourController.EndParkour(this.s$t),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ParkourFinished,
        this.h$t,
      );
  }
  OnDestroy() {
    super.OnDestroy();
  }
  GetCustomTrackText(e) {
    let r = 0,
      t = 0;
    if (this.s$t) {
      var o = ModelManager_1.ModelManager.ParkourModel.GetParkour(this.s$t);
      if (!o?.ParkourInfo) return e;
      if (-1 !== e.search("{show_only}"))
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
    return 0 === t ? e : `${e}(${r}/${t})`;
  }
}
exports.ParkourBehaviorNode = ParkourBehaviorNode;
//# sourceMappingURL=ParkourBehaviorNode.js.map
