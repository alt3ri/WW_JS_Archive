"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, o, t, n);
    else
      for (var i = e.length - 1; 0 <= i; i--)
        (r = e[i]) && (s = (a < 3 ? r(s) : 3 < a ? r(o, t, s) : r(o, t)) || s);
    return 3 < a && s && Object.defineProperty(o, t, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTagComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  BaseTagComponent_1 = require("../../../Common/Component/BaseTagComponent");
let RoleTagComponent = class RoleTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments),
      (this.OnFormationLoaded = () => {
        var e = this.Entity.GetComponent(0),
          o = e.GetPlayerId(),
          t =
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(o),
          o =
            FormationDataController_1.FormationDataController.GetPlayerEntity(
              o,
            )?.GetComponent(190);
        if (o) {
          var n,
            r,
            t = t.some((e) => e.EntityHandle?.Entity === this.Entity) && o,
            a = new Map();
          if (t) {
            var s = this.TagContainer,
              i = o.TagContainer;
            for (const l of this.TagContainer.GetAllExactTags())
              a.set(l, i.GetExactTagCount(l) - s.GetExactTagCount(l));
            for (const m of o.TagContainer.GetAllExactTags())
              a.has(m) ||
                a.set(m, i.GetExactTagCount(m) - s.GetExactTagCount(m));
          } else
            for (const C of this.TagContainer.GetAllExactTags())
              a.set(C, -this.TagContainer.GetExactTagCount(C));
          for ([n, r] of a.entries()) this.TagContainer.UpdateExactTag(5, n, r);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              20,
              "RoleTagComponent初始化时找不到对应的PlayerTag组件",
              ["PlayerId", e?.GetPlayerId()],
              ["Entity", this.Entity.Id],
            );
      });
  }
  OnCreate() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.OnFormationLoaded,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.OnFormationLoaded,
      ),
      !0
    );
  }
  OnAnyTagChanged(e, o, t) {
    if (void 0 !== e && t !== o) {
      switch (e) {
        case -1384309247:
        case -1207177910:
        case -1388400236:
          var n;
          ((0 < o && t <= 0) || (o <= 0 && 0 < t)) &&
            (((n = Protocol_1.Aki.Protocol.n3a.create()).m5n = e),
            (n.iSs = o),
            CombatMessage_1.CombatNet.Call(25687, this.Entity, n, void 0));
      }
      super.OnAnyTagChanged(e, o, t);
      var r = this.Entity.GetComponent(0)?.GetPlayerId();
      r &&
        FormationDataController_1.FormationDataController.GetPlayerEntity(r)
          ?.GetComponent(184)
          ?.OnTagChanged(e);
    }
  }
};
(RoleTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(178)],
  RoleTagComponent,
)),
  (exports.RoleTagComponent = RoleTagComponent);
//# sourceMappingURL=RoleTagComponent.js.map
