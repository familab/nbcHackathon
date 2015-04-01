//
//  ViewController.h
//  WANDUHpix
//
//  Created by Pat Starace on 2/30/15.
//  Copyright (c) 2015 Pat Starace. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

#import "PIXConnectController.h"
#import "PIXConnectControlParameters.h"

@interface ViewController : UIViewController
{
    PIXConnectController *pixmob;
    NSString *urlText;
}

@property (weak, nonatomic) IBOutlet UIBarButtonItem *btnConnect;
@property (weak, nonatomic) IBOutlet UIView * colorView;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UITextField *urlTextField;
@property (weak, nonatomic) IBOutlet UISegmentedControl *effectToggle1;
@property (weak, nonatomic) IBOutlet UISegmentedControl *effectToggle2;

- (BOOL)textFieldShouldReturn:(UITextField *)urlTextField;

@end

