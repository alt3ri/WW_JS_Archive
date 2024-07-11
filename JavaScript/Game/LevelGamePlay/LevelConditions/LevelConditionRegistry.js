"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionRegistry = exports.ConditionPassCallback = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ConditionById_1 = require("../../../Core/Define/ConfigQuery/ConditionById"),
  ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine"),
  LevelConditionCenter_1 = require("./LevelConditionCenter"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class ConditionPassCallback {
  constructor(e, t) {
    (this.Callback = e), (this.Params = t);
  }
}
exports.ConditionPassCallback = ConditionPassCallback;
class LevelConditionRegData {
  constructor(e, t, i) {
    (this.ConditionReached = !1),
      (this.nLe = void 0),
      (this.sLe = (...e) => {
        this.nLe || (this.nLe = void 0);
        var t = this.ConditionReached,
          e =
            ControllerHolder_1.ControllerHolder.LevelGeneralController.HandleCondition(
              this.ConditionConfig,
              void 0,
              this.Owner.ConditionGroupId.toString(),
              ...e,
            );
        t !== e && (this.ConditionReached = e) && this.Owner.CheckReached();
      }),
      (this.Owner = e),
      (this.ConditionConfig = t),
      (this.EventNames = i),
      this.ConditionConfig.Type ===
        LevelGeneralDefine_1.ELevelGeneralCondition.PawnInRange &&
        ((e = this.ConditionConfig.LimitParams.get("PawnId")),
        (t = Number(this.ConditionConfig.LimitParams.get("Distance"))),
        LevelConditionRegistry.AddPawnInRangeMap(e, t)),
      this.ConditionConfig.Type ===
        LevelGeneralDefine_1.ELevelGeneralCondition.CheckRangeByPbDataId &&
        ((i = this.ConditionConfig.LimitParams.get("PbDataId")),
        (e = Number(this.ConditionConfig.LimitParams.get("Distance"))),
        LevelConditionRegistry.AddPbDataInRangeMap(parseInt(i), e));
    for (const n of this.EventNames)
      n === EventDefine_1.EEventName.OnGlobalGameplayTagChanged
        ? EventSystem_1.EventSystem.AddWithTarget(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
              this.ConditionConfig.LimitParams.get("Tag"),
            ),
            n,
            this.sLe,
          )
        : EventSystem_1.EventSystem.Add(n, this.sLe);
  }
  Destroy() {
    var e;
    this.ConditionConfig.Type ===
      LevelGeneralDefine_1.ELevelGeneralCondition.PawnInRange &&
      ((e = this.ConditionConfig.LimitParams.get("PawnId")),
      LevelConditionRegistry.RemovePawnInRangeMap(e)),
      this.ConditionConfig.Type ===
        LevelGeneralDefine_1.ELevelGeneralCondition.CheckRangeByPbDataId &&
        ((e = this.ConditionConfig.LimitParams.get("PbDataId")),
        LevelConditionRegistry.RemovePbDataInRangeMap(parseInt(e)));
    for (const t of this.EventNames)
      t === EventDefine_1.EEventName.OnGlobalGameplayTagChanged
        ? EventSystem_1.EventSystem.RemoveWithTarget(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
              this.ConditionConfig.LimitParams.get("Tag"),
            ),
            t,
            this.sLe,
          )
        : EventSystem_1.EventSystem.Remove(t, this.sLe);
  }
}
class LevelConditionGroupRegData {
  constructor(e) {
    (this.aLe = new Set()), (this.hLe = new Set()), (this.ConditionGroupId = e);
    e = ConditionGroupById_1.configConditionGroupById.GetConfig(
      this.ConditionGroupId,
    );
    if (e) {
      this.lLe = 1 === e.Relation;
      for (const n of e.GroupId) {
        var t,
          i = ConditionById_1.configConditionById.GetConfig(n);
        i &&
          (t =
            LevelConditionCenter_1.LevelConditionCenter.GetConditionEventNames(
              i.Type,
            )).length &&
          this.aLe.add(new LevelConditionRegData(this, i, t));
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelConditionRegistry",
          17,
          "初始化事件条件组时, 找不到条件组配置",
          ["条件组Id", this.ConditionGroupId],
        );
  }
  IsValid() {
    return 0 < this.aLe.size;
  }
  InvokeCallbacks() {
    for (const e of this.hLe) e.Callback?.(e.Params);
  }
  CheckReached() {
    if (this.lLe) {
      for (const e of this.aLe)
        if (e.ConditionReached) return void this.InvokeCallbacks();
    } else {
      for (const t of this.aLe) if (!t.ConditionReached) return;
      this.InvokeCallbacks();
    }
  }
  AddCallBack(e) {
    this.hLe.add(e);
  }
  RemoveCallBack(e) {
    if (!this.hLe.delete(e)) return !1;
    if (0 < this.hLe.size) return !1;
    for (const t of this.aLe) t.Destroy(), this.aLe.delete(t);
    return !0;
  }
}
__decorate(
  [(0, Stats_1.statDecorator)("LevelConditionGroupRegData.InvokeCallbacks")],
  LevelConditionGroupRegData.prototype,
  "InvokeCallbacks",
  null,
),
  __decorate(
    [(0, Stats_1.statDecorator)("LevelConditionGroupRegData.CheckReached")],
    LevelConditionGroupRegData.prototype,
    "CheckReached",
    null,
  );
class LevelConditionRegistry {
  static RegisterConditionGroup(e, t) {
    let i = this._Le.get(e);
    return (
      i || ((i = new LevelConditionGroupRegData(e)), this._Le.set(e, i)),
      !!i.IsValid() && (i.AddCallBack(t), !0)
    );
  }
  static UnRegisterConditionGroup(e, t) {
    var i = this._Le.get(e);
    i && i.RemoveCallBack(t) && !i.IsValid() && this._Le.delete(e);
  }
  static AddPawnInRangeMap(e, t) {
    this.uLe.set(e, t);
  }
  static RemovePawnInRangeMap(e) {
    this.uLe.delete(e);
  }
  static AddPbDataInRangeMap(e, t) {
    this.cLe.set(e, t);
  }
  static RemovePbDataInRangeMap(e) {
    this.cLe.delete(e);
  }
  static RegisterEntityPawnRange(e) {
    var t,
      i = e?.GetComponent(0);
    i &&
      ((t = i.GetPbDataId()),
      this.cLe.has(t)
        ? e?.GetComponent(104)?.SetGuideRange(this.cLe.get(t))
        : (t = i.GetPbEntityInitData()?.BlueprintType) &&
          this.uLe.has(t) &&
          e?.GetComponent(104)?.SetGuideRange(this.uLe.get(t)));
  }
}
((exports.LevelConditionRegistry = LevelConditionRegistry)._Le = new Map()),
  (LevelConditionRegistry.uLe = new Map()),
  (LevelConditionRegistry.cLe = new Map());
//# sourceMappingURL=LevelConditionRegistry.js.map
