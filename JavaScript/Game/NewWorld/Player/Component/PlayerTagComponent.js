"use strict";
var PlayerTagComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, n) {
      var r,
        a = arguments.length,
        s =
          a < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, o))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, o, n);
      else
        for (var i = e.length - 1; 0 <= i; i--)
          (r = e[i]) &&
            (s = (a < 3 ? r(s) : 3 < a ? r(t, o, s) : r(t, o)) || s);
      return 3 < a && s && Object.defineProperty(t, o, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BaseTagComponent_1 = require("../../Common/Component/BaseTagComponent");
let PlayerTagComponent =
  (PlayerTagComponent_1 = class PlayerTagComponent extends (
    BaseTagComponent_1.BaseTagComponent
  ) {
    constructor() {
      super(...arguments),
        (this.PlayerId = 0),
        (this.OnAnyExactTagChanged = (e, t, o) => {
          if ((PlayerTagComponent_1.kc_.Start(), void 0 !== e && o !== t))
            for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
              this.PlayerId,
            ))
              n.EntityHandle?.Entity?.GetComponent(
                203,
              )?.TagContainer.UpdateExactTag(5, e, t - o);
          PlayerTagComponent_1.kc_.Stop();
        });
    }
    OnCreate() {
      return (
        this.TagContainer.AddAnyExactTagListener(this.OnAnyExactTagChanged), !0
      );
    }
    OnInitData() {
      var e = this.Entity.CheckGetComponent(0);
      return (this.PlayerId = e?.GetPlayerId() ?? 0), !0;
    }
    OnClear() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Character", 19, "清理编队tag", [
          "PlayerId",
          this.PlayerId,
        ]);
      for (const e of this.TagContainer.GetAllExactTags())
        for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
          this.PlayerId,
        ))
          t.EntityHandle?.Entity?.GetComponent(
            203,
          )?.TagContainer.RemoveExactTag(5, e);
      return !0;
    }
    GetEntity() {
      return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(
        this.PlayerId,
        { ParamType: 2, IsControl: !0 },
      )?.EntityHandle?.Entity;
    }
    GetCurrentTagComponent() {
      return this.GetEntity()?.GetComponent(203);
    }
    HasTag(e) {
      return this.GetCurrentTagComponent()?.HasTag(e) ?? !1;
    }
  });
(PlayerTagComponent.kc_ = Stats_1.Stat.Create(
  "PlayerTagComponent.OnAnyExactTagChanged",
)),
  (PlayerTagComponent = PlayerTagComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(198)],
      PlayerTagComponent,
    )),
  (exports.PlayerTagComponent = PlayerTagComponent);
//# sourceMappingURL=PlayerTagComponent.js.map
