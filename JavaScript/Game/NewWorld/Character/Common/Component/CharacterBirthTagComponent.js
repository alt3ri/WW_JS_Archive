"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      o = arguments.length,
      r =
        o < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (n = t[h]) && (r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
    return 3 < o && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterBirthTagComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController");
let CharacterBirthTagComponent = class CharacterBirthTagComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Lie = void 0),
      (this._Ka = void 0),
      (this.uKa = !1),
      (this.cKa = []),
      (this.dIe = () => {
        this.cKa &&
          0 !== this.cKa.length &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              42,
              "天气变更，检查待机状态Tag条件",
              ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
              ["EntityId", this.Hte?.Entity.Id],
            ),
          this.mKa());
      }),
      (this.J5l = () => {
        this.cKa &&
          0 !== this.cKa.length &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              42,
              "时间状态变更，检查待机状态Tag条件",
              ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
              ["EntityId", this.Hte?.Entity.Id],
            ),
          this.mKa());
      });
  }
  OnEnd() {
    return (
      this.uKa &&
        ((this.cKa.length = 0),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.WeatherChange,
          this.dIe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CrossHour,
          this.J5l,
        )),
      !0
    );
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(3)),
      (this.Lie = this.Entity.GetComponent(203));
    var t = this.Hte.CreatureData?.GetPbEntityInitData();
    if (
      t &&
      this.Lie &&
      this.Hte &&
      ((this._Ka = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "AiComponent",
      )),
      this._Ka)
    )
      switch (this._Ka.InitState?.Type) {
        case 0:
          this.Lie.AddTag(1927538016);
          break;
        case 1:
          this.CKa(this._Ka.InitState);
          break;
        case 2:
          this.Lie.AddTag(447365096);
          break;
        case 3:
          this.Lie.AddTag(-1183618125);
          break;
        case 4:
          this.Lie.AddTag(-1609174800);
      }
    return !0;
  }
  CKa(e) {
    if (this.Lie && e) {
      this.cKa.length = 0;
      var i = ObjectUtils_1.ObjectUtils.GetGameplayTags(e.StandbyTags);
      for (let t = 0; t < i.length; t++) {
        var s = i[t].TagId;
        if (e.Conditions) {
          var n = e.Conditions[t];
          if (n) {
            this.cKa.push({ Tag: i[t], Conditions: n });
            continue;
          }
        }
        this.Lie.HasTag(s) || this.Lie.AddTag(s);
      }
      0 !== this.cKa.length &&
        ((this.uKa = !0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WeatherChange,
          this.dIe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CrossHour,
          this.J5l,
        ),
        this.mKa());
    }
  }
  mKa() {
    if (this.Lie && this.cKa && 0 !== this.cKa.length)
      for (const i of this.cKa) {
        var t =
            LevelGeneralController_1.LevelGeneralController.CheckConditionNew(
              i.Conditions,
              void 0,
            ),
          e = i.Tag.TagId;
        t &&
          !this.Lie.HasTag(e) &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              42,
              "待机状态Tag条件发生变化，添加Tag",
              ["Tag", i.Tag.TagName],
              ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
              ["EntityId", this.Hte?.Entity.Id],
            ),
          this.Lie.AddTag(e)),
          !t &&
            this.Lie.HasTag(e) &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "AI",
                42,
                "待机状态Tag条件发生变化，移除Tag",
                ["Tag", i.Tag.TagName],
                ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
                ["EntityId", this.Hte?.Entity.Id],
              ),
            this.Lie.RemoveTag(e));
      }
  }
};
(CharacterBirthTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(250)],
  CharacterBirthTagComponent,
)),
  (exports.CharacterBirthTagComponent = CharacterBirthTagComponent);
//# sourceMappingURL=CharacterBirthTagComponent.js.map
