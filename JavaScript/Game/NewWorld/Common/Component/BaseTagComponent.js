"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, a, i) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, a))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, a, i);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (s = t[o]) && (n = (r < 3 ? s(n) : 3 < r ? s(e, a, n) : s(e, a)) || n);
    return 3 < r && n && Object.defineProperty(e, a, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  CharacterTagContainer_1 = require("../../Character/Common/Component/Abilities/CharacterTagContainer");
class TagSwitchedTask {
  constructor() {
    (this.Xir = 0), (this.B7 = void 0), (this.Xte = void 0);
  }
  StartTask(t, a, e, i) {
    this.Xir = t;
    (this.B7 = (t, e) => {
      a(t, e);
    }),
      (this.Xte = e),
      this.Xte?.AddTagAddOrRemoveListener(this.Xir, this.B7);
  }
  EndTask() {
    this.Xte?.RemoveTagAddOrRemoveListener(this.Xir, this.B7);
  }
}
class TagChangedTask {
  constructor() {
    (this.Xir = 0), (this.B7 = void 0), (this.Xte = void 0);
  }
  StartTask(t, e, a) {
    this.Xir = t;
    (this.B7 = (t) => {
      e(t);
    }),
      (this.Xte = a),
      this.Xte?.AddTagChangedListener(this.Xir, this.B7);
  }
  EndTask() {
    this.Xte?.RemoveTagChangedListener(this.Xir, this.B7);
  }
}
let BaseTagComponent = class BaseTagComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.TagSwitchedCallbacks = new Map()),
      (this.TagChangedCallbacks = new Map()),
      (this.TagContainer = new CharacterTagContainer_1.TagContainer());
  }
  OnInit() {
    return (
      this.TagContainer.AddAnyTagListener((t, e, a) => {
        this.OnAnyTagChanged(t, e, a);
      }),
      !0
    );
  }
  OnStart() {
    var t = this.Entity.GetComponent(3)?.Actor?.AbilitySystemComponent;
    return t?.IsValid() && this.TagContainer.BindTsTagContainer(t), !0;
  }
  OnEnd() {
    return this.TagContainer.Clear(), !0;
  }
  Emit(t, e, ...a) {
    if (void 0 !== t && void 0 !== e) {
      var i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      for (const s of [...e])
        try {
          s(...a);
        } catch (t) {
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Event",
                20,
                "tag事件回调执行异常",
                t,
                ["tag", i],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                20,
                "tag事件回调执行异常",
                ["tag", i],
                ["error", t],
              );
        }
    }
  }
  AddTag(t) {
    void 0 !== t && this.TagContainer.AddExactTag(1, t);
  }
  AddTagById(t) {
    this.AddTag(t);
  }
  RemoveTag(t) {
    return (
      void 0 !== t &&
      (this.TagContainer.RemoveTag(1, t), this.TagContainer.RemoveTag(4, t), !0)
    );
  }
  RemoveTagById(t) {
    return this.RemoveTag(t);
  }
  HasTag(t) {
    return this.TagContainer.ContainsTag(t);
  }
  ContainsTagById(t) {
    return this.HasTag(t);
  }
  HasAnyTag(t) {
    for (const e of t) if (this.HasTag(e)) return !0;
    return !1;
  }
  ContainsAnyTag(t) {
    return this.HasAnyTag(t);
  }
  HasAllTag(t) {
    for (const e of t) if (!this.HasTag(e)) return !1;
    return !0;
  }
  ContainsAllTag(t) {
    return this.HasAllTag(t);
  }
  GetTagCountById(t) {
    return void 0 === t ? 0 : this.TagContainer.GetTagCount(t);
  }
  ListenForTagAddOrRemove(t, e, a) {
    var i;
    if (void 0 !== t && e)
      return (i = new TagSwitchedTask()).StartTask(t, e, this, a), i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Character", 20, "回调函数添加失败", [
        "tag",
        GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
      ]);
  }
  AddTagAddOrRemoveListener(e, a) {
    if (void 0 !== e && a) {
      let t = this.TagSwitchedCallbacks.get(e);
      t || this.TagSwitchedCallbacks.set(e, (t = new Set())),
        t.has(a)
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              20,
              "重复添加回调函数",
              ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
              ["callbackName", a.name],
            )
          : t.add(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          20,
          "回调函数添加失败",
          ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
          ["callbackName", a?.name],
        );
  }
  RemoveTagAddOrRemoveListener(t, e) {
    t = this.TagSwitchedCallbacks.get(t);
    t && t.delete(e);
  }
  ListenForTagAnyCountChanged(t, e) {
    var a;
    if (void 0 !== t && e)
      return (a = new TagChangedTask()).StartTask(t, e, this), a;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Character", 20, "回调函数添加失败", [
        "tag",
        GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
      ]);
  }
  AddTagChangedListener(e, a) {
    if (void 0 !== e && a) {
      let t = this.TagChangedCallbacks.get(e);
      t || this.TagChangedCallbacks.set(e, (t = new Set())),
        t.has(a)
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              20,
              "重复添加回调函数",
              ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
              ["callbackName", a.name],
            )
          : t.add(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 20, "回调函数添加失败", [
          "tag",
          GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
        ]);
  }
  RemoveTagChangedListener(t, e) {
    t = this.TagChangedCallbacks.get(t);
    t && t.delete(e);
  }
  GetTagDebugStrings() {
    return this.TagContainer?.GetDebugString() ?? "";
  }
  OnAnyTagChanged(t, e, a) {
    var i;
    void 0 !== t &&
      a !== e &&
      ((i = 0 < e),
      (0 === a) != (0 === e) &&
        this.Emit(t, this.TagSwitchedCallbacks.get(t), t, i),
      this.Emit(t, this.TagChangedCallbacks.get(t), e),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnGameplayTagChanged,
        t,
        a,
        e,
      ),
      (i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)) &&
        EventSystem_1.EventSystem.EmitWithTarget(
          i,
          EventDefine_1.EEventName.OnGlobalGameplayTagChanged,
          this.Entity.Id,
          t,
          a,
          e,
        ),
      this.Entity.GetComponent(187)?.OnTagChanged(t));
  }
};
(BaseTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(185)],
  BaseTagComponent,
)),
  (exports.BaseTagComponent = BaseTagComponent);
//# sourceMappingURL=BaseTagComponent.js.map
