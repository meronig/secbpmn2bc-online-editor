# SecBPMN2BC Online Editor
SecBPMN2BC Online Editor is a web-based graphical frontend for the SecBPMN2BC framework

This tool is publicly accessible at secbpmn2bc.compute.dtu.dk

## Prerequisites
SecBPMN2BC REST Service: 

## Local deployment

* Make sure to have Java 8.0, Eclipse, and Node.js 16 (or greater) properly installed and configured on your computer

* Clone SecBPMN2BC REST Service repository: 

```
git clone https://github.com/meronig/secbpmn2bc-rest-service.git
```

* Import the project in Eclipse and generate a runnable JAR file.

* Run the JAR file to start the backend components

* Clone this repository, install node.js dependencies, and run the frontend

```
git clone https://github.com/meronig/secbpmn2bc-online-editor.git
cd secbpmn2bc-online-editor
npm install
npm run dev
```

* SecBPMN2BC Online Editor should be accessible on localhost at port 8081



## Deployment with Docker

* Make sure to have Java 8.0 and Eclipse properly installed and configured on your computer

* Clone SecBPMN2BC REST Service repository: 

```
git clone https://github.com/meronig/secbpmn2bc-rest-service.git
```

* Import the project in Eclipse and generate a runnable JAR file.

* Move the generated JAR file to secbpmn2bc-rest-service/deployment 

* Generate SecBPMN2BC REST Service docker image:

```
cd secbpmn2bc-rest-service/deployment
docker-compose create
```

* Clone this repository, generate and deploy Docker images:

```
git clone https://github.com/meronig/secbpmn2bc-online-editor.git
cd secbpmn2bc-online-editor
docker-compose create
docker-compose start
```

* SecBPMN2BC Online Editor should be accessible on localhost at port 8081

# Troubleshooting

SecBPMN2BC Online Editor assumes that the backend runs on the same host as the frontend. If this is not the case (e.g., you are deploying the backend on a different machine) you will have to change the variable be_endpoint inside app/app.js

# Acknowledgements
Copyright © 2022-2025 Technical University of Denmark

SecBPMN2BC Online Editor has been developed as part of the project "Improving Business Processes with Blockchain: Model-driven Generation of Secure Smart Contract Code", funded by Copenhagen Fintech: https://www.copenhagenfintech.dk/projects/improving-business-processes-with-blockchain
