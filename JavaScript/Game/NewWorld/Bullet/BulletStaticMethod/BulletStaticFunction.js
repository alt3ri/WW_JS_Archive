
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HitStaticFunction=exports.BulletStaticFunction=void 0;const puerts_1=require("puerts"),UE=require("ue"),AudioSystem_1=require("../../../../Core/Audio/AudioSystem"),Log_1=require("../../../../Core/Common/Log"),RegisterComponent_1=require("../../../../Core/Entity/RegisterComponent"),FNameUtil_1=require("../../../../Core/Utils/FNameUtil"),MathCommon_1=require("../../../../Core/Utils/Math/MathCommon"),Rotator_1=require("../../../../Core/Utils/Math/Rotator"),Vector_1=require("../../../../Core/Utils/Math/Vector"),MathUtils_1=require("../../../../Core/Utils/MathUtils"),StringUtils_1=require("../../../../Core/Utils/StringUtils"),EffectAudioContext_1=require("../../../Effect/EffectContext/EffectAudioContext"),EffectContext_1=require("../../../Effect/EffectContext/EffectContext"),EffectSystem_1=require("../../../Effect/EffectSystem"),GlobalData_1=require("../../../GlobalData"),BulletConstant_1=require("../BulletConstant"),collisionColor=new UE.LinearColor(255,80,77,1),DRAW_SECTOR_ANGLE_PERIOD=30;class BulletStaticFunction{static CreateMultipleBoxToFan(e,i,o,s,r,l){let a=void 0;a=o<MathCommon_1.MathCommon.FlatAngle?BulletConstant_1.BulletConstant.FactorBoxSix:BulletConstant_1.BulletConstant.FactorBoxTwelve;var c=new UE.Transform,n=new UE.Rotator(0);let _=o/a;var t=Vector_1.Vector.Create(i/2,0,0),t=(t.AdditionEqual(Vector_1.Vector.Create(s)),c.SetLocation(t.ToUeVector()),e.AddComponentByClass(UE.BoxComponent.StaticClass(),!1,c,!1)),h=(t.LineThickness=5,t.SetBoxExtent(Vector_1.Vector.OneVector,!1),t.SetCollisionProfileName(r),l.add(t),Vector_1.Vector.Create(0,0,0));for(let t=0;t<a/2;++t){h.FromUeVector(Vector_1.Vector.ForwardVectorProxy),h.RotateAngleAxis(_,Vector_1.Vector.UpVectorProxy,h),h.MultiplyEqual(i/2),h.AdditionEqual(Vector_1.Vector.Create(s)),c.SetLocation(h.ToUeVector()),h.Reset(),n.Yaw=_,c.SetRotation(n.Quaternion());var u=e.AddComponentByClass(UE.BoxComponent.StaticClass(),!1,c,!1);u.LineThickness=5,u.SetBoxExtent(Vector_1.Vector.OneVector,!1),u.SetCollisionProfileName(r),_+=o/a,l.add(u)}_=-o/a;for(let t=0;t<a/2;++t){h.FromUeVector(Vector_1.Vector.ForwardVectorProxy),h.RotateAngleAxis(_,Vector_1.Vector.UpVectorProxy,h),h.MultiplyEqual(i/2),h.AdditionEqual(Vector_1.Vector.Create(s)),c.SetLocation(h.ToUeVector()),h.Reset(),n.Yaw=_,c.SetRotation(n.Quaternion());var f=e.AddComponentByClass(UE.BoxComponent.StaticClass(),!1,c,!1);f.LineThickness=5,f.SetBoxExtent(Vector_1.Vector.OneVector,!1),f.SetCollisionProfileName(r),_-=o/a,l.add(f)}return t}static CompCurveVector(t,e,i){var o=(0,puerts_1.$ref)(0),s=(0,puerts_1.$ref)(0),e=(i.GetTimeRange(s,o),o=(0,puerts_1.$unref)(o),s=(0,puerts_1.$unref)(s),MathUtils_1.MathUtils.IsNearlyZero(e,MathUtils_1.MathUtils.KindaSmallNumber)?MathUtils_1.MathUtils.KindaSmallNumber:e);return i.GetVectorValue(MathUtils_1.MathUtils.RangeClamp(t/e,0,1,s,o))}static CompCurveFloat(t,e,i){var o=(0,puerts_1.$ref)(0),s=(0,puerts_1.$ref)(0),e=(i.GetTimeRange(s,o),o=(0,puerts_1.$unref)(o),s=(0,puerts_1.$unref)(s),MathUtils_1.MathUtils.IsNearlyZero(e,MathUtils_1.MathUtils.KindaSmallNumber)?MathUtils_1.MathUtils.KindaSmallNumber:e);return i.GetFloatValue(MathUtils_1.MathUtils.RangeClamp(t/e,0,1,s,o))}static DebugDrawRing(t,e,i,o){var s;i<=0||(s=new UE.Vector(o.X,o.Y,o.Z+t),o=new UE.Vector(o.X,o.Y,o.Z-t),0<e&&UE.KismetSystemLibrary.DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance,s,o,e,32,collisionColor),UE.KismetSystemLibrary.DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance,s,o,i,32,collisionColor))}static DebugDrawSector(t,e,i,o,s,r,l){o.RotateVector(Vector_1.Vector.UpVectorProxy,this.f7o),this.f7o.Multiply(t,this.p7o),this.f7o.Multiply(-t,this.v7o),s.Addition(this.p7o,this.f7o),s.Addition(this.v7o,this.Tz),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.f7o.ToUeVector(),this.Tz.ToUeVector(),r??collisionColor,l);var a=i*MathUtils_1.MathUtils.DegToRad*.5,c=(this.M7o.Set(Math.cos(a)*e,Math.sin(a)*e,0),o.RotateVector(this.M7o,this.S7o),this.S7o.AdditionEqual(s),this.E7o.FromUeVector(this.S7o),this.S7o.AdditionEqual(this.p7o),this.E7o.AdditionEqual(this.v7o),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.f7o.ToUeVector(),this.S7o.ToUeVector(),r??collisionColor,l),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.Tz.ToUeVector(),this.E7o.ToUeVector(),r??collisionColor,l),this.M7o.Set(Math.cos(-a)*e,Math.sin(-a)*e,0),o.RotateVector(this.M7o,this.S7o),this.S7o.AdditionEqual(s),this.E7o.FromUeVector(this.S7o),this.S7o.AdditionEqual(this.p7o),this.E7o.AdditionEqual(this.v7o),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.S7o.ToUeVector(),this.E7o.ToUeVector(),r??collisionColor,l),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.f7o.ToUeVector(),this.S7o.ToUeVector(),r??collisionColor,l),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.Tz.ToUeVector(),this.E7o.ToUeVector(),r??collisionColor,l),Math.max(Math.ceil(i/DRAW_SECTOR_ANGLE_PERIOD),2)),n=i/c*MathUtils_1.MathUtils.DegToRad;for(let t=1;t<=c;++t){this.f7o.FromUeVector(this.S7o),this.Tz.FromUeVector(this.E7o);var _=-a+n*t;this.M7o.Set(Math.cos(_)*e,Math.sin(_)*e,0),o.RotateVector(this.M7o,this.S7o),this.S7o.AdditionEqual(s),this.E7o.FromUeVector(this.S7o),this.S7o.AdditionEqual(this.p7o),this.E7o.AdditionEqual(this.v7o),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.S7o.ToUeVector(),this.E7o.ToUeVector(),r??collisionColor,l),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.f7o.ToUeVector(),this.S7o.ToUeVector(),r??collisionColor,l),UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.GameInstance,this.Tz.ToUeVector(),this.E7o.ToUeVector(),r??collisionColor,l)}}static SpawnHitEffect(t,e,i){t.EffectInfo.HandOver||(e=t.EffectInfo.EffectData.EffectOnHit.get(e))&&BulletStaticFunction.PlayBulletEffect(t.Actor,e,t.ActorComponent.ActorTransform,t,i)}static BulletHitEffect(t,e){var i=t.EffectInfo.EffectData.EffectOnHit.get(2);i&&(e=new UE.Transform(Rotator_1.Rotator.ZeroRotator,e,Vector_1.Vector.OneVector),BulletStaticFunction.PlayBulletEffect(t.Actor,i,e,t,"[BulletStaticFunction.BulletHitEffect]"))}static PlayBulletEffect(t,e,i,o,s){let r=void 0;(0,RegisterComponent_1.isComponentInstance)(o.AttackerAudioComponent,170)?((l=new EffectAudioContext_1.EffectAudioContext).FromPrimaryRole="p1"===o.AttackerAudioComponent.Priority.State,l.EntityId=o.Attacker?o.Attacker.Id:void 0,l.SourceObject=o.AttackerActorComp.Owner,r=l):o.AttackerActorComp?.Valid&&((r=new EffectContext_1.EffectContext(o.Attacker?o.Attacker.Id:void 0)).EntityId=o.Attacker?o.Attacker.Id:void 0,r.SourceObject=o.AttackerActorComp.Owner);var l=EffectSystem_1.EffectSystem.SpawnEffect(t,i,e,s,r,0);return l}static DestroyEffect(t,e=!0){var i;t.HandOver||t.IsEffectDestroy||(t.IsEffectDestroy=!0,EffectSystem_1.EffectSystem.IsValid(t.Effect)&&((i=EffectSystem_1.EffectSystem.GetSureEffectActor(t.Effect))?.IsValid()&&i.K2_DetachFromActor(1,1,1),t.IsFinishAuto?(e&&EffectSystem_1.EffectSystem.SetTimeScale(t.Effect,1),EffectSystem_1.EffectSystem.StopEffectById(t.Effect,"[BulletStaticFunction.DestroyEffect] IsFinishAuto=true",!1)):EffectSystem_1.EffectSystem.StopEffectById(t.Effect,"[BulletStaticFunction.DestroyEffect] IsFinishAuto=false",!0)))}static SetBulletEffectTimeScale(t,e){EffectSystem_1.EffectSystem.IsValid(t.Effect)&&EffectSystem_1.EffectSystem.SetTimeScale(t.Effect,e)}static HandOverEffects(t,e){t=t.EffectInfo,e=e.EffectInfo;this.DestroyEffect(e),e.EffectData=t.EffectData,e.Effect=t.Effect,e.IsEffectDestroy=!1,t.HandOver=!0,t.Effect=0}static HandOverEffectsAfterInitTransform(t){var e=t.EffectInfo,e=EffectSystem_1.EffectSystem.GetEffectActor(e.Effect);e?.IsValid()?e.K2_AttachToActor(t.Actor,FNameUtil_1.FNameUtil.NONE,1,1,1,!0):Log_1.Log.CheckDebug()&&Log_1.Log.Debug("Bullet",21,"接收父子弹特效为空")}}(exports.BulletStaticFunction=BulletStaticFunction).p7o=Vector_1.Vector.Create(),BulletStaticFunction.v7o=Vector_1.Vector.Create(),BulletStaticFunction.f7o=Vector_1.Vector.Create(),BulletStaticFunction.Tz=Vector_1.Vector.Create(),BulletStaticFunction.M7o=Vector_1.Vector.Create(),BulletStaticFunction.S7o=Vector_1.Vector.Create(),BulletStaticFunction.E7o=Vector_1.Vector.Create();class HitStaticFunction{static PlayHitAudio(t,e,i,o){5===t&&i&&!StringUtils_1.StringUtils.IsBlank(i)&&(t=EffectSystem_1.EffectSystem.GetSureEffectActor(e),e=AudioSystem_1.AudioSystem.GetAkComponent(t,{OnCreated:t=>{AudioSystem_1.AudioSystem.SetSwitch("char_p1orp3",o?"p1":"p3",t)}}),AudioSystem_1.AudioSystem.PostEvent(i,e))}static CreateEffectContext(e,i=void 0){if(e){var o,s=e.GetComponent(42),r=e.GetComponent(1);let t=void 0;return(0,RegisterComponent_1.isComponentInstance)(s,170)?((o=new EffectAudioContext_1.EffectAudioContext).FromPrimaryRole=i??"p1"===s.Priority.State,o.SourceObject=r.Owner,(t=o).SourceObject=r?.Owner,t.EntityId=e.Id):r?.Valid&&((t=new EffectContext_1.EffectContext).SourceObject=r?.Owner,t.EntityId=e.Id),t}}}exports.HitStaticFunction=HitStaticFunction;
//# sourceMappingURL=BulletStaticFunction.js.map