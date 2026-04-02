# Sensor Node Hardware

Hardware specification for a single DockPulse berth sensor node. Each node detects vessel presence using a 24 GHz mmWave radar and communicates with the gateway via ESP-NOW.

## Bill of Materials

Quantities are per node unless noted. Total order includes parts for 3 sensor nodes, 1 gateway, and 1 spare ESP32-C3.

### Per Node

| Component                                     | Role                   | Qty | Notes                                                    |
| --------------------------------------------- | ---------------------- | --- | -------------------------------------------------------- |
| ESP32-C3 Mini dev board                       | Microcontroller        | 1   | Wi-Fi + BLE, ESP-NOW capable, deep sleep ~5 uA, RISC-V   |
| 24 GHz mmWave radar module                    | Presence detection     | 1   | UART output, runs on 3.3V from ESP32-C3                  |
| Dual-color LED 5mm red/green (common cathode) | Berth status indicator | 1   | Green = free, red = occupied                             |
| Resistor 100 Ohm 1W (LED current limiting)    | LED current limiting   | 2   | One per LED color                                        |
| Li-Ion 18650 battery (3.7V, 3200 mAh)         | Power source           | 1   |                                                          |
| Polycrystalline solar panel (5.5V, 100 mA)    | Battery charging       | 1   | Extends field life                                       |
| TP4056 USB-micro charger module               | Charge controller      | 1   | LiPo-safe charging from solar panel                      |
| Resistor 10 kOhm 0.1W SMD 0603                | TP4056 R3 replacement  | 1   | Adjusts charge current to match solar panel input        |
| Resistor 100 kOhm 1W (voltage divider)        | Battery level sensing  | 1   | On ADC pin, used to report battery percentage to backend |
| Electrolytic capacitor 100 uF 16V             | Power smoothing        | 1   | Smooths supply during ESP-NOW transmit current spikes    |
| N-channel MOSFET SOT-23 (e.g. 2N7002)         | Sensor power switch    | 1   | GPIO-driven, cuts radar power during deep sleep          |
| QR code sticker                               | Provisioning identity  | 1   | Printed at flash time, stuck on enclosure                |

### Gateway

| Component               | Role            | Qty | Notes                                       |
| ----------------------- | --------------- | --- | ------------------------------------------- |
| ESP32-C3 Mini dev board | Microcontroller | 1   | Receives ESP-NOW, publishes MQTT over Wi-Fi |

### Spare / Fallback

| Component                            | Qty | Notes                                                            |
| ------------------------------------ | --- | ---------------------------------------------------------------- |
| ESP32-C3 Mini dev board              | 1   | Spare for replacement                                            |
| TP4056 USB-micro charger module      | 1   | Spare                                                            |
| Ultrasonic sensor HY-SRF05 (2-450cm) | 1   | Fallback if mmWave radar does not work reliably for our use case |

### Total Order Summary

| Component                              | Qty | Notes           |
| -------------------------------------- | --- | --------------- |
| ESP32-C3 Mini dev board                | 5   | Ordered         |
| 24 GHz mmWave radar module             | 3   | Ordered         |
| Polycrystalline solar panel 5.5V 100mA | 3   | Ordered         |
| Li-Ion 18650 3.7V 3200mAh              | 3   | Ordered         |
| TP4056 charger module                  | 4   | Ordered         |
| Electrolytic capacitor 100uF 16V       | 3   | Ordered         |
| LED 5mm red/green 3-pin CC             | 3   | Ordered         |
| Resistor 10 kOhm 0.1W SMD 0603         | 10  | Ordered         |
| Resistor 100 kOhm 1W                   | 5   | Ordered         |
| Resistor 100 Ohm 1W                    | 6   | Ordered         |
| Ultrasonic sensor HY-SRF05             | 1   | Ordered         |
| N-channel MOSFET SOT-23 (e.g. 2N7002)  | 3   | **Not ordered** |

## Pin Allocation (ESP32-C3)

| GPIO   | Function                          |
| ------ | --------------------------------- |
| GPIO 0 | MOSFET gate (radar power control) |
| GPIO 1 | mmWave UART TX                    |
| GPIO 2 | mmWave UART RX                    |
| GPIO 3 | LED green                         |
| GPIO 4 | LED red                           |
| GPIO 5 | Battery voltage ADC (via divider) |
| GPIO 9 | Boot / factory reset button       |

## Radar Power Switching

The Waveshare HMMD mmWave sensor draws ~50 mA continuously and has no built-in sleep or enable pin. Without power switching, the radar stays on during deep sleep, reducing battery life from \~13 days to \~2 days.

An N-channel MOSFET (e.g. 2N7002 in SOT-23) on GPIO 0 switches the radar's ground path. GPIO HIGH powers the sensor on; GPIO LOW (default during deep sleep) cuts power to zero draw.

### Current Draw by State

| State                             | Current Draw | Duration per Cycle |
| --------------------------------- | ------------ | ------------------ |
| Deep sleep (radar off via MOSFET) | ~5 uA        | ~28s               |
| Active (radar on + ESP-NOW TX)    | ~150 mA      | ~2s                |

Radar module (Waveshare HMMD): 50 mA average operating current.

### Battery Life Estimates

| Scenario                         | Avg Current | Battery Life (3200 mAh) |
| -------------------------------- | ----------- | ----------------------- |
| With MOSFET (radar off in sleep) | ~10 mA      | ~13 days                |
| Without MOSFET (radar always on) | ~57 mA      | ~2.3 days               |
| With MOSFET + solar              | ~10 mA      | Potentially indefinite  |

### Solar Charging

The TP4056 module charges the 18650 battery from the 5.5V solar panel. The onboard R3 resistor is replaced with a 10 kOhm SMD resistor to reduce the charge current to match the solar panel's output (~100 mA). This prevents the panel from being overloaded and ensures stable charging.

## Enclosure Requirements

- IP65 or higher (rain, salt spray, dock hose-down)
- Sensor window must be radar-transparent (no metal lid over mmWave module)
- Mounting bracket for dock/piling attachment
- Accessible battery compartment or USB-C port for charging
- QR sticker placement visible without unmounting

## Open Design Decisions

1. **Source MOSFET** — An N-channel MOSFET (e.g. 2N7002 SOT-23) is needed for radar power switching but has not been ordered yet. Without it, battery life drops from ~13 days to ~2.3 days.

2. **Ultrasonic fallback** — If the mmWave radar does not perform reliably in the marine environment, the HY-SRF05 ultrasonic sensor is available as a backup. This would require different GPIO pins (trigger + echo) and a different driver.

3. **GPIO 0 as strapping pin** — GPIO 0 is a strapping pin on the ESP32-C3. Verify that using it for the MOSFET gate does not interfere with boot behavior. The MOSFET gate floats low by default (radar off), which should be safe during boot, but this needs to be confirmed on hardware.
