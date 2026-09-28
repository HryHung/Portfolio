# Warehouse AMR Robot

> Portfolio case-study draft. Replace the TODO sections with your final project details.

## Overview

A prototype indoor warehouse AMR integrating mechanical design, embedded motor control, LiDAR mapping, Nav2 navigation, AprilTag docking, and a web-based mission interface.

## My Role

System integration · ROS 2 · Navigation · Embedded control

## Technical Stack

- ROS 2
- SLAM
- Nav2
- AprilTag
- ESP32
- Raspberry Pi

## Engineering Details

### System

Raspberry Pi running ROS 2 at the high level; ESP32 / ESP32-C3 handles velocity commands, encoders and motor control.

### Autonomy

SLAM Toolbox for mapping, AMCL for localization, Nav2 for waypoint navigation, and AprilTag-based docking correction.

### Interface

Flask-based Web UI for map, waypoint and shipping-mission management.

### Architecture

Web UI → Raspberry Pi / ROS 2 → ESP32 → motor driver → DC motors + encoders → odometry / localization / navigation.

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
