/* 
 This sketch reads the acceleration from the Bean's on-board accelerometer. 
 
 The acceleration readings are sent over serial and can be accessed in Arduino's Serial Monitor.
 
 To use the Serial Monitor, set Arduino's serial port to "/tmp/tty.LightBlue-Bean"
 and the Bean as "Virtual Serial" in the OS X Bean Loader.
 
 This example code is in the public domain.
 */

#define THRESHOLD 100

AccelerationReading previousAccel;

void setup() {
  // Bean Serial is at a fixed baud rate. Changing the value in Serial.begin() has no effect.
  Serial.begin();   
  // Optional: Use Bean.setAccelerationRange() to set the sensitivity to something other than the default of ±2g.

  // Turn off the Bean's LED
  Bean.setLed(0, 0, 0);  
  // Initial reading  
  previousAccel = Bean.getAcceleration(); 
}

void loop() {
  // Get the current acceleration with range of ±2g, and a conversion of 3.91×10-3 g/unit or 0.03834(m/s^2)/units. 
  AccelerationReading acceleration = Bean.getAcceleration();
  AccelerationReading accel = Bean.getAcceleration();



  // Format the serial output like this:    "X: 249  Y: -27   Z: -253"
  String stringToPrint = String();


  stringToPrint = stringToPrint + "X: " + acceleration.xAxis + "\tY: " + acceleration.yAxis + "\tZ: " + acceleration.zAxis;
  //newStringToPrint = stringToPrint + "X: " + acceleration.xAxis + "\tY: " + acceleration.yAxis + "\tZ: " + acceleration.zAxis;

  Serial.println(stringToPrint);

  // Get the current acceleration with a conversion of 3.91×10-3 g/unit.
  AccelerationReading currentAccel = Bean.getAcceleration();   


  if (acceleration.zAxis > 500 || acceleration.zAxis < - 500)
  {

    if (acceleration.xAxis > 0 && acceleration.yAxis > 0){

      //Bean.setLed(0,255,15);
      Serial.print(stringToPrint);
      Serial.println(" Flick!");
      Bean.sleep(2000);

    }
  }
}


