"use strict";
var BaseTagComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, a, n) {
      var o,
        s = arguments.length,
        i =
          s < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, a))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(e, t, a, n);
      else
        for (var r = e.length - 1; 0 <= r; r--)
          (o = e[r]) &&
            (i = (s < 3 ? o(i) : 3 < s ? o(t, a, i) : o(t, a)) || i);
      return 3 < s && i && Object.defineProperty(t, a, i), i;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Macro_1 = require("../../../../Core/Preprocessor/Macro"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  CharacterTagContainer_1 = require("../../Character/Common/Component/Abilities/CharacterTagContainer");
class TagSwitchedTask {
  constructor() {
    (this.Qor = 0), (this.B7 = void 0), (this.Xte = void 0);
  }
  StartTask(e, t, a, n) {
    (this.Qor = e),
      (this.B7 = t),
      (this.Xte = a),
      this.Xte?.AddTagAddOrRemoveListener(this.Qor, t, n);
  }
  EndTask() {
    this.Xte?.RemoveTagAddOrRemoveListener(this.Qor, this.B7);
  }
}
class TagChangedTask {
  constructor() {
    (this.Qor = 0), (this.B7 = void 0), (this.Xte = void 0);
  }
  StartTask(e, t, a, n) {
    (this.Qor = e),
      (this.B7 = t),
      (this.Xte = a),
      this.Xte?.AddTagChangedListener(this.Qor, this.B7, n);
  }
  EndTask() {
    this.Xte?.RemoveTagChangedListener(this.Qor, this.B7);
  }
}
let BaseTagComponent = (BaseTagComponent_1 = class BaseTagComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.TagSwitchedCallbacks = new Map()),
      (this.TagChangedCallbacks = new Map()),
      (this.TagContainer = new CharacterTagContainer_1.TagContainer()),
      (this.Ac_ = new Map());
  }
  OnInit() {
    return (
      this.TagContainer.AddAnyTagListener((e, t, a) => {
        this.OnAnyTagChanged(e, t, a);
      }),
      !0
    );
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    let t = void 0;
    return (
      (t = (
        e?.IsVehicle()
          ? this.Entity.GetComponent(231)
          : this.Entity.GetComponent(3)
      )?.Actor?.AbilitySystemComponent)?.IsValid() &&
        this.TagContainer.BindTsTagContainer(t),
      !0
    );
  }
  OnEnd() {
    return this.TagContainer.Clear(), !0;
  }
  Emit(e, t, ...a) {
    if (void 0 !== e && void 0 !== t) {
      var n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
      for (const o of [...t])
        try {
          o(...a);
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Event",
                19,
                "tag事件回调执行异常",
                e,
                ["tag", n],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                19,
                "tag事件回调执行异常",
                ["tag", n],
                ["error", e],
              );
        }
    }
  }
  AddTag(e) {
    void 0 !== e && this.TagContainer.AddExactTag(1, e);
  }
  RemoveTag(e) {
    return (
      void 0 !== e &&
      (this.TagContainer.RemoveTag(1, e), this.TagContainer.RemoveTag(4, e), !0)
    );
  }
  HasTag(e) {
    return this.TagContainer.ContainsTag(e);
  }
  HasExactTag(e) {
    return this.TagContainer.ContainsExactTag(e);
  }
  HasAnyTag(e) {
    for (const t of e) if (this.HasTag(t)) return !0;
    return !1;
  }
  HasAllTag(e) {
    for (const t of e) if (!this.HasTag(t)) return !1;
    return !0;
  }
  GetTagCount(e) {
    return void 0 === e ? 0 : this.TagContainer.GetTagCount(e);
  }
  ListenForTagAddOrRemove(e, t, a) {
    var n;
    if (void 0 !== e && t)
      return (n = new TagSwitchedTask()).StartTask(e, t, this, a), n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Character", 19, "回调函数添加失败", [
        "tag",
        GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
      ]);
  }
  HasTagAddOrRemoveListener(e, t) {
    e = this.TagSwitchedCallbacks.get(e);
    return !!e && e?.has(t);
  }
  AddTagAddOrRemoveListener(t, a, e) {
    if (void 0 !== t && a) {
      let e = this.TagSwitchedCallbacks.get(t);
      e || this.TagSwitchedCallbacks.set(t, (e = new Set())),
        e.has(a)
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              19,
              "重复添加回调函数",
              ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)],
              ["callbackName", a.name],
            )
          : e.add(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          19,
          "回调函数添加失败",
          ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)],
          ["callbackName", a?.name],
        );
  }
  RemoveTagAddOrRemoveListener(e, t) {
    e = this.TagSwitchedCallbacks.get(e);
    e && e.delete(t);
  }
  ListenForTagAnyCountChanged(e, t) {
    var a;
    if (void 0 !== e && t)
      return (a = new TagChangedTask()).StartTask(e, t, this), a;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Character", 19, "回调函数添加失败", [
        "tag",
        GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
      ]);
  }
  AddTagChangedListener(t, a, e) {
    if (void 0 !== t && a) {
      let e = this.TagChangedCallbacks.get(t);
      e || this.TagChangedCallbacks.set(t, (e = new Set())),
        e.has(a)
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              19,
              "重复添加回调函数",
              ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)],
              ["callbackName", a.name],
            )
          : e.add(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 19, "回调函数添加失败", [
          "tag",
          GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
        ]);
  }
  RemoveTagChangedListener(e, t) {
    e = this.TagChangedCallbacks.get(e);
    e && e.delete(t);
  }
  GetTagDebugStrings() {
    return this.TagContainer?.GetDebugString() ?? "";
  }
  OnAnyTagChanged(e, t, a) {
    var n;
    BaseTagComponent_1.Pc_.Start(),
      void 0 !== e &&
        a !== t &&
        (BaseTagComponent_1.wc_.Start(),
        0 < a != (n = 0 < t) &&
          this.Emit(e, this.TagSwitchedCallbacks.get(e), e, n),
        this.Emit(e, this.TagChangedCallbacks.get(e), t, e),
        BaseTagComponent_1.wc_.Stop(),
        BaseTagComponent_1.Uc_.Start(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          e,
          a,
          t,
        ),
        BaseTagComponent_1.Uc_.Stop(),
        BaseTagComponent_1.Dc_.Start(),
        (n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)) &&
          EventSystem_1.EventSystem.EmitWithTarget(
            n,
            EventDefine_1.EEventName.OnGlobalGameplayTagChanged,
            this.Entity.Id,
            e,
            a,
            t,
          ),
        BaseTagComponent_1.Dc_.Stop(),
        this.Entity.GetComponent(207)?.OnTagChanged(e)),
      BaseTagComponent_1.Pc_.Stop();
  }
  GetChildrenTags(e) {
    var t = [];
    for (const a of this.TagContainer.GetAllExactTags())
      a !== e &&
        GameplayTagUtils_1.GameplayTagUtils.IsChildTag(a, e) &&
        t.push(a);
    return t;
  }
});
(BaseTagComponent.Rc_ = new Map()),
  (BaseTagComponent.Pc_ = Stats_1.Stat.Create(
    "BaseTagComponent.OnAnyTagChanged",
  )),
  (BaseTagComponent.wc_ = Stats_1.Stat.Create(
    "BaseTagComponent.OnAnyTagChanged.Callbacks",
  )),
  (BaseTagComponent.Uc_ = Stats_1.Stat.Create(
    "BaseTagComponent.OnAnyTagChanged.OnGameplayTagChanged",
  )),
  (BaseTagComponent.Dc_ = Stats_1.Stat.Create(
    "BaseTagComponent.OnAnyTagChanged.OnGlobalGameplayTagChanged",
  )),
  (BaseTagComponent = BaseTagComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(203)],
      BaseTagComponent,
    )),
  (exports.BaseTagComponent = BaseTagComponent);
//# sourceMappingURL=BaseTagComponent.js.map
