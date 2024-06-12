
"use strict";var __decorate=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,n);else for(var f=e.length-1;0<=f;f--)(r=e[f])&&(s=(i<3?r(s):3<i?r(t,o,s):r(t,o))||s);return 3<i&&s&&Object.defineProperty(t,o,s),s};Object.defineProperty(exports,"__esModule",{value:!0}),exports.RoleInheritComponent=void 0;const Log_1=require("../../../../../Core/Common/Log"),EntityComponent_1=require("../../../../../Core/Entity/EntityComponent"),RegisterComponent_1=require("../../../../../Core/Entity/RegisterComponent"),EventDefine_1=require("../../../../Common/Event/EventDefine"),EventSystem_1=require("../../../../Common/Event/EventSystem"),ActiveBuffConfigs_1=require("../../Common/Component/Abilities/Buff/ActiveBuffConfigs");let RoleInheritComponent=class RoleInheritComponent extends EntityComponent_1.EntityComponent{constructor(){super(...arguments),this.elt=void 0}OnStart(){return this.elt=this.Entity.CheckGetComponent(157),!0}static StateInherit(e,t,o,n){e&&t&&(Log_1.Log.CheckInfo()&&Log_1.Log.Info("Battle",20,"换人进入StateInherit"),e.elt.TriggerEvents(5,t.elt,{}),t.elt.TriggerEvents(4,e.elt,{}),this.Ton(e,t),Log_1.Log.CheckInfo()&&Log_1.Log.Info("Battle",20,"换人进入RoleOnStateInherit"),EventSystem_1.EventSystem.EmitWithTarget(t.Entity,EventDefine_1.EEventName.RoleOnStateInherit,e.Entity,o,n))}static Ton(t,o){for(const f of t.elt.GetAllBuffs()){var n=f.StackCount;if(!(n<=0)){var r=f.Handle,i=f.InstigatorId,s=f.Config;if(2===s.FormationPolicy||3===s.FormationPolicy){let e=f.GetRemainDuration();0<f.Duration&&e<=0&&(e=ActiveBuffConfigs_1.MIN_BUFF_REMAIN_DURATION),o.elt.AddBuff(f.Id,{Level:f.Level,ServerId:f.ServerId,InstigatorId:i??0,OuterStackCount:n,Duration:e,IsIterable:!1,PreMessageId:f.MessageId,Reason:"因为状态继承导致的buff添加"}),3===s.FormationPolicy&&t.elt.RemoveBuffByHandle(r,-1,"因为状态继承导致的移除")}}}}};RoleInheritComponent=__decorate([(0,RegisterComponent_1.RegisterComponent)(84)],RoleInheritComponent),exports.RoleInheritComponent=RoleInheritComponent;
//# sourceMappingURL=RoleInheritComponent.js.map