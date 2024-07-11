"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    let n;
    const a = arguments.length;
    let s =
      a < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, o, r);
    else
      for (let i = e.length - 1; i >= 0; i--)
        (n = e[i]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseTagComponent_1 = require("../../Common/Component/BaseTagComponent");
let PlayerTagComponent = class PlayerTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(),
      (this.PlayerId = 0),
      (this.OnAnyExactTagChanged = (e, t, o) => {
        if (void 0 !== e && o !== t)
          for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
            this.PlayerId,
          ))
            r.EntityHandle?.Entity?.GetComponent(
              185,
            )?.TagContainer.UpdateExactTag(5, e, t - o);
      }),
      this.TagContainer.AddAnyExactTagListener(this.OnAnyExactTagChanged);
  }
  OnCreate(e) {
    return (this.PlayerId = e?.PlayerId ?? 0), !0;
  }
  OnClear() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Character", 20, "清理编队tag", [
        "PlayerId",
        this.PlayerId,
      ]);
    for (const e of this.TagContainer.GetAllExactTags())
      for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
        this.PlayerId,
      ))
        t.EntityHandle?.Entity?.GetComponent(185)?.TagContainer.RemoveExactTag(
          5,
          e,
        );
    return !0;
  }
  GetEntity() {
    return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(
      this.PlayerId,
      { ParamType: 2, IsControl: !0 },
    )?.EntityHandle?.Entity;
  }
  GetCurrentTagComponent() {
    return this.GetEntity()?.GetComponent(185);
  }
  HasTag(e) {
    return this.GetCurrentTagComponent()?.HasTag(e) ?? !1;
  }
};
(PlayerTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(181)],
  PlayerTagComponent,
)),
  (exports.PlayerTagComponent = PlayerTagComponent);
// # sourceMappingURL=PlayerTagComponent.js.map
