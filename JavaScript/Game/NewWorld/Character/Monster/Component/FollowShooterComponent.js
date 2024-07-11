"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (n = (r < 3 ? o(n) : 3 < r ? o(e, i, n) : o(e, i)) || n);
    return 3 < r && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShooterComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LogReportController_1 = require("../../../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../Module/LogReport/LogReportDefine");
let FollowShooterComponent = class FollowShooterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.tRr = void 0),
      (this.Xte = void 0),
      (this.j8 = 0),
      (this.Mea = void 0),
      (this.Sea = void 0),
      (this.NeedInputActions = new Array()),
      (this.Eea = !1),
      (this.yea = !1),
      (this.Iea = !1),
      (this.Tea = new Array()),
      (this.Lea = new Array()),
      (this.Dea = new Array()),
      (this.ASa = !1),
      (this.RSa = !1),
      (this.USa = !1),
      (this.xie = () => {
        this.Aea() ? this.SetEnable(!1) : (this.Uea(), this.Rea());
      }),
      (this.ope = () => {
        (!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          1 ===
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(
              this.j8,
            )?.GetCurrentGroupType()) ||
          this.SetEnable(!1);
      }),
      (this.xea = (t, e) => {
        e && this.SetEnable(!1);
      }),
      (this.LZo = (e, i) => {
        if (this.Mea && this.IsNeedInput(e, 1)) {
          let t = void 0;
          switch (e) {
            case InputEnums_1.EInputAction.攻击:
              t = this.Mea.攻击按下(i);
              break;
            case InputEnums_1.EInputAction.技能1:
              t = this.Mea.技能1按下(i);
              break;
            case InputEnums_1.EInputAction.幻象2:
              t = this.Mea.幻象2按下(i);
          }
          this.Nl(t);
        }
      }),
      (this.Pea = (e, i) => {
        if (this.Mea && this.IsNeedInput(e, 3)) {
          let t = void 0;
          e === InputEnums_1.EInputAction.攻击 && (t = this.Mea.攻击长按(i)),
            this.Nl(t);
        }
      });
  }
  OnInitData(t) {
    var e = this.Entity.GetComponent(0)?.GetPbEntityInitData();
    return (
      e?.ComponentsData &&
        (e = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "FollowShooterComponent",
        )) &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.Config,
          UE.BP_FollowShooterConfig_C,
          (t) => {
            if (t?.IsValid) {
              (this.Iea = t.AutoEnable), (this.ASa = t.NeedUploadData);
              var e = t.NeedInputActions;
              for (let t = 0; t < e.Num(); t++) {
                var i = e.Get(t),
                  s = i.State;
                1 === s && (this.Eea = !0),
                  3 === s && (this.yea = !0),
                  this.NeedInputActions.push([i.Action, s]);
              }
              var o = t.AddTagsWhenEnable;
              for (let t = 0; t < o.Num(); t++) {
                var r = o.Get(t);
                this.Tea.push(r.TagId);
              }
              var n = t.DisableWhenCurrentRoleHasTags;
              for (let t = 0; t < n.Num(); t++) {
                var h = n.Get(t);
                this.Lea.push(h.TagId);
              }
              this.wea();
            }
          },
        ),
      !0
    );
  }
  wea() {
    this.Entity.IsInit && (this.Active || this.Iea) && this.SetEnable(!0);
  }
  OnStart() {
    (this.tRr = this.Entity.GetComponent(33)),
      (this.Xte = this.Entity.GetComponent(188)),
      (this.j8 = this.Entity.GetComponent(0)?.GetPlayerId() ?? 0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeMode,
        this.ope,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateTeamGroupType,
        this.ope,
      );
    const e = this.Entity.GetComponent(3)?.Actor;
    e &&
      e.InputComponentClass &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e.InputComponentClass.AssetPathName?.toString(),
        UE.Class,
        (t) => {
          (this.Mea = e.AddComponentByClass(
            t,
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
            (this.Mea.OwnerActor = e);
        },
      );
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
      this.Entity.Id,
    );
    return (
      t &&
        ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
          this.j8,
        )
          ?.GetComponent(204)
          ?.SetFollower(t),
      !0
    );
  }
  OnActivate() {
    this.Iea && this.SetEnable(!0);
  }
  OnEnd() {
    return (
      this.SetEnable(!1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeMode,
        this.ope,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateTeamGroupType,
        this.ope,
      ),
      (this.Mea = void 0),
      (this.Sea = void 0),
      (this.NeedInputActions.length = 0),
      (this.Eea = !1),
      (this.yea = !1),
      (this.Tea.length = 0),
      ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
        this.j8,
      )
        ?.GetComponent(204)
        ?.ClearFollower(),
      !0
    );
  }
  SetEnable(t) {
    !t || this.Aea() || ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? (this.Bea(),
        this.qea(),
        this.Gea(),
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          this.Entity,
          !1,
          "Follower Disable",
        ),
        this.xSa(),
        (this.RSa = !1),
        (this.USa = !1))
      : (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          this.Entity,
          !0,
          "Follower Enable",
        ),
        this.Rea(),
        this.bea(),
        this.Uea(),
        (this.RSa = !0));
  }
  Aea() {
    return (
      ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
        ParamType: 2,
        IsControl: !0,
      })
        ?.EntityHandle?.Entity?.GetComponent(188)
        ?.HasAnyTag(this.Lea) ?? !1
    );
  }
  Uea() {
    this.Gea();
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
      ParamType: 2,
      IsControl: !0,
    })?.EntityHandle?.Entity?.GetComponent(188);
    if (t)
      for (const i of this.Lea) {
        var e = t?.ListenForTagAddOrRemove(i, this.xea);
        e && this.Dea.push(e);
      }
  }
  Gea() {
    for (const t of this.Dea) t.EndTask();
    this.Dea.length = 0;
  }
  bea() {
    for (const t of this.Tea)
      this.Xte?.AddTag(t),
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(
          this.j8,
          t,
        );
  }
  qea() {
    for (const t of this.Tea)
      this.Xte?.RemoveTag(t),
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(
          this.j8,
          t,
        );
  }
  IsNeedInput(t, e) {
    if (this.Active)
      for (var [i, s] of this.NeedInputActions)
        if (i === t && s === e) return !0;
    return !1;
  }
  Rea() {
    var t, e;
    this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
      this.Active &&
      (this.Bea(),
      (e = (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
        ?.Entity),
      t?.Valid) &&
      e &&
      (this.NeedInputActions.length <= 0 ||
        ((this.Sea = t),
        this.Eea &&
          !EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.CharInputPress,
            this.LZo,
          ) &&
          EventSystem_1.EventSystem.AddWithTarget(
            e,
            EventDefine_1.EEventName.CharInputPress,
            this.LZo,
          ),
        !this.yea) ||
        EventSystem_1.EventSystem.HasWithTarget(
          e,
          EventDefine_1.EEventName.CharInputHold,
          this.Pea,
        ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharInputHold,
          this.Pea,
        ));
  }
  Bea() {
    var t, e;
    this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
      ((e = (t = this.Sea)?.Entity), t?.Valid) &&
      e &&
      (EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharInputPress,
        this.LZo,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e,
          EventDefine_1.EEventName.CharInputPress,
          this.LZo,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharInputHold,
        this.Pea,
      )) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.CharInputHold,
        this.Pea,
      );
  }
  Nl(t) {
    t &&
      1 === t.CommandType &&
      ((t = t.IntValue),
      this.tRr.BeginSkill(t, { Context: "Follower Begin Skill" }),
      (this.USa = !0));
  }
  xSa() {
    if (this.ASa && this.RSa) {
      var e = new LogReportDefine_1.FollowShooterUseLogData();
      let t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          1,
        )?.ActorLocationProxy;
      (t = t || this.Entity.GetComponent(1)?.ActorLocationProxy) &&
        ((e.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
        (e.i_father_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
        (e.f_pos_x = t.X),
        (e.f_pos_y = t.Y),
        (e.f_pos_z = t.Z),
        (e.i_has_target = this.USa ? 1 : 0),
        LogReportController_1.LogReportController.LogReport(e));
    }
  }
};
(FollowShooterComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(202)],
  FollowShooterComponent,
)),
  (exports.FollowShooterComponent = FollowShooterComponent);
//# sourceMappingURL=FollowShooterComponent.js.map
