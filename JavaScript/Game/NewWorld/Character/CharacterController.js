"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, a) {
    let o;
    const n = arguments.length;
    let i =
      n < 3 ? e : a === null ? (a = Object.getOwnPropertyDescriptor(e, r)) : a;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(t, e, r, a);
    else
      for (let c = t.length - 1; c >= 0; c--)
        (o = t[c]) && (i = (n < 3 ? o(i) : n > 3 ? o(e, r, i) : o(e, r)) || i);
    return n > 3 && i && Object.defineProperty(e, r, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterController = void 0);
const cpp_1 = require("cpp");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ModelManager_1 = require("../../Manager/ModelManager");
class CharacterController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (this.sBn = new Date()), !0;
  }
  static OnTick(t) {
    CharacterController.fWo() || CharacterController.pWo(),
      Net_1.Net.IsFinishLogin() && this.aBn();
  }
  static async aBn() {
    let t;
    let e = new Date();
    (e.getTime() - this.sBn.getTime()) / 1e3 / 60 >= 3 &&
      ((this.sBn = e),
      (e = cpp_1.FuncOpenLibrary.GetEBuffer()).byteLength > 0) &&
      ((t = new Uint8Array(e)),
      (t = new Uint8Array(t)),
      cpp_1.FuncOpenLibrary.FreeArrayBuffer(e),
      ((e = new Protocol_1.Aki.Protocol.CombatMessage.Tms()).HVn = t),
      (t = await Net_1.Net.CallAsync(25751, e)),
      cpp_1.FuncOpenLibrary.SetIsCheckEncrypt(t?.TEs ?? ""));
  }
  static InitData(t, e, r) {
    return ModelManager_1.ModelManager.CharacterModel.InitData(t, e, r);
  }
  static Respawn(t, e, r = 0, a) {
    return ModelManager_1.ModelManager.CharacterModel.Respawn(t, e, r, a);
  }
  static AddEntityToAwakeQueue(t, e) {
    ModelManager_1.ModelManager.CharacterModel.AddEntityToAwakeQueue(t, e);
  }
  static ActivateEntity(t) {
    ModelManager_1.ModelManager.CharacterModel.ActivateEntity(t);
  }
  static Destroy(t) {
    return ModelManager_1.ModelManager.CharacterModel.Destroy(t);
  }
  static DestroyToLru(t) {
    return ModelManager_1.ModelManager.CharacterModel.DestroyToLru(t);
  }
  static CreateEntity(t, e) {
    return ModelManager_1.ModelManager.CharacterModel.CreateEntity(t, e);
  }
  static SpawnEntity(t) {
    return ModelManager_1.ModelManager.CharacterModel.SpawnEntity(t);
  }
  static GetCharacterActorComponent(t) {
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t.Valid && t.Actor) return t;
    }
  }
  static GetCharacterActorComponentById(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t?.Valid) return t;
    }
  }
  static GetCharacter(t) {
    return t?.Valid && (t = t.GetComponent(3))?.Valid && t.Actor
      ? t.Actor
      : void 0;
  }
  static GetActor(t) {
    return t?.Valid && (t = this.GetActorComponent(t)) ? t.Owner : void 0;
  }
  static GetActorByEntity(t) {
    return t?.Valid && (t = t.GetComponent(1)) ? t.Owner : void 0;
  }
  static GetActorComponent(t) {
    let e = t.Entity.GetComponent(182);
    return (e = e || t.Entity.GetComponent(2));
  }
  static GetTsBaseCharacterByEntity(t) {
    return t.Entity.GetComponent(3)?.Actor;
  }
  static GetUeTsBaseCharacterByEntity(t) {
    t = t.GetComponent(3);
    if (t) return t.Actor;
  }
  static GetEntityByUeTsBaseCharacter(t) {
    return t.CharacterActorComponent.Entity;
  }
  static SetTimeDilation(t) {
    const e = ModelManager_1.ModelManager.CreatureModel;
    for (const r of e.GetAllEntities()) r.IsInit && r.Entity.SetTimeDilation(t);
    for (const a of e.DelayRemoveContainer.GetAllEntities())
      a.IsInit && a.Entity.SetTimeDilation(t);
  }
  static CN() {
    return (
      !this.vWo &&
      ModelManager_1.ModelManager.CharacterModel.AwakeQueue.Size === 0
    );
  }
  static AwakeEntity() {
    const t = ModelManager_1.ModelManager.CharacterModel;
    if (this.vWo) {
      const e = this.vWo[2];
      if (((this.vWo = void 0), e())) return;
    }
    if (t.AwakeQueue.Size)
      for (var r; (r = t.PopAwakeHandler()); )
        if ((0, r[1])()) return void (this.vWo = r);
  }
  static SortItem(t) {
    !t?.Valid ||
      2 & t.Entity.Flag ||
      t.Entity.GetComponent(0).GetRemoveState() ||
      ModelManager_1.ModelManager.CharacterModel.SortItem(t);
  }
  static OnChangeMode() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
      for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        t.Entity.GetComponent(38)?.SwitchControl(!0);
    return !0;
  }
}
(CharacterController.IsTickEvenPausedInternal = !0),
  (CharacterController.vWo = void 0),
  (CharacterController.sBn = void 0),
  (CharacterController.fWo = () => CharacterController.CN()),
  (CharacterController.pWo = () => {
    CharacterController.AwakeEntity();
  }),
  __decorate(
    [(0, Stats_1.statDecorator)("CharacterController.AwakeEntity")],
    CharacterController,
    "AwakeEntity",
    null,
  ),
  (exports.CharacterController = CharacterController);
// # sourceMappingURL=CharacterController.js.map
