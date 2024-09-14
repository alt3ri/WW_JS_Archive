"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      o = arguments.length,
      h =
        o < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (n = t[r]) && (h = (o < 3 ? n(h) : 3 < o ? n(e, i, h) : n(e, i)) || h);
    return 3 < o && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShooterComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LogReportController_1 = require("../../../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../Module/LogReport/LogReportDefine"),
  DELAY_DISAPPEAR_MAX_TIME = 5e3;
let FollowShooterComponent = class FollowShooterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.tRr = void 0),
      (this.Xte = void 0),
      (this.IsEnable = !1),
      (this.j8 = 0),
      (this.VYa = !1),
      (this.NVa = !1),
      (this.Aia = void 0),
      (this.Uia = void 0),
      (this.NeedInputActions = new Array()),
      (this.Ria = !1),
      (this.xia = !1),
      (this.JVa = !1),
      (this.Pia = !1),
      (this.wia = new Array()),
      (this.Bia = new Array()),
      (this.bia = new Array()),
      (this.HIa = !1),
      (this.WIa = !1),
      (this.TBa = 0),
      (this.LBa = void 0),
      (this.xie = () => {
        this.Gia(), this.IsEnable && this.Oia(), this.bUa();
      }),
      (this.bUa = () => {
        this.qUa() ? this.Pia && this.SetEnable(!0) : this.SetEnable(!1);
      }),
      (this.LZo = (e, i) => {
        if (this.Aia && this.IsNeedInput(e, 1)) {
          let t = void 0;
          switch (e) {
            case InputEnums_1.EInputAction.攻击:
              t = this.Aia.攻击按下(i);
              break;
            case InputEnums_1.EInputAction.技能1:
              t = this.Aia.技能1按下(i);
              break;
            case InputEnums_1.EInputAction.幻象2:
              t = this.Aia.幻象2按下(i);
          }
          this.Nl(t);
        }
      }),
      (this.kia = (e, i) => {
        if (this.Aia && this.IsNeedInput(e, 3)) {
          let t = void 0;
          e === InputEnums_1.EInputAction.攻击 && (t = this.Aia.攻击长按(i)),
            this.Nl(t);
        }
      }),
      (this.ZVa = (e, i) => {
        if (this.Aia && this.IsNeedInput(e, 2)) {
          let t = void 0;
          e === InputEnums_1.EInputAction.幻象2 && (t = this.Aia.幻象2抬起(i)),
            this.Nl(t);
        }
      });
  }
  OnInitData(t) {
    var e = this.Entity.GetComponent(0);
    return (
      (this.j8 = e?.GetPlayerId() ?? 0),
      (this.NVa =
        this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      this.NVa &&
        (e = e?.GetPbEntityInitData())?.ComponentsData &&
        (e = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "FollowShooterComponent",
        )) &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.Config,
          UE.BP_FollowShooterConfig_C,
          (t) => {
            if (t?.IsValid) {
              (this.Pia = t.AutoEnable),
                (this.HIa = t.NeedUploadData),
                (this.TBa = t.DelayDisappearMillisecond);
              var e = t.NeedInputActions;
              for (let t = 0; t < e.Num(); t++) {
                var i = e.Get(t),
                  s = i.State;
                1 === s && (this.Ria = !0),
                  3 === s && (this.xia = !0),
                  2 === s && (this.JVa = !0),
                  this.NeedInputActions.push([i.Action, s]);
              }
              var n = t.AddTagsWhenEnable;
              for (let t = 0; t < n.Num(); t++) {
                var o = n.Get(t);
                this.wia.push(o.TagId);
              }
              var h = t.DisableWhenCurrentRoleHasTags;
              for (let t = 0; t < h.Num(); t++) {
                var r = h.Get(t);
                this.Bia.push(r.TagId);
              }
              this.VYa &&
                (this.Gia(), this.Entity.IsInit) &&
                (this.Active || this.Pia) &&
                this.SetEnable(!0);
            }
          },
        ),
      !0
    );
  }
  OnStart() {
    var t = this.Entity.GetComponent(0).GetCreatureDataId();
    if (
      (ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
        this.j8,
      )
        ?.GetComponent(206)
        ?.OnFollowerAdd(t),
      this.NVa)
    ) {
      (this.tRr = this.Entity.GetComponent(34)),
        (this.Xte = this.Entity.GetComponent(190));
      const e = this.Entity.GetComponent(3)?.Actor;
      e &&
        e.InputComponentClass &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.InputComponentClass.AssetPathName?.toString(),
          UE.Class,
          (t) => {
            (this.Aia = e.AddComponentByClass(
              t,
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )),
              (this.Aia.OwnerActor = e);
          },
        );
    }
    return !0;
  }
  OnEnd() {
    return (
      (this.TBa = 0),
      this.LBa?.Remove(),
      (this.LBa = void 0),
      (this.Aia = void 0),
      (this.Uia = void 0),
      (this.NeedInputActions.length = 0),
      (this.Ria = !1),
      (this.xia = !1),
      (this.JVa = !1),
      (this.wia.length = 0),
      (this.Pia = !1),
      (this.j8 = 0),
      (this.NVa = !1),
      !(this.VYa = !1)
    );
  }
  Possess() {
    this.NVa &&
      !this.VYa &&
      ((this.VYa = !0),
      this.Gia(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeMode,
        this.bUa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateTeamGroupType,
        this.bUa,
      ),
      this.Pia) &&
      this.SetEnable(!0);
  }
  UnPossess() {
    this.NVa &&
      this.VYa &&
      ((this.VYa = !1),
      this.SetEnable(!1),
      this.Wia(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeMode,
        this.bUa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateTeamGroupType,
        this.bUa,
      ));
  }
  SetEnable(t) {
    if (this.NVa && this.IsEnable !== t)
      if (t) {
        if (this.qUa()) {
          this.LBa?.Remove(),
            (this.LBa = void 0),
            (this.IsEnable = !0),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              this.Entity,
              !0,
              "Follower Enable",
              !0,
            ),
            this.Oia();
          for (const e of this.wia)
            this.Xte?.AddTag(e),
              ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(
                this.j8,
                e,
              );
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
            !0,
          );
        }
      } else {
        this.Via();
        for (const i of this.wia)
          this.Xte?.RemoveTag(i),
            ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(
              this.j8,
              i,
            );
        this.QIa(),
          (this.IsEnable = !1),
          (this.WIa = !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
            !1,
          ),
          0 < this.TBa && this.TBa <= DELAY_DISAPPEAR_MAX_TIME
            ? this.LBa ||
              (this.LBa = TimerSystem_1.TimerSystem.Delay(() => {
                (this.LBa = void 0),
                  ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                    this.Entity,
                    !1,
                    "Follower Disable",
                    !0,
                  );
              }, this.TBa))
            : ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                this.Entity,
                !1,
                "Follower Disable",
                !0,
              );
      }
  }
  qUa() {
    var t;
    return (
      1 === ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType &&
      !(
        !(t =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            190,
          )) || t.HasAnyTag(this.Bia)
      )
    );
  }
  Gia() {
    this.Wia();
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
      ParamType: 2,
      IsControl: !0,
    })?.EntityHandle?.Entity?.GetComponent(190);
    if (t)
      for (const i of this.Bia) {
        var e = t?.ListenForTagAddOrRemove(i, this.bUa);
        e && this.bia.push(e);
      }
  }
  Wia() {
    for (const t of this.bia) t.EndTask();
    this.bia.length = 0;
  }
  IsNeedInput(t, e) {
    if (this.Active)
      for (var [i, s] of this.NeedInputActions)
        if (i === t && s === e) return !0;
    return !1;
  }
  Oia() {
    var t, e;
    this.IsEnable &&
      (this.Via(),
      (e = (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
        ?.Entity),
      t?.Valid) &&
      e &&
      (this.NeedInputActions.length <= 0 ||
        ((this.Uia = t),
        this.Ria &&
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
        this.xia &&
          !EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.CharInputHold,
            this.kia,
          ) &&
          EventSystem_1.EventSystem.AddWithTarget(
            e,
            EventDefine_1.EEventName.CharInputHold,
            this.kia,
          ),
        !this.JVa) ||
        EventSystem_1.EventSystem.HasWithTarget(
          e,
          EventDefine_1.EEventName.CharInputRelease,
          this.ZVa,
        ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharInputRelease,
          this.ZVa,
        ));
  }
  Via() {
    var t = this.Uia,
      e = t?.Entity;
    t?.Valid &&
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
        this.kia,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e,
          EventDefine_1.EEventName.CharInputHold,
          this.kia,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharInputRelease,
        this.ZVa,
      )) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.CharInputRelease,
        this.ZVa,
      );
  }
  Nl(t) {
    t &&
      1 === t.CommandType &&
      ((t = t.IntValue),
      this.tRr.BeginSkill(t, { Context: "Follower Begin Skill" }),
      (this.WIa = !0));
  }
  QIa() {
    if (this.HIa) {
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
        (e.i_has_target = this.WIa ? 1 : 0),
        LogReportController_1.LogReportController.UnitLogReport(e));
    }
  }
};
(FollowShooterComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(204)],
  FollowShooterComponent,
)),
  (exports.FollowShooterComponent = FollowShooterComponent);
//# sourceMappingURL=FollowShooterComponent.js.map
