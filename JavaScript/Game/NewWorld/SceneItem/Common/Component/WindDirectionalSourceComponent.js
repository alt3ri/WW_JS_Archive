"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, i, n);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (o = t[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
    return 3 < r && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WindDirectionalSourceComponent = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData");
let WindDirectionalSourceComponent = class WindDirectionalSourceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.y6c = void 0),
      (this.QJr = void 0),
      (this.S6c = void 0),
      (this.M6c = void 0),
      (this.E6c = void 0),
      (this.g_n = (t, e) => {
        var i,
          n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
        n
          ? (i = this.E6c?.get(n))
            ? (this.M6c?.SetStrength(i.Strength), this.M6c?.SetSpeed(i.Speed))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "LevelPlay",
                72,
                "[WindDirectionalSourceComponent]实体状态切换到了风力组件没有配置 " +
                  n,
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlay",
              72,
              "[WindDirectionalSourceComponent]实体状态没有对应的TagName，可能漏提交了 " +
                t,
            );
      });
  }
  get I6c() {
    return this.S6c &&
      this.S6c.WindSource.Type === IComponent_1.EWindSourceType.Directional
      ? 0
      : 2;
  }
  OnInitData(t) {
    var e = this.Entity?.GetComponent(0);
    if (!e) return !1;
    e = e.GetPbEntityInitData();
    if (!e) return !1;
    if (
      ((this.y6c = (0, IComponent_1.getComponent)(
        e.ComponentsData,
        "EntityStateComponent",
      )),
      (this.S6c = (0, IComponent_1.getComponent)(
        e.ComponentsData,
        "WindSourceComponent",
      )),
      !this.S6c || !this.y6c)
    )
      return !1;
    this.E6c = new Map();
    for (const i of this.S6c.WindSource.Grades) this.E6c.set(i.State, i);
    return void 0 !== this.S6c;
  }
  OnStart() {
    var t;
    return (
      (this.QJr = this.Entity.GetComponent(1)),
      this.QJr?.Owner?.IsValid()
        ? (GlobalData_1.GlobalData.IsPlayInEditor
            ? ((this.M6c =
                ue_1.KuroRenderingEditorBPPluginBPLibrary.AddInstanceComponent(
                  this.QJr.Owner,
                  ue_1.WindDirectionalSourceComponent.StaticClass(),
                )),
              this.M6c.K2_AttachToComponent(
                this.QJr.Owner.RootComponent,
                FNameUtil_1.FNameUtil.NONE,
                2,
                2,
                2,
                !1,
              ))
            : (this.M6c = this.QJr?.Owner?.D_AddComponentByClass(
                ue_1.WindDirectionalSourceComponent.StaticClass(),
                !1,
                MathUtils_1.MathUtils.DefaultTransformDouble,
                !1,
              )),
          this.S6c &&
            ((t = this.S6c.WindSource.Rot),
            MathUtils_1.MathUtils.CommonTempRotator.Set(
              t.Y ?? 0,
              t.Z ?? 0,
              t.X ?? 0,
            ),
            this.M6c.K2_SetRelativeRotation(
              MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(),
              !1,
              void 0,
              !1,
            )),
          this.M6c?.SetWindType(this.I6c),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
          void 0 !== this.QJr)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlay",
              72,
              "[WindDirectionalSourceComponent]实体没有Owner Actor",
            ),
          !1)
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.g_n,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ),
      this.QJr?.Owner?.IsValid() &&
        this.M6c &&
        this.QJr.Owner.K2_DestroyComponent(this.M6c),
      !0
    );
  }
  OnActivate() {
    this.g_n(
      GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.y6c.State),
      !0,
    );
  }
  OnDisable() {
    this.M6c?.Deactivate();
  }
  OnEnable() {
    return this.M6c?.Activate(), !0;
  }
};
(WindDirectionalSourceComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(281)],
  WindDirectionalSourceComponent,
)),
  (exports.WindDirectionalSourceComponent = WindDirectionalSourceComponent);
//# sourceMappingURL=WindDirectionalSourceComponent.js.map
