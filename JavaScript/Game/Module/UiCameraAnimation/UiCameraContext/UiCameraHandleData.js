
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UiCameraHandleData=void 0;const puerts_1=require("puerts"),UE=require("ue"),Log_1=require("../../../../Core/Common/Log"),FNameUtil_1=require("../../../../Core/Utils/FNameUtil"),MathCommon_1=require("../../../../Core/Utils/Math/MathCommon"),Rotator_1=require("../../../../Core/Utils/Math/Rotator"),Vector_1=require("../../../../Core/Utils/Math/Vector"),MathUtils_1=require("../../../../Core/Utils/MathUtils"),StringUtils_1=require("../../../../Core/Utils/StringUtils"),CameraController_1=require("../../../Camera/CameraController"),GlobalData_1=require("../../../GlobalData"),ConfigManager_1=require("../../../Manager/ConfigManager"),RenderModuleController_1=require("../../../Render/Manager/RenderModuleController"),UiManager_1=require("../../../Ui/UiManager"),UiCameraAnimationManager_1=require("../UiCameraAnimationManager");class UiCameraHandleData{constructor(){this.AAo=void 0,this.PAo=void 0,this.xAo=void 0,this.JUo=void 0,this.wAo=void 0,this.BAo=void 0,this.bAo=new UE.Vector,this.qAo=new Map,this.GAo=UE.NewArray(UE.Actor),this.NAo=void 0,this.OAo=void 0,this.kAo=new UE.Transform,this.FAo=Vector_1.Vector.Create(),this.VAo=Vector_1.Vector.Create(),this.HAo=Vector_1.Vector.Create(),this.jAo=void 0,this.WAo=void 0,this.IsEmptyState=!1,this.ReplaceCameraTag=void 0}ToString(){return`UniqueId:${this.AAo},HandleName:${this.BAo},ViewName:`+this.PAo}static NewByHandleName(t,i){var e=UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId(),r=new UiCameraHandleData;return r.UniqueId=e,r.HandleName=t,i?.IsValid()&&(r.wAo=i),r.Refresh(),r}static NewByView(t,i){var e,r,a=UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(t);if(a)return e=UiManager_1.UiManager.GetViewByName(t),(r=new UiCameraHandleData).UniqueId=e?e.GetViewId():UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId(),r.HandleName=a.GetSourceHandleName(),r.ViewName=t,r.UiCameraMappingConfig=a.GetUiCameraMappingConfig(),r.wAo=i,r.Refresh(),r}Reset(){this.AAo=void 0,this.PAo=void 0,this.xAo=void 0,this.BAo=void 0,this.bAo=void 0,this.qAo.clear(),this.NAo=void 0,this.jAo=void 0,this.WAo=void 0,this.GAo.Empty(),this.JUo=void 0}Refresh(){var t,i;this.JUo=ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(this.HandleName),this.JUo&&(i=this.JUo.TargetType,this.IsEmptyState=this.JUo.IsEmptyState,this.jAo=UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActor(i),this.WAo=UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActorSkeletalMesh(i),this.ReplaceCameraTag=this.JUo.ReplaceCameraTag,StringUtils_1.StringUtils.IsEmpty(this.ReplaceCameraTag)?(this.NAo=void 0,this.OAo=void 0):(i=FNameUtil_1.FNameUtil.GetDynamicFName(this.ReplaceCameraTag),t=(0,puerts_1.$ref)(this.GAo),UE.GameplayStatics.GetAllActorsOfClassWithTag(GlobalData_1.GlobalData.World,UE.CineCameraActor.StaticClass(),i,t),!(i=(0,puerts_1.$unref)(t))||i.Num()<1||(this.NAo=i.Get(0),this.OAo=this.NAo?.GetCineCameraComponent())))}set UniqueId(t){this.AAo=t}get UniqueId(){return this.AAo}set HandleName(t){this.BAo=t}get HandleName(){return this.BAo}set ViewName(t){this.PAo=t}get ViewName(){return this.PAo}set UiCameraMappingConfig(t){this.xAo=t}get UiCameraMappingConfig(){return this.xAo}get ExternalTransform(){return this.wAo}GetHandleName(){return this.BAo}IsEqual(t){return this.HandleName===t.HandleName&&this.ReplaceCameraTag===t.ReplaceCameraTag&&this.ViewName===t.ViewName&&this.UniqueId===t.UniqueId}GetUiCameraAnimationConfig(){return this.JUo}GetTargetActor(){return this.jAo}GetTargetSkeletalMesh(){return this.WAo}GetTargetSkeletalMeshTransform(){var t=this.GetTargetSkeletalMesh();if(t)return this.kAo.SetLocation(t.K2_GetComponentLocation()),this.kAo.SetRotation(t.K2_GetComponentQuaternion()),this.kAo.SetScale3D(t.K2_GetComponentScale()),this.kAo}GetTargetSkeletalMeshSocketTransform(){var t=this.GetUiCameraAnimationConfig(),t=FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),i=this.GetTargetSkeletalMesh();if(i)return i.GetSocketTransform(t)}GetTargetArmLength(){var t,i;return this.NAo?(t=this.GetTargetActor())?.IsValid()&&this.JUo.bTargetActorAsCenter?(t=Vector_1.Vector.Create(t.K2_GetActorLocation()),i=Vector_1.Vector.Create(this.NAo.K2_GetActorLocation()),Vector_1.Vector.Dist2D(t,i)):0:this.GetUiCameraAnimationConfig().ArmLength}GetTargetArmOffsetLocation(){return this.OAo?Vector_1.Vector.ZeroVector:this.GetUiCameraAnimationConfig().ArmOffsetLocation}GetTargetArmOffsetRotation(){if(this.NAo&&this.JUo.bTargetActorAsCenter){var t=this.GetTargetActor();if(t)return t=this.KAo(t.K2_GetActorLocation(),this.NAo.K2_GetActorLocation(),this.NAo.K2_GetActorRotation()),UE.KismetMathLibrary.FindLookAtRotation(this.NAo.K2_GetActorLocation(),t)}return this.GetUiCameraAnimationConfig().ArmOffsetRotation}GetTargetArmCollisionTest(){return!this.NAo&&this.GetUiCameraAnimationConfig().ArmCollisionTest}GetTargetFieldOfView(){return this.OAo?this.OAo.FieldOfView:this.GetUiCameraAnimationConfig().CameraFieldOfView}GetTargetFocalDistance(){return this.OAo?this.OAo.FocusSettings.ManualFocusDistance:this.GetUiCameraAnimationConfig().FocalDistance}GetTargetAperture(){return this.OAo?this.OAo.CurrentAperture:this.GetUiCameraAnimationConfig().Aperture}GetDefaultLocation(){var t,i;return this.ExternalTransform?this.ExternalTransform.GetLocation():(t=this.GetUiCameraAnimationConfig())?(3===(i=t.TargetType)||4===i||5===i)&&RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow&&RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering?((i=new UE.Vector).X=t.Location.X+RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset.X,i.Y=t.Location.Y+RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset.Y,i.Z=t.Location.Z+RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset.Z,i):t.Location:void 0}KAo(t,i,e){this.FAo.DeepCopy(t),this.VAo.DeepCopy(i);t=Vector_1.Vector.Dist2D(this.FAo,this.VAo),i=e.Pitch,e=MathCommon_1.MathCommon.WrapAngle(i),i=MathCommon_1.MathCommon.DegreeToRadian(e),e=t*Math.tan(i)+this.VAo.Z;return this.HAo.Set(this.FAo.X,this.FAo.Y,e),this.HAo.ToUeVector()}GetTargetLocation(){if(this.ExternalTransform)return this.ExternalTransform.GetLocation();var t=this.JUo?.ReplaceCameraTag;if(!StringUtils_1.StringUtils.IsEmpty(t))return this.NAo?.IsValid()?(t=this.GetTargetActor())?.IsValid()&&this.JUo.bTargetActorAsCenter?this.KAo(t.K2_GetActorLocation(),this.NAo.K2_GetActorLocation(),this.NAo.K2_GetActorRotation()):this.NAo.K2_GetActorLocation():void 0;var i=this.GetDefaultLocation();switch(this.JUo.LocationType){case 0:return i;case 1:var e,r=this.GetTargetSkeletalMeshTransform();return r?(a=(e=this.GetTargetSkeletalMesh()).GetOwner())?.IsValid()?a.K2_GetActorLocation().Equals(e.K2_GetComponentLocation(),MathUtils_1.MathUtils.SmallNumber)?i:UE.KismetMathLibrary.TransformLocation(r,i):void 0:void(Log_1.Log.CheckError()&&Log_1.Log.Error("CameraAnimation",8,"播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画"));case 2:var a=this.GetTargetSkeletalMeshSocketTransform();return a?UE.KismetMathLibrary.TransformLocation(a,i):void(Log_1.Log.CheckError()&&Log_1.Log.Error("CameraAnimation",8,"播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画"))}}GetDefaultRotation(){var t=this.ExternalTransform;if(t)return t.GetRotation().Rotator();t=this.GetUiCameraAnimationConfig();if(t){if(this.NAo)return this.NAo.K2_GetActorRotation();if(!t.IsTrack)return t.Rotation;var i=CameraController_1.CameraController.CameraLocation;if(t.IsTrackWorldLocation){var e=t.TrackLocation;const a=UE.KismetMathLibrary.FindLookAtRotation(i.ToUeVector(),e);return t.bOverrideTrackPitch&&(a.Pitch=t.TrackPitchOverride),a}e=this.GetTargetActor();if(!e)return t.Rotation;if(this.bAo){var r=t.TrackLocation,e=e.K2_GetActorLocation();this.bAo.X=e.X+r.X,this.bAo.Y=e.Y+r.Y,this.bAo.Z=e.Z+r.Z;const a=UE.KismetMathLibrary.FindLookAtRotation(i.ToUeVector(),this.bAo);return t.bOverrideTrackPitch&&(a.Pitch=t.TrackPitchOverride),a}}}GetTargetRotation(){var t=this.ExternalTransform;if(t)return t.GetRotation().Rotator();t=this.JUo?.ReplaceCameraTag;if(!StringUtils_1.StringUtils.IsEmpty(t))return this.NAo?.IsValid()?this.GetTargetActor()?.IsValid()&&this.JUo.bTargetActorAsCenter?Rotator_1.Rotator.ZeroRotator:this.NAo.K2_GetActorRotation():void 0;var i=this.GetDefaultRotation();switch(this.JUo.RotationType){case 0:return i;case 2:var e=this.GetTargetActor();return e?(e=e.GetTransform(),r=Rotator_1.Rotator.Create(0,i.Yaw,0),UE.KismetMathLibrary.TransformRotation(e,r.ToUeRotator())):i;case 1:e=CameraController_1.CameraController.FightCamera.GetComponent(5).CameraRotation.Yaw;return Rotator_1.Rotator.Create(0,e,0).ToUeRotator();case 3:var r=this.GetTargetActor();return r?(e=r.GetTransform(),(r=this.GetTargetSkeletalMesh())?(r=r.RelativeRotation,r=Rotator_1.Rotator.Create(r.Pitch+i.Pitch,r.Yaw+i.Yaw,r.Roll+i.Roll),UE.KismetMathLibrary.TransformRotation(e,r.ToUeRotator())):void(Log_1.Log.CheckError()&&Log_1.Log.Error("CameraAnimation",8,"播放Ui镜头获得对应相机旋转时，拿不到对应的Actor骨骼，不播放镜头动画"))):void(Log_1.Log.CheckError()&&Log_1.Log.Error("CameraAnimation",8,"播放Ui镜头获得对应相机旋转时，拿不到对应的Actor，不播放镜头动画"))}}GetTargetPostProcessBlendWeight(){return(this.OAo||this.GetUiCameraAnimationConfig()).PostProcessBlendWeight}GetReplaceCameraActor(){return this.NAo}GetReplaceCameraComponent(){return this.OAo}CanApplyAnimationHandle(){var t=this.GetUiCameraAnimationConfig();if(!t)return!1;var i=t.TargetType,e=FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),t=2===t.LocationType;if(2===i||1===i){if(!this.WAo)return!1;if(t){if(FNameUtil_1.FNameUtil.IsEmpty(e))return!1;if(!this.WAo.DoesSocketExist(e))return!1}}return!0}}exports.UiCameraHandleData=UiCameraHandleData;
//# sourceMappingURL=UiCameraHandleData.js.map