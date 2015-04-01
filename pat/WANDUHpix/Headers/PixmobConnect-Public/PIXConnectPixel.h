//
//  PIXConnectPixel.h
//  PixMob Connect Public API
//
//  Copyright (c) 2015 PixMob Inc. All rights reserved.
//


#import "PIXConnectControlParameters.h"


@interface PIXConnectPixel : NSObject


@property (nonatomic,readonly, strong) NSDictionary *advData;

@property (nonatomic,readonly, strong) NSNumber *RSSI;

@property (nonatomic,readonly, strong) NSString *name;

@property (nonatomic,readonly, strong) NSString *type;

@property (nonatomic,readonly, strong) NSString *localName;

@property (nonatomic,readonly) BOOL inRange;


@end
