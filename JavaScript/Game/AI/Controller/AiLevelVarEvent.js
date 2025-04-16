"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiLevelVarEvent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager");
class LevelVarEventPair {
  constructor() {
    (this.LevelVar = void 0),
      (this.EventBinder = void 0),
      (this.CurrentValueInternal = !1),
      (this.IsInit = !1);
  }
  set CurrentValue(e) {
    this.CurrentValueInternal !== e &&
      ((this.CurrentValueInternal = e),
      this.EventBinder instanceof UE.KuroBooleanEventBinder ||
        this.EventBinder instanceof UE.KuroIntEventBinder) &&
      this.EventBinder.Callback.Broadcast(e);
  }
  get CurrentValue() {
    return this.CurrentValueInternal;
  }
  Init(e, t) {
    return (this.LevelVar = e), (this.EventBinder = t), !0;
  }
  Clear() {
    (this.LevelVar = void 0), (this.EventBinder = void 0);
  }
  ParseValue(e, t = !0) {
    return void 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            31,
            "添加监听的变量未找到",
            ["Key", this.LevelVar.VarName],
            ["QuestId", this.LevelVar.Id],
          ),
        !1)
      : this.EventBinder instanceof UE.KuroBooleanEventBinder
        ? void 0 === e.rTs
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "AI",
                31,
                "添加监听的变量类型不正确",
                ["Key", this.LevelVar.VarName],
                ["QuestId", this.LevelVar.Id],
              ),
            !1)
          : (t
              ? (this.CurrentValueInternal = e.rTs)
              : (this.CurrentValue = e.rTs),
            !0)
        : this.EventBinder instanceof UE.KuroIntEventBinder &&
          (void 0 === e.oTs
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "AI",
                  31,
                  "添加监听的变量类型不正确",
                  ["Key", this.LevelVar.VarName],
                  ["QuestId", this.LevelVar.Id],
                ),
              !1)
            : (t
                ? (this.CurrentValueInternal =
                    MathUtils_1.MathUtils.LongToNumber(e.oTs))
                : (this.CurrentValue = MathUtils_1.MathUtils.LongToNumber(
                    e.oTs,
                  )),
              !0));
  }
}
class EntityVarEventPair extends LevelVarEventPair {
  constructor() {
    super(...arguments),
      (this.Jh = void 0),
      (this.Ahc = (e, t) => {
        e === this.LevelVar.VarName && this.ParseValue(t, !1);
      });
  }
  Init(e, t) {
    super.Init(e, t);
    var s,
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.Id);
    return t && t.Entity
      ? (s = t.Entity?.GetComponent(0))
        ? void 0 === (s = s.GetEntityVar(e.VarName))
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "AI",
                31,
                "添加监听的变量未找到",
                ["Key", e.VarName],
                ["EntityId", e.Id],
              ),
            !1)
          : (this.ParseValue(s, !0),
            (this.Jh = t.Entity),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Jh,
              EventDefine_1.EEventName.EntityVarUpdate,
              this.Ahc,
            ),
            (this.IsInit = !0))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AI",
              31,
              "未找到对应实体的CreatureDataComponent",
              ["Key", e.VarName],
              ["EntityId", e.Id],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            31,
            "添加监听的变量来源实体未找到",
            ["Key", e.VarName],
            ["EntityId", e.Id],
          ),
        !1);
  }
  Clear() {
    super.Clear(),
      this.Jh &&
        EventSystem_1.EventSystem.HasWithTarget(
          this.Jh,
          EventDefine_1.EEventName.EntityVarUpdate,
          this.Ahc,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.EntityVarUpdate,
          this.Ahc,
        );
  }
}
class TreeVarEventPair extends LevelVarEventPair {
  constructor() {
    super(...arguments), (this.TreeIncId = void 0);
  }
  Init(e, t) {
    super.Init(e, t);
    var s = e.VarSource;
    switch (s) {
      case 4:
        if (this.Phc()) break;
        return !1;
      case 3:
        if (this.xhc()) break;
        return !1;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AI",
              31,
              "添加监听的变量来源非树",
              ["Key", e.VarName],
              ["Source", s],
            ),
          !1
        );
    }
    return (this.IsInit = !0);
  }
  OnReceiveTreeVar() {
    if (this.IsInit) {
      var e = this.LevelVar.VarSource;
      switch (e) {
        case 4:
          this.Phc(!1);
          break;
        case 3:
          this.xhc(!1);
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AI",
              31,
              "添加监听的变量来源非树",
              ["Key", this.LevelVar.VarName],
              ["Source", e],
            );
      }
    }
  }
  xhc(e = !0) {
    var t,
      s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
        this.LevelVar.Id,
      )?.Tree;
    return s
      ? ((t = s.GetTreeVarByKey(this.LevelVar.VarName)),
        (this.TreeIncId = s.TreeIncId),
        this.ParseValue(t, e))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            31,
            "添加监听的变量来源树未找到",
            ["Key", this.LevelVar.VarName],
            ["QuestId", this.LevelVar.Id],
          ),
        !1);
  }
  Phc(e = !0) {
    var t,
      s = this.LevelVar.Id;
    let i =
      ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(s)?.Tree;
    return (
      i ||
        ((t =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo())
          ?.TreeConfigId === s &&
          (i = t.Tree)),
      i
        ? ((s = i.GetTreeVarByKey(this.LevelVar.VarName)),
          (this.TreeIncId = i.TreeIncId),
          this.ParseValue(s, e))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AI",
              31,
              "添加监听的变量来源树未找到",
              ["Key", this.LevelVar.VarName],
              ["QuestId", this.LevelVar.Id],
            ),
          !1)
    );
  }
}
class PlayerVarEventPair extends LevelVarEventPair {
  Init(e, t) {
    super.Init(e, t);
    t = ModelManager_1.ModelManager.WorldModel.GetWorldState(e.VarName);
    return void 0 === t || "string" == typeof t
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            31,
            "添加监听的玩家变量类型不正确或未找到",
            ["Key", e.VarName],
            ["Value", t],
          ),
        !1)
      : ((this.CurrentValue = t), (this.IsInit = !0));
  }
  OnReceivePlayerVar() {
    this.IsInit &&
      (this.CurrentValue = ModelManager_1.ModelManager.WorldModel.GetWorldState(
        this.LevelVar.VarName,
      ));
  }
}
class AiLevelVarEvent {
  constructor() {
    (this.Uhc = new Array()),
      (this.Dhc = new Array()),
      (this.Bhc = new Array()),
      (this.khc = (e) => {
        for (const t of this.Dhc) t.TreeIncId === e && t.OnReceiveTreeVar();
      }),
      (this.bir = () => {
        for (const e of this.Bhc) e.OnReceivePlayerVar();
      });
  }
  AddLevelVarEvent(e, t) {
    switch (e.VarSource) {
      case 1:
      case 2:
        var s = new EntityVarEventPair();
        s.Init(e, t) && this.Uhc.push(s);
        break;
      case 4:
      case 3:
        s = new TreeVarEventPair();
        s.Init(e, t) && this.Dhc.push(s);
        break;
      case 0:
        s = new PlayerVarEventPair();
        s.Init(e, t) && this.Bhc.push(s);
    }
    0 < this.Dhc.length &&
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
        this.khc,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
          this.khc,
        )),
      0 < this.Dhc.length &&
        (EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnReceivePlayerVar,
          this.bir,
        ) ||
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnReceivePlayerVar,
            this.bir,
          ));
  }
  RemoveLevelVarEvent(e) {
    let t = 0;
    for (const s of this.Uhc) {
      if (s.EventBinder === e) {
        s.Clear();
        break;
      }
      t++;
    }
    if (t < this.Uhc.length) return this.Uhc.splice(t), !0;
    t = 0;
    for (const i of this.Dhc) {
      if (i.EventBinder === e) {
        i.Clear();
        break;
      }
      t++;
    }
    if (t < this.Dhc.length)
      return (
        this.Dhc.splice(t),
        0 === this.Dhc.length &&
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
            this.khc,
          ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
            this.khc,
          ),
        !0
      );
    t = 0;
    for (const r of this.Bhc) {
      if (r.EventBinder === e) {
        r.Clear();
        break;
      }
      t++;
    }
    return (
      t < this.Bhc.length &&
      (this.Bhc.splice(t),
      0 === this.Bhc.length &&
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnReceivePlayerVar,
          this.bir,
        ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnReceivePlayerVar,
          this.bir,
        ),
      !0)
    );
  }
  Clear() {
    for (const e of this.Uhc) e.Clear();
    this.Uhc.length = 0;
    for (const t of this.Dhc) t.Clear();
    this.Dhc.length = 0;
    for (const s of this.Bhc) s.Clear();
    (this.Bhc.length = 0),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
        this.khc,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
          this.khc,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnReceivePlayerVar,
        this.bir,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnReceivePlayerVar,
          this.bir,
        );
  }
}
exports.AiLevelVarEvent = AiLevelVarEvent;
//# sourceMappingURL=AiLevelVarEvent.js.map
