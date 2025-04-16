"use strict";
var LevelSequenceFrameEventComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, o) {
      var r,
        i = arguments.length,
        s =
          i < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, o);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (r = e[a]) &&
            (s = (i < 3 ? r(s) : 3 < i ? r(t, n, s) : r(t, n)) || s);
      return 3 < i && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelSequenceFrameEventComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
let LevelSequenceFrameEventComponent =
  (LevelSequenceFrameEventComponent_1 = class LevelSequenceFrameEventComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Wpo = 0),
        (this.iRl = new Map()),
        (this.rRl = void 0),
        (this.oRl = new Map()),
        (this.nRl = new Map());
    }
    OnInitData(e) {
      var t,
        n,
        o = e.GetParam(LevelSequenceFrameEventComponent_1)[0],
        o =
          ((this.Lo = o),
          (this.Wpo = e.CreatureDataId),
          [
            [this.Lo.ForwardSections, this.oRl],
            [[...this.Lo.BackWardSections].reverse(), this.nRl],
          ]);
      for ([t, n] of o)
        for (const r of t)
          "EventMark" === r.Type
            ? this.iRl.has(r.Key)
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  26,
                  "[SceneItemReference][EventComp] 场景引用实体帧事件组件key重复",
                )
              : this.iRl.set(r.Key, r)
            : "Mark" === r.Type &&
              (n.has(r.Key)
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    26,
                    "[SceneItemReference][EventComp] 场景引用实体帧事件组件key重复",
                  )
                : n.set(r.Key, t.indexOf(r)));
      return !0;
    }
    OnClear() {
      return (this.Lo = void 0), this.iRl.clear(), !0;
    }
    ExecuteEvent(e) {
      var t,
        n = this.iRl.get(e);
      n
        ? n.ActionList &&
          (((t = LevelGeneralContextDefine_1.EntityContext.Create(
            this.Entity.Id,
          )).ClientExecuteActions = !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelPlay",
              26,
              "[SceneItemReference][EventComp] 执行帧事件",
              ["key", e],
              ["id", this.Wpo],
            ),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
            n.ActionList,
            t,
          ),
          this.sRl(e))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelPlay",
            26,
            "[SceneItemReference][EventComp] 找不到key",
            ["key", e],
            ["id", this.Wpo],
          );
    }
    OnSequencePlayToMark(e, n, t) {
      var o = this.rRl;
      if (((this.rRl = e), !t && o && o !== this.rRl)) {
        var r = this.oRl.get(o) < this.oRl.get(this.rRl),
          i = r ? this.oRl : this.nRl,
          s = r
            ? this.Lo.ForwardSections
            : [...this.Lo.BackWardSections].reverse();
        let t = void 0;
        for (let e = i.get(this.rRl); e > i.get(o); e--)
          if (r ? n > s[e].FrameId : n < s[e].FrameId) {
            t = s[e];
            break;
          }
        t &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelPlay",
              26,
              "[SceneItemReference][EventComp] 补帧",
              ["id", this.Wpo],
              ["mark", e],
              ["frame", n],
              ["isForwards", r],
              ["request key", t?.Key],
            ),
          this.sRl(t.Key));
      }
    }
    sRl(e) {
      var t = Protocol_1.Aki.Protocol.Tp_.create();
      (t.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()),
        (t.F4n = this.Wpo),
        (t.Z4n = e),
        Net_1.Net.Call(27785, t, (e) => {});
    }
  });
(LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(162)],
    LevelSequenceFrameEventComponent,
  )),
  (exports.LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent);
//# sourceMappingURL=LevelSequenceFrameEventComponent.js.map
