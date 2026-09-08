# Line Following AGV

> Portfolio case-study draft. Replace the TODO sections with your final project details.

## Overview

A line-following mobile robot with color-based sorting and autonomous goods distribution.

## My Role

Embedded control · PID · Sensors · Mechatronics design

## Technical Stack

- Embedded C
- ESP32
- PID
- Sensors
- MATLAB

## Engineering Details

### Control

Weighted IR sensor readings estimate line position and a PID controller corrects the trajectory.

### Logic

A state machine handles idle, line following, load detection, color detection, navigation and destination stop.

### Hardware

Differential-drive platform, DC motors with encoders, IR array, color sensor, TB6612FNG and ESP32 / STM32.

### Results

Target specifications include ≥0.1 m/s speed, ±3 mm tracking error, ±5 mm stopping error and ~1 kg load capacity.

## Evidence to Add

- Hero photo / render
- System architecture or block diagram
- CAD / schematic / software screenshot
- Test result or demo video
- GitHub repository link

## TODO

- [ ] Add exact project dates
- [ ] Add measurable results
- [ ] Add your personal contribution
- [ ] Add project media
