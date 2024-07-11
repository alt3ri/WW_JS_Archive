"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let r;
    const o = arguments.length;
    let s =
      o < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, i, n);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (r = t[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s);
    return o > 3 && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInfoManageComponent = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SOCKET_NAME = "MarkCase";
let PawnInfoManageComponent = class PawnInfoManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.he = ""),
      (this.Vpr = void 0),
      (this.Ran = void 0),
      (this.Aan = void 0),
      (this.Uan = -1),
      (this.bor = void 0),
      (this.d6s = void 0);
  }
  OnInit() {
    return (
      (this.Vpr = this.Entity.GetComponent(0)),
      (this.Ran = this.Entity.GetComponent(133)),
      !0
    );
  }
  get LockRange() {
    return this.Uan;
  }
  get PawnName() {
    return (
      this.bor !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
        this.sdo(),
      this.he
    );
  }
  set PawnName(t) {
    this.he = t;
  }
  SetPawnNameKey(t) {
    (this.d6s = t), this.sdo();
  }
  sdo() {
    let t;
    (this.bor = LanguageSystem_1.LanguageSystem.PackageLanguage),
      this.d6s
        ? (this.he = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            this.d6s,
          ))
        : this.Ran?.DropItemConfig
          ? ((t = this.Ran.DropItemConfig.Config),
            (this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              t.Name,
            )))
          : this.Aan &&
            ((t = this.Vpr.GetBaseInfo()),
            (this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)));
  }
  get DropItemId() {
    return this.Ran?.DropItemConfig?.ConfigId;
  }
  get DropItemCount() {
    return this.Ran?.DropItemConfig.ItemCount;
  }
  get EntityId() {
    return this.Entity.Id;
  }
  get HasQuestOption() {
    let t = this.Entity.GetComponent(178);
    return !!t && !!(t = t.GetInteractController()) && t.HasDynamicOption;
  }
  Pan() {
    let t;
    return (
      (this.Aan = this.Vpr.GetPbEntityInitData()),
      this.Aan
        ? ((t = this.Vpr.GetBaseInfo()),
          (this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)),
          (t = (0, IComponent_1.getComponent)(
            this.Aan.ComponentsData,
            "FightInteractComponent",
          )),
          (this.Uan = t ? t.LockRange : -1),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              29,
              "[清理CDT_EntityConfig]该实体没有对应的Pb表信息",
              ["CreatureDataId", this.Vpr.GetCreatureDataId()],
              ["TidName", this.Vpr.GetBaseInfo()?.TidName],
              ["PbDataId", this.Vpr.GetPbDataId()],
            ),
          !1)
    );
  }
  OnStart() {
    return this.Pan() && this.sdo(), !0;
  }
  IsDropItem() {
    return void 0 !== this.Ran;
  }
  GetMessageId() {
    const t = this.Vpr.GetBaseInfo();
    return t?.HeadInfo ? t.HeadInfo : 0;
  }
  GetHeadStateSocketName() {
    const t =
      this.Entity.GetComponent(0)?.GetBaseInfo()?.HeadStateViewConfig
        ?.HeadStateSocketName;
    return t || SOCKET_NAME;
  }
  GetHeadStateOffset() {
    let t = this.Vpr.GetBaseInfo()?.HeadStateViewConfig?.ZOffset;
    return (
      t ||
      ((t = this.Entity.GetComponent(0)?.GetModelConfig()) ? t.名字Z偏移 : 0)
    );
  }
};
(PawnInfoManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(102)],
  PawnInfoManageComponent,
)),
  (exports.PawnInfoManageComponent = PawnInfoManageComponent);
// # sourceMappingURL=PawnInfoManageComponent.js.map
