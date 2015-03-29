/* 
 This sketch shows you how to monitor if your Bean moves by sampling the acceleration at 5Hz and measuring change. 
 
 The LED will blink red when it's being moved.
 
 Please note that if motion detection is triggered often, the LED use will drain the battery quickly.
 
 This example code is in the public domain.
 */

// When acceleration change goes beyond this threshold, the LED will blink.
#define THRESHOLD 100

AccelerationReading previousAccel;

void setup() {
  // Turn off the Bean's LED
  Bean.setLed(0, 0, 0);  
  // Initial reading  
  previousAccel = Bean.getAcceleration(); 
}

void loop() {
  // Get the current acceleration with a conversion of 3.91×10-3 g/unit.
  AccelerationReading accel = Bean.getAcceleration();
  String stringToPrint = String();
  stringToPrint = stringToPrint + "X: " + accel.xAxis + "\tY: " + accel.yAxis + "\tZ: " + accel.zAxis;
  // Find the difference between the current acceleration and that of 200ms ago.
  int accelDifference = getAccelDifference(previousAccel, accel); 
  // Update previousAccel for the next loop.   
  previousAccel = accel;                                            

  // Check if the Bean has been moved beyond our threshold.

  if (accel.zAxis > 500)
  {
    //if (accel.xAxis > 0 && accel.yAxis > 0){
    Bean.setLed(0,255,15);
    //Serial.print(stringToPrint);
    Serial.println("Flick!");
    Bean.sleep(2000);
    //}
  }

  else if (accelDifference > THRESHOLD){   
    // Blink the LED
    Bean.setLed(50, 0, 0);
    Serial.println(stringToPrint);
    Bean.sleep(20);
  }

  else if (accelDifference <= THRESHOLD){
    Bean.setLed(1, 1, 1);
    Serial.println("Not moving");
    //Bean.sleep(50);
  }
}

// This function calculates the difference between two acceleration readings
int getAccelDifference(AccelerationReading readingOne, AccelerationReading readingTwo){
  int deltaX = abs(readingTwo.xAxis - readingOne.xAxis);
  int deltaY = abs(readingTwo.yAxis - readingOne.yAxis);
  int deltaZ = abs(readingTwo.zAxis - readingOne.zAxis);
  // Return the magnitude
  return deltaX + deltaY + deltaZ;   
}










