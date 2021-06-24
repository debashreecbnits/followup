/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Pilgrim/Pilgrim.h>
#import <GoogleMaps/GoogleMaps.h>
#import "SplashScreen.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyB1wSv9c_cy-vg9saA8H6UOSMV8Zqqeq1Y"];
  [[FSQPPilgrimManager sharedManager] configureWithConsumerKey:@"FKK4TFUPJENJAAUB4CLLGSJBCC54PHYEWDGLGN3ML5JQCS4C"
      secret:@"ALWFP5J3U0XD5PYGVFBRU33AFJVIGG54OMM1BMZZZ3Y0GHGT"
    delegate:nil
  completion:nil];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"followup"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
   
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [[FSQPPilgrimManager sharedManager] start];
  [SplashScreen show];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
- (void)pilgrimManager:(FSQPPilgrimManager *)pilgrimManager handleVisit:(FSQPVisit *)visit {
    // Handle a visit
}

- (void)pilgrimManager:(FSQPPilgrimManager *)pilgrimManager handleBackfillVisit:(FSQPVisit *)visit {
    // Handle a backfilled Visit
}

- (void)pilgrimManager:(FSQPPilgrimManager *)pilgrimManager handleGeofenceEvents:(NSArray<FSQPGeofenceEvent *> *)geofenceEvents {
    // Handle a geofence event
}
@end
