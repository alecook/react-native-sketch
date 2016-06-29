//
//  RNSketchManager.m
//  RNSketch
//
//  Created by Jeremy Grancher on 28/04/2016.
//  Copyright © 2016 Jeremy Grancher. All rights reserved.
//

#import "RCTViewManager.h"
#import "RNSketch.h"

@interface RNSketchManager : RCTViewManager

@property (nonatomic, strong) UIColor *fillColor;
@property (nonatomic, strong) UIColor *strokeColor;
@property (nonatomic, assign) NSInteger strokeThickness;
@property (nonatomic, assign) bool persistDraw;
@property (nonatomic, assign) float strokeAlpha;
@property (nonatomic, strong) RNSketch *sketchView;

@end;
