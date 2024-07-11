"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, a, i) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, a))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, a, i);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (r = (s < 3 ? o(r) : 3 < s ? o(e, a, r) : o(e, a)) || r);
    return 3 < s && r && Object.defineProperty(e, a, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  BaseTagComponent_1 = require("./BaseTagComponent"),
  shouldNotifyTagType = [2128634312, 992548024];
let LevelTagComponent = class LevelTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments),
      (this.zht = void 0),
      (this.gnn = new Map()),
      (this.fnn = 0);
  }
  get NotifyLock() {
    return this.fnn;
  }
  set NotifyLock(t) {
    t !== this.fnn &&
      ((this.fnn = t), 0 === this.fnn) &&
      this.NotifyTagChanged();
  }
  OnInitData() {
    if (
      (super.OnInitData(),
      this.gnn.clear(),
      (this.zht = this.Entity.GetComponent(0)),
      this.zht)
    ) {
      var t = this.zht.GetPbDataId(),
        e = this.zht.GetCreatureDataId();
      for (const a of this.zht.GetEntityCommonTags())
        this.pnn(a),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Entity",
              20,
              "初始添加标签:",
              ["pbDataId", t],
              ["creatureDataId", e],
              ["tagId", a],
              [
                "tagName",
                GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(a),
              ],
            );
    }
    return !0;
  }
  OnStart() {
    super.OnStart();
    var t = this.Entity.GetComponent(0),
      t =
        (t?.IsConcealed && this.AddTag(1227933697),
        t?.GetModelComponent()?.PerformanceTags);
    if (t)
      for (const e of t)
        GameplayTagUtils_1.GameplayTagUtils.IsChildTag(e, 991613615)
          ? this.AddTag(e)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Entity",
              40,
              "实体配置了非【关卡.Common.表现】子Tag的客户端模型表现Tag，请检查配置",
              ["pbDataId", this.zht?.GetPbDataId()],
              ["creatureDataId", this.zht?.GetCreatureDataId()],
              ["tagId", e],
              [
                "tagName",
                GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
              ],
            );
    return !0;
  }
  OnTick(t) {
    this.NotifyLock = 0;
  }
  GetTagNames() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      var t = new Array();
      for (const a of this.GetTagIds()) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(a);
        t.includes(e) || t.push(e);
      }
      return t;
    }
  }
  ContainsTag(t) {
    t = t?.TagId;
    return void 0 !== t && this.HasTag(t);
  }
  ContainsTagByName(t) {
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    return void 0 !== t && this.HasTag(t);
  }
  AddTag(t) {
    this.NotifyLock++, super.AddTag(t), this.NotifyLock--;
  }
  RemoveTag(t) {
    this.NotifyLock++;
    t = super.RemoveTag(t);
    return this.NotifyLock--, t;
  }
  ChangeLocalLevelTag(t, e) {
    this.NotifyLock++, this.RemoveTag(e), this.AddTag(t), this.NotifyLock--;
  }
  pnn(t) {
    var e;
    this.HasTag(t) ||
      (void 0 === (e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t))
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            18,
            "要添加的tagId找不到对应的gameplayTag",
            ["tagId", t],
          )
        : (this.NotifyLock++,
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Entity",
              18,
              "添加服务端标签:",
              ["pbDataId", this.zht?.GetPbDataId()],
              ["creatureDataId", this.zht?.GetCreatureDataId()],
              ["tagId", t],
              ["tagName", e],
            ),
          this.TagContainer.AddExactTag(3, t),
          this.NotifyLock--));
  }
  vnn(t) {
    this.TagContainer.GetRowTagCount(3, t) <= 0 ||
      (this.NotifyLock++,
      this.TagContainer.RemoveExactTag(3, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "移除服务端标签:",
          ["pbDataId", this.zht.GetPbDataId()],
          ["creatureDataId", this.zht.GetCreatureDataId()],
          ["tagId", t],
          ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)],
        ),
      this.NotifyLock--);
  }
  SyncTagsFromServer(t) {
    for (const a of t) {
      var e = a.Ukn;
      a.y9n ? this.pnn(e) : this.vnn(e);
    }
  }
  AddServerTagByIdLocal(t, e) {
    this.pnn(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Entity", 37, "通过客户端添加服务器下发的Tag", [
          "原因",
          e,
        ]);
  }
  RemoveServerTagByIdLocal(t, e) {
    this.vnn(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Entity", 37, "通过客户端移除服务器下发的Tag", [
          "原因",
          e,
        ]);
  }
  NotifyTagChanged() {
    var t = [],
      e = [];
    for (const s of this.gnn.keys()) {
      var a = this.gnn.get(s),
        i = this.GetTagCountById(s);
      0 < a && i <= 0 ? e.push(s) : a <= 0 && 0 < i && t.push(s);
    }
    this.gnn.clear();
    let o = !1;
    if (0 < t.length)
      for (const r of t)
        if (this.Mnn(r)) {
          o = !0;
          break;
        }
    if (!o && 0 < e.length)
      for (const n of e)
        if (this.Mnn(n)) {
          o = !0;
          break;
        }
    o &&
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        t,
        e,
      );
  }
  *GetTagIds() {
    for (const t of this.TagContainer.GetAllExactTags()) yield t;
  }
  OnAnyTagChanged(t, e, a) {
    void 0 === t ||
      a === e ||
      (super.OnAnyTagChanged(t, e, a), this.gnn.has(t)) ||
      this.gnn.set(t, a);
  }
  Mnn(t) {
    for (const e of shouldNotifyTagType)
      if (GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e)) return !0;
    return !1;
  }
};
(LevelTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(177)],
  LevelTagComponent,
)),
  (exports.LevelTagComponent = LevelTagComponent);
//# sourceMappingURL=LevelTagComponent.js.map
