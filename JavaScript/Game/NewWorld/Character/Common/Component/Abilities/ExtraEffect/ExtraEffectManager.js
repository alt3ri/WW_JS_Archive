
"use strict";var __decorate=this&&this.__decorate||function(e,t,f,r){var a,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,f):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,f,r);else for(var i=e.length-1;0<=i;i--)(a=e[i])&&(o=(s<3?a(o):3<s?a(t,f,o):a(t,f))||o);return 3<s&&o&&Object.defineProperty(t,f,o),o};Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlayerExtraEffectManager=exports.ExtraEffectManager=exports.BaseExtraEffectManager=void 0;const Stats_1=require("../../../../../../../Core/Common/Stats"),CombatDebugController_1=require("../../../../../../Utils/CombatDebugController"),ExtraEffectLibrary_1=require("./ExtraEffectLibrary");class BaseExtraEffectManager{constructor(e){this.BuffComponent=e,this.EffectHolder=new Map,this.ActivatedHandles=new Set}static IsInitExecution(e){return 24===e}static IsPeriodExecution(e){switch(e){case 28:case 29:case 34:case 26:case 4:case 5:case 30:case 13:case 101:case 102:return!0;default:return!1}}OnBuffAdded(e){var t;this.TQo(e)&&((t=e?.Config)?t.HasBuffEffect&&e.IsActive()&&this.CreateBuffEffects(e):CombatDebugController_1.CombatDebugController.CombatError("Buff",this.BuffComponent?.Entity,"正在添加的buff额外效果未加载对应的buffRef",["buffId",e?.Id],["handle",e?.Handle],["持有者",e?.GetOwnerDebugName()]))}OnBuffRemoved(e,t){var f=e.Handle;this.TQo(e)&&e.IsActive()&&this.RemoveBuffEffects(f,t)}OnStackIncreased(e,t,f,r){if(this.TQo(e))for(const a of this.GetEffectsByHandle(e.Handle))a.OnStackIncreased(t,f,r)}OnStackDecreased(e,t,f,r){if(this.TQo(e))for(const a of this.GetEffectsByHandle(e.Handle))a.OnStackDecreased(t,f,r)}OnBuffInhibitedChanged(e,t){var f=e.Handle;this.TQo(e)&&(t?this.RemoveBuffEffects(f,!0):this.CreateBuffEffects(e))}TQo(e){var t=e?.Config;return t?!!t.HasBuffEffect:(CombatDebugController_1.CombatDebugController.CombatError("Buff",this.BuffComponent?.Entity,"处理buff额外效果逻辑时找不到对应的buffRef",["buffId",e?.Id],["handleId",e?.Handle],["持有者",e?.GetOwnerDebugName()]),!1)}CreateBuffEffects(t){var f=t.Handle;const r=t.Id;if(this.ActivatedHandles.has(f))CombatDebugController_1.CombatDebugController.CombatError("Buff",this.BuffComponent?.Entity,"重复创建Buff额外效果",["buffId",r],["handle",f]);else{var a=t.GetInstigatorBuffComponent(),s=(this.ActivatedHandles.add(f),t.Config.EffectInfos?.map(e=>[e,ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(r,e,t.Level)])),e=this.BuffComponent;if(s&&e?.Valid)for(let e=0;e<s.length;e++){var o=s[e][0],i=s[e][1],n=o.ExtraEffectId;ExtraEffectManager.IsInitExecution(n)||ExtraEffectManager.IsPeriodExecution(n)||(n=require("./ExtraEffectDefine")?.getBuffEffectClass(n))&&(n=n.Create(f,e,i,this.BuffComponent,a,o),this.qp(n),n.OnCreated())}}}RemoveBuffEffects(e,t){this.ActivatedHandles.has(e)||CombatDebugController_1.CombatDebugController.CombatWarn("Buff",this.BuffComponent?.Entity,"尝试移除不存在的buff额外效果实例",["handleId",e],["entity",this.BuffComponent?.Entity?.Id]),this.ActivatedHandles.delete(e);for(const f of this.GetEffectsByHandle(e))f.OnRemoved(t);this.EffectHolder.delete(e)}ApplyPeriodBuffExecution(e){for(const t of e.Config.EffectInfos)ExtraEffectManager.IsPeriodExecution(t.ExtraEffectId)&&t.ExecutionEffect?.TryExecute(e)}ApplyInitBuffExecution(e,t){for(const f of e.Config.EffectInfos)ExtraEffectManager.IsInitExecution(f.ExtraEffectId)&&f.ExecutionEffect?.TryExecute(e,t)}qp(t){var e,f=t.ActiveHandleId;f<0?CombatDebugController_1.CombatDebugController.CombatWarn("Buff",this.BuffComponent?.Entity,"invalid handleId when trying to add effect in holder.",["handle",f]):(this.EffectHolder.has(f)||this.EffectHolder.set(f,[]),(e=this.EffectHolder.get(f)).some(e=>e===t)?CombatDebugController_1.CombatDebugController.CombatWarn("Buff",this.BuffComponent?.Entity,"duplicated handle when trying to add ExtraEffect.",["handle",f]):e.push(t))}Clear(){this.EffectHolder.clear(),this.ActivatedHandles.clear()}*FilterById(e,t){var f=[];if(e instanceof Array)for(const a of e){var r=require("./ExtraEffectDefine")?.getBuffEffectClass(a);r&&f.push(r)}else{e=require("./ExtraEffectDefine")?.getBuffEffectClass(e);e&&f.push(e)}if(0<=f.length)for(const s of this.EffectHolder.values())if(s)for(const o of s)for(const i of f)if(o instanceof i&&(!t||t(o))){yield o;break}}*GetAllEffects(){for(const e of this.EffectHolder.values())if(e)for(const t of e)yield t}GetEffectsByHandle(e){return this.EffectHolder.get(e)?.values()??[]}}__decorate([(0,Stats_1.statDecorator)("BuffEffect.CreateBuffEffects")],BaseExtraEffectManager.prototype,"CreateBuffEffects",null),__decorate([(0,Stats_1.statDecorator)("BuffEffect.RemoveBuffEffects")],BaseExtraEffectManager.prototype,"RemoveBuffEffects",null),__decorate([(0,Stats_1.statDecorator)("BuffEffect.ApplyPeriodBuffExecution")],BaseExtraEffectManager.prototype,"ApplyPeriodBuffExecution",null),__decorate([(0,Stats_1.statDecorator)("BuffEffect.ApplyInitBuffExecution")],BaseExtraEffectManager.prototype,"ApplyInitBuffExecution",null);class ExtraEffectManager extends(exports.BaseExtraEffectManager=BaseExtraEffectManager){}exports.ExtraEffectManager=ExtraEffectManager;class PlayerExtraEffectManager extends BaseExtraEffectManager{}exports.PlayerExtraEffectManager=PlayerExtraEffectManager;
//# sourceMappingURL=ExtraEffectManager.js.map