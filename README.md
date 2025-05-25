
# MongoDB and Node.js Application Deployment on Minikube

This project demonstrates the deployment of a MongoDB database and a Node.js application on a local Minikube Kubernetes cluster. It includes persistent storage, secrets, services, and a backup solution.

## Prerequisites

- Minikube installed
- kubectl installed
- Docker installed
- Kubernetes cluster running (via Minikube)

## Setup Instructions

### 1. Start Minikube Cluster

```bash
minikube start
```

### 2. Deploy MongoDB Components

Apply the Kubernetes manifests in the following order:

1. **Secret** (for MongoDB credentials):
```bash
kubectl apply -f mongosecret.yaml
```

2. **Persistent Volume** (for MongoDB data storage):
```bash
kubectl apply -f mongopv.yaml
```

3. **Persistent Volume Claim**:
```bash
kubectl apply -f mongopvc.yaml
```

4. **Service** (to expose MongoDB):
```bash
kubectl apply -f mongoservice.yaml
```

5. **Deployment** (to run MongoDB pods):
```bash
kubectl apply -f mongodeployment.yaml
```

Verify MongoDB pod is running:
```bash
kubectl get pod
```

### 3. Deploy Node.js Application

1. **Application Deployment**:
```bash
kubectl apply -f appdeployment.yaml
```

2. **Application Service** (to expose the app):
```bash
kubectl apply -f appservice.yaml
```

Verify application pod is running:
```bash
kubectl get pod
```

### 4. Set Up MongoDB Backup

1. **Backup Persistent Volume Claim**:
```bash
kubectl apply -f mongobackuppvc.yaml
```

2. **CronJob for Backups**:
```bash
kubectl apply -f mongobackup.yaml
```

### 5. Build and Push Docker Image

1. **Build Docker Image**:
```bash
docker build -t qasimnasir/mongodb1:latest .
```

2. **Push to Docker Hub**:
```bash
docker push qasimnasir/mongodb1:latest
```

## Verification

Check all running pods:
```bash
kubectl get pod
```

## Notes

- The MongoDB deployment uses persistent storage to maintain data between pod restarts
- Secrets are used to securely store MongoDB credentials
- A CronJob is configured for regular MongoDB backups
- The Node.js application is connected to the MongoDB service

## Troubleshooting

If pods remain in "ContainerCreating" status for extended periods:
1. Check Minikube resources (CPU/memory allocation)
2. Verify all dependent services are running
3. Check for any network connectivity issues (especially with image pulling)

## Cleanup

To delete all resources:
```bash
kubectl delete -f .
minikube stop
```

## Author

Qasim Nasir
```

This README provides a clear, step-by-step guide for reproducing your Kubernetes deployment, including all the commands you executed and their purpose. It also includes verification steps and troubleshooting tips.
