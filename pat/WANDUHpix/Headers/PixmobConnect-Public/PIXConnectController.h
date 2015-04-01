//
//  PIXConnectController.h
//  PixMob Connect Public API
//
//  Copyright (c) 2015 PixMob Inc. All rights reserved.
//


@import UIKit;

#import "PIXConnectControlParameters.h"


@interface PIXConnectController : NSObject


#pragma mark - Init

/**
 Initialize the controller without specific tasks.
 
 This will only instantiate the singleton object.
 
 The Controller is used for :
 
 - sending effects to all pixels
 - sending effects to subsets of pixels (teams, groups)
 - figuring out the pixels that are in proximity.
 
 */
- (id)init;

/**
 Initialize the controller with the color to send to the pixels
 
 @param color Color to emit from the pixel once the controller starts broadcasting
 
 */
- (id)initWithColor:(UIColor*)color;

/**
 Initialize the controller with the effect to send to the pixels
 
 @param effect Effect to run on the pixel once the controller starts broadcasting
 
 */
- (id)initWithEffect:(PIXConnectControlEffect)effect;


#pragma mark - Broadcasting

/**
 Start broadcasting signal to all pixels, start advertising.
 */
- (void) startBroadcasting;

/**
 Stop the broadcast, stop advertising.
 */
- (void) stopBroadcasting;


#pragma mark - Targets

/**
 Target all existing pixels in range. That's the default.
 */
- (void) setTargetAll:(NSUInteger)team;

/**
 Set the pixel to send the message to.
 
 Think of this as a unique MAC address
 
 @param pixelId The id of the pixel to target.
 */
- (void) setTargetId:(NSUInteger)pixelId;

/**
 Set the target Team. Addressing all pixels inside that team.
 
 Use this if you know that you are going to be using the pixels
 in en environment with multiple PixMob Connect Controllers.
 
 Think of this as a subnet.
 
 Each person (or team) participating to the Hackathon will be assigned its own unique team ID.
 
 @param team The team you want to talk to.
 */
- (void) setTargetTeam:(NSUInteger)team;

/**
 Set the target Team and Team Member. Addressing 1 pixel inside that team.
 
 Use this to address a single pixel.
 
 @param team The team to target. Range is 0x00 to 0xFF.
 
 @param teamMember The specific member (the pixel) to talk to. Range is 0x00 to 0xFF
 
 */
- (void) setTargetTeam:(NSUInteger)team withMember:(NSUInteger)teamMember;

/**
 Change pixel Team and Team Member Mask. Addressing 1 to 48 pixel simultaenously.
 
 Use this to address multiple pixels at once.
 
 @param team The team to target. Range is 0x00 to 0xFF.
 
 @param teamMemberMask The 6 Bytes mask allowing to target up to 48 pixels at once.
 
 */
- (void) setTargetTeam:(NSUInteger)team withMemberMask:(NSData*)teamMemberMask;


#pragma mark - Colors + Effects

/**
 Set the RGB color we send to the pixel
 
 @param color The color to display on the pixel
 
 */
- (void) setColor:(UIColor*)color;

/**
 Set the type of effect to execute.

 The possibles values are :
 
 - PIXConnectControlEffectBlackout
 
 - PIXConnectControlEffectBump
 
 - PIXConnectControlEffectStrobe
 
 - PIXConnectControlEffectFade
 
 - PIXConnectControlEffectPulse
 
 - PIXConnectControlEffectPulseClose
 
 - PIXConnectControlEffectPulseOpen
 
 - PIXConnectControlEffectBackground
 
 @param effect The effect to apply on the color
 
 */
- (void) setEffect:(PIXConnectControlEffect)effect;

/**
 Set the speed at which the effect envelope will execute.
 
 Variable timings depending on the selected effect
 The possible values are :
 
 - PIXConnectControlSpeedFastest
 
 - PIXConnectControlSpeedFast
 
 - PIXConnectControlSpeedMedium
 
 - PIXConnectControlSpeedSlow
 
 - PIXConnectControlSpeedSlowest
 
 @param speed The speed at this the effect will run (variable)
 
 */
- (void) setSpeed:(PIXConnectControlSpeed)speed;

/**
 Target a specific group of pixels that will execute the effect.
 
 There are 31 groups and 1 'global' group.
 The possibles values are :
 
 - PIXConnectControlAll
 
 - PIXConnectControlGroup1
 
 - PIXConnectControlGroup2
 
 - PIXConnectControlGroup3
 
 - ...
 
 - PIXConnectControlGroup31
 
  @param group The group of pixel to target
 
 */
- (void) setGroup:(PIXConnectControlGroup)group;

/**
 Set the probability for the effect to execute.
 
 Adds granularity. The possibles values are :
 
 - PIXConnectControlProbability100
 
 - PIXConnectControlProbability85
 
 - PIXConnectControlProbability65
 
 - PIXConnectControlProbability50
 
 - PIXConnectControlProbability30
 
 - PIXConnectControlProbability15
 
 - PIXConnectControlProbability10
 
 - PIXConnectControlProbability5
 
 @param probability The probability the effect will run or not
 
 */
- (void) setProbability:(PIXConnectControlProbability)probability;

/**
 Set the trigger that will start the effect
 
 - PIXConnectControlTriggerAlways
 
 - PIXConnectControlTriggerOnImpact
 
 - PIXConnectControlTriggerOnChange
 
 - PIXConnectControlTriggerOnChangeAndImpact
 
 @param trigger The trigger type.
 
 */
- (void) setTrigger:(PIXConnectControlTrigger)trigger;


#pragma mark - Scanning + Ranging + Proximity

/**
 Start scanning for PixMob devices in range / proximity.
 
 */
- (void) startScanningForAllDevicesInRange;

/**
 Stop scanning for PixMob devices in range / proximity.
 
 */
- (void) stopScanningForAllDevicesInRange;

/**
 Clear all devices previously found.
 
 */
- (void) clearAllDevicesInRange;

/**
 Get all devices that have been returning your call.
 
 @return Array of PIXConnectPixel in proximity
 
 */
- (NSArray*) getAllDevicesInRange;


@end
