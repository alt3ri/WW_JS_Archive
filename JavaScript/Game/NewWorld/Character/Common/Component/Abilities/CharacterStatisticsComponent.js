
"use strict";var CharacterStatisticsComponent_1,__decorate=this&&this.__decorate||function(t,i,e,a){var s,r=arguments.length,n=r<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,i,e,a);else for(var o=t.length-1;0<=o;o--)(s=t[o])&&(n=(r<3?s(n):3<r?s(i,e,n):s(i,e))||n);return 3<r&&n&&Object.defineProperty(i,e,n),n};Object.defineProperty(exports,"__esModule",{value:!0}),exports.CharacterStatisticsComponent=void 0;const UE=require("ue"),Log_1=require("../../../../../../Core/Common/Log"),Time_1=require("../../../../../../Core/Common/Time"),DamageById_1=require("../../../../../../Core/Define/ConfigQuery/DamageById"),Protocol_1=require("../../../../../../Core/Define/Net/Protocol"),EntityComponent_1=require("../../../../../../Core/Entity/EntityComponent"),EntitySystem_1=require("../../../../../../Core/Entity/EntitySystem"),RegisterComponent_1=require("../../../../../../Core/Entity/RegisterComponent"),Vector_1=require("../../../../../../Core/Utils/Math/Vector"),StringBuilder_1=require("../../../../../../Core/Utils/StringBuilder"),StringUtils_1=require("../../../../../../Core/Utils/StringUtils"),EventDefine_1=require("../../../../../Common/Event/EventDefine"),EventSystem_1=require("../../../../../Common/Event/EventSystem"),PublicUtil_1=require("../../../../../Common/PublicUtil"),ConfigManager_1=require("../../../../../Manager/ConfigManager"),ModelManager_1=require("../../../../../Manager/ModelManager"),CharacterUnifiedStateTypes_1=require("./CharacterUnifiedStateTypes"),skillTypeToString=["常态攻击","共鸣技能","共鸣解放","固有技能","连携技能","异能力","声骸技能"],attackTypeToString=["普攻伤害","蓄力攻击伤害","大招伤害","QTE伤害","普通技能伤害","战斗幻象技能伤害","探索幻象技能伤害"];class TargetDamageStatistics{constructor(t){this.TargetId=t,this.AKo=0,this.IsValid=!0;var t=EntitySystem_1.EntitySystem.Get(t).GetComponent(0),i=t.GetEntityType();this.JB=i===Protocol_1.Aki.Protocol.HBs.Proto_Monster,this.XHt=i===Protocol_1.Aki.Protocol.HBs.Proto_Player,this.Mne=0,this.PKo="",this.JB?(this.Mne=t.GetPbDataId(),this.PKo=PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetBaseInfo()?.TidName??"")):this.XHt&&(i=t.Valid?t.GetRoleId():0,(t=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i))?(this.Mne=t.GetRoleId(),i=ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne),this.PKo=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name)):this.IsValid=!1)}AddDamageValue(t){this.AKo+=t}ToString(){return StringUtils_1.StringUtils.Format(",{0},{1},{2},{3},{4}",this.JB?"怪物":this.XHt?"角色":"出错？？",this.PKo,this.Mne.toString(),this.TargetId.toString(),this.AKo.toString())}}class DamageStatisticsData{constructor(t,i,e,a){this.RoleId=t,this.RoleName=i,this.DamageType=e,this.IsHeal=a,this.xKo=new Map}AddDamageValue(t,i){let e=this.xKo.get(t);if(!e){if(!(e=new TargetDamageStatistics(t)).IsValid)return;this.xKo.set(t,e)}e.AddDamageValue(i)}GetTargetCount(){return this.xKo.size}ToString(){var t=new StringBuilder_1.StringBuilder;for(const i of this.xKo.values())t.Append(i.ToString());return StringUtils_1.StringUtils.Format("{0},{1},{2},{3}{4}\n",this.RoleId.toString(),this.RoleName,this.IsHeal?"治疗":"伤害",this.DamageType,t.ToString())}}class CombatDataBase{constructor(t,i=0){this.AttackerId=t,this.TargetId=i,this.String="";var t=new Date,i=t.getHours(),e=t.getMinutes(),t=t.getSeconds();this.DateCreate=StringUtils_1.StringUtils.Format("{0}-{1}-{2}",i<10?"0"+i:i.toString(),e<10?"0"+e:e.toString(),t<10?"0"+t:t.toString())}ToString(){return this.String&&0<this.String.length||(this.String=this.ParseToString()),this.String}static GetEntityConfigName(t){t=EntitySystem_1.EntitySystem.Get(t);if(t){var i,t=t.GetComponent(0),e=t?.GetEntityType();if(e===Protocol_1.Aki.Protocol.HBs.Proto_Player)return i=t.Valid?t.GetRoleId():0,(i=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i))?(i=i.GetRoleId(),i=ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i),ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name)):void 0;if(e===Protocol_1.Aki.Protocol.HBs.Proto_Monster)return PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetBaseInfo()?.TidName??"")}}static GetSkillConfigName(t,i){t=EntitySystem_1.EntitySystem.Get(t);if(t)return t.GetComponent(33).GetSkillInfo(i).SkillName.toString()}static GetEntityConfigNameAndSkillName(t,i,e){t=EntitySystem_1.EntitySystem.Get(t);let a=void 0,s=void 0;if(t){var r=t.GetComponent(0),n=r?.GetEntityType();if(n===Protocol_1.Aki.Protocol.HBs.Proto_Player){var o=r.Valid?r.GetRoleId():0,o=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o);if(!o)return[void 0,void 0];o=o.GetRoleId(),o=ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o),o=(a=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name),ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(o.SkillId));let t=-1;if(o)for(const h of o)if(h.DamageList.includes(i)){s=skillTypeToString[h.SkillType-1],t=h.SkillType;break}return t<0&&5===DamageById_1.configDamageById.GetConfig(i).Type&&(s="幻象技能"),[a,s]}if(n===Protocol_1.Aki.Protocol.HBs.Proto_Monster)return a=PublicUtil_1.PublicUtil.GetConfigTextByKey(r.GetBaseInfo()?.TidName??""),o=t.GetComponent(33).GetSkillInfo(e),s=o.SkillName.toString(),[a,s]}return[void 0,void 0]}}class CombatDataDamage extends CombatDataBase{constructor(t,i,e,a,s=0){super(t,s),this.DamageId=i,this.DamageValue=e,this.SkillId=a}ParseToString(){var[t,i]=CombatDataBase.GetEntityConfigNameAndSkillName(this.AttackerId,this.DamageId,this.SkillId),e=CombatDataBase.GetEntityConfigName(this.TargetId),a=0,a=EntitySystem_1.EntitySystem.Get(this.TargetId).GetComponent(156).GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_Life);return StringUtils_1.StringUtils.Format("<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>对<Victim>{3}</>造成<NumDmg>{4}</>点伤害<Change>{5}</>",this.DateCreate,t??"",i??"",e??"",this.DamageValue.toString(),a<=0?"(死亡)":StringUtils_1.StringUtils.Format("({0}->{1})",(a+this.DamageValue).toString(),a.toString()))}}class CombatDataHeal extends CombatDataBase{constructor(t,i,e,a,s=0){super(t,s),this.HealId=i,this.HealValue=e,this.SkillId=a}ParseToString(){var[t,i]=CombatDataBase.GetEntityConfigNameAndSkillName(this.AttackerId,this.HealId,this.SkillId),e=CombatDataBase.GetEntityConfigName(this.TargetId),a=0,s=EntitySystem_1.EntitySystem.Get(this.TargetId).GetComponent(156),a=s.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_Life),s=s.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Tkn);return StringUtils_1.StringUtils.Format("<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>使<Victim>{3}</>恢复<NumDmg>{4}</>点生命<Change>{5}</>",this.DateCreate,t??"",i??"",e??"",this.HealValue.toString(),a===s?"(满血)":StringUtils_1.StringUtils.Format("({0}->{1})",a.toString(),(a-this.HealValue).toString()))}}class CombatDataSkill extends CombatDataBase{constructor(t,i,e=0){super(t,e),this.SkillId=i}ParseToString(){var t=CombatDataBase.GetEntityConfigName(this.AttackerId),i=CombatDataBase.GetSkillConfigName(this.AttackerId,this.SkillId);return StringUtils_1.StringUtils.Format("<Date>[{0}]</><Atk>{1}</>施放了技能<Skill>{2}</>。",this.DateCreate,t??"",i??"")}}class CombatDataBuffAdded extends CombatDataBase{constructor(t,i,e=0){super(t,e),this.BuffId=i}ParseToString(){var t=CombatDataBase.GetEntityConfigName(this.AttackerId),i=CombatDataBase.GetEntityConfigName(this.TargetId);return StringUtils_1.StringUtils.Format("<Date>{0}</><Victim>{1}</>获得了<Atk>{2}</>添加的Buff<NumDmg>{3}</>",this.DateCreate,i??"",t??"",this.BuffId.toString())}}class CombatDataBuffRemoved extends CombatDataBase{constructor(t,i,e=0){super(t,e),this.BuffId=i}ParseToString(){var t=CombatDataBase.GetEntityConfigName(this.TargetId);return StringUtils_1.StringUtils.Format("<Date>{0}</><Victim>{1}</>失去了Buff<NumDmg>{2}</>",this.DateCreate,t??"",this.BuffId.toString())}}class CombatDataKilled extends CombatDataBase{ParseToString(){var t=CombatDataBase.GetEntityConfigName(this.AttackerId),i=CombatDataBase.GetEntityConfigName(this.TargetId);return StringUtils_1.StringUtils.Format("<Date>{0}</><Atk>{1}</>消灭了<Victim>{2}</>!",this.DateCreate,t??"",i??"")}}class CombatDataRevive extends CombatDataBase{ParseToString(){var t=CombatDataBase.GetEntityConfigName(this.AttackerId);return StringUtils_1.StringUtils.Format("<Date>{0}</><Atk>{1}</>复活",this.DateCreate,t??"")}}let CharacterStatisticsComponent=CharacterStatisticsComponent_1=class CharacterStatisticsComponent extends EntityComponent_1.EntityComponent{constructor(){super(...arguments),this.skr=(t,i,e,a,s,r,n)=>{switch(a.CalculateType){case 1:this.akr&&this.hkr(-e,t,i,r),this.lkr(-e,t,i,r,s);break;case 0:this.akr&&this._kr(e,a.Element,n,t,i,s.IsCritical,a.DamageTextType,s.IsImmune,a.Id,s.BulletId,s.BuffId),this.ukr(e,a.Element,n,t,i,s.IsCritical,a.DamageTextType,s.IsImmune,a.Id,s.BulletId,s.BuffId,s.IsTargetKilled,s)}},this.ckr=()=>{this.mkr()},this.akr=!1,this.dkr=new Map,this.Ckr=new Map,this.gkr=new Map,this.fkr=new Array,this.pkr=(t,i)=>{CharacterStatisticsComponent_1.vkr&&this.Entity.GetComponent(0).IsRole()&&(this.Mkr(t),this.Skr(i))},this.Ekr=(t,i)=>{var e;CharacterStatisticsComponent_1.vkr&&this.Entity.GetComponent(0).IsRole()&&(this.dkr.get(i)&&(e=this.Entity.GetComponent(0).GetRoleConfig(),Log_1.Log.CheckError())&&Log_1.Log.Error("Character",21,"记录技能开始使用时间时有技能未执行EndSkill",["RoleName",ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name)],["SkillId",i]),this.dkr.set(i,Time_1.Time.NowSeconds))},this.ykr=(e,a)=>{if(CharacterStatisticsComponent_1.vkr&&this.Entity.GetComponent(0).IsRole()){let t=CharacterStatisticsComponent_1.Ikr.get(e);t||(r=this.Entity.GetComponent(0).GetRoleConfig(),s=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(r.Name),t=new CharacterOperationRecord(s,e,r.Id),CharacterStatisticsComponent_1.Ikr.set(e,t));var s=this.Entity.GetComponent(33).GetSkillInfo(a).SkillGenre;let i=t.SkillOperationMap.get(s);i||(i=new SkillOperationRecord(CharacterStatisticsComponent_1.Tkr[s]),t.SkillOperationMap.set(s,i));var r=this.dkr.get(a);void 0===r?Log_1.Log.CheckError()&&Log_1.Log.Error("Test",21,"计算出现异常 EndSkill",["Name",t.Name],["Id",t.EntityId],["Map",this.dkr]):(e=Time_1.Time.NowSeconds-r,i.AddOptCountAndTime(e)),this.dkr.set(a,void 0)}},this.Pji=(e,a)=>{if(CharacterStatisticsComponent_1.vkr)if(a)this.Ckr.set(e,Time_1.Time.NowSeconds);else{var a=this.Ckr.get(e),s=Time_1.Time.NowSeconds-a,r=this.Entity.Id;let t=CharacterStatisticsComponent_1.Ikr.get(r);var n=this.Entity.GetComponent(0);t||((o=n.GetEntityType())===Protocol_1.Aki.Protocol.HBs.Proto_Monster?(h=PublicUtil_1.PublicUtil.GetConfigTextByKey(n.GetBaseInfo()?.TidName??""),t=new CharacterOperationRecord(h,r,n.GetPbDataId())):o===Protocol_1.Aki.Protocol.HBs.Proto_Player&&(h=n.GetRoleConfig(),o=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(h.Name),t=new CharacterOperationRecord(o,r,h.Id)),CharacterStatisticsComponent_1.Ikr.set(r,t));let i=t.TagOperationMap.get(e);var o=n.GetEntityType(),h=CharacterStatisticsComponent_1.StageInfo(o);i||(i=new SkillOperationRecord(h.get(e)),t.TagOperationMap.set(e,i)),Number.isNaN(s)?Log_1.Log.CheckError()&&Log_1.Log.Error("Test",21,"计算出现异常 OnTagChanged",["Id",this.Entity.Id],["beginTime",a],["Map",this.Ckr],["TagId",e]):i.AddOptCountAndTime(s)}},this.Lkr=(t,i)=>{CharacterStatisticsComponent_1.Dkr&&((i=new CombatDataSkill(this.Entity.Id,i)).ToString(),CharacterStatisticsComponent_1.Rkr.push(i),CharacterStatisticsComponent_1.Akr(i))&&CharacterStatisticsComponent_1.Ukr.push(i)}}OnInit(t){return EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharBeDamage,this.skr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharUseSkill,this.Lkr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharOnRevive,this.ckr),!0}OnStart(){return this.Pkr(),!0}OnActivate(){CharacterStatisticsComponent_1.OpenOperationRecord&&(this.akr=CharacterStatisticsComponent_1.IsInRecordArea(this.Entity)),this.xkr()}OnEnd(){return EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharBeDamage,this.skr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharUseSkill,this.Lkr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharOnRevive,this.ckr),CharacterStatisticsComponent_1.vkr&&this.wkr(),!0}OnBuffAdded(t){this.Bkr(t)}OnBuffRemoved(t){this.bkr(t)}GetStatisticsEnable(){return this.akr}static SetStatisticsEnable(t){if(t){var i;for(const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())CharacterStatisticsComponent_1.IsInRecordArea(a.Entity)&&(i=a.Entity.GetComponent(24))?.Valid&&(i.akr=!0,this.qkr.push(a.Id))}else{for(const s of this.qkr){var e=EntitySystem_1.EntitySystem.Get(s);e?.Valid&&(e.GetComponent(24).akr=!1)}this.qkr.length=0}}static CleanupRecordData(){this.Gkr.clear(),this.Nkr.clear(),this.Okr.clear(),this.kkr.clear()}hkr(t,i,e,a){var s=a.Damage,a=a.DamageData.Id;CharacterStatisticsComponent_1.ProcessRecordBySkillType(s,i,e,a,!0),CharacterStatisticsComponent_1.Fkr(s,i,e,a,!0)}_kr(t,i,e,a,s,r,n,o,h,c,C){CharacterStatisticsComponent_1.ProcessRecordBySkillType(t,a,s,h,!1,c,C),CharacterStatisticsComponent_1.Fkr(t,a,s,h,!1)}static ProcessRecordBySkillType(a,t,s,r,n,o,h){t=t.GetComponent(0);if(t.GetEntityType()===Protocol_1.Aki.Protocol.HBs.Proto_Player){var t=t.Valid?t.GetRoleId():0,c=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);if(c){var c=c.GetRoleId(),C=ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(c),_=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(C.Name),C=ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(C.SkillId);let i=0;if(C)for(const m of C)if(m.DamageList.includes(r)){i=m.SkillType;break}C=n?CharacterStatisticsComponent_1.kkr:CharacterStatisticsComponent_1.Okr;let e=C.get(c);if(e||(e=new Map,C.set(c,e)),0<i){let t=e.get(i);t||(C=skillTypeToString[i-1],t=new DamageStatisticsData(c,_,C,n),Log_1.Log.CheckDebug()&&Log_1.Log.Debug("Test",21,"伤害记录-技能",["伤害ID",r],["类型",C]),e.set(i,t)),t.AddDamageValue(s.Id,a),t.GetTargetCount()>this.Vkr&&(this.Vkr=t.GetTargetCount())}else if(5!==DamageById_1.configDamageById.GetConfig(r).Type)Log_1.Log.CheckDebug()&&Log_1.Log.Debug("Test",21,"结算ID不在幻象表中",["结算ID",r],["子弹ID",o],["buffID",h]);else{let t=e.get(6);t||(t=new DamageStatisticsData(c,_,skillTypeToString[6],n),Log_1.Log.CheckDebug()&&Log_1.Log.Debug("Test",21,"伤害记录-技能",["伤害ID",r],["类型","声骸技能"]),e.set(6,t)),t.AddDamageValue(s.Id,a),t.GetTargetCount()>this.Vkr&&(this.Vkr=t.GetTargetCount())}}else Log_1.Log.CheckError()&&Log_1.Log.Error("Test",21,"获取不到roleData",["roleId",t])}}static Fkr(e,t,a,i,s){t=t.GetComponent(0);if(t?.IsRole()){var r=DamageById_1.configDamageById.GetConfig(i);if(r){var t=t.Valid?t.GetRoleId():0,n=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);if(n){var n=n.GetRoleId(),o=ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n),o=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name),h=s?this.Nkr:this.Gkr;let t=h.get(n),i=(t||(t=new Map,h.set(n,t)),t.get(r.Type));i||(i=new DamageStatisticsData(n,o,attackTypeToString[r.Type],s),t.set(r.Type,i)),i.AddDamageValue(a.Id,e),this.Hkr<i.GetTargetCount()&&(this.Hkr=i.GetTargetCount())}else Log_1.Log.CheckError()&&Log_1.Log.Error("Test",21,"获取不到roleData",["roleId",t])}else Log_1.Log.CheckDebug()&&Log_1.Log.Debug("Test",21,"伤害表中找不到id",["伤害Id",i])}}static ExportStatisticsBySkillType(){var i=new StringBuilder_1.StringBuilder;i.Append("角色Id,名称,治疗/伤害,技能");for(let t=0;t<this.Vkr;t++){var e=(t+1).toString();i.Append(StringUtils_1.StringUtils.Format(this.jkr,e,e,e,e,e))}i.Append("\n");var t=this.Okr;if(0<t?.size)for(var[,a]of t)for(var[,s]of a)i.Append(s.ToString());if(0<(t=this.kkr)?.size)for(var[,r]of t)for(var[,n]of r)i.Append(n.ToString());return i.ToString()}static ExportStatisticsByAttackType(){var i=new StringBuilder_1.StringBuilder;i.Append("角色Id,名称,治疗/伤害,伤害类型");for(let t=0;t<this.Hkr;t++){var e=(t+1).toString();i.Append(StringUtils_1.StringUtils.Format(this.jkr,e,e,e,e,e))}i.Append("\n");var t=this.Gkr;if(0<t?.size)for(var[,a]of t)for(var[,s]of a)i.Append(s.ToString());if(0<(t=this.Nkr)?.size)for(var[,r]of t)for(var[,n]of r)i.Append(n.ToString());return i.ToString()}static get OpenOperationRecord(){return this.vkr}xkr(){var t;CharacterStatisticsComponent_1.vkr&&(t=this.Entity,CharacterStatisticsComponent_1.Ikr.has(t.Id)||CharacterStatisticsComponent_1.IsInRecordArea(t)&&this.Wkr())}Wkr(){if(this.dkr.clear(),this.gkr.clear(),this.Ckr.clear(),this.Entity.GetComponent(0).IsRole()){CharacterStatisticsComponent_1.Kkr.push(this.Entity.Id),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharUseSkill,this.Ekr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.OnSkillEnd,this.ykr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,this.pkr);var t,i=this.Entity.GetComponent(158),e=(i?.Valid&&(i=i.MoveState,this.Skr(i)),this.Entity.CheckGetComponent(185));e?.Valid&&this.fkr.push(e.ListenForTagAddOrRemove(-2044964178,this.Pji));for([t]of CharacterStatisticsComponent_1.Qkr)e.HasTag(t)&&this.Ckr.set(t,Time_1.Time.NowSeconds)}else{var a=this.Entity.CheckGetComponent(185);if(a?.Valid){CharacterStatisticsComponent_1.Kkr.push(this.Entity.Id),this.fkr.push(a.ListenForTagAddOrRemove(-1112841587,this.Pji)),this.fkr.push(a.ListenForTagAddOrRemove(-1109506297,this.Pji)),this.fkr.push(a.ListenForTagAddOrRemove(-1838149281,this.Pji)),this.fkr.push(a.ListenForTagAddOrRemove(1922078392,this.Pji));for(var[s]of CharacterStatisticsComponent_1.Xkr)a.HasTag(s)&&this.Ckr.set(s,Time_1.Time.NowSeconds)}}}wkr(){this.Entity.GetComponent(0)?.IsRole()&&(EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharUseSkill,this.Ekr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.OnSkillEnd,this.ykr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,this.pkr));for(const t of this.fkr)t.EndTask();this.fkr.length=0}Skr(t){var i;CharacterStatisticsComponent_1.$kr.has(t)&&(this.gkr.get(t)&&(i=this.Entity.GetComponent(0).GetRoleConfig(),Log_1.Log.CheckError())&&Log_1.Log.Error("Character",21,"记录移动开始时间时有未执行OnMoveStateEnd",["RoleName",ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name)],["State",t]),this.gkr.set(t,Time_1.Time.NowSeconds))}Mkr(e){if(CharacterStatisticsComponent_1.$kr.has(e)){var a=this.Entity.Id;let t=CharacterStatisticsComponent_1.Ikr.get(a),i=(t||(s=this.Entity.GetComponent(0).GetRoleConfig(),r=ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(s.Name),t=new CharacterOperationRecord(r,a,s.Id),CharacterStatisticsComponent_1.Ikr.set(a,t)),t.MoveOperationMap.get(e));i||(i=new SkillOperationRecord(CharacterStatisticsComponent_1.$kr.get(e)),t.MoveOperationMap.set(e,i));var s,r=this.gkr.get(e);void 0===r?Log_1.Log.CheckError()&&Log_1.Log.Error("Test",21,"计算出现异常 OnMoveStateEnd",["Name",t.Name],["Id",t.EntityId],["Map",this.gkr]):(s=Time_1.Time.NowSeconds-r,i.AddOptCountAndTime(s)),this.gkr.set(e,void 0)}}static StageInfo(t){return t===Protocol_1.Aki.Protocol.HBs.Proto_Monster?CharacterStatisticsComponent_1.Xkr:t===Protocol_1.Aki.Protocol.HBs.Proto_Player?CharacterStatisticsComponent_1.Qkr:void 0}Pkr(){if(CharacterStatisticsComponent_1.vkr){var t=this.Entity.GetComponent(185);if(t){var i,e=this.Entity.GetComponent(0).GetEntityType();for([i]of CharacterStatisticsComponent_1.StageInfo(e))t.HasTag(i)&&(this.Pji(i,!0),Log_1.Log.CheckDebug())&&Log_1.Log.Debug("Test",21,"InitStageBeginTime",["Id",this.Entity.Id],["TagId",i])}}}static OperationRecord(t){if(this.vkr=t)for(const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()){var i=a.Entity.GetComponent(24);i&&a.Entity.GetComponent(17)?.Valid&&this.IsInRecordArea(a.Entity)&&(i.akr=!0,i.Wkr())}else{for(const s of this.Kkr){var e=EntitySystem_1.EntitySystem.Get(s);e?.Valid&&(e=e.GetComponent(24))&&(e.akr=!1,e.wkr())}this.Kkr.length=0}}static IsInRecordArea(t){if(t?.Valid){var i=t.GetComponent(0);if(i.IsRole())return!0;if(i.IsMonster()){i=t.GetComponent(1);if(!i)return!1;if(Vector_1.Vector.DistSquaredXY(i.ActorLocationProxy,ModelManager_1.ModelManager.CameraModel.CameraLocation)<CharacterStatisticsComponent_1.HalfLengthRecordSquared)return!0}}return!1}static ExportRecord(){if(0!==this.Ikr.size){this.vkr&&this.OperationRecord(!1);var t,i=new StringBuilder_1.StringBuilder;i.Append(this.Ykr);for([,t]of this.Ikr)i.Append(t.ToString());return i.ToString()}}static OperationRecordCount(){let t=0;for(var[,i]of this.Ikr)t=(t=(t+=i.SkillOperationMap.size)+i.MoveOperationMap.size)+i.TagOperationMap.size;return t}static CleanupOperationRecord(){this.Ikr.clear()}static SetCombatStarted(t,i,e,a){(this.Dkr=t)&&(this.SetTypeOpen(i),this.SetCurrentAttacker(e),this.SetCurrentTarget(a))}static GetAttackerCombatEntities(){this.Jkr.length=0;var t=UE.NewArray(UE.BuiltinString),i=(t.Add("无"),this.Jkr.push(0),ModelManager_1.ModelManager.CreatureModel.GetAllEntities());for(const a of i){var e=this.GetEntityName(a);e&&(t.Add(e),this.Jkr.push(a.Id))}return t}static GetTargetCombatEntities(){this.zkr.length=0;var t=UE.NewArray(UE.BuiltinString),i=(t.Add("无"),this.zkr.push(0),ModelManager_1.ModelManager.CreatureModel.GetAllEntities());for(const a of i){var e=this.GetEntityName(a);e&&(t.Add(e),this.zkr.push(a.Id))}return t}static GetEntityName(t){var i,e;if(t)return(i=(t=t.Entity.GetComponent(0))?.GetEntityType())===Protocol_1.Aki.Protocol.HBs.Proto_Player?(e=t.Valid?t.GetRoleId():0,(e=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))?(e=e.GetRoleId(),e=ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name)):void 0):i===Protocol_1.Aki.Protocol.HBs.Proto_Monster?PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetBaseInfo()?.TidName??""):void 0}static SetTypeOpen(e){if(!this.Zkr){var i=e.length;if(this.e2r.size!==i)this.Zkr=!0;else for(let t=0;t<i;t++){var a=e[t];if(!this.e2r.get(a)){this.Zkr=!0;break}}}this.e2r.clear();for(let t=0,i=e.length;t<i;t++){var s=e[t];this.e2r.set(s,!0)}}static SetCurrentAttacker(t){t=this.Jkr[t];this.t2r!==t&&(this.Zkr=!0),this.t2r=t}static SetCurrentTarget(t){t=this.zkr[t];this.i2r!==t&&(this.Zkr=!0),this.i2r=t}static get ItemReset(){return this.Zkr}static OnItemsResetFinished(){this.Zkr=!1,this.Ukr.length=0;for(const t of this.Rkr)this.Akr(t)&&this.Ukr.push(t)}static GetSubItemsListView(i,e){var a=UE.NewArray(UE.BuiltinString);for(let t=0;t<e;t++)a.Add(this.Ukr[i+t].ToString());return a}static GetItemListViewCount(){return this.Ukr.length}lkr(t,i,e,a,s){var r;CharacterStatisticsComponent_1.Dkr&&(r=a.Damage,a=a.DamageData.Id,(i=new CombatDataHeal(i.Id,a,r,s.SkillId,e.Id)).ToString(),CharacterStatisticsComponent_1.Rkr.push(i),CharacterStatisticsComponent_1.Akr(i))&&CharacterStatisticsComponent_1.Ukr.push(i)}ukr(t,i,e,a,s,r,n,o,h,c,C,_,m){CharacterStatisticsComponent_1.Dkr&&((h=new CombatDataDamage(a.Id,h,t,m.SkillId,s.Id)).ToString(),CharacterStatisticsComponent_1.Rkr.push(h),CharacterStatisticsComponent_1.Akr(h)&&CharacterStatisticsComponent_1.Ukr.push(h),_)&&((t=new CombatDataKilled(a.Id,s.Id)).ToString(),CharacterStatisticsComponent_1.Rkr.push(t),CharacterStatisticsComponent_1.Akr(t))&&CharacterStatisticsComponent_1.Ukr.push(t)}Bkr(t){var i;!CharacterStatisticsComponent_1.Dkr||!(i=t.Config.Id)||i<=0||((i=new CombatDataBuffAdded(t.GetInstigator().Id,i,t.GetOwner().Id)).ToString(),CharacterStatisticsComponent_1.Rkr.push(i),CharacterStatisticsComponent_1.Akr(i)&&CharacterStatisticsComponent_1.Ukr.push(i))}bkr(t){var i;!CharacterStatisticsComponent_1.Dkr||!(i=t.Config.Id)||i<=0||((i=new CombatDataBuffRemoved(t.GetInstigator().Id,i,t.GetOwner().Id)).ToString(),CharacterStatisticsComponent_1.Rkr.push(i),CharacterStatisticsComponent_1.Akr(i)&&CharacterStatisticsComponent_1.Ukr.push(i))}mkr(){var t;CharacterStatisticsComponent_1.Dkr&&((t=new CombatDataRevive(this.Entity.Id)).ToString(),CharacterStatisticsComponent_1.Rkr.push(t),CharacterStatisticsComponent_1.Akr(t))&&CharacterStatisticsComponent_1.Ukr.push(t)}static Akr(t){return!(0<this.t2r&&this.t2r!==t.AttackerId||0<this.i2r&&this.i2r!==t.TargetId||!this.e2r.get(0)&&t instanceof CombatDataDamage||!this.e2r.get(1)&&t instanceof CombatDataHeal||!this.e2r.get(2)&&t instanceof CombatDataSkill||!this.e2r.get(3)&&(t instanceof CombatDataBuffRemoved||t instanceof CombatDataBuffAdded)||!this.e2r.get(4)&&t instanceof CombatDataKilled||!this.e2r.get(5)&&t instanceof CombatDataRevive)}};CharacterStatisticsComponent.qkr=new Array,CharacterStatisticsComponent.Okr=new Map,CharacterStatisticsComponent.Gkr=new Map,CharacterStatisticsComponent.kkr=new Map,CharacterStatisticsComponent.Nkr=new Map,CharacterStatisticsComponent.jkr=",目标{0}类型,目标{1}名称,目标{2}配置ID,目标{3}单位Id,目标{4}伤害",CharacterStatisticsComponent.Vkr=0,CharacterStatisticsComponent.Hkr=0,CharacterStatisticsComponent.HalfLengthRecordSquared=25e6,CharacterStatisticsComponent.Ikr=new Map,CharacterStatisticsComponent.vkr=!1,CharacterStatisticsComponent.$kr=new Map([[CharacterUnifiedStateTypes_1.ECharMoveState.Walk,"走"],[CharacterUnifiedStateTypes_1.ECharMoveState.Run,"跑"],[CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,"冲刺"],[CharacterUnifiedStateTypes_1.ECharMoveState.Dodge,"闪避"]]),CharacterStatisticsComponent.Tkr=["普攻0","蓄力1","E技能2","大招3","QTE4","极限闪避反击5","地面闪避6","极限闪避7","被动技能8","战斗幻象技9","探索幻象技10","空中闪避11","无类别"],CharacterStatisticsComponent.Xkr=new Map([[-1109506297,"正常时间"],[-1838149281,"狂暴时间"],[1922078392,"瘫痪时间"],[-1112841587,"脆弱时间"]]),CharacterStatisticsComponent.Qkr=new Map([[-2044964178,"受击硬直"]]),CharacterStatisticsComponent.Kkr=new Array,CharacterStatisticsComponent.Ykr="角色ID,角色名称,配置ID,技能/阶段,时间,次数\n",CharacterStatisticsComponent.Dkr=!1,CharacterStatisticsComponent.e2r=new Map,CharacterStatisticsComponent.Jkr=new Array,CharacterStatisticsComponent.zkr=new Array,CharacterStatisticsComponent.t2r=0,CharacterStatisticsComponent.i2r=0,CharacterStatisticsComponent.Zkr=!1,CharacterStatisticsComponent.Ukr=new Array,CharacterStatisticsComponent.Rkr=new Array,CharacterStatisticsComponent=CharacterStatisticsComponent_1=__decorate([(0,RegisterComponent_1.RegisterComponent)(24)],CharacterStatisticsComponent),exports.CharacterStatisticsComponent=CharacterStatisticsComponent;const SKILL_RECORD_FMT="{0},{1},{2}";class SkillOperationRecord{constructor(t){this.he=t,this.oUe=0,this.JQt=0}AddOptCountAndTime(t,i=1){this.oUe+=t,this.JQt+=i}ToString(){return StringUtils_1.StringUtils.Format(SKILL_RECORD_FMT,this.he,this.oUe.toString(),this.JQt.toString())}}const CHARACTER_RECORD_FMT="{0},{1},{2},{3}\n";class CharacterOperationRecord{constructor(t,i,e){this.Name=t,this.EntityId=i,this.wKo=e,this.SkillOperationMap=new Map,this.MoveOperationMap=new Map,this.TagOperationMap=new Map}ToString(){var t,i,e,a=new StringBuilder_1.StringBuilder;for([,t]of this.SkillOperationMap){var s=StringUtils_1.StringUtils.Format(CHARACTER_RECORD_FMT,this.EntityId.toString(),this.Name,this.wKo.toString(),t.ToString());a.Append(s)}for([,i]of this.MoveOperationMap){var r=StringUtils_1.StringUtils.Format(CHARACTER_RECORD_FMT,this.EntityId.toString(),this.Name,this.wKo.toString(),i.ToString());a.Append(r)}for([,e]of this.TagOperationMap){var n=StringUtils_1.StringUtils.Format(CHARACTER_RECORD_FMT,this.EntityId.toString(),this.Name,this.wKo.toString(),e.ToString());a.Append(n)}return a.ToString()}}
//# sourceMappingURL=CharacterStatisticsComponent.js.map