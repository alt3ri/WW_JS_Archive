"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var r,
      o = arguments.length,
      s =
        o < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, i, n);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (r = t[a]) && (s = (o < 3 ? r(s) : 3 < o ? r(e, i, s) : r(e, i)) || s);
    return 3 < o && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInfoManageComponent = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  SOCKET_NAME = "MarkCase";
let PawnInfoManageComponent = class PawnInfoManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.he = ""),
      (this.Td1 = void 0),
      (this.bd1 = void 0),
      (this.Ovr = void 0),
      (this.han = void 0),
      (this.lan = void 0),
      (this._an = -1),
      (this.xrr = void 0),
      (this.KQs = void 0);
  }
  OnInit() {
    return (
      (this.Ovr = this.Entity.GetComponent(0)),
      (this.han = this.Entity.GetComponent(147)),
      !0
    );
  }
  get LockRange() {
    return this._an;
  }
  get PawnName() {
    return (
      this.xrr !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
        this.oCo(),
      this.he
    );
  }
  set PawnName(t) {
    this.he = t;
  }
  get SecondName() {
    return this.Td1;
  }
  get FunctionIcon() {
    return this.bd1;
  }
  UpdateNameAndHeadInfo() {
    this.oCo(), this.Rd1();
  }
  SetPawnNameKey(t) {
    (this.KQs = t), this.oCo();
  }
  oCo() {
    var t;
    (this.xrr = LanguageSystem_1.LanguageSystem.PackageLanguage),
      this.KQs
        ? (this.he = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            this.KQs,
          ))
        : this.han?.DropItemConfig
          ? ((t = this.han.DropItemConfig.Config),
            (this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              t.Name,
            )))
          : (t = this.Ovr?.GetEntityTidName()) &&
            (this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t));
  }
  Rd1() {
    var t = this.Ovr?.GetBaseInfo()?.HeadInfo,
      t = t
        ? ConfigManager_1.ConfigManager.NpcIconConfig?.GetNpcHeadInfo(t)
        : void 0;
    (this.Td1 = this.Ovr?.GetEntitySecondName()),
      this.Td1 || (this.Td1 = t?.SecondName),
      (this.bd1 = this.Ovr?.GetEntityFunctionIcon()),
      this.bd1 || (this.bd1 = t?.FunctionPath);
  }
  get DropItemId() {
    return this.han?.DropItemConfig?.ConfigId;
  }
  get DropItemCount() {
    return this.han?.DropItemConfig.ItemCount;
  }
  get EntityId() {
    return this.Entity.Id;
  }
  get HasQuestOption() {
    var t = this.Entity.GetComponent(195);
    return !!t && !!(t = t.GetInteractController()) && t.HasDynamicOption;
  }
  uan() {
    var t;
    return (
      (this.lan = this.Ovr.GetPbEntityInitData()),
      this.lan
        ? ((t = this.Ovr.GetBaseInfo()),
          (this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)),
          (t = (0, IComponent_1.getComponent)(
            this.lan.ComponentsData,
            "FightInteractComponent",
          )),
          (this._an = t ? t.LockRange : -1),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              28,
              "[清理CDT_EntityConfig]该实体没有对应的Pb表信息",
              ["CreatureDataId", this.Ovr.GetCreatureDataId()],
              ["TidName", this.Ovr.GetBaseInfo()?.TidName],
              ["PbDataId", this.Ovr.GetPbDataId()],
            ),
          !1)
    );
  }
  OnStart() {
    return this.uan() && this.oCo(), !0;
  }
  IsDropItem() {
    return void 0 !== this.han;
  }
  GetHeadStateSocketName() {
    var t =
      this.Entity.GetComponent(0)?.GetBaseInfo()?.HeadStateViewConfig
        ?.HeadStateSocketName;
    return t || SOCKET_NAME;
  }
  GetHeadStateOffset() {
    var t = this.Ovr.GetBaseInfo()?.HeadStateViewConfig?.ZOffset;
    return (
      t ||
      ((t = this.Entity.GetComponent(0)?.GetModelConfig()) ? t.名字Z偏移 : 0)
    );
  }
};
(PawnInfoManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(115)],
  PawnInfoManageComponent,
)),
  (exports.PawnInfoManageComponent = PawnInfoManageComponent);
//# sourceMappingURL=PawnInfoManageComponent.js.map
