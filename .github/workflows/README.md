# GCP

## Service Accounts

* github-gcr with "Storage Object Creator" + "Sotrage Object Viewer" as "GCLOUD_SERVICE_KEY"

> we do not want to give 'storage.buckets.create' therefore upload one image manually (`gcloud auth configure-docker eu.gcr.io`)
> export DOCKER_IMAGE_PERMIT_MANAGER=eu.gcr.io/$PROJECT_ID/permit-manager:master
> docker build . --tag $DOCKER_IMAGE_PERMIT_MANAGER
> docker push $DOCKER_IMAGE_PERMIT_MANAGER