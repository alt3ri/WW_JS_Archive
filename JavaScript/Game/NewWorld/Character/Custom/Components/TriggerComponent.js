"use strict";
var TriggerComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, n) {
      var r,
        i = arguments.length,
        s =
          i < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, o))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, o, n);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (r = e[a]) &&
            (s = (i < 3 ? r(s) : 3 < i ? r(t, o, s) : r(t, o)) || s);
      return 3 < i && s && Object.defineProperty(t, o, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  RangeComponentMessageManager_1 = require("../RangeComponentMessageManager");
let TriggerComponent = (TriggerComponent_1 = class TriggerComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.vtn = void 0),
      (this.Lo = void 0),
      (this.HYo = 0),
      (this.ful = (e, t, o, n) => {
        (n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNotOpen &&
          n !==
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNoPermission &&
          n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractMultiGameMode) ||
          LevelGamePlayController_1.LevelGamePlayController.ShowFakeErrorCodeTips();
      });
  }
  get Actions() {
    return this.Lo?.ClientPrePerformance
      ? this.Lo?.Actions.filter((e) => "PlayEffect" !== e.Name)
      : this.Lo?.Actions;
  }
  get ExitActions() {
    return this.Lo?.ClientPrePerformance
      ? this.Lo?.ExitConfig?.Actions.filter((e) => "PlayEffect" !== e.Name)
      : this.Lo?.ExitConfig?.Actions;
  }
  OnInitData(e) {
    var e = e.GetParam(TriggerComponent_1)[0],
      e = e || void 0,
      t = this.Entity.GetComponent(119);
    return (
      t && !t.LogicRange && t.SetLogicRange(300),
      (this.Lo = e),
      (this.EIe = this.Entity.GetComponent(0)),
      (this.HYo = this.EIe.GetPbDataId()),
      !0
    );
  }
  OnStart() {
    return (
      (this.vtn = this.Entity.GetComponent(84)),
      this.vtn
        ? (this.Lo?.OnlineDisableTip &&
            !RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.HasMessage(
              this.Entity,
              Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
              Protocol_1.Aki.Protocol.WR_.Proto_Trigger,
              this.ful,
            ) &&
            RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.RegisterMessage(
              this.Entity,
              Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
              Protocol_1.Aki.Protocol.WR_.Proto_Trigger,
              this.ful,
            ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[TriggerComponent] RangeComp缺失",
              ["ConfigId", this.HYo],
            ),
          !1)
    );
  }
  OnEnd() {
    return (
      (this.Lo = void 0),
      RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.HasMessage(
        this.Entity,
        Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
        Protocol_1.Aki.Protocol.WR_.Proto_Trigger,
        this.ful,
      ) &&
        RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.UnRegisterMessage(
          this.Entity,
          Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter,
          Protocol_1.Aki.Protocol.WR_.Proto_Trigger,
          this.ful,
        ),
      !0
    );
  }
  CreateTriggerContext(e) {
    return LevelGeneralContextDefine_1.TriggerContext.Create(this.Entity.Id, e);
  }
});
(TriggerComponent = TriggerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(85)],
    TriggerComponent,
  )),
  (exports.TriggerComponent = TriggerComponent);
//# sourceMappingURL=TriggerComponent.js.map
