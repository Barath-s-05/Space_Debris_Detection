# Space Debris Detection System

## Overview
Space debris poses a significant threat to satellites, spacecraft, and space missions. This AI-powered **Space Debris Detection System** is designed to analyze satellite imagery and identify hazardous debris in orbit using machine learning techniques. The system provides real-time analysis and visualization, aiding space agencies and satellite operators in collision avoidance and debris mitigation.

## Use Case
- **Satellite Protection**: Helps prevent collisions by identifying hazardous debris near satellites.
- **Mission Safety**: Supports space agencies in tracking debris for safe space exploration.
- **Space Traffic Management**: Assists in monitoring space debris for effective orbital management.
- **Research & Development**: Provides valuable data for space organizations studying debris patterns and risks.

## Features
- **AI-powered debris detection** using machine learning.
- **Bounding box localization** to differentiate debris from other objects.
- **Threat level assessment** to determine the risk of collision.
- **User-friendly web interface** for quick analysis and visualization.

## Tech Stack
### **Frontend:**
- React, Vite, TypeScript
- Tailwind CSS for modern UI styling

### **Backend:**
- Python, OpenCV for image processing
- TensorFlow, YOLO/Faster R-CNN for object detection
- Flask/FastAPI for handling API requests

## Installation
### **Prerequisites**
- Node.js & npm (for frontend)
- Python 3.x (for backend)
- Virtual environment (recommended for backend)

### **Setup Frontend**
```sh
cd project
npm install
npm run dev
```

### **Setup Backend**
```sh
cd backend
pip install -r requirements.txt
python app.py
```

## Usage
1. **Upload an image** captured from a satellite or telescope.
2. **AI model processes the image** and detects space debris.
3. **Debris locations and threat levels** are displayed on an interactive UI.
4. **Users can analyze and take action** based on the results.

## Future Enhancements
- **Real-time video feed processing** for continuous monitoring.
- **Improved AI model accuracy** through advanced training datasets.
- **Automated alert system** for immediate risk notification.
- **Integration with satellite control systems** for automated evasive actions.

## Contributing
We welcome contributions! Feel free to fork this repository, report issues, or submit pull requests.

---
🚀 **Developed by Team Sentinels of the Space for Techxcelerate Hyderabad March Edition, BITS Pilani**

## Running the Project in VS Code
After cloning the repository, navigate to the project folder and run:
```sh
npm run dev
```

