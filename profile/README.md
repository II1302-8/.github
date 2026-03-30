# DockPulse

> Smart Berth Monitoring for Small and Medium Marinas

Solar-powered sensor nodes equipped with 24 GHz mmWave radar detect vessel presence at each berth, replacing the manual flag-based process used in most marinas today. A gateway aggregates sensor data via ESP-NOW and forwards it to a backend server over MQTT. Harbor staff and visiting boaters access real-time berth occupancy through a web dashboard with a color-coded map.

## Repositories

| Repo                                                       | Description                                           |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| [dockpulse](https://github.com/II1302-8/dockpulse)         | Backend server, REST API, and web dashboard           |
| [dockpulse-iot](https://github.com/II1302-8/dockpulse-iot) | ESP32 firmware for sensor nodes and gateway (ESP-IDF) |

## Architecture

![Architecture](../docs/architecture/architecture.png)

## Quick Links

- [Project Board](https://github.com/orgs/II1302-8/projects/1) — Kanban board for tracking progress
- [Workflow Guide](../docs/WORKFLOW.md) — Branching, commits, code style, and review process

## Team

| Name                | GitHub                                             | Role(s)                   |
| ------------------- | -------------------------------------------------- | ------------------------- |
| Duhan Cigel         | [@Doodlejnoodle](https://github.com/Doodlejnoodle) | IoT lead                  |
| Elliot Steffensen   | [@xishell](https://github.com/xishell)             | Product owner, IoT dev    |
| Jacob Wilhelmsson   | [@LellesBodega](https://github.com/LellesBodega)   | Frontend dev              |
| Karl Andersson      | [@Johnybooi](https://github.com/Johnybooi)         | Scrum master, Backend dev |
| Pontus Forsman      | [@pntzf](https://github.com/pntzf)                 | Backend lead              |
| Roble Yusuf Mohamud | [@Roblethe1](https://github.com/Roblethe1)         | Frontend dev              |
