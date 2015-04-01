//
//  PIXConnectControlParameters.h
//  PixMob Connect Public API
//
//  Copyright (c) 2015 PixMob Inc. All rights reserved.
//


@import Foundation;


/*
    Effects
 */
typedef enum PIXConnectControlEffect: NSUInteger
{
    PIXConnectControlEffectBlackout = 0,
    PIXConnectControlEffectSolid,
    PIXConnectControlEffectStrobe,
    PIXConnectControlEffectFade,
    PIXConnectControlEffectPulse,
    PIXConnectControlEffectPulseClose,
    PIXConnectControlEffectPulseOpen,
    PIXConnectControlEffectBackground,
    
} PIXConnectControlEffect;


/*
    Speeds
 */
typedef enum PIXConnectControlSpeed : NSUInteger
{
    PIXConnectControlSpeedFastest = 0,
    PIXConnectControlSpeedFast,
    PIXConnectControlSpeedMedium,
    PIXConnectControlSpeedSlow,
    PIXConnectControlSpeedSlowest,
    
} PIXConnectControlSpeed;


/*
    Triggers
 */
typedef enum PIXConnectControlTrigger : NSUInteger
{
    PIXConnectControlTriggerAlways = 0,
    PIXConnectControlTriggerOnImpact,
    PIXConnectControlTriggerOnChange,
    PIXConnectControlTriggerOnChangeAndImpact,
    
} PIXConnectControlTrigger;


/*
    Probabilities
 */
typedef enum PIXConnectControlProbability : NSUInteger
{
    PIXConnectControlProbability100 = 0,
    PIXConnectControlProbability85,
    PIXConnectControlProbability65,
    PIXConnectControlProbability50,
    PIXConnectControlProbability30,
    PIXConnectControlProbability15,
    PIXConnectControlProbability10,
    PIXConnectControlProbability5,
    
} PIXConnectControlProbability;


/*
    Groups
 */
typedef enum PIXConnectControlGroup : NSUInteger
{
    PIXConnectControlAll = 0,
    PIXConnectControlGroup1,
    PIXConnectControlGroup2,
    PIXConnectControlGroup3,
    PIXConnectControlGroup4,
    PIXConnectControlGroup5,
    PIXConnectControlGroup6,
    PIXConnectControlGroup7,
    PIXConnectControlGroup8,
    PIXConnectControlGroup9,
    PIXConnectControlGroup10,
    PIXConnectControlGroup11,
    PIXConnectControlGroup12,
    PIXConnectControlGroup13,
    PIXConnectControlGroup14,
    PIXConnectControlGroup15,
    PIXConnectControlGroup16,
    PIXConnectControlGroup17,
    PIXConnectControlGroup18,
    PIXConnectControlGroup19,
    PIXConnectControlGroup20,
    PIXConnectControlGroup21,
    PIXConnectControlGroup22,
    PIXConnectControlGroup23,
    PIXConnectControlGroup24,
    PIXConnectControlGroup25,
    PIXConnectControlGroup26,
    PIXConnectControlGroup27,
    PIXConnectControlGroup28,
    PIXConnectControlGroup29,
    PIXConnectControlGroup30,
    PIXConnectControlGroup31,
    
} PIXConnectControlGroup;




