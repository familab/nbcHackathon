/* 
 This sketch reads the acceleration from the Bean's on-board accelerometer. 
 
 The acceleration readings are sent over serial and can be accessed in Arduino's Serial Monitor.
 
 To use the Serial Monitor, set Arduino's serial port to "/tmp/tty.LightBlue-Bean"
 and the Bean as "Virtual Serial" in the OS X Bean Loader.
 
 This example code is in the public domain.
 */

void setup() {
  // Bean Serial is at a fixed baud rate. Changing the value in Serial.begin() has no effect.
  Serial.begin();   
  // Optional: Use Bean.setAccelerationRange() to set the sensitivity to something other than the default of ±2g.
}

void loop() {
  // Get the current acceleration with range of ±2g, and a conversion of 3.91×10-3 g/unit or 0.03834(m/s^2)/units. 
  AccelerationReading acceleration = Bean.getAcceleration();
  AccelerationReading accel = Bean.getAcceleration();

  // Format the serial output like this:    "X: 249  Y: -27   Z: -253"
  //String stringToPrint = String();
  //stringToPrint = stringToPrint + "X: " + acceleration.xAxis + "\tY: " + acceleration.yAxis + "\tZ: " + acceleration.zAxis;
  //Serial.println(stringToPrint);

  if (acceleration.xAxis > 200)
  {
    uint16_t r = (abs(accel.xAxis)) / 4;
    uint16_t g = (abs(accel.yAxis)) / 4;
    uint16_t b = (abs(accel.zAxis)) / 4;
    Bean.setLed((uint8_t)r,(uint8_t)g,(uint8_t)b);
    //Bean.sleep(200);
  }
  /*else if (acceleration.yAxis > 200)
  {
    uint16_t r = (abs(accel.xAxis)) / 8;
    uint16_t g = (abs(accel.yAxis)) / 8;
    uint16_t b = (abs(accel.zAxis)) / 8;
    Bean.setLed((uint8_t)r,(uint8_t)g,(uint8_t)b);
    //Bean.sleep(200);
  }
  
  */
  else
  {
    Bean.setLed(0,0,0);
  }    

}











