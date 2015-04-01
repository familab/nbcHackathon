//
//  ViewController.m
//  WANDUHpix
//
//  Created by Pat Starace on 2/30/15.
//  Copyright (c) 2015 Pat Starace. All rights reserved.
//

#import "ViewController.h"
#import "SIOSocket.h"

@interface ViewController ()

@property SIOSocket *socket;

@end


@implementation ViewController

- (void) viewDidLoad
{
    self.titleLabel.text = [[NSBundle mainBundle] bundleIdentifier];
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    urlText = [defaults objectForKey:@"urlText"];
    
    // Update the UI elements with the saved data
    self.urlTextField.text = urlText;
    
    self.urlTextField.keyboardType = UIKeyboardTypeNumbersAndPunctuation;
    
    self.colorView.backgroundColor = [UIColor colorWithRed:0.0
                                                     green:0.0
                                                      blue:0.0
                                                     alpha:1.0];
    
    pixmob = [[PIXConnectController alloc] initWithColor:self.colorView.backgroundColor];
    
    self.effectToggle1.selectedSegmentIndex = 2;
    [self.effectToggle1 sendActionsForControlEvents:UIControlEventValueChanged];
    
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    
    [self.urlTextField resignFirstResponder];
    urlText = [self.urlTextField text];
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:urlText forKey:@"urlText"];
    [defaults synchronize];
    
    return NO;
    
}

- (IBAction) btnConnect:(id)sender
{
    NSString *urlConnect = [NSString stringWithFormat:@"%@%@", @"http://", urlText];
    NSLog(@"%@", urlConnect);
    [SIOSocket socketWithHost: urlConnect response: ^(SIOSocket *socket) // Format http://x.x.x.x:8000
     {
         self.socket = socket;

         self.socket.onConnect = ^()
         {
             NSLog(@"We're connected");
         };
         
         [self.socket on: @"pixmob" callback: ^(SIOParameterArray *args)
          {
              NSLog(@"callback: %@",args);
              
              NSString *temp =  args[0];
              //NSString *string = [NSString stringWithFormat:@"%d", args[0]];
              
              if ([temp isEqualToString:@"on"]) {
                  NSLog(@"we're on");
                  
                  self.colorView.backgroundColor = [UIColor colorWithRed:1.0
                                                                   green:0.0
                                                                    blue:0.0
                                                                   alpha:1.0];
                  
                  [pixmob setColor:self.colorView.backgroundColor ];
                  [pixmob setEffect:PIXConnectControlEffectStrobe]; // change effect to stroboscopie, no speed
              }
              
              else {
                  NSLog(@"we're off");
                  self.colorView.backgroundColor = [UIColor colorWithRed:0.0
                                                                   green:0.0
                                                                    blue:0.0
                                                                   alpha:1.0];
                  
                  [pixmob setColor:self.colorView.backgroundColor ];
              }
              
              if ([temp isEqualToString:@"off"]) {
                  NSLog(@"we're off");
                  self.colorView.backgroundColor = [UIColor colorWithRed:0.0
                                                                   green:0.0
                                                                    blue:0.0
                                                                   alpha:1.0];
                  
                  [pixmob setColor:self.colorView.backgroundColor ];
              }
          }];
         
         [self.socket on: @"disappear" callback: ^(SIOParameterArray *args)
          {
              NSLog(@"disappear");
          }];
     }];
    
    [self.socket on:@"new_message" callback:^(id pixmob) {
        NSLog(@"Received new message !!");
    }];
    
    [self.socket on:@"socket-id" callback:^(NSArray *args) {
        NSLog(@"Got socket ID: %@", args);
    }];

}


- (void) viewDidLayoutSubviews
{
    UIFont *font = [UIFont systemFontOfSize:18.0f];
    NSDictionary *attributes = [NSDictionary dictionaryWithObject:font forKey:NSFontAttributeName];
    [self.effectToggle1 setTitleTextAttributes:attributes forState:UIControlStateNormal];
    [self.effectToggle2 setTitleTextAttributes:attributes forState:UIControlStateNormal];
}


- (void) viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:YES];
    
    [pixmob startBroadcasting];  // start sending data
}


- (void) viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:YES];
    
    [pixmob stopBroadcasting];  // stop sending data
}


- (IBAction) effectChanged:(id)sender
{
    UISegmentedControl * control = (UISegmentedControl*)sender;
    
    if (control.tag==1)
    {
        self.effectToggle2.selectedSegmentIndex = UISegmentedControlNoSegment;
        
        switch (control.selectedSegmentIndex)
        {
            case 0:
                
                self.colorView.backgroundColor = [UIColor colorWithRed:0.0
                                                                 green:0.0
                                                                  blue:0.0
                                                                 alpha:1.0];
                //
                [pixmob setColor:self.colorView.backgroundColor ];
                
                [pixmob setEffect:PIXConnectControlEffectSolid]; // change effect to only a color (no effect)
                
                break;
                
            case 1:
                
                [pixmob setEffect:PIXConnectControlEffectPulse]; // change effect to fade up and down, looping, with speed

                break;
                
            case 2:
                
                [pixmob setEffect:PIXConnectControlEffectStrobe]; // change effect to stroboscopie, no speed

                break;
        }
    }
    
    else if (control.tag==2)
    {
        self.effectToggle1.selectedSegmentIndex = UISegmentedControlNoSegment;
        
        switch (control.selectedSegmentIndex)
        {
            case 0:
                
                [pixmob setEffect:PIXConnectControlEffectPulseOpen]; // change effect to pulse open : crossfade up, bump down

                break;
                
            case 1:
                
                [pixmob setEffect:PIXConnectControlEffectPulseClose]; // change effect to pulse open : crossfade up, bump down

                break;
                
            case 2:
                
                self.colorView.backgroundColor = [UIColor colorWithRed:1.0
                                                                 green:0.0
                                                                  blue:0.0
                                                                 alpha:1.0];
                
                [pixmob setColor:self.colorView.backgroundColor ];
                
                break;
        }
    }
}


@end
