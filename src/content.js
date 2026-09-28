// Shared project identity, exact asset filenames, design specifications, and tools.
export const projects = [
  {
    "slug": "amr",
    "nav": "AMR",
    "title": "Autonomous Mobile Robot",
    "folder": "amr",
    "main": "dung.jpg",
    "mainCaption": "The assembled indoor mobile robot.",
    "specs": [
      [
        "20 kg",
        "Design payload"
      ],
      [
        "1 m/s",
        "Maximum design speed"
      ],
      [
        "≥4 hours",
        "Target runtime"
      ]
    ],
    "tools": "ROS 2 · Python · SLAM Toolbox · Nav2 · Gazebo · Flask/Web UI · Raspberry Pi 4 · ESP32 · AprilTag · YOLO",
    "plot": [
      "data.png",
      "Documented navigation test plots — enlarge to inspect axes and samples."
    ]
  },
  {
    "slug": "nexcube",
    "nav": "NEXCUBE",
    "title": "NEXCUBE",
    "folder": "nexcube",
    "main": "team.jpg",
    "mainCaption": "The NEXCUBE team with the assembled workstation.",
    "specs": [
      [
        "4",
        "Functional modules"
      ],
      [
        "Magnetic alignment + spring contacts",
        "Connection"
      ],
      [
        "Shared power bus",
        "Power architecture"
      ]
    ],
    "tools": "SolidWorks · KiCad · Bambu Lab · Soldering · Tester · Battery"
  },
  {
    "slug": "hexapod",
    "nav": "Hexapod",
    "title": "Hexapod Robot",
    "folder": "hexa",
    "main": "real.jpg",
    "mainCaption": "The assembled six-legged, 18-DOF platform.",
    "specs": [
      [
        "6",
        "Legs"
      ],
      [
        "18 DOF",
        "Actuated degrees of freedom"
      ],
      [
        "ESP32",
        "Controller"
      ]
    ],
    "tools": "SolidWorks · MATLAB · Embedded C · ESP32 · I²C · Arduino IDE · Modeling"
  },
  {
    "slug": "mini-agv",
    "nav": "Mini AGV",
    "title": "Mini AGV",
    "folder": "agv",
    "main": "real.png",
    "mainCaption": "The physical guided vehicle and integrated electronics.",
    "specs": [
      [
        "1 kg",
        "Design payload"
      ],
      [
        "0.5 m/s",
        "Maximum design speed"
      ],
      [
        "26 mm",
        "Guide-line width"
      ]
    ],
    "tools": "SolidWorks · MATLAB/Simulink · ESP32 · PD/PI Control · KiCad · ESPWeb · Wi-Fi Router"
  },
  {
    "slug": "printed-lens",
    "nav": "Printed Lens",
    "title": "3D Printed Lens",
    "folder": "printedcam",
    "main": "real.jpg",
    "mainCaption": "The completed printed housing with recovered film-camera optics.",
    "specs": [
      [
        "Manual focus",
        "Focusing"
      ],
      [
        "PETG",
        "Printed housing"
      ],
      [
        "Sony-compatible",
        "Mount"
      ]
    ],
    "tools": "SolidWorks · Cura · PETG 3D Printing · Reverse Engineering · Optics"
  },
  {
    "slug": "merc",
    "nav": "MERC",
    "title": "MERC 2025",
    "folder": "lifter",
    "main": "real.jpg",
    "mainCaption": "The completed mobile lifter robot at the competition.",
    "specs": [
      [
        "4 motors",
        "Drivetrain"
      ],
      [
        "Belt-driven",
        "Vertical lift"
      ],
      [
        "Dual grippers",
        "Manipulation"
      ]
    ],
    "tools": "AutoCAD · Arduino · UART Controller · Motor Drivers · Belt-and-Pulley Lift",
    "plot": [
      "award.png",
      "Competition photograph — reported result: Top 8, 2025."
    ]
  },
  {
    "slug": "hand-gesture",
    "nav": "Hand Gesture",
    "title": "Hand Gesture Unlock",
    "folder": "handgest",
    "main": "ui.png",
    "mainCaption": "Streamlit registration and live static-gesture matching interface.",
    "specs": [
      [
        "21",
        "Landmarks per hand"
      ],
      [
        "10",
        "Geometric features"
      ],
      [
        "Static gestures",
        "Matching type"
      ]
    ],
    "tools": "Python · OpenCV · MediaPipe · Streamlit · NumPy"
  }
];
