# SlowVID

SlowVID is a privacy-by-design contact tracing mobile device app and back-end
server to aid in slowing the spread of COVID-19. SlowVID uses a hybrid
architecture. Hybrid architecture: ephemeral ID generation and management are
decentralised (handled by mobile devices). Risk analysis and notifications are
centralised within the back-end server

## Design Documentation

* See [doc/design/README.md](doc/design/README.md)

## Components

* **Front-end**

  The mobile app. A "mock" browser app in [React](https://reactjs.org/)
that looks and behaves like a mobile app.
See [front-end/README.md](front-end/README.md)

* **Back-end**

   The back-end server responsible for risk analysis, contact
flagging and notifications.
See [back-end/README.md](back-end/README.md)

* **Health Care Professional (HCP) front-end**

   A secure  [React](https://reactjs.org/) app for HCPs only to confirm a front-end user
is positive COVID-19.
See [hcp-front-end/README.md](hcp-front-end/README.md)

* **Bluetooth front-end**

   A developer only [React](https://reactjs.org/) app to manage the "mock"
Bluetooth interface.
See [bluetooth-front-end/README.md](bluetooth-front-end/README.md)

* **Bluetooth back-end**

   The "mock" Bluetooth back-end that manages Bluetooth broadcasts between SlowVID
front-ends.
See [bluetooth-back-end/README.md](bluetooth-back-end/README.md)


## Build and Run Instructions

See the components' README.md:
* [front-end/README.md](front-end/README.md)
* [back-end/README.md](back-end/README.md)
* [hcp-front-end/README.md](hcp-front-end/README.md)
* [bluetooth-front-end/README.md](bluetooth-front-end/README.md)
* [bluetooth-back-end/README.md](bluetooth-back-end/README.md)

## Developer Documentation and Debugging Instructions

* See [doc/developer/README.md](doc/developer/README.md)


----
Group 7, Secure Software Engineering COMP SCI 4412, University of Adelaide