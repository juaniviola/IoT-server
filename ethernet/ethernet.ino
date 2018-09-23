#include <SPI.h>
#include <Ethernet.h>
byte mac[] = { 0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02 };
char server[] = "192.168.0.107";
EthernetClient client;

#include <dht.h>
dht DHT;
#define DHT11_PIN 7
 
void setup() {
  Ethernet.begin(mac);
  Serial.begin(9600);

  delay(1000);
}
 
void loop() {
  int chk = DHT.read11(DHT11_PIN);

  if (client.connect(server, 5001)) {
    String data = "temperatura=" + String(DHT.temperature) + "&humedad=" + String(DHT.humidity);
    
    Serial.println("sending...");
    client.println("POST / HTTP/1.0");
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.print("Content-Length: ");
    client.println(data.length());
    client.println();
    client.println(data);
  } else {
    Serial.println("error.......");
  }
  
  delay(5000);
}
