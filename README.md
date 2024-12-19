# SecBPMN2BC Online Editor
SecBPMN2BC Online Editor is a web-based graphical frontend for the SecBPMN2BC framework

## Prerequisites
SecBPMN2BC REST Service: 

## Deployment with Docker

* Clone SecBPMN2BC REST Service repository and generate PASO docker image:

```
git clone https://github.com/meronig/SecBPMN2BC.git
cd SecBPMN2BC/deployment
docker-compose create
```

* Clone this repository, generate and deploy Docker images:

```
git clone https://github.com/meronig/secbpmn2bc-online-editor.git
cd secbpmn2bc-online-editor
docker-compose create
docker-compose start
```

* SecBPMN2BC Online Editor will be accessible on localhost at port 8081

# Acknowledgements
SecBPMN2BC Online Editor has been developed as part of the project "Improving Business Processes with Blockchain: Model-driven Generation of Secure Smart Contract Code", funded by Copenhagen Fintech: https://www.copenhagenfintech.dk/projects/improving-business-processes-with-blockchain
