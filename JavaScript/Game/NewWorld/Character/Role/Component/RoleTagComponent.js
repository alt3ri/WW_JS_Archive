"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      a = arguments.length,
      i =
        a < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, n);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (r = e[s]) && (i = (a < 3 ? r(i) : 3 < a ? r(t, o, i) : r(t, o)) || i);
    return 3 < a && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTagComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  BaseTagComponent_1 = require("../../../Common/Component/BaseTagComponent");
let RoleTagComponent = class RoleTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments),
      (this.OnFormationLoaded = () => {
        var e = this.Entity.GetComponent(0),
          t = e.GetPlayerId(),
          o =
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(t),
          t =
            FormationDataController_1.FormationDataController.GetPlayerEntity(
              t,
            )?.GetComponent(188);
        if (t) {
          var n,
            r,
            o = o.some((e) => e.EntityHandle?.Entity === this.Entity) && t,
            a = new Map();
          if (o) {
            var i = this.TagContainer,
              s = t.TagContainer;
            for (const l of this.TagContainer.GetAllExactTags())
              a.set(l, s.GetExactTagCount(l) - i.GetExactTagCount(l));
            for (const m of t.TagContainer.GetAllExactTags())
              a.has(m) ||
                a.set(m, s.GetExactTagCount(m) - i.GetExactTagCount(m));
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
  OnAnyTagChanged(e, t, o) {
    void 0 !== e &&
      o !== t &&
      (super.OnAnyTagChanged(e, t, o),
      (t = this.Entity.GetComponent(0)?.GetPlayerId())) &&
      FormationDataController_1.FormationDataController.GetPlayerEntity(t)
        ?.GetComponent(183)
        ?.OnTagChanged(e);
  }
};
(RoleTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(177)],
  RoleTagComponent,
)),
  (exports.RoleTagComponent = RoleTagComponent);
//# sourceMappingURL=RoleTagComponent.js.map
